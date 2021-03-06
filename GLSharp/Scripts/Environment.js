﻿
var JsLoggingProvider = function () {

};

JsLoggingProvider.prototype.log = function (message) {
    console.log(message);
};
//--------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------
var Environment = function() {
};

Environment.prototype = {
    init: function (obj, args) {
        for (var i = 0; i < args.length - 1; i += 2)
            obj[args[i]] = args[i + 1];

        return obj;
    },

    createFloat32Array: function (size) {
        return new window.Float32Array(size);
    },

    createFloat64Array: function (size) {
        return new window.Float64Array(size);
    },

    createInt8Array: function (size) {
        return new window.Int8Array(size);
    },

    createUInt8Array: function (size) {
        return new window.Uint8Array(size);
    },

    createInt16Array: function (size) {
        return new window.Int16Array(size);
    },

    createUInt16Array: function (size) {
        return new window.Uint16Array(size);
    },

    createInt32Array: function (size) {
        return new window.Int32Array(size);
    },

    CreateUInt32Array: function (size) {
        return new window.Uint32Array(size);
    },

    createFloat32ArrayFromArray: function (input) {
        return new window.Float32Array(input);
    },

    createFloat64ArrayFromArray: function (input) {
        return new window.Float64Array(input);
    },

    createInt8ArrayFromArray: function (input) {
        return new window.Int8Array(input);
    },

    createUInt8ArrayFromArray: function (input) {
        return new window.Uint8Array(input);
    },

    createInt16ArrayFromArray: function (input) {
        return new window.Int16Array(input);
    },

    createUInt16ArrayFromArray: function (input) {
        return new window.Uint16Array(input);
    },

    createInt32ArrayFromArray: function (input) {
        return new window.Int32Array(input);
    },

    createUInt32ArrayFromArray: function (input) {
        return new window.Uint32Array(input);
    },
    
    requestAnimationFrame: function(action){
        var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||  
                                window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;  
  
        function step(timestamp) {
            action();
            requestAnimationFrame(step);  
        }  
        requestAnimationFrame(step);  
    }
};

//--------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------

var XmlHelper = function innerText() {
};

XmlHelper.innerText = function(node) {
    return node.textContent;
};
//--------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------

ss.Delegate.create = function Delegate$create(object, method) {
    if (!object) {
        return method;
    }
    var ret = function () {
        return method.apply(object, arguments);
    };

    ret.object = object;
    ret.method = method;

    return ret;
}