//! Core.debug.js
//

(function() {

Type.registerNamespace('GLSharp.Core');

////////////////////////////////////////////////////////////////////////////////
// GLSharp.Core.IInputProvider

GLSharp.Core.IInputProvider = function() { 
};
GLSharp.Core.IInputProvider.prototype = {
    keySet : null,
    get_mouseX : null,
    get_mouseY : null
}
GLSharp.Core.IInputProvider.registerInterface('GLSharp.Core.IInputProvider');


////////////////////////////////////////////////////////////////////////////////
// GLSharp.Core.ITimer

GLSharp.Core.ITimer = function() { 
};
GLSharp.Core.ITimer.prototype = {
    start : null,
    stop : null,
    requestAnimationFrame : null
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
    init : null,
    requestAnimationFrame : null
}
GLSharp.Core.IEnvironment.registerInterface('GLSharp.Core.IEnvironment');


////////////////////////////////////////////////////////////////////////////////
// GLSharp.Core.Event

GLSharp.Core.Event = function GLSharp_Core_Event() {
    /// <summary>
    /// Faster implementation than the Script# one.
    /// </summary>
    /// <field name="_handlers" type="Array">
    /// </field>
}
GLSharp.Core.Event.prototype = {
    _handlers: null,
    
    subscribe: function GLSharp_Core_Event$subscribe(handler, unique) {
        /// <param name="handler" type="Function">
        /// </param>
        /// <param name="unique" type="Nullable`1">
        /// </param>
        if (this._handlers == null) {
            this._handlers = [];
        }
        if (!!unique) {
            for (var i = 0; i < this._handlers.length; i++) {
                if (this._methodsEqual(this._handlers[i], handler)) {
                    return;
                }
            }
        }
        this._handlers.add(handler);
    },
    
    unsubscribe: function GLSharp_Core_Event$unsubscribe(handler) {
        /// <param name="handler" type="Function">
        /// </param>
        if (this._handlers == null) {
            return;
        }
        for (var i = 0; i < this._handlers.length; i++) {
            if (this._methodsEqual(this._handlers[i], handler)) {
                this._handlers.removeAt(i);
                break;
            }
        }
        if (!this._handlers.length) {
            this._handlers = null;
        }
    },
    
    fire: function GLSharp_Core_Event$fire(sender, args) {
        /// <param name="sender" type="Object">
        /// </param>
        /// <param name="args" type="Object">
        /// </param>
        if (this._handlers != null) {
            for (var i = 0; i < this._handlers.length; i++) {
                this._handlers[i](sender, args);
            }
        }
    },
    
    _methodsEqual: function GLSharp_Core_Event$_methodsEqual(m1, m2) {
        /// <param name="m1" type="Function">
        /// </param>
        /// <param name="m2" type="Function">
        /// </param>
        /// <returns type="Boolean"></returns>
        return (m1.object == m2.object) && (m1.method == m2.method);
    }
}


////////////////////////////////////////////////////////////////////////////////
// GLSharp.Core.Keys

GLSharp.Core.Keys = function GLSharp_Core_Keys() {
    /// <field name="backspace" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="tab" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="enter" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="shift" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="ctrl" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="alt" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="pauseBreak" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="capsLock" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="escape" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="space" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="pageUp" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="pageDown" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="end" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="home" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="leftArrow" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="upArrow" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="rightArrow" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="downArrow" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="insertKey" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="deleteKey" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="key0" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="key1" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="key2" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="key3" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="key4" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="key5" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="key6" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="key7" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="key8" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="key9" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="a" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="b" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="c" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="d" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="e" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="f" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="g" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="h" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="i" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="j" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="k" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="l" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="m" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="n" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="o" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="p" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="q" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="r" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="s" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="t" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="u" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="v" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="w" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="x" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="y" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="z" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="leftWindowKey" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="rightWindowKey" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="selectKey" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="numpad0" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="numpad1" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="numpad2" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="numpad3" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="numpad4" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="numpad5" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="numpad6" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="numpad7" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="numpad8" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="numpad9" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="multiply" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="add" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="subtract" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="decimalPoint" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="divide" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="f1" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="f2" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="f3" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="f4" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="f5" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="f6" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="f7" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="f8" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="f9" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="f10" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="f11" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="f12" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="numLock" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="scrollLock" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="semiColon" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="equalSign" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="comma" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="dash" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="period" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="forwardSlash" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="graveAccent" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="openBracket" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="backSlash" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="closeBraket" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="singleQuote" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="mouseLeft" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="mouseRight" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="mouseMiddle" type="Number" integer="true" static="true">
    /// </field>
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
    /// <field name="environment" type="GLSharp.Core.IEnvironment" static="true">
    /// Gets or sets the global Environment object.
    /// </field>
    /// <field name="resourceManager" type="GLSharp.Data.IResourceManager" static="true">
    /// Gets or sets the global ResourceManager.
    /// </field>
    /// <field name="logger" type="GLSharp.Core.ILoggingProvider" static="true">
    /// Gets or sets the Logging Provider.
    /// </field>
    /// <field name="timer" type="GLSharp.Core.ITimer" static="true">
    /// Gets or sets the timingprovider.
    /// </field>
    /// <field name="input" type="GLSharp.Core.IInputProvider" static="true">
    /// Gets or sets the input provider.
    /// </field>
}
GLSharp.Core.SystemCore.assert = function GLSharp_Core_SystemCore$assert(condition, message) {
    /// <param name="condition" type="Boolean">
    /// </param>
    /// <param name="message" type="String">
    /// </param>
    if (condition) {
        GLSharp.Core.SystemCore.logger.log(message);
    }
}
GLSharp.Core.SystemCore.log = function GLSharp_Core_SystemCore$log(message) {
    /// <param name="message" type="String">
    /// </param>
    GLSharp.Core.SystemCore.logger.log(message);
}


Type.registerNamespace('GLSharp.Data');

////////////////////////////////////////////////////////////////////////////////
// GLSharp.Data.IAudioResource

GLSharp.Data.IAudioResource = function() { 
};
GLSharp.Data.IAudioResource.prototype = {
    currentTime : null,
    volume : null,
    paused : null,
    readyState : null,
    src : null,
    play : null,
    pause : null
}
GLSharp.Data.IAudioResource.registerInterface('GLSharp.Data.IAudioResource');


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
    /// <field name="resourceChanged" type="GLSharp.Core.Event">
    /// Called when the Data object has changed. Sender object is of type Resource.
    /// </field>
    this.resourceChanged = new GLSharp.Core.Event();
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
        if (this.resourceChanged != null) {
            this.resourceChanged.fire(this, null);
        }
        return value;
    }
}


GLSharp.Core.Event.registerClass('GLSharp.Core.Event');
GLSharp.Core.Keys.registerClass('GLSharp.Core.Keys');
GLSharp.Core.TimerHandle.registerClass('GLSharp.Core.TimerHandle');
GLSharp.Core.SystemCore.registerClass('GLSharp.Core.SystemCore');
GLSharp.Data.ResourceManagerParams.registerClass('GLSharp.Data.ResourceManagerParams');
GLSharp.Data.Resource.registerClass('GLSharp.Data.Resource');
GLSharp.Core.Keys.backspace = 8;
GLSharp.Core.Keys.tab = 9;
GLSharp.Core.Keys.enter = 13;
GLSharp.Core.Keys.shift = 16;
GLSharp.Core.Keys.ctrl = 17;
GLSharp.Core.Keys.alt = 18;
GLSharp.Core.Keys.pauseBreak = 19;
GLSharp.Core.Keys.capsLock = 20;
GLSharp.Core.Keys.escape = 27;
GLSharp.Core.Keys.space = 32;
GLSharp.Core.Keys.pageUp = 33;
GLSharp.Core.Keys.pageDown = 34;
GLSharp.Core.Keys.end = 35;
GLSharp.Core.Keys.home = 36;
GLSharp.Core.Keys.leftArrow = 37;
GLSharp.Core.Keys.upArrow = 38;
GLSharp.Core.Keys.rightArrow = 39;
GLSharp.Core.Keys.downArrow = 40;
GLSharp.Core.Keys.insertKey = 45;
GLSharp.Core.Keys.deleteKey = 46;
GLSharp.Core.Keys.key0 = 48;
GLSharp.Core.Keys.key1 = 49;
GLSharp.Core.Keys.key2 = 50;
GLSharp.Core.Keys.key3 = 51;
GLSharp.Core.Keys.key4 = 52;
GLSharp.Core.Keys.key5 = 53;
GLSharp.Core.Keys.key6 = 54;
GLSharp.Core.Keys.key7 = 55;
GLSharp.Core.Keys.key8 = 56;
GLSharp.Core.Keys.key9 = 57;
GLSharp.Core.Keys.a = 65;
GLSharp.Core.Keys.b = 66;
GLSharp.Core.Keys.c = 67;
GLSharp.Core.Keys.d = 68;
GLSharp.Core.Keys.e = 69;
GLSharp.Core.Keys.f = 70;
GLSharp.Core.Keys.g = 71;
GLSharp.Core.Keys.h = 72;
GLSharp.Core.Keys.i = 73;
GLSharp.Core.Keys.j = 74;
GLSharp.Core.Keys.k = 75;
GLSharp.Core.Keys.l = 76;
GLSharp.Core.Keys.m = 77;
GLSharp.Core.Keys.n = 78;
GLSharp.Core.Keys.o = 79;
GLSharp.Core.Keys.p = 80;
GLSharp.Core.Keys.q = 81;
GLSharp.Core.Keys.r = 82;
GLSharp.Core.Keys.s = 83;
GLSharp.Core.Keys.t = 84;
GLSharp.Core.Keys.u = 85;
GLSharp.Core.Keys.v = 86;
GLSharp.Core.Keys.w = 87;
GLSharp.Core.Keys.x = 88;
GLSharp.Core.Keys.y = 89;
GLSharp.Core.Keys.z = 90;
GLSharp.Core.Keys.leftWindowKey = 91;
GLSharp.Core.Keys.rightWindowKey = 92;
GLSharp.Core.Keys.selectKey = 93;
GLSharp.Core.Keys.numpad0 = 96;
GLSharp.Core.Keys.numpad1 = 97;
GLSharp.Core.Keys.numpad2 = 98;
GLSharp.Core.Keys.numpad3 = 99;
GLSharp.Core.Keys.numpad4 = 100;
GLSharp.Core.Keys.numpad5 = 101;
GLSharp.Core.Keys.numpad6 = 102;
GLSharp.Core.Keys.numpad7 = 103;
GLSharp.Core.Keys.numpad8 = 104;
GLSharp.Core.Keys.numpad9 = 105;
GLSharp.Core.Keys.multiply = 106;
GLSharp.Core.Keys.add = 107;
GLSharp.Core.Keys.subtract = 109;
GLSharp.Core.Keys.decimalPoint = 110;
GLSharp.Core.Keys.divide = 111;
GLSharp.Core.Keys.f1 = 112;
GLSharp.Core.Keys.f2 = 113;
GLSharp.Core.Keys.f3 = 114;
GLSharp.Core.Keys.f4 = 115;
GLSharp.Core.Keys.f5 = 116;
GLSharp.Core.Keys.f6 = 117;
GLSharp.Core.Keys.f7 = 118;
GLSharp.Core.Keys.f8 = 119;
GLSharp.Core.Keys.f9 = 120;
GLSharp.Core.Keys.f10 = 121;
GLSharp.Core.Keys.f11 = 122;
GLSharp.Core.Keys.f12 = 123;
GLSharp.Core.Keys.numLock = 144;
GLSharp.Core.Keys.scrollLock = 145;
GLSharp.Core.Keys.semiColon = 186;
GLSharp.Core.Keys.equalSign = 187;
GLSharp.Core.Keys.comma = 188;
GLSharp.Core.Keys.dash = 189;
GLSharp.Core.Keys.period = 190;
GLSharp.Core.Keys.forwardSlash = 191;
GLSharp.Core.Keys.graveAccent = 192;
GLSharp.Core.Keys.openBracket = 219;
GLSharp.Core.Keys.backSlash = 220;
GLSharp.Core.Keys.closeBraket = 221;
GLSharp.Core.Keys.singleQuote = 222;
GLSharp.Core.Keys.mouseLeft = 300;
GLSharp.Core.Keys.mouseRight = 301;
GLSharp.Core.Keys.mouseMiddle = 302;
GLSharp.Core.SystemCore._environment = null;
GLSharp.Core.SystemCore.environment = null;
GLSharp.Core.SystemCore.resourceManager = null;
GLSharp.Core.SystemCore.logger = null;
GLSharp.Core.SystemCore.timer = null;
GLSharp.Core.SystemCore.input = null;
})();

//! This script was generated using Script# v0.7.4.0
