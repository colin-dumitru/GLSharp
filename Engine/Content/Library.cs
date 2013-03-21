// Collection.cs
//

using System;
using System.Collections.Generic;
using GLSharp.Data;
using GLSharp.Graphics;
using GLSharp.Core;
using System.Runtime.CompilerServices;

namespace GLSharp.Content {
    public interface IResourceConverter {
        String TypeHandled { get; }
        ResourceItem Convert(Object input, String collection);
    }

    /// <summary>
    /// Item Handle.
    /// </summary>
    public class Handle {
        public String Collection;
        public String Id;

        public static Handle Create(String library, String id) {
            Handle ret = new Handle();

            ret.Collection = library;
            ret.Id = id;

            return ret;
        }
    }

    /// <summary>
    /// A named collection of Resources.
    /// </summary>
    public class ResourceCollection {
        public String Name;
        public Dictionary<String, ResourceItem> Resources;
    }

    /// <summary>
    /// A resourc item.
    /// </summary>
    public abstract class ResourceItem {
        public String Id;
        public String Type;
        public int LastAccessed;
        public int ItemId;

        private static int _lastId = 0;

        protected ResourceItem() {
            this.ItemId = _lastId++;
        }

        /// <summary>
        /// The item frees all of it's items from memory.
        /// </summary>
        public abstract Boolean Free();
        /// <summary>
        /// The item realocates it's resources.
        /// </summary>
        public abstract Boolean Readlocate();
        /// <summary>
        /// Last time the mesh has been accessed.
        /// </summary>
        public Boolean Alocated;
    }

    /// <summary>
    /// A resource object found a Collection Object collection.
    /// </summary>
    [Imported]
    internal abstract class ResourceObject {
        [IntrinsicProperty]
        [PreserveCase]
        public abstract String Type { get; set; }

        [IntrinsicProperty]
        [PreserveCase]
        public abstract String Id { get; set; }

        [IntrinsicProperty]
        [PreserveCase]
        public abstract Object Resource { get; set; }
    }

    /// <summary>
    /// A root object from a JSON library object.
    /// </summary>
    [Imported]
    internal abstract class LibraryObject {
        [IntrinsicProperty]
        [PreserveCase]
        public abstract String Name { get; set; }
        [IntrinsicProperty]
        [PreserveCase]
        public abstract List<ResourceObject> ContentObjects { get; set; }
    }

    /// <summary>
    /// Used for notifying when a library has finished loading.
    /// </summary>
    public class LibraryResult {
        public Event Finished = new Event();
    }

    public delegate void LibraryHandler(Library sender, Object args);
    /// <summary>
    /// Loades and manages resources.
    /// </summary>
    public class Library {
        private Dictionary<String, ResourceCollection> _collections = null;
        private Dictionary<String, IResourceConverter> _converters = null;

        private List<ResourceItem> _items = null; 


        /// <summary>
        /// The limit in milliseconds when items are considered expired and should be dealocated.
        /// </summary>
        public int ExpireLimit = 600000;

        /*alocated resources*/
        private List<ResourceItem> _alocatedItems = null; 
        /*resources which need to be removed*/
        private List<ResourceItem> _expiredItems = null; 
        /*last time the cleanup method was ran*/
        private int _lastUpdated;

        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------

        public Library() {
            this._collections = new Dictionary<string, ResourceCollection>();
            this._converters = new Dictionary<string, IResourceConverter>();
            this._items = new List<ResourceItem>();
            this._alocatedItems = new List<ResourceItem>();
            this._expiredItems = new List<ResourceItem>();

            this._lastUpdated = Date.Now.GetTime();
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        public void Update() {
            this._expiredItems.Clear();
            this._lastUpdated = Date.Now.GetTime();

            Library that = this;

            this._alocatedItems.ForEach(delegate(ResourceItem value) {
                if((that._lastUpdated - value.LastAccessed) > that.ExpireLimit)
                    that._expiredItems.Add(value);
            });

            that._expiredItems.ForEach(delegate(ResourceItem value) {
                if(value.Free())
                    that._alocatedItems.Remove(value);
            });
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        public LibraryResult LoadLibrary(String url) {
            ResourceManagerParams param = new ResourceManagerParams();
            LibraryResult ret = new LibraryResult();
            Library that = this;

            param.Type = "json";

            SystemCore.ResourceManager.GetResource(url, param).ResourceChanged.Subscribe(
                delegate(Object sender, object args) {
                    Resource resource = (Resource) sender;

                    if (resource.Finished) {
                        ResourceCollection res = this.LoadLibraryFromJson(resource.Data);

                        ret.Finished.Fire(this, res);
                    }
                }, true);

            return ret;
        }

        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        private ResourceCollection LoadLibraryFromJson(Object json) {
            LibraryObject library = (LibraryObject)json;

            SystemCore.Logger.Log("Loading library : " + library.Name);

            ResourceCollection resourceCollection = null;

            /*test to see if library already exists*/
            if((resourceCollection = this._collections[library.Name]) == null) {
                resourceCollection = new ResourceCollection();
                resourceCollection.Name = library.Name;
                resourceCollection.Resources = new Dictionary<string, ResourceItem>();

                this._collections[resourceCollection.Name] = resourceCollection;
            }

            /*add the library object to the ResourceCollection*/
            this.AppendToCollection(resourceCollection, library.ContentObjects);

            return resourceCollection;
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        private void AppendToCollection(ResourceCollection resourceCollection, List<ResourceObject> resources) {
            foreach (ResourceObject resourceObject in resources) {
                IResourceConverter converter = this._converters[resourceObject.Type];

                if(converter == null) {
                    SystemCore.Logger.Log("No resource converter found for type + " + resourceObject.Type);
                    continue;
                }

                /*convert the resource*/
                ResourceItem res = converter.Convert(resourceObject.Resource, resourceCollection.Name);

                res.Id = resourceObject.Id;
                res.Type = resourceObject.Type;

                /*add the converter object as a resource*/
                resourceCollection.Resources[res.Id] = res;
                /*add the item by it's id*/
                this._items[res.ItemId] = res;
            }
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        public void UnloadLibrary(String name) {

        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        public Handle FindResource(String library, String resourceName) {
            ResourceCollection resourceCollection = null;

            if((resourceCollection = this._collections[library]) == null)
                return null;

            Object resource = null;

            if((resource = resourceCollection.Resources[resourceName]) == null)
                return null;

            return Handle.Create(library, resourceName);
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        public ResourceItem GetResourceById(int itemId) {
            return this._items[itemId];
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        public ResourceItem GetResource(Handle handle) {
            if(this._collections[handle.Collection] == null)
                return null;

            ResourceItem resource = this._collections[handle.Collection].Resources[handle.Id];

            if (resource == null)
                return null;

            if(!resource.Alocated) {
                if(resource.Readlocate())
                    this._alocatedItems.Add(resource);
            }

            resource.LastAccessed = this._lastUpdated;

            return resource;
        }

        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        public void AddConverter(IResourceConverter converter) {
            this._converters[converter.TypeHandled] = converter;
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        public void RemoveConverter(IResourceConverter converter) {
            this._converters.Remove(converter.TypeHandled);
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------

				
    }
}
