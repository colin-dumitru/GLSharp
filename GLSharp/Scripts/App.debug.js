//! App.debug.js
//

(function() {

Type.registerNamespace('GLSharp.Core');

////////////////////////////////////////////////////////////////////////////////
// GLSharp.Core.JsInputProvider

GLSharp.Core.JsInputProvider = function GLSharp_Core_JsInputProvider() {
    /// <field name="_keys" type="Array">
    /// </field>
    /// <field name="_mouseX" type="Number">
    /// </field>
    /// <field name="_mouseY" type="Number">
    /// </field>
    /// <field name="_screenX" type="Number" integer="true">
    /// </field>
    /// <field name="_screenY" type="Number" integer="true">
    /// </field>
    this._keys = [];
}
GLSharp.Core.JsInputProvider.prototype = {
    _mouseX: 0,
    _mouseY: 0,
    _screenX: 0,
    _screenY: 0,
    
    initialize: function GLSharp_Core_JsInputProvider$initialize(canvas, screenX, screenY) {
        /// <param name="canvas" type="Object" domElement="true">
        /// </param>
        /// <param name="screenX" type="Number" integer="true">
        /// </param>
        /// <param name="screenY" type="Number" integer="true">
        /// </param>
        this._screenX = screenX;
        this._screenY = screenY;
        var that = this;
        canvas.addEventListener('keydown', function(e) {
            that._keys[e.keyCode] = true;
        }, true);
        canvas.addEventListener('keyup', function(e) {
            that._keys[e.keyCode] = false;
        }, true);
        canvas.addEventListener('mousedown', function(e) {
            that._keys[GLSharp.Core.Keys.mouseLeft] = true;
        }, true);
        canvas.addEventListener('mouseup', function(e) {
            that._keys[GLSharp.Core.Keys.mouseRight] = true;
        }, true);
        canvas.addEventListener('mousemove', ss.Delegate.create(this, function(e) {
            that._mouseX = ((((e).pageX - e.target.offsetLeft) / this._screenX) - 0.5) * 2;
            that._mouseY = ((((e).pageY - e.target.offsetTop) / this._screenY) - 0.5) * 2;
        }), true);
    },
    
    _mouseMove: function GLSharp_Core_JsInputProvider$_mouseMove(e) {
        /// <param name="e" type="ElementEvent">
        /// </param>
        this._mouseX = e.offsetX;
        this._mouseY = e.offsetY;
    },
    
    _mouseUp: function GLSharp_Core_JsInputProvider$_mouseUp(e) {
        /// <param name="e" type="ElementEvent">
        /// </param>
        this._keys[GLSharp.Core.Keys.mouseRight] = true;
    },
    
    _mouseDown: function GLSharp_Core_JsInputProvider$_mouseDown(e) {
        /// <param name="e" type="ElementEvent">
        /// </param>
        this._keys[GLSharp.Core.Keys.mouseLeft] = true;
    },
    
    _keyUp: function GLSharp_Core_JsInputProvider$_keyUp(e) {
        /// <param name="e" type="ElementEvent">
        /// </param>
        this._keys[e.keyCode] = false;
    },
    
    _keyDown: function GLSharp_Core_JsInputProvider$_keyDown(e) {
        /// <param name="e" type="ElementEvent">
        /// </param>
        this._keys[e.keyCode] = true;
    },
    
    keySet: function GLSharp_Core_JsInputProvider$keySet(key) {
        /// <param name="key" type="Number" integer="true">
        /// </param>
        /// <returns type="Boolean"></returns>
        return this._keys[key];
    },
    
    get_mouseX: function GLSharp_Core_JsInputProvider$get_mouseX() {
        /// <value type="Number"></value>
        return this._mouseX;
    },
    
    get_mouseY: function GLSharp_Core_JsInputProvider$get_mouseY() {
        /// <value type="Number"></value>
        return this._mouseY;
    }
}


////////////////////////////////////////////////////////////////////////////////
// GLSharp.Core.Timer

GLSharp.Core.Timer = function GLSharp_Core_Timer() {
}
GLSharp.Core.Timer.prototype = {
    
    start: function GLSharp_Core_Timer$start(action, interval, repeat) {
        /// <param name="action" type="Function">
        /// </param>
        /// <param name="interval" type="Number" integer="true">
        /// </param>
        /// <param name="repeat" type="Boolean">
        /// </param>
        /// <returns type="GLSharp.Core.TimerHandle"></returns>
        var ret = new GLSharp.Core.TimerHandle();
        ret.set_repeat(repeat);
        if (repeat) {
            ret.set_id(window.setInterval(action, interval));
        }
        else {
            ret.set_id(window.setTimeout(action, interval));
        }
        return ret;
    },
    
    requestAnimationFrame: function GLSharp_Core_Timer$requestAnimationFrame(action) {
        /// <param name="action" type="Function">
        /// </param>
        GLSharp.Core.SystemCore.environment.requestAnimationFrame(action);
    },
    
    stop: function GLSharp_Core_Timer$stop(handle) {
        /// <param name="handle" type="GLSharp.Core.TimerHandle">
        /// </param>
        if (handle.get_repeat()) {
            window.clearInterval(handle.get_id());
        }
        else {
            window.clearTimeout(handle.get_id());
        }
    }
}


Type.registerNamespace('GLSharp.Data');

////////////////////////////////////////////////////////////////////////////////
// GLSharp.Data.IResourceLoader

GLSharp.Data.IResourceLoader = function() { 
};
GLSharp.Data.IResourceLoader.prototype = {
    get_extension : null,
    load : null
}
GLSharp.Data.IResourceLoader.registerInterface('GLSharp.Data.IResourceLoader');


////////////////////////////////////////////////////////////////////////////////
// GLSharp.Data.AudioLoader

GLSharp.Data.AudioLoader = function GLSharp_Data_AudioLoader() {
}
GLSharp.Data.AudioLoader.prototype = {
    
    get_extension: function GLSharp_Data_AudioLoader$get_extension() {
        /// <value type="Array"></value>
        var ret = [];
        ret.add('mp3');
        return ret;
    },
    
    load: function GLSharp_Data_AudioLoader$load(url) {
        /// <param name="url" type="String">
        /// </param>
        /// <returns type="GLSharp.Data.Resource"></returns>
        var ret = new GLSharp.Data.Resource();
        var audio = new Audio();
        audio.src = url;
        ret.set_finished(true);
        ret.set_data(audio);
        return ret;
    }
}


////////////////////////////////////////////////////////////////////////////////
// GLSharp.Data.ImageLoader

GLSharp.Data.ImageLoader = function GLSharp_Data_ImageLoader() {
}
GLSharp.Data.ImageLoader.prototype = {
    
    get_extension: function GLSharp_Data_ImageLoader$get_extension() {
        /// <value type="Array"></value>
        var ret = [];
        ret.add('jpg');
        ret.add('gif');
        ret.add('png');
        ret.add('jpeg');
        return ret;
    },
    
    load: function GLSharp_Data_ImageLoader$load(url) {
        /// <param name="url" type="String">
        /// </param>
        /// <returns type="GLSharp.Data.Resource"></returns>
        var ret = new GLSharp.Data.Resource();
        ret.set_finished(false);
        var img = new Image();
        img.onload = function() {
            ret.set_finished(true);
            ret.set_data(img);
        };
        img.src = url;
        return ret;
    }
}


////////////////////////////////////////////////////////////////////////////////
// GLSharp.Data.JsonLoader

GLSharp.Data.JsonLoader = function GLSharp_Data_JsonLoader() {
}
GLSharp.Data.JsonLoader.prototype = {
    
    get_extension: function GLSharp_Data_JsonLoader$get_extension() {
        /// <value type="Array"></value>
        var ret = [];
        ret.add('json');
        return ret;
    },
    
    load: function GLSharp_Data_JsonLoader$load(url) {
        /// <param name="url" type="String">
        /// </param>
        /// <returns type="GLSharp.Data.Resource"></returns>
        var ret = new GLSharp.Data.Resource();
        ret.set_finished(false);
        var req = new XMLHttpRequest();
        req.open('GET', url, true);
        req.onreadystatechange = function() {
            if (req.readyState === 4 && req.status === 200) {
                ret.set_finished(true);
                ret.set_data(JSON.parse(req.responseText));
            }
        };
        req.send();
        return ret;
    }
}


////////////////////////////////////////////////////////////////////////////////
// GLSharp.Data.ShaderLoader

GLSharp.Data.ShaderLoader = function GLSharp_Data_ShaderLoader(gl) {
    /// <param name="gl" type="GLSharp.Graphics.WebGL">
    /// </param>
    /// <field name="_gl" type="GLSharp.Graphics.WebGL">
    /// </field>
    this._gl = gl;
}
GLSharp.Data.ShaderLoader.prototype = {
    _gl: null,
    
    get_extension: function GLSharp_Data_ShaderLoader$get_extension() {
        /// <value type="Array"></value>
        var ret = [];
        ret.add('shader');
        return ret;
    },
    
    load: function GLSharp_Data_ShaderLoader$load(url) {
        /// <param name="url" type="String">
        /// </param>
        /// <returns type="GLSharp.Data.Resource"></returns>
        var ret = new GLSharp.Data.Resource();
        ret.set_finished(false);
        var req = new XMLHttpRequest();
        req.open('GET', url, true);
        req.onreadystatechange = ss.Delegate.create(this, function() {
            if (req.readyState === 4 && req.status === 200) {
                ret.set_finished(true);
                ret.set_data(this._parseShader(ss.parseXml(req.responseText)));
            }
        });
        req.send();
        return ret;
    },
    
    _parseShader: function GLSharp_Data_ShaderLoader$_parseShader(doc) {
        /// <param name="doc" type="XmlDocument">
        /// </param>
        /// <returns type="GLSharp.Graphics.CompiledShader"></returns>
        if (doc.documentElement.nodeName !== 'shader') {
            throw new Error('Invalid shader file');
        }
        var that = this;
        var sourceFragment = null;
        var sourceVertex = null;
        var ret = new GLSharp.Graphics.CompiledShader();
        ret.name = doc.documentElement.attributes.getNamedItem('name').nodeValue;
        var uniforms = [];
        var attributes = [];
        var $enum1 = ss.IEnumerator.getEnumerator(doc.documentElement.childNodes);
        while ($enum1.moveNext()) {
            var xmlNode = $enum1.current;
            if (xmlNode.nodeType !== 1) {
                continue;
            }
            if (xmlNode.nodeName === 'vertex_shader') {
                sourceVertex = XmlHelper.innerText(xmlNode);
            }
            else if (xmlNode.nodeName === 'fragment_shader') {
                sourceFragment = XmlHelper.innerText(xmlNode);
            }
            else if (xmlNode.nodeName === 'uniform') {
                uniforms.add(XmlHelper.innerText(xmlNode));
            }
            else if (xmlNode.nodeName === 'attribute') {
                attributes.add(XmlHelper.innerText(xmlNode));
            }
        }
        if (sourceFragment == null || sourceVertex == null) {
            throw new Error('Shader file does not contain fragment and vertex shaders');
        }
        var shaderFragment = this._compileShader(sourceFragment, 35632);
        var shaderVertex = this._compileShader(sourceVertex, 35633);
        var shaderProgram = this._gl.createProgram();
        this._gl.attachShader(shaderProgram, shaderFragment);
        this._gl.attachShader(shaderProgram, shaderVertex);
        this._gl.linkProgram(shaderProgram);
        if (!this._gl.getProgramParameter(shaderProgram, 35714)) {
            throw new Error('Cannot link shaders.');
        }
        ret.attributes = {};
        ret.uniforms = {};
        attributes.forEach(function(value) {
            ret.attributes[value] = that._gl.getAttribLocation(shaderProgram, value);
        });
        uniforms.forEach(function(value) {
            ret.uniforms[value] = that._gl.getUniformLocation(shaderProgram, value);
        });
        ret.shaderProgram = shaderProgram;
        return ret;
    },
    
    _compileShader: function GLSharp_Data_ShaderLoader$_compileShader(source, type) {
        /// <param name="source" type="String">
        /// </param>
        /// <param name="type" type="Number" integer="true">
        /// </param>
        /// <returns type="GLSharp.Graphics.IShader"></returns>
        var ret = this._gl.createShader(type);
        this._gl.shaderSource(ret, source);
        this._gl.compileShader(ret);
        if (!this._gl.getShaderParameter(ret, 35713)) {
            throw new Error('Cannot compile shader : ' + this._gl.getShaderInfoLog(ret));
        }
        return ret;
    }
}


////////////////////////////////////////////////////////////////////////////////
// GLSharp.Data.ResourceManager

GLSharp.Data.ResourceManager = function GLSharp_Data_ResourceManager() {
    /// <field name="_loaders" type="Object">
    /// </field>
    /// <field name="_rootUrl" type="String">
    /// </field>
    this._loaders = {};
}
GLSharp.Data.ResourceManager.prototype = {
    _rootUrl: '',
    
    get_rootUrl: function GLSharp_Data_ResourceManager$get_rootUrl() {
        /// <value type="String"></value>
        return this._rootUrl;
    },
    set_rootUrl: function GLSharp_Data_ResourceManager$set_rootUrl(value) {
        /// <value type="String"></value>
        this._rootUrl = value;
        return value;
    },
    
    getResource: function GLSharp_Data_ResourceManager$getResource(resource, managerParams) {
        /// <param name="resource" type="String">
        /// </param>
        /// <param name="managerParams" type="GLSharp.Data.ResourceManagerParams">
        /// </param>
        /// <returns type="GLSharp.Data.Resource"></returns>
        if (managerParams == null) {
            managerParams = new GLSharp.Data.ResourceManagerParams();
        }
        if (managerParams.get_type() == null) {
            var lastPeriod = resource.lastIndexOf('.');
            managerParams.set_type('');
            if (lastPeriod > -1) {
                managerParams.set_type(resource.substring(lastPeriod + 1, resource.length));
            }
        }
        managerParams.set_type(managerParams.get_type().toLowerCase());
        var loader = this._loaders[managerParams.get_type()];
        if (loader == null) {
            throw new Error('The specified resource is unsuppoted');
        }
        return loader.load(this.get_rootUrl() + resource);
    },
    
    freeResource: function GLSharp_Data_ResourceManager$freeResource(resource) {
        /// <param name="resource" type="String">
        /// </param>
        /// <returns type="Boolean"></returns>
        return false;
    },
    
    addLoader: function GLSharp_Data_ResourceManager$addLoader(loader) {
        /// <param name="loader" type="GLSharp.Data.IResourceLoader">
        /// </param>
        var $enum1 = ss.IEnumerator.getEnumerator(loader.get_extension());
        while ($enum1.moveNext()) {
            var ext = $enum1.current;
            this._loaders[ext.toLowerCase()] = loader;
        }
    },
    
    removeLoader: function GLSharp_Data_ResourceManager$removeLoader(loader) {
        /// <param name="loader" type="GLSharp.Data.IResourceLoader">
        /// </param>
        var $enum1 = ss.IEnumerator.getEnumerator(loader.get_extension());
        while ($enum1.moveNext()) {
            var ext = $enum1.current;
            delete this._loaders[ext.toLowerCase()];
        }
    }
}


Type.registerNamespace('GLSharp.Graphics');

////////////////////////////////////////////////////////////////////////////////
// GLSharp.Graphics.WebGLContextAttributes

GLSharp.Graphics.WebGLContextAttributes = function GLSharp_Graphics_WebGLContextAttributes() {
    /// <field name="alpha" type="Boolean">
    /// </field>
    /// <field name="depth" type="Boolean">
    /// </field>
    /// <field name="stencil" type="Boolean">
    /// </field>
    /// <field name="antialias" type="Boolean">
    /// </field>
    /// <field name="premultipliedAlpha" type="Boolean">
    /// </field>
    /// <field name="preserveDrawingBuffer" type="Boolean">
    /// </field>
}
GLSharp.Graphics.WebGLContextAttributes.prototype = {
    alpha: true,
    depth: true,
    stencil: false,
    antialias: false,
    premultipliedAlpha: true,
    preserveDrawingBuffer: false
}


////////////////////////////////////////////////////////////////////////////////
// GLSharp.Graphics.WebGLE

GLSharp.Graphics.WebGLE = function GLSharp_Graphics_WebGLE() {
    /// <field name="depthBufferBit" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="stencilBufferBit" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="colorBufferBit" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="points" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="lines" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="lineLoop" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="lineStrip" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="triangles" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="triangleStrip" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="triangleFan" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="zero" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="one" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="srcColor" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="oneMinusSrcColor" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="srcAlpha" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="oneMinusSrcAlpha" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="dstAlpha" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="oneMinusDstAlpha" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="dstColor" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="oneMinusDstColor" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="srcAlphaSaturate" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="funcAdd" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="blendEquationRgb" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="blendEquationAlpha" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="funcSubtract" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="funcReverseSubtract" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="blendDstRgb" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="blendSrcRgb" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="blendDstAlpha" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="blendSrcAlpha" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="constantantColor" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="oneMinusConstantColor" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="constantAlpha" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="oneMinusConstantAlpha" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="blendColor" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="arrayBuffer" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="elementArrayBuffer" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="arrayBufferBinding" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="elementArrayBufferBinding" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="streamDraw" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="staticDraw" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="dynamicDraw" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="bufferSize" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="bufferUsage" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="currentVertexAttribute" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="front" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="back" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="frontAndBack" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="cullFace" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="blend" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="dither" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="stencilTest" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="depthTest" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="scissorTest" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="polygonOffsetFill" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="sampleAlphaToCoverage" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="sampleCoverage" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="noError" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="invalidEnum" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="invalidValue" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="invalidOperation" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="outOfMemory" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="cw" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="ccw" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="lineWidth" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="aliasedPointSizeRange" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="aliasedLineWidthRange" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="cullFaceMode" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="frontFace" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="depthRange" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="depthWritemask" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="depthClearValue" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="depthFunc" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="stencilClearValue" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="stencilFunc" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="stencilFail" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="stencilPassDepthFail" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="stencilPassDepthPass" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="stencilReff" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="stencilValueMask" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="stencilWritemask" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="stencilBackFunc" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="stencilBackFail" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="stencilBackPassDepthFail" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="stencilBackPassDepthPass" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="stencilBackReff" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="stencilBackValueMask" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="stencilBackWritemask" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="viewport" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="scissorBox" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="colorClearValue" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="colorWritemask" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="unpackAlignment" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="packAlignment" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="maxTextureSize" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="maxViewportDims" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="subpixelBits" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="redBits" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="greenBits" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="blueBits" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="alphaBits" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="depthBits" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="stencilBits" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="polygonOffsetUnits" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="polygonOffsetFactor" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="textureBinding_2D" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="sampleBuffers" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="samples" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="sampleCoverageValue" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="sampleCoverageInvert" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="numCompressedTextureFormats" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="compressedTextureFormats" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="dontCare" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="fastest" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="nicest" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="generateMipmapHint" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="byteT" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="unsignedByteT" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="shortT" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="unsignedShortT" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="intT" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="unsignedIntT" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="floatT" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="depthComponent" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="alpha" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="rgb" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="rgba" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="luminance" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="luminanceAlpha" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="unsignedShort4444" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="unsignedShort5551" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="unsignedShort565" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="fragmentShader" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="vertexShader" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="maxVertexAttribs" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="maxVertexUniformVectors" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="maxVaryingVectors" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="maxCombinedTextureImageUnits" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="maxVertexTextureImageUnits" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="maxTextureImageUnits" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="maxFragmentUniformVectors" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="shaderType" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="deleteStatus" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="linkStatus" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="validateStatus" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="attachedShaders" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="activeUniforms" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="activeAttributes" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="shadingLanguageVersion" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="currentProgram" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="never" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="less" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="equal" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="lequal" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="greater" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="notequal" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="gequal" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="always" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="keep" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="replace" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="incr" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="decr" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="invert" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="incrWrap" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="decrWrap" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="vendor" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="renderer" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="version" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="nearest" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="linear" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="nearestMipmapNearest" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="linearMipmapNearest" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="nearestMipmapLinear" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="linearMipmapLinear" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="textureMagFilter" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="textureMinFilter" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="textureWrapS" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="textureWrapT" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="texture_2D" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="texture" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="textureCubeMap" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="textureBindingCubeMap" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="textureCubeMapPositiveX" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="textureCubeMapNegativeX" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="textureCubeMapPositiveY" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="textureCubeMapNegativeY" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="textureCubeMapPositiveZ" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="textureCubeMapNegativeZ" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="maxCubeMapTextureSize" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="texture0" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="texture1" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="texture2" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="texture3" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="texture4" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="texture5" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="texture6" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="texture7" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="texture8" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="texture9" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="texture10" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="texture11" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="texture12" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="texture13" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="texture14" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="texture15" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="texture16" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="texture17" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="texture18" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="texture19" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="texture20" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="texture21" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="texture22" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="texture23" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="texture24" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="texture25" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="texture26" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="texture27" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="texture28" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="texture29" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="texture30" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="texture31" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="activeTexture" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="repeat" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="clampToEdge" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="mirroredRepeat" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="floatVec2" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="floatVec3" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="floatVec4" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="intVec2" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="intVec3" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="intVec4" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="bool" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="boolVec2" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="boolVec3" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="boolVec4" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="floatMat2" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="floatMat3" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="floatMat4" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="sampler_2D" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="samplerCube" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="vertexAttribArrayEnabled" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="vertexAttribArraySize" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="vertexAttribArrayStride" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="vertexAttribArrayType" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="vertexAttribArrayNormalized" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="vertexAttribArrayPointer" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="vertexAttribArrayBufferBinding" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="compileStatus" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="lowFloat" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="mediumFloat" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="highFloat" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="lowInt" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="mediumInt" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="highInt" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="frameBuffer" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="renderbuffer" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="rgba4" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="rgb5A1" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="rgb565" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="depthComponent16" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="stencilIndex" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="stencilIndex8" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="depthStencil" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="renderbufferWidth" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="renderbufferHeight" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="renderbufferInternalFormat" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="renderbufferRedSize" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="renderbufferGreenSize" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="renderbufferBlueSize" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="renderbufferAlphaSize" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="renderbufferDepthSize" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="renderbufferStencilSize" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="framebufferAttachmentObjectType" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="framebufferAttachmentObjectName" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="framebufferAttachmentTextureLevel" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="framebufferAttachmentTextureCubeMapFace" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="colorAttachment0" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="depthAttachment" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="stencilAttachment" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="depthStencilAttachment" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="none" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="framebufferComplete" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="framebufferIncompleteAttachment" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="framebufferIncompleteMissingAttachment" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="framebufferIncompleteDimensions" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="framebufferUnsupported" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="framebufferBinding" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="renderbufferBinding" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="maxRenderbufferSize" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="invalidFramebufferOperation" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="unpackFlipY" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="unpackPremultiplyAlpha" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="contextLost" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="unpackColorspaceConversion" type="Number" integer="true" static="true">
    /// </field>
}


////////////////////////////////////////////////////////////////////////////////
// GLSharp.Graphics._phongBinder

GLSharp.Graphics._phongBinder = function GLSharp_Graphics__phongBinder(library, graphics, parent) {
    /// <param name="library" type="GLSharp.Content.Library">
    /// </param>
    /// <param name="graphics" type="GLSharp.Graphics.WebGL">
    /// </param>
    /// <param name="parent" type="GLSharp.Graphics.ShaderGroup">
    /// </param>
    /// <field name="_library" type="GLSharp.Content.Library">
    /// </field>
    /// <field name="_graphics" type="GLSharp.Graphics.WebGL">
    /// </field>
    /// <field name="_parent" type="GLSharp.Graphics.ShaderGroup">
    /// </field>
    /// <field name="_vertexBuffer" type="GLSharp.Graphics.IBuffer">
    /// </field>
    if (parent == null) {
        throw new Error('Parent cannot be null');
    }
    if (graphics == null) {
        throw new Error('Graphics cannot be null');
    }
    if (library == null) {
        throw new Error('Library cannot be null');
    }
    this._library = library;
    this._graphics = graphics;
    this._parent = parent;
    this._vertexBuffer = this._graphics.createBuffer();
    this._graphics.bindBuffer(34962, this._vertexBuffer);
    var vertices = GLSharp.Core.SystemCore.environment.createFloat32ArrayFromArray([ 1, 1, 0, -1, 1, 0, 1, -1, 0, -1, -1, 0 ]);
    this._graphics.bufferData(34962, vertices, 35044);
}
GLSharp.Graphics._phongBinder.prototype = {
    _library: null,
    _graphics: null,
    _parent: null,
    _vertexBuffer: null,
    
    bindGeometryPass: function GLSharp_Graphics__phongBinder$bindGeometryPass(pMatrix) {
        /// <param name="pMatrix" type="GLSharp.Util.Matrix4X4">
        /// </param>
        if (this._parent.geometryPassShader == null) {
            return;
        }
        this._graphics.useProgram(this._parent.geometryPassShader.shaderProgram);
        this._graphics.uniformMatrix4fv(this._parent.geometryPassShader.uniforms['uPMatrix'], false, pMatrix.elements);
    },
    
    bindGeometryInstance: function GLSharp_Graphics__phongBinder$bindGeometryInstance(mvMatrix, nMatrix) {
        /// <param name="mvMatrix" type="GLSharp.Util.Matrix4X4">
        /// </param>
        /// <param name="nMatrix" type="GLSharp.Util.Matrix4X4">
        /// </param>
        if (this._parent.geometryPassShader == null) {
            return;
        }
        this._graphics.uniformMatrix4fv(this._parent.geometryPassShader.uniforms['uMVMatrix'], false, mvMatrix.elements);
        this._graphics.uniformMatrix4fv(this._parent.geometryPassShader.uniforms['uNMatrix'], false, nMatrix.elements);
    },
    
    bindGeometryMesh: function GLSharp_Graphics__phongBinder$bindGeometryMesh(mesh) {
        /// <param name="mesh" type="GLSharp.Content.MeshItem">
        /// </param>
        if (this._parent.geometryPassShader == null) {
            return;
        }
        this._graphics.bindBuffer(34962, mesh.meshBuffer);
        this._graphics.vertexAttribPointer(this._parent.geometryPassShader.attributes['aVertexPosition'], 3, 5126, false, 0, mesh.offsetPosition * 4);
        this._graphics.vertexAttribPointer(this._parent.geometryPassShader.attributes['aNormalPosition'], 3, 5126, false, 0, mesh.offsetNormal * 4);
        this._graphics.vertexAttribPointer(this._parent.geometryPassShader.attributes['aUVPosition'], 2, 5126, false, 0, mesh.offsetUv * 4);
        this._graphics.bindBuffer(34963, mesh.indexBuffer);
    },
    
    bindGeometryMaterial: function GLSharp_Graphics__phongBinder$bindGeometryMaterial(material) {
        /// <param name="material" type="GLSharp.Content.MaterialItem">
        /// </param>
        if (this._parent.geometryPassShader == null) {
            return;
        }
        var texture = this._library.getResource(material.properties['diffuse'].value);
        this._graphics.uniform1f(this._parent.geometryPassShader.uniforms['uShinines'], (material.properties['shininess'] != null) ? material.properties['shininess'].value : 0);
        this._graphics.uniform1f(this._parent.geometryPassShader.uniforms['uEmissive'], (material.properties['emission'] != null) ? (material.properties['emission'].value)[0] : 1);
        if (texture != null) {
            this._graphics.activeTexture(33984);
            this._graphics.bindTexture(3553, texture.texture);
            this._graphics.uniform1i(this._parent.geometryPassShader.uniforms['uSampler'], 0);
        }
        else {
            this._graphics.activeTexture(33984);
            this._graphics.bindTexture(3553, null);
            this._graphics.uniform1i(this._parent.geometryPassShader.uniforms['uSampler'], 0);
        }
    },
    
    bindGeometryPassNum: function GLSharp_Graphics__phongBinder$bindGeometryPassNum(pass) {
        /// <param name="pass" type="Number" integer="true">
        /// </param>
        if (this._parent.geometryPassShader == null) {
            return;
        }
        this._graphics.uniform1i(this._parent.geometryPassShader.uniforms['uPass'], pass);
    },
    
    bindLightPass: function GLSharp_Graphics__phongBinder$bindLightPass(diffuse, position, normal, viewport) {
        /// <param name="diffuse" type="GLSharp.Graphics.ITexture">
        /// </param>
        /// <param name="position" type="GLSharp.Graphics.ITexture">
        /// </param>
        /// <param name="normal" type="GLSharp.Graphics.ITexture">
        /// </param>
        /// <param name="viewport" type="Array" elementType="Number">
        /// </param>
        if (this._parent.lightPassShader == null) {
            return;
        }
        this._graphics.useProgram(this._parent.lightPassShader.shaderProgram);
        this._graphics.uniform2f(this._parent.lightPassShader.uniforms['uViewport'], viewport[0], viewport[1]);
        this._graphics.activeTexture(33984);
        this._graphics.bindTexture(3553, diffuse);
        this._graphics.uniform1i(this._parent.lightPassShader.uniforms['uSDiffuse'], 0);
        this._graphics.activeTexture(33985);
        this._graphics.bindTexture(3553, position);
        this._graphics.uniform1i(this._parent.lightPassShader.uniforms['uSPosition'], 1);
        this._graphics.activeTexture(33986);
        this._graphics.bindTexture(3553, normal);
        this._graphics.uniform1i(this._parent.lightPassShader.uniforms['uSNormal'], 2);
    },
    
    bindLightMesh: function GLSharp_Graphics__phongBinder$bindLightMesh(lightVolume) {
        /// <param name="lightVolume" type="GLSharp.Content.MeshItem">
        /// </param>
        if (this._parent.lightPassShader == null) {
            return;
        }
        this._graphics.bindBuffer(34962, lightVolume.meshBuffer);
        this._graphics.vertexAttribPointer(this._parent.lightPassShader.attributes['aVertexPosition'], 3, 5126, false, 0, lightVolume.offsetPosition * 4);
        this._graphics.bindBuffer(34963, lightVolume.indexBuffer);
    },
    
    bindLight: function GLSharp_Graphics__phongBinder$bindLight(lightPos, light, mvMatrix, pMatrix) {
        /// <param name="lightPos" type="GLSharp.Util.Vector3">
        /// </param>
        /// <param name="light" type="GLSharp.Content.LightItem">
        /// </param>
        /// <param name="mvMatrix" type="GLSharp.Util.Matrix4X4">
        /// </param>
        /// <param name="pMatrix" type="GLSharp.Util.Matrix4X4">
        /// </param>
        if (this._parent.lightPassShader == null) {
            return;
        }
        this._graphics.uniformMatrix4fv(this._parent.lightPassShader.uniforms['uMVMatrix'], false, mvMatrix.elements);
        this._graphics.uniformMatrix4fv(this._parent.lightPassShader.uniforms['uPMatrix'], false, pMatrix.elements);
        this._graphics.uniform3f(this._parent.lightPassShader.uniforms['uLightPos'], lightPos.elements[0], lightPos.elements[1], lightPos.elements[2]);
        this._graphics.uniform3f(this._parent.lightPassShader.uniforms['uLightColor'], (light.properties['color'])[0], (light.properties['color'])[1], (light.properties['color'])[2]);
        this._graphics.uniform1i(this._parent.lightPassShader.uniforms['uLightType'], light.lightType);
        this._graphics.uniform1f(this._parent.lightPassShader.uniforms['uLightIntensity'], light.properties['intensity']);
    },
    
    bindPrePostPass: function GLSharp_Graphics__phongBinder$bindPrePostPass(diffuse, position, normal, accumulation) {
        /// <param name="diffuse" type="GLSharp.Graphics.ITexture">
        /// </param>
        /// <param name="position" type="GLSharp.Graphics.ITexture">
        /// </param>
        /// <param name="normal" type="GLSharp.Graphics.ITexture">
        /// </param>
        /// <param name="accumulation" type="GLSharp.Graphics.ITexture">
        /// </param>
        if (this._parent.prePostProcessPassShader == null) {
            return;
        }
        this._graphics.useProgram(this._parent.prePostProcessPassShader.shaderProgram);
        this._graphics.bindBuffer(34962, this._vertexBuffer);
        this._graphics.vertexAttribPointer(this._parent.prePostProcessPassShader.attributes['aVertexPosition'], 3, 5126, false, 0, 0);
        this._graphics.activeTexture(33984);
        this._graphics.bindTexture(3553, diffuse);
        this._graphics.uniform1i(this._parent.prePostProcessPassShader.uniforms['uSDiffuse'], 0);
        this._graphics.activeTexture(33985);
        this._graphics.bindTexture(3553, position);
        this._graphics.uniform1i(this._parent.prePostProcessPassShader.uniforms['uSPosition'], 1);
        this._graphics.activeTexture(33986);
        this._graphics.bindTexture(3553, normal);
        this._graphics.uniform1i(this._parent.prePostProcessPassShader.uniforms['uSNormal'], 2);
        this._graphics.activeTexture(33987);
        this._graphics.bindTexture(3553, accumulation);
        this._graphics.uniform1i(this._parent.prePostProcessPassShader.uniforms['uSAccumulation'], 3);
    },
    
    bindFinalPass: function GLSharp_Graphics__phongBinder$bindFinalPass(post) {
        /// <param name="post" type="GLSharp.Graphics.ITexture">
        /// </param>
        if (this._parent.finalPassShader == null) {
            return;
        }
        this._graphics.useProgram(this._parent.finalPassShader.shaderProgram);
        this._graphics.activeTexture(33984);
        this._graphics.bindTexture(3553, post);
        this._graphics.uniform1i(this._parent.finalPassShader.uniforms['uSPost'], 0);
    }
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
    /// <field name="_renderTextureDim" type="Number" integer="true">
    /// </field>
    /// <field name="_renderViewport" type="Array" elementType="Number">
    /// </field>
    /// <field name="_diffuseGroup" type="GLSharp.Graphics.Core.RenderGroup">
    /// </field>
    /// <field name="_positionGroup" type="GLSharp.Graphics.Core.RenderGroup">
    /// </field>
    /// <field name="_normalGroup" type="GLSharp.Graphics.Core.RenderGroup">
    /// </field>
    /// <field name="_accumulationGroup" type="GLSharp.Graphics.Core.RenderGroup">
    /// </field>
    /// <field name="_postGroup" type="GLSharp.Graphics.Core.RenderGroup">
    /// </field>
    /// <field name="_depthbuffer" type="GLSharp.Graphics.IRenderBuffer">
    /// </field>
    /// <field name="_effects" type="Array">
    /// </field>
    /// <field name="_lastGroup" type="GLSharp.Graphics.Core.RenderGroup">
    /// </field>
    /// <field name="_activeTextureTarget" type="Array">
    /// </field>
    /// <field name="_shaderGroups" type="Object">
    /// </field>
    /// <field name="activeShaderGroup" type="String">
    /// </field>
    /// <field name="_lastGeometryShader" type="String">
    /// </field>
    /// <field name="_lastLightShader" type="String">
    /// </field>
    /// <field name="_lightSphereVolume" type="GLSharp.Content.MeshItem">
    /// </field>
    /// <field name="_meshLoaded" type="Boolean">
    /// </field>
    /// <field name="_cullInfo" type="GLSharp.Graphics.CullInfo">
    /// </field>
    /// <field name="_mvMatrix" type="GLSharp.Util.Matrix4X4">
    /// </field>
    /// <field name="_pMatrix" type="GLSharp.Util.Matrix4X4">
    /// </field>
    /// <field name="_nMatrix" type="GLSharp.Util.Matrix4X4">
    /// </field>
    /// <field name="_vMatrix" type="GLSharp.Util.Matrix4X4">
    /// </field>
    /// <field name="_scaleMatrix" type="GLSharp.Util.Matrix4X4">
    /// </field>
    /// <field name="_camera" type="GLSharp.Universe.Node">
    /// </field>
    /// <field name="_occluder" type="GLSharp.Graphics.IViewOccluder">
    /// </field>
    /// <field name="_world" type="GLSharp.Universe.World">
    /// </field>
    /// <field name="_library" type="GLSharp.Content.Library">
    /// </field>
    /// <field name="_opaqueMeshQueue" type="Array">
    /// </field>
    /// <field name="_transparentMeshQueue" type="Array">
    /// </field>
    /// <field name="_lightQueue" type="Object">
    /// </field>
    this._canvas = canvas;
    this._context = canvas.getContext('experimental-webgl', new GLSharp.Graphics.WebGLContextAttributes());
}
GLSharp.Graphics.WebGLGraphics.prototype = {
    _canvas: null,
    _context: null,
    _renderTextureDim: 0,
    _renderViewport: null,
    _diffuseGroup: null,
    _positionGroup: null,
    _normalGroup: null,
    _accumulationGroup: null,
    _postGroup: null,
    _depthbuffer: null,
    _effects: null,
    _lastGroup: null,
    _activeTextureTarget: null,
    _shaderGroups: null,
    activeShaderGroup: null,
    _lastGeometryShader: null,
    _lastLightShader: null,
    _lightSphereVolume: null,
    _meshLoaded: false,
    _cullInfo: null,
    _mvMatrix: null,
    _pMatrix: null,
    _nMatrix: null,
    _vMatrix: null,
    _scaleMatrix: null,
    _camera: null,
    _occluder: null,
    _world: null,
    _library: null,
    
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
    
    get_world: function GLSharp_Graphics_WebGLGraphics$get_world() {
        /// <summary>
        /// Gets and sets the world used for drawing.
        /// </summary>
        /// <value type="GLSharp.Universe.World"></value>
        return this._world;
    },
    set_world: function GLSharp_Graphics_WebGLGraphics$set_world(value) {
        /// <summary>
        /// Gets and sets the world used for drawing.
        /// </summary>
        /// <value type="GLSharp.Universe.World"></value>
        this._world = value;
        this._bindWorld(this._world);
        return value;
    },
    
    get_camera: function GLSharp_Graphics_WebGLGraphics$get_camera() {
        /// <value type="GLSharp.Universe.Node"></value>
        return this._camera;
    },
    set_camera: function GLSharp_Graphics_WebGLGraphics$set_camera(value) {
        /// <value type="GLSharp.Universe.Node"></value>
        if (value.get_components()[GLSharp.Universe.Component.cameraComponent] == null) {
            throw new Error('Camera does not have a camera component.');
        }
        this._camera = value;
        return value;
    },
    
    get_viewOccluder: function GLSharp_Graphics_WebGLGraphics$get_viewOccluder() {
        /// <value type="GLSharp.Graphics.IViewOccluder"></value>
        return this._occluder;
    },
    set_viewOccluder: function GLSharp_Graphics_WebGLGraphics$set_viewOccluder(value) {
        /// <value type="GLSharp.Graphics.IViewOccluder"></value>
        this._occluder = value;
        return value;
    },
    
    get_library: function GLSharp_Graphics_WebGLGraphics$get_library() {
        /// <summary>
        /// Gets or sets the main library.
        /// </summary>
        /// <value type="GLSharp.Content.Library"></value>
        return this._library;
    },
    set_library: function GLSharp_Graphics_WebGLGraphics$set_library(value) {
        /// <summary>
        /// Gets or sets the main library.
        /// </summary>
        /// <value type="GLSharp.Content.Library"></value>
        this._library = value;
        return value;
    },
    
    get_context: function GLSharp_Graphics_WebGLGraphics$get_context() {
        /// <summary>
        /// Gets the context used by the graphics object.
        /// </summary>
        /// <value type="GLSharp.Graphics.WebGL"></value>
        return this._context;
    },
    
    _opaqueMeshQueue: null,
    _transparentMeshQueue: null,
    _lightQueue: null,
    
    initialize: function GLSharp_Graphics_WebGLGraphics$initialize(fov, zNear, zFar) {
        /// <param name="fov" type="Number">
        /// </param>
        /// <param name="zNear" type="Number">
        /// </param>
        /// <param name="zFar" type="Number">
        /// </param>
        this._displayDebugInformation();
        var that = this;
        this._renderTextureDim = this._smallestPowerOfTwo(this._canvas.width);
        this._renderViewport = GLSharp.Core.SystemCore.environment.createFloat32ArrayFromArray([ this._renderTextureDim, this._renderTextureDim ]);
        this._shaderGroups = {};
        var phongShaderGroup = new GLSharp.Graphics.ShaderGroup();
        phongShaderGroup.name = 'phong';
        phongShaderGroup.shaderBinder = new GLSharp.Graphics._phongBinder(that.get_library(), that._context, phongShaderGroup);
        GLSharp.Core.SystemCore.resourceManager.getResource('/Data/Shader/phong_pass_geom.shader', null).resourceChanged.subscribe(function(sender, args) {
            var resource = sender;
            if (resource.get_finished()) {
                phongShaderGroup.geometryPassShader = resource.get_data();
            }
        }, null);
        GLSharp.Core.SystemCore.resourceManager.getResource('/Data/Shader/phong_pass_prepost.shader', null).resourceChanged.subscribe(function(sender, args) {
            var resource = sender;
            if (resource.get_finished()) {
                phongShaderGroup.prePostProcessPassShader = resource.get_data();
            }
        }, null);
        GLSharp.Core.SystemCore.resourceManager.getResource('/Data/Shader/phong_pass_light.shader', null).resourceChanged.subscribe(function(sender, args) {
            var resource = sender;
            if (resource.get_finished()) {
                phongShaderGroup.lightPassShader = resource.get_data();
            }
        }, null);
        GLSharp.Core.SystemCore.resourceManager.getResource('/Data/Shader/phong_pass_final.shader', null).resourceChanged.subscribe(function(sender, args) {
            var resource = sender;
            if (resource.get_finished()) {
                phongShaderGroup.finalPassShader = resource.get_data();
            }
        }, null);
        this.addShaderGroup(phongShaderGroup);
        this.activeShaderGroup = 'phong';
        this.get_library().loadLibrary('/Data/JSON/core.json').finished.subscribe(ss.Delegate.create(this, function(sender, args) {
            var sphereHandle = new GLSharp.Content.Handle();
            sphereHandle.collection = 'core';
            sphereHandle.id = 'point_light_sphere-lib';
            that._lightSphereVolume = (this.get_library().getResource(sphereHandle));
        }), true);
        GLSharp.Core.SystemCore.logger.log(this._context.getExtension('OES_texture_float').toString());
        this._setupFrameBuffers();
        this._opaqueMeshQueue = [];
        this._transparentMeshQueue = [];
        this._lightQueue = {};
        this._camera = new GLSharp.Universe.Node();
        this._camera.addComponent(new GLSharp.Universe.CameraComponent());
        this._scaleMatrix = new GLSharp.Util.Matrix4X4(null);
        this._mvMatrix = new GLSharp.Util.Matrix4X4(null);
        this._vMatrix = new GLSharp.Util.Matrix4X4(null);
        this._nMatrix = new GLSharp.Util.Matrix4X4(null);
        this._pMatrix = GLSharp.Util.Matrix4X4.makePerspective(fov, 800 / 600, zNear, zFar);
        this._context.viewport(0, 0, this._renderTextureDim, this._renderTextureDim);
        this._context.enableVertexAttribArray(0);
        this._context.enableVertexAttribArray(1);
        this._context.enableVertexAttribArray(2);
        this._context.enable(2929);
        this._context.enable(2884);
        this._context.blendFunc(770, 1);
        this._cullInfo = new GLSharp.Graphics.CullInfo();
        this._effects = [];
        this._activeTextureTarget = [];
        this._activeTextureTarget[0] = 33984;
        this._activeTextureTarget[1] = 33985;
        this._activeTextureTarget[2] = 33986;
    },
    
    _setupFrameBuffers: function GLSharp_Graphics_WebGLGraphics$_setupFrameBuffers() {
        this._depthbuffer = this._context.createRenderbuffer();
        this._context.bindRenderbuffer(36161, this._depthbuffer);
        this._context.renderbufferStorage(36161, 33189, this._renderTextureDim, this._renderTextureDim);
        this._diffuseGroup = this.createRenderGroup(true);
        this._normalGroup = this.createRenderGroup(true);
        this._positionGroup = this.createRenderGroup(true);
        this._accumulationGroup = this.createRenderGroup(true);
        this._postGroup = this.createRenderGroup(true);
    },
    
    _displayDebugInformation: function GLSharp_Graphics_WebGLGraphics$_displayDebugInformation() {
        GLSharp.Core.SystemCore.logger.log('Supported extensions : ' + this.get_context().getSupportedExtensions());
    },
    
    _debugLog: function GLSharp_Graphics_WebGLGraphics$_debugLog(message) {
        /// <param name="message" type="String">
        /// </param>
        GLSharp.Core.SystemCore.logger.log(message);
    },
    
    allocateTexture: function GLSharp_Graphics_WebGLGraphics$allocateTexture(texture) {
        /// <param name="texture" type="GLSharp.Content.TextureItem">
        /// </param>
        /// <returns type="Boolean"></returns>
        if (texture.image == null) {
            return false;
        }
        texture.texture = this.createTexture(texture.image);
        return true;
    },
    
    freeTexture: function GLSharp_Graphics_WebGLGraphics$freeTexture(texture) {
        /// <param name="texture" type="GLSharp.Content.TextureItem">
        /// </param>
        /// <returns type="Boolean"></returns>
        if (texture.texture == null) {
            return false;
        }
        this._context.deleteTexture(texture.texture);
        return true;
    },
    
    allocateMesh: function GLSharp_Graphics_WebGLGraphics$allocateMesh(mesh) {
        /// <param name="mesh" type="GLSharp.Content.MeshItem">
        /// </param>
        /// <returns type="Boolean"></returns>
        var meshBuffer = this._context.createBuffer();
        this._context.bindBuffer(34962, meshBuffer);
        this._context.bufferData(34962, mesh.mesh, 35044);
        var indexBuffer = this._context.createBuffer();
        this._context.bindBuffer(34963, indexBuffer);
        this._context.bufferData(34963, mesh.indexes, 35044);
        mesh.indexBuffer = indexBuffer;
        mesh.meshBuffer = meshBuffer;
        return true;
    },
    
    dealocateMesh: function GLSharp_Graphics_WebGLGraphics$dealocateMesh(mesh) {
        /// <param name="mesh" type="GLSharp.Content.MeshItem">
        /// </param>
        /// <returns type="Boolean"></returns>
        this._context.deleteBuffer(mesh.indexBuffer);
        this._context.deleteBuffer(mesh.meshBuffer);
        return true;
    },
    
    _createDepthTexture: function GLSharp_Graphics_WebGLGraphics$_createDepthTexture() {
        /// <returns type="GLSharp.Graphics.ITexture"></returns>
        var ret = this._context.createTexture();
        this._context.bindTexture(3553, ret);
        this._context.texParameteri(3553, 10241, 9728);
        this._context.texParameteri(3553, 10240, 9728);
        this._context.texParameteri(3553, 10242, 33071);
        this._context.texParameteri(3553, 10243, 33071);
        this._context.texImage2D(3553, 0, 33189, this._renderTextureDim, this._renderTextureDim, 0, 6402, 5121, null);
        return ret;
    },
    
    createRenderTexture: function GLSharp_Graphics_WebGLGraphics$createRenderTexture() {
        /// <returns type="GLSharp.Graphics.ITexture"></returns>
        var ret = this._context.createTexture();
        this._context.bindTexture(3553, ret);
        this._context.texParameteri(3553, 10241, 9728);
        this._context.texParameteri(3553, 10240, 9728);
        this._context.texParameteri(3553, 10242, 33071);
        this._context.texParameteri(3553, 10243, 33071);
        this._context.texImage2D(3553, 0, 6408, this._renderTextureDim, this._renderTextureDim, 0, 6408, 5126, null);
        return ret;
    },
    
    _smallestPowerOfTwo: function GLSharp_Graphics_WebGLGraphics$_smallestPowerOfTwo(el) {
        /// <param name="el" type="Number">
        /// </param>
        /// <returns type="Number" integer="true"></returns>
        var ret = 2;
        while (ret < el) {
            ret *= 2;
        }
        return ret;
    },
    
    _updateCullInfo: function GLSharp_Graphics_WebGLGraphics$_updateCullInfo(mv) {
        /// <param name="mv" type="GLSharp.Util.Matrix4X4">
        /// </param>
        if (this._cullInfo.modelView == null) {
            this._cullInfo.leftClip[0] = this._pMatrix.elements[0] + this._pMatrix.elements[3];
            this._cullInfo.leftClip[1] = this._pMatrix.elements[4] + this._pMatrix.elements[7];
            this._cullInfo.leftClip[2] = this._pMatrix.elements[8] + this._pMatrix.elements[11];
            this._cullInfo.leftClip[3] = this._pMatrix.elements[12] + this._pMatrix.elements[15];
            this._cullInfo.rightClip[0] = -this._pMatrix.elements[0] + this._pMatrix.elements[3];
            this._cullInfo.rightClip[1] = -this._pMatrix.elements[4] + this._pMatrix.elements[7];
            this._cullInfo.rightClip[2] = -this._pMatrix.elements[8] + this._pMatrix.elements[11];
            this._cullInfo.rightClip[3] = -this._pMatrix.elements[12] + this._pMatrix.elements[15];
            this._cullInfo.botClip[0] = this._pMatrix.elements[1] + this._pMatrix.elements[3];
            this._cullInfo.botClip[1] = this._pMatrix.elements[5] + this._pMatrix.elements[7];
            this._cullInfo.botClip[2] = this._pMatrix.elements[9] + this._pMatrix.elements[11];
            this._cullInfo.botClip[3] = this._pMatrix.elements[13] + this._pMatrix.elements[15];
            this._cullInfo.topClip[0] = -this._pMatrix.elements[1] + this._pMatrix.elements[3];
            this._cullInfo.topClip[1] = -this._pMatrix.elements[5] + this._pMatrix.elements[7];
            this._cullInfo.topClip[2] = -this._pMatrix.elements[9] + this._pMatrix.elements[11];
            this._cullInfo.topClip[3] = -this._pMatrix.elements[13] + this._pMatrix.elements[15];
            this._cullInfo.nearClip[0] = this._pMatrix.elements[2] + this._pMatrix.elements[3];
            this._cullInfo.nearClip[1] = this._pMatrix.elements[6] + this._pMatrix.elements[7];
            this._cullInfo.nearClip[2] = this._pMatrix.elements[10] + this._pMatrix.elements[11];
            this._cullInfo.nearClip[3] = this._pMatrix.elements[14] + this._pMatrix.elements[15];
            this._cullInfo.farClip[0] = -this._pMatrix.elements[2] + this._pMatrix.elements[3];
            this._cullInfo.farClip[1] = -this._pMatrix.elements[6] + this._pMatrix.elements[7];
            this._cullInfo.farClip[2] = -this._pMatrix.elements[10] + this._pMatrix.elements[11];
            this._cullInfo.farClip[3] = -this._pMatrix.elements[14] + this._pMatrix.elements[15];
        }
        this._cullInfo.modelView = mv.elements;
    },
    
    createTexture: function GLSharp_Graphics_WebGLGraphics$createTexture(image) {
        /// <param name="image" type="GLSharp.Data.IImageResource">
        /// </param>
        /// <returns type="GLSharp.Graphics.ITexture"></returns>
        var ret = this._context.createTexture();
        this._context.bindTexture(3553, ret);
        this._context.pixelStorei(37440, 1);
        this._context.texImage2D(3553, 0, 6408, 6408, 5121, image);
        this._context.texParameteri(3553, 10240, 9728);
        this._context.texParameteri(3553, 10241, 9728);
        this._context.bindTexture(3553, null);
        return ret;
    },
    
    createRenderGroup: function GLSharp_Graphics_WebGLGraphics$createRenderGroup(commonDepth) {
        /// <param name="commonDepth" type="Boolean">
        /// </param>
        /// <returns type="GLSharp.Graphics.Core.RenderGroup"></returns>
        var ret = new GLSharp.Graphics.Core.RenderGroup();
        ret.renderTexture = this.createRenderTexture();
        if (commonDepth) {
            ret.depthRenderBuffer = this._depthbuffer;
        }
        else {
            ret.depthRenderBuffer = null;
        }
        ret.frameBuffer = this._context.createFramebuffer();
        this._context.bindFramebuffer(36160, ret.frameBuffer);
        this._context.bindRenderbuffer(36161, ret.depthRenderBuffer);
        this._context.framebufferRenderbuffer(36160, 36096, 36161, ret.depthRenderBuffer);
        this._context.framebufferTexture2D(36160, 36064, 3553, ret.renderTexture, 0);
        return ret;
    },
    
    cleanRenderGroup: function GLSharp_Graphics_WebGLGraphics$cleanRenderGroup(old) {
        /// <param name="old" type="GLSharp.Graphics.Core.RenderGroup">
        /// </param>
        if (old == null) {
            return;
        }
        this._context.deleteFramebuffer(old.frameBuffer);
        this._context.deleteTexture(old.renderTexture);
        if (old.depthRenderBuffer !== this._depthbuffer) {
            this._context.deleteRenderbuffer(old.depthRenderBuffer);
        }
    },
    
    switchRenderGroup: function GLSharp_Graphics_WebGLGraphics$switchRenderGroup(group) {
        /// <param name="group" type="GLSharp.Graphics.Core.RenderGroup">
        /// </param>
        this._context.bindFramebuffer(36160, group.frameBuffer);
    },
    
    addShaderGroup: function GLSharp_Graphics_WebGLGraphics$addShaderGroup(shaderGroup) {
        /// <param name="shaderGroup" type="GLSharp.Graphics.ShaderGroup">
        /// </param>
        this._shaderGroups[shaderGroup.name] = shaderGroup;
    },
    
    queuePostProcess: function GLSharp_Graphics_WebGLGraphics$queuePostProcess(effect) {
        /// <param name="effect" type="GLSharp.Graphics.Effects.IPostProcessEffect">
        /// </param>
        var index = 0;
        if ((index = this._effects.indexOf(effect)) !== -1) {
            this._effects.removeAt(index);
        }
        this._effects.add(effect);
        effect.init(this._diffuseGroup.renderTexture, this._normalGroup.renderTexture, this._positionGroup.renderTexture, this._accumulationGroup.renderTexture);
        effect.reset(this);
    },
    
    renderPostProcess: function GLSharp_Graphics_WebGLGraphics$renderPostProcess() {
        this._context.drawArrays(5, 0, 4);
    },
    
    render: function GLSharp_Graphics_WebGLGraphics$render() {
        this._lastGeometryShader = null;
        this._lastLightShader = null;
        this._camera.get_world().copy(this._vMatrix);
        this._vMatrix.inverse();
        this._context.clearColor(0, 0, 0, 0);
        this.switchRenderGroup(this._diffuseGroup);
        this._context.clear(16384);
        this.switchRenderGroup(this._positionGroup);
        this._context.clear(16384);
        this.switchRenderGroup(this._normalGroup);
        this._context.clear(16384 | 256);
        this.switchRenderGroup(this._accumulationGroup);
        this._context.clear(16384);
        this._context.bindFramebuffer(36160, null);
        this._context.clear(16384 | 256);
        this._context.enable(2929);
        this._context.disable(3042);
        this._context.cullFace(1029);
        this._opaqueGeometryPass();
        this._context.disable(2929);
        this._context.enable(3042);
        this.switchRenderGroup(this._accumulationGroup);
        this._context.cullFace(1028);
        this._lightPass();
        this._context.disable(3042);
        this._context.cullFace(1029);
        this._context.bindFramebuffer(36160, this._postGroup.frameBuffer);
        this._prePostPass();
        this._postProcessingPass();
        this._context.bindFramebuffer(36160, null);
        this._finalPass();
    },
    
    clear: function GLSharp_Graphics_WebGLGraphics$clear(color, depth) {
        /// <param name="color" type="Boolean">
        /// </param>
        /// <param name="depth" type="Boolean">
        /// </param>
        if (color && depth) {
            this._context.clear(16384 | 256);
        }
        else if (color) {
            this._context.clear(16384);
        }
        else {
            this._context.clear(256);
        }
    },
    
    setBlend: function GLSharp_Graphics_WebGLGraphics$setBlend(enable) {
        /// <param name="enable" type="Boolean">
        /// </param>
        if (enable) {
            this._context.enable(3042);
        }
        else {
            this._context.disable(3042);
        }
    },
    
    _opaqueGeometryPass: function GLSharp_Graphics_WebGLGraphics$_opaqueGeometryPass() {
        var that = this;
        var shaderBinder = that._shaderGroups[that.activeShaderGroup].shaderBinder;
        if (shaderBinder == null) {
            return;
        }
        shaderBinder.bindGeometryPass(this._pMatrix);
        this._opaqueMeshQueue.forEach(ss.Delegate.create(this, function(value, index, collection) {
            var mesh = that.get_library().getResourceById(index);
            this._meshLoaded = false;
            value.forEach(ss.Delegate.create(this, function(node) {
                this._vMatrix.multiplyM2(node.get_world(), this._mvMatrix);
                this._mvMatrix.inverse2(this._nMatrix);
                this._nMatrix.transpose();
                this._updateCullInfo(this._mvMatrix);
                if (this._occluder != null && !this._occluder.test(this._cullInfo, node, mesh)) {
                    return;
                }
                if (!this._meshLoaded) {
                    shaderBinder.bindGeometryMesh(mesh);
                    this._meshLoaded = true;
                }
                that._renderOpaqueMesh(node, this._mvMatrix, this._nMatrix, mesh.indexes.length, shaderBinder);
            }));
        }));
    },
    
    _renderOpaqueMesh: function GLSharp_Graphics_WebGLGraphics$_renderOpaqueMesh(node, mv, nv, vertexLength, binder) {
        /// <param name="node" type="GLSharp.Universe.Node">
        /// </param>
        /// <param name="mv" type="GLSharp.Util.Matrix4X4">
        /// </param>
        /// <param name="nv" type="GLSharp.Util.Matrix4X4">
        /// </param>
        /// <param name="vertexLength" type="Number" integer="true">
        /// </param>
        /// <param name="binder" type="GLSharp.Graphics.IShaderBinder">
        /// </param>
        var materialComponent = node.get_components()[GLSharp.Universe.Component.materialComponent];
        if (materialComponent == null) {
            this._debugLog('Cannot render node [' + node.id + '] : material not found.');
            return;
        }
        var material = this.get_library().getResource(materialComponent.materialHandle);
        binder.bindGeometryMaterial(material);
        binder.bindGeometryInstance(mv, nv);
        this.switchRenderGroup(this._diffuseGroup);
        this._context.depthFunc(515);
        binder.bindGeometryPassNum(0);
        this._context.drawElements(4, vertexLength, 5123, 0);
        this.switchRenderGroup(this._positionGroup);
        this._context.depthFunc(514);
        binder.bindGeometryPassNum(1);
        this._context.drawElements(4, vertexLength, 5123, 0);
        this.switchRenderGroup(this._normalGroup);
        binder.bindGeometryPassNum(2);
        this._context.drawElements(4, vertexLength, 5123, 0);
    },
    
    _lightPass: function GLSharp_Graphics_WebGLGraphics$_lightPass() {
        var lightShader = this._shaderGroups[this.activeShaderGroup];
        if (lightShader == null) {
            return;
        }
        if (this._lastLightShader !== this.activeShaderGroup) {
            this._lastLightShader = this.activeShaderGroup;
            lightShader.shaderBinder.bindLightPass(this._diffuseGroup.renderTexture, this._positionGroup.renderTexture, this._normalGroup.renderTexture, this._renderViewport);
        }
        var that = this;
        if (this._lightSphereVolume != null) {
            lightShader.shaderBinder.bindLightMesh(this._lightSphereVolume);
            if (this._lightQueue[GLSharp.Universe.LightComponent.typePoint] != null) {
                this._lightQueue[GLSharp.Universe.LightComponent.typePoint].forEach(ss.Delegate.create(this, function(value) {
                    that._renderLight(lightShader, value.get_components()[GLSharp.Universe.Component.lightComponent], this._lightSphereVolume);
                }));
            }
        }
    },
    
    _renderLight: function GLSharp_Graphics_WebGLGraphics$_renderLight(lightShader, component, lightVolume) {
        /// <param name="lightShader" type="GLSharp.Graphics.ShaderGroup">
        /// </param>
        /// <param name="component" type="GLSharp.Universe.LightComponent">
        /// </param>
        /// <param name="lightVolume" type="GLSharp.Content.MeshItem">
        /// </param>
        var light = this._library.getResource(component.lightHandle);
        if (light == null) {
            return;
        }
        var intensity = light.properties['intensity'];
        this._scaleMatrix.elements[0] = intensity * 2;
        this._scaleMatrix.elements[5] = intensity * 2;
        this._scaleMatrix.elements[10] = intensity * 2;
        this._scaleMatrix.elements[15] = 1;
        this._vMatrix.multiplyM2(component.parent.get_world(), this._mvMatrix);
        this._mvMatrix.multiplyM2(this._scaleMatrix, this._mvMatrix);
        var pos = this._mvMatrix.transformV(new GLSharp.Util.Vector3([ 0, 0, 0 ]));
        this._updateCullInfo(this._mvMatrix);
        if (this._occluder != null && !this._occluder.test(this._cullInfo, null, lightVolume)) {
            return;
        }
        lightShader.shaderBinder.bindLight(pos, light, this._mvMatrix, this._pMatrix);
        this._context.drawElements(4, this._lightSphereVolume.indexes.length, 5123, 0);
    },
    
    _prePostPass: function GLSharp_Graphics_WebGLGraphics$_prePostPass() {
        this._context.depthFunc(515);
        if (this._shaderGroups[this.activeShaderGroup] == null) {
            return;
        }
        this._shaderGroups[this.activeShaderGroup].shaderBinder.bindPrePostPass(this._diffuseGroup.renderTexture, this._positionGroup.renderTexture, this._normalGroup.renderTexture, this._accumulationGroup.renderTexture);
        this._context.drawArrays(5, 0, 4);
    },
    
    _postProcessingPass: function GLSharp_Graphics_WebGLGraphics$_postProcessingPass() {
        var that = this;
        this._lastGroup = this._postGroup;
        this._effects.forEach(function(value) {
            that._lastGroup = value.render(that._lastGroup);
        });
    },
    
    _finalPass: function GLSharp_Graphics_WebGLGraphics$_finalPass() {
        if (this._shaderGroups[this.activeShaderGroup] == null) {
            return;
        }
        this._shaderGroups[this.activeShaderGroup].shaderBinder.bindFinalPass(this._lastGroup.renderTexture);
        this._context.drawArrays(5, 0, 4);
    },
    
    bindShader: function GLSharp_Graphics_WebGLGraphics$bindShader(shader) {
        /// <param name="shader" type="GLSharp.Graphics.CompiledShader">
        /// </param>
        this._context.useProgram(shader.shaderProgram);
    },
    
    bindTexture: function GLSharp_Graphics_WebGLGraphics$bindTexture(uniform, texture, index) {
        /// <param name="uniform" type="GLSharp.Graphics.IUniformLocation">
        /// </param>
        /// <param name="texture" type="GLSharp.Graphics.ITexture">
        /// </param>
        /// <param name="index" type="Number" integer="true">
        /// </param>
        this._context.activeTexture(this._activeTextureTarget[index]);
        this._context.bindTexture(3553, texture);
        this._context.uniform1i(uniform, index);
    },
    
    _bindWorld: function GLSharp_Graphics_WebGLGraphics$_bindWorld(world) {
        /// <param name="world" type="GLSharp.Universe.World">
        /// </param>
        this._world = world;
        world.nodeAdded.subscribe(ss.Delegate.create(this, this._worldNodeAdded), true);
        world.nodeRemoved.subscribe(ss.Delegate.create(this, this._worldNodeRemoved), true);
    },
    
    _worldNodeRemoved: function GLSharp_Graphics_WebGLGraphics$_worldNodeRemoved(sender, args) {
        /// <param name="sender" type="Object">
        /// </param>
        /// <param name="args" type="Object">
        /// </param>
        var node = Type.safeCast(args, GLSharp.Universe.Node);
        node.componentAdded.subscribe(ss.Delegate.create(this, this._nodeComponentAdded), true);
        node.componentRemoved.subscribe(ss.Delegate.create(this, this._nodeComponentRemoved), true);
        var $dict1 = node.get_components();
        for (var $key2 in $dict1) {
            var component = { key: $key2, value: $dict1[$key2] };
            this._nodeComponentRemoved(node, component.value);
        }
        var $dict3 = node.children;
        for (var $key4 in $dict3) {
            var child = { key: $key4, value: $dict3[$key4] };
            this._worldNodeRemoved(sender, child.value);
        }
    },
    
    _worldNodeAdded: function GLSharp_Graphics_WebGLGraphics$_worldNodeAdded(sender, args) {
        /// <param name="sender" type="Object">
        /// </param>
        /// <param name="args" type="Object">
        /// </param>
        var node = args;
        node.componentAdded.subscribe(ss.Delegate.create(this, this._nodeComponentAdded), true);
        node.componentRemoved.subscribe(ss.Delegate.create(this, this._nodeComponentRemoved), true);
        var $dict1 = node.get_components();
        for (var $key2 in $dict1) {
            var comp = { key: $key2, value: $dict1[$key2] };
            this._nodeComponentAdded(node, comp.value);
        }
        var $dict3 = node.children;
        for (var $key4 in $dict3) {
            var child = { key: $key4, value: $dict3[$key4] };
            this._worldNodeAdded(sender, child.value);
        }
    },
    
    _nodeComponentRemoved: function GLSharp_Graphics_WebGLGraphics$_nodeComponentRemoved(sender, args) {
        /// <param name="sender" type="Object">
        /// </param>
        /// <param name="args" type="Object">
        /// </param>
        this._popComponent(args);
    },
    
    _nodeComponentAdded: function GLSharp_Graphics_WebGLGraphics$_nodeComponentAdded(sender, args) {
        /// <param name="sender" type="Object">
        /// </param>
        /// <param name="args" type="Object">
        /// </param>
        this._pushComponent(args);
    },
    
    _pushComponent: function GLSharp_Graphics_WebGLGraphics$_pushComponent(component) {
        /// <param name="component" type="GLSharp.Universe.Component">
        /// </param>
        if (component.type === GLSharp.Universe.Component.meshComponent) {
            this._pushMeshComponent(component);
        }
        else if ((component.type === GLSharp.Universe.Component.lightComponent)) {
            this._pushLightComponent(component);
        }
    },
    
    _pushLightComponent: function GLSharp_Graphics_WebGLGraphics$_pushLightComponent(component) {
        /// <param name="component" type="GLSharp.Universe.LightComponent">
        /// </param>
        var light = this._library.getResource(component.lightHandle);
        if (light == null) {
            if (this._lightQueue[GLSharp.Universe.LightComponent.typePoint] == null) {
                this._lightQueue[GLSharp.Universe.LightComponent.typePoint] = [];
            }
            this._lightQueue[GLSharp.Universe.LightComponent.typePoint].add(component.parent);
        }
        else {
            if (this._lightQueue[light.lightType] == null) {
                this._lightQueue[light.lightType] = [];
            }
            this._lightQueue[light.lightType].add(component.parent);
        }
    },
    
    _pushMeshComponent: function GLSharp_Graphics_WebGLGraphics$_pushMeshComponent(component) {
        /// <param name="component" type="GLSharp.Universe.MeshComponent">
        /// </param>
        var mesh = this._library.getResource(component.meshHandle);
        if (mesh == null) {
            GLSharp.Core.SystemCore.log('Mesh does not exists : ' + component.id);
            return;
        }
        if (this._opaqueMeshQueue[mesh.itemId] == null) {
            this._opaqueMeshQueue[mesh.itemId] = [];
        }
        this._opaqueMeshQueue[mesh.itemId].add(component.parent);
    },
    
    _popComponent: function GLSharp_Graphics_WebGLGraphics$_popComponent(component) {
        /// <param name="component" type="GLSharp.Universe.Component">
        /// </param>
        if (component.type === GLSharp.Universe.Component.meshComponent) {
            this._popMeshComponent(component);
        }
        else if (component.type === GLSharp.Universe.Component.lightComponent) {
            this._popLightComponent(component);
        }
    },
    
    _popMeshComponent: function GLSharp_Graphics_WebGLGraphics$_popMeshComponent(component) {
        /// <param name="component" type="GLSharp.Universe.MeshComponent">
        /// </param>
        var mesh = this._library.getResource(component.meshHandle);
        if (mesh == null) {
            GLSharp.Core.SystemCore.log('Mesh does not exists : ' + component.id);
            return;
        }
        this._opaqueMeshQueue[mesh.itemId].remove(component.parent);
        if (!this._opaqueMeshQueue[mesh.itemId].length) {
            this._opaqueMeshQueue.removeAt(mesh.itemId);
        }
    },
    
    _popLightComponent: function GLSharp_Graphics_WebGLGraphics$_popLightComponent(component) {
        /// <param name="component" type="GLSharp.Universe.LightComponent">
        /// </param>
        var light = this._library.getResource(component.lightHandle);
        if (light == null) {
            if (this._lightQueue[GLSharp.Universe.LightComponent.typePoint] == null) {
                return;
            }
            this._lightQueue[GLSharp.Universe.LightComponent.typePoint].remove(component.parent);
        }
        else {
            if (this._lightQueue[light.lightType] == null) {
                return;
            }
            this._lightQueue[light.lightType].remove(component.parent);
        }
    }
}


Type.registerNamespace('App');

////////////////////////////////////////////////////////////////////////////////
// App.App

App.App = function App_App() {
    /// <field name="_engine" type="GLSharp.Engine">
    /// </field>
    /// <field name="_graphics" type="GLSharp.Graphics.WebGLGraphics">
    /// </field>
}
App.App.prototype = {
    _engine: null,
    _graphics: null,
    
    init: function App_App$init() {
        var canvasElem = document.getElementById('mainCanvas');
        if (canvasElem == null) {
            throw new Error('No canvas element found!');
        }
        this._engine = new GLSharp.Engine();
        this._graphics = new GLSharp.Graphics.WebGLGraphics(canvasElem);
        this._engine.set_graphics(this._graphics);
        this._engine.set_activeGame(new GLSharp.Demo());
        this._engine.set_library(new GLSharp.Content.Library());
        this._graphics.set_library(this._engine.get_library());
        this._engine.set_world(new GLSharp.Universe.World());
        this._graphics.set_world(this._engine.get_world());
        this._engine.get_library().addConverter(new GLSharp.Content.LightConverter());
        this._engine.get_library().addConverter(new GLSharp.Content.MeshConverter(this._graphics));
        this._engine.get_library().addConverter(new GLSharp.Content.NodeConverter());
        this._engine.get_library().addConverter(new GLSharp.Content.MaterialConverter());
        this._engine.get_library().addConverter(new GLSharp.Content.TextureConverter(this._graphics));
        this._initEnvironment(canvasElem);
        this._engine.run();
        var c = new GLSharp.Universe.CollisionComponent();
    },
    
    _initEnvironment: function App_App$_initEnvironment(canvas) {
        /// <param name="canvas" type="Object" domElement="true">
        /// </param>
        GLSharp.Core.SystemCore.environment = new Environment();
        var resourceManager = new GLSharp.Data.ResourceManager();
        resourceManager.addLoader(new GLSharp.Data.ImageLoader());
        resourceManager.addLoader(new GLSharp.Data.JsonLoader());
        resourceManager.addLoader(new GLSharp.Data.AudioLoader());
        resourceManager.addLoader(new GLSharp.Data.ShaderLoader((this._engine.get_graphics()).get_context()));
        GLSharp.Core.SystemCore.resourceManager = resourceManager;
        GLSharp.Core.SystemCore.logger = new JsLoggingProvider();
        GLSharp.Core.SystemCore.timer = new GLSharp.Core.Timer();
        GLSharp.Core.SystemCore.input = new GLSharp.Core.JsInputProvider();
        (GLSharp.Core.SystemCore.input).initialize(canvas, 800, 600);
    }
}


GLSharp.Core.JsInputProvider.registerClass('GLSharp.Core.JsInputProvider', null, GLSharp.Core.IInputProvider);
GLSharp.Core.Timer.registerClass('GLSharp.Core.Timer', null, GLSharp.Core.ITimer);
GLSharp.Data.AudioLoader.registerClass('GLSharp.Data.AudioLoader', null, GLSharp.Data.IResourceLoader);
GLSharp.Data.ImageLoader.registerClass('GLSharp.Data.ImageLoader', null, GLSharp.Data.IResourceLoader);
GLSharp.Data.JsonLoader.registerClass('GLSharp.Data.JsonLoader', null, GLSharp.Data.IResourceLoader);
GLSharp.Data.ShaderLoader.registerClass('GLSharp.Data.ShaderLoader', null, GLSharp.Data.IResourceLoader);
GLSharp.Data.ResourceManager.registerClass('GLSharp.Data.ResourceManager', null, GLSharp.Data.IResourceManager);
GLSharp.Graphics.WebGLContextAttributes.registerClass('GLSharp.Graphics.WebGLContextAttributes');
GLSharp.Graphics.WebGLE.registerClass('GLSharp.Graphics.WebGLE');
GLSharp.Graphics._phongBinder.registerClass('GLSharp.Graphics._phongBinder', null, GLSharp.Graphics.IShaderBinder);
GLSharp.Graphics.WebGLGraphics.registerClass('GLSharp.Graphics.WebGLGraphics', null, GLSharp.Graphics.IGraphics);
App.App.registerClass('App.App');
GLSharp.Graphics.WebGLE.depthBufferBit = 256;
GLSharp.Graphics.WebGLE.stencilBufferBit = 1024;
GLSharp.Graphics.WebGLE.colorBufferBit = 16384;
GLSharp.Graphics.WebGLE.points = 0;
GLSharp.Graphics.WebGLE.lines = 1;
GLSharp.Graphics.WebGLE.lineLoop = 2;
GLSharp.Graphics.WebGLE.lineStrip = 3;
GLSharp.Graphics.WebGLE.triangles = 4;
GLSharp.Graphics.WebGLE.triangleStrip = 5;
GLSharp.Graphics.WebGLE.triangleFan = 6;
GLSharp.Graphics.WebGLE.zero = 0;
GLSharp.Graphics.WebGLE.one = 1;
GLSharp.Graphics.WebGLE.srcColor = 768;
GLSharp.Graphics.WebGLE.oneMinusSrcColor = 769;
GLSharp.Graphics.WebGLE.srcAlpha = 770;
GLSharp.Graphics.WebGLE.oneMinusSrcAlpha = 771;
GLSharp.Graphics.WebGLE.dstAlpha = 772;
GLSharp.Graphics.WebGLE.oneMinusDstAlpha = 773;
GLSharp.Graphics.WebGLE.dstColor = 774;
GLSharp.Graphics.WebGLE.oneMinusDstColor = 775;
GLSharp.Graphics.WebGLE.srcAlphaSaturate = 776;
GLSharp.Graphics.WebGLE.funcAdd = 32774;
GLSharp.Graphics.WebGLE.blendEquationRgb = 32777;
GLSharp.Graphics.WebGLE.blendEquationAlpha = 34877;
GLSharp.Graphics.WebGLE.funcSubtract = 32778;
GLSharp.Graphics.WebGLE.funcReverseSubtract = 32779;
GLSharp.Graphics.WebGLE.blendDstRgb = 32968;
GLSharp.Graphics.WebGLE.blendSrcRgb = 32969;
GLSharp.Graphics.WebGLE.blendDstAlpha = 32970;
GLSharp.Graphics.WebGLE.blendSrcAlpha = 32971;
GLSharp.Graphics.WebGLE.constantantColor = 32769;
GLSharp.Graphics.WebGLE.oneMinusConstantColor = 32770;
GLSharp.Graphics.WebGLE.constantAlpha = 32771;
GLSharp.Graphics.WebGLE.oneMinusConstantAlpha = 32772;
GLSharp.Graphics.WebGLE.blendColor = 32773;
GLSharp.Graphics.WebGLE.arrayBuffer = 34962;
GLSharp.Graphics.WebGLE.elementArrayBuffer = 34963;
GLSharp.Graphics.WebGLE.arrayBufferBinding = 34964;
GLSharp.Graphics.WebGLE.elementArrayBufferBinding = 34965;
GLSharp.Graphics.WebGLE.streamDraw = 35040;
GLSharp.Graphics.WebGLE.staticDraw = 35044;
GLSharp.Graphics.WebGLE.dynamicDraw = 35048;
GLSharp.Graphics.WebGLE.bufferSize = 34660;
GLSharp.Graphics.WebGLE.bufferUsage = 34661;
GLSharp.Graphics.WebGLE.currentVertexAttribute = 34342;
GLSharp.Graphics.WebGLE.front = 1028;
GLSharp.Graphics.WebGLE.back = 1029;
GLSharp.Graphics.WebGLE.frontAndBack = 1032;
GLSharp.Graphics.WebGLE.cullFace = 2884;
GLSharp.Graphics.WebGLE.blend = 3042;
GLSharp.Graphics.WebGLE.dither = 3024;
GLSharp.Graphics.WebGLE.stencilTest = 2960;
GLSharp.Graphics.WebGLE.depthTest = 2929;
GLSharp.Graphics.WebGLE.scissorTest = 3089;
GLSharp.Graphics.WebGLE.polygonOffsetFill = 32823;
GLSharp.Graphics.WebGLE.sampleAlphaToCoverage = 32926;
GLSharp.Graphics.WebGLE.sampleCoverage = 32928;
GLSharp.Graphics.WebGLE.noError = 0;
GLSharp.Graphics.WebGLE.invalidEnum = 1280;
GLSharp.Graphics.WebGLE.invalidValue = 1281;
GLSharp.Graphics.WebGLE.invalidOperation = 1282;
GLSharp.Graphics.WebGLE.outOfMemory = 1285;
GLSharp.Graphics.WebGLE.cw = 2304;
GLSharp.Graphics.WebGLE.ccw = 2305;
GLSharp.Graphics.WebGLE.lineWidth = 2849;
GLSharp.Graphics.WebGLE.aliasedPointSizeRange = 33901;
GLSharp.Graphics.WebGLE.aliasedLineWidthRange = 33902;
GLSharp.Graphics.WebGLE.cullFaceMode = 2885;
GLSharp.Graphics.WebGLE.frontFace = 2886;
GLSharp.Graphics.WebGLE.depthRange = 2928;
GLSharp.Graphics.WebGLE.depthWritemask = 2930;
GLSharp.Graphics.WebGLE.depthClearValue = 2931;
GLSharp.Graphics.WebGLE.depthFunc = 2932;
GLSharp.Graphics.WebGLE.stencilClearValue = 2961;
GLSharp.Graphics.WebGLE.stencilFunc = 2962;
GLSharp.Graphics.WebGLE.stencilFail = 2964;
GLSharp.Graphics.WebGLE.stencilPassDepthFail = 2965;
GLSharp.Graphics.WebGLE.stencilPassDepthPass = 2966;
GLSharp.Graphics.WebGLE.stencilReff = 2967;
GLSharp.Graphics.WebGLE.stencilValueMask = 2963;
GLSharp.Graphics.WebGLE.stencilWritemask = 2968;
GLSharp.Graphics.WebGLE.stencilBackFunc = 34816;
GLSharp.Graphics.WebGLE.stencilBackFail = 34817;
GLSharp.Graphics.WebGLE.stencilBackPassDepthFail = 34818;
GLSharp.Graphics.WebGLE.stencilBackPassDepthPass = 34819;
GLSharp.Graphics.WebGLE.stencilBackReff = 36003;
GLSharp.Graphics.WebGLE.stencilBackValueMask = 36004;
GLSharp.Graphics.WebGLE.stencilBackWritemask = 36005;
GLSharp.Graphics.WebGLE.viewport = 2978;
GLSharp.Graphics.WebGLE.scissorBox = 3088;
GLSharp.Graphics.WebGLE.colorClearValue = 3106;
GLSharp.Graphics.WebGLE.colorWritemask = 3107;
GLSharp.Graphics.WebGLE.unpackAlignment = 3317;
GLSharp.Graphics.WebGLE.packAlignment = 3333;
GLSharp.Graphics.WebGLE.maxTextureSize = 3379;
GLSharp.Graphics.WebGLE.maxViewportDims = 3386;
GLSharp.Graphics.WebGLE.subpixelBits = 3408;
GLSharp.Graphics.WebGLE.redBits = 3410;
GLSharp.Graphics.WebGLE.greenBits = 3411;
GLSharp.Graphics.WebGLE.blueBits = 3412;
GLSharp.Graphics.WebGLE.alphaBits = 3413;
GLSharp.Graphics.WebGLE.depthBits = 3414;
GLSharp.Graphics.WebGLE.stencilBits = 3415;
GLSharp.Graphics.WebGLE.polygonOffsetUnits = 10752;
GLSharp.Graphics.WebGLE.polygonOffsetFactor = 32824;
GLSharp.Graphics.WebGLE.textureBinding_2D = 32873;
GLSharp.Graphics.WebGLE.sampleBuffers = 32936;
GLSharp.Graphics.WebGLE.samples = 32937;
GLSharp.Graphics.WebGLE.sampleCoverageValue = 32938;
GLSharp.Graphics.WebGLE.sampleCoverageInvert = 32939;
GLSharp.Graphics.WebGLE.numCompressedTextureFormats = 34466;
GLSharp.Graphics.WebGLE.compressedTextureFormats = 34467;
GLSharp.Graphics.WebGLE.dontCare = 4352;
GLSharp.Graphics.WebGLE.fastest = 4353;
GLSharp.Graphics.WebGLE.nicest = 4354;
GLSharp.Graphics.WebGLE.generateMipmapHint = 33170;
GLSharp.Graphics.WebGLE.byteT = 5120;
GLSharp.Graphics.WebGLE.unsignedByteT = 5121;
GLSharp.Graphics.WebGLE.shortT = 5122;
GLSharp.Graphics.WebGLE.unsignedShortT = 5123;
GLSharp.Graphics.WebGLE.intT = 5124;
GLSharp.Graphics.WebGLE.unsignedIntT = 5125;
GLSharp.Graphics.WebGLE.floatT = 5126;
GLSharp.Graphics.WebGLE.depthComponent = 6402;
GLSharp.Graphics.WebGLE.alpha = 6406;
GLSharp.Graphics.WebGLE.rgb = 6407;
GLSharp.Graphics.WebGLE.rgba = 6408;
GLSharp.Graphics.WebGLE.luminance = 6409;
GLSharp.Graphics.WebGLE.luminanceAlpha = 6410;
GLSharp.Graphics.WebGLE.unsignedShort4444 = 32819;
GLSharp.Graphics.WebGLE.unsignedShort5551 = 32820;
GLSharp.Graphics.WebGLE.unsignedShort565 = 33635;
GLSharp.Graphics.WebGLE.fragmentShader = 35632;
GLSharp.Graphics.WebGLE.vertexShader = 35633;
GLSharp.Graphics.WebGLE.maxVertexAttribs = 34921;
GLSharp.Graphics.WebGLE.maxVertexUniformVectors = 36347;
GLSharp.Graphics.WebGLE.maxVaryingVectors = 36348;
GLSharp.Graphics.WebGLE.maxCombinedTextureImageUnits = 35661;
GLSharp.Graphics.WebGLE.maxVertexTextureImageUnits = 35660;
GLSharp.Graphics.WebGLE.maxTextureImageUnits = 34930;
GLSharp.Graphics.WebGLE.maxFragmentUniformVectors = 36349;
GLSharp.Graphics.WebGLE.shaderType = 35663;
GLSharp.Graphics.WebGLE.deleteStatus = 35712;
GLSharp.Graphics.WebGLE.linkStatus = 35714;
GLSharp.Graphics.WebGLE.validateStatus = 35715;
GLSharp.Graphics.WebGLE.attachedShaders = 35717;
GLSharp.Graphics.WebGLE.activeUniforms = 35718;
GLSharp.Graphics.WebGLE.activeAttributes = 35721;
GLSharp.Graphics.WebGLE.shadingLanguageVersion = 35724;
GLSharp.Graphics.WebGLE.currentProgram = 35725;
GLSharp.Graphics.WebGLE.never = 512;
GLSharp.Graphics.WebGLE.less = 513;
GLSharp.Graphics.WebGLE.equal = 514;
GLSharp.Graphics.WebGLE.lequal = 515;
GLSharp.Graphics.WebGLE.greater = 516;
GLSharp.Graphics.WebGLE.notequal = 517;
GLSharp.Graphics.WebGLE.gequal = 518;
GLSharp.Graphics.WebGLE.always = 519;
GLSharp.Graphics.WebGLE.keep = 7680;
GLSharp.Graphics.WebGLE.replace = 7681;
GLSharp.Graphics.WebGLE.incr = 7682;
GLSharp.Graphics.WebGLE.decr = 7683;
GLSharp.Graphics.WebGLE.invert = 5386;
GLSharp.Graphics.WebGLE.incrWrap = 34055;
GLSharp.Graphics.WebGLE.decrWrap = 34056;
GLSharp.Graphics.WebGLE.vendor = 7936;
GLSharp.Graphics.WebGLE.renderer = 7937;
GLSharp.Graphics.WebGLE.version = 7938;
GLSharp.Graphics.WebGLE.nearest = 9728;
GLSharp.Graphics.WebGLE.linear = 9729;
GLSharp.Graphics.WebGLE.nearestMipmapNearest = 9984;
GLSharp.Graphics.WebGLE.linearMipmapNearest = 9985;
GLSharp.Graphics.WebGLE.nearestMipmapLinear = 9986;
GLSharp.Graphics.WebGLE.linearMipmapLinear = 9987;
GLSharp.Graphics.WebGLE.textureMagFilter = 10240;
GLSharp.Graphics.WebGLE.textureMinFilter = 10241;
GLSharp.Graphics.WebGLE.textureWrapS = 10242;
GLSharp.Graphics.WebGLE.textureWrapT = 10243;
GLSharp.Graphics.WebGLE.texture_2D = 3553;
GLSharp.Graphics.WebGLE.texture = 5890;
GLSharp.Graphics.WebGLE.textureCubeMap = 34067;
GLSharp.Graphics.WebGLE.textureBindingCubeMap = 34068;
GLSharp.Graphics.WebGLE.textureCubeMapPositiveX = 34069;
GLSharp.Graphics.WebGLE.textureCubeMapNegativeX = 34070;
GLSharp.Graphics.WebGLE.textureCubeMapPositiveY = 34071;
GLSharp.Graphics.WebGLE.textureCubeMapNegativeY = 34072;
GLSharp.Graphics.WebGLE.textureCubeMapPositiveZ = 34073;
GLSharp.Graphics.WebGLE.textureCubeMapNegativeZ = 34074;
GLSharp.Graphics.WebGLE.maxCubeMapTextureSize = 34076;
GLSharp.Graphics.WebGLE.texture0 = 33984;
GLSharp.Graphics.WebGLE.texture1 = 33985;
GLSharp.Graphics.WebGLE.texture2 = 33986;
GLSharp.Graphics.WebGLE.texture3 = 33987;
GLSharp.Graphics.WebGLE.texture4 = 33988;
GLSharp.Graphics.WebGLE.texture5 = 33989;
GLSharp.Graphics.WebGLE.texture6 = 33990;
GLSharp.Graphics.WebGLE.texture7 = 33991;
GLSharp.Graphics.WebGLE.texture8 = 33992;
GLSharp.Graphics.WebGLE.texture9 = 33993;
GLSharp.Graphics.WebGLE.texture10 = 33994;
GLSharp.Graphics.WebGLE.texture11 = 33995;
GLSharp.Graphics.WebGLE.texture12 = 33996;
GLSharp.Graphics.WebGLE.texture13 = 33997;
GLSharp.Graphics.WebGLE.texture14 = 33998;
GLSharp.Graphics.WebGLE.texture15 = 33999;
GLSharp.Graphics.WebGLE.texture16 = 34000;
GLSharp.Graphics.WebGLE.texture17 = 34001;
GLSharp.Graphics.WebGLE.texture18 = 34002;
GLSharp.Graphics.WebGLE.texture19 = 34003;
GLSharp.Graphics.WebGLE.texture20 = 34004;
GLSharp.Graphics.WebGLE.texture21 = 34005;
GLSharp.Graphics.WebGLE.texture22 = 34006;
GLSharp.Graphics.WebGLE.texture23 = 34007;
GLSharp.Graphics.WebGLE.texture24 = 34008;
GLSharp.Graphics.WebGLE.texture25 = 34009;
GLSharp.Graphics.WebGLE.texture26 = 34010;
GLSharp.Graphics.WebGLE.texture27 = 34011;
GLSharp.Graphics.WebGLE.texture28 = 34012;
GLSharp.Graphics.WebGLE.texture29 = 34013;
GLSharp.Graphics.WebGLE.texture30 = 34014;
GLSharp.Graphics.WebGLE.texture31 = 34015;
GLSharp.Graphics.WebGLE.activeTexture = 34016;
GLSharp.Graphics.WebGLE.repeat = 10497;
GLSharp.Graphics.WebGLE.clampToEdge = 33071;
GLSharp.Graphics.WebGLE.mirroredRepeat = 33648;
GLSharp.Graphics.WebGLE.floatVec2 = 35664;
GLSharp.Graphics.WebGLE.floatVec3 = 35665;
GLSharp.Graphics.WebGLE.floatVec4 = 35666;
GLSharp.Graphics.WebGLE.intVec2 = 35667;
GLSharp.Graphics.WebGLE.intVec3 = 35668;
GLSharp.Graphics.WebGLE.intVec4 = 35669;
GLSharp.Graphics.WebGLE.bool = 35670;
GLSharp.Graphics.WebGLE.boolVec2 = 35671;
GLSharp.Graphics.WebGLE.boolVec3 = 35672;
GLSharp.Graphics.WebGLE.boolVec4 = 35673;
GLSharp.Graphics.WebGLE.floatMat2 = 35674;
GLSharp.Graphics.WebGLE.floatMat3 = 35675;
GLSharp.Graphics.WebGLE.floatMat4 = 35676;
GLSharp.Graphics.WebGLE.sampler_2D = 35678;
GLSharp.Graphics.WebGLE.samplerCube = 35680;
GLSharp.Graphics.WebGLE.vertexAttribArrayEnabled = 34338;
GLSharp.Graphics.WebGLE.vertexAttribArraySize = 34339;
GLSharp.Graphics.WebGLE.vertexAttribArrayStride = 34340;
GLSharp.Graphics.WebGLE.vertexAttribArrayType = 34341;
GLSharp.Graphics.WebGLE.vertexAttribArrayNormalized = 34922;
GLSharp.Graphics.WebGLE.vertexAttribArrayPointer = 34373;
GLSharp.Graphics.WebGLE.vertexAttribArrayBufferBinding = 34975;
GLSharp.Graphics.WebGLE.compileStatus = 35713;
GLSharp.Graphics.WebGLE.lowFloat = 36336;
GLSharp.Graphics.WebGLE.mediumFloat = 36337;
GLSharp.Graphics.WebGLE.highFloat = 36338;
GLSharp.Graphics.WebGLE.lowInt = 36339;
GLSharp.Graphics.WebGLE.mediumInt = 36340;
GLSharp.Graphics.WebGLE.highInt = 36341;
GLSharp.Graphics.WebGLE.frameBuffer = 36160;
GLSharp.Graphics.WebGLE.renderbuffer = 36161;
GLSharp.Graphics.WebGLE.rgba4 = 32854;
GLSharp.Graphics.WebGLE.rgb5A1 = 32855;
GLSharp.Graphics.WebGLE.rgb565 = 36194;
GLSharp.Graphics.WebGLE.depthComponent16 = 33189;
GLSharp.Graphics.WebGLE.stencilIndex = 6401;
GLSharp.Graphics.WebGLE.stencilIndex8 = 36168;
GLSharp.Graphics.WebGLE.depthStencil = 34041;
GLSharp.Graphics.WebGLE.renderbufferWidth = 36162;
GLSharp.Graphics.WebGLE.renderbufferHeight = 36163;
GLSharp.Graphics.WebGLE.renderbufferInternalFormat = 36164;
GLSharp.Graphics.WebGLE.renderbufferRedSize = 36176;
GLSharp.Graphics.WebGLE.renderbufferGreenSize = 36177;
GLSharp.Graphics.WebGLE.renderbufferBlueSize = 36178;
GLSharp.Graphics.WebGLE.renderbufferAlphaSize = 36179;
GLSharp.Graphics.WebGLE.renderbufferDepthSize = 36180;
GLSharp.Graphics.WebGLE.renderbufferStencilSize = 36181;
GLSharp.Graphics.WebGLE.framebufferAttachmentObjectType = 36048;
GLSharp.Graphics.WebGLE.framebufferAttachmentObjectName = 36049;
GLSharp.Graphics.WebGLE.framebufferAttachmentTextureLevel = 36050;
GLSharp.Graphics.WebGLE.framebufferAttachmentTextureCubeMapFace = 36051;
GLSharp.Graphics.WebGLE.colorAttachment0 = 36064;
GLSharp.Graphics.WebGLE.depthAttachment = 36096;
GLSharp.Graphics.WebGLE.stencilAttachment = 36128;
GLSharp.Graphics.WebGLE.depthStencilAttachment = 33306;
GLSharp.Graphics.WebGLE.none = 0;
GLSharp.Graphics.WebGLE.framebufferComplete = 36053;
GLSharp.Graphics.WebGLE.framebufferIncompleteAttachment = 36054;
GLSharp.Graphics.WebGLE.framebufferIncompleteMissingAttachment = 36055;
GLSharp.Graphics.WebGLE.framebufferIncompleteDimensions = 36057;
GLSharp.Graphics.WebGLE.framebufferUnsupported = 36061;
GLSharp.Graphics.WebGLE.framebufferBinding = 36006;
GLSharp.Graphics.WebGLE.renderbufferBinding = 36007;
GLSharp.Graphics.WebGLE.maxRenderbufferSize = 34024;
GLSharp.Graphics.WebGLE.invalidFramebufferOperation = 1286;
GLSharp.Graphics.WebGLE.unpackFlipY = 37440;
GLSharp.Graphics.WebGLE.unpackPremultiplyAlpha = 37441;
GLSharp.Graphics.WebGLE.contextLost = 37442;
GLSharp.Graphics.WebGLE.unpackColorspaceConversion = 37443;
})();

//! This script was generated using Script# v0.7.4.0
