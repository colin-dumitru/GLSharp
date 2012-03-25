// Library.cs
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
        Object Convert(Object input);
    }

    /// <summary>
    /// Item Handle.
    /// </summary>
    public class Handle {
        private String _library;

        public String Library {
            get { return _library; }
            set { _library = value; }
        }

        private String _id;

        public String Id {
            get { return this._id; }
            set { this._id = value; }
        }
    }

    public delegate void CollectionHandler(Collection sender, Object args);

    /// <summary>
    /// A named collection of Resources.
    /// </summary>
    public class Collection {
        private String _name;

        public String Name {
            get { return _name; }
            set { _name = value; }
        }

        private Dictionary<String, ResourceItem> _resources;

        public Dictionary<String, ResourceItem> Resources {
            get { return _resources; }
            set { _resources = value; }
        }
    }

    /// <summary>
    /// A resourc item.
    /// </summary>
    public class ResourceItem {
        private String _id;

        public String Id {
            get { return _id; }
            set { _id = value; }
        }

        private String _type;

        public String Type {
            get { return _type; }
            set { _type = value; }
        }

        private Object _item;

        public Object Item {
            get { return this._item; }
            set { this._item = value; }
        }
        
    }

    /// <summary>
    /// A resource object found a Library Object collection.
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

    public delegate void LibraryHandler(Library sender, Object args);
    /// <summary>
    /// Loades and manages resources.
    /// </summary>
    public class Library {
        private Dictionary<String, Collection> _collections = null;
        private Dictionary<String, IResourceConverter> _converters = null;

        public event LibraryHandler CollectionLoaded;

        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------

        public Library() {
            this._collections = new Dictionary<string, Collection>();
            this._converters = new Dictionary<string, IResourceConverter>();
        }

        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        public void LoadLibrary(String url) {
            ResourceManagerParams param = new ResourceManagerParams();

            param.Type = "json";

            SystemCore.ResourceManager.GetResource(url, param).ResourceChanged +=
                delegate(Resource sender, object args) {
                    if (sender.Finished) {
                        this.LoadLibraryFromJson(sender.Data);
                    }
                };
        }

        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        private void LoadLibraryFromJson(Object json) {
            LibraryObject library = (LibraryObject)json;

            SystemCore.Logger.Log("Loading library : " + library.Name);

            Collection collection = null;

            /*test to see if library already exists*/
            if((collection = this._collections[library.Name]) == null) {
                collection = new Collection();
                collection.Name = library.Name;
                collection.Resources = new Dictionary<string, ResourceItem>();

                this._collections[collection.Name] = collection;
            }

            /*add the library object to the collection*/
            this.AppendToCollection(collection, library.ContentObjects);

            /*send the finish event*/
            if (this.CollectionLoaded != null)
                this.CollectionLoaded(this, collection);
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        private void AppendToCollection(Collection collection, List<ResourceObject> resources) {
            foreach (ResourceObject resourceObject in resources) {
                IResourceConverter converter = this._converters[resourceObject.Type];

                if(converter == null) {
                    SystemCore.Logger.Log("No resource converter found for resource + " + resourceObject.Resource);
                    continue;
                }

                /*convert the resource*/
                Object res = converter.Convert(resourceObject.Resource);

                ResourceItem item = new ResourceItem();
                item.Id = resourceObject.Id;
                item.Type = resourceObject.Type;
                item.Item = res;

                /*add the converter object as a resource*/
                collection.Resources[item.Id] = item;
            }
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        public void UnloadLibrary(String name) {

        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        public Handle FindResource(String library, String resourceName) {
            Collection collection = null;

            if((collection = this._collections[library]) == null)
                return null;

            Object resource = null;

            if((resource = collection.Resources[resourceName]) == null)
                return null;

            Handle ret = new Handle();

            ret.Library = library;
            ret.Id = resourceName;

            return ret;
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        public Object GetResource(Handle handle) {
            return this._collections[handle.Library].Resources[handle.Id];
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
