var Environment = function () {
}

Environment.prototype = {
    init: function(obj, args) {
        for(var i = 0; i < args.length - 1; i += 2)
            obj[args[i]] = args[i + 1];

        return obj;
    },

    createFloat32Array : function( size) {
        return new Float32Array(size);
    },

    createFloat64Array : function(size) {
    return new Float64Array(size);
    },

    createInt8Array : function(size){
        return new Int8Array(size);
    },

    createUInt8Array : function(size){
        return new UInt8Array(size);
    },

    createInt16Array : function(size){
        return new Int16Array(size);
    },

    createUInt16Array : function(size){
        return new UInt16Array(size);
    },

    createInt32Array : function(size){
        return new Int32Array(size);
    },

    CreateUInt32Array : function(size){
        return new UInt32Array(size);
    }
}