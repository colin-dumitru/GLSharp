//! Engine.debug.js
//

(function() {

Type.registerNamespace('GLSharp.Graphics');

////////////////////////////////////////////////////////////////////////////////
// GLSharp.Graphics.ICompiledShader

GLSharp.Graphics.ICompiledShader = function() { 
};
GLSharp.Graphics.ICompiledShader.prototype = {
    get_name : null,
    get_shaderProgram : null,
    get_uniforms : null
}
GLSharp.Graphics.ICompiledShader.registerInterface('GLSharp.Graphics.ICompiledShader');


////////////////////////////////////////////////////////////////////////////////
// GLSharp.Graphics.IUniform

GLSharp.Graphics.IUniform = function() { 
};
GLSharp.Graphics.IUniform.prototype = {
    get_uniformLocation : null,
    set_uniformLocation : null,
    get_name : null,
    set : null
}
GLSharp.Graphics.IUniform.registerInterface('GLSharp.Graphics.IUniform');


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
    get_world : null,
    set_world : null,
    clear : null
}
GLSharp.Graphics.IGraphics.registerInterface('GLSharp.Graphics.IGraphics');


////////////////////////////////////////////////////////////////////////////////
// GLSharp.Graphics.IShader

GLSharp.Graphics.IShader = function() { 
};
GLSharp.Graphics.IShader.prototype = {

}
GLSharp.Graphics.IShader.registerInterface('GLSharp.Graphics.IShader');


////////////////////////////////////////////////////////////////////////////////
// GLSharp.Graphics.IShaderProgram

GLSharp.Graphics.IShaderProgram = function() { 
};
GLSharp.Graphics.IShaderProgram.prototype = {

}
GLSharp.Graphics.IShaderProgram.registerInterface('GLSharp.Graphics.IShaderProgram');


////////////////////////////////////////////////////////////////////////////////
// GLSharp.Graphics.IUniformLocation

GLSharp.Graphics.IUniformLocation = function() { 
};
GLSharp.Graphics.IUniformLocation.prototype = {

}
GLSharp.Graphics.IUniformLocation.registerInterface('GLSharp.Graphics.IUniformLocation');


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


////////////////////////////////////////////////////////////////////////////////
// GLSharp.Graphics.Material

GLSharp.Graphics.Material = function GLSharp_Graphics_Material() {
    /// <field name="_shader" type="GLSharp.Graphics.IShader">
    /// </field>
}
GLSharp.Graphics.Material.prototype = {
    _shader: null,
    
    get_shader: function GLSharp_Graphics_Material$get_shader() {
        /// <summary>
        /// Gets and sets the shader used by the material.
        /// </summary>
        /// <value type="GLSharp.Graphics.IShader"></value>
        return this._shader;
    },
    set_shader: function GLSharp_Graphics_Material$set_shader(value) {
        /// <summary>
        /// Gets and sets the shader used by the material.
        /// </summary>
        /// <value type="GLSharp.Graphics.IShader"></value>
        this._shader = value;
        return value;
    }
}


Type.registerNamespace('GLSharp.Universe');

////////////////////////////////////////////////////////////////////////////////
// GLSharp.Universe.Component

GLSharp.Universe.Component = function GLSharp_Universe_Component() {
    /// <field name="_type" type="String">
    /// </field>
    /// <field name="_parent" type="GLSharp.Universe.Node">
    /// </field>
}
GLSharp.Universe.Component.prototype = {
    _type: null,
    
    get_type: function GLSharp_Universe_Component$get_type() {
        /// <summary>
        /// Unique type of the component.
        /// </summary>
        /// <value type="String"></value>
        return this._type;
    },
    set_type: function GLSharp_Universe_Component$set_type(value) {
        /// <summary>
        /// Unique type of the component.
        /// </summary>
        /// <value type="String"></value>
        this._type = value;
        return value;
    },
    
    _parent: null,
    
    get_parent: function GLSharp_Universe_Component$get_parent() {
        /// <summary>
        /// Parent node which contains the component.
        /// </summary>
        /// <value type="GLSharp.Universe.Node"></value>
        return this._parent;
    },
    set_parent: function GLSharp_Universe_Component$set_parent(value) {
        /// <summary>
        /// Parent node which contains the component.
        /// </summary>
        /// <value type="GLSharp.Universe.Node"></value>
        this._parent = value;
        return value;
    }
}


////////////////////////////////////////////////////////////////////////////////
// GLSharp.Universe.Node

GLSharp.Universe.Node = function GLSharp_Universe_Node() {
    /// <field name="__componentAdded" type="Function">
    /// </field>
    /// <field name="__componentRemoved" type="Function">
    /// </field>
    /// <field name="_name" type="String">
    /// </field>
    /// <field name="_components" type="Object">
    /// </field>
    this._components = {};
}
GLSharp.Universe.Node.prototype = {
    
    add_componentAdded: function GLSharp_Universe_Node$add_componentAdded(value) {
        /// <summary>
        /// Called when a component is added.
        /// </summary>
        /// <param name="value" type="Function" />
        this.__componentAdded = ss.Delegate.combine(this.__componentAdded, value);
    },
    remove_componentAdded: function GLSharp_Universe_Node$remove_componentAdded(value) {
        /// <summary>
        /// Called when a component is added.
        /// </summary>
        /// <param name="value" type="Function" />
        this.__componentAdded = ss.Delegate.remove(this.__componentAdded, value);
    },
    
    __componentAdded: null,
    
    add_componentRemoved: function GLSharp_Universe_Node$add_componentRemoved(value) {
        /// <summary>
        /// Called when a component is removed.
        /// </summary>
        /// <param name="value" type="Function" />
        this.__componentRemoved = ss.Delegate.combine(this.__componentRemoved, value);
    },
    remove_componentRemoved: function GLSharp_Universe_Node$remove_componentRemoved(value) {
        /// <summary>
        /// Called when a component is removed.
        /// </summary>
        /// <param name="value" type="Function" />
        this.__componentRemoved = ss.Delegate.remove(this.__componentRemoved, value);
    },
    
    __componentRemoved: null,
    _name: 'Undefined',
    
    get_name: function GLSharp_Universe_Node$get_name() {
        /// <summary>
        /// The name of the node.
        /// </summary>
        /// <value type="String"></value>
        return this._name;
    },
    set_name: function GLSharp_Universe_Node$set_name(value) {
        /// <summary>
        /// The name of the node.
        /// </summary>
        /// <value type="String"></value>
        this._name = value;
        return value;
    },
    
    addComponent: function GLSharp_Universe_Node$addComponent(component) {
        /// <param name="component" type="GLSharp.Universe.Component">
        /// </param>
        this._components[component.get_type()] = component;
        if (this.__componentAdded != null) {
            this.__componentAdded(this, component);
        }
    },
    
    removeComponent: function GLSharp_Universe_Node$removeComponent(component) {
        /// <param name="component" type="GLSharp.Universe.Component">
        /// </param>
        delete this._components[component.get_type()];
        if (this.__componentRemoved != null) {
            this.__componentRemoved(this, component);
        }
    }
}


////////////////////////////////////////////////////////////////////////////////
// GLSharp.Universe.World

GLSharp.Universe.World = function GLSharp_Universe_World() {
    /// <field name="_nodeList" type="Array">
    /// </field>
    /// <field name="__nodeAdded" type="Function">
    /// </field>
    /// <field name="__nodeRemoved" type="Function">
    /// </field>
    this._nodeList = [];
}
GLSharp.Universe.World.prototype = {
    _nodeList: null,
    
    get_rootNodes: function GLSharp_Universe_World$get_rootNodes() {
        /// <value type="Array"></value>
        return this._nodeList;
    },
    
    add_nodeAdded: function GLSharp_Universe_World$add_nodeAdded(value) {
        /// <summary>
        /// Called when a node gets added.
        /// </summary>
        /// <param name="value" type="Function" />
        this.__nodeAdded = ss.Delegate.combine(this.__nodeAdded, value);
    },
    remove_nodeAdded: function GLSharp_Universe_World$remove_nodeAdded(value) {
        /// <summary>
        /// Called when a node gets added.
        /// </summary>
        /// <param name="value" type="Function" />
        this.__nodeAdded = ss.Delegate.remove(this.__nodeAdded, value);
    },
    
    __nodeAdded: null,
    
    add_nodeRemoved: function GLSharp_Universe_World$add_nodeRemoved(value) {
        /// <summary>
        /// Called when a node gets removed.
        /// </summary>
        /// <param name="value" type="Function" />
        this.__nodeRemoved = ss.Delegate.combine(this.__nodeRemoved, value);
    },
    remove_nodeRemoved: function GLSharp_Universe_World$remove_nodeRemoved(value) {
        /// <summary>
        /// Called when a node gets removed.
        /// </summary>
        /// <param name="value" type="Function" />
        this.__nodeRemoved = ss.Delegate.remove(this.__nodeRemoved, value);
    },
    
    __nodeRemoved: null,
    
    addNode: function GLSharp_Universe_World$addNode(node) {
        /// <param name="node" type="GLSharp.Universe.Node">
        /// </param>
        this._nodeList.add(node);
        if (this.__nodeAdded != null) {
            this.__nodeAdded(this, node);
        }
    },
    
    removeNode: function GLSharp_Universe_World$removeNode(node) {
        /// <param name="node" type="GLSharp.Universe.Node">
        /// </param>
        this._nodeList.remove(node);
        if (this.__nodeRemoved != null) {
            this.__nodeRemoved(this, node);
        }
    }
}


GLSharp.Graphics.Color.registerClass('GLSharp.Graphics.Color');
GLSharp.Graphics.Material.registerClass('GLSharp.Graphics.Material');
GLSharp.Universe.Component.registerClass('GLSharp.Universe.Component');
GLSharp.Universe.Node.registerClass('GLSharp.Universe.Node');
GLSharp.Universe.World.registerClass('GLSharp.Universe.World');
})();

//! This script was generated using Script# v0.7.4.0
