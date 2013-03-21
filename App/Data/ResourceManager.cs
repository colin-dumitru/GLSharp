using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Serialization;
using GLSharp.Graphics;
using System.Xml;
using GLSharp.Util.Xml;

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
    public class AudioLoader : IResourceLoader {
        public List<string> Extension {
            get {
                List<String> ret = new List<string>();

                ret.Add("mp3");

                return ret;
            }
        }

        public Resource Load(string url) {
            Resource ret = new Resource();

            Audio audio = new Audio();
            audio.Src = url;

            /*onload does not work for audio*/
            ret.Finished = true;
            ret.Data = audio;

            return ret;
        }
    }
    //------------------------------------------------------------------------------------------
    //------------------------------------------------------------------------------------------
    public class ImageLoader : IResourceLoader {
        public List<string> Extension {
            get {
                List<String> ret = new List<String>();
                ret.Add("jpg");
                ret.Add("gif");
                ret.Add("png");
                ret.Add("jpeg");
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
                ret.Add("json");
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
    public class ShaderLoader : IResourceLoader {
        private WebGL _gl = null;

        public ShaderLoader(WebGL gl) {
            this._gl = gl;
        }

        public List<string> Extension {
            get {
                List<String> ret = new List<String>();
                ret.Add("shader");
                return ret;
            }
        }

        public Resource Load(string url) {
            Resource ret = new Resource();
            ret.Finished = false;

            XmlHttpRequest req = new XmlHttpRequest();

            req.Open(HttpVerb.Get, url, true);
            req.OnReadyStateChange = delegate() {
                if (req.ReadyState == ReadyState.Loaded && req.Status == 200) {
                    ret.Finished = true;

                    /*parse the xml document*/
                    ret.Data = this.ParseShader(XmlDocumentParser.Parse(req.ResponseText));
                }
            };

            req.Send();
            return ret;
        }

        private CompiledShader ParseShader(XmlDocument doc) {
            if(doc.DocumentElement.Name != "shader") 
                throw new Exception("Invalid shader file");

            ShaderLoader that = this;

            /*source code for vertex / fragment shaders*/
            String sourceFragment = null;
            String sourceVertex = null;

            CompiledShader ret = new CompiledShader();

            /*the name of the shader*/
            ret.Name = doc.DocumentElement.Attributes.GetNamedItem("name").Value;
            /*the lists of all unoforms and attributes-*/
            List<String> uniforms = new List<string>();
            List<String> attributes = new List<string>();

            foreach (XmlNode xmlNode in doc.DocumentElement.ChildNodes) {
                if (xmlNode.NodeType != XmlNodeType.Element) continue;
                
                if(xmlNode.Name == "vertex_shader") {
                    sourceVertex = XmlHelper.InnerText(xmlNode);
                } else if(xmlNode.Name == "fragment_shader") {
                    sourceFragment = XmlHelper.InnerText(xmlNode);
                } else if(xmlNode.Name == "uniform") {
                    uniforms.Add(XmlHelper.InnerText(xmlNode));
                } else if(xmlNode.Name == "attribute") {
                    attributes.Add(XmlHelper.InnerText(xmlNode));
                }
            }

            if(sourceFragment == null || sourceVertex == null)
                throw new Exception("Shader file does not contain fragment and vertex shaders");

            /*compile shaders*/
            IShader shaderFragment = this.CompileShader(sourceFragment, WebGLE.FragmentShader);
            IShader shaderVertex = this.CompileShader(sourceVertex, WebGLE.VertexShader);

            /*create the program*/
            IShaderProgram shaderProgram = this._gl.CreateProgram();

            this._gl.AttachShader(shaderProgram, shaderFragment);
            this._gl.AttachShader(shaderProgram, shaderVertex);
            this._gl.LinkProgram(shaderProgram);

            if (!(bool)this._gl.GetProgramParameter(shaderProgram, WebGLE.LinkStatus)) {
                throw new Exception("Cannot link shaders.");
            }

            ret.Attributes = new Dictionary<string, int>();
            ret.Uniforms = new Dictionary<string, IUniformLocation>();

            /*attribute locations*/
            attributes.ForEach(delegate(string value) {
                ret.Attributes[value] = that._gl.GetAttribLocation(shaderProgram, value);
            });

            /*uniform locations*/
            uniforms.ForEach(delegate(string value) {
                ret.Uniforms[value] = that._gl.GetUniformLocation(shaderProgram, value);
            });

            ret.ShaderProgram = shaderProgram;

            return ret;

        }

        private IShader CompileShader(String source, int type) {
            IShader ret = this._gl.CreateShader(type);

            this._gl.ShaderSource(ret, source);
            this._gl.CompileShader(ret);

            if(!(bool)this._gl.GetShaderParameter(ret, WebGLE.CompileStatus)) {
                throw new Exception("Cannot compile shader : " + this._gl.GetShaderInfoLog(ret));
            }
            

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
        public Resource GetResource(string resource, ResourceManagerParams managerParams) {
            if(managerParams == null)
                managerParams = new ResourceManagerParams();

            /*get the extension*/
            if (managerParams.Type == null) {
                int lastPeriod = resource.LastIndexOf('.');
                managerParams.Type = "";
                if (lastPeriod > -1) managerParams.Type = (resource.Substring(lastPeriod + 1, resource.Length));
            }

            managerParams.Type = managerParams.Type.ToLowerCase();

            /*try to load the resource*/
            IResourceLoader loader = this._loaders[managerParams.Type];

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
