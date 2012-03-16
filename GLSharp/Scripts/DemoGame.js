// DemoGame.js
(function(){
Type.registerNamespace('GLSharp');GLSharp.DemoGame=function(){GLSharp.DemoGame.initializeBase(this);}
GLSharp.DemoGame.prototype={startup:function(){this.get_library().loadLibrary('/Data/Lib/test.dae.lib');}}
GLSharp.DemoGame.registerClass('GLSharp.DemoGame',GLSharp.Game.GameBase);})();// This script was generated using Script# v0.7.4.0
