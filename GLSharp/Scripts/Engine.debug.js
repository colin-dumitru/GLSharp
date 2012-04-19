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
        ret.set_local(new GLSharp.Util.Matrix4X4(root.Matrix));
        if (root.Children != null) {
            var $enum1 = ss.IEnumerator.getEnumerator(root.Children);
            while ($enum1.moveNext()) {
                var nodeObject = $enum1.current;
                ret.addChild(this._convertNodeObject(nodeObject));
            }
        }
        var compColection = [];
        if (root.References != null) {
            var $enum2 = ss.IEnumerator.getEnumerator(root.References);
            while ($enum2.moveNext()) {
                var referenceObject = $enum2.current;
                this._convertReferences(referenceObject, compColection);
            }
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
// GLSharp.Universe.ComponentCollection

GLSharp.Universe.ComponentCollection = function GLSharp_Universe_ComponentCollection() {
    /// <summary>
    /// Manages a collection of components.
    /// </summary>
    /// <field name="_components" type="Object">
    /// </field>
    /// <field name="_knownTypes" type="Array">
    /// </field>
    this._components = {};
    this._knownTypes = [];
}
GLSharp.Universe.ComponentCollection.prototype = {
    
    addKnownType: function GLSharp_Universe_ComponentCollection$addKnownType(type) {
        /// <param name="type" type="String">
        /// </param>
        this._knownTypes.add(type);
    },
    
    removeKnowType: function GLSharp_Universe_ComponentCollection$removeKnowType(type) {
        /// <param name="type" type="String">
        /// </param>
        this._knownTypes.remove(type);
        delete this._components[type];
    },
    
    addComponent: function GLSharp_Universe_ComponentCollection$addComponent(component) {
        /// <summary>
        /// Adds a component to the collection. If the component is not a known type
        /// it is ignored.
        /// </summary>
        /// <param name="component" type="GLSharp.Universe.Component">
        /// The component to add.
        /// </param>
        /// <returns type="Boolean"></returns>
        if (!this._knownTypes.contains(component.get_type())) {
            return false;
        }
        this._components[component.get_type()].add(component);
        return true;
    },
    
    removeComponent: function GLSharp_Universe_ComponentCollection$removeComponent(component) {
        /// <summary>
        /// Removes a component to the collection. If the component is not a known type
        /// it is ignored.
        /// </summary>
        /// <param name="component" type="GLSharp.Universe.Component">
        /// The component to remove.
        /// </param>
        /// <returns type="Boolean"></returns>
        if (!this._knownTypes.contains(component.get_type())) {
            return false;
        }
        return this._components[component.get_type()].remove(component);
    },
    
    getCollection: function GLSharp_Universe_ComponentCollection$getCollection(type) {
        /// <param name="type" type="String">
        /// </param>
        /// <returns type="Array"></returns>
        if (!this._knownTypes.contains(type)) {
            return null;
        }
        return this._components[type];
    }
}


////////////////////////////////////////////////////////////////////////////////
// GLSharp.Universe.Component

GLSharp.Universe.Component = function GLSharp_Universe_Component() {
    /// <field name="meshComponent" type="String" static="true">
    /// </field>
    /// <field name="materialComponent" type="String" static="true">
    /// </field>
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
    /// <field name="__transformChanged" type="Function">
    /// </field>
    /// <field name="_components" type="Object">
    /// </field>
    /// <field name="_id" type="String">
    /// </field>
    /// <field name="_cachedTransformation" type="GLSharp.Util.Matrix4X4">
    /// </field>
    /// <field name="_needWordUpdate" type="Boolean">
    /// </field>
    /// <field name="_localTransformation" type="GLSharp.Util.Matrix4X4">
    /// </field>
    /// <field name="_localTranslation" type="GLSharp.Util.Vector3">
    /// </field>
    /// <field name="_localRotation" type="GLSharp.Util.Vector3">
    /// </field>
    /// <field name="_localScale" type="GLSharp.Util.Vector3">
    /// </field>
    /// <field name="_children" type="Object">
    /// </field>
    /// <field name="_parent" type="GLSharp.Universe.Node">
    /// </field>
    this._components = {};
    this._needWordUpdate = true;
    this._localTransformation = GLSharp.Util.Matrix4X4.get_identity().clone();
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
    
    add_transformChanged: function GLSharp_Universe_Node$add_transformChanged(value) {
        /// <summary>
        /// Called when the node transformation has changed.
        /// </summary>
        /// <param name="value" type="Function" />
        this.__transformChanged = ss.Delegate.combine(this.__transformChanged, value);
    },
    remove_transformChanged: function GLSharp_Universe_Node$remove_transformChanged(value) {
        /// <summary>
        /// Called when the node transformation has changed.
        /// </summary>
        /// <param name="value" type="Function" />
        this.__transformChanged = ss.Delegate.remove(this.__transformChanged, value);
    },
    
    __transformChanged: null,
    
    get_components: function GLSharp_Universe_Node$get_components() {
        /// <value type="Object"></value>
        return this._components;
    },
    
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
    
    _cachedTransformation: null,
    _needWordUpdate: false,
    
    get_world: function GLSharp_Universe_Node$get_world() {
        /// <value type="GLSharp.Util.Matrix4X4"></value>
        if (this._needWordUpdate) {
            this._updateWorldTransformation();
        }
        return this._cachedTransformation;
    },
    
    _localTransformation: null,
    
    get_local: function GLSharp_Universe_Node$get_local() {
        /// <summary>
        /// Local transformation matrix.
        /// </summary>
        /// <value type="GLSharp.Util.Matrix4X4"></value>
        return this._localTransformation;
    },
    set_local: function GLSharp_Universe_Node$set_local(value) {
        /// <summary>
        /// Local transformation matrix.
        /// </summary>
        /// <value type="GLSharp.Util.Matrix4X4"></value>
        this._localTransformation = value;
        return value;
    },
    
    _localTranslation: null,
    
    get_localTranslation: function GLSharp_Universe_Node$get_localTranslation() {
        /// <summary>
        /// Local translation.
        /// </summary>
        /// <value type="GLSharp.Util.Vector3"></value>
        return this._localTranslation;
    },
    
    _localRotation: null,
    
    get_localRotation: function GLSharp_Universe_Node$get_localRotation() {
        /// <summary>
        /// Local Rotation.
        /// </summary>
        /// <value type="GLSharp.Util.Vector3"></value>
        return this._localRotation;
    },
    set_localRotation: function GLSharp_Universe_Node$set_localRotation(value) {
        /// <summary>
        /// Local Rotation.
        /// </summary>
        /// <value type="GLSharp.Util.Vector3"></value>
        this._localRotation = value;
        return value;
    },
    
    _localScale: null,
    
    get_localScale: function GLSharp_Universe_Node$get_localScale() {
        /// <summary>
        /// Local Scale.
        /// </summary>
        /// <value type="GLSharp.Util.Vector3"></value>
        return this._localScale;
    },
    set_localScale: function GLSharp_Universe_Node$set_localScale(value) {
        /// <summary>
        /// Local Scale.
        /// </summary>
        /// <value type="GLSharp.Util.Vector3"></value>
        this._localScale = value;
        return value;
    },
    
    _children: null,
    
    get_children: function GLSharp_Universe_Node$get_children() {
        /// <summary>
        /// Child nodes.
        /// </summary>
        /// <value type="Object"></value>
        if (this._children == null) {
            this._children = {};
        }
        return this._children;
    },
    
    _parent: null,
    
    get_parent: function GLSharp_Universe_Node$get_parent() {
        /// <summary>
        /// Parent node.
        /// </summary>
        /// <value type="GLSharp.Universe.Node"></value>
        return this._parent;
    },
    set_parent: function GLSharp_Universe_Node$set_parent(value) {
        /// <summary>
        /// Parent node.
        /// </summary>
        /// <value type="GLSharp.Universe.Node"></value>
        this._parent = value;
        return value;
    },
    
    _updateWorldTransformation: function GLSharp_Universe_Node$_updateWorldTransformation() {
        this._cachedTransformation = this.get_parent().get_world().clone().multiplyAffineM(this._cachedTransformation);
        this._needWordUpdate = false;
    },
    
    invalidateWorldTransformation: function GLSharp_Universe_Node$invalidateWorldTransformation() {
        this._needWordUpdate = true;
        var $dict1 = this.get_children();
        for (var $key2 in $dict1) {
            var keyValuePair = { key: $key2, value: $dict1[$key2] };
            keyValuePair.value.invalidateWorldTransformation();
        }
    },
    
    addComponent: function GLSharp_Universe_Node$addComponent(component) {
        /// <param name="component" type="GLSharp.Universe.Component">
        /// </param>
        component.set_parent(this);
        this._components[component.get_type()] = component;
        if (this.__componentAdded != null) {
            this.__componentAdded(this, component);
        }
    },
    
    removeComponent: function GLSharp_Universe_Node$removeComponent(component) {
        /// <param name="component" type="GLSharp.Universe.Component">
        /// </param>
        component.set_parent(null);
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
        child.set_parent(this);
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
        child.set_parent(null);
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
    },
    
    translate: function GLSharp_Universe_Node$translate(distance) {
        /// <param name="distance" type="GLSharp.Util.Vector3">
        /// </param>
        this._localTranslation.add(distance);
        this._localTransformation.translate(distance);
        this.invalidateWorldTransformation();
        if (this.__transformChanged != null) {
            this.__transformChanged(this, null);
        }
    },
    
    rotate: function GLSharp_Universe_Node$rotate(angle, axis) {
        /// <param name="angle" type="Number">
        /// </param>
        /// <param name="axis" type="GLSharp.Util.Vector3">
        /// </param>
        this._localRotation.add(axis.clone().scale(angle));
        this._localTransformation.rotate(angle, axis);
        this.invalidateWorldTransformation();
        if (this.__transformChanged != null) {
            this.__transformChanged(this, null);
        }
    },
    
    scale: function GLSharp_Universe_Node$scale(scale) {
        /// <param name="scale" type="GLSharp.Util.Vector3">
        /// </param>
        this._localScale.add(scale);
        this._localTransformation.scale(scale);
        this.invalidateWorldTransformation();
        if (this.__transformChanged != null) {
            this.__transformChanged(this, null);
        }
    }
}


////////////////////////////////////////////////////////////////////////////////
// GLSharp.Universe.World

GLSharp.Universe.World = function GLSharp_Universe_World(cellsX, cellsY, cellWidth, cellHeight) {
    /// <param name="cellsX" type="Number" integer="true">
    /// </param>
    /// <param name="cellsY" type="Number" integer="true">
    /// </param>
    /// <param name="cellWidth" type="Number">
    /// </param>
    /// <param name="cellHeight" type="Number">
    /// </param>
    /// <field name="__nodeAdded" type="Function">
    /// </field>
    /// <field name="__nodeRemoved" type="Function">
    /// </field>
    this.reset();
}
GLSharp.Universe.World.prototype = {
    
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
    
    reset: function GLSharp_Universe_World$reset() {
    },
    
    addNode: function GLSharp_Universe_World$addNode(node) {
        /// <param name="node" type="GLSharp.Universe.Node">
        /// </param>
        if (this.__nodeAdded != null) {
            this.__nodeAdded(this, node);
        }
    },
    
    addDynamicNode: function GLSharp_Universe_World$addDynamicNode(node) {
        /// <param name="node" type="GLSharp.Universe.Node">
        /// </param>
    },
    
    removeNode: function GLSharp_Universe_World$removeNode(node) {
        /// <param name="node" type="GLSharp.Universe.Node">
        /// </param>
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
    /// <field name="_identity" type="GLSharp.Util.Matrix4X4" static="true">
    /// </field>
    /// <field name="_elements" type="Array" elementType="Number">
    /// </field>
    this._elements = (elements == null) ? GLSharp.Core.SystemCore.get_environment().createFloat32Array(16) : GLSharp.Core.SystemCore.get_environment().createFloat32ArrayFromArray(elements);
}
GLSharp.Util.Matrix4X4.get_identity = function GLSharp_Util_Matrix4X4$get_identity() {
    /// <value type="GLSharp.Util.Matrix4X4"></value>
    return GLSharp.Util.Matrix4X4._identity || (GLSharp.Util.Matrix4X4._identity = new GLSharp.Util.Matrix4X4([ 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1 ]));
}
GLSharp.Util.Matrix4X4.makeFrustrum = function GLSharp_Util_Matrix4X4$makeFrustrum(left, right, bottom, top, znear, zfar) {
    /// <param name="left" type="Number">
    /// </param>
    /// <param name="right" type="Number">
    /// </param>
    /// <param name="bottom" type="Number">
    /// </param>
    /// <param name="top" type="Number">
    /// </param>
    /// <param name="znear" type="Number">
    /// </param>
    /// <param name="zfar" type="Number">
    /// </param>
    /// <returns type="GLSharp.Util.Matrix4X4"></returns>
    var ret = new GLSharp.Util.Matrix4X4(null);
    ret._elements[0] = 2 * znear / (right - left);
    ret._elements[1] = 0;
    ret._elements[2] = 0;
    ret._elements[3] = 0;
    ret._elements[4] = 0;
    ret._elements[5] = 2 * znear / (top - bottom);
    ret._elements[6] = 0;
    ret._elements[7] = 0;
    ret._elements[8] = (right + left) / (right - left);
    ret._elements[9] = (top + bottom) / (top - bottom);
    ret._elements[10] = -(zfar + znear) / (zfar - znear);
    ret._elements[11] = -1;
    ret._elements[12] = 0;
    ret._elements[13] = 0;
    ret._elements[14] = -2 * zfar * znear / (zfar - znear);
    ret._elements[15] = 0;
    return ret;
}
GLSharp.Util.Matrix4X4.makePerspective = function GLSharp_Util_Matrix4X4$makePerspective(fov, aspect, znear, zfar) {
    /// <param name="fov" type="Number">
    /// </param>
    /// <param name="aspect" type="Number">
    /// </param>
    /// <param name="znear" type="Number">
    /// </param>
    /// <param name="zfar" type="Number">
    /// </param>
    /// <returns type="GLSharp.Util.Matrix4X4"></returns>
    var ymax = znear * Math.tan(fov * Math.PI / 360);
    var ymin = -ymax;
    var xmin = ymin * aspect;
    var xmax = ymax * aspect;
    return GLSharp.Util.Matrix4X4.makeFrustrum(xmin, xmax, ymin, ymax, znear, zfar);
}
GLSharp.Util.Matrix4X4.makeOrtho = function GLSharp_Util_Matrix4X4$makeOrtho(left, right, bottom, top, znear, zfar) {
    /// <param name="left" type="Number">
    /// </param>
    /// <param name="right" type="Number">
    /// </param>
    /// <param name="bottom" type="Number">
    /// </param>
    /// <param name="top" type="Number">
    /// </param>
    /// <param name="znear" type="Number">
    /// </param>
    /// <param name="zfar" type="Number">
    /// </param>
    /// <returns type="GLSharp.Util.Matrix4X4"></returns>
    var ret = new GLSharp.Util.Matrix4X4(null);
    ret._elements[0] = 2 / (right - left);
    ret._elements[1] = 0;
    ret._elements[2] = 0;
    ret._elements[3] = 0;
    ret._elements[4] = 0;
    ret._elements[5] = 2 / (top - bottom);
    ret._elements[6] = 0;
    ret._elements[7] = 0;
    ret._elements[8] = 0;
    ret._elements[9] = 0;
    ret._elements[10] = -2 / (zfar - znear);
    ret._elements[11] = 0;
    ret._elements[12] = -(right + left) / (right - left);
    ret._elements[13] = -(top + bottom) / (top - bottom);
    ret._elements[14] = -(zfar + znear) / (zfar - znear);
    ret._elements[15] = 1;
    return ret;
}
GLSharp.Util.Matrix4X4.makeLookAt = function GLSharp_Util_Matrix4X4$makeLookAt(eye, center, up) {
    /// <param name="eye" type="GLSharp.Util.Vector3">
    /// </param>
    /// <param name="center" type="GLSharp.Util.Vector3">
    /// </param>
    /// <param name="up" type="GLSharp.Util.Vector3">
    /// </param>
    /// <returns type="GLSharp.Util.Matrix4X4"></returns>
    var ret = new GLSharp.Util.Matrix4X4(null);
    var z = eye.direction(center);
    var x = up.clone().cross(z).normalize();
    var y = z.clone().cross(x).normalize();
    ret._elements[0] = x._elements[0];
    ret._elements[1] = y._elements[0];
    ret._elements[2] = z._elements[0];
    ret._elements[3] = 0;
    ret._elements[4] = x._elements[1];
    ret._elements[5] = y._elements[1];
    ret._elements[6] = z._elements[1];
    ret._elements[7] = 0;
    ret._elements[8] = x._elements[2];
    ret._elements[9] = y._elements[2];
    ret._elements[10] = z._elements[2];
    ret._elements[11] = 0;
    ret._elements[12] = 0;
    ret._elements[13] = 0;
    ret._elements[14] = 0;
    ret._elements[15] = 1;
    var tmp = new GLSharp.Util.Matrix4X4(null);
    tmp._elements[0] = 1;
    tmp._elements[1] = 0;
    tmp._elements[2] = 0;
    tmp._elements[3] = 0;
    tmp._elements[4] = 0;
    tmp._elements[5] = 1;
    tmp._elements[6] = 0;
    tmp._elements[7] = 0;
    tmp._elements[8] = 0;
    tmp._elements[9] = 0;
    tmp._elements[10] = 1;
    tmp._elements[11] = 0;
    tmp._elements[12] = -eye._elements[0];
    tmp._elements[13] = -eye._elements[1];
    tmp._elements[14] = -eye._elements[2];
    tmp._elements[15] = 1;
    return ret.multiplyAffineM(tmp);
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
    },
    
    multiplyM: function GLSharp_Util_Matrix4X4$multiplyM(other) {
        /// <param name="other" type="GLSharp.Util.Matrix4X4">
        /// </param>
        /// <returns type="GLSharp.Util.Matrix4X4"></returns>
        var newe = GLSharp.Core.SystemCore.get_environment().createFloat32Array(16);
        newe[0] = this._elements[0] * other._elements[0] + this._elements[4] * other._elements[1] + this._elements[8] * other._elements[2] + this._elements[12] * other._elements[3];
        newe[1] = this._elements[1] * other._elements[0] + this._elements[5] * other._elements[1] + this._elements[9] * other._elements[2] + this._elements[13] * other._elements[3];
        newe[2] = this._elements[2] * other._elements[0] + this._elements[6] * other._elements[1] + this._elements[10] * other._elements[2] + this._elements[14] * other._elements[3];
        newe[3] = this._elements[3] * other._elements[0] + this._elements[7] * other._elements[1] + this._elements[11] * other._elements[2] + this._elements[15] * other._elements[3];
        newe[4] = this._elements[0] * other._elements[4] + this._elements[4] * other._elements[5] + this._elements[8] * other._elements[6] + this._elements[12] * other._elements[7];
        newe[5] = this._elements[1] * other._elements[4] + this._elements[5] * other._elements[5] + this._elements[9] * other._elements[6] + this._elements[13] * other._elements[7];
        newe[6] = this._elements[2] * other._elements[4] + this._elements[6] * other._elements[5] + this._elements[10] * other._elements[6] + this._elements[14] * other._elements[7];
        newe[7] = this._elements[3] * other._elements[4] + this._elements[7] * other._elements[5] + this._elements[11] * other._elements[6] + this._elements[15] * other._elements[7];
        newe[8] = this._elements[0] * other._elements[8] + this._elements[4] * other._elements[9] + this._elements[8] * other._elements[10] + this._elements[12] * other._elements[11];
        newe[9] = this._elements[1] * other._elements[8] + this._elements[5] * other._elements[9] + this._elements[9] * other._elements[10] + this._elements[13] * other._elements[11];
        newe[10] = this._elements[2] * other._elements[8] + this._elements[6] * other._elements[9] + this._elements[10] * other._elements[10] + this._elements[14] * other._elements[11];
        newe[11] = this._elements[3] * other._elements[8] + this._elements[7] * other._elements[9] + this._elements[11] * other._elements[10] + this._elements[15] * other._elements[11];
        newe[12] = this._elements[0] * other._elements[12] + this._elements[4] * other._elements[13] + this._elements[8] * other._elements[14] + this._elements[12] * other._elements[15];
        newe[13] = this._elements[1] * other._elements[12] + this._elements[5] * other._elements[13] + this._elements[9] * other._elements[14] + this._elements[13] * other._elements[15];
        newe[14] = this._elements[2] * other._elements[12] + this._elements[6] * other._elements[13] + this._elements[10] * other._elements[14] + this._elements[14] * other._elements[15];
        newe[15] = this._elements[3] * other._elements[12] + this._elements[7] * other._elements[13] + this._elements[11] * other._elements[14] + this._elements[15] * other._elements[15];
        this._elements = newe;
        return this;
    },
    
    multiplyAffineM: function GLSharp_Util_Matrix4X4$multiplyAffineM(other) {
        /// <param name="other" type="GLSharp.Util.Matrix4X4">
        /// </param>
        /// <returns type="GLSharp.Util.Matrix4X4"></returns>
        var newe = GLSharp.Core.SystemCore.get_environment().createFloat32Array(16);
        newe[0] = this._elements[0] * other._elements[0] + this._elements[4] * other._elements[1] + this._elements[8] * other._elements[2];
        newe[1] = this._elements[1] * other._elements[0] + this._elements[5] * other._elements[1] + this._elements[9] * other._elements[2];
        newe[2] = this._elements[2] * other._elements[0] + this._elements[6] * other._elements[1] + this._elements[10] * other._elements[2];
        newe[3] = 0;
        newe[4] = this._elements[0] * other._elements[4] + this._elements[4] * other._elements[5] + this._elements[8] * other._elements[6];
        newe[5] = this._elements[1] * other._elements[4] + this._elements[5] * other._elements[5] + this._elements[9] * other._elements[6];
        newe[6] = this._elements[2] * other._elements[4] + this._elements[6] * other._elements[5] + this._elements[10] * other._elements[6];
        newe[7] = 0;
        newe[8] = this._elements[0] * other._elements[8] + this._elements[4] * other._elements[9] + this._elements[8] * other._elements[10];
        newe[9] = this._elements[1] * other._elements[8] + this._elements[5] * other._elements[9] + this._elements[9] * other._elements[10];
        newe[10] = this._elements[2] * other._elements[8] + this._elements[6] * other._elements[9] + this._elements[10] * other._elements[10];
        newe[11] = 0;
        newe[12] = this._elements[0] * other._elements[12] + this._elements[4] * other._elements[13] + this._elements[8] * other._elements[14] + this._elements[12];
        newe[13] = this._elements[1] * other._elements[12] + this._elements[5] * other._elements[13] + this._elements[9] * other._elements[14] + this._elements[13];
        newe[14] = this._elements[2] * other._elements[12] + this._elements[6] * other._elements[13] + this._elements[10] * other._elements[14] + this._elements[14];
        newe[15] = 1;
        this._elements = newe;
        return this;
    },
    
    rotate: function GLSharp_Util_Matrix4X4$rotate(angle, axis) {
        /// <param name="angle" type="Number">
        /// </param>
        /// <param name="axis" type="GLSharp.Util.Vector3">
        /// </param>
        /// <returns type="GLSharp.Util.Matrix4X4"></returns>
        var c = Math.cos(angle);
        var c1 = 1 - c;
        var s = Math.cos(angle);
        var xs = axis._elements[0] * s;
        var ys = axis._elements[1] * s;
        var zs = axis._elements[2] * s;
        var xyc1 = axis._elements[0] * axis._elements[1] * c1;
        var xzc1 = axis._elements[0] * axis._elements[2] * c1;
        var yzc1 = axis._elements[1] * axis._elements[2] * c1;
        var t11 = axis._elements[0] * axis._elements[0] * c1 + c;
        var t21 = xyc1 + zs;
        var t31 = xzc1 - ys;
        var t12 = xyc1 - zs;
        var t22 = axis._elements[1] * axis._elements[1] * c1 + c;
        var t32 = yzc1 + xs;
        var t13 = xzc1 + ys;
        var t23 = yzc1 - xs;
        var t33 = axis._elements[2] * axis._elements[2] * c1 + c;
        var aux = new GLSharp.Util.Matrix4X4(null);
        aux._elements[0] = this._elements[0] * t11 + this._elements[4] * t21 + this._elements[8] * t31;
        aux._elements[1] = this._elements[1] * t11 + this._elements[5] * t21 + this._elements[9] * t31;
        aux._elements[2] = this._elements[2] * t11 + this._elements[6] * t21 + this._elements[10] * t31;
        aux._elements[3] = this._elements[3] * t11 + this._elements[7] * t21 + this._elements[11] * t31;
        aux._elements[4] = this._elements[0] * t12 + this._elements[4] * t22 + this._elements[8] * t32;
        aux._elements[5] = this._elements[1] * t12 + this._elements[5] * t22 + this._elements[9] * t32;
        aux._elements[6] = this._elements[2] * t12 + this._elements[6] * t22 + this._elements[10] * t32;
        aux._elements[7] = this._elements[3] * t12 + this._elements[7] * t22 + this._elements[11] * t32;
        aux._elements[8] = this._elements[0] * t13 + this._elements[4] * t23 + this._elements[8] * t33;
        aux._elements[9] = this._elements[1] * t13 + this._elements[5] * t23 + this._elements[9] * t33;
        aux._elements[10] = this._elements[2] * t13 + this._elements[6] * t23 + this._elements[10] * t33;
        aux._elements[11] = this._elements[3] * t13 + this._elements[7] * t23 + this._elements[11] * t33;
        this._elements = aux._elements;
        return this;
    },
    
    scale: function GLSharp_Util_Matrix4X4$scale(scale) {
        /// <param name="scale" type="GLSharp.Util.Vector3">
        /// </param>
        /// <returns type="GLSharp.Util.Matrix4X4"></returns>
        this._elements[0] = this._elements[0] * scale._elements[0];
        this._elements[1] = this._elements[1] * scale._elements[0];
        this._elements[2] = this._elements[2] * scale._elements[0];
        this._elements[3] = this._elements[3] * scale._elements[0];
        this._elements[4] = this._elements[4] * scale._elements[1];
        this._elements[5] = this._elements[5] * scale._elements[1];
        this._elements[6] = this._elements[6] * scale._elements[1];
        this._elements[7] = this._elements[7] * scale._elements[1];
        this._elements[8] = this._elements[8] * scale._elements[2];
        this._elements[9] = this._elements[9] * scale._elements[2];
        this._elements[10] = this._elements[10] * scale._elements[2];
        this._elements[11] = this._elements[11] * scale._elements[2];
        this._elements[12] = this._elements[12];
        this._elements[13] = this._elements[13];
        this._elements[14] = this._elements[14];
        this._elements[15] = this._elements[15];
        return this;
    },
    
    translate: function GLSharp_Util_Matrix4X4$translate(distance) {
        /// <param name="distance" type="GLSharp.Util.Vector3">
        /// </param>
        /// <returns type="GLSharp.Util.Matrix4X4"></returns>
        this._elements[12] += this._elements[0] * distance._elements[0] + this._elements[4] * distance._elements[1] + this._elements[8] * distance._elements[2];
        this._elements[13] += this._elements[1] * distance._elements[0] + this._elements[5] * distance._elements[1] + this._elements[9] * distance._elements[2];
        this._elements[14] += this._elements[2] * distance._elements[0] + this._elements[6] * distance._elements[1] + this._elements[10] * distance._elements[2];
        this._elements[15] += this._elements[3] * distance._elements[0] + this._elements[7] * distance._elements[1] + this._elements[11] * distance._elements[2];
        return this;
    },
    
    transpose: function GLSharp_Util_Matrix4X4$transpose() {
        /// <returns type="GLSharp.Util.Matrix4X4"></returns>
        var tmp = this._elements[1];
        this._elements[1] = this._elements[4];
        this._elements[4] = tmp;
        tmp = this._elements[2];
        this._elements[2] = this._elements[8];
        this._elements[8] = tmp;
        tmp = this._elements[3];
        this._elements[3] = this._elements[12];
        this._elements[12] = tmp;
        tmp = this._elements[6];
        this._elements[6] = this._elements[9];
        this._elements[9] = tmp;
        tmp = this._elements[7];
        this._elements[7] = this._elements[13];
        this._elements[13] = tmp;
        tmp = this._elements[11];
        this._elements[11] = this._elements[14];
        this._elements[14] = tmp;
        return this;
    },
    
    clone: function GLSharp_Util_Matrix4X4$clone() {
        /// <returns type="GLSharp.Util.Matrix4X4"></returns>
        return new GLSharp.Util.Matrix4X4(this._elements);
    }
}


////////////////////////////////////////////////////////////////////////////////
// GLSharp.Util.Vector3

GLSharp.Util.Vector3 = function GLSharp_Util_Vector3(elements) {
    /// <param name="elements" type="Array" elementType="Number">
    /// </param>
    /// <field name="_elements" type="Array" elementType="Number">
    /// </field>
    this._elements = (elements == null) ? GLSharp.Core.SystemCore.get_environment().createFloat32Array(3) : GLSharp.Core.SystemCore.get_environment().createFloat32ArrayFromArray(elements);
}
GLSharp.Util.Vector3.prototype = {
    _elements: null,
    
    get_elements: function GLSharp_Util_Vector3$get_elements() {
        /// <value type="Array" elementType="Number"></value>
        return this._elements;
    },
    set_elements: function GLSharp_Util_Vector3$set_elements(value) {
        /// <value type="Array" elementType="Number"></value>
        this._elements = value;
        return value;
    },
    
    add: function GLSharp_Util_Vector3$add(other) {
        /// <param name="other" type="GLSharp.Util.Vector3">
        /// </param>
        /// <returns type="GLSharp.Util.Vector3"></returns>
        this._elements[0] += other._elements[0];
        this._elements[1] += other._elements[1];
        this._elements[2] += other._elements[2];
        return this;
    },
    
    subtract: function GLSharp_Util_Vector3$subtract(other) {
        /// <param name="other" type="GLSharp.Util.Vector3">
        /// </param>
        /// <returns type="GLSharp.Util.Vector3"></returns>
        this._elements[0] -= other._elements[0];
        this._elements[1] -= other._elements[1];
        this._elements[2] -= other._elements[2];
        return this;
    },
    
    direction: function GLSharp_Util_Vector3$direction(to) {
        /// <param name="to" type="GLSharp.Util.Vector3">
        /// </param>
        /// <returns type="GLSharp.Util.Vector3"></returns>
        return this.clone().subtract(to).normalize();
    },
    
    length: function GLSharp_Util_Vector3$length() {
        /// <returns type="Number" integer="true"></returns>
        return Math.sqrt(this._elements[0] * this._elements[0] + this._elements[1] * this._elements[1] + this._elements[2] * this._elements[2]);
    },
    
    normalize: function GLSharp_Util_Vector3$normalize() {
        /// <returns type="GLSharp.Util.Vector3"></returns>
        var len = 1 / this.length();
        this._elements[0] *= len;
        this._elements[1] *= len;
        this._elements[2] *= len;
        return this;
    },
    
    scale: function GLSharp_Util_Vector3$scale(val) {
        /// <param name="val" type="Number">
        /// </param>
        /// <returns type="GLSharp.Util.Vector3"></returns>
        this._elements[0] *= val;
        this._elements[1] *= val;
        this._elements[2] *= val;
        return this;
    },
    
    dot: function GLSharp_Util_Vector3$dot(other) {
        /// <param name="other" type="GLSharp.Util.Vector3">
        /// </param>
        /// <returns type="Number"></returns>
        return this._elements[0] * other._elements[0] + this._elements[1] * other._elements[1] + this._elements[2] * other._elements[2];
    },
    
    cross: function GLSharp_Util_Vector3$cross(other) {
        /// <param name="other" type="GLSharp.Util.Vector3">
        /// </param>
        /// <returns type="GLSharp.Util.Vector3"></returns>
        var aux = new GLSharp.Util.Vector3(null);
        aux._elements[0] = this._elements[1] * other._elements[2] - this._elements[2] * other._elements[1];
        aux._elements[1] = this._elements[2] * other._elements[0] - this._elements[0] * other._elements[2];
        aux._elements[2] = this._elements[0] * other._elements[1] - this._elements[1] * other._elements[0];
        this._elements = aux._elements;
        return this;
    },
    
    clone: function GLSharp_Util_Vector3$clone() {
        /// <returns type="GLSharp.Util.Vector3"></returns>
        return new GLSharp.Util.Vector3(this._elements);
    }
}


Type.registerNamespace('GLSharp');

////////////////////////////////////////////////////////////////////////////////
// GLSharp.Engine

GLSharp.Engine = function GLSharp_Engine() {
    /// <field name="_renderHandle" type="GLSharp.Core.TimerHandle">
    /// </field>
    /// <field name="_activeGame" type="GLSharp.Game.GameBase">
    /// </field>
    /// <field name="_activeWorld" type="GLSharp.Universe.World">
    /// </field>
    /// <field name="_graphics" type="GLSharp.Graphics.IGraphics">
    /// </field>
    /// <field name="_library" type="GLSharp.Content.Library">
    /// </field>
}
GLSharp.Engine.prototype = {
    _renderHandle: null,
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
        this._activeGame.set_engine(this);
        return value;
    },
    
    _activeWorld: null,
    
    get_world: function GLSharp_Engine$get_world() {
        /// <summary>
        /// Gets or sets the active world which will be rendered.
        /// </summary>
        /// <value type="GLSharp.Universe.World"></value>
        return this._activeWorld;
    },
    set_world: function GLSharp_Engine$set_world(value) {
        /// <summary>
        /// Gets or sets the active world which will be rendered.
        /// </summary>
        /// <value type="GLSharp.Universe.World"></value>
        this._activeWorld = value;
        return value;
    },
    
    _graphics: null,
    
    get_graphics: function GLSharp_Engine$get_graphics() {
        /// <summary>
        /// Gets or sets the graphics object which renders the scene.
        /// </summary>
        /// <value type="GLSharp.Graphics.IGraphics"></value>
        return this._graphics;
    },
    set_graphics: function GLSharp_Engine$set_graphics(value) {
        /// <summary>
        /// Gets or sets the graphics object which renders the scene.
        /// </summary>
        /// <value type="GLSharp.Graphics.IGraphics"></value>
        this._graphics = value;
        return value;
    },
    
    _library: null,
    
    get_library: function GLSharp_Engine$get_library() {
        /// <summary>
        /// Gets or sets the library.
        /// </summary>
        /// <value type="GLSharp.Content.Library"></value>
        return this._library;
    },
    set_library: function GLSharp_Engine$set_library(value) {
        /// <summary>
        /// Gets or sets the library.
        /// </summary>
        /// <value type="GLSharp.Content.Library"></value>
        this._library = value;
        return value;
    },
    
    run: function GLSharp_Engine$run() {
        this._initDebug();
        if (this.get_activeGame() == null) {
            throw new Error('No active game defined.');
        }
        this._renderHandle = GLSharp.Core.SystemCore.get_timer().start(ss.Delegate.create(this.get_graphics(), this.get_graphics().render), 1000 / 60, true);
        this.get_graphics().initialize();
        this.get_activeGame().initialize();
    },
    
    _initDebug: function GLSharp_Engine$_initDebug() {
        GLSharp.Core.SystemCore.get_logger().log('warning : debug is enabled.');
    }
}


Type.registerNamespace('GLSharp.Game');

////////////////////////////////////////////////////////////////////////////////
// GLSharp.Game.GameBase

GLSharp.Game.GameBase = function GLSharp_Game_GameBase() {
    /// <field name="_engine" type="GLSharp.Engine">
    /// </field>
}
GLSharp.Game.GameBase.prototype = {
    _engine: null,
    
    get_engine: function GLSharp_Game_GameBase$get_engine() {
        /// <value type="GLSharp.Engine"></value>
        return this._engine;
    },
    set_engine: function GLSharp_Game_GameBase$set_engine(value) {
        /// <value type="GLSharp.Engine"></value>
        this._engine = value;
        return value;
    },
    
    initialize: function GLSharp_Game_GameBase$initialize() {
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
    initialize : null,
    clear : null,
    render : null
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
GLSharp.Universe.ComponentCollection.registerClass('GLSharp.Universe.ComponentCollection');
GLSharp.Universe.MeshComponent.registerClass('GLSharp.Universe.MeshComponent', GLSharp.Universe.Component);
GLSharp.Universe.Node.registerClass('GLSharp.Universe.Node');
GLSharp.Universe.World.registerClass('GLSharp.Universe.World');
GLSharp.Util.Matrix4X4.registerClass('GLSharp.Util.Matrix4X4');
GLSharp.Util.Vector3.registerClass('GLSharp.Util.Vector3');
GLSharp.Engine.registerClass('GLSharp.Engine');
GLSharp.Game.GameBase.registerClass('GLSharp.Game.GameBase');
GLSharp.Graphics.Color.registerClass('GLSharp.Graphics.Color');
GLSharp.Graphics.Material.registerClass('GLSharp.Graphics.Material');
GLSharp.Graphics.Mesh.registerClass('GLSharp.Graphics.Mesh');
GLSharp.Universe.Component.meshComponent = 'mesh';
GLSharp.Universe.Component.materialComponent = 'material';
GLSharp.Util.Matrix4X4._identity = null;
})();

//! This script was generated using Script# v0.7.4.0
