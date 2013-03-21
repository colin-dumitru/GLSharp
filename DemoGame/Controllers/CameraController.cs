// CameraComponent.cs
//

using System;
using System.Collections.Generic;
using GLSharp.Core;
using GLSharp.Universe;

namespace GLSharp.DemoGame.Controllers {
    public class CameraController : ControllerBase {
        private Node _cameraNode = null;
        private PlayerController _player = null;

        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        public CameraController(PlayerController player) {
            this._player = player;

            //this._cameraNode.Translate3();
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        protected override void BindParent() {
            this._cameraNode = Parent;

            /*initial position*/
            this._cameraNode.Translate3(0.0f, 30.0f, 17.0f);
            this._cameraNode.RotateX(-1.0f);
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        public override void Update(float delta) {
            this.UpdatePosition();
            //this.UpdateDebug();
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        private void UpdatePosition() {
            this._cameraNode.Translate3(
                -(this._cameraNode.LocalTranslation.Elements[0] - this._player.Parent.LocalTranslation.Elements[0]), 
                0.0f, 
                -(this._cameraNode.LocalTranslation.Elements[2] - 17.0f - this._player.Parent.LocalTranslation.Elements[2]));
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        private void UpdateDebug() {
            if (SystemCore.Input.KeySet(Keys.A)) {
                this._cameraNode.Translate3(-0.5f, 0.0f, 0.0f);
            }

            if (SystemCore.Input.KeySet(Keys.D)) {
                this._cameraNode.Translate3(0.5f, 0.0f, 0.0f);
            }

            if (SystemCore.Input.KeySet(Keys.W)) {
                this._cameraNode.Translate3(0.0f, 0.0f, -0.5f);
            }

            if (SystemCore.Input.KeySet(Keys.S)) {
                this._cameraNode.Translate3(0.0f, 0.0f, 0.5f);
            }

            if (SystemCore.Input.KeySet(Keys.Q)) {
                this._cameraNode.Translate3(0.0f, -0.5f, 0.0f);
            }

            if (SystemCore.Input.KeySet(Keys.E)) {
                this._cameraNode.Translate3(0.0f, 0.5f, 0.0f);
            }

            if (SystemCore.Input.KeySet(Keys.Numpad2)) {
                this._cameraNode.RotateX(0.1f);
            }

            if (SystemCore.Input.KeySet(Keys.Numpad8)) {
                this._cameraNode.RotateX(-0.1f);
            }

            if (SystemCore.Input.KeySet(Keys.Numpad6)) {
                this._cameraNode.RotateY(0.1f);
            }

            if (SystemCore.Input.KeySet(Keys.Numpad4)) {
                this._cameraNode.RotateY(-0.1f);
            }

            if (SystemCore.Input.KeySet(Keys.Numpad9)) {
                this._cameraNode.RotateZ(0.1f);
            }

            if (SystemCore.Input.KeySet(Keys.Numpad7)) {
                this._cameraNode.RotateZ(-0.1f);
            }
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
    }
}
