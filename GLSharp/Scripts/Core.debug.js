//! Core.debug.js
//

(function() {

Type.registerNamespace('GLSharp.Core');

////////////////////////////////////////////////////////////////////////////////
// GLSharp.Core.ITimer

GLSharp.Core.ITimer = function() { 
};
GLSharp.Core.ITimer.prototype = {
    start : null,
    stop : null
}
GLSharp.Core.ITimer.registerInterface('GLSharp.Core.ITimer');


////////////////////////////////////////////////////////////////////////////////
// GLSharp.Core.ILoggingProvider

GLSharp.Core.ILoggingProvider = function() { 
};
GLSharp.Core.ILoggingProvider.prototype = {
    log : null
}
GLSharp.Core.ILoggingProvider.registerInterface('GLSharp.Core.ILoggingProvider');


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
    createFloat32ArrayFromArray : null,
    createFloat64ArrayFromArray : null,
    createInt8ArrayFromArray : null,
    createUInt8ArrayFromArray : null,
    createInt16ArrayFromArray : null,
    createUInt16ArrayFromArray : null,
    createInt32ArrayFromArray : null,
    createUInt32ArrayFromArray : null,
    init : null
}
GLSharp.Core.IEnvironment.registerInterface('GLSharp.Core.IEnvironment');


////////////////////////////////////////////////////////////////////////////////
// GLSharp.Core.Event

GLSharp.Core.Event = function GLSharp_Core_Event() {
    /// <summary>
    /// Faster implementation than the Script# one.
    /// </summary>
    /// <field name="_events" type="Array">
    /// </field>
}
GLSharp.Core.Event.prototype = {
    _events: null,
    
    subscribe: function GLSharp_Core_Event$subscribe(handler, unique) {
        /// <param name="handler" type="Function">
        /// </param>
        /// <param name="unique" type="Nullable`1">
        /// </param>
        if (this._events == null) {
            this._events = [];
        }
        if (!!unique && this._events.contains(handler)) {
            return;
        }
        this._events.add(handler);
    },
    
    unsubscribe: function GLSharp_Core_Event$unsubscribe(handler) {
        /// <param name="handler" type="Function">
        /// </param>
        if (this._events == null) {
            return;
        }
        this._events.remove(handler);
    },
    
    fire: function GLSharp_Core_Event$fire(sender, args) {
        /// <param name="sender" type="Object">
        /// </param>
        /// <param name="args" type="Object">
        /// </param>
        if (this._events != null) {
            for (var i = 0; i < this._events.length; i++) {
                this._events[i];
            }
        }
    }
}


////////////////////////////////////////////////////////////////////////////////
// GLSharp.Core.TimerHandle

GLSharp.Core.TimerHandle = function GLSharp_Core_TimerHandle() {
    /// <field name="_id" type="Number" integer="true">
    /// </field>
    /// <field name="_repeat" type="Boolean">
    /// </field>
}
GLSharp.Core.TimerHandle.prototype = {
    _id: 0,
    
    get_id: function GLSharp_Core_TimerHandle$get_id() {
        /// <value type="Number" integer="true"></value>
        return this._id;
    },
    set_id: function GLSharp_Core_TimerHandle$set_id(value) {
        /// <value type="Number" integer="true"></value>
        this._id = value;
        return value;
    },
    
    _repeat: false,
    
    get_repeat: function GLSharp_Core_TimerHandle$get_repeat() {
        /// <value type="Boolean"></value>
        return this._repeat;
    },
    set_repeat: function GLSharp_Core_TimerHandle$set_repeat(value) {
        /// <value type="Boolean"></value>
        this._repeat = value;
        return value;
    }
}


////////////////////////////////////////////////////////////////////////////////
// GLSharp.Core.SystemCore

GLSharp.Core.SystemCore = function GLSharp_Core_SystemCore() {
    /// <field name="_environment" type="GLSharp.Core.IEnvironment" static="true">
    /// </field>
    /// <field name="_resourceManager" type="GLSharp.Data.IResourceManager" static="true">
    /// </field>
    /// <field name="_logger" type="GLSharp.Core.ILoggingProvider" static="true">
    /// </field>
    /// <field name="_timer" type="GLSharp.Core.ITimer" static="true">
    /// </field>
}
GLSharp.Core.SystemCore.get_environment = function GLSharp_Core_SystemCore$get_environment() {
    /// <summary>
    /// Gets or sets the global Environment object.
    /// </summary>
    /// <value type="GLSharp.Core.IEnvironment"></value>
    return GLSharp.Core.SystemCore._environment;
}
GLSharp.Core.SystemCore.set_environment = function GLSharp_Core_SystemCore$set_environment(value) {
    /// <summary>
    /// Gets or sets the global Environment object.
    /// </summary>
    /// <value type="GLSharp.Core.IEnvironment"></value>
    GLSharp.Core.SystemCore._environment = value;
    return value;
}
GLSharp.Core.SystemCore.get_resourceManager = function GLSharp_Core_SystemCore$get_resourceManager() {
    /// <summary>
    /// Gets or sets the global ResourceManager.
    /// </summary>
    /// <value type="GLSharp.Data.IResourceManager"></value>
    return GLSharp.Core.SystemCore._resourceManager;
}
GLSharp.Core.SystemCore.set_resourceManager = function GLSharp_Core_SystemCore$set_resourceManager(value) {
    /// <summary>
    /// Gets or sets the global ResourceManager.
    /// </summary>
    /// <value type="GLSharp.Data.IResourceManager"></value>
    GLSharp.Core.SystemCore._resourceManager = value;
    return value;
}
GLSharp.Core.SystemCore.get_logger = function GLSharp_Core_SystemCore$get_logger() {
    /// <summary>
    /// Gets or sets the Logging Provider.
    /// </summary>
    /// <value type="GLSharp.Core.ILoggingProvider"></value>
    return GLSharp.Core.SystemCore._logger;
}
GLSharp.Core.SystemCore.set_logger = function GLSharp_Core_SystemCore$set_logger(value) {
    /// <summary>
    /// Gets or sets the Logging Provider.
    /// </summary>
    /// <value type="GLSharp.Core.ILoggingProvider"></value>
    GLSharp.Core.SystemCore._logger = value;
    return value;
}
GLSharp.Core.SystemCore.get_timer = function GLSharp_Core_SystemCore$get_timer() {
    /// <value type="GLSharp.Core.ITimer"></value>
    return GLSharp.Core.SystemCore._timer;
}
GLSharp.Core.SystemCore.set_timer = function GLSharp_Core_SystemCore$set_timer(value) {
    /// <value type="GLSharp.Core.ITimer"></value>
    GLSharp.Core.SystemCore._timer = value;
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
// GLSharp.Data.ResourceManagerParams

GLSharp.Data.ResourceManagerParams = function GLSharp_Data_ResourceManagerParams() {
    /// <field name="_type" type="String">
    /// </field>
}
GLSharp.Data.ResourceManagerParams.prototype = {
    _type: null,
    
    get_type: function GLSharp_Data_ResourceManagerParams$get_type() {
        /// <value type="String"></value>
        return this._type;
    },
    set_type: function GLSharp_Data_ResourceManagerParams$set_type(value) {
        /// <value type="String"></value>
        this._type = value;
        return value;
    }
}


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


GLSharp.Core.Event.registerClass('GLSharp.Core.Event');
GLSharp.Core.TimerHandle.registerClass('GLSharp.Core.TimerHandle');
GLSharp.Core.SystemCore.registerClass('GLSharp.Core.SystemCore');
GLSharp.Data.ResourceManagerParams.registerClass('GLSharp.Data.ResourceManagerParams');
GLSharp.Data.Resource.registerClass('GLSharp.Data.Resource');
GLSharp.Core.SystemCore._environment = null;
GLSharp.Core.SystemCore._resourceManager = null;
GLSharp.Core.SystemCore._logger = null;
GLSharp.Core.SystemCore._timer = null;
})();

//! This script was generated using Script# v0.7.4.0
