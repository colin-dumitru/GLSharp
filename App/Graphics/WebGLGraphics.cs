using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Html;
using System.Html.Media.Graphics;
using GLSharp.Content;
using GLSharp.Core;
using GLSharp.Data;
using GLSharp.Graphics.Core;
using GLSharp.Graphics.Effects;
using GLSharp.Html;
using GLSharp.Universe;
using GLSharp.Util;

namespace GLSharp.Graphics {

    internal class PhongBinder : IShaderBinder{
        private Library _library;
        private WebGL _graphics;
        private ShaderGroup _parent;

        /*buffers used to render full screen quad*/
        private IBuffer _vertexBuffer = null;

        public PhongBinder(Library library, WebGL graphics, ShaderGroup parent) {
            if(parent == null)
                throw new Exception("Parent cannot be null");
            if (graphics == null)
                throw new Exception("Graphics cannot be null");
            if (library == null)
                throw new Exception("Library cannot be null");

            this._library = library;
            this._graphics = graphics;
            this._parent = parent;

            this._vertexBuffer = this._graphics.CreateBuffer();
            this._graphics.BindBuffer(WebGLE.ArrayBuffer, _vertexBuffer);
            float[] vertices = SystemCore.Environment.CreateFloat32ArrayFromArray(new float[] {
                1.0f, 1.0f, 0.0f,
                -1.0f, 1.0f, 0.0f,
                1.0f, -1.0f, 0.0f,
                -1.0f, -1.0f, 0.0f
            });
            this._graphics.BufferData(WebGLE.ArrayBuffer, vertices, WebGLE.StaticDraw);
        }

        public void BindGeometryPass(Matrix4X4 pMatrix) {
            if (this._parent.GeometryPassShader == null) return;

            this._graphics.UseProgram(this._parent.GeometryPassShader.ShaderProgram);
            /*bind constant matricees*/
            this._graphics.UniformMatrix4fv(this._parent.GeometryPassShader.Uniforms["uPMatrix"], false, pMatrix.Elements);
        }

        public void BindGeometryInstance(Matrix4X4 mvMatrix, Matrix4X4 nMatrix) {
            if (this._parent.GeometryPassShader == null) return;

            /*matrix tranformation*/
            this._graphics.UniformMatrix4fv(this._parent.GeometryPassShader.Uniforms["uMVMatrix"], false, mvMatrix.Elements);
            this._graphics.UniformMatrix4fv(this._parent.GeometryPassShader.Uniforms["uNMatrix"], false, nMatrix.Elements);
        }

        public void BindGeometryMesh(MeshItem mesh) {
            if (this._parent.GeometryPassShader == null) return;

            this._graphics.BindBuffer(WebGLE.ArrayBuffer, mesh.MeshBuffer);

            this._graphics.VertexAttribPointer(this._parent.GeometryPassShader.Attributes["aVertexPosition"], 3, WebGLE.FloatT, false, 0, mesh.OffsetPosition * 4);
            this._graphics.VertexAttribPointer(this._parent.GeometryPassShader.Attributes["aNormalPosition"], 3, WebGLE.FloatT, false, 0, mesh.OffsetNormal * 4);
            this._graphics.VertexAttribPointer(this._parent.GeometryPassShader.Attributes["aUVPosition"], 2, WebGLE.FloatT, false, 0, mesh.OffsetUv * 4);

            /*index array*/
            this._graphics.BindBuffer(WebGLE.ElementArrayBuffer, mesh.IndexBuffer);
        }

        public void BindGeometryMaterial(MaterialItem material) {
            if (this._parent.GeometryPassShader == null) return;

            /*bind material*/
            TextureItem texture = (TextureItem)this._library.GetResource((Handle)material.Properties["diffuse"].Value);

            this._graphics.Uniform1f(this._parent.GeometryPassShader.Uniforms["uShinines"], material.Properties["shininess"] != null ?
                (float)material.Properties["shininess"].Value : 0);
            this._graphics.Uniform1f(this._parent.GeometryPassShader.Uniforms["uEmissive"], material.Properties["emission"] != null ? 
                ((float[])material.Properties["emission"].Value)[0] : 1);

            if (texture != null) {
                this._graphics.ActiveTexture(WebGLE.Texture0);
                this._graphics.BindTexture(WebGLE.Texture_2D, texture.Texture);
                this._graphics.Uniform1i(this._parent.GeometryPassShader.Uniforms["uSampler"], 0);
            } else {
                this._graphics.ActiveTexture(WebGLE.Texture0);
                this._graphics.BindTexture(WebGLE.Texture_2D, null);
                this._graphics.Uniform1i(this._parent.GeometryPassShader.Uniforms["uSampler"], 0);
            }
        }

        public void BindGeometryPassNum(int pass) {
            if (this._parent.GeometryPassShader == null) return;

            this._graphics.Uniform1i(this._parent.GeometryPassShader.Uniforms["uPass"], pass);
        }
        
        public void BindLightPass(ITexture diffuse, ITexture position, ITexture normal, float[]  viewport) {
            if (this._parent.LightPassShader == null) return;

            this._graphics.UseProgram(this._parent.LightPassShader.ShaderProgram);

            /*viewport*/
            this._graphics.Uniform2f(_parent.LightPassShader.Uniforms["uViewport"], viewport[0], viewport[1]);

            /*textures*/
            this._graphics.ActiveTexture(WebGLE.Texture0);
            this._graphics.BindTexture(WebGLE.Texture_2D, diffuse);
            this._graphics.Uniform1i(_parent.LightPassShader.Uniforms["uSDiffuse"], 0);

            this._graphics.ActiveTexture(WebGLE.Texture1);
            this._graphics.BindTexture(WebGLE.Texture_2D, position);
            this._graphics.Uniform1i(_parent.LightPassShader.Uniforms["uSPosition"], 1);

            this._graphics.ActiveTexture(WebGLE.Texture2);
            this._graphics.BindTexture(WebGLE.Texture_2D, normal);
            this._graphics.Uniform1i(_parent.LightPassShader.Uniforms["uSNormal"], 2);
        }

        public void BindLightMesh(MeshItem lightVolume) {
            if (this._parent.LightPassShader == null) return;

            /*bind the vbo's*/
            this._graphics.BindBuffer(WebGLE.ArrayBuffer, lightVolume.MeshBuffer);
            this._graphics.VertexAttribPointer(_parent.LightPassShader.Attributes["aVertexPosition"], 3, WebGLE.FloatT, false, 0, lightVolume.OffsetPosition * 4);

            this._graphics.BindBuffer(WebGLE.ElementArrayBuffer, lightVolume.IndexBuffer);
        }

        public void BindLight(Vector3 lightPos, LightItem light, Matrix4X4 mvMatrix, Matrix4X4 pMatrix) {
            if (this._parent.LightPassShader == null) return;

            /*uniforms*/
            this._graphics.UniformMatrix4fv(_parent.LightPassShader.Uniforms["uMVMatrix"], false, mvMatrix.Elements);
            this._graphics.UniformMatrix4fv(_parent.LightPassShader.Uniforms["uPMatrix"], false, pMatrix.Elements);

            this._graphics.Uniform3f(_parent.LightPassShader.Uniforms["uLightPos"], lightPos.Elements[0], lightPos.Elements[1], lightPos.Elements[2]);
            this._graphics.Uniform3f(_parent.LightPassShader.Uniforms["uLightColor"], ((float[])light.Properties["color"])[0],
                ((float[])light.Properties["color"])[1], ((float[])light.Properties["color"])[2]);
            this._graphics.Uniform1i(_parent.LightPassShader.Uniforms["uLightType"], light.LightType);
            this._graphics.Uniform1f(_parent.LightPassShader.Uniforms["uLightIntensity"], (float)light.Properties["intensity"]);
        }

        public void BindPrePostPass(ITexture diffuse, ITexture position, ITexture normal, ITexture accumulation) {
            if (this._parent.PrePostProcessPassShader == null) return;

            this._graphics.UseProgram(_parent.PrePostProcessPassShader.ShaderProgram);

            /*full screen quad buffer*/
            this._graphics.BindBuffer(WebGLE.ArrayBuffer, this._vertexBuffer);
            this._graphics.VertexAttribPointer(_parent.PrePostProcessPassShader.Attributes["aVertexPosition"], 3, WebGLE.FloatT, false, 0, 0);

            /*textures*/
            this._graphics.ActiveTexture(WebGLE.Texture0);
            this._graphics.BindTexture(WebGLE.Texture_2D, diffuse);
            this._graphics.Uniform1i(_parent.PrePostProcessPassShader.Uniforms["uSDiffuse"], 0);

            this._graphics.ActiveTexture(WebGLE.Texture1);
            this._graphics.BindTexture(WebGLE.Texture_2D, position);
            this._graphics.Uniform1i(_parent.PrePostProcessPassShader.Uniforms["uSPosition"], 1);

            this._graphics.ActiveTexture(WebGLE.Texture2);
            this._graphics.BindTexture(WebGLE.Texture_2D, normal);
            this._graphics.Uniform1i(_parent.PrePostProcessPassShader.Uniforms["uSNormal"], 2);

            this._graphics.ActiveTexture(WebGLE.Texture3);
            this._graphics.BindTexture(WebGLE.Texture_2D, accumulation);
            this._graphics.Uniform1i(_parent.PrePostProcessPassShader.Uniforms["uSAccumulation"], 3);
        }

        public void BindFinalPass(ITexture post) {
            if (this._parent.FinalPassShader == null) return;

            this._graphics.UseProgram(_parent.FinalPassShader.ShaderProgram);

            /*textures*/
            this._graphics.ActiveTexture(WebGLE.Texture0);
            this._graphics.BindTexture(WebGLE.Texture_2D, post);
            this._graphics.Uniform1i(_parent.FinalPassShader.Uniforms["uSPost"], 0);
        }
    }

   
    //------------------------------------------------------------------------------------------
    //------------------------------------------------------------------------------------------
   
    public class WebGLGraphics : IGraphics {
        private CanvasElementGl _canvas = null;
        private WebGL _context = null;
        private int _renderTextureDim = 0;
        private float[] _renderViewport = null;

        /*contains the diffuse RGB and specular power*/
        private RenderGroup _diffuseGroup = null;
        /*contains the position xyz an emissive power*/
        private RenderGroup _positionGroup = null;
        /*contains the normal xyz and depth*/
        private RenderGroup _normalGroup = null;
        /*the accumulation buffer used rgb-diffuse accumulation, a-specular accumulation*/
        private RenderGroup _accumulationGroup = null;
        /*final render group*/
        private RenderGroup _postGroup = null;
        /*reder buffer used for depth testing*/
        private IRenderBuffer _depthbuffer = null;

        /*post process effects queue*/
        private List<IPostProcessEffect> _effects; 
        /*last render group used in the post process pass*/
        private RenderGroup _lastGroup;
        /*used to cache active texture target*/
        private List<int> _activeTextureTarget; 

        /*lista of all supported shaders used in rendering*/
        private Dictionary<String, ShaderGroup> _shaderGroups = null;
        /*active shader group used for lighting /final pass*/
        public String ActiveShaderGroup = null;
        /*used for caching shader programs*/
        private String _lastGeometryShader = null;
        private String _lastLightShader = null;
        /*ligth volumes*/
        private MeshItem _lightSphereVolume = null;
        /*used for view occlusion*/
        private Boolean _meshLoaded = false;
        private CullInfo _cullInfo = null;

        /*the modev view matrix*/
        private Matrix4X4 _mvMatrix = null;
        /*the perspective matrix*/
        private Matrix4X4 _pMatrix = null;
        /*used in the shader*/
        private Matrix4X4 _nMatrix = null;
        /*inverse camera transform*/
        private Matrix4X4 _vMatrix = null;
        /*cached scale matrix*/
        private Matrix4X4 _scaleMatrix = null;

        /*camera*/
        private Node _camera = null;
        /*active view occluder*/
        private IViewOccluder _occluder = null;

        /*world which will be rendered*/
        private World _world = null;
        /*resource library which contains all resources for the active scene*/
        private Library _library = null;
        
        /// <summary>
        /// The height of the drawing area.
        /// </summary>
        public int Height {
            get {
                if (this._canvas != null)
                    return this._canvas.Height;
                return -1;
            }
        }

        /// <summary>
        /// The width of the draing area.
        /// </summary>
        public int Width {
            get {
                if (this._canvas != null)
                    return this._canvas.Width;
                return -1;
            }
        }

        /// <summary>
        /// Gets and sets the world used for drawing.
        /// </summary>
        public World World {
            get {
                return this._world;                
            }
            set {
                this._world = value;
                this.BindWorld(this._world);
            }
        }

        public Node Camera {
            get { return this._camera; }
            set {
                if (value.Components[Component.CameraComponent] == null)
                    throw new Exception("Camera does not have a camera component.");
                this._camera = value;
            }
        }

        public IViewOccluder ViewOccluder {
            get { return this._occluder; }
            set { this._occluder = value; }
        }

        /// <summary>
        /// Gets or sets the main library.
        /// </summary>
        public Library Library {
            get { return this._library; }
            set { this._library = value; }
        }

        /// <summary>
        /// Gets the context used by the graphics object.
        /// </summary>
        public WebGL Context {
            get { return this._context; }
        }

        /*a list of all nodes used for rendering sorted by mesh id*/
        private List<List<Node>> _opaqueMeshQueue = null;
        private List<List<Node>> _transparentMeshQueue = null;
        /*light nodes sorted by type*/
        private Dictionary<int, List<Node>> _lightQueue = null; 

        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        public WebGLGraphics(CanvasElementGl canvas) {

            this._canvas = canvas;
            this._context = canvas.GetContext("experimental-webgl", new WebGLContextAttributes());
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        public void Initialize(float fov, float zNear, float zFar) {
            this.DisplayDebugInformation();
            WebGLGraphics that = this;

            /*render texture dimensions*/
            this._renderTextureDim = this.SmallestPowerOfTwo(_canvas.Width);
            this._renderViewport =
                SystemCore.Environment.CreateFloat32ArrayFromArray(new float[] { _renderTextureDim, _renderTextureDim, });

            this._shaderGroups = new Dictionary<string, ShaderGroup>();

            /*rendering shaders*/
            ShaderGroup phongShaderGroup = new ShaderGroup();
            phongShaderGroup.Name = "phong";
            phongShaderGroup.ShaderBinder = new PhongBinder(that.Library, that._context, phongShaderGroup);

            SystemCore.ResourceManager.GetResource("/Data/Shader/phong_pass_geom.shader", null).ResourceChanged.Subscribe(
                delegate(object sender, object args) {
                Resource resource = (Resource) sender;

                if (resource.Finished) {
                    phongShaderGroup.GeometryPassShader = (CompiledShader) resource.Data;
                }
            }, null);

            SystemCore.ResourceManager.GetResource("/Data/Shader/phong_pass_prepost.shader", null).ResourceChanged.Subscribe(
                delegate(object sender, object args) {
                Resource resource = (Resource)sender;

                if (resource.Finished) {
                    phongShaderGroup.PrePostProcessPassShader = (CompiledShader)resource.Data;
                }
            }, null);

            SystemCore.ResourceManager.GetResource("/Data/Shader/phong_pass_light.shader", null).ResourceChanged.Subscribe(
                delegate(object sender, object args) {
                Resource resource = (Resource)sender;

                if (resource.Finished) {
                    phongShaderGroup.LightPassShader = (CompiledShader)resource.Data;
                }
            }, null);

            SystemCore.ResourceManager.GetResource("/Data/Shader/phong_pass_final.shader", null).ResourceChanged.Subscribe(
                delegate(object sender, object args) {
                Resource resource = (Resource)sender;

                if (resource.Finished) {
                    phongShaderGroup.FinalPassShader = (CompiledShader)resource.Data;
                }
            }, null);

            this.AddShaderGroup(phongShaderGroup);
            this.ActiveShaderGroup = "phong";

            /*core library - which contain things like light bounding meshes*/
            Library.LoadLibrary("/Data/JSON/core.json").Finished.Subscribe(delegate(object sender, object args) {
                Handle sphereHandle = new Handle();
                sphereHandle.Collection = "core";
                sphereHandle.Id = "point_light_sphere-lib";

                that._lightSphereVolume = ((MeshItem)Library.GetResource(sphereHandle));
            }, true);

            /*enable webGL float texture extension*/
            SystemCore.Logger.Log(this._context.GetExtension("OES_texture_float").ToString());

            this.SetupFrameBuffers();

            /*webgl render queues*/
            this._opaqueMeshQueue = new List<List<Node>>();
            this._transparentMeshQueue = new List<List<Node>>();
            this._lightQueue = new Dictionary<int, List<Node>>();

            /*camera*/
            this._camera = new Node();
            this._camera.AddComponent(new CameraComponent());

            /*perspective*/
            this._scaleMatrix = new Matrix4X4(null);
            this._mvMatrix = new Matrix4X4(null);
            this._vMatrix = new Matrix4X4(null);
            this._nMatrix = new Matrix4X4(null);
            this._pMatrix = Matrix4X4.MakePerspective(fov, 800.0f / 600.0f, zNear, zFar);

            this._context.Viewport(0, 0, this._renderTextureDim, this._renderTextureDim);
            this._context.EnableVertexAttribArray(0);
            this._context.EnableVertexAttribArray(1);
            this._context.EnableVertexAttribArray(2);

            this._context.Enable(WebGLE.DepthTest);
            this._context.Enable(WebGLE.CullFace);
            this._context.BlendFunc(WebGLE.SrcAlpha, WebGLE.One);

            /*occlusion*/
            this._cullInfo = new CullInfo();

            /*post process effects*/
            this._effects = new List<IPostProcessEffect>();

            /*active texture targets*/
            this._activeTextureTarget = new List<int>();
            this._activeTextureTarget[0] = WebGLE.Texture0;
            this._activeTextureTarget[1] = WebGLE.Texture1;
            this._activeTextureTarget[2] = WebGLE.Texture2;
            /*I don't need any more for now*/
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        private void SetupFrameBuffers() {
            this._depthbuffer = this._context.CreateRenderbuffer();
            this._context.BindRenderbuffer(WebGLE.Renderbuffer, this._depthbuffer);
            this._context.RenderbufferStorage(WebGLE.Renderbuffer, WebGLE.DepthComponent16, this._renderTextureDim, this._renderTextureDim);

            this._diffuseGroup = this.CreateRenderGroup(true);
            this._normalGroup = this.CreateRenderGroup(true);
            this._positionGroup = this.CreateRenderGroup(true);
            this._accumulationGroup = this.CreateRenderGroup(true);
            this._postGroup = this.CreateRenderGroup(true);
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        [Conditional("DEBUG")]
        private void DisplayDebugInformation() {
            SystemCore.Logger.Log("Supported extensions : " + this.Context.GetSupportedExtensions());
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        [Conditional("DEBUG")]
        private void DebugLog(String message) {
            SystemCore.Logger.Log(message);
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        public bool AllocateTexture(TextureItem texture) {
            if (texture.Image == null)
                return false;

            texture.Texture = this.CreateTexture(texture.Image);
            return true;
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        public bool FreeTexture(TextureItem texture) {
            if (texture.Texture == null)
                return false;

            this._context.DeleteTexture(texture.Texture);
            return true;
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        public bool AllocateMesh(MeshItem mesh) {
            /*vertex position buffer*/
            IBuffer meshBuffer = this._context.CreateBuffer();

            this._context.BindBuffer(WebGLE.ArrayBuffer, meshBuffer);
            this._context.BufferData(WebGLE.ArrayBuffer, mesh.Mesh, WebGLE.StaticDraw);

            /*index buffer*/
            IBuffer indexBuffer = this._context.CreateBuffer();
            this._context.BindBuffer(WebGLE.ElementArrayBuffer, indexBuffer);
            this._context.BufferData(WebGLE.ElementArrayBuffer, mesh.Indexes, WebGLE.StaticDraw);

            mesh.IndexBuffer = indexBuffer;
            mesh.MeshBuffer = meshBuffer;

            return true;
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        public bool DealocateMesh(MeshItem mesh) {
            this._context.DeleteBuffer(mesh.IndexBuffer);
            this._context.DeleteBuffer(mesh.MeshBuffer);

            return true;
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        private ITexture CreateDepthTexture() {
            ITexture ret = this._context.CreateTexture();

            this._context.BindTexture(WebGLE.Texture_2D, ret);
            this._context.TexParameteri(WebGLE.Texture_2D, WebGLE.TextureMinFilter, WebGLE.Nearest);
            this._context.TexParameteri(WebGLE.Texture_2D, WebGLE.TextureMagFilter, WebGLE.Nearest);
            this._context.TexParameteri(WebGLE.Texture_2D, WebGLE.TextureWrapS, WebGLE.ClampToEdge);
            this._context.TexParameteri(WebGLE.Texture_2D, WebGLE.TextureWrapT, WebGLE.ClampToEdge);
            this._context.TexImage2D(WebGLE.Texture_2D, 0, WebGLE.DepthComponent16, _renderTextureDim, _renderTextureDim, 0, WebGLE.DepthComponent, WebGLE.UnsignedByteT, null);

            return ret;
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        public ITexture CreateRenderTexture() {
            ITexture ret = this._context.CreateTexture();

            this._context.BindTexture(WebGLE.Texture_2D, ret);
            this._context.TexParameteri(WebGLE.Texture_2D, WebGLE.TextureMinFilter, WebGLE.Nearest);
            this._context.TexParameteri(WebGLE.Texture_2D, WebGLE.TextureMagFilter, WebGLE.Nearest);
            this._context.TexParameteri(WebGLE.Texture_2D, WebGLE.TextureWrapS, WebGLE.ClampToEdge);
            this._context.TexParameteri(WebGLE.Texture_2D, WebGLE.TextureWrapT, WebGLE.ClampToEdge);
            this._context.TexImage2D(WebGLE.Texture_2D, 0, WebGLE.Rgba, _renderTextureDim, _renderTextureDim, 0, WebGLE.Rgba, WebGLE.FloatT, null);

            return ret;
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        private int SmallestPowerOfTwo(double el) {
            int ret = 2;

            while (ret < el) ret *= 2;

            return ret;
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        private void UpdateCullInfo(Matrix4X4 mv) {
            if (this._cullInfo.ModelView == null) {
                this._cullInfo.LeftClip[0] = this._pMatrix.Elements[0] + this._pMatrix.Elements[3];
                this._cullInfo.LeftClip[1] = this._pMatrix.Elements[4] + this._pMatrix.Elements[7];
                this._cullInfo.LeftClip[2] = this._pMatrix.Elements[8] + this._pMatrix.Elements[11];
                this._cullInfo.LeftClip[3] = this._pMatrix.Elements[12] + this._pMatrix.Elements[15];

                this._cullInfo.RightClip[0] = -this._pMatrix.Elements[0] + this._pMatrix.Elements[3];
                this._cullInfo.RightClip[1] = -this._pMatrix.Elements[4] + this._pMatrix.Elements[7];
                this._cullInfo.RightClip[2] = -this._pMatrix.Elements[8] + this._pMatrix.Elements[11];
                this._cullInfo.RightClip[3] = -this._pMatrix.Elements[12] + this._pMatrix.Elements[15];

                this._cullInfo.BotClip[0] = this._pMatrix.Elements[1] + this._pMatrix.Elements[3];
                this._cullInfo.BotClip[1] = this._pMatrix.Elements[5] + this._pMatrix.Elements[7];
                this._cullInfo.BotClip[2] = this._pMatrix.Elements[9] + this._pMatrix.Elements[11];
                this._cullInfo.BotClip[3] = this._pMatrix.Elements[13] + this._pMatrix.Elements[15];

                this._cullInfo.TopClip[0] = -this._pMatrix.Elements[1] + this._pMatrix.Elements[3];
                this._cullInfo.TopClip[1] = -this._pMatrix.Elements[5] + this._pMatrix.Elements[7];
                this._cullInfo.TopClip[2] = -this._pMatrix.Elements[9] + this._pMatrix.Elements[11];
                this._cullInfo.TopClip[3] = -this._pMatrix.Elements[13] + this._pMatrix.Elements[15];

                this._cullInfo.NearClip[0] = this._pMatrix.Elements[2] + this._pMatrix.Elements[3];
                this._cullInfo.NearClip[1] = this._pMatrix.Elements[6] + this._pMatrix.Elements[7];
                this._cullInfo.NearClip[2] = this._pMatrix.Elements[10] + this._pMatrix.Elements[11];
                this._cullInfo.NearClip[3] = this._pMatrix.Elements[14] + this._pMatrix.Elements[15];

                this._cullInfo.FarClip[0] = -this._pMatrix.Elements[2] + this._pMatrix.Elements[3];
                this._cullInfo.FarClip[1] = -this._pMatrix.Elements[6] + this._pMatrix.Elements[7];
                this._cullInfo.FarClip[2] = -this._pMatrix.Elements[10] + this._pMatrix.Elements[11];
                this._cullInfo.FarClip[3] = -this._pMatrix.Elements[14] + this._pMatrix.Elements[15];
            }

            this._cullInfo.ModelView = mv.Elements;
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        public ITexture CreateTexture(IImageResource image) {
            ITexture ret = this._context.CreateTexture();

            this._context.BindTexture(WebGLE.Texture_2D, ret);

            this._context.PixelStorei(WebGLE.UnpackFlipY, 1);
            this._context.TexImage2D(WebGLE.Texture_2D, 0, WebGLE.Rgba, WebGLE.Rgba, WebGLE.UnsignedByteT, image);
            this._context.TexParameteri(WebGLE.Texture_2D, WebGLE.TextureMagFilter, WebGLE.Nearest);
            this._context.TexParameteri(WebGLE.Texture_2D, WebGLE.TextureMinFilter, WebGLE.Nearest);

            this._context.BindTexture(WebGLE.Texture_2D, null);

            return ret;
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        public RenderGroup CreateRenderGroup(Boolean commonDepth) {
            RenderGroup ret = new RenderGroup();

            ret.RenderTexture = this.CreateRenderTexture();
            if (commonDepth)
                ret.DepthRenderBuffer = this._depthbuffer;
            else
                ret.DepthRenderBuffer = null; /*not supported yet*/

            ret.FrameBuffer = this._context.CreateFramebuffer();
            this._context.BindFramebuffer(WebGLE.FrameBuffer, ret.FrameBuffer);
            this._context.BindRenderbuffer(WebGLE.Renderbuffer, ret.DepthRenderBuffer);
            this._context.FramebufferRenderbuffer(WebGLE.FrameBuffer, WebGLE.DepthAttachment, WebGLE.Renderbuffer, ret.DepthRenderBuffer);
            this._context.FramebufferTexture2D(WebGLE.FrameBuffer, WebGLE.ColorAttachment0, WebGLE.Texture_2D, ret.RenderTexture, 0);

            return ret;
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        public void CleanRenderGroup(RenderGroup old) {
            if(old == null)
                return;

            this._context.DeleteFramebuffer(old.FrameBuffer);
            this._context.DeleteTexture(old.RenderTexture);
            if(old.DepthRenderBuffer != this._depthbuffer)
                this._context.DeleteRenderbuffer(old.DepthRenderBuffer);
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        public void SwitchRenderGroup(RenderGroup group) {
            this._context.BindFramebuffer(WebGLE.FrameBuffer, group.FrameBuffer);
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        public void AddShaderGroup(ShaderGroup shaderGroup) {
            this._shaderGroups[shaderGroup.Name] = shaderGroup;
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        public void QueuePostProcess(IPostProcessEffect effect) {
            int index = 0;

            if((index = this._effects.IndexOf(effect)) != -1)
                this._effects.RemoveAt(index);

            this._effects.Add(effect);

            effect.Init(this._diffuseGroup.RenderTexture, this._normalGroup.RenderTexture, this._positionGroup.RenderTexture,
                this._accumulationGroup.RenderTexture);

            effect.Reset(this);
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        public void RenderPostProcess() {
            this._context.DrawArrays(WebGLE.TriangleStrip, 0, 4);
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        public void Render() {

            this._lastGeometryShader = null;
            this._lastLightShader = null;

            /*camera matrix*/
            this._camera.World.Copy(this._vMatrix);
            this._vMatrix.Inverse();

            /* --- geometry pass -- */

            /*bind the frame buffer and the depth texture*/
            this._context.ClearColor(0.0f, 0.0f, 0.0f, 0.0f);

            this.SwitchRenderGroup(this._diffuseGroup);
            this._context.Clear(WebGLE.ColorBufferBit);
            this.SwitchRenderGroup(this._positionGroup);
            this._context.Clear(WebGLE.ColorBufferBit);
            this.SwitchRenderGroup(this._normalGroup);
            this._context.Clear(WebGLE.ColorBufferBit | WebGLE.DepthBufferBit);
            this.SwitchRenderGroup(this._accumulationGroup);
            this._context.Clear(WebGLE.ColorBufferBit);
            this._context.BindFramebuffer(WebGLE.FrameBuffer, null);
            this._context.Clear(WebGLE.ColorBufferBit | WebGLE.DepthBufferBit);

            this._context.Enable(WebGLE.DepthTest);
            this._context.Disable(WebGLE.Blend);
            this._context.CullFace(WebGLE.Back);

            this.OpaqueGeometryPass();


            this._context.Disable(WebGLE.DepthTest);
            this._context.Enable(WebGLE.Blend);
            this.SwitchRenderGroup(this._accumulationGroup);

            /*lighting pass*/
            this._context.CullFace(WebGLE.Front);
            this.LightPass();

            /*pre-post processing pass*/
            this._context.Disable(WebGLE.Blend);
            this._context.CullFace(WebGLE.Back);

            this._context.BindFramebuffer(WebGLE.FrameBuffer, this._postGroup.FrameBuffer);
            this.PrePostPass();

            /*post process pass*/
            this.PostProcessingPass();

            /*final pass*/
            this._context.BindFramebuffer(WebGLE.FrameBuffer, null);
            this.FinalPass();
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        public void Clear(Boolean color, Boolean depth) {
            if (color && depth)
                this._context.Clear(WebGLE.ColorBufferBit | WebGLE.DepthBufferBit);
            else if (color)
                this._context.Clear(WebGLE.ColorBufferBit);
            else
                this._context.Clear(WebGLE.DepthBufferBit);
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        public void SetBlend(Boolean enable) {
            if(enable)
                this._context.Enable(WebGLE.Blend);
            else 
                this._context.Disable(WebGLE.Blend);
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        private void OpaqueGeometryPass() {
            /*javascript list works the same way as objects with numbers as properties.
             Meaning var a = []; a[1] = {}; results in a[0] = Undefined and a[1] = Object.
             This is why I cannot use regular for for iterating. Also script#'s implementation
             of iterations adds to much overhead and will slow down things to much. This is the
             best comprompise I've got with the current compiler.
             
             **Upon further inspection, calling the foreach method is actually faster than a for in.
             Probably due to the way JIT works on Chrome*/
            WebGLGraphics that = this;

            IShaderBinder shaderBinder = that._shaderGroups[that.ActiveShaderGroup].ShaderBinder;

            if(shaderBinder == null)
                return;

            shaderBinder.BindGeometryPass(this._pMatrix);

            /*method groups don't work because of the way javascript handles closures*/
            this._opaqueMeshQueue.ForEach( delegate(List<Node> value, int index, IReadonlyCollection<List<Node>> collection) {
                MeshItem mesh = (MeshItem)that.Library.GetResourceById(index);

                this._meshLoaded = false;

                value.ForEach(delegate(Node node) {
                    /*compute matricees*/
                    this._vMatrix.MultiplyM2(node.World, this._mvMatrix);
                    this._mvMatrix.Inverse2(this._nMatrix); this._nMatrix.Transpose();

                    this.UpdateCullInfo(this._mvMatrix);

                    /*test for view occlusion*/
                    if(this._occluder != null && !this._occluder.Test(this._cullInfo, node, mesh))
                        return;

                    if (!this._meshLoaded) {
                        /*bind mesh item*/
                        shaderBinder.BindGeometryMesh(mesh);
                        this._meshLoaded = true;
                    }

                    that.RenderOpaqueMesh(node, this._mvMatrix, this._nMatrix, mesh.Indexes.Length, shaderBinder);
                });
            });
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        private void RenderOpaqueMesh(Node node, Matrix4X4 mv, Matrix4X4 nv, int vertexLength, IShaderBinder binder) {

            /*check for material*/
            MaterialComponent materialComponent = (MaterialComponent)node.Components[Component.MaterialComponent];

            if (materialComponent == null) {
                this.DebugLog("Cannot render node [" + node.Id + "] : material not found.");
                return;
            }

            /*get the actual objects*/
            MaterialItem material = (MaterialItem)this.Library.GetResource(materialComponent.MaterialHandle);

            binder.BindGeometryMaterial(material);

            binder.BindGeometryInstance(mv, nv);

            /*due to the lack of mrt support, I have to use multiple passes for the same object*/
            /*diffuse pass*/
            this.SwitchRenderGroup(this._diffuseGroup);
            this._context.DepthFunc(WebGLE.Lequal);
            binder.BindGeometryPassNum(0);

            this._context.DrawElements(WebGLE.Triangles, vertexLength, WebGLE.UnsignedShortT, 0);

            /*position pass*/
            this.SwitchRenderGroup(this._positionGroup);
            this._context.DepthFunc(WebGLE.Equal);
            binder.BindGeometryPassNum(1);

            this._context.DrawElements(WebGLE.Triangles, vertexLength, WebGLE.UnsignedShortT, 0);

            /*normal pass*/
            this.SwitchRenderGroup(this._normalGroup);
            binder.BindGeometryPassNum(2);

            this._context.DrawElements(WebGLE.Triangles, vertexLength, WebGLE.UnsignedShortT, 0);
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        private void LightPass() {
            ShaderGroup lightShader = this._shaderGroups[this.ActiveShaderGroup];

            if(lightShader == null)
                return;

            if(this._lastLightShader != this.ActiveShaderGroup) {
                this._lastLightShader = this.ActiveShaderGroup;
                lightShader.ShaderBinder.BindLightPass(this._diffuseGroup.RenderTexture,
                    this._positionGroup.RenderTexture, this._normalGroup.RenderTexture, this._renderViewport);
            }

            /*this is still js*/
            WebGLGraphics that = this;

            /*point light type*/
            if (this._lightSphereVolume != null) {
                lightShader.ShaderBinder.BindLightMesh(this._lightSphereVolume);
                if (this._lightQueue[LightComponent.TypePoint] != null) {
                    this._lightQueue[LightComponent.TypePoint].ForEach(delegate(Node value) {
                        that.RenderLight(lightShader, (LightComponent) value.Components[Component.LightComponent],
                            this._lightSphereVolume);
                    });
                }
            }
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        private void RenderLight(ShaderGroup lightShader, LightComponent component, MeshItem lightVolume) {
            LightItem light = (LightItem) this._library.GetResource(component.LightHandle);

            if(light == null)
                return;

            float intensity = (float) light.Properties["intensity"];

            /*update sphere scale matrix*/
            this._scaleMatrix.Elements[0] = intensity * 2;
            this._scaleMatrix.Elements[5] = intensity * 2;
            this._scaleMatrix.Elements[10] = intensity * 2;
            this._scaleMatrix.Elements[15] = 1.0f;

            this._vMatrix.MultiplyM2(component.Parent.World, this._mvMatrix);
            this._mvMatrix.MultiplyM2(this._scaleMatrix, this._mvMatrix);

            Vector3 pos = this._mvMatrix.TransformV(new Vector3(new float[] {0.0f, 0.0f, 0.0f}));

            /*check view occlusion*/
            this.UpdateCullInfo(this._mvMatrix);

            /*test for view occlusion*/
            if (this._occluder != null && !this._occluder.Test(this._cullInfo, null, lightVolume))
                return;

            /*bind shader, mesh and buffers*/
            lightShader.ShaderBinder.BindLight(pos, light, this._mvMatrix, this._pMatrix);
            this._context.DrawElements(WebGLE.Triangles, this._lightSphereVolume.Indexes.Length, WebGLE.UnsignedShortT, 0);
            
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        private void PrePostPass() {
            this._context.DepthFunc(WebGLE.Lequal);

            //! I messed this up, there should be a single final pass shader, but I put in a shader group
            if (this._shaderGroups[this.ActiveShaderGroup] == null) return;

            this._shaderGroups[this.ActiveShaderGroup].ShaderBinder.BindPrePostPass(this._diffuseGroup.RenderTexture,
                this._positionGroup.RenderTexture, this._normalGroup.RenderTexture, this._accumulationGroup.RenderTexture);
            this._context.DrawArrays(WebGLE.TriangleStrip, 0, 4);
            
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        private void PostProcessingPass() {
            WebGLGraphics that = this;
            this._lastGroup = this._postGroup;

            this._effects.ForEach(delegate(IPostProcessEffect value) {
                that._lastGroup = value.Render(that._lastGroup);
            });

        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        private void FinalPass() {
            if (this._shaderGroups[this.ActiveShaderGroup] == null) return;

            this._shaderGroups[this.ActiveShaderGroup].ShaderBinder.BindFinalPass(this._lastGroup.RenderTexture);
            this._context.DrawArrays(WebGLE.TriangleStrip, 0, 4);
        }
        //-----------------------------------------------------------------------------------------
        //-----------------------------------------------------------------------------------------
        public void BindShader(CompiledShader shader) {
            this._context.UseProgram(shader.ShaderProgram);
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        public void BindTexture(IUniformLocation uniform, ITexture texture, int index) {
            this._context.ActiveTexture(this._activeTextureTarget[index]);
            this._context.BindTexture(WebGLE.Texture_2D, texture);
            this._context.Uniform1i(uniform, index);
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        private void BindWorld(World world) {
            this._world = world;

            world.NodeAdded.Subscribe(WorldNodeAdded, true);
            world.NodeRemoved.Subscribe(WorldNodeRemoved, true);
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------				
        void WorldNodeRemoved(Object sender, object args) {
            Node node = args as Node;

            node.ComponentAdded.Subscribe(this.NodeComponentAdded, true);
            node.ComponentRemoved.Subscribe(this.NodeComponentRemoved, true);
            

            /*iterate through all components*/
            foreach (KeyValuePair<string, Component> component in node.Components) {
                NodeComponentRemoved(node, component.Value);
            }

            /*iterate through all children*/
            foreach (KeyValuePair<String, Node> child in node.Children) {
                WorldNodeRemoved(sender, child.Value);
            }
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------				
        void WorldNodeAdded(Object sender, object args) {
            Node node = (Node) args;

            node.ComponentAdded.Subscribe(NodeComponentAdded, true);
            node.ComponentRemoved.Subscribe(NodeComponentRemoved, true);

            /*iterate through all components*/
            foreach (KeyValuePair<string, Component> comp in node.Components) {
                this.NodeComponentAdded(node, comp.Value);
            }

            /*iterate through all children*/
            foreach (KeyValuePair<String,Node> child in node.Children) {
                WorldNodeAdded(sender, child.Value);
            }
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        void NodeComponentRemoved(Object sender, object args) {
            this.PopComponent((Component) args);
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        void NodeComponentAdded(Object sender, object args) {
            this.PushComponent((Component) args);
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        void PushComponent(Component component) {
            /*depending on the type of meshComponent, add it to a render queue*/
            if(component.Type == Component.MeshComponent) {
                this.PushMeshComponent((MeshComponent) component);
            } else if ((component.Type == Component.LightComponent)) {
                this.PushLightComponent((LightComponent) component);
            }
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        void PushLightComponent(LightComponent component) {
            LightItem light = (LightItem) this._library.GetResource(component.LightHandle);

            if(light == null) {
                if(this._lightQueue[LightComponent.TypePoint] == null)
                    this._lightQueue[LightComponent.TypePoint] = new List<Node>();

                this._lightQueue[LightComponent.TypePoint].Add(component.Parent);
            } else {
                if (this._lightQueue[light.LightType] == null)
                    this._lightQueue[light.LightType] = new List<Node>();

                this._lightQueue[light.LightType].Add(component.Parent);
            }
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        void PushMeshComponent(MeshComponent component) {
            MeshItem mesh = (MeshItem) this._library.GetResource(component.MeshHandle);

            if (mesh == null) {
                SystemCore.Log("Mesh does not exists : " + component.Id);
                return;
            }

            if(this._opaqueMeshQueue[mesh.ItemId] == null)
                this._opaqueMeshQueue[mesh.ItemId] = new List<Node>();

            this._opaqueMeshQueue[mesh.ItemId].Add(component.Parent);
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        void PopComponent(Component component) {
            if(component.Type == Component.MeshComponent) {
                this.PopMeshComponent((MeshComponent) component); 
            }else if (component.Type == Component.LightComponent) {
                this.PopLightComponent((LightComponent) component);
            }
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        void PopMeshComponent(MeshComponent component) {
            MeshItem mesh = (MeshItem)this._library.GetResource(component.MeshHandle);

            if (mesh == null) {
                SystemCore.Log("Mesh does not exists : " + component.Id);
                return;
            }

            this._opaqueMeshQueue[mesh.ItemId].Remove(component.Parent);

            if (this._opaqueMeshQueue[mesh.ItemId].Count == 0)
                this._opaqueMeshQueue.RemoveAt(mesh.ItemId);
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        void PopLightComponent(LightComponent component) {
            LightItem light = (LightItem)this._library.GetResource(component.LightHandle);

            if (light == null) {
                if (this._lightQueue[LightComponent.TypePoint] == null)
                    return;

                this._lightQueue[LightComponent.TypePoint].Remove(component.Parent);
            } else {
                if (this._lightQueue[light.LightType] == null)
                    return;

                this._lightQueue[light.LightType].Remove(component.Parent);
            }
        }

    }
}
