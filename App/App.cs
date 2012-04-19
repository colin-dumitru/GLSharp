using System;
using System.Collections.Generic;
using System.Html;
using GLSharp;
using GLSharp.Content;
using GLSharp.Graphics;
using GLSharp.Html;
using GLSharp.Core;
using GLSharp.Data;
using GLSharp.Game;
using EventHandler = GLSharp.Core.EventHandler;

namespace App {
    public class App {
        private Engine _engine = null;
        private event EventHandler _tmp;

        public void Init()  {
            /*initialize canvas element*/
            CanvasElementGl canvasElem = Document.GetElementById("mainCanvas").As<CanvasElementGl>();
            if (canvasElem == null)
                throw new Exception("No canvas element found!");

            /*create and initialize the engine*/
            this._engine = new Engine();

            this._engine.Graphics = new WebGLGraphics(canvasElem);
            this._engine.ActiveGame = new DemoGame();
            this._engine.Library = new Library();

            this._engine.Library.AddConverter(new LightConverter());
            this._engine.Library.AddConverter(new MeshConverter());
            this._engine.Library.AddConverter(new NodeConverter());

            /*Initialize the environment*/
            this.InitEnvironment();

            /*startup engine*/
            this._engine.Run();
            
            /*bye bye*/
            Event test = new Event();
            test.Subscribe(Handler, true);
        }

        private void Handler(object sender, object args) {}
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        private void InitEnvironment() {
            /*initialize the core*/
            SystemCore.Environment = new Environment();
            
            /*suported resource types*/
            ResourceManager resourceManager = new ResourceManager();

            resourceManager.AddLoader(new ImageLoader());
            resourceManager.AddLoader(new JsonLoader());
            resourceManager.AddLoader(new ShaderLoader(((WebGLGraphics)this._engine.Graphics).Context));

            SystemCore.ResourceManager = resourceManager;
            SystemCore.Logger = new JSLoggingProvider();
            SystemCore.Timer = new Timer();
        }
    }
}
