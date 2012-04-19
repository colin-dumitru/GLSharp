//! DemoGame.debug.js
//

(function() {

Type.registerNamespace('GLSharp');

////////////////////////////////////////////////////////////////////////////////
// GLSharp.DemoGame

GLSharp.DemoGame = function GLSharp_DemoGame() {
    /// <field name="_updateHandle$1" type="GLSharp.Core.TimerHandle">
    /// </field>
    GLSharp.DemoGame.initializeBase(this);
}
GLSharp.DemoGame.prototype = {
    _updateHandle$1: null,
    
    startup: function GLSharp_DemoGame$startup() {
        this.get_engine().get_library().loadLibrary('/Data/Lib/test.dae.lib');
        this._updateHandle$1 = GLSharp.Core.SystemCore.get_timer().start(ss.Delegate.create(this, this._update$1), 1000 / 20, true);
    },
    
    _update$1: function GLSharp_DemoGame$_update$1() {
    }
}


GLSharp.DemoGame.registerClass('GLSharp.DemoGame', GLSharp.Game.GameBase);
})();

//! This script was generated using Script# v0.7.4.0
