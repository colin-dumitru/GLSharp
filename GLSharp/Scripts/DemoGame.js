// DemoGame.js
(function(){
Type.registerNamespace('GLSharp');GLSharp.DemoGame=function(){GLSharp.DemoGame.initializeBase(this);}
GLSharp.DemoGame.prototype={$1_0:null,startup:function(){this.get_engine().get_library().loadLibrary('/Data/Lib/test.dae.lib');this.$1_0=GLSharp.Core.SystemCore.get_timer().start(ss.Delegate.create(this,this.$1_1),1000/20,true);},$1_1:function(){}}
GLSharp.DemoGame.registerClass('GLSharp.DemoGame',GLSharp.Game.GameBase);})();// This script was generated using Script# v0.7.4.0
