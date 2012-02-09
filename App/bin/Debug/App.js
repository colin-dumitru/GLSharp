// App.js
(function(){
Type.registerNamespace('GLSharp.Graphics');GLSharp.Graphics.Buffer=function(){}
GLSharp.Graphics.FrameBuffer=function(){}
GLSharp.Graphics.RenderBuffer=function(){}
GLSharp.Graphics.Shader=function(){}
GLSharp.Graphics.ShaderProgram=function(){}
GLSharp.Graphics.Texture=function(){}
GLSharp.Graphics.UniformLocation=function(){}
GLSharp.Graphics.WebGLGraphics=function(canvas){this.$0=canvas;this.$1=canvas.getContext('experimental-webgl');this.$2=new GLSharp.Graphics.Color();this.$1.clearColor(1,0,0,1);this.$1.clear(GLSharp.Graphics.ClearMode.color);}
GLSharp.Graphics.WebGLGraphics.prototype={$0:null,$1:null,$2:null,get_height:function(){if(this.$0!=null){return this.$0.height;}return -1;},get_width:function(){if(this.$0!=null){return this.$0.width;}return -1;},get_clearColor:function(){return null;},set_clearColor:function(value){return value;},get_clearMode:function(){return GLSharp.Graphics.ClearMode.color;},set_clearMode:function(value){return value;},clear:function(){}}
Type.registerNamespace('App');App.App=function(){}
App.App.prototype={$0:null,init:function(){GLSharp.Core.Core.set_environment(new Environment());var $0=document.getElementById('mainCanvas');if($0==null){throw new Error('No canvas element found!');}this.$0=new GLSharp.Graphics.WebGLGraphics($0);var $1=GLSharp.Core.Core.get_environment().createFloat32Array(10);$1[0]=5;}}
GLSharp.Graphics.Buffer.registerClass('GLSharp.Graphics.Buffer');GLSharp.Graphics.FrameBuffer.registerClass('GLSharp.Graphics.FrameBuffer');GLSharp.Graphics.RenderBuffer.registerClass('GLSharp.Graphics.RenderBuffer');GLSharp.Graphics.Shader.registerClass('GLSharp.Graphics.Shader');GLSharp.Graphics.ShaderProgram.registerClass('GLSharp.Graphics.ShaderProgram');GLSharp.Graphics.Texture.registerClass('GLSharp.Graphics.Texture');GLSharp.Graphics.UniformLocation.registerClass('GLSharp.Graphics.UniformLocation');GLSharp.Graphics.WebGLGraphics.registerClass('GLSharp.Graphics.WebGLGraphics',null,GLSharp.Graphics.IGraphics);App.App.registerClass('App.App');})();// This script was generated using Script# v0.7.4.0