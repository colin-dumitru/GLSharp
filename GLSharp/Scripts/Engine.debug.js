//! Engine.debug.js
//

(function() {

Type.registerNamespace('GLSharp.Content');

////////////////////////////////////////////////////////////////////////////////
// GLSharp.Content.IResourceConverter

GLSharp.Content.IResourceConverter = function() { 
};
GLSharp.Content.IResourceConverter.prototype = {
    get_typeHandled : null,
    convert : null
}
GLSharp.Content.IResourceConverter.registerInterface('GLSharp.Content.IResourceConverter');


////////////////////////////////////////////////////////////////////////////////
// GLSharp.Content.LightItem

GLSharp.Content.LightItem = function GLSharp_Content_LightItem() {
    /// <field name="_id" type="String">
    /// </field>
    /// <field name="_type" type="Number" integer="true">
    /// </field>
    /// <field name="_properties" type="Object">
    /// </field>
}
GLSharp.Content.LightItem.prototype = {
    _id: null,
    
    get_id: function GLSharp_Content_LightItem$get_id() {
        /// <value type="String"></value>
        return this._id;
    },
    set_id: function GLSharp_Content_LightItem$set_id(value) {
        /// <value type="String"></value>
        this._id = value;
        return value;
    },
    
    _type: 0,
    
    get_type: function GLSharp_Content_LightItem$get_type() {
        /// <value type="Number" integer="true"></value>
        return this._type;
    },
    set_type: function GLSharp_Content_LightItem$set_type(value) {
        /// <value type="Number" integer="true"></value>
        this._type = value;
        return value;
    },
    
    _properties: null,
    
    get_properties: function GLSharp_Content_LightItem$get_properties() {
        /// <value type="Object"></value>
        return this._properties;
    },
    set_properties: function GLSharp_Content_LightItem$set_properties(value) {
        /// <value type="Object"></value>
        this._properties = value;
        return value;
    }
}


////////////////////////////////////////////////////////////////////////////////
// GLSharp.Content.LightConverter

GLSharp.Content.LightConverter = function GLSharp_Content_LightConverter() {
}
GLSharp.Content.LightConverter.prototype = {
    
    get_typeHandled: function GLSharp_Content_LightConverter$get_typeHandled() {
        /// <value type="String"></value>
        return 'light';
    },
    
    convert: function GLSharp_Content_LightConverter$convert(input) {
        /// <param name="input" type="Object">
        /// </param>
        /// <returns type="Object"></returns>
        var obj = input;
        var ret = new GLSharp.Content.LightItem();
        ret.set_id(obj.Id);
        ret.set_type(obj.Type);
        ret.set_properties({});
        var $dict1 = obj.Properties;
        for (var $key2 in $dict1) {
            var keyValuePair = { key: $key2, value: $dict1[$key2] };
            if (keyValuePair.key === 'color') {
                var colors = keyValuePair.value.split(' ');
                var colorf = GLSharp.Core.SystemCore.get_environment().createFloat32Array(colors.length);
                for (var i = 0; i < colors.length; i++) {
                    colorf[i] = parseFloat(colors[i]);
                }
                ret.get_properties()['color'] = colorf;
            }
            else if (keyValuePair.key === 'intensity') {
                ret.get_properties()['intensity'] = parseFloat(keyValuePair.value);
            }
            else if (keyValuePair.key === 'falloff_angle') {
                ret.get_properties()['falloff_angle'] = parseFloat(keyValuePair.value);
            }
        }
        return ret;
    }
}


////////////////////////////////////////////////////////////////////////////////
// GLSharp.Content.MeshItem

GLSharp.Content.MeshItem = function GLSharp_Content_MeshItem() {
    /// <summary>
    /// Mesh item which will reside inside a collection.
    /// </summary>
    /// <field name="_id" type="String">
    /// </field>
    /// <field name="_indexes" type="Array" elementType="Number" elementInteger="true">
    /// </field>
    /// <field name="_normals" type="Array" elementType="Number">
    /// </field>
    /// <field name="_uvs" type="Array" elementType="Number">
    /// </field>
    /// <field name="_vertices" type="Array" elementType="Number">
    /// </field>
}
GLSharp.Content.MeshItem.prototype = {
    _id: null,
    
    get_id: function GLSharp_Content_MeshItem$get_id() {
        /// <value type="String"></value>
        return this._id;
    },
    set_id: function GLSharp_Content_MeshItem$set_id(value) {
        /// <value type="String"></value>
        this._id = value;
        return value;
    },
    
    _indexes: null,
    
    get_indexes: function GLSharp_Content_MeshItem$get_indexes() {
        /// <value type="Array" elementType="Number" elementInteger="true"></value>
        return this._indexes;
    },
    set_indexes: function GLSharp_Content_MeshItem$set_indexes(value) {
        /// <value type="Array" elementType="Number" elementInteger="true"></value>
        this._indexes = value;
        return value;
    },
    
    _normals: null,
    
    get_normals: function GLSharp_Content_MeshItem$get_normals() {
        /// <value type="Array" elementType="Number"></value>
        return this._normals;
    },
    set_normals: function GLSharp_Content_MeshItem$set_normals(value) {
        /// <value type="Array" elementType="Number"></value>
        this._normals = value;
        return value;
    },
    
    _uvs: null,
    
    get_uVs: function GLSharp_Content_MeshItem$get_uVs() {
        /// <value type="Array" elementType="Number"></value>
        return this._uvs;
    },
    set_uVs: function GLSharp_Content_MeshItem$set_uVs(value) {
        /// <value type="Array" elementType="Number"></value>
        this._uvs = value;
        return value;
    },
    
    _vertices: null,
    
    get_vertices: function GLSharp_Content_MeshItem$get_vertices() {
        /// <value type="Array" elementType="Number"></value>
        return this._vertices;
    },
    set_vertices: function GLSharp_Content_MeshItem$set_vertices(value) {
        /// <value type="Array" elementType="Number"></value>
        this._vertices = value;
        return value;
    }
}


////////////////////////////////////////////////////////////////////////////////
// GLSharp.Content.MeshConverter

GLSharp.Content.MeshConverter = function GLSharp_Content_MeshConverter() {
    /// <summary>
    /// Converter for items of type "mesh"
    /// </summary>
}
GLSharp.Content.MeshConverter.prototype = {
    
    get_typeHandled: function GLSharp_Content_MeshConverter$get_typeHandled() {
        /// <value type="String"></value>
        return 'mesh';
    },
    
    convert: function GLSharp_Content_MeshConverter$convert(input) {
        /// <param name="input" type="Object">
        /// </param>
        /// <returns type="Object"></returns>
        if (input == null) {
            return null;
        }
        var obj = input;
        var ret = new GLSharp.Content.MeshItem();
        ret.set_id(obj.Id);
        ret.set_indexes(GLSharp.Core.SystemCore.get_environment().createInt32ArrayFromArray(obj.Indexes));
        ret.set_normals(GLSharp.Core.SystemCore.get_environment().createFloat32ArrayFromArray(obj.Normals));
        ret.set_uVs(GLSharp.Core.SystemCore.get_environment().createFloat32ArrayFromArray(obj.UVs));
        ret.set_vertices(GLSharp.Core.SystemCore.get_environment().createFloat32ArrayFromArray(obj.Vertices));
        return ret;
    }
}


////////////////////////////////////////////////////////////////////////////////
// GLSharp.Content.NodeConverter

GLSharp.Content.NodeConverter = function GLSharp_Content_NodeConverter() {
}
GLSharp.Content.NodeConverter.prototype = {
    
    get_typeHandled: function GLSharp_Content_NodeConverter$get_typeHandled() {
        /// <value type="String"></value>
        return 'node';
    },
    
    convert: function GLSharp_Content_NodeConverter$convert(input) {
        /// <param name="input" type="Object">
        /// </param>
        /// <returns type="Object"></returns>
        var root = input;
        return this._convertNodeObject(root);
    },
    
    _convertNodeObject: function GLSharp_Content_NodeConverter$_convertNodeObject(root) {
        /// <param name="root" type="NodeObject">
        /// </param>
        /// <returns type="GLSharp.Universe.Node"></returns>
        var ret = new GLSharp.Universe.Node();
        ret.set_id(root.Id);
        ret.set_matrix(new GLSharp.Util.Matrix4X4(root.Matrix));
        if (root.Children != null) {
            var $enum1 = ss.IEnumerator.getEnumerator(root.Children);
            while ($enum1.moveNext()) {
                var nodeObject = $enum1.current;
                ret.addChild(this._convertNodeObject(nodeObject));
            }
        }
        var compColection = [];
        var $enum2 = ss.IEnumerator.getEnumerator(root.References);
        while ($enum2.moveNext()) {
            var referenceObject = $enum2.current;
            this._convertReferences(referenceObject, compColection);
        }
        var $enum3 = ss.IEnumerator.getEnumerator(compColection);
        while ($enum3.moveNext()) {
            var component = $enum3.current;
            ret.addComponent(component);
        }
        return ret;
    },
    
    _convertReferences: function GLSharp_Content_NodeConverter$_convertReferences(reference, collection) {
        /// <param name="reference" type="ReferenceObject">
        /// </param>
        /// <param name="collection" type="Array">
        /// </param>
        if (reference.Type === 'mesh') {
            var comp = new GLSharp.Universe.MeshComponent();
            var handle = new GLSharp.Content.Handle();
            handle.set_library(reference.Library);
            handle.set_id(reference.Resource);
            comp.set_meshHandle(handle);
            collection.add(comp);
        }
        else if (reference.Type === 'material') {
            var comp = new GLSharp.Universe.MaterialComponent();
            var handle = new GLSharp.Content.Handle();
            handle.set_library(reference.Library);
            handle.set_id(reference.Resource);
            comp.set_materialHandle(handle);
            collection.add(comp);
        }
        if (reference.Children != null) {
            var $enum1 = ss.IEnumerator.getEnumerator(reference.Children);
            while ($enum1.moveNext()) {
                var referenceObject = $enum1.current;
                this._convertReferences(referenceObject, collection);
            }
        }
    }
}


////////////////////////////////////////////////////////////////////////////////
// GLSharp.Content.Handle

GLSharp.Content.Handle = function GLSharp_Content_Handle() {
    /// <summary>
    /// Item Handle.
    /// </summary>
    /// <field name="_library" type="String">
    /// </field>
    /// <field name="_id" type="String">
    /// </field>
}
GLSharp.Content.Handle.prototype = {
    _library: null,
    
    get_library: function GLSharp_Content_Handle$get_library() {
        /// <value type="String"></value>
        return this._library;
    },
    set_library: function GLSharp_Content_Handle$set_library(value) {
        /// <value type="String"></value>
        this._library = value;
        return value;
    },
    
    _id: null,
    
    get_id: function GLSharp_Content_Handle$get_id() {
        /// <value type="String"></value>
        return this._id;
    },
    set_id: function GLSharp_Content_Handle$set_id(value) {
        /// <value type="String"></value>
        this._id = value;
        return value;
    }
}


////////////////////////////////////////////////////////////////////////////////
// GLSharp.Content.Collection

GLSharp.Content.Collection = function GLSharp_Content_Collection() {
    /// <summary>
    /// A named collection of Resources.
    /// </summary>
    /// <field name="_name" type="String">
    /// </field>
    /// <field name="_resources" type="Object">
    /// </field>
}
GLSharp.Content.Collection.prototype = {
    _name: null,
    
    get_name: function GLSharp_Content_Collection$get_name() {
        /// <value type="String"></value>
        return this._name;
    },
    set_name: function GLSharp_Content_Collection$set_name(value) {
        /// <value type="String"></value>
        this._name = value;
        return value;
    },
    
    _resources: null,
    
    get_resources: function GLSharp_Content_Collection$get_resources() {
        /// <value type="Object"></value>
        return this._resources;
    },
    set_resources: function GLSharp_Content_Collection$set_resources(value) {
        /// <value type="Object"></value>
        this._resources = value;
        return value;
    }
}


////////////////////////////////////////////////////////////////////////////////
// GLSharp.Content.ResourceItem

GLSharp.Content.ResourceItem = function GLSharp_Content_ResourceItem() {
    /// <summary>
    /// A resourc item.
    /// </summary>
    /// <field name="_id" type="String">
    /// </field>
    /// <field name="_type" type="String">
    /// </field>
    /// <field name="_item" type="Object">
    /// </field>
}
GLSharp.Content.ResourceItem.prototype = {
    _id: null,
    
    get_id: function GLSharp_Content_ResourceItem$get_id() {
        /// <value type="String"></value>
        return this._id;
    },
    set_id: function GLSharp_Content_ResourceItem$set_id(value) {
        /// <value type="String"></value>
        this._id = value;
        return value;
    },
    
    _type: null,
    
    get_type: function GLSharp_Content_ResourceItem$get_type() {
        /// <value type="String"></value>
        return this._type;
    },
    set_type: function GLSharp_Content_ResourceItem$set_type(value) {
        /// <value type="String"></value>
        this._type = value;
        return value;
    },
    
    _item: null,
    
    get_item: function GLSharp_Content_ResourceItem$get_item() {
        /// <value type="Object"></value>
        return this._item;
    },
    set_item: function GLSharp_Content_ResourceItem$set_item(value) {
        /// <value type="Object"></value>
        this._item = value;
        return value;
    }
}


////////////////////////////////////////////////////////////////////////////////
// GLSharp.Content.Library

GLSharp.Content.Library = function GLSharp_Content_Library() {
    /// <summary>
    /// Loades and manages resources.
    /// </summary>
    /// <field name="_collections" type="Object">
    /// </field>
    /// <field name="_converters" type="Object">
    /// </field>
    /// <field name="__collectionLoaded" type="Function">
    /// </field>
    this._collections = {};
    this._converters = {};
}
GLSharp.Content.Library.prototype = {
    _collections: null,
    _converters: null,
    
    add_collectionLoaded: function GLSharp_Content_Library$add_collectionLoaded(value) {
        /// <param name="value" type="Function" />
        this.__collectionLoaded = ss.Delegate.combine(this.__collectionLoaded, value);
    },
    remove_collectionLoaded: function GLSharp_Content_Library$remove_collectionLoaded(value) {
        /// <param name="value" type="Function" />
        this.__collectionLoaded = ss.Delegate.remove(this.__collectionLoaded, value);
    },
    
    __collectionLoaded: null,
    
    loadLibrary: function GLSharp_Content_Library$loadLibrary(url) {
        /// <param name="url" type="String">
        /// </param>
        var param = new GLSharp.Data.ResourceManagerParams();
        param.set_type('json');
        GLSharp.Core.SystemCore.get_resourceManager().getResource(url, param).add_resourceChanged(ss.Delegate.create(this, function(sender, args) {
            if (sender.get_finished()) {
                this._loadLibraryFromJson(sender.get_data());
            }
        }));
    },
    
    _loadLibraryFromJson: function GLSharp_Content_Library$_loadLibraryFromJson(json) {
        /// <param name="json" type="Object">
        /// </param>
        var library = json;
        GLSharp.Core.SystemCore.get_logger().log('Loading library : ' + library.Name);
        var collection = null;
        if ((collection = this._collections[library.Name]) == null) {
            collection = new GLSharp.Content.Collection();
            collection.set_name(library.Name);
            collection.set_resources({});
            this._collections[collection.get_name()] = collection;
        }
        this._appendToCollection(collection, library.ContentObjects);
        if (this.__collectionLoaded != null) {
            this.__collectionLoaded(this, collection);
        }
    },
    
    _appendToCollection: function GLSharp_Content_Library$_appendToCollection(collection, resources) {
        /// <param name="collection" type="GLSharp.Content.Collection">
        /// </param>
        /// <param name="resources" type="Array">
        /// </param>
        var $enum1 = ss.IEnumerator.getEnumerator(resources);
        while ($enum1.moveNext()) {
            var resourceObject = $enum1.current;
            var converter = this._converters[resourceObject.Type];
            if (converter == null) {
                GLSharp.Core.SystemCore.get_logger().log('No resource converter found for resource + ' + resourceObject.Resource);
                continue;
            }
            var res = converter.convert(resourceObject.Resource);
            var item = new GLSharp.Content.ResourceItem();
            item.set_id(resourceObject.Id);
            item.set_type(resourceObject.Type);
            item.set_item(res);
            collection.get_resources()[item.get_id()] = item;
        }
    },
    
    unloadLibrary: function GLSharp_Content_Library$unloadLibrary(name) {
        /// <param name="name" type="String">
        /// </param>
    },
    
    findResource: function GLSharp_Content_Library$findResource(library, resourceName) {
        /// <param name="library" type="String">
        /// </param>
        /// <param name="resourceName" type="String">
        /// </param>
        /// <returns type="GLSharp.Content.Handle"></returns>
        var collection = null;
        if ((collection = this._collections[library]) == null) {
            return null;
        }
        var resource = null;
        if ((resource = collection.get_resources()[resourceName]) == null) {
            return null;
        }
        var ret = new GLSharp.Content.Handle();
        ret.set_library(library);
        ret.set_id(resourceName);
        return ret;
    },
    
    getResource: function GLSharp_Content_Library$getResource(handle) {
        /// <param name="handle" type="GLSharp.Content.Handle">
        /// </param>
        /// <returns type="Object"></returns>
        return this._collections[handle.get_library()].get_resources()[handle.get_id()];
    },
    
    addConverter: function GLSharp_Content_Library$addConverter(converter) {
        /// <param name="converter" type="GLSharp.Content.IResourceConverter">
        /// </param>
        this._converters[converter.get_typeHandled()] = converter;
    },
    
    removeConverter: function GLSharp_Content_Library$removeConverter(converter) {
        /// <param name="converter" type="GLSharp.Content.IResourceConverter">
        /// </param>
        delete this._converters[converter.get_typeHandled()];
    }
}


Type.registerNamespace('GLSharp.Universe');

////////////////////////////////////////////////////////////////////////////////
// GLSharp.Universe.MaterialComponent

GLSharp.Universe.MaterialComponent = function GLSharp_Universe_MaterialComponent() {
    /// <field name="_materialHandle$1" type="GLSharp.Content.Handle">
    /// </field>
    GLSharp.Universe.MaterialComponent.initializeBase(this);
    this._type = 'material';
}
GLSharp.Universe.MaterialComponent.prototype = {
    _materialHandle$1: null,
    
    get_materialHandle: function GLSharp_Universe_MaterialComponent$get_materialHandle() {
        /// <value type="GLSharp.Content.Handle"></value>
        return this._materialHandle$1;
    },
    set_materialHandle: function GLSharp_Universe_MaterialComponent$set_materialHandle(value) {
        /// <value type="GLSharp.Content.Handle"></value>
        this._materialHandle$1 = value;
        return value;
    }
}


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
// GLSharp.Universe.MeshComponent

GLSharp.Universe.MeshComponent = function GLSharp_Universe_MeshComponent() {
    /// <field name="_meshHandle$1" type="GLSharp.Content.Handle">
    /// </field>
    GLSharp.Universe.MeshComponent.initializeBase(this);
    this._type = 'mesh';
}
GLSharp.Universe.MeshComponent.prototype = {
    _meshHandle$1: null,
    
    get_meshHandle: function GLSharp_Universe_MeshComponent$get_meshHandle() {
        /// <value type="GLSharp.Content.Handle"></value>
        return this._meshHandle$1;
    },
    set_meshHandle: function GLSharp_Universe_MeshComponent$set_meshHandle(value) {
        /// <value type="GLSharp.Content.Handle"></value>
        this._meshHandle$1 = value;
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
    /// <field name="__childAdded" type="Function">
    /// </field>
    /// <field name="__childRemoved" type="Function">
    /// </field>
    /// <field name="_components" type="Object">
    /// </field>
    /// <field name="_id" type="String">
    /// </field>
    /// <field name="_matrix4" type="GLSharp.Util.Matrix4X4">
    /// </field>
    /// <field name="_children" type="Object">
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
    
    add_childAdded: function GLSharp_Universe_Node$add_childAdded(value) {
        /// <summary>
        /// Called when a child node is added.
        /// </summary>
        /// <param name="value" type="Function" />
        this.__childAdded = ss.Delegate.combine(this.__childAdded, value);
    },
    remove_childAdded: function GLSharp_Universe_Node$remove_childAdded(value) {
        /// <summary>
        /// Called when a child node is added.
        /// </summary>
        /// <param name="value" type="Function" />
        this.__childAdded = ss.Delegate.remove(this.__childAdded, value);
    },
    
    __childAdded: null,
    
    add_childRemoved: function GLSharp_Universe_Node$add_childRemoved(value) {
        /// <summary>
        /// Called when a child node is removed.
        /// </summary>
        /// <param name="value" type="Function" />
        this.__childRemoved = ss.Delegate.combine(this.__childRemoved, value);
    },
    remove_childRemoved: function GLSharp_Universe_Node$remove_childRemoved(value) {
        /// <summary>
        /// Called when a child node is removed.
        /// </summary>
        /// <param name="value" type="Function" />
        this.__childRemoved = ss.Delegate.remove(this.__childRemoved, value);
    },
    
    __childRemoved: null,
    _id: 'Undefined',
    
    get_id: function GLSharp_Universe_Node$get_id() {
        /// <summary>
        /// The name of the node.
        /// </summary>
        /// <value type="String"></value>
        return this._id;
    },
    set_id: function GLSharp_Universe_Node$set_id(value) {
        /// <summary>
        /// The name of the node.
        /// </summary>
        /// <value type="String"></value>
        this._id = value;
        return value;
    },
    
    _matrix4: null,
    
    get_matrix: function GLSharp_Universe_Node$get_matrix() {
        /// <summary>
        /// A 4x4 transformation matrix.
        /// </summary>
        /// <value type="GLSharp.Util.Matrix4X4"></value>
        return this._matrix4;
    },
    set_matrix: function GLSharp_Universe_Node$set_matrix(value) {
        /// <summary>
        /// A 4x4 transformation matrix.
        /// </summary>
        /// <value type="GLSharp.Util.Matrix4X4"></value>
        this._matrix4 = value;
        return value;
    },
    
    _children: null,
    
    get_children: function GLSharp_Universe_Node$get_children() {
        /// <value type="Object"></value>
        if (this._children == null) {
            this._children = {};
        }
        return this._children;
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
    },
    
    getComponent: function GLSharp_Universe_Node$getComponent(type) {
        /// <param name="type" type="String">
        /// </param>
        /// <returns type="GLSharp.Universe.Component"></returns>
        return this._components[type];
    },
    
    addChild: function GLSharp_Universe_Node$addChild(child) {
        /// <param name="child" type="GLSharp.Universe.Node">
        /// </param>
        if (this._children[child.get_id()] != null) {
            throw new Error('Child with the same name already exists.');
        }
        this._children[child.get_id()] = child;
        if (this.__childAdded != null) {
            this.__childAdded(this, child);
        }
    },
    
    removeChild: function GLSharp_Universe_Node$removeChild(child) {
        /// <param name="child" type="GLSharp.Universe.Node">
        /// </param>
        /// <returns type="Boolean"></returns>
        if (this._children[child.get_id()] == null) {
            return false;
        }
        delete this._children[child.get_id()];
        if (this.__childRemoved != null) {
            this.__childRemoved(this, child);
        }
        return true;
    },
    
    findChild: function GLSharp_Universe_Node$findChild(id, deep) {
        /// <param name="id" type="String">
        /// </param>
        /// <param name="deep" type="Boolean">
        /// </param>
        /// <returns type="GLSharp.Universe.Node"></returns>
        return null;
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


Type.registerNamespace('GLSharp.Util');

////////////////////////////////////////////////////////////////////////////////
// GLSharp.Util.Matrix4X4

GLSharp.Util.Matrix4X4 = function GLSharp_Util_Matrix4X4(elements) {
    /// <param name="elements" type="Array" elementType="Number">
    /// </param>
    /// <field name="_elements" type="Array" elementType="Number">
    /// </field>
    this._elements = (elements == null) ? GLSharp.Core.SystemCore.get_environment().createFloat32Array(16) : GLSharp.Core.SystemCore.get_environment().createFloat32ArrayFromArray(elements);
}
GLSharp.Util.Matrix4X4.prototype = {
    _elements: null,
    
    get_elements: function GLSharp_Util_Matrix4X4$get_elements() {
        /// <value type="Array" elementType="Number"></value>
        return this._elements;
    },
    set_elements: function GLSharp_Util_Matrix4X4$set_elements(value) {
        /// <value type="Array" elementType="Number"></value>
        this._elements = value;
        return value;
    }
}


Type.registerNamespace('GLSharp');

////////////////////////////////////////////////////////////////////////////////
// GLSharp.Engine

GLSharp.Engine = function GLSharp_Engine() {
    /// <field name="_activeGame" type="GLSharp.Game.GameBase">
    /// </field>
}
GLSharp.Engine.prototype = {
    _activeGame: null,
    
    get_activeGame: function GLSharp_Engine$get_activeGame() {
        /// <summary>
        /// Gets or sets the active game.
        /// </summary>
        /// <value type="GLSharp.Game.GameBase"></value>
        return this._activeGame;
    },
    set_activeGame: function GLSharp_Engine$set_activeGame(value) {
        /// <summary>
        /// Gets or sets the active game.
        /// </summary>
        /// <value type="GLSharp.Game.GameBase"></value>
        this._activeGame = value;
        return value;
    },
    
    run: function GLSharp_Engine$run() {
        if (this.get_activeGame() == null) {
            throw new Error('No active game defined.');
        }
        this.get_activeGame().initialize();
    }
}


Type.registerNamespace('GLSharp.Game');

////////////////////////////////////////////////////////////////////////////////
// GLSharp.Game.GameBase

GLSharp.Game.GameBase = function GLSharp_Game_GameBase() {
    /// <field name="_library" type="GLSharp.Content.Library">
    /// </field>
}
GLSharp.Game.GameBase.prototype = {
    _library: null,
    
    get_library: function GLSharp_Game_GameBase$get_library() {
        /// <value type="GLSharp.Content.Library"></value>
        return this._library;
    },
    
    initialize: function GLSharp_Game_GameBase$initialize() {
        this._library = new GLSharp.Content.Library();
        this._library.addConverter(new GLSharp.Content.LightConverter());
        this._library.addConverter(new GLSharp.Content.MeshConverter());
        this._library.addConverter(new GLSharp.Content.NodeConverter());
        this.startup();
    }
}


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


////////////////////////////////////////////////////////////////////////////////
// GLSharp.Graphics.Mesh

GLSharp.Graphics.Mesh = function GLSharp_Graphics_Mesh() {
}


GLSharp.Content.LightItem.registerClass('GLSharp.Content.LightItem');
GLSharp.Content.LightConverter.registerClass('GLSharp.Content.LightConverter', null, GLSharp.Content.IResourceConverter);
GLSharp.Content.MeshItem.registerClass('GLSharp.Content.MeshItem');
GLSharp.Content.MeshConverter.registerClass('GLSharp.Content.MeshConverter', null, GLSharp.Content.IResourceConverter);
GLSharp.Content.NodeConverter.registerClass('GLSharp.Content.NodeConverter', null, GLSharp.Content.IResourceConverter);
GLSharp.Content.Handle.registerClass('GLSharp.Content.Handle');
GLSharp.Content.Collection.registerClass('GLSharp.Content.Collection');
GLSharp.Content.ResourceItem.registerClass('GLSharp.Content.ResourceItem');
GLSharp.Content.Library.registerClass('GLSharp.Content.Library');
GLSharp.Universe.Component.registerClass('GLSharp.Universe.Component');
GLSharp.Universe.MaterialComponent.registerClass('GLSharp.Universe.MaterialComponent', GLSharp.Universe.Component);
GLSharp.Universe.MeshComponent.registerClass('GLSharp.Universe.MeshComponent', GLSharp.Universe.Component);
GLSharp.Universe.Node.registerClass('GLSharp.Universe.Node');
GLSharp.Universe.World.registerClass('GLSharp.Universe.World');
GLSharp.Util.Matrix4X4.registerClass('GLSharp.Util.Matrix4X4');
GLSharp.Engine.registerClass('GLSharp.Engine');
GLSharp.Game.GameBase.registerClass('GLSharp.Game.GameBase');
GLSharp.Graphics.Color.registerClass('GLSharp.Graphics.Color');
GLSharp.Graphics.Material.registerClass('GLSharp.Graphics.Material');
GLSharp.Graphics.Mesh.registerClass('GLSharp.Graphics.Mesh');
})();

//! This script was generated using Script# v0.7.4.0
