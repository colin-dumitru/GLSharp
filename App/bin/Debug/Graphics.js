// Graphics.js
(function(){
Type.registerNamespace('GLSharp.Graphics');GLSharp.Graphics.ClearMode=function(){};GLSharp.Graphics.ClearMode.prototype = {depth:256,stencil:1024,color:16384}
GLSharp.Graphics.ClearMode.registerEnum('GLSharp.Graphics.ClearMode',false);GLSharp.Graphics.IGraphics=function(){};GLSharp.Graphics.IGraphics.registerInterface('GLSharp.Graphics.IGraphics');GLSharp.Graphics.Color=function(){}
GLSharp.Graphics.Color.create=function(red,green,blue,alpha){var $0=new GLSharp.Graphics.Color();$0.set_red(red);$0.set_green(green);$0.set_blue(blue);$0.set_alpha(alpha);return $0;}
GLSharp.Graphics.Color.prototype={$0:0,$1:0,$2:0,$3:1,get_red:function(){return this.$0;},set_red:function(value){this.$0=value;return value;},get_green:function(){return this.$1;},set_green:function(value){this.$1=value;return value;},get_blue:function(){return this.$2;},set_blue:function(value){this.$2=value;return value;},get_alpha:function(){return this.$3;},set_alpha:function(value){this.$3=value;return value;}}
GLSharp.Graphics.Color.registerClass('GLSharp.Graphics.Color');})();// This script was generated using Script# v0.7.4.0
