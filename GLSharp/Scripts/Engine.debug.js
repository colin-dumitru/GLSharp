//! Engine.debug.js
//

(function() {

Type.registerNamespace('GLSharp.Graphics');

////////////////////////////////////////////////////////////////////////////////
// GLSharp.Graphics.ClearMode

GLSharp.Graphics.ClearMode = function() { 
    /// <field name="depth" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="stencil" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="color" type="Number" integer="true" static="true">
    /// </field>
};
GLSharp.Graphics.ClearMode.prototype = {
    depth: 256, 
    stencil: 1024, 
    color: 16384
}
GLSharp.Graphics.ClearMode.registerEnum('GLSharp.Graphics.ClearMode', false);


////////////////////////////////////////////////////////////////////////////////
// GLSharp.Graphics.IGraphics

GLSharp.Graphics.IGraphics = function() { 
};
GLSharp.Graphics.IGraphics.prototype = {
    get_width : null,
    get_height : null,
    get_clearColor : null,
    set_clearColor : null,
    get_clearMode : null,
    set_clearMode : null,
    clear : null
}
GLSharp.Graphics.IGraphics.registerInterface('GLSharp.Graphics.IGraphics');


////////////////////////////////////////////////////////////////////////////////
// GLSharp.Graphics.Color

GLSharp.Graphics.Color = function GLSharp_Graphics_Color() {
    /// <field name="_red" type="Number">
    /// </field>
    /// <field name="_green" type="Number">
    /// </field>
    /// <field name="_blue" type="Number">
    /// </field>
    /// <field name="_alpha" type="Number">
    /// </field>
}
GLSharp.Graphics.Color.create = function GLSharp_Graphics_Color$create(red, green, blue, alpha) {
    /// <param name="red" type="Number">
    /// </param>
    /// <param name="green" type="Number">
    /// </param>
    /// <param name="blue" type="Number">
    /// </param>
    /// <param name="alpha" type="Number">
    /// </param>
    /// <returns type="GLSharp.Graphics.Color"></returns>
    var ret = new GLSharp.Graphics.Color();
    ret.set_red(red);
    ret.set_green(green);
    ret.set_blue(blue);
    ret.set_alpha(alpha);
    return ret;
}
GLSharp.Graphics.Color.prototype = {
    _red: 0,
    _green: 0,
    _blue: 0,
    _alpha: 1,
    
    get_red: function GLSharp_Graphics_Color$get_red() {
        /// <value type="Number"></value>
        return this._red;
    },
    set_red: function GLSharp_Graphics_Color$set_red(value) {
        /// <value type="Number"></value>
        this._red = value;
        return value;
    },
    
    get_green: function GLSharp_Graphics_Color$get_green() {
        /// <value type="Number"></value>
        return this._green;
    },
    set_green: function GLSharp_Graphics_Color$set_green(value) {
        /// <value type="Number"></value>
        this._green = value;
        return value;
    },
    
    get_blue: function GLSharp_Graphics_Color$get_blue() {
        /// <value type="Number"></value>
        return this._blue;
    },
    set_blue: function GLSharp_Graphics_Color$set_blue(value) {
        /// <value type="Number"></value>
        this._blue = value;
        return value;
    },
    
    get_alpha: function GLSharp_Graphics_Color$get_alpha() {
        /// <value type="Number"></value>
        return this._alpha;
    },
    set_alpha: function GLSharp_Graphics_Color$set_alpha(value) {
        /// <value type="Number"></value>
        this._alpha = value;
        return value;
    }
}


GLSharp.Graphics.Color.registerClass('GLSharp.Graphics.Color');
})();

//! This script was generated using Script# v0.7.4.0
