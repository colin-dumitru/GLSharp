var Environment = function () {
}

Environment.prototype = {
    createFloat32Array: function () {
        return new Float32Array();
    },

    init: function(obj, args) {
        for(var i = 0; i < args.length - 1; i += 2)
            obj[args[i]] = args[i + 1];

        return obj;
    }
}