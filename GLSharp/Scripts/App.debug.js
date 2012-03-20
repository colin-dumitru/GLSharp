//! App.debug.js
//

(function() {

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
// GLSharp.Data.ImageLoader

GLSharp.Data.ImageLoader = function GLSharp_Data_ImageLoader() {
}
GLSharp.Data.ImageLoader.prototype = {
    
    get_extension: function GLSharp_Data_ImageLoader$get_extension() {
        /// <value type="Array"></value>
        var ret = [];
        ret.add('jpg');
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
        /// <returns type="GLSharp.Graphics.ICompiledShader"></returns>
        if (doc.documentElement.nodeName !== 'shader') {
            throw new Error('Invalid shader file');
        }
        var sourceFragment = null;
        var sourceVertex = null;
        var ret = new GLSharp.Graphics.CompiledShader();
        ret.set_name(doc.documentElement.attributes.getNamedItem('name').nodeValue);
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
        ret.set_shaderProgram(shaderProgram);
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
            throw new Error('Cannot compile shader.');
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
// GLSharp.Graphics.Buffer

GLSharp.Graphics.Buffer = function GLSharp_Graphics_Buffer() {
}


////////////////////////////////////////////////////////////////////////////////
// GLSharp.Graphics.CompiledShader

GLSharp.Graphics.CompiledShader = function GLSharp_Graphics_CompiledShader() {
    /// <field name="_name" type="String">
    /// </field>
    /// <field name="_shaderProgram" type="GLSharp.Graphics.IShaderProgram">
    /// </field>
    /// <field name="_uniforms" type="Object">
    /// </field>
    this._shaderProgram = new GLSharp.Graphics.ShaderProgram();
    this._uniforms = {};
}
GLSharp.Graphics.CompiledShader.prototype = {
    _name: 'Undefined',
    
    get_name: function GLSharp_Graphics_CompiledShader$get_name() {
        /// <value type="String"></value>
        return this._name;
    },
    set_name: function GLSharp_Graphics_CompiledShader$set_name(value) {
        /// <value type="String"></value>
        this._name = value;
        return value;
    },
    
    get_shaderProgram: function GLSharp_Graphics_CompiledShader$get_shaderProgram() {
        /// <value type="GLSharp.Graphics.IShaderProgram"></value>
        return this._shaderProgram;
    },
    set_shaderProgram: function GLSharp_Graphics_CompiledShader$set_shaderProgram(value) {
        /// <value type="GLSharp.Graphics.IShaderProgram"></value>
        this._shaderProgram = value;
        return value;
    },
    
    get_uniforms: function GLSharp_Graphics_CompiledShader$get_uniforms() {
        /// <value type="Object"></value>
        return this._uniforms;
    }
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
    /// <field name="_world" type="GLSharp.Universe.World">
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
    _world: null,
    
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
    
    get_context: function GLSharp_Graphics_WebGLGraphics$get_context() {
        /// <summary>
        /// Gets the context used by the graphics object.
        /// </summary>
        /// <value type="GLSharp.Graphics.WebGL"></value>
        return this._context;
    },
    
    clear: function GLSharp_Graphics_WebGLGraphics$clear() {
        this._context.clear(this._clearMode);
    },
    
    _bindWorld: function GLSharp_Graphics_WebGLGraphics$_bindWorld(world) {
        /// <param name="world" type="GLSharp.Universe.World">
        /// </param>
        world.add_nodeAdded(ss.Delegate.create(this, this._world_NodeAdded));
        world.add_nodeRemoved(ss.Delegate.create(this, this._world_NodeRemoved));
    },
    
    _world_NodeRemoved: function GLSharp_Graphics_WebGLGraphics$_world_NodeRemoved(sender, args) {
        /// <param name="sender" type="GLSharp.Universe.World">
        /// </param>
        /// <param name="args" type="Object">
        /// </param>
        var node = Type.safeCast(args, GLSharp.Universe.Node);
        node.add_componentAdded(ss.Delegate.create(this, this._node_ComponentAdded));
        node.add_componentRemoved(ss.Delegate.create(this, this._node_ComponentRemoved));
    },
    
    _world_NodeAdded: function GLSharp_Graphics_WebGLGraphics$_world_NodeAdded(sender, args) {
        /// <param name="sender" type="GLSharp.Universe.World">
        /// </param>
        /// <param name="args" type="Object">
        /// </param>
    },
    
    _node_ComponentRemoved: function GLSharp_Graphics_WebGLGraphics$_node_ComponentRemoved(sender, args) {
        /// <param name="sender" type="GLSharp.Universe.Node">
        /// </param>
        /// <param name="args" type="Object">
        /// </param>
    },
    
    _node_ComponentAdded: function GLSharp_Graphics_WebGLGraphics$_node_ComponentAdded(sender, args) {
        /// <param name="sender" type="GLSharp.Universe.Node">
        /// </param>
        /// <param name="args" type="Object">
        /// </param>
    }
}


Type.registerNamespace('App');

////////////////////////////////////////////////////////////////////////////////
// App.App

App.App = function App_App() {
    /// <field name="_graphics" type="GLSharp.Graphics.WebGLGraphics">
    /// </field>
    /// <field name="_engine" type="GLSharp.Engine">
    /// </field>
    /// <field name="_game" type="GLSharp.Game.GameBase">
    /// </field>
}
App.App.prototype = {
    _graphics: null,
    _engine: null,
    _game: null,
    
    init: function App_App$init() {
        var canvasElem = document.getElementById('mainCanvas');
        if (canvasElem == null) {
            throw new Error('No canvas element found!');
        }
        this._graphics = new GLSharp.Graphics.WebGLGraphics(canvasElem);
        this._graphics.clear();
        this._InitEnvironment();
        this._engine = new GLSharp.Engine();
        this._game = new GLSharp.DemoGame();
        this._engine.set_activeGame(this._game);
        this._engine.run();
    },
    
    _InitEnvironment: function App_App$_InitEnvironment() {
        GLSharp.Core.SystemCore.set_environment(new Environment());
        var resourceManager = new GLSharp.Data.ResourceManager();
        resourceManager.addLoader(new GLSharp.Data.ImageLoader());
        resourceManager.addLoader(new GLSharp.Data.JsonLoader());
        resourceManager.addLoader(new GLSharp.Data.ShaderLoader(this._graphics.get_context()));
        GLSharp.Core.SystemCore.set_resourceManager(resourceManager);
        GLSharp.Core.SystemCore.set_logger(new JSLoggingProvider());
    }
}


GLSharp.Data.ImageLoader.registerClass('GLSharp.Data.ImageLoader', null, GLSharp.Data.IResourceLoader);
GLSharp.Data.JsonLoader.registerClass('GLSharp.Data.JsonLoader', null, GLSharp.Data.IResourceLoader);
GLSharp.Data.ShaderLoader.registerClass('GLSharp.Data.ShaderLoader', null, GLSharp.Data.IResourceLoader);
GLSharp.Data.ResourceManager.registerClass('GLSharp.Data.ResourceManager', null, GLSharp.Data.IResourceManager);
GLSharp.Graphics.Buffer.registerClass('GLSharp.Graphics.Buffer');
GLSharp.Graphics.CompiledShader.registerClass('GLSharp.Graphics.CompiledShader', null, GLSharp.Graphics.ICompiledShader);
GLSharp.Graphics.FrameBuffer.registerClass('GLSharp.Graphics.FrameBuffer');
GLSharp.Graphics.RenderBuffer.registerClass('GLSharp.Graphics.RenderBuffer');
GLSharp.Graphics.Shader.registerClass('GLSharp.Graphics.Shader', null, GLSharp.Graphics.IShader);
GLSharp.Graphics.ShaderProgram.registerClass('GLSharp.Graphics.ShaderProgram', null, GLSharp.Graphics.IShaderProgram);
GLSharp.Graphics.Texture.registerClass('GLSharp.Graphics.Texture');
GLSharp.Graphics.UniformLocation.registerClass('GLSharp.Graphics.UniformLocation', null, GLSharp.Graphics.IUniformLocation);
GLSharp.Graphics.WebGLE.registerClass('GLSharp.Graphics.WebGLE');
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
