//! DemoGame.debug.js
//

(function() {

Type.registerNamespace('GLSharp');

////////////////////////////////////////////////////////////////////////////////
// GLSharp.Demo

GLSharp.Demo = function GLSharp_Demo() {
    /// <field name="_updateHandle$1" type="GLSharp.Core.TimerHandle">
    /// </field>
    /// <field name="_playerController$1" type="GLSharp.DemoGame.Controllers.PlayerController">
    /// </field>
    /// <field name="_depthEffect$1" type="GLSharp.Graphics.Effects.IPostProcessEffect">
    /// </field>
    /// <field name="_motionEffect$1" type="GLSharp.Graphics.Effects.IPostProcessEffect">
    /// </field>
    /// <field name="_bloomEffect$1" type="GLSharp.Graphics.Effects.IPostProcessEffect">
    /// </field>
    /// <field name="_ssaoEffect$1" type="GLSharp.Graphics.Effects.IPostProcessEffect">
    /// </field>
    GLSharp.Demo.initializeBase(this);
}
GLSharp.Demo.prototype = {
    _updateHandle$1: null,
    _playerController$1: null,
    _depthEffect$1: null,
    _motionEffect$1: null,
    _bloomEffect$1: null,
    _ssaoEffect$1: null,
    
    startup: function GLSharp_Demo$startup() {
        var that = this;
        this.get_engine().get_library().loadLibrary('/Data/JSON/mech.json').finished.subscribe(ss.Delegate.create(this, this._mechLibraryComplete$1), false);
        this.get_engine().get_library().loadLibrary('/Data/JSON/scene.json').finished.subscribe(ss.Delegate.create(this, this._initLibraryComplete$1), false);
        this._updateHandle$1 = GLSharp.Core.SystemCore.timer.start(function() {
            that._update$1();
        }, 1000 / 20, true);
        this.get_engine().get_graphics().set_viewOccluder(new GLSharp.Graphics.RegionOccluder(25, 20));
        this.get_engine().get_graphics().queuePostProcess(this._bloomEffect$1 = new GLSharp.Graphics.Effects.BloomEffect());
        this.get_engine().get_graphics().queuePostProcess(this._ssaoEffect$1 = new GLSharp.Graphics.Effects.SsaoEffect());
        this.get_engine().get_graphics().queuePostProcess(this._depthEffect$1 = new GLSharp.Graphics.Effects.DepthEffect());
        this.get_engine().get_graphics().queuePostProcess(this._motionEffect$1 = new GLSharp.Graphics.Effects.MotionBlurEffect());
    },
    
    _mechLibraryComplete$1: function GLSharp_Demo$_mechLibraryComplete$1(sender, args) {
        /// <param name="sender" type="Object">
        /// </param>
        /// <param name="args" type="Object">
        /// </param>
        var mesh = (this.get_engine().get_library().getResource(GLSharp.Content.Handle.create('mech', 'mech'))).root;
        mesh.bindController(this._playerController$1 = new GLSharp.DemoGame.Controllers.PlayerController());
        this.get_engine().get_world().addRootNode(mesh);
        this.get_engine().get_graphics().get_camera().bindController(new GLSharp.DemoGame.Controllers.CameraController(this._playerController$1));
        this.get_engine().get_world().addRootNode(this.get_engine().get_graphics().get_camera());
    },
    
    _initLibraryComplete$1: function GLSharp_Demo$_initLibraryComplete$1(sender, args) {
        /// <param name="sender" type="Object">
        /// </param>
        /// <param name="args" type="Object">
        /// </param>
        var demoScene = (this.get_engine().get_library().getResource(GLSharp.Content.Handle.create('scen', 'root_scene'))).root;
        this.get_engine().get_world().addRootNode(demoScene);
    },
    
    _update$1: function GLSharp_Demo$_update$1() {
    }
}


Type.registerNamespace('GLSharp.DemoGame.Controllers');

////////////////////////////////////////////////////////////////////////////////
// GLSharp.DemoGame.Controllers.CameraController

GLSharp.DemoGame.Controllers.CameraController = function GLSharp_DemoGame_Controllers_CameraController(player) {
    /// <param name="player" type="GLSharp.DemoGame.Controllers.PlayerController">
    /// </param>
    /// <field name="_cameraNode$1" type="GLSharp.Universe.Node">
    /// </field>
    /// <field name="_player$1" type="GLSharp.DemoGame.Controllers.PlayerController">
    /// </field>
    GLSharp.DemoGame.Controllers.CameraController.initializeBase(this);
    this._player$1 = player;
}
GLSharp.DemoGame.Controllers.CameraController.prototype = {
    _cameraNode$1: null,
    _player$1: null,
    
    bindParent: function GLSharp_DemoGame_Controllers_CameraController$bindParent() {
        this._cameraNode$1 = this.parent;
        this._cameraNode$1.translate3(0, 30, 17);
        this._cameraNode$1.rotateX(-1);
    },
    
    update: function GLSharp_DemoGame_Controllers_CameraController$update(delta) {
        /// <param name="delta" type="Number">
        /// </param>
        this._updatePosition$1();
    },
    
    _updatePosition$1: function GLSharp_DemoGame_Controllers_CameraController$_updatePosition$1() {
        this._cameraNode$1.translate3(-(this._cameraNode$1.localTranslation.elements[0] - this._player$1.parent.localTranslation.elements[0]), 0, -(this._cameraNode$1.localTranslation.elements[2] - 17 - this._player$1.parent.localTranslation.elements[2]));
    },
    
    _updateDebug$1: function GLSharp_DemoGame_Controllers_CameraController$_updateDebug$1() {
        if (GLSharp.Core.SystemCore.input.keySet(GLSharp.Core.Keys.a)) {
            this._cameraNode$1.translate3(-0.5, 0, 0);
        }
        if (GLSharp.Core.SystemCore.input.keySet(GLSharp.Core.Keys.d)) {
            this._cameraNode$1.translate3(0.5, 0, 0);
        }
        if (GLSharp.Core.SystemCore.input.keySet(GLSharp.Core.Keys.w)) {
            this._cameraNode$1.translate3(0, 0, -0.5);
        }
        if (GLSharp.Core.SystemCore.input.keySet(GLSharp.Core.Keys.s)) {
            this._cameraNode$1.translate3(0, 0, 0.5);
        }
        if (GLSharp.Core.SystemCore.input.keySet(GLSharp.Core.Keys.q)) {
            this._cameraNode$1.translate3(0, -0.5, 0);
        }
        if (GLSharp.Core.SystemCore.input.keySet(GLSharp.Core.Keys.e)) {
            this._cameraNode$1.translate3(0, 0.5, 0);
        }
        if (GLSharp.Core.SystemCore.input.keySet(GLSharp.Core.Keys.numpad2)) {
            this._cameraNode$1.rotateX(0.1);
        }
        if (GLSharp.Core.SystemCore.input.keySet(GLSharp.Core.Keys.numpad8)) {
            this._cameraNode$1.rotateX(-0.1);
        }
        if (GLSharp.Core.SystemCore.input.keySet(GLSharp.Core.Keys.numpad6)) {
            this._cameraNode$1.rotateY(0.1);
        }
        if (GLSharp.Core.SystemCore.input.keySet(GLSharp.Core.Keys.numpad4)) {
            this._cameraNode$1.rotateY(-0.1);
        }
        if (GLSharp.Core.SystemCore.input.keySet(GLSharp.Core.Keys.numpad9)) {
            this._cameraNode$1.rotateZ(0.1);
        }
        if (GLSharp.Core.SystemCore.input.keySet(GLSharp.Core.Keys.numpad7)) {
            this._cameraNode$1.rotateZ(-0.1);
        }
    }
}


////////////////////////////////////////////////////////////////////////////////
// GLSharp.DemoGame.Controllers.MechControllerBase

GLSharp.DemoGame.Controllers.MechControllerBase = function GLSharp_DemoGame_Controllers_MechControllerBase() {
    GLSharp.DemoGame.Controllers.MechControllerBase.initializeBase(this);
}


////////////////////////////////////////////////////////////////////////////////
// GLSharp.DemoGame.Controllers.PlayerController

GLSharp.DemoGame.Controllers.PlayerController = function GLSharp_DemoGame_Controllers_PlayerController() {
    /// <field name="_animation$2" type="GLSharp.Universe.NodeAnimationGroup">
    /// </field>
    /// <field name="_mechNode$2" type="GLSharp.Universe.Node">
    /// </field>
    /// <field name="_headNode$2" type="GLSharp.Universe.Node">
    /// </field>
    /// <field name="_bodyNode$2" type="GLSharp.Universe.Node">
    /// </field>
    /// <field name="_llegLeftNode$2" type="GLSharp.Universe.Node">
    /// </field>
    /// <field name="_llegRightNode$2" type="GLSharp.Universe.Node">
    /// </field>
    /// <field name="_ulegLeftNode$2" type="GLSharp.Universe.Node">
    /// </field>
    /// <field name="_ulegRightNode$2" type="GLSharp.Universe.Node">
    /// </field>
    /// <field name="_footLeftNode$2" type="GLSharp.Universe.Node">
    /// </field>
    /// <field name="_footRightNode$2" type="GLSharp.Universe.Node">
    /// </field>
    /// <field name="_walkSound$2" type="GLSharp.Data.IAudioResource">
    /// </field>
    /// <field name="_walkSoundVolume$2" type="Number">
    /// </field>
    /// <field name="_walkSoundDir$2" type="Number">
    /// </field>
    /// <field name="_hOrientation$2" type="Number" integer="true">
    /// </field>
    /// <field name="_vOrientation$2" type="Number" integer="true">
    /// </field>
    /// <field name="_movement$2" type="Boolean">
    /// </field>
    /// <field name="_previousMovement$2" type="Boolean">
    /// </field>
    /// <field name="_collision$2" type="GLSharp.Universe.CollisionComponent">
    /// </field>
    this._animation$2 = new GLSharp.Universe.NodeAnimationGroup();
    GLSharp.DemoGame.Controllers.PlayerController.initializeBase(this);
    this._walkSound$2 = GLSharp.Core.SystemCore.resourceManager.getResource('/Data/Audio/mech_walk.mp3', null).get_data();
}
GLSharp.DemoGame.Controllers.PlayerController.prototype = {
    _mechNode$2: null,
    _headNode$2: null,
    _bodyNode$2: null,
    _llegLeftNode$2: null,
    _llegRightNode$2: null,
    _ulegLeftNode$2: null,
    _ulegRightNode$2: null,
    _footLeftNode$2: null,
    _footRightNode$2: null,
    _walkSound$2: null,
    _walkSoundVolume$2: 0,
    _walkSoundDir$2: 0,
    _hOrientation$2: 0,
    _vOrientation$2: 0,
    _movement$2: false,
    _previousMovement$2: false,
    _collision$2: null,
    
    bindParent: function GLSharp_DemoGame_Controllers_PlayerController$bindParent() {
        this._mechNode$2 = this.parent.findChild('mech', true);
        this._headNode$2 = this.parent.findChild('head', true);
        this._bodyNode$2 = this.parent.findChild('body', true);
        this._ulegLeftNode$2 = this._bodyNode$2.findChild('ulegl', true);
        this._ulegRightNode$2 = this._bodyNode$2.findChild('ulegr', true);
        this._llegLeftNode$2 = this._ulegLeftNode$2.findChild('llegl', true);
        this._llegRightNode$2 = this._ulegRightNode$2.findChild('llegr', true);
        this._footLeftNode$2 = this._llegLeftNode$2.findChild('footl', true);
        this._footRightNode$2 = this._llegRightNode$2.findChild('footr', true);
        this._animation$2.animations.add(this._bodyNode$2.animation);
        this._animation$2.animations.add(this._ulegLeftNode$2.animation);
        this._animation$2.animations.add(this._ulegRightNode$2.animation);
        this._animation$2.animations.add(this._llegLeftNode$2.animation);
        this._animation$2.animations.add(this._llegRightNode$2.animation);
        this._animation$2.animations.add(this._footLeftNode$2.animation);
        this._animation$2.animations.add(this._footRightNode$2.animation);
        this._animation$2.setRange(0, 48, true);
        var coll = this._mechNode$2.findChild('__cs_mech', true);
        this._collision$2 = coll.get_components()[GLSharp.Universe.Component.collisionComponent];
    },
    
    update: function GLSharp_DemoGame_Controllers_PlayerController$update(delta) {
        /// <param name="delta" type="Number">
        /// </param>
        this._updateHeadOrienation$2();
        this._updateMovement$2();
    },
    
    _updateHeadOrienation$2: function GLSharp_DemoGame_Controllers_PlayerController$_updateHeadOrienation$2() {
        var x = GLSharp.Core.SystemCore.input.get_mouseX();
        var y = GLSharp.Core.SystemCore.input.get_mouseY();
        var angle = Math.atan2(x, y);
        this._headNode$2.rotateY(-(this._headNode$2.localRotation.elements[1] - angle));
    },
    
    _updateMovement$2: function GLSharp_DemoGame_Controllers_PlayerController$_updateMovement$2() {
        this._hOrientation$2 = 0;
        this._vOrientation$2 = 0;
        this._movement$2 = false;
        if (GLSharp.Core.SystemCore.input.keySet(GLSharp.Core.Keys.a)) {
            this._hOrientation$2 = -1;
            this._movement$2 = true;
        }
        if (GLSharp.Core.SystemCore.input.keySet(GLSharp.Core.Keys.d)) {
            this._hOrientation$2 = 1;
            this._movement$2 = true;
        }
        if (GLSharp.Core.SystemCore.input.keySet(GLSharp.Core.Keys.w)) {
            this._vOrientation$2 = 1;
            this._movement$2 = true;
        }
        if (GLSharp.Core.SystemCore.input.keySet(GLSharp.Core.Keys.s)) {
            this._vOrientation$2 = -1;
            this._movement$2 = true;
        }
        var angle = (Math.PI - Math.atan2(this._hOrientation$2, this._vOrientation$2));
        if (this._movement$2) {
            this._bodyNode$2.rotateY(-(this._bodyNode$2.localRotation.elements[1] - angle));
            this._collision$2.body.m_linearVelocity.x = Math.sin(angle) * 10;
            this._collision$2.body.m_linearVelocity.y = Math.cos(angle) * 10;
            this._collision$2.body.SetAwake(true);
            if (!this._previousMovement$2) {
                this._animation$2.setRange(48, 120, true);
                this._walkSoundDir$2 = 0.3;
            }
        }
        else {
            if (this._previousMovement$2) {
                this._animation$2.setRange(0, 47, true);
                this._walkSoundDir$2 = -0.2;
            }
            this._collision$2.body.SetAwake(false);
        }
        this._mechNode$2.translate3(-(this._mechNode$2.localTranslation.elements[0] - this._collision$2.body.m_xf.position.x), -(this._mechNode$2.localTranslation.elements[1] - 0.5), -(this._mechNode$2.localTranslation.elements[2] - this._collision$2.body.m_xf.position.y));
        this._previousMovement$2 = this._movement$2;
    }
}


GLSharp.Demo.registerClass('GLSharp.Demo', GLSharp.Game.GameBase);
GLSharp.DemoGame.Controllers.CameraController.registerClass('GLSharp.DemoGame.Controllers.CameraController', GLSharp.Universe.ControllerBase);
GLSharp.DemoGame.Controllers.MechControllerBase.registerClass('GLSharp.DemoGame.Controllers.MechControllerBase', GLSharp.Universe.ControllerBase);
GLSharp.DemoGame.Controllers.PlayerController.registerClass('GLSharp.DemoGame.Controllers.PlayerController', GLSharp.DemoGame.Controllers.MechControllerBase);
})();

//! This script was generated using Script# v0.7.4.0
