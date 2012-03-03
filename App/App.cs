using System;
using System.Collections.Generic;
using System.Html;
using GLSharp.Graphics;
using GLSharp.Html;
using GLSharp.Core;
using GLSharp.Data;

namespace App {
    public class App {
        private WebGLGraphics _graphics = null;

        public void Init()  {
            /*initialize canvas element*/
            CanvasElementGl canvasElem = Document.GetElementById("mainCanvas").As<CanvasElementGl>();
            if (canvasElem == null)
                throw new Exception("No canvas element found!");

            this._graphics = new WebGLGraphics(canvasElem);
            this._graphics.Clear();

            /*Initialize the environment*/
            this._InitEnvironment();

            Resource res = Core.ResourceManager.GetResource("/Data/Shader/test.shader");
            
            res.ResourceChanged += delegate(Resource sender, object args) {
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
            resourceManager.AddLoader(new ShaderLoader(this._graphics.Context));

            Core.ResourceManager = resourceManager;
        }
    }
}
