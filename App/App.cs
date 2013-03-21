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
using GLSharp.Universe;
using GLSharp.Util;
using EventHandler = GLSharp.Core.EventHandler;

namespace App {
    public class App {
        private Engine _engine = null;
        private WebGLGraphics _graphics = null;

        public void Init()  {
            /*initialize canvas element*/
            CanvasElementGl canvasElem = Document.GetElementById("mainCanvas").As<CanvasElementGl>();
            if (canvasElem == null)
                throw new Exception("No canvas element found!");

            /*create and initialize the engine*/
            this._engine = new Engine();
            this._graphics = new WebGLGraphics(canvasElem);

            this._engine.Graphics = this._graphics;
            this._engine.ActiveGame = new Demo();
            this._engine.Library = new Library();
            this._graphics.Library = this._engine.Library;

            /*create empty world*/
            this._engine.World = new World();
            this._graphics.World = this._engine.World;

            this._engine.Library.AddConverter(new LightConverter());
            this._engine.Library.AddConverter(new MeshConverter(this._graphics));
            this._engine.Library.AddConverter(new NodeConverter());
            this._engine.Library.AddConverter(new MaterialConverter());
            this._engine.Library.AddConverter(new TextureConverter(this._graphics));

            /*Initialize the environment*/
            this.InitEnvironment((CanvasElement)(Object)canvasElem);

            /*startup engine*/
            this._engine.Run();

            CollisionComponent c = new CollisionComponent();
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        private void InitEnvironment(CanvasElement canvas) {
            /*initialize the core*/
            SystemCore.Environment = new Environment();
            
            /*suported resource types*/
            ResourceManager resourceManager = new ResourceManager();

            resourceManager.AddLoader(new ImageLoader());
            resourceManager.AddLoader(new JsonLoader());
            resourceManager.AddLoader(new AudioLoader());
            resourceManager.AddLoader(new ShaderLoader(((WebGLGraphics)this._engine.Graphics).Context));

            SystemCore.ResourceManager = resourceManager;
            SystemCore.Logger = new JsLoggingProvider();
            SystemCore.Timer = new Timer();
            SystemCore.Input = new JsInputProvider();

            ((JsInputProvider)SystemCore.Input).Initialize(canvas, 800, 600);
        }
    }
}
