using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Serialization;

namespace GLSharp.Data {
    public interface IResourceLoader {
        /// <summary>
        /// Returns the suported extensions by the loader.
        /// </summary>
        List<String> Extension { get; }

        /// <summary>
        /// Loads the given resource.
        /// </summary>
        /// <param name="url">The url at which the resource is located.</param>
        /// <returns>The loaded resouces.</returns>
        Resource Load(String url);
    }

    //------------------------------------------------------------------------------------------
    //------------------------------------------------------------------------------------------
    public class ImageLoader : IResourceLoader {
        public List<string> Extension {
            get {
                List<String> ret = new List<String>();
                ret.Add(".jpg");
                ret.Add(".png");
                ret.Add(".jpeg");
                return ret;
            }
        }

        public Resource Load(string url) {
            Resource ret = new Resource();
            ret.Finished = false;

            Image img = new Image();
            img.OnLoad = delegate {
                ret.Finished = true;
                ret.Data = img;
            };
            img.Src = url;

            return ret;
        }
    }
    //------------------------------------------------------------------------------------------
    //------------------------------------------------------------------------------------------
    public class JsonLoader : IResourceLoader {
        public List<string> Extension {
            get {
                List<String> ret = new List<String>();
                ret.Add(".json");
                return ret;
            }
        }

        public Resource Load(string url) {
            Resource ret = new Resource();
            ret.Finished = false;

            XmlHttpRequest req = new XmlHttpRequest();

            req.Open(HttpVerb.Get, url, true);
            req.OnReadyStateChange = delegate () {
                if(req.ReadyState == ReadyState.Loaded && req.Status == 200) {
                    ret.Finished = true;
                    ret.Data = Json.Parse(req.ResponseText);
                }
            };

            req.Send();
            return ret;
        }
    }


    //------------------------------------------------------------------------------------------
    //------------------------------------------------------------------------------------------


    public class ResourceManager : IResourceManager {

        private readonly Dictionary<String, IResourceLoader> _loaders = new Dictionary<string, IResourceLoader>();

        private String _rootUrl = @"";

        public String RootUrl {
            get { return _rootUrl; }
            set { _rootUrl = value; }
        }

        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        public Resource GetResource(string resource) {
            /*get the extension*/
            int lastPeriod = resource.LastIndexOf('.');
            String extension = "";
            if (lastPeriod > -1) extension = (resource.Substring(lastPeriod, resource.Length)).ToLowerCase();

            /*try to load the resource*/
            IResourceLoader loader = this._loaders[extension];

            if (loader == null)
                throw new Exception("The specified resource is unsuppoted");

            return loader.Load(this.RootUrl + resource);
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        public bool FreeResource(string resource) {
            return false;
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        public void AddLoader(IResourceLoader loader) {
            foreach (String ext in loader.Extension) {
                this._loaders[ext.ToLowerCase()] = loader;
            }
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        public void RemoveLoader(IResourceLoader loader) {
            foreach (String ext in loader.Extension) {
                this._loaders.Remove(ext.ToLowerCase());
            }
        }
    }
}
