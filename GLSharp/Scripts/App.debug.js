//! App.debug.js
//

(function() {

Type.registerNamespace('GLSharp.Graphics');

////////////////////////////////////////////////////////////////////////////////
// GLSharp.Graphics.Buffer

GLSharp.Graphics.Buffer = function GLSharp_Graphics_Buffer() {
}


////////////////////////////////////////////////////////////////////////////////
// GLSharp.Graphics.FrameBuffer

GLSharp.Graphics.FrameBuffer = function GLSharp_Graphics_FrameBuffer() {
}


////////////////////////////////////////////////////////////////////////////////
// GLSharp.Graphics.RenderBuffer

GLSharp.Graphics.RenderBuffer = function GLSharp_Graphics_RenderBuffer() {
}


////////////////////////////////////////////////////////////////////////////////
// GLSharp.Graphics.Shader

GLSharp.Graphics.Shader = function GLSharp_Graphics_Shader() {
}


////////////////////////////////////////////////////////////////////////////////
// GLSharp.Graphics.ShaderProgram

GLSharp.Graphics.ShaderProgram = function GLSharp_Graphics_ShaderProgram() {
}


////////////////////////////////////////////////////////////////////////////////
// GLSharp.Graphics.Texture

GLSharp.Graphics.Texture = function GLSharp_Graphics_Texture() {
}


////////////////////////////////////////////////////////////////////////////////
// GLSharp.Graphics.UniformLocation

GLSharp.Graphics.UniformLocation = function GLSharp_Graphics_UniformLocation() {
}


////////////////////////////////////////////////////////////////////////////////
// GLSharp.Graphics.WebGLGraphics

GLSharp.Graphics.WebGLGraphics = function GLSharp_Graphics_WebGLGraphics(canvas) {
    /// <param name="canvas" type="Object" domElement="true">
    /// </param>
    /// <field name="_canvas" type="Object" domElement="true">
    /// </field>
    /// <field name="_context" type="GLSharp.Graphics.WebGL">
    /// </field>
    /// <field name="_clearColor" type="GLSharp.Graphics.Color">
    /// </field>
    /// <field name="_clearMode" type="GLSharp.Graphics.ClearMode">
    /// </field>
    this._clearMode = GLSharp.Graphics.ClearMode.color;
    this._canvas = canvas;
    this._context = canvas.getContext('experimental-webgl');
    this.set_clearColor(GLSharp.Graphics.Color.create(0.3, 0.6, 0.9, 1));
}
GLSharp.Graphics.WebGLGraphics.prototype = {
    _canvas: null,
    _context: null,
    _clearColor: null,
    
    get_height: function GLSharp_Graphics_WebGLGraphics$get_height() {
        /// <summary>
        /// The height of the drawing area.
        /// </summary>
        /// <value type="Number" integer="true"></value>
        if (this._canvas != null) {
            return this._canvas.height;
        }
        return -1;
    },
    
    get_width: function GLSharp_Graphics_WebGLGraphics$get_width() {
        /// <summary>
        /// The width of the draing area.
        /// </summary>
        /// <value type="Number" integer="true"></value>
        if (this._canvas != null) {
            return this._canvas.width;
        }
        return -1;
    },
    
    get_clearColor: function GLSharp_Graphics_WebGLGraphics$get_clearColor() {
        /// <summary>
        /// Gets or sets the color used for drawing.
        /// </summary>
        /// <value type="GLSharp.Graphics.Color"></value>
        return this._clearColor;
    },
    set_clearColor: function GLSharp_Graphics_WebGLGraphics$set_clearColor(value) {
        /// <summary>
        /// Gets or sets the color used for drawing.
        /// </summary>
        /// <value type="GLSharp.Graphics.Color"></value>
        this._clearColor = value;
        if (this._context != null) {
            this._context.clearColor(this._clearColor.get_red(), this._clearColor.get_green(), this._clearColor.get_blue(), this._clearColor.get_alpha());
        }
        return value;
    },
    
    get_clearMode: function GLSharp_Graphics_WebGLGraphics$get_clearMode() {
        /// <summary>
        /// Gets or sets the clear mode used when clearing the graphics.
        /// </summary>
        /// <value type="GLSharp.Graphics.ClearMode"></value>
        return this._clearMode;
    },
    set_clearMode: function GLSharp_Graphics_WebGLGraphics$set_clearMode(value) {
        /// <summary>
        /// Gets or sets the clear mode used when clearing the graphics.
        /// </summary>
        /// <value type="GLSharp.Graphics.ClearMode"></value>
        this._clearMode = value;
        return value;
    },
    
    clear: function GLSharp_Graphics_WebGLGraphics$clear() {
        this._context.clear(this._clearMode);
    }
}


Type.registerNamespace('App');

////////////////////////////////////////////////////////////////////////////////
// App.App

App.App = function App_App() {
    /// <field name="_graphics" type="GLSharp.Graphics.IGraphics">
    /// </field>
}
App.App.prototype = {
    _graphics: null,
    
    init: function App_App$init() {
        GLSharp.Core.Core.set_environment(new Environment());
        var canvasElem = document.getElementById('mainCanvas');
        if (canvasElem == null) {
            throw new Error('No canvas element found!');
        }
        this._graphics = new GLSharp.Graphics.WebGLGraphics(canvasElem);
        this._graphics.clear();
    }
}


GLSharp.Graphics.Buffer.registerClass('GLSharp.Graphics.Buffer');
GLSharp.Graphics.FrameBuffer.registerClass('GLSharp.Graphics.FrameBuffer');
GLSharp.Graphics.RenderBuffer.registerClass('GLSharp.Graphics.RenderBuffer');
GLSharp.Graphics.Shader.registerClass('GLSharp.Graphics.Shader');
GLSharp.Graphics.ShaderProgram.registerClass('GLSharp.Graphics.ShaderProgram');
GLSharp.Graphics.Texture.registerClass('GLSharp.Graphics.Texture');
GLSharp.Graphics.UniformLocation.registerClass('GLSharp.Graphics.UniformLocation');
GLSharp.Graphics.WebGLGraphics.registerClass('GLSharp.Graphics.WebGLGraphics', null, GLSharp.Graphics.IGraphics);
App.App.registerClass('App.App');
})();

//! This script was generated using Script# v0.7.4.0
