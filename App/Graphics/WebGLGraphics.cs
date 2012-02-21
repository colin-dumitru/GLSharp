using System;
using System.Collections.Generic;
using System.Html;
using System.Html.Media.Graphics;
using GLSharp.Html;
using GLSharp.Universe;

namespace GLSharp.Graphics {


    public class WebGLGraphics : IGraphics {

        private CanvasElementGl _canvas = null;
        private WebGL _context = null;

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
                    this._context.clearColor(this._clearColor.Red, this._clearColor.Green,
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
		
        public void Clear() {
            /*no null checking*/
            this._context.clear((int)this._clearMode);
        }

        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        private void BindWorld(World world) {
            world.NodeAdded += new WorldHandler(world_NodeAdded);
            world.NodeRemoved += new WorldHandler(world_NodeRemoved);
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------				
        void world_NodeRemoved(World sender, object args) {
            Node node = args as Node;

            node.ComponentAdded += new NodeHandler(node_ComponentAdded);
            node.ComponentRemoved += new NodeHandler(node_ComponentRemoved);
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------				
        void world_NodeAdded(World sender, object args) {
            
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        void node_ComponentRemoved(Node sender, object args) {
            
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        void node_ComponentAdded(Node sender, object args) {
            
        }

        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------


    }
}
