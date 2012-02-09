using System;
using System.Collections.Generic;
using System.Html;
using System.Html.Media.Graphics;
using GLSharp.Html;

namespace GLSharp.Graphics {


    public class WebGLGraphics : IGraphics {
        /// <summary>
        /// Main canvas used for drawing.
        /// </summary>
        private CanvasElementGl _canvas = null;
        /// <summary>
        /// WebGL context.
        /// </summary>
        private WebGL _context = null;

        private Color _clearColor = null;

        public int Height {
            get {
                if (this._canvas != null)
                    return this._canvas.Height;
                return -1;
            }
        }

        public int Width {
            get {
                if (this._canvas != null)
                    return this._canvas.Width;
                return -1;
            }
        }

        public Color ClearColor {
            get {
                return null;
            }
            set {
                
            }
        }

        public ClearMode ClearMode {
            get {
                return ClearMode.Color;
            }
            set {
            }
        }

        public WebGLGraphics(CanvasElementGl canvas) {
            this._canvas = canvas;
            this._context = canvas.GetContext("experimental-webgl");

            /*property initialisation*/
            this._clearColor = new Color();

            this._context.clearColor(1.0f, 0.0f, 0.0f, 1.0f);
            this._context.clear((int)ClearMode.Color);
            
            
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
		
        public void Clear() {
            
        }

        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------

        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------

        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------



        
    }
}
