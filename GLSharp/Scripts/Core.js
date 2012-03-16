// Core.js
(function(){
Type.registerNamespace('GLSharp.Core');GLSharp.Core.ILoggingProvider=function(){};GLSharp.Core.ILoggingProvider.registerInterface('GLSharp.Core.ILoggingProvider');GLSharp.Core.IEnvironment=function(){};GLSharp.Core.IEnvironment.registerInterface('GLSharp.Core.IEnvironment');GLSharp.Core.SystemCore=function(){}
GLSharp.Core.SystemCore.get_environment=function(){return GLSharp.Core.SystemCore.$0;}
GLSharp.Core.SystemCore.set_environment=function(value){GLSharp.Core.SystemCore.$0=value;return value;}
GLSharp.Core.SystemCore.get_resourceManager=function(){return GLSharp.Core.SystemCore.$1;}
GLSharp.Core.SystemCore.set_resourceManager=function(value){GLSharp.Core.SystemCore.$1=value;return value;}
GLSharp.Core.SystemCore.get_logger=function(){return GLSharp.Core.SystemCore.$2;}
GLSharp.Core.SystemCore.set_logger=function(value){GLSharp.Core.SystemCore.$2=value;return value;}
Type.registerNamespace('GLSharp.Data');GLSharp.Data.IImageResource=function(){};GLSharp.Data.IImageResource.registerInterface('GLSharp.Data.IImageResource');GLSharp.Data.IResourceManager=function(){};GLSharp.Data.IResourceManager.registerInterface('GLSharp.Data.IResourceManager');GLSharp.Data.ResourceManagerParams=function(){}
GLSharp.Data.ResourceManagerParams.prototype={$0:null,get_type:function(){return this.$0;},set_type:function(value){this.$0=value;return value;}}
GLSharp.Data.Resource=function(){}
GLSharp.Data.Resource.prototype={$0:false,$1:null,get_finished:function(){return this.$0;},set_finished:function(value){this.$0=value;return value;},get_data:function(){return this.$1;},set_data:function(value){this.$1=value;if(this.$2!=null){this.$2(this,null);}return value;},add_resourceChanged:function(value){this.$2=ss.Delegate.combine(this.$2,value);},remove_resourceChanged:function(value){this.$2=ss.Delegate.remove(this.$2,value);},$2:null}
GLSharp.Core.SystemCore.registerClass('GLSharp.Core.SystemCore');GLSharp.Data.ResourceManagerParams.registerClass('GLSharp.Data.ResourceManagerParams');GLSharp.Data.Resource.registerClass('GLSharp.Data.Resource');GLSharp.Core.SystemCore.$0=null;GLSharp.Core.SystemCore.$1=null;GLSharp.Core.SystemCore.$2=null;})();// This script was generated using Script# v0.7.4.0
