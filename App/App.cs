// Class1.cs
//

using System;
using System.Collections.Generic;
using System.Html;
using GLSharp.Graphics;
using GLSharp.Html;
using GLSharp.Core;

namespace App {
    public class App {
        private IGraphics _graphics = null;

        public void Init()  {
            /*initialize the core*/
            Core.Environment = new Environment();

            /*initialize canvas element*/
            CanvasElementGl canvasElem = Document.GetElementById("mainCanvas").As<CanvasElementGl>();
            if (canvasElem == null)
                throw new Exception("No canvas element found!");

            this._graphics = new WebGLGraphics(canvasElem);
        }

    }
}
