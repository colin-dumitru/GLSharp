using System;
using System.Collections.Generic;
using System.Html;
using GLSharp.Graphics;
using GLSharp.Html;
using GLSharp.Core;
using GLSharp.Data;

namespace App {
    public class App {
        private IGraphics _graphics = null;

        public void Init()  {
            /*Initialize the environment*/
            this._InitEnvironment();

            /*initialize canvas element*/
            CanvasElementGl canvasElem = Document.GetElementById("mainCanvas").As<CanvasElementGl>();
            if (canvasElem == null)
                throw new Exception("No canvas element found!");

            this._graphics = new WebGLGraphics(canvasElem);
            this._graphics.Clear();

            Core.ResourceManager.GetResource("/Data/JSON/test.json").ResourceChanged += delegate(Resource sender, object args) {
                Script.Alert("aaa");
            };
        }


        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        private void _InitEnvironment() {
            /*initialize the core*/
            Core.Environment = new Environment();
            
            /*suported resource types*/
            ResourceManager resourceManager = new ResourceManager();

            resourceManager.AddLoader(new ImageLoader());
            resourceManager.AddLoader(new JsonLoader());

            Core.ResourceManager = resourceManager;
        }


    }
}
