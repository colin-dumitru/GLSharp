using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Html;
using System.Html.Media.Graphics;
using GLSharp.Core;
using GLSharp.Html;
using GLSharp.Universe;

namespace GLSharp.Graphics {


    public class WebGLGraphics : IGraphics {

        private CanvasElementGl _canvas = null;
        private WebGL _context = null;

        /*contains the diffuse RGB and specular power*/
        private Texture _diffuseTexture = null;
        /*contains the position xyz an emissive power*/
        private Texture _positionTexture = null;
        /*contains the normal xyz*/
        private Texture _normalTexture = null;

        private Color _clearColor = null;
        private ClearMode _clearMode = ClearMode.Color;

        private World _world = null;
        
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
        /// Gets or sets the color used for drawing.
        /// </summary>
        public Color ClearColor {
            get {
                return this._clearColor;
            }
            set {
                this._clearColor = value;
                /*set the clear color for the context*/
                if (this._context != null)
                    this._context.ClearColor(this._clearColor.Red, this._clearColor.Green,
                        this._clearColor.Blue, this._clearColor.Alpha);
            }
        }

        /// <summary>
        /// Gets or sets the clear mode used when clearing the graphics.
        /// </summary>
        public ClearMode ClearMode {
            get {
                return this._clearMode;
            }
            set {
                this._clearMode = value;
            }
        }

        /// <summary>
        /// Gets and sets the world used for drawing.
        /// </summary>
        public Universe.World World {
            get {
                return this._world;                
            }
            set {
                this._world = value;
                this.BindWorld(this._world);
            }
        }

        /// <summary>
        /// Gets the context used by the graphics object.
        /// </summary>
        public WebGL Context {
            get { return this._context; }
        }

        /*a list of all nodes used for rendering*/
        private ComponentCollection _renderableComponent;

        /*render queues*/
        private Queue<Node> _meshQueue;  

        /*shaders used for rendering*/
        private ICompiledShader _meshShader;

        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------

        public WebGLGraphics(CanvasElementGl canvas) {
            this._canvas = canvas;
            this._context = canvas.GetContext("experimental-webgl");

            /*property initialisation*/
            this.ClearColor = Color.Create(0.3f, 0.6f, 0.9f, 1.0f);            
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        public void Initialize() {
            this.DisplayDebugInformation();

            /*rendering shaders*/
            // this._meshShader = SystemCore.ResourceManager.GetResource( )

            /*enable webGL float texture extension*/
            this._context.GetExtension("OES_texture_float");

            /*create the three textures used for deffered rendering*/
            this._diffuseTexture = this.CreateRenderTexture();
            this._normalTexture = this.CreateRenderTexture();
            this._positionTexture = this.CreateRenderTexture();

            /*webgl render queues*/
            this._renderableComponent = new ComponentCollection();

            this._renderableComponent.AddKnownType(Component.MeshComponent);

            this._meshQueue = new Queue<Node>();
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        private Texture CreateRenderTexture() {
            Texture ret = this._context.CreateTexture();

            this._context.BindTexture(WebGLE.Texture_2D, ret);
            this._context.TexParameteri(WebGLE.Texture_2D, WebGLE.TextureMinFilter, WebGLE.Nearest);
            this._context.TexParameteri(WebGLE.Texture_2D, WebGLE.TextureMagFilter, WebGLE.Nearest);
            this._context.TexImage2D(WebGLE.Texture_2D, 0, WebGLE.Rgba, this.Width, this.Height, 0, WebGLE.Rgba, WebGLE.FloatT, null);

            return ret;
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        [Conditional("DEBUG")]
        private void DisplayDebugInformation() {
            SystemCore.Logger.Log("Supported extensions : " + this.Context.GetSupportedExtensions());
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------		
        public void Clear() {
            /*no null checking*/
            this._context.Clear((int)this._clearMode);
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        public void Render() {
            this.Clear();

            this._meshQueue.Clear();

            /*create render queue*/
            /*foreach (var component in this._renderableComponent.GetCollection(Component.MeshComponent)) {
                this._meshQueue.Enqueue(component.Parent);
            }*/

            /*render queues*/
            this.GeometryPass();
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        private void GeometryPass() {
            Node node = null;

            while((node = this._meshQueue.Dequeue()) != null) {
                this.RenderMesh(node);
            }
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        private void RenderMesh(Node node) {
            
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        private void BindWorld(World world) {
            this._world = world;

            world.NodeAdded += new WorldHandler(WorldNodeAdded);
            world.NodeRemoved += new WorldHandler(WorldNodeRemoved);
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------				
        void WorldNodeRemoved(World sender, object args) {
            Node node = args as Node;

            node.ComponentAdded -= this.NodeComponentAdded;
            node.ComponentRemoved -= NodeComponentRemoved;
            

            /*iterate through all components*/
            foreach (KeyValuePair<string, Component> component in node.Components) {
                NodeComponentRemoved(node, component.Value);
            }
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------				
        void WorldNodeAdded(World sender, object args) {
            Node node = (Node) args;

            node.ComponentAdded += NodeComponentAdded;
            node.ComponentRemoved += NodeComponentRemoved;

            /*iterate through all components*/
            foreach (KeyValuePair<string, Component> comp in node.Components) {
                this.NodeComponentAdded(node, comp.Value);
            }
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        void NodeComponentRemoved(Node sender, object args) {
            this.PopComponent((Component) args);
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        void NodeComponentAdded(Node sender, object args) {
            this.PushComponent((Component) args);
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        void PushComponent(Component component) {
            /*depending on the type of component, add it to a render queue*/
            this._renderableComponent.AddComponent(component);
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        void PopComponent(Component component) {
            this._renderableComponent.RemoveComponent(component);
        }

    }
}
