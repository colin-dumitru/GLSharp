using System;
using System.Collections.Generic;
using System.Html;
using GLSharp;
using GLSharp.Graphics;
using GLSharp.Html;
using GLSharp.Core;
using GLSharp.Data;
using GLSharp.Game;

namespace App {
    public class App {
        private WebGLGraphics _graphics = null;
        private Engine _engine = null;
        private GameBase _game = null;

        public void Init()  {
            /*initialize canvas element*/
            CanvasElementGl canvasElem = Document.GetElementById("mainCanvas").As<CanvasElementGl>();
            if (canvasElem == null)
                throw new Exception("No canvas element found!");

            this._graphics = new WebGLGraphics(canvasElem);
            this._graphics.Clear();

            /*Initialize the environment*/
            this._InitEnvironment();

            /*create game engine*/
            this._engine = new Engine();

            /*create game*/
            this._game = new DemoGame();

            /*startup engine*/
            this._engine.ActiveGame = this._game;
            this._engine.Run();

            /*bye bye*/
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        private void _InitEnvironment() {
            /*initialize the core*/
            SystemCore.Environment = new Environment();
            
            /*suported resource types*/
            ResourceManager resourceManager = new ResourceManager();

            resourceManager.AddLoader(new ImageLoader());
            resourceManager.AddLoader(new JsonLoader());
            resourceManager.AddLoader(new ShaderLoader(this._graphics.Context));

            SystemCore.ResourceManager = resourceManager;
            SystemCore.Logger = new JSLoggingProvider();
        }
    }
}
