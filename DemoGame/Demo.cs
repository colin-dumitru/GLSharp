// Class1.cs
//

using System;
using System.Collections.Generic;
using System.Html;
using GLSharp.Content;
using GLSharp.Core;
using GLSharp.DemoGame.Controllers;
using GLSharp.Game;
using GLSharp.Graphics;
using GLSharp.Graphics.Effects;
using GLSharp.Universe;
using GLSharp.Util;

namespace GLSharp {

    public class Demo : GameBase {
        private TimerHandle _updateHandle = null;
        private PlayerController _playerController;

        private IPostProcessEffect _depthEffect = null;
        private IPostProcessEffect _motionEffect = null;
        private IPostProcessEffect _bloomEffect = null;
        private IPostProcessEffect _ssaoEffect = null;


        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        protected override void Startup() {

            Demo that = this;

            /*initial libraries*/
            this.Engine.Library.LoadLibrary("/Data/JSON/mech.json").Finished.Subscribe(MechLibraryComplete, false);
            this.Engine.Library.LoadLibrary("/Data/JSON/scene.json").Finished.Subscribe(InitLibraryComplete, false);

            
            //this.Engine.Graphics.Camera.Rotate((float) (Math.PI) + 0.5f, new Vector3(new float[] { 0.0f, 1.0f, 0.0f }));
            //this.Engine.Graphics.Camera.Translate(new Vector3(new float[] { 0.0f, 25.0f, 0.0f }));
            //this.Engine.Graphics.Camera.RotateY((float) (Math.PI / 2));
            //this.Engine.Graphics.Camera.RotateX(-0.5f);

            /*register update function*/
            this._updateHandle = SystemCore.Timer.Start(delegate { that.Update(); }, 1000 / 20, true);

            /*change view occluder to a faster region occluder*/
            this.Engine.Graphics.ViewOccluder = new RegionOccluder(25, 20);

            /*add post process effects*/
            this.Engine.Graphics.QueuePostProcess(this._bloomEffect = new BloomEffect());
            this.Engine.Graphics.QueuePostProcess(this._ssaoEffect = new SsaoEffect());
            this.Engine.Graphics.QueuePostProcess(this._depthEffect = new DepthEffect());
            this.Engine.Graphics.QueuePostProcess(this._motionEffect = new MotionBlurEffect());
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        private void MechLibraryComplete(object sender, object args) {
            Node mesh = ((NodeItem)this.Engine.Library.GetResource(Handle.Create("mech", "mech"))).Root;
            mesh.BindController(this._playerController = new PlayerController());

            this.Engine.World.AddRootNode(mesh);

            this.Engine.Graphics.Camera.BindController(new CameraController(this._playerController));
            this.Engine.World.AddRootNode(this.Engine.Graphics.Camera);
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        private void InitLibraryComplete(object sender, object args) {
            Node demoScene = ((NodeItem)this.Engine.Library.GetResource(Handle.Create("scen", "root_scene"))).Root;
            
            /*add the root scene*/
            this.Engine.World.AddRootNode(demoScene);
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        private void Update() {
            //this.Engine.Graphics.Camera.Rotate(0.01f, new Vector3(new float[]{0.0f, 0.0f, 0.0f}));
            //this.Engine.Graphics.Camera.Translate(new Vector3(new float[] {0.0f, 0.1f, 0.0f }));
        }
    }
}
    