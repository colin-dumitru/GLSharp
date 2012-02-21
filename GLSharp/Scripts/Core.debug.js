//! Core.debug.js
//

(function() {

Type.registerNamespace('GLSharp.Core');

////////////////////////////////////////////////////////////////////////////////
// GLSharp.Core.IEnvironment

GLSharp.Core.IEnvironment = function() { 
};
GLSharp.Core.IEnvironment.prototype = {
    createFloat32Array : null,
    createFloat64Array : null,
    createInt8Array : null,
    createUInt8Array : null,
    createInt16Array : null,
    createUInt16Array : null,
    createInt32Array : null,
    createUInt32Array : null,
    init : null
}
GLSharp.Core.IEnvironment.registerInterface('GLSharp.Core.IEnvironment');


////////////////////////////////////////////////////////////////////////////////
// GLSharp.Core.Core

GLSharp.Core.Core = function GLSharp_Core_Core() {
    /// <field name="_environment" type="GLSharp.Core.IEnvironment" static="true">
    /// </field>
    /// <field name="_resourceManager" type="GLSharp.Data.IResourceManager" static="true">
    /// </field>
}
GLSharp.Core.Core.get_environment = function GLSharp_Core_Core$get_environment() {
    /// <summary>
    /// Gets or sets the global Environment object.
    /// </summary>
    /// <value type="GLSharp.Core.IEnvironment"></value>
    return GLSharp.Core.Core._environment;
}
GLSharp.Core.Core.set_environment = function GLSharp_Core_Core$set_environment(value) {
    /// <summary>
    /// Gets or sets the global Environment object.
    /// </summary>
    /// <value type="GLSharp.Core.IEnvironment"></value>
    GLSharp.Core.Core._environment = value;
    return value;
}
GLSharp.Core.Core.get_resourceManager = function GLSharp_Core_Core$get_resourceManager() {
    /// <summary>
    /// Gets or sets the global ResourceManager.
    /// </summary>
    /// <value type="GLSharp.Data.IResourceManager"></value>
    return GLSharp.Core.Core._resourceManager;
}
GLSharp.Core.Core.set_resourceManager = function GLSharp_Core_Core$set_resourceManager(value) {
    /// <summary>
    /// Gets or sets the global ResourceManager.
    /// </summary>
    /// <value type="GLSharp.Data.IResourceManager"></value>
    GLSharp.Core.Core._resourceManager = value;
    return value;
}


Type.registerNamespace('GLSharp.Data');

////////////////////////////////////////////////////////////////////////////////
// GLSharp.Data.IImageResource

GLSharp.Data.IImageResource = function() { 
};
GLSharp.Data.IImageResource.prototype = {
    alt : null,
    complete : null,
    src : null,
    height : null,
    naturalHeight : null,
    naturalWidth : null,
    width : null
}
GLSharp.Data.IImageResource.registerInterface('GLSharp.Data.IImageResource');


////////////////////////////////////////////////////////////////////////////////
// GLSharp.Data.IResourceManager

GLSharp.Data.IResourceManager = function() { 
};
GLSharp.Data.IResourceManager.prototype = {
    getResource : null,
    freeResource : null
}
GLSharp.Data.IResourceManager.registerInterface('GLSharp.Data.IResourceManager');


////////////////////////////////////////////////////////////////////////////////
// GLSharp.Data.Resource

GLSharp.Data.Resource = function GLSharp_Data_Resource() {
    /// <field name="_finished" type="Boolean">
    /// </field>
    /// <field name="_data" type="Object">
    /// </field>
    /// <field name="__resourceChanged" type="Function">
    /// </field>
}
GLSharp.Data.Resource.prototype = {
    _finished: false,
    _data: null,
    
    get_finished: function GLSharp_Data_Resource$get_finished() {
        /// <summary>
        /// Inidicates whether or not the resource has finished loading.
        /// </summary>
        /// <value type="Boolean"></value>
        return this._finished;
    },
    set_finished: function GLSharp_Data_Resource$set_finished(value) {
        /// <summary>
        /// Inidicates whether or not the resource has finished loading.
        /// </summary>
        /// <value type="Boolean"></value>
        this._finished = value;
        return value;
    },
    
    get_data: function GLSharp_Data_Resource$get_data() {
        /// <summary>
        /// Gets the data loaded. Null if no data i loaded.
        /// </summary>
        /// <value type="Object"></value>
        return this._data;
    },
    set_data: function GLSharp_Data_Resource$set_data(value) {
        /// <summary>
        /// Gets the data loaded. Null if no data i loaded.
        /// </summary>
        /// <value type="Object"></value>
        this._data = value;
        if (this.__resourceChanged != null) {
            this.__resourceChanged(this, null);
        }
        return value;
    },
    
    add_resourceChanged: function GLSharp_Data_Resource$add_resourceChanged(value) {
        /// <summary>
        /// Called when the Data object has changed.
        /// </summary>
        /// <param name="value" type="Function" />
        this.__resourceChanged = ss.Delegate.combine(this.__resourceChanged, value);
    },
    remove_resourceChanged: function GLSharp_Data_Resource$remove_resourceChanged(value) {
        /// <summary>
        /// Called when the Data object has changed.
        /// </summary>
        /// <param name="value" type="Function" />
        this.__resourceChanged = ss.Delegate.remove(this.__resourceChanged, value);
    },
    
    __resourceChanged: null
}


GLSharp.Core.Core.registerClass('GLSharp.Core.Core');
GLSharp.Data.Resource.registerClass('GLSharp.Data.Resource');
GLSharp.Core.Core._environment = null;
GLSharp.Core.Core._resourceManager = null;
})();

//! This script was generated using Script# v0.7.4.0
