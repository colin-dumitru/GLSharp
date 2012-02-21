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
        ret.add('.jpg');
        ret.add('.png');
        ret.add('.jpeg');
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
        ret.add('.json');
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
    
    getResource: function GLSharp_Data_ResourceManager$getResource(resource) {
        /// <param name="resource" type="String">
        /// </param>
        /// <returns type="GLSharp.Data.Resource"></returns>
        var lastPeriod = resource.lastIndexOf('.');
        var extension = '';
        if (lastPeriod > -1) {
            extension = resource.substring(lastPeriod, resource.length).toLowerCase();
        }
        var loader = this._loaders[extension];
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
    /// <field name="_graphics" type="GLSharp.Graphics.IGraphics">
    /// </field>
}
App.App.prototype = {
    _graphics: null,
    
    init: function App_App$init() {
        this._InitEnvironment();
        var canvasElem = document.getElementById('mainCanvas');
        if (canvasElem == null) {
            throw new Error('No canvas element found!');
        }
        this._graphics = new GLSharp.Graphics.WebGLGraphics(canvasElem);
        this._graphics.clear();
        GLSharp.Core.Core.get_resourceManager().getResource('/Data/JSON/test.json').add_resourceChanged(function(sender, args) {
            alert('aaa');
        });
    },
    
    _InitEnvironment: function App_App$_InitEnvironment() {
        GLSharp.Core.Core.set_environment(new Environment());
        var resourceManager = new GLSharp.Data.ResourceManager();
        resourceManager.addLoader(new GLSharp.Data.ImageLoader());
        resourceManager.addLoader(new GLSharp.Data.JsonLoader());
        GLSharp.Core.Core.set_resourceManager(resourceManager);
    }
}


GLSharp.Data.ImageLoader.registerClass('GLSharp.Data.ImageLoader', null, GLSharp.Data.IResourceLoader);
GLSharp.Data.JsonLoader.registerClass('GLSharp.Data.JsonLoader', null, GLSharp.Data.IResourceLoader);
GLSharp.Data.ResourceManager.registerClass('GLSharp.Data.ResourceManager', null, GLSharp.Data.IResourceManager);
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
