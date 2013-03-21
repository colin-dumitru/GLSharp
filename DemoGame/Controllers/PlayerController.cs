// PlayerController.cs
//

using System;
using System.Collections.Generic;
using System.Diagnostics;
using GLSharp.Core;
using GLSharp.Data;
using GLSharp.Universe;

namespace GLSharp.DemoGame.Controllers {
    public class PlayerController : MechControllerBase {
        private NodeAnimationGroup _animation = new NodeAnimationGroup();

        private Node _mechNode = null;
        private Node _headNode = null;
        private Node _bodyNode = null;
        private Node _llegLeftNode = null;
        private Node _llegRightNode = null;
        private Node _ulegLeftNode = null;
        private Node _ulegRightNode = null;
        private Node _footLeftNode = null;
        private Node _footRightNode = null;

        private IAudioResource _walkSound = null;
        private float _walkSoundVolume = 0.0f;
        private float _walkSoundDir = 0.0f;
        
        private int _hOrientation = 0;
        private int _vOrientation = 0;

        private Boolean _movement = false;
        private Boolean _previousMovement = false;

        private CollisionComponent _collision = null;
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        public PlayerController() {
            /*load walking sound*/
            this._walkSound = (IAudioResource) SystemCore.ResourceManager.GetResource("/Data/Audio/mech_walk.mp3", null).Data;

        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        protected override void BindParent() {
            /*geomerty nodes*/
            _mechNode = this.Parent.FindChild("mech", true);
            _headNode = this.Parent.FindChild("head", true);
            _bodyNode = this.Parent.FindChild("body", true);

            _ulegLeftNode = _bodyNode.FindChild("ulegl", true);
            _ulegRightNode = _bodyNode.FindChild("ulegr", true);

            _llegLeftNode = _ulegLeftNode.FindChild("llegl", true);
            _llegRightNode = _ulegRightNode.FindChild("llegr", true);

            _footLeftNode = _llegLeftNode.FindChild("footl", true);
            _footRightNode = _llegRightNode.FindChild("footr", true);

            /*animation*/
            this._animation.Animations.Add(_bodyNode.Animation);

            this._animation.Animations.Add(_ulegLeftNode.Animation);
            this._animation.Animations.Add(_ulegRightNode.Animation);

            this._animation.Animations.Add(_llegLeftNode.Animation);
            this._animation.Animations.Add(_llegRightNode.Animation);

            this._animation.Animations.Add(_footLeftNode.Animation);
            this._animation.Animations.Add(_footRightNode.Animation);

            this._animation.SetRange(0, 48, true);

            /*collision*/
            Node coll = _mechNode.FindChild("__cs_mech", true);
            this._collision = (CollisionComponent) coll.Components[Component.CollisionComponent];
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        public override void Update(float delta) {
            this.UpdateHeadOrienation();
            this.UpdateMovement();
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        private void UpdateHeadOrienation() {
            /*get mouse X Y*/
            float x = SystemCore.Input.MouseX;
            float y = SystemCore.Input.MouseY;
            float angle = Math.Atan2(x, y);

            this._headNode.RotateY(-(_headNode.LocalRotation.Elements[1] - angle));
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        private void UpdateMovement() {
            this._hOrientation = 0;
            this._vOrientation = 0;
            this._movement = false;

            if (SystemCore.Input.KeySet(Keys.A)) {
                this._hOrientation = -1;
                this._movement = true;
            }

            if (SystemCore.Input.KeySet(Keys.D)) {
                this._hOrientation = 1;
                this._movement = true;
            }

            if (SystemCore.Input.KeySet(Keys.W)) {
                this._vOrientation = 1;
                this._movement = true;
            }

            if (SystemCore.Input.KeySet(Keys.S)) {
                this._vOrientation = -1;
                this._movement = true;
            }

            float angle = (float)(Math.PI - Math.Atan2(this._hOrientation, this._vOrientation));

            if (this._movement) {
                this._bodyNode.RotateY(-(_bodyNode.LocalRotation.Elements[1] - angle));

                /*this._mechNode.Translate3(0.3f * Math.Sin(angle), 0.0f, 0.3f * Math.Cos(angle));*/
                this._collision.Body.LinearVelocity.X = Math.Sin(angle) * 10.0f;
                this._collision.Body.LinearVelocity.Y = Math.Cos(angle) * 10.0f;
                this._collision.Body.SetAwake(true);

                if (!this._previousMovement) {
                    this._animation.SetRange(48, 120, true);
                    this._walkSoundDir = 0.3f;
                    //this._walkSound.CurrentTime = 0;
                }
            } else {
                if (this._previousMovement) {
                    this._animation.SetRange(0, 47, true);
                    this._walkSoundDir = -0.2f;
                }
                this._collision.Body.SetAwake(false);
            }

            /*update audio*/
            /*this._walkSoundVolume += this._walkSoundDir;

            if (this._walkSoundVolume > 1.0f) {
                this._walkSoundVolume = 1.0f;
            }

            if(this._walkSoundVolume <= 0.0f) {
                if(this._walkSound.Paused) {
                    this._walkSound.Pause();
                }

                this._walkSoundVolume = 0.0f;
            } else {
                this._walkSound.Volume = this._walkSoundVolume;
                if(this._walkSound.Paused)
                    this._walkSound.Play();
            }*/
            
            

            this._mechNode.Translate3(
                    -(this._mechNode.LocalTranslation.Elements[0] - this._collision.Body.Transform.Position.X),
                    -(this._mechNode.LocalTranslation.Elements[1] - 0.5f),
                    -(this._mechNode.LocalTranslation.Elements[2] - this._collision.Body.Transform.Position.Y)
                    );

            this._previousMovement = _movement;
        }
    }
}
