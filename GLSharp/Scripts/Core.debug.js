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
}
GLSharp.Core.Core.get_environment = function GLSharp_Core_Core$get_environment() {
    /// <value type="GLSharp.Core.IEnvironment"></value>
    return GLSharp.Core.Core._environment;
}
GLSharp.Core.Core.set_environment = function GLSharp_Core_Core$set_environment(value) {
    /// <value type="GLSharp.Core.IEnvironment"></value>
    GLSharp.Core.Core._environment = value;
    return value;
}


GLSharp.Core.Core.registerClass('GLSharp.Core.Core');
GLSharp.Core.Core._environment = null;
})();

//! This script was generated using Script# v0.7.4.0
