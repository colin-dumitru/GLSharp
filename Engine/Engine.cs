// Engine.cs
//

using System;
using System.Collections.Generic;
using System.Diagnostics;
using Box2D.Common.Math;
using Box2D.Dynamics;
using GLSharp.Content;
using GLSharp.Core;
using GLSharp.Game;
using GLSharp.Graphics;
using GLSharp.Universe;

namespace GLSharp {
    public class Engine {
        private TimerHandle _renderHandle = null;
        private TimerHandle _cleanuphandle = null;
        private TimerHandle _updateHandle = null;

        private int _lastTime = Date.Now.GetTime();
        private float _animQueue = 0;
        private int _frames = 0;

        /*nodes which need animation update*/
        private List<Node> _animatedNodes = new List<Node>(); 
        /*nodes which need controller updates*/
        private List<Node> _controlledNodes = new List<Node>(); 

        /*object which manager collision*/
        private B2World _b2World = null;

        private GameBase _activeGame;

        /// <summary>
        /// Gets or sets the active game.
        /// </summary>
        public GameBase ActiveGame {
            get { return _activeGame; }
            set {
                _activeGame = value;
                this._activeGame.Engine = this;
            }
        }

        private World _activeWorld;

        /// <summary>
        /// Gets or sets the active world which will be rendered.
        /// </summary>
        public World World {
            get { return _activeWorld; }
            set { _activeWorld = value; this.BindWorld(this._activeWorld); }
        }

        private IGraphics _graphics;

        /// <summary>
        /// Gets or sets the graphics object which renders the scene.
        /// </summary>
        public IGraphics Graphics {
            get { return _graphics; }
            set { _graphics = value; }
        }

        private Library _library;

        /// <summary>
        /// Gets or sets the library.
        /// </summary>
        public Library Library {
            get { return _library; }
            set { _library = value; }
        }

        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        public void Run() {
            this.InitDebug();

            if (this.ActiveGame == null)
                throw new Exception("No active game defined.");

            Engine that = this;

            /*render cycle*/
            SystemCore.Timer.RequestAnimationFrame(delegate { that.Graphics.Render(); });
            this._cleanuphandle = SystemCore.Timer.Start(delegate { that.Library.Update(); }, 60000, true);
            this._updateHandle = SystemCore.Timer.Start(delegate { that.Update(); }, 1000 / 24, true);

            /*initialize graphics*/
            this.Graphics.Initialize(45, 0.1f, 200.0f);
            this.Graphics.ViewOccluder = new ViewFrustrumOccluder();

            /*initialize game*/
            this.ActiveGame.Initialize();

            /*initialize collision*/
            this._b2World = new B2World(new B2Vec2(0.0f, 0.0f), true);
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        private void Update() {
            int now = Date.Now.GetTime();
            float delta = ((float)(now - this._lastTime)) / 1000.0f;

            this.UpdateControllers(delta);
            this.UpdateAnimation(delta);
            this.UpdateCollision(delta);

            this._lastTime = now;
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        private void UpdateCollision(float delta) {
            this._b2World.Step(delta, 10, 10);
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        private void UpdateAnimation(float delta) {
            Engine engine = this;

            /*calculate how many frames we have to advance*/
            this._animQueue += delta;

            _frames = Math.Floor(this._animQueue / 0.015);
            this._animQueue -= _frames * 0.015f;

            this._animatedNodes.ForEach(delegate(Node value) {
                if(value.Animation != null) {
                    value.Animation.CurrentFrame += _frames;

                    if(value.Animation.CurrentFrame >= value.Animation.AnimationEnd) {
                        if(value.Animation.Loop) {
                            value.Animation.CurrentFrame = value.Animation.AnimationStart;
                        } else {
                            value.Animation.CurrentFrame = value.Animation.AnimationEnd - 1;
                            return;
                        }
                    }

                    value.InvalidateWorldTransformation();
                }
            });
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        private void UpdateControllers(float delta) {
            Engine that = this;

            this._controlledNodes.ForEach(delegate(Node value) {
                if(value.Controller != null)
                    value.Controller.Update(delta);
            });
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        private void BindWorld(World world) {
            world.NodeAdded.Subscribe(WorldNodeAdded, true);
            world.NodeRemoved.Subscribe(WorldNodeRemoved, true);

            Engine engine = this;

            world.RootNodes.ForEach(delegate(Node value) {
                engine.WorldNodeAdded(engine, value);
            });
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        private void WorldNodeRemoved(object sender, object args) {
            Node node = (Node)args;
            Engine engine = this;

            node.ChildrenList.ForEach(delegate(Node value) {
                engine.WorldNodeRemoved(engine, value);
            });

            /*chech if animation node*/
            if (node.Animation != null)
                this._animatedNodes.Remove(node);
            if(node.Controller != null)
                this._controlledNodes.Remove(node);
            /*check for collision component*/
            if (node.Components[Component.CollisionComponent] != null)
                this.DestroyCollision(node);

            node.ChildAdded.Unsubscribe(WorldNodeAdded);
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        private void WorldNodeAdded(object sender, object args) {
            Node node = (Node) args;
            Engine engine = this;

            node.ChildrenList.ForEach(delegate(Node value) {
                engine.WorldNodeAdded(engine, value);
            });

            /*chech if animation node*/
            if(node.Animation != null)
                this._animatedNodes.Add(node);
            /*check for controlller*/
            if(node.Controller != null)
                this._controlledNodes.Add(node);
            /*check for collision component*/
            if(node.Components[Component.CollisionComponent] != null)
                this.InitializeCollision(node);

            node.ChildAdded.Subscribe(WorldNodeAdded, true);
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        private void InitializeCollision(Node node) {
            CollisionComponent component = (CollisionComponent) node.Components[Component.CollisionComponent];

            if(component.Body != null)
                this.DestroyCollision(node);

            component.Body = this._b2World.CreateBody(component.BodyDefinition);
            component.Body.CreateFixture(component.FixtureDefinition);
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        private void DestroyCollision(Node node) {
            CollisionComponent component = (CollisionComponent)node.Components[Component.CollisionComponent];

            if(component.Body == null)
                return;

            this._b2World.DestroyBody(component.Body);
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        [Conditional("DEBUG")]
        private void InitDebug() {
            SystemCore.Logger.Log("warning : debug is enabled.");
        }

    }
}
