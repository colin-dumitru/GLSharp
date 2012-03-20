//! DemoGame.debug.js
//

(function() {

Type.registerNamespace('GLSharp');

////////////////////////////////////////////////////////////////////////////////
// GLSharp.DemoGame

GLSharp.DemoGame = function GLSharp_DemoGame() {
    GLSharp.DemoGame.initializeBase(this);
}
GLSharp.DemoGame.prototype = {
    
    startup: function GLSharp_DemoGame$startup() {
        this.get_library().loadLibrary('/Data/Lib/test.dae.lib');
    }
}


GLSharp.DemoGame.registerClass('GLSharp.DemoGame', GLSharp.Game.GameBase);
})();

//! This script was generated using Script# v0.7.4.0
