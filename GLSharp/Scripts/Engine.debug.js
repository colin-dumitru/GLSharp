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
    /// <field name="lightType" type="Number" integer="true">
    /// </field>
    /// <field name="properties" type="Object">
    /// </field>
    GLSharp.Content.LightItem.initializeBase(this);
}
GLSharp.Content.LightItem.prototype = {
    lightType: 0,
    properties: null,
    
    free: function GLSharp_Content_LightItem$free() {
        /// <returns type="Boolean"></returns>
        this.alocated = false;
        return true;
    },
    
    readlocate: function GLSharp_Content_LightItem$readlocate() {
        /// <returns type="Boolean"></returns>
        this.alocated = true;
        return true;
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
    
    convert: function GLSharp_Content_LightConverter$convert(input, collection) {
        /// <param name="input" type="Object">
        /// </param>
        /// <param name="collection" type="String">
        /// </param>
        /// <returns type="GLSharp.Content.ResourceItem"></returns>
        var obj = input;
        var ret = new GLSharp.Content.LightItem();
        ret.lightType = obj.Type;
        ret.properties = {};
        var $enum1 = ss.IEnumerator.getEnumerator(obj.Properties);
        while ($enum1.moveNext()) {
            var property = $enum1.current;
            if (property.Key === 'color') {
                var colors = property.Value.split(' ');
                var colorf = GLSharp.Core.SystemCore.environment.createFloat32Array(colors.length);
                for (var i = 0; i < colors.length; i++) {
                    colorf[i] = parseFloat(colors[i]);
                }
                ret.properties['color'] = colorf;
            }
            else if (property.Key === 'intensity') {
                ret.properties['intensity'] = parseFloat(property.Value);
            }
            else if (property.Key === 'falloff_angle') {
                ret.properties['falloff_angle'] = parseFloat(property.Value);
            }
        }
        return ret;
    }
}


////////////////////////////////////////////////////////////////////////////////
// GLSharp.Content.PropertyItem

GLSharp.Content.PropertyItem = function GLSharp_Content_PropertyItem() {
    /// <field name="type" type="String">
    /// </field>
    /// <field name="value" type="Object">
    /// </field>
}
GLSharp.Content.PropertyItem.prototype = {
    type: null,
    value: null
}


////////////////////////////////////////////////////////////////////////////////
// GLSharp.Content.MaterialItem

GLSharp.Content.MaterialItem = function GLSharp_Content_MaterialItem() {
    /// <field name="properties" type="Object">
    /// </field>
    /// <field name="shader" type="String">
    /// </field>
    GLSharp.Content.MaterialItem.initializeBase(this);
}
GLSharp.Content.MaterialItem.prototype = {
    properties: null,
    shader: null,
    
    free: function GLSharp_Content_MaterialItem$free() {
        /// <returns type="Boolean"></returns>
        this.alocated = false;
        return true;
    },
    
    readlocate: function GLSharp_Content_MaterialItem$readlocate() {
        /// <returns type="Boolean"></returns>
        this.alocated = true;
        return true;
    }
}


////////////////////////////////////////////////////////////////////////////////
// GLSharp.Content.MaterialConverter

GLSharp.Content.MaterialConverter = function GLSharp_Content_MaterialConverter() {
    /// <field name="colorType" type="String" static="true">
    /// </field>
    /// <field name="textureHandleType" type="String" static="true">
    /// </field>
    /// <field name="floatType" type="String" static="true">
    /// </field>
}
GLSharp.Content.MaterialConverter.prototype = {
    
    get_typeHandled: function GLSharp_Content_MaterialConverter$get_typeHandled() {
        /// <value type="String"></value>
        return 'material';
    },
    
    convert: function GLSharp_Content_MaterialConverter$convert(input, collection) {
        /// <param name="input" type="Object">
        /// </param>
        /// <param name="collection" type="String">
        /// </param>
        /// <returns type="GLSharp.Content.ResourceItem"></returns>
        var ret = new GLSharp.Content.MaterialItem();
        var obj = input;
        ret.properties = {};
        obj.Properties.forEach(function(value) {
            var property = new GLSharp.Content.PropertyItem();
            if (value.Type === 'color') {
                property.type = 'color';
                property.value = value.Value.split(new RegExp('[^0-9.]+'));
            }
            else if (value.Type === 'float') {
                property.type = 'float';
                property.value = parseFloat(value.Value);
            }
            else if (value.Type === 'texture') {
                var handle = new GLSharp.Content.Handle();
                handle.id = value.Value;
                handle.collection = collection;
                property.type = 'texture';
                property.value = handle;
            }
            ret.properties[value.Name] = property;
        });
        ret.shader = obj.Shader;
        return ret;
    }
}


////////////////////////////////////////////////////////////////////////////////
// GLSharp.Content.TextureItem

GLSharp.Content.TextureItem = function GLSharp_Content_TextureItem(graphics) {
    /// <param name="graphics" type="GLSharp.Graphics.IGraphics">
    /// </param>
    /// <field name="texture" type="GLSharp.Graphics.ITexture">
    /// </field>
    /// <field name="_graphics$1" type="GLSharp.Graphics.IGraphics">
    /// </field>
    /// <field name="image" type="GLSharp.Data.IImageResource">
    /// </field>
    GLSharp.Content.TextureItem.initializeBase(this);
    this._graphics$1 = graphics;
}
GLSharp.Content.TextureItem.prototype = {
    texture: null,
    _graphics$1: null,
    image: null,
    
    free: function GLSharp_Content_TextureItem$free() {
        /// <returns type="Boolean"></returns>
        return !(this.alocated = !this._graphics$1.allocateTexture(this));
    },
    
    readlocate: function GLSharp_Content_TextureItem$readlocate() {
        /// <returns type="Boolean"></returns>
        return (this.alocated = this._graphics$1.allocateTexture(this));
    }
}


////////////////////////////////////////////////////////////////////////////////
// GLSharp.Content.TextureConverter

GLSharp.Content.TextureConverter = function GLSharp_Content_TextureConverter(graphics) {
    /// <param name="graphics" type="GLSharp.Graphics.IGraphics">
    /// </param>
    /// <field name="_graphics" type="GLSharp.Graphics.IGraphics">
    /// </field>
    this._graphics = graphics;
}
GLSharp.Content.TextureConverter.prototype = {
    _graphics: null,
    
    get_typeHandled: function GLSharp_Content_TextureConverter$get_typeHandled() {
        /// <value type="String"></value>
        return 'texture';
    },
    
    convert: function GLSharp_Content_TextureConverter$convert(input, collection) {
        /// <param name="input" type="Object">
        /// </param>
        /// <param name="collection" type="String">
        /// </param>
        /// <returns type="GLSharp.Content.ResourceItem"></returns>
        var ret = new GLSharp.Content.TextureItem(this._graphics);
        var obj = input;
        GLSharp.Core.SystemCore.resourceManager.getResource(obj.Url, null).resourceChanged.subscribe(function(sender, args) {
            var resource = sender;
            ret.image = (resource.get_data());
        }, false);
        return ret;
    }
}


////////////////////////////////////////////////////////////////////////////////
// GLSharp.Content.MeshItem

GLSharp.Content.MeshItem = function GLSharp_Content_MeshItem(graphics) {
    /// <summary>
    /// Mesh item which will reside inside a collection.
    /// </summary>
    /// <param name="graphics" type="GLSharp.Graphics.IGraphics">
    /// </param>
    /// <field name="indexes" type="Array" elementType="Number" elementInteger="true">
    /// </field>
    /// <field name="mesh" type="Array" elementType="Number">
    /// </field>
    /// <field name="offsetPosition" type="Number" integer="true">
    /// </field>
    /// <field name="offsetNormal" type="Number" integer="true">
    /// </field>
    /// <field name="offsetUv" type="Number" integer="true">
    /// </field>
    /// <field name="boundingVolume" type="GLSharp.Util.VertexBoundingVolume">
    /// </field>
    /// <field name="meshBuffer" type="GLSharp.Graphics.IBuffer">
    /// Contains both Position - Normal - Uv data (in this order)
    /// </field>
    /// <field name="indexBuffer" type="GLSharp.Graphics.IBuffer">
    /// Index buffer.
    /// </field>
    /// <field name="_graphics$1" type="GLSharp.Graphics.IGraphics">
    /// </field>
    GLSharp.Content.MeshItem.initializeBase(this);
    this._graphics$1 = graphics;
}
GLSharp.Content.MeshItem.prototype = {
    indexes: null,
    mesh: null,
    offsetPosition: 0,
    offsetNormal: 0,
    offsetUv: 0,
    boundingVolume: null,
    meshBuffer: null,
    indexBuffer: null,
    _graphics$1: null,
    
    free: function GLSharp_Content_MeshItem$free() {
        /// <returns type="Boolean"></returns>
        return !(this.alocated = !this._graphics$1.allocateMesh(this));
    },
    
    readlocate: function GLSharp_Content_MeshItem$readlocate() {
        /// <returns type="Boolean"></returns>
        return (this.alocated = this._graphics$1.allocateMesh(this));
    },
    
    computeBoundingVolume: function GLSharp_Content_MeshItem$computeBoundingVolume() {
        var vertexAverage = new GLSharp.Util.Vector3(null);
        for (var i = 0; i < this.offsetNormal; i += 3) {
            vertexAverage.add3(this.mesh[i], this.mesh[i + 1], this.mesh[i + 2]);
        }
        vertexAverage.scale(1 / (this.offsetNormal / 3));
        var vertexIndex = -1;
        var dist = -1;
        var maxDist = -1;
        for (var i = 0; i < this.offsetNormal; i += 3) {
            dist = vertexAverage.distance3(this.mesh[i], this.mesh[i + 1], this.mesh[i + 2]);
            if (dist > maxDist) {
                maxDist = dist;
                vertexIndex = i / 3;
            }
        }
        this.boundingVolume = new GLSharp.Util.VertexBoundingVolume();
        this.boundingVolume.center = vertexAverage;
        this.boundingVolume.vertexIndex = vertexIndex;
    }
}


////////////////////////////////////////////////////////////////////////////////
// GLSharp.Content.MeshConverter

GLSharp.Content.MeshConverter = function GLSharp_Content_MeshConverter(graphics) {
    /// <summary>
    /// Converter for items of type "mesh"
    /// </summary>
    /// <param name="graphics" type="GLSharp.Graphics.IGraphics">
    /// </param>
    /// <field name="_graphics" type="GLSharp.Graphics.IGraphics">
    /// </field>
    this._graphics = graphics;
}
GLSharp.Content.MeshConverter.prototype = {
    _graphics: null,
    
    get_typeHandled: function GLSharp_Content_MeshConverter$get_typeHandled() {
        /// <value type="String"></value>
        return 'mesh';
    },
    
    convert: function GLSharp_Content_MeshConverter$convert(input, collection) {
        /// <param name="input" type="Object">
        /// </param>
        /// <param name="collection" type="String">
        /// </param>
        /// <returns type="GLSharp.Content.ResourceItem"></returns>
        if (input == null) {
            return null;
        }
        var obj = input;
        var ret = new GLSharp.Content.MeshItem(this._graphics);
        if (obj.Indexes == null) {
            obj.Indexes = GLSharp.Core.SystemCore.environment.createUInt16Array(0);
        }
        if (obj.Vertices == null) {
            obj.Vertices = GLSharp.Core.SystemCore.environment.createFloat32Array(0);
        }
        if (obj.Normals == null) {
            obj.Normals = GLSharp.Core.SystemCore.environment.createFloat32Array(0);
        }
        if (obj.UVs == null) {
            obj.UVs = GLSharp.Core.SystemCore.environment.createFloat32Array(0);
        }
        ret.indexes = GLSharp.Core.SystemCore.environment.createUInt16ArrayFromArray(obj.Indexes);
        ret.mesh = GLSharp.Core.SystemCore.environment.createFloat32Array((obj.Vertices.length + obj.Normals.length + obj.UVs.length));
        ret.offsetPosition = 0;
        ret.offsetNormal = obj.Vertices.length;
        ret.offsetUv = obj.Vertices.length + obj.Normals.length;
        for (var i = 0; i < obj.Vertices.length; i++) {
            ret.mesh[i] = obj.Vertices[i];
        }
        for (var i = 0; i < obj.Normals.length; i++) {
            ret.mesh[i + ret.offsetNormal] = obj.Normals[i];
        }
        for (var i = 0; i < obj.UVs.length; i++) {
            ret.mesh[i + ret.offsetUv] = obj.UVs[i];
        }
        ret.computeBoundingVolume();
        return ret;
    }
}


////////////////////////////////////////////////////////////////////////////////
// GLSharp.Content.NodeItem

GLSharp.Content.NodeItem = function GLSharp_Content_NodeItem() {
    /// <field name="root" type="GLSharp.Universe.Node">
    /// </field>
    GLSharp.Content.NodeItem.initializeBase(this);
}
GLSharp.Content.NodeItem.prototype = {
    root: null,
    
    free: function GLSharp_Content_NodeItem$free() {
        /// <returns type="Boolean"></returns>
        this.alocated = false;
        return true;
    },
    
    readlocate: function GLSharp_Content_NodeItem$readlocate() {
        /// <returns type="Boolean"></returns>
        this.alocated = false;
        return true;
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
    
    convert: function GLSharp_Content_NodeConverter$convert(input, collection) {
        /// <param name="input" type="Object">
        /// </param>
        /// <param name="collection" type="String">
        /// </param>
        /// <returns type="GLSharp.Content.ResourceItem"></returns>
        var root = input;
        var ret = new GLSharp.Content.NodeItem();
        ret.root = this._convertNodeObject(root, null);
        return ret;
    },
    
    _convertNodeObject: function GLSharp_Content_NodeConverter$_convertNodeObject(root, parent) {
        /// <param name="root" type="NodeObject">
        /// </param>
        /// <param name="parent" type="GLSharp.Universe.Node">
        /// </param>
        /// <returns type="GLSharp.Universe.Node"></returns>
        var ret = new GLSharp.Universe.Node();
        ret.id = root.Id;
        if (!!root.RotateX) {
            ret.rotateX(root.RotateX);
        }
        if (!!root.RotateY) {
            ret.rotateY(root.RotateY);
        }
        if (!!root.RotateZ) {
            ret.rotateZ(root.RotateZ);
        }
        if (root.Translation != null) {
            ret.translate(new GLSharp.Util.Vector3(root.Translation));
        }
        if (root.PivotTranslation != null) {
            ret.set_pivot(new GLSharp.Util.Vector3(root.PivotTranslation));
        }
        if (root.Scale != null) {
            ret.scale(new GLSharp.Util.Vector3(root.Scale));
        }
        if (parent != null) {
            parent.addChild(ret);
        }
        if (root.Animation != null) {
            ret.animation = new GLSharp.Universe.NodeAnimation();
            ret.animation.translateX = root.Animation.TranslateX;
            ret.animation.translateY = root.Animation.TranslateY;
            ret.animation.translateZ = root.Animation.TranslateZ;
            ret.animation.scaleX = root.Animation.ScaleX;
            ret.animation.scaleY = root.Animation.ScaleY;
            ret.animation.scaleZ = root.Animation.ScaleZ;
            ret.animation.rotateX = root.Animation.RotateX;
            ret.animation.rotateY = root.Animation.RotateY;
            ret.animation.rotateZ = root.Animation.RotateZ;
            ret.animation.frameCount = root.Animation.FrameCount;
            ret.animation.currentFrame = 0;
            ret.animation.animationStart = 0;
            ret.animation.animationEnd = ret.animation.frameCount;
            ret.animation.loop = true;
        }
        if (root.Collision != null) {
            var collision = new GLSharp.Universe.CollisionComponent();
            collision.bodyDefinition = new Box2D.Dynamics.b2BodyDef();
            collision.fixtureDefinition = new Box2D.Dynamics.b2FixtureDef();
            if (root.Collision.Static) {
                collision.bodyDefinition.type = Box2D.Dynamics.B2BodyType.staticBody;
            }
            else {
                collision.bodyDefinition.type = Box2D.Dynamics.B2BodyType.dynamicBody;
            }
            collision.fixtureDefinition.density = 1;
            collision.fixtureDefinition.friction = 0.5;
            collision.fixtureDefinition.restitution = 0.2;
            var world = ret.get_world().clone();
            var transV = world.transformV(GLSharp.Util.Vector3.build3(0, 0, 0));
            collision.bodyDefinition.position.x = transV.elements[0] + root.Collision.PositionX;
            collision.bodyDefinition.position.y = transV.elements[2] + root.Collision.PositionY;
            var rotV = world.transformV(GLSharp.Util.Vector3.build3(1, 0, 0)).subtract(transV);
            collision.bodyDefinition.angle = Math.atan2(rotV.elements[2], rotV.elements[0]);
            if (root.Collision.Type === 'sphere') {
                var sc = root.Collision;
                collision.fixtureDefinition.shape = new Box2D.Collision.Shapes.b2CircleShape(sc.Radius);
            }
            else if (root.Collision.Type === 'ob') {
                var obc = root.Collision;
                collision.fixtureDefinition.shape = new Box2D.Collision.Shapes.b2PolygonShape();
                (collision.fixtureDefinition.shape).SetAsBox(obc.Width / 2, obc.Height / 2);
            }
            ret.addComponent(collision);
        }
        if (root.Children != null) {
            var $enum1 = ss.IEnumerator.getEnumerator(root.Children);
            while ($enum1.moveNext()) {
                var nodeObject = $enum1.current;
                this._convertNodeObject(nodeObject, ret);
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
            handle.collection = reference.Library;
            handle.id = reference.Resource;
            comp.meshHandle = handle;
            collection.add(comp);
        }
        else if (reference.Type === 'material') {
            var comp = new GLSharp.Universe.MaterialComponent();
            var handle = new GLSharp.Content.Handle();
            handle.collection = reference.Library;
            handle.id = reference.Resource;
            comp.materialHandle = handle;
            collection.add(comp);
        }
        else if (reference.Type === 'light') {
            var comp = new GLSharp.Universe.LightComponent();
            var handle = new GLSharp.Content.Handle();
            handle.collection = reference.Library;
            handle.id = reference.Resource;
            comp.lightHandle = handle;
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
    /// <field name="collection" type="String">
    /// </field>
    /// <field name="id" type="String">
    /// </field>
}
GLSharp.Content.Handle.create = function GLSharp_Content_Handle$create(library, id) {
    /// <param name="library" type="String">
    /// </param>
    /// <param name="id" type="String">
    /// </param>
    /// <returns type="GLSharp.Content.Handle"></returns>
    var ret = new GLSharp.Content.Handle();
    ret.collection = library;
    ret.id = id;
    return ret;
}
GLSharp.Content.Handle.prototype = {
    collection: null,
    id: null
}


////////////////////////////////////////////////////////////////////////////////
// GLSharp.Content.ResourceCollection

GLSharp.Content.ResourceCollection = function GLSharp_Content_ResourceCollection() {
    /// <summary>
    /// A named collection of Resources.
    /// </summary>
    /// <field name="name" type="String">
    /// </field>
    /// <field name="resources" type="Object">
    /// </field>
}
GLSharp.Content.ResourceCollection.prototype = {
    name: null,
    resources: null
}


////////////////////////////////////////////////////////////////////////////////
// GLSharp.Content.ResourceItem

GLSharp.Content.ResourceItem = function GLSharp_Content_ResourceItem() {
    /// <summary>
    /// A resourc item.
    /// </summary>
    /// <field name="id" type="String">
    /// </field>
    /// <field name="type" type="String">
    /// </field>
    /// <field name="lastAccessed" type="Number" integer="true">
    /// </field>
    /// <field name="itemId" type="Number" integer="true">
    /// </field>
    /// <field name="_lastId" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="alocated" type="Boolean">
    /// Last time the mesh has been accessed.
    /// </field>
    this.itemId = GLSharp.Content.ResourceItem._lastId++;
}
GLSharp.Content.ResourceItem.prototype = {
    id: null,
    type: null,
    lastAccessed: 0,
    itemId: 0,
    alocated: false
}


////////////////////////////////////////////////////////////////////////////////
// GLSharp.Content.LibraryResult

GLSharp.Content.LibraryResult = function GLSharp_Content_LibraryResult() {
    /// <summary>
    /// Used for notifying when a library has finished loading.
    /// </summary>
    /// <field name="finished" type="GLSharp.Core.Event">
    /// </field>
    this.finished = new GLSharp.Core.Event();
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
    /// <field name="_items" type="Array">
    /// </field>
    /// <field name="expireLimit" type="Number" integer="true">
    /// The limit in milliseconds when items are considered expired and should be dealocated.
    /// </field>
    /// <field name="_alocatedItems" type="Array">
    /// </field>
    /// <field name="_expiredItems" type="Array">
    /// </field>
    /// <field name="_lastUpdated" type="Number" integer="true">
    /// </field>
    this._collections = {};
    this._converters = {};
    this._items = [];
    this._alocatedItems = [];
    this._expiredItems = [];
    this._lastUpdated = Date.get_now().getTime();
}
GLSharp.Content.Library.prototype = {
    _collections: null,
    _converters: null,
    _items: null,
    expireLimit: 600000,
    _alocatedItems: null,
    _expiredItems: null,
    _lastUpdated: 0,
    
    update: function GLSharp_Content_Library$update() {
        this._expiredItems.clear();
        this._lastUpdated = Date.get_now().getTime();
        var that = this;
        this._alocatedItems.forEach(function(value) {
            if ((that._lastUpdated - value.lastAccessed) > that.expireLimit) {
                that._expiredItems.add(value);
            }
        });
        that._expiredItems.forEach(function(value) {
            if (value.free()) {
                that._alocatedItems.remove(value);
            }
        });
    },
    
    loadLibrary: function GLSharp_Content_Library$loadLibrary(url) {
        /// <param name="url" type="String">
        /// </param>
        /// <returns type="GLSharp.Content.LibraryResult"></returns>
        var param = new GLSharp.Data.ResourceManagerParams();
        var ret = new GLSharp.Content.LibraryResult();
        var that = this;
        param.set_type('json');
        GLSharp.Core.SystemCore.resourceManager.getResource(url, param).resourceChanged.subscribe(ss.Delegate.create(this, function(sender, args) {
            var resource = sender;
            if (resource.get_finished()) {
                var res = this._loadLibraryFromJson(resource.get_data());
                ret.finished.fire(this, res);
            }
        }), true);
        return ret;
    },
    
    _loadLibraryFromJson: function GLSharp_Content_Library$_loadLibraryFromJson(json) {
        /// <param name="json" type="Object">
        /// </param>
        /// <returns type="GLSharp.Content.ResourceCollection"></returns>
        var library = json;
        GLSharp.Core.SystemCore.logger.log('Loading library : ' + library.Name);
        var resourceCollection = null;
        if ((resourceCollection = this._collections[library.Name]) == null) {
            resourceCollection = new GLSharp.Content.ResourceCollection();
            resourceCollection.name = library.Name;
            resourceCollection.resources = {};
            this._collections[resourceCollection.name] = resourceCollection;
        }
        this._appendToCollection(resourceCollection, library.ContentObjects);
        return resourceCollection;
    },
    
    _appendToCollection: function GLSharp_Content_Library$_appendToCollection(resourceCollection, resources) {
        /// <param name="resourceCollection" type="GLSharp.Content.ResourceCollection">
        /// </param>
        /// <param name="resources" type="Array">
        /// </param>
        var $enum1 = ss.IEnumerator.getEnumerator(resources);
        while ($enum1.moveNext()) {
            var resourceObject = $enum1.current;
            var converter = this._converters[resourceObject.Type];
            if (converter == null) {
                GLSharp.Core.SystemCore.logger.log('No resource converter found for type + ' + resourceObject.Type);
                continue;
            }
            var res = converter.convert(resourceObject.Resource, resourceCollection.name);
            res.id = resourceObject.Id;
            res.type = resourceObject.Type;
            resourceCollection.resources[res.id] = res;
            this._items[res.itemId] = res;
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
        var resourceCollection = null;
        if ((resourceCollection = this._collections[library]) == null) {
            return null;
        }
        var resource = null;
        if ((resource = resourceCollection.resources[resourceName]) == null) {
            return null;
        }
        return GLSharp.Content.Handle.create(library, resourceName);
    },
    
    getResourceById: function GLSharp_Content_Library$getResourceById(itemId) {
        /// <param name="itemId" type="Number" integer="true">
        /// </param>
        /// <returns type="GLSharp.Content.ResourceItem"></returns>
        return this._items[itemId];
    },
    
    getResource: function GLSharp_Content_Library$getResource(handle) {
        /// <param name="handle" type="GLSharp.Content.Handle">
        /// </param>
        /// <returns type="GLSharp.Content.ResourceItem"></returns>
        if (this._collections[handle.collection] == null) {
            return null;
        }
        var resource = this._collections[handle.collection].resources[handle.id];
        if (resource == null) {
            return null;
        }
        if (!resource.alocated) {
            if (resource.readlocate()) {
                this._alocatedItems.add(resource);
            }
        }
        resource.lastAccessed = this._lastUpdated;
        return resource;
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


Type.registerNamespace('GLSharp.Graphics');

////////////////////////////////////////////////////////////////////////////////
// GLSharp.Graphics.IShaderBinder

GLSharp.Graphics.IShaderBinder = function() { 
};
GLSharp.Graphics.IShaderBinder.prototype = {
    bindGeometryPass : null,
    bindGeometryInstance : null,
    bindGeometryMesh : null,
    bindGeometryMaterial : null,
    bindGeometryPassNum : null,
    bindLightPass : null,
    bindLight : null,
    bindLightMesh : null,
    bindPrePostPass : null,
    bindFinalPass : null
}
GLSharp.Graphics.IShaderBinder.registerInterface('GLSharp.Graphics.IShaderBinder');


////////////////////////////////////////////////////////////////////////////////
// GLSharp.Graphics.IViewOccluder

GLSharp.Graphics.IViewOccluder = function() { 
};
GLSharp.Graphics.IViewOccluder.prototype = {
    test : null
}
GLSharp.Graphics.IViewOccluder.registerInterface('GLSharp.Graphics.IViewOccluder');


////////////////////////////////////////////////////////////////////////////////
// GLSharp.Graphics.IRenderBuffer

GLSharp.Graphics.IRenderBuffer = function() { 
};
GLSharp.Graphics.IRenderBuffer.prototype = {

}
GLSharp.Graphics.IRenderBuffer.registerInterface('GLSharp.Graphics.IRenderBuffer');


////////////////////////////////////////////////////////////////////////////////
// GLSharp.Graphics.IActiveInfo

GLSharp.Graphics.IActiveInfo = function() { 
};
GLSharp.Graphics.IActiveInfo.prototype = {
    get_size : null,
    get_type : null,
    get_name : null
}
GLSharp.Graphics.IActiveInfo.registerInterface('GLSharp.Graphics.IActiveInfo');


////////////////////////////////////////////////////////////////////////////////
// GLSharp.Graphics.IBuffer

GLSharp.Graphics.IBuffer = function() { 
};
GLSharp.Graphics.IBuffer.prototype = {

}
GLSharp.Graphics.IBuffer.registerInterface('GLSharp.Graphics.IBuffer');


////////////////////////////////////////////////////////////////////////////////
// GLSharp.Graphics.IFrameBuffer

GLSharp.Graphics.IFrameBuffer = function() { 
};
GLSharp.Graphics.IFrameBuffer.prototype = {

}
GLSharp.Graphics.IFrameBuffer.registerInterface('GLSharp.Graphics.IFrameBuffer');


////////////////////////////////////////////////////////////////////////////////
// GLSharp.Graphics.ITexture

GLSharp.Graphics.ITexture = function() { 
};
GLSharp.Graphics.ITexture.prototype = {

}
GLSharp.Graphics.ITexture.registerInterface('GLSharp.Graphics.ITexture');


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
    get_world : null,
    get_camera : null,
    set_camera : null,
    get_viewOccluder : null,
    set_viewOccluder : null,
    initialize : null,
    render : null,
    clear : null,
    allocateTexture : null,
    freeTexture : null,
    allocateMesh : null,
    dealocateMesh : null,
    addShaderGroup : null,
    bindShader : null,
    bindTexture : null,
    createRenderTexture : null,
    createRenderGroup : null,
    cleanRenderGroup : null,
    switchRenderGroup : null,
    renderPostProcess : null,
    queuePostProcess : null,
    setBlend : null
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
// GLSharp.Graphics.CullInfo

GLSharp.Graphics.CullInfo = function GLSharp_Graphics_CullInfo() {
    /// <field name="modelView" type="Array" elementType="Number">
    /// </field>
    /// <field name="nearClip" type="Array" elementType="Number">
    /// </field>
    /// <field name="farClip" type="Array" elementType="Number">
    /// </field>
    /// <field name="leftClip" type="Array" elementType="Number">
    /// </field>
    /// <field name="rightClip" type="Array" elementType="Number">
    /// </field>
    /// <field name="botClip" type="Array" elementType="Number">
    /// </field>
    /// <field name="topClip" type="Array" elementType="Number">
    /// </field>
    this.nearClip = GLSharp.Core.SystemCore.environment.createFloat32Array(4);
    this.farClip = GLSharp.Core.SystemCore.environment.createFloat32Array(4);
    this.leftClip = GLSharp.Core.SystemCore.environment.createFloat32Array(4);
    this.rightClip = GLSharp.Core.SystemCore.environment.createFloat32Array(4);
    this.botClip = GLSharp.Core.SystemCore.environment.createFloat32Array(4);
    this.topClip = GLSharp.Core.SystemCore.environment.createFloat32Array(4);
}
GLSharp.Graphics.CullInfo.prototype = {
    modelView: null
}


////////////////////////////////////////////////////////////////////////////////
// GLSharp.Graphics.RegionOccluder

GLSharp.Graphics.RegionOccluder = function GLSharp_Graphics_RegionOccluder(regionX, regionY) {
    /// <param name="regionX" type="Number">
    /// </param>
    /// <param name="regionY" type="Number">
    /// </param>
    /// <field name="_regionX" type="Number">
    /// </field>
    /// <field name="_regionY" type="Number">
    /// </field>
    this._regionX = regionX;
    this._regionY = regionY;
}
GLSharp.Graphics.RegionOccluder.prototype = {
    _regionX: 0,
    _regionY: 0,
    
    test: function GLSharp_Graphics_RegionOccluder$test(cullInfo, node, meshItem) {
        /// <param name="cullInfo" type="GLSharp.Graphics.CullInfo">
        /// </param>
        /// <param name="node" type="GLSharp.Universe.Node">
        /// </param>
        /// <param name="meshItem" type="GLSharp.Content.MeshItem">
        /// </param>
        /// <returns type="Boolean"></returns>
        var x = meshItem.boundingVolume.center.elements[0];
        var y = meshItem.boundingVolume.center.elements[1];
        var z = meshItem.boundingVolume.center.elements[2];
        var xp = x * cullInfo.modelView[0] + y * cullInfo.modelView[4] + z * cullInfo.modelView[8] + cullInfo.modelView[12];
        var yp = x * cullInfo.modelView[1] + y * cullInfo.modelView[5] + z * cullInfo.modelView[9] + cullInfo.modelView[13];
        var zp = x * cullInfo.modelView[2] + y * cullInfo.modelView[6] + z * cullInfo.modelView[10] + cullInfo.modelView[14];
        var xv = meshItem.mesh[meshItem.boundingVolume.vertexIndex * 3];
        var yv = meshItem.mesh[meshItem.boundingVolume.vertexIndex * 3 + 1];
        var zv = meshItem.mesh[meshItem.boundingVolume.vertexIndex * 3 + 2];
        var xpv = xv * cullInfo.modelView[0] + yv * cullInfo.modelView[4] + zv * cullInfo.modelView[8] + cullInfo.modelView[12];
        var ypv = xv * cullInfo.modelView[1] + yv * cullInfo.modelView[5] + zv * cullInfo.modelView[9] + cullInfo.modelView[13];
        var zpv = xv * cullInfo.modelView[2] + yv * cullInfo.modelView[6] + zv * cullInfo.modelView[10] + cullInfo.modelView[14];
        var r = Math.sqrt((xp - xpv) * (xp - xpv) + (yp - ypv) * (yp - ypv) + (zp - zpv) * (zp - zpv));
        if (xp + r < -this._regionX) {
            return false;
        }
        if (xp - r > this._regionX) {
            return false;
        }
        if (yp + r < -this._regionY) {
            return false;
        }
        if (yp - r > this._regionY) {
            return false;
        }
        return true;
    }
}


////////////////////////////////////////////////////////////////////////////////
// GLSharp.Graphics.ViewFrustrumOccluder

GLSharp.Graphics.ViewFrustrumOccluder = function GLSharp_Graphics_ViewFrustrumOccluder() {
}
GLSharp.Graphics.ViewFrustrumOccluder.prototype = {
    
    test: function GLSharp_Graphics_ViewFrustrumOccluder$test(cullInfo, node, meshItem) {
        /// <param name="cullInfo" type="GLSharp.Graphics.CullInfo">
        /// </param>
        /// <param name="node" type="GLSharp.Universe.Node">
        /// </param>
        /// <param name="meshItem" type="GLSharp.Content.MeshItem">
        /// </param>
        /// <returns type="Boolean"></returns>
        var x = meshItem.boundingVolume.center.elements[0];
        var y = meshItem.boundingVolume.center.elements[1];
        var z = meshItem.boundingVolume.center.elements[2];
        var xp = x * cullInfo.modelView[0] + y * cullInfo.modelView[4] + z * cullInfo.modelView[8] + cullInfo.modelView[12];
        var yp = x * cullInfo.modelView[1] + y * cullInfo.modelView[5] + z * cullInfo.modelView[9] + cullInfo.modelView[13];
        var zp = x * cullInfo.modelView[2] + y * cullInfo.modelView[6] + z * cullInfo.modelView[10] + cullInfo.modelView[14];
        var xv = meshItem.mesh[meshItem.boundingVolume.vertexIndex * 3];
        var yv = meshItem.mesh[meshItem.boundingVolume.vertexIndex * 3 + 1];
        var zv = meshItem.mesh[meshItem.boundingVolume.vertexIndex * 3 + 2];
        var xpv = xv * cullInfo.modelView[0] + yv * cullInfo.modelView[4] + zv * cullInfo.modelView[8] + cullInfo.modelView[12];
        var ypv = xv * cullInfo.modelView[1] + yv * cullInfo.modelView[5] + zv * cullInfo.modelView[9] + cullInfo.modelView[13];
        var zpv = xv * cullInfo.modelView[2] + yv * cullInfo.modelView[6] + zv * cullInfo.modelView[10] + cullInfo.modelView[14];
        var r = Math.sqrt((xp - xpv) * (xp - xpv) + (yp - ypv) * (yp - ypv) + (zp - zpv) * (zp - zpv));
        if ((xp * cullInfo.nearClip[0] + yp * cullInfo.nearClip[1] + zp * cullInfo.nearClip[2] + cullInfo.nearClip[3] + r) < 0) {
            return false;
        }
        if ((xp * cullInfo.botClip[0] + yp * cullInfo.botClip[1] + zp * cullInfo.botClip[2] + cullInfo.botClip[3] + r) < 0) {
            return false;
        }
        if ((xp * cullInfo.topClip[0] + yp * cullInfo.topClip[1] + zp * cullInfo.topClip[2] + cullInfo.topClip[3] + r) < 0) {
            return false;
        }
        if ((xp * cullInfo.leftClip[0] + yp * cullInfo.leftClip[1] + zp * cullInfo.leftClip[2] + cullInfo.leftClip[3] + r) < 0) {
            return false;
        }
        if ((xp * cullInfo.rightClip[0] + yp * cullInfo.rightClip[1] + zp * cullInfo.rightClip[2] + cullInfo.rightClip[3] + r) < 0) {
            return false;
        }
        if ((xp * cullInfo.farClip[0] + yp * cullInfo.farClip[1] + zp * cullInfo.farClip[2] + cullInfo.farClip[3] + r) < 0) {
            return false;
        }
        return true;
    }
}


////////////////////////////////////////////////////////////////////////////////
// GLSharp.Graphics.ShaderGroup

GLSharp.Graphics.ShaderGroup = function GLSharp_Graphics_ShaderGroup() {
    /// <field name="name" type="String">
    /// </field>
    /// <field name="geometryPassShader" type="GLSharp.Graphics.CompiledShader">
    /// </field>
    /// <field name="finalPassShader" type="GLSharp.Graphics.CompiledShader">
    /// </field>
    /// <field name="lightPassShader" type="GLSharp.Graphics.CompiledShader">
    /// </field>
    /// <field name="prePostProcessPassShader" type="GLSharp.Graphics.CompiledShader">
    /// </field>
    /// <field name="shaderBinder" type="GLSharp.Graphics.IShaderBinder">
    /// </field>
}
GLSharp.Graphics.ShaderGroup.prototype = {
    name: null,
    geometryPassShader: null,
    finalPassShader: null,
    lightPassShader: null,
    prePostProcessPassShader: null,
    shaderBinder: null
}


////////////////////////////////////////////////////////////////////////////////
// GLSharp.Graphics.CompiledShader

GLSharp.Graphics.CompiledShader = function GLSharp_Graphics_CompiledShader() {
    /// <field name="name" type="String">
    /// Gets the shader name.
    /// </field>
    /// <field name="shaderProgram" type="GLSharp.Graphics.IShaderProgram">
    /// Getsor sets the compiled shader programs.
    /// </field>
    /// <field name="uniforms" type="Object">
    /// Uniform locations.
    /// </field>
    /// <field name="attributes" type="Object">
    /// Attribute locations.
    /// </field>
}
GLSharp.Graphics.CompiledShader.prototype = {
    name: null,
    shaderProgram: null,
    uniforms: null,
    attributes: null
}


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


Type.registerNamespace('GLSharp.Graphics.Core');

////////////////////////////////////////////////////////////////////////////////
// GLSharp.Graphics.Core.RenderGroup

GLSharp.Graphics.Core.RenderGroup = function GLSharp_Graphics_Core_RenderGroup() {
    /// <field name="frameBuffer" type="GLSharp.Graphics.IFrameBuffer">
    /// </field>
    /// <field name="renderTexture" type="GLSharp.Graphics.ITexture">
    /// </field>
    /// <field name="depthRenderBuffer" type="GLSharp.Graphics.IRenderBuffer">
    /// </field>
}
GLSharp.Graphics.Core.RenderGroup.prototype = {
    frameBuffer: null,
    renderTexture: null,
    depthRenderBuffer: null
}


Type.registerNamespace('GLSharp.Graphics.Effects');

////////////////////////////////////////////////////////////////////////////////
// GLSharp.Graphics.Effects.IPostProcessEffect

GLSharp.Graphics.Effects.IPostProcessEffect = function() { 
};
GLSharp.Graphics.Effects.IPostProcessEffect.prototype = {
    get_active : null,
    set_active : null,
    reset : null,
    init : null,
    render : null
}
GLSharp.Graphics.Effects.IPostProcessEffect.registerInterface('GLSharp.Graphics.Effects.IPostProcessEffect');


////////////////////////////////////////////////////////////////////////////////
// GLSharp.Graphics.Effects.BloomEffect

GLSharp.Graphics.Effects.BloomEffect = function GLSharp_Graphics_Effects_BloomEffect() {
    /// <field name="_bloomShader" type="GLSharp.Graphics.CompiledShader">
    /// </field>
    /// <field name="_finalGroup" type="GLSharp.Graphics.Core.RenderGroup">
    /// </field>
    /// <field name="_diffuseBuffer" type="GLSharp.Graphics.ITexture">
    /// </field>
    /// <field name="_normalBuffer" type="GLSharp.Graphics.ITexture">
    /// </field>
    /// <field name="_positionBuffer" type="GLSharp.Graphics.ITexture">
    /// </field>
    /// <field name="_accBuffer" type="GLSharp.Graphics.ITexture">
    /// </field>
    /// <field name="_active" type="Boolean">
    /// </field>
    /// <field name="_graphics" type="GLSharp.Graphics.IGraphics">
    /// </field>
    var that = this;
    GLSharp.Core.SystemCore.resourceManager.getResource('/Data/Shader/phong_pass_bloom.shader', null).resourceChanged.subscribe(function(sender, args) {
        var resource = sender;
        that._bloomShader = resource.get_data();
    }, true);
}
GLSharp.Graphics.Effects.BloomEffect.prototype = {
    _bloomShader: null,
    _finalGroup: null,
    _diffuseBuffer: null,
    _normalBuffer: null,
    _positionBuffer: null,
    _accBuffer: null,
    _active: true,
    _graphics: null,
    
    get_active: function GLSharp_Graphics_Effects_BloomEffect$get_active() {
        /// <value type="Boolean"></value>
        return this._active;
    },
    set_active: function GLSharp_Graphics_Effects_BloomEffect$set_active(value) {
        /// <value type="Boolean"></value>
        this._active = value;
        return value;
    },
    
    reset: function GLSharp_Graphics_Effects_BloomEffect$reset(graphics) {
        /// <param name="graphics" type="GLSharp.Graphics.IGraphics">
        /// </param>
        this._finalGroup = graphics.createRenderGroup(true);
        this._graphics = graphics;
    },
    
    init: function GLSharp_Graphics_Effects_BloomEffect$init(diffuse, normal, position, accumulation) {
        /// <param name="diffuse" type="GLSharp.Graphics.ITexture">
        /// </param>
        /// <param name="normal" type="GLSharp.Graphics.ITexture">
        /// </param>
        /// <param name="position" type="GLSharp.Graphics.ITexture">
        /// </param>
        /// <param name="accumulation" type="GLSharp.Graphics.ITexture">
        /// </param>
        this._diffuseBuffer = diffuse;
        this._normalBuffer = normal;
        this._positionBuffer = position;
        this._accBuffer = accumulation;
    },
    
    render: function GLSharp_Graphics_Effects_BloomEffect$render(previous) {
        /// <param name="previous" type="GLSharp.Graphics.Core.RenderGroup">
        /// </param>
        /// <returns type="GLSharp.Graphics.Core.RenderGroup"></returns>
        if (!this._active) {
            return previous;
        }
        this._bindBloomShader();
        this._graphics.switchRenderGroup(this._finalGroup);
        this._graphics.renderPostProcess();
        return this._finalGroup;
    },
    
    _bindBloomShader: function GLSharp_Graphics_Effects_BloomEffect$_bindBloomShader() {
        if (this._bloomShader == null) {
            return;
        }
        this._graphics.bindShader(this._bloomShader);
        this._graphics.bindTexture(this._bloomShader.uniforms['uSDiffuse'], this._diffuseBuffer, 0);
        this._graphics.bindTexture(this._bloomShader.uniforms['uSAccumulation'], this._accBuffer, 1);
    }
}


////////////////////////////////////////////////////////////////////////////////
// GLSharp.Graphics.Effects.DepthEffect

GLSharp.Graphics.Effects.DepthEffect = function GLSharp_Graphics_Effects_DepthEffect() {
    /// <field name="_depthShader" type="GLSharp.Graphics.CompiledShader">
    /// </field>
    /// <field name="_finalGroup" type="GLSharp.Graphics.Core.RenderGroup">
    /// </field>
    /// <field name="_diffuseBuffer" type="GLSharp.Graphics.ITexture">
    /// </field>
    /// <field name="_normalBuffer" type="GLSharp.Graphics.ITexture">
    /// </field>
    /// <field name="_positionBuffer" type="GLSharp.Graphics.ITexture">
    /// </field>
    /// <field name="_accBuffer" type="GLSharp.Graphics.ITexture">
    /// </field>
    /// <field name="_active" type="Boolean">
    /// </field>
    /// <field name="_graphics" type="GLSharp.Graphics.IGraphics">
    /// </field>
    var that = this;
    GLSharp.Core.SystemCore.resourceManager.getResource('/Data/Shader/phong_pass_depth.shader', null).resourceChanged.subscribe(function(sender, args) {
        var resource = sender;
        that._depthShader = resource.get_data();
    }, true);
}
GLSharp.Graphics.Effects.DepthEffect.prototype = {
    _depthShader: null,
    _finalGroup: null,
    _diffuseBuffer: null,
    _normalBuffer: null,
    _positionBuffer: null,
    _accBuffer: null,
    _active: true,
    _graphics: null,
    
    get_active: function GLSharp_Graphics_Effects_DepthEffect$get_active() {
        /// <value type="Boolean"></value>
        return this._active;
    },
    set_active: function GLSharp_Graphics_Effects_DepthEffect$set_active(value) {
        /// <value type="Boolean"></value>
        this._active = value;
        return value;
    },
    
    reset: function GLSharp_Graphics_Effects_DepthEffect$reset(graphics) {
        /// <param name="graphics" type="GLSharp.Graphics.IGraphics">
        /// </param>
        this._finalGroup = graphics.createRenderGroup(true);
        this._graphics = graphics;
    },
    
    init: function GLSharp_Graphics_Effects_DepthEffect$init(diffuse, normal, position, accumulation) {
        /// <param name="diffuse" type="GLSharp.Graphics.ITexture">
        /// </param>
        /// <param name="normal" type="GLSharp.Graphics.ITexture">
        /// </param>
        /// <param name="position" type="GLSharp.Graphics.ITexture">
        /// </param>
        /// <param name="accumulation" type="GLSharp.Graphics.ITexture">
        /// </param>
        this._diffuseBuffer = diffuse;
        this._normalBuffer = normal;
        this._positionBuffer = position;
        this._accBuffer = accumulation;
    },
    
    render: function GLSharp_Graphics_Effects_DepthEffect$render(previous) {
        /// <param name="previous" type="GLSharp.Graphics.Core.RenderGroup">
        /// </param>
        /// <returns type="GLSharp.Graphics.Core.RenderGroup"></returns>
        if (!this._active) {
            return previous;
        }
        this._bindMotionBlurShader(previous);
        this._graphics.switchRenderGroup(this._finalGroup);
        this._graphics.renderPostProcess();
        return this._finalGroup;
    },
    
    _bindMotionBlurShader: function GLSharp_Graphics_Effects_DepthEffect$_bindMotionBlurShader(current) {
        /// <param name="current" type="GLSharp.Graphics.Core.RenderGroup">
        /// </param>
        if (this._depthShader == null) {
            return;
        }
        this._graphics.bindShader(this._depthShader);
        this._graphics.bindTexture(this._depthShader.uniforms['uSPost'], current.renderTexture, 0);
    }
}


////////////////////////////////////////////////////////////////////////////////
// GLSharp.Graphics.Effects.MotionBlurEffect

GLSharp.Graphics.Effects.MotionBlurEffect = function GLSharp_Graphics_Effects_MotionBlurEffect() {
    /// <field name="_blurShader" type="GLSharp.Graphics.CompiledShader">
    /// </field>
    /// <field name="_finalGroup" type="GLSharp.Graphics.Core.RenderGroup">
    /// </field>
    /// <field name="_diffuseBuffer" type="GLSharp.Graphics.ITexture">
    /// </field>
    /// <field name="_normalBuffer" type="GLSharp.Graphics.ITexture">
    /// </field>
    /// <field name="_positionBuffer" type="GLSharp.Graphics.ITexture">
    /// </field>
    /// <field name="_accBuffer" type="GLSharp.Graphics.ITexture">
    /// </field>
    /// <field name="_active" type="Boolean">
    /// </field>
    /// <field name="_graphics" type="GLSharp.Graphics.IGraphics">
    /// </field>
    var that = this;
    GLSharp.Core.SystemCore.resourceManager.getResource('/Data/Shader/phong_pass_blur.shader', null).resourceChanged.subscribe(function(sender, args) {
        var resource = sender;
        that._blurShader = resource.get_data();
    }, true);
}
GLSharp.Graphics.Effects.MotionBlurEffect.prototype = {
    _blurShader: null,
    _finalGroup: null,
    _diffuseBuffer: null,
    _normalBuffer: null,
    _positionBuffer: null,
    _accBuffer: null,
    _active: true,
    _graphics: null,
    
    get_active: function GLSharp_Graphics_Effects_MotionBlurEffect$get_active() {
        /// <value type="Boolean"></value>
        return this._active;
    },
    set_active: function GLSharp_Graphics_Effects_MotionBlurEffect$set_active(value) {
        /// <value type="Boolean"></value>
        this._active = value;
        return value;
    },
    
    reset: function GLSharp_Graphics_Effects_MotionBlurEffect$reset(graphics) {
        /// <param name="graphics" type="GLSharp.Graphics.IGraphics">
        /// </param>
        this._finalGroup = graphics.createRenderGroup(true);
        this._graphics = graphics;
    },
    
    init: function GLSharp_Graphics_Effects_MotionBlurEffect$init(diffuse, normal, position, accumulation) {
        /// <param name="diffuse" type="GLSharp.Graphics.ITexture">
        /// </param>
        /// <param name="normal" type="GLSharp.Graphics.ITexture">
        /// </param>
        /// <param name="position" type="GLSharp.Graphics.ITexture">
        /// </param>
        /// <param name="accumulation" type="GLSharp.Graphics.ITexture">
        /// </param>
        this._diffuseBuffer = diffuse;
        this._normalBuffer = normal;
        this._positionBuffer = position;
        this._accBuffer = accumulation;
    },
    
    render: function GLSharp_Graphics_Effects_MotionBlurEffect$render(previous) {
        /// <param name="previous" type="GLSharp.Graphics.Core.RenderGroup">
        /// </param>
        /// <returns type="GLSharp.Graphics.Core.RenderGroup"></returns>
        if (!this._active) {
            return previous;
        }
        this._bindMotionBlurShader(previous);
        this._graphics.switchRenderGroup(this._finalGroup);
        this._graphics.renderPostProcess();
        return this._finalGroup;
    },
    
    _bindMotionBlurShader: function GLSharp_Graphics_Effects_MotionBlurEffect$_bindMotionBlurShader(current) {
        /// <param name="current" type="GLSharp.Graphics.Core.RenderGroup">
        /// </param>
        if (this._blurShader == null) {
            return;
        }
        this._graphics.bindShader(this._blurShader);
        this._graphics.bindTexture(this._blurShader.uniforms['uSPost'], this._finalGroup.renderTexture, 0);
        this._graphics.bindTexture(this._blurShader.uniforms['uSCurrent'], current.renderTexture, 1);
    }
}


////////////////////////////////////////////////////////////////////////////////
// GLSharp.Graphics.Effects.SsaoEffect

GLSharp.Graphics.Effects.SsaoEffect = function GLSharp_Graphics_Effects_SsaoEffect() {
    /// <field name="_ssaoShader" type="GLSharp.Graphics.CompiledShader">
    /// </field>
    /// <field name="_compositeShader" type="GLSharp.Graphics.CompiledShader">
    /// </field>
    /// <field name="_ssaoGroup" type="GLSharp.Graphics.Core.RenderGroup">
    /// </field>
    /// <field name="_finalGroup" type="GLSharp.Graphics.Core.RenderGroup">
    /// </field>
    /// <field name="_diffuseBuffer" type="GLSharp.Graphics.ITexture">
    /// </field>
    /// <field name="_normalBuffer" type="GLSharp.Graphics.ITexture">
    /// </field>
    /// <field name="_positionBuffer" type="GLSharp.Graphics.ITexture">
    /// </field>
    /// <field name="_accBuffer" type="GLSharp.Graphics.ITexture">
    /// </field>
    /// <field name="_active" type="Boolean">
    /// </field>
    /// <field name="_graphics" type="GLSharp.Graphics.IGraphics">
    /// </field>
    var that = this;
    GLSharp.Core.SystemCore.resourceManager.getResource('/Data/Shader/phong_pass_ssao.shader', null).resourceChanged.subscribe(function(sender, args) {
        var resource = sender;
        that._ssaoShader = resource.get_data();
    }, true);
    GLSharp.Core.SystemCore.resourceManager.getResource('/Data/Shader/phong_pass_ssao_composite.shader', null).resourceChanged.subscribe(function(sender, args) {
        var resource = sender;
        that._compositeShader = resource.get_data();
    }, true);
}
GLSharp.Graphics.Effects.SsaoEffect.prototype = {
    _ssaoShader: null,
    _compositeShader: null,
    _ssaoGroup: null,
    _finalGroup: null,
    _diffuseBuffer: null,
    _normalBuffer: null,
    _positionBuffer: null,
    _accBuffer: null,
    _active: true,
    _graphics: null,
    
    get_active: function GLSharp_Graphics_Effects_SsaoEffect$get_active() {
        /// <value type="Boolean"></value>
        return this._active;
    },
    set_active: function GLSharp_Graphics_Effects_SsaoEffect$set_active(value) {
        /// <value type="Boolean"></value>
        this._active = value;
        return value;
    },
    
    reset: function GLSharp_Graphics_Effects_SsaoEffect$reset(graphics) {
        /// <param name="graphics" type="GLSharp.Graphics.IGraphics">
        /// </param>
        this._ssaoGroup = graphics.createRenderGroup(true);
        this._finalGroup = graphics.createRenderGroup(true);
        this._graphics = graphics;
    },
    
    init: function GLSharp_Graphics_Effects_SsaoEffect$init(diffuse, normal, position, accumulation) {
        /// <param name="diffuse" type="GLSharp.Graphics.ITexture">
        /// </param>
        /// <param name="normal" type="GLSharp.Graphics.ITexture">
        /// </param>
        /// <param name="position" type="GLSharp.Graphics.ITexture">
        /// </param>
        /// <param name="accumulation" type="GLSharp.Graphics.ITexture">
        /// </param>
        this._diffuseBuffer = diffuse;
        this._normalBuffer = normal;
        this._positionBuffer = position;
        this._accBuffer = accumulation;
    },
    
    render: function GLSharp_Graphics_Effects_SsaoEffect$render(previous) {
        /// <param name="previous" type="GLSharp.Graphics.Core.RenderGroup">
        /// </param>
        /// <returns type="GLSharp.Graphics.Core.RenderGroup"></returns>
        if (!this._active) {
            return previous;
        }
        this._bindSsaoShader();
        this._graphics.switchRenderGroup(this._ssaoGroup);
        this._graphics.renderPostProcess();
        this._bindFinalShader(previous);
        this._graphics.switchRenderGroup(this._finalGroup);
        this._graphics.renderPostProcess();
        return this._finalGroup;
    },
    
    _bindSsaoShader: function GLSharp_Graphics_Effects_SsaoEffect$_bindSsaoShader() {
        if (this._ssaoShader == null) {
            return;
        }
        this._graphics.bindShader(this._ssaoShader);
        this._graphics.bindTexture(this._ssaoShader.uniforms['uSPosition'], this._positionBuffer, 0);
    },
    
    _bindFinalShader: function GLSharp_Graphics_Effects_SsaoEffect$_bindFinalShader(previous) {
        /// <param name="previous" type="GLSharp.Graphics.Core.RenderGroup">
        /// </param>
        if (this._compositeShader == null) {
            return;
        }
        this._graphics.bindShader(this._compositeShader);
        this._graphics.bindTexture(this._compositeShader.uniforms['uSPost'], previous.renderTexture, 0);
        this._graphics.bindTexture(this._compositeShader.uniforms['uSAccumulation'], this._ssaoGroup.renderTexture, 1);
    }
}


Type.registerNamespace('GLSharp.Universe');

////////////////////////////////////////////////////////////////////////////////
// GLSharp.Universe.CameraComponent

GLSharp.Universe.CameraComponent = function GLSharp_Universe_CameraComponent() {
    GLSharp.Universe.CameraComponent.initializeBase(this);
    this.type = 'camera';
}


////////////////////////////////////////////////////////////////////////////////
// GLSharp.Universe.CollisionComponent

GLSharp.Universe.CollisionComponent = function GLSharp_Universe_CollisionComponent() {
    /// <field name="body" type="Box2D.Dynamics.b2Body">
    /// </field>
    /// <field name="bodyDefinition" type="Box2D.Dynamics.b2BodyDef">
    /// </field>
    /// <field name="fixtureDefinition" type="Box2D.Dynamics.b2FixtureDef">
    /// </field>
    GLSharp.Universe.CollisionComponent.initializeBase(this);
    this.type = 'collision';
}
GLSharp.Universe.CollisionComponent.prototype = {
    body: null,
    bodyDefinition: null,
    fixtureDefinition: null
}


////////////////////////////////////////////////////////////////////////////////
// GLSharp.Universe.ControllerBase

GLSharp.Universe.ControllerBase = function GLSharp_Universe_ControllerBase() {
    /// <field name="parent" type="GLSharp.Universe.Node">
    /// </field>
}
GLSharp.Universe.ControllerBase.prototype = {
    parent: null,
    
    bind: function GLSharp_Universe_ControllerBase$bind(parent) {
        /// <param name="parent" type="GLSharp.Universe.Node">
        /// </param>
        this.parent = parent;
        this.bindParent();
    }
}


////////////////////////////////////////////////////////////////////////////////
// GLSharp.Universe.LightComponent

GLSharp.Universe.LightComponent = function GLSharp_Universe_LightComponent() {
    /// <field name="typePoint" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="lightHandle" type="GLSharp.Content.Handle">
    /// </field>
    GLSharp.Universe.LightComponent.initializeBase(this);
    this.type = 'light';
}
GLSharp.Universe.LightComponent.prototype = {
    lightHandle: null
}


////////////////////////////////////////////////////////////////////////////////
// GLSharp.Universe.MaterialComponent

GLSharp.Universe.MaterialComponent = function GLSharp_Universe_MaterialComponent() {
    /// <field name="materialHandle" type="GLSharp.Content.Handle">
    /// </field>
    GLSharp.Universe.MaterialComponent.initializeBase(this);
    this.type = 'material';
}
GLSharp.Universe.MaterialComponent.prototype = {
    materialHandle: null
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
        if (!this._knownTypes.contains(component.type)) {
            return false;
        }
        this._components[component.type].add(component);
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
        if (!this._knownTypes.contains(component.type)) {
            return false;
        }
        return this._components[component.type].remove(component);
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
    /// <field name="_nextId" type="Number" integer="true" static="true">
    /// </field>
    /// <field name="meshComponent" type="String" static="true">
    /// </field>
    /// <field name="materialComponent" type="String" static="true">
    /// </field>
    /// <field name="textureComponent" type="String" static="true">
    /// </field>
    /// <field name="cameraComponent" type="String" static="true">
    /// </field>
    /// <field name="lightComponent" type="String" static="true">
    /// </field>
    /// <field name="collisionComponent" type="String" static="true">
    /// </field>
    /// <field name="type" type="String">
    /// Unique type of the component.
    /// </field>
    /// <field name="parent" type="GLSharp.Universe.Node">
    /// Parent node which contains the component.
    /// </field>
    /// <field name="id" type="Number" integer="true">
    /// </field>
    this.id = GLSharp.Universe.Component._nextId++;
}
GLSharp.Universe.Component.prototype = {
    type: null,
    parent: null,
    id: 0
}


////////////////////////////////////////////////////////////////////////////////
// GLSharp.Universe.MeshComponent

GLSharp.Universe.MeshComponent = function GLSharp_Universe_MeshComponent() {
    /// <field name="meshHandle" type="GLSharp.Content.Handle">
    /// </field>
    GLSharp.Universe.MeshComponent.initializeBase(this);
    this.type = 'mesh';
}
GLSharp.Universe.MeshComponent.prototype = {
    meshHandle: null
}


////////////////////////////////////////////////////////////////////////////////
// GLSharp.Universe.NodeAnimation

GLSharp.Universe.NodeAnimation = function GLSharp_Universe_NodeAnimation() {
    /// <field name="frameCount" type="Number" integer="true">
    /// </field>
    /// <field name="currentFrame" type="Number" integer="true">
    /// </field>
    /// <field name="animationStart" type="Number" integer="true">
    /// </field>
    /// <field name="animationEnd" type="Number" integer="true">
    /// </field>
    /// <field name="loop" type="Boolean">
    /// </field>
    /// <field name="translateX" type="Array" elementType="Number">
    /// </field>
    /// <field name="translateY" type="Array" elementType="Number">
    /// </field>
    /// <field name="translateZ" type="Array" elementType="Number">
    /// </field>
    /// <field name="rotateX" type="Array" elementType="Number">
    /// </field>
    /// <field name="rotateY" type="Array" elementType="Number">
    /// </field>
    /// <field name="rotateZ" type="Array" elementType="Number">
    /// </field>
    /// <field name="scaleX" type="Array" elementType="Number">
    /// </field>
    /// <field name="scaleY" type="Array" elementType="Number">
    /// </field>
    /// <field name="scaleZ" type="Array" elementType="Number">
    /// </field>
}
GLSharp.Universe.NodeAnimation.prototype = {
    frameCount: 0,
    currentFrame: 0,
    animationStart: 0,
    animationEnd: 0,
    loop: false,
    translateX: null,
    translateY: null,
    translateZ: null,
    rotateX: null,
    rotateY: null,
    rotateZ: null,
    scaleX: null,
    scaleY: null,
    scaleZ: null
}


////////////////////////////////////////////////////////////////////////////////
// GLSharp.Universe.NodeAnimationGroup

GLSharp.Universe.NodeAnimationGroup = function GLSharp_Universe_NodeAnimationGroup() {
    /// <field name="animations" type="Array">
    /// </field>
    this.animations = [];
}
GLSharp.Universe.NodeAnimationGroup.prototype = {
    
    setStartFrame: function GLSharp_Universe_NodeAnimationGroup$setStartFrame(frame, resetCurrent) {
        /// <param name="frame" type="Number" integer="true">
        /// </param>
        /// <param name="resetCurrent" type="Boolean">
        /// </param>
        var that = this;
        if (resetCurrent) {
            this.animations.forEach(function(value) {
                value.animationStart = frame;
                value.currentFrame = frame;
            });
        }
        else {
            this.animations.forEach(function(value) {
                value.animationStart = frame;
            });
        }
    },
    
    setEndFrame: function GLSharp_Universe_NodeAnimationGroup$setEndFrame(frame) {
        /// <param name="frame" type="Number" integer="true">
        /// </param>
        var that = this;
        this.animations.forEach(function(value) {
            value.animationEnd = frame;
            if (value.currentFrame >= frame && value.loop) {
                value.currentFrame = value.animationStart;
            }
        });
    },
    
    setRange: function GLSharp_Universe_NodeAnimationGroup$setRange(start, end, resetCurrent) {
        /// <param name="start" type="Number" integer="true">
        /// </param>
        /// <param name="end" type="Number" integer="true">
        /// </param>
        /// <param name="resetCurrent" type="Boolean">
        /// </param>
        var that = this;
        if (resetCurrent) {
            this.animations.forEach(function(value) {
                value.animationStart = start;
                value.animationEnd = end;
                value.currentFrame = start;
            });
        }
        else {
            this.animations.forEach(function(value) {
                value.animationStart = start;
                value.animationEnd = end;
            });
        }
    },
    
    setLoop: function GLSharp_Universe_NodeAnimationGroup$setLoop(loop) {
        /// <param name="loop" type="Boolean">
        /// </param>
        var that = this;
        this.animations.forEach(function(value) {
            value.loop = loop;
        });
    },
    
    resetAnimation: function GLSharp_Universe_NodeAnimationGroup$resetAnimation() {
        var that = this;
        this.animations.forEach(function(value) {
            value.currentFrame = value.animationStart;
        });
    }
}


////////////////////////////////////////////////////////////////////////////////
// GLSharp.Universe.Node

GLSharp.Universe.Node = function GLSharp_Universe_Node() {
    /// <field name="componentAdded" type="GLSharp.Core.Event">
    /// Called when a component is added.
    /// </field>
    /// <field name="componentRemoved" type="GLSharp.Core.Event">
    /// Called when a component is removed.
    /// </field>
    /// <field name="childAdded" type="GLSharp.Core.Event">
    /// Called when a child node is added.
    /// </field>
    /// <field name="childRemoved" type="GLSharp.Core.Event">
    /// Called when a child node is removed.
    /// </field>
    /// <field name="transformChanged" type="GLSharp.Core.Event">
    /// Called when the node transformation has changed.
    /// </field>
    /// <field name="_components" type="Object">
    /// </field>
    /// <field name="id" type="String">
    /// The name of the node.
    /// </field>
    /// <field name="_worldTransformation" type="GLSharp.Util.Matrix4X4">
    /// </field>
    /// <field name="_needWordUpdate" type="Boolean">
    /// </field>
    /// <field name="_localRotationMatrix" type="GLSharp.Util.Matrix4X4">
    /// </field>
    /// <field name="_localTranslationMatrix" type="GLSharp.Util.Matrix4X4">
    /// </field>
    /// <field name="_localScaleMatrix" type="GLSharp.Util.Matrix4X4">
    /// </field>
    /// <field name="_localTransformMatrix" type="GLSharp.Util.Matrix4X4">
    /// </field>
    /// <field name="_pivotMatrix" type="GLSharp.Util.Matrix4X4">
    /// </field>
    /// <field name="_inversePivotMatrix" type="GLSharp.Util.Matrix4X4">
    /// </field>
    /// <field name="_pivot" type="GLSharp.Util.Vector3">
    /// </field>
    /// <field name="localTranslation" type="GLSharp.Util.Vector3">
    /// Local translation.
    /// </field>
    /// <field name="localRotation" type="GLSharp.Util.Vector3">
    /// Local Rotation.
    /// </field>
    /// <field name="localScale" type="GLSharp.Util.Vector3">
    /// Local Scale.
    /// </field>
    /// <field name="animation" type="GLSharp.Universe.NodeAnimation">
    /// Animation object.
    /// </field>
    /// <field name="children" type="Object">
    /// Child nodes.
    /// </field>
    /// <field name="childrenList" type="Array">
    /// Child Nodes.
    /// </field>
    /// <field name="parent" type="GLSharp.Universe.Node">
    /// Parent node.
    /// </field>
    /// <field name="controller" type="GLSharp.Universe.ControllerBase">
    /// Controller
    /// </field>
    this.componentAdded = new GLSharp.Core.Event();
    this.componentRemoved = new GLSharp.Core.Event();
    this.childAdded = new GLSharp.Core.Event();
    this.childRemoved = new GLSharp.Core.Event();
    this.transformChanged = new GLSharp.Core.Event();
    this._components = {};
    this.children = {};
    this.childrenList = [];
    this._needWordUpdate = true;
    this._localRotationMatrix = GLSharp.Util.Matrix4X4.get_identity().clone();
    this._localScaleMatrix = GLSharp.Util.Matrix4X4.get_identity().clone();
    this._localTranslationMatrix = GLSharp.Util.Matrix4X4.get_identity().clone();
    this._localTransformMatrix = GLSharp.Util.Matrix4X4.get_identity().clone();
    this._worldTransformation = new GLSharp.Util.Matrix4X4(null);
    this.localTranslation = new GLSharp.Util.Vector3(null);
    this.localScale = new GLSharp.Util.Vector3(null);
    this.localRotation = new GLSharp.Util.Vector3(null);
    this.set_pivot(new GLSharp.Util.Vector3(null));
}
GLSharp.Universe.Node.prototype = {
    
    get_components: function GLSharp_Universe_Node$get_components() {
        /// <value type="Object"></value>
        return this._components;
    },
    
    id: null,
    _worldTransformation: null,
    _needWordUpdate: false,
    
    get_world: function GLSharp_Universe_Node$get_world() {
        /// <value type="GLSharp.Util.Matrix4X4"></value>
        if (this._needWordUpdate) {
            this._updateWorldTransformation();
        }
        return this._worldTransformation;
    },
    
    _localRotationMatrix: null,
    _localTranslationMatrix: null,
    _localScaleMatrix: null,
    _localTransformMatrix: null,
    _pivotMatrix: null,
    _inversePivotMatrix: null,
    
    get_local: function GLSharp_Universe_Node$get_local() {
        /// <summary>
        /// Local transformation matrix.
        /// </summary>
        /// <value type="GLSharp.Util.Matrix4X4"></value>
        if (this._needWordUpdate) {
            this._updateWorldTransformation();
        }
        return this._localTransformMatrix;
    },
    
    _pivot: null,
    
    get_pivot: function GLSharp_Universe_Node$get_pivot() {
        /// <summary>
        /// Gets the pivot for rotation.
        /// </summary>
        /// <value type="GLSharp.Util.Vector3"></value>
        return this._pivot;
    },
    set_pivot: function GLSharp_Universe_Node$set_pivot(value) {
        /// <summary>
        /// Gets the pivot for rotation.
        /// </summary>
        /// <value type="GLSharp.Util.Vector3"></value>
        this._pivot = value;
        this._pivotMatrix = GLSharp.Util.Matrix4X4.get_identity().clone().translate(this._pivot);
        this._inversePivotMatrix = GLSharp.Util.Matrix4X4.get_identity().clone().translateInverse(this._pivot);
        return value;
    },
    
    localTranslation: null,
    localRotation: null,
    localScale: null,
    animation: null,
    parent: null,
    controller: null,
    
    _updateWorldTransformation: function GLSharp_Universe_Node$_updateWorldTransformation() {
        if (this.animation != null) {
            this._localTranslationMatrix.setTranslate3(this.animation.translateX[this.animation.currentFrame] + this.localTranslation.elements[0], this.animation.translateY[this.animation.currentFrame] + this.localTranslation.elements[1], this.animation.translateZ[this.animation.currentFrame] + this.localTranslation.elements[2]);
            this._localScaleMatrix.setScale3(this.animation.scaleX[this.animation.currentFrame] + this.localScale.elements[0], this.animation.scaleY[this.animation.currentFrame] + this.localScale.elements[1], this.animation.scaleZ[this.animation.currentFrame] + this.localScale.elements[2]);
            this._localRotationMatrix.setRotation3(this.animation.rotateX[this.animation.currentFrame] + this.localRotation.elements[0], this.animation.rotateY[this.animation.currentFrame] + this.localRotation.elements[1], this.animation.rotateZ[this.animation.currentFrame] + this.localRotation.elements[2]);
        }
        this._localTranslationMatrix.copy(this._localTransformMatrix);
        this._localTransformMatrix.multiplyM2(this._pivotMatrix, this._localTransformMatrix);
        this._localTransformMatrix.multiplyM2(this._localRotationMatrix, this._localTransformMatrix);
        this._localTransformMatrix.multiplyM2(this._inversePivotMatrix, this._localTransformMatrix);
        this._localTransformMatrix.multiplyM2(this._localScaleMatrix, this._localTransformMatrix);
        if (this.parent != null) {
            this.parent.get_world().multiplyM2(this._localTransformMatrix, this._worldTransformation);
        }
        else {
            this._worldTransformation = this._localTransformMatrix;
        }
        this._needWordUpdate = false;
    },
    
    invalidateWorldTransformation: function GLSharp_Universe_Node$invalidateWorldTransformation() {
        this._needWordUpdate = true;
        this.childrenList.forEach(function(value) {
            value.invalidateWorldTransformation();
        });
    },
    
    addComponent: function GLSharp_Universe_Node$addComponent(component) {
        /// <param name="component" type="GLSharp.Universe.Component">
        /// </param>
        component.parent = this;
        this._components[component.type] = component;
        this.componentAdded.fire(this, component);
    },
    
    removeComponent: function GLSharp_Universe_Node$removeComponent(component) {
        /// <param name="component" type="GLSharp.Universe.Component">
        /// </param>
        component.parent = null;
        delete this._components[component.type];
        this.componentRemoved.fire(this, component);
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
        if (this.children[child.id] != null) {
            throw new Error('Child with the same name already exists.');
        }
        this.children[child.id] = child;
        this.childrenList.add(child);
        child.parent = this;
        this.childAdded.fire(this, child);
    },
    
    removeChild: function GLSharp_Universe_Node$removeChild(child) {
        /// <param name="child" type="GLSharp.Universe.Node">
        /// </param>
        /// <returns type="Boolean"></returns>
        if (this.children[child.id] == null) {
            return false;
        }
        delete this.children[child.id];
        this.childrenList.remove(child);
        child.parent = null;
        this.childRemoved.fire(this, child);
        return true;
    },
    
    findChild: function GLSharp_Universe_Node$findChild(id, deep) {
        /// <param name="id" type="String">
        /// </param>
        /// <param name="deep" type="Boolean">
        /// </param>
        /// <returns type="GLSharp.Universe.Node"></returns>
        if (this.id === id) {
            return this;
        }
        if (this.children[id] != null) {
            return this.children[id];
        }
        if (!deep) {
            return null;
        }
        var $dict1 = this.children;
        for (var $key2 in $dict1) {
            var child = { key: $key2, value: $dict1[$key2] };
            var ret = child.value.findChild(id, deep);
            if (ret != null) {
                return ret;
            }
        }
        return null;
    },
    
    translate: function GLSharp_Universe_Node$translate(distance) {
        /// <param name="distance" type="GLSharp.Util.Vector3">
        /// </param>
        this.localTranslation.add(distance);
        this._localTranslationMatrix.translate(distance);
        this.invalidateWorldTransformation();
        this.transformChanged.fire(this, null);
    },
    
    translate3: function GLSharp_Universe_Node$translate3(x, y, z) {
        /// <param name="x" type="Number">
        /// </param>
        /// <param name="y" type="Number">
        /// </param>
        /// <param name="z" type="Number">
        /// </param>
        this.localTranslation.add3(x, y, z);
        this._localTranslationMatrix.translate3(x, y, z);
        this.invalidateWorldTransformation();
        this.transformChanged.fire(this, null);
    },
    
    rotate: function GLSharp_Universe_Node$rotate(angle, axis) {
        /// <param name="angle" type="Number">
        /// </param>
        /// <param name="axis" type="GLSharp.Util.Vector3">
        /// </param>
        this.localRotation.add(axis.clone().scale(angle));
        this._localRotationMatrix.rotate(angle, axis);
        this.invalidateWorldTransformation();
        this.transformChanged.fire(this, null);
    },
    
    rotateX: function GLSharp_Universe_Node$rotateX(angle) {
        /// <param name="angle" type="Number">
        /// </param>
        this.localRotation.elements[0] += angle;
        this._localRotationMatrix.rotateX(angle);
        this.invalidateWorldTransformation();
        this.transformChanged.fire(this, null);
    },
    
    rotateY: function GLSharp_Universe_Node$rotateY(angle) {
        /// <param name="angle" type="Number">
        /// </param>
        this.localRotation.elements[1] += angle;
        this._localRotationMatrix.rotateY(angle);
        this.invalidateWorldTransformation();
        this.transformChanged.fire(this, null);
    },
    
    rotateZ: function GLSharp_Universe_Node$rotateZ(angle) {
        /// <param name="angle" type="Number">
        /// </param>
        this.localRotation.elements[2] += angle;
        this._localRotationMatrix.rotateZ(angle);
        this.invalidateWorldTransformation();
        this.transformChanged.fire(this, null);
    },
    
    scale: function GLSharp_Universe_Node$scale(scale) {
        /// <param name="scale" type="GLSharp.Util.Vector3">
        /// </param>
        this.localScale.multVect(scale);
        this._localScaleMatrix.scale(scale);
        this.invalidateWorldTransformation();
        this.transformChanged.fire(this, null);
    },
    
    bindController: function GLSharp_Universe_Node$bindController(controller) {
        /// <param name="controller" type="GLSharp.Universe.ControllerBase">
        /// </param>
        this.controller = controller;
        controller.bind(this);
    }
}


////////////////////////////////////////////////////////////////////////////////
// GLSharp.Universe.World

GLSharp.Universe.World = function GLSharp_Universe_World() {
    /// <field name="_rootNodes" type="Array">
    /// </field>
    /// <field name="nodeAdded" type="GLSharp.Core.Event">
    /// Called when a node gets added. The sender pbject is of type World.
    /// </field>
    /// <field name="nodeRemoved" type="GLSharp.Core.Event">
    /// Called when a node gets removed.
    /// </field>
    this._rootNodes = [];
    this.nodeAdded = new GLSharp.Core.Event();
    this.nodeRemoved = new GLSharp.Core.Event();
    this.reset();
}
GLSharp.Universe.World.prototype = {
    
    get_rootNodes: function GLSharp_Universe_World$get_rootNodes() {
        /// <value type="Array"></value>
        return this._rootNodes;
    },
    
    reset: function GLSharp_Universe_World$reset() {
    },
    
    addRootNode: function GLSharp_Universe_World$addRootNode(node) {
        /// <param name="node" type="GLSharp.Universe.Node">
        /// </param>
        if (node == null) {
            throw new Error('Node cannot be null.');
        }
        this._rootNodes.add(node);
        this.nodeAdded.fire(this, node);
    },
    
    removeNode: function GLSharp_Universe_World$removeNode(node) {
        /// <param name="node" type="GLSharp.Universe.Node">
        /// </param>
        if (node == null) {
            return;
        }
        this._rootNodes.remove(node);
        this.nodeRemoved.fire(this, node);
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
    /// <field name="elements" type="Array" elementType="Number">
    /// </field>
    this.elements = (elements == null) ? GLSharp.Core.SystemCore.environment.createFloat32Array(16) : GLSharp.Core.SystemCore.environment.createFloat32ArrayFromArray(elements);
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
    var rl = (right - left);
    var tb = (top - bottom);
    var fn = (zfar - znear);
    ret.elements[0] = (znear * 2) / rl;
    ret.elements[1] = 0;
    ret.elements[2] = 0;
    ret.elements[3] = 0;
    ret.elements[4] = 0;
    ret.elements[5] = (znear * 2) / tb;
    ret.elements[6] = 0;
    ret.elements[7] = 0;
    ret.elements[8] = (right + left) / rl;
    ret.elements[9] = (top + bottom) / tb;
    ret.elements[10] = -(zfar + znear) / fn;
    ret.elements[11] = -1;
    ret.elements[12] = 0;
    ret.elements[13] = 0;
    ret.elements[14] = -(zfar * znear * 2) / fn;
    ret.elements[15] = 0;
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
    var top = znear * Math.tan(fov * Math.PI / 360);
    var right = top * aspect;
    return GLSharp.Util.Matrix4X4.makeFrustrum(-right, right, -top, top, znear, zfar);
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
    var rl = (right - left);
    var tb = (top - bottom);
    var fn = (zfar - znear);
    ret.elements[0] = 2 / rl;
    ret.elements[1] = 0;
    ret.elements[2] = 0;
    ret.elements[3] = 0;
    ret.elements[4] = 0;
    ret.elements[5] = 2 / tb;
    ret.elements[6] = 0;
    ret.elements[7] = 0;
    ret.elements[8] = 0;
    ret.elements[9] = 0;
    ret.elements[10] = -2 / fn;
    ret.elements[11] = 0;
    ret.elements[12] = -(left + right) / rl;
    ret.elements[13] = -(top + bottom) / tb;
    ret.elements[14] = -(zfar + znear) / fn;
    ret.elements[15] = 1;
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
    var eyex = eye.elements[0], eyey = eye.elements[1], eyez = eye.elements[2], upx = up.elements[0], upy = up.elements[1], upz = up.elements[2], centerx = center.elements[0], centery = center.elements[1], centerz = center.elements[2];
    var z0, z1, z2, x0, x1, x2, y0, y1, y2, len;
    z0 = eyex - center.elements[0];
    z1 = eyey - center.elements[1];
    z2 = eyez - center.elements[2];
    len = 1 / Math.sqrt(z0 * z0 + z1 * z1 + z2 * z2);
    z0 *= len;
    z1 *= len;
    z2 *= len;
    x0 = upy * z2 - upz * z1;
    x1 = upz * z0 - upx * z2;
    x2 = upx * z1 - upy * z0;
    len = Math.sqrt(x0 * x0 + x1 * x1 + x2 * x2);
    if (!len) {
        x0 = 0;
        x1 = 0;
        x2 = 0;
    }
    else {
        len = 1 / len;
        x0 *= len;
        x1 *= len;
        x2 *= len;
    }
    y0 = z1 * x2 - z2 * x1;
    y1 = z2 * x0 - z0 * x2;
    y2 = z0 * x1 - z1 * x0;
    len = Math.sqrt(y0 * y0 + y1 * y1 + y2 * y2);
    if (!len) {
        y0 = 0;
        y1 = 0;
        y2 = 0;
    }
    else {
        len = 1 / len;
        y0 *= len;
        y1 *= len;
        y2 *= len;
    }
    ret.elements[0] = x0;
    ret.elements[1] = y0;
    ret.elements[2] = z0;
    ret.elements[3] = 0;
    ret.elements[4] = x1;
    ret.elements[5] = y1;
    ret.elements[6] = z1;
    ret.elements[7] = 0;
    ret.elements[8] = x2;
    ret.elements[9] = y2;
    ret.elements[10] = z2;
    ret.elements[11] = 0;
    ret.elements[12] = -(x0 * eyex + x1 * eyey + x2 * eyez);
    ret.elements[13] = -(y0 * eyex + y1 * eyey + y2 * eyez);
    ret.elements[14] = -(z0 * eyex + z1 * eyey + z2 * eyez);
    ret.elements[15] = 1;
    return ret;
}
GLSharp.Util.Matrix4X4.prototype = {
    elements: null,
    
    multiplyM: function GLSharp_Util_Matrix4X4$multiplyM(other) {
        /// <param name="other" type="GLSharp.Util.Matrix4X4">
        /// </param>
        /// <returns type="GLSharp.Util.Matrix4X4"></returns>
        var a00 = this.elements[0], a01 = this.elements[1], a02 = this.elements[2], a03 = this.elements[3];
        var a10 = this.elements[4], a11 = this.elements[5], a12 = this.elements[6], a13 = this.elements[7];
        var a20 = this.elements[8], a21 = this.elements[9], a22 = this.elements[10], a23 = this.elements[11];
        var a30 = this.elements[12], a31 = this.elements[13], a32 = this.elements[14], a33 = this.elements[15];
        var b00 = other.elements[0], b01 = other.elements[1], b02 = other.elements[2], b03 = other.elements[3];
        var b10 = other.elements[4], b11 = other.elements[5], b12 = other.elements[6], b13 = other.elements[7];
        var b20 = other.elements[8], b21 = other.elements[9], b22 = other.elements[10], b23 = other.elements[11];
        var b30 = other.elements[12], b31 = other.elements[13], b32 = other.elements[14], b33 = other.elements[15];
        this.elements[0] = b00 * a00 + b01 * a10 + b02 * a20 + b03 * a30;
        this.elements[1] = b00 * a01 + b01 * a11 + b02 * a21 + b03 * a31;
        this.elements[2] = b00 * a02 + b01 * a12 + b02 * a22 + b03 * a32;
        this.elements[3] = b00 * a03 + b01 * a13 + b02 * a23 + b03 * a33;
        this.elements[4] = b10 * a00 + b11 * a10 + b12 * a20 + b13 * a30;
        this.elements[5] = b10 * a01 + b11 * a11 + b12 * a21 + b13 * a31;
        this.elements[6] = b10 * a02 + b11 * a12 + b12 * a22 + b13 * a32;
        this.elements[7] = b10 * a03 + b11 * a13 + b12 * a23 + b13 * a33;
        this.elements[8] = b20 * a00 + b21 * a10 + b22 * a20 + b23 * a30;
        this.elements[9] = b20 * a01 + b21 * a11 + b22 * a21 + b23 * a31;
        this.elements[10] = b20 * a02 + b21 * a12 + b22 * a22 + b23 * a32;
        this.elements[11] = b20 * a03 + b21 * a13 + b22 * a23 + b23 * a33;
        this.elements[12] = b30 * a00 + b31 * a10 + b32 * a20 + b33 * a30;
        this.elements[13] = b30 * a01 + b31 * a11 + b32 * a21 + b33 * a31;
        this.elements[14] = b30 * a02 + b31 * a12 + b32 * a22 + b33 * a32;
        this.elements[15] = b30 * a03 + b31 * a13 + b32 * a23 + b33 * a33;
        return this;
    },
    
    multiplyMInv: function GLSharp_Util_Matrix4X4$multiplyMInv(other) {
        /// <param name="other" type="GLSharp.Util.Matrix4X4">
        /// </param>
        /// <returns type="GLSharp.Util.Matrix4X4"></returns>
        var a00 = this.elements[0], a01 = this.elements[1], a02 = this.elements[2], a03 = this.elements[3];
        var a10 = this.elements[4], a11 = this.elements[5], a12 = this.elements[6], a13 = this.elements[7];
        var a20 = this.elements[8], a21 = this.elements[9], a22 = this.elements[10], a23 = this.elements[11];
        var a30 = this.elements[12], a31 = this.elements[13], a32 = this.elements[14], a33 = this.elements[15];
        var b00 = other.elements[0], b01 = other.elements[1], b02 = other.elements[2], b03 = other.elements[3];
        var b10 = other.elements[4], b11 = other.elements[5], b12 = other.elements[6], b13 = other.elements[7];
        var b20 = other.elements[8], b21 = other.elements[9], b22 = other.elements[10], b23 = other.elements[11];
        var b30 = other.elements[12], b31 = other.elements[13], b32 = other.elements[14], b33 = other.elements[15];
        this.elements[0] = a00 * b00 + a01 * b10 + a02 * b20 + a03 * b30;
        this.elements[1] = a00 * b01 + a01 * b11 + a02 * b21 + a03 * b31;
        this.elements[2] = a00 * b02 + a01 * b12 + a02 * b22 + a03 * b32;
        this.elements[3] = a00 * b03 + a01 * b13 + a02 * b23 + a03 * b33;
        this.elements[4] = a10 * b00 + a11 * b10 + a12 * b20 + a13 * b30;
        this.elements[5] = a10 * b01 + a11 * b11 + a12 * b21 + a13 * b31;
        this.elements[6] = a10 * b02 + a11 * b12 + a12 * b22 + a13 * b32;
        this.elements[7] = a10 * b03 + a11 * b13 + a12 * b23 + a13 * b33;
        this.elements[8] = a20 * b00 + a21 * b10 + a22 * b20 + a23 * b30;
        this.elements[9] = a20 * b01 + a21 * b11 + a22 * b21 + a23 * b31;
        this.elements[10] = a20 * b02 + a21 * b12 + a22 * b22 + a23 * b32;
        this.elements[11] = a20 * b03 + a21 * b13 + a22 * b23 + a23 * b33;
        this.elements[12] = a30 * b00 + a31 * b10 + a32 * b20 + a33 * b30;
        this.elements[13] = a30 * b01 + a31 * b11 + a32 * b21 + a33 * b31;
        this.elements[14] = a30 * b02 + a31 * b12 + a32 * b22 + a33 * b32;
        this.elements[15] = a30 * b03 + a31 * b13 + a32 * b23 + a33 * b33;
        return this;
    },
    
    multiplyM2: function GLSharp_Util_Matrix4X4$multiplyM2(other, dest) {
        /// <param name="other" type="GLSharp.Util.Matrix4X4">
        /// </param>
        /// <param name="dest" type="GLSharp.Util.Matrix4X4">
        /// </param>
        /// <returns type="GLSharp.Util.Matrix4X4"></returns>
        var a00 = this.elements[0], a01 = this.elements[1], a02 = this.elements[2], a03 = this.elements[3];
        var a10 = this.elements[4], a11 = this.elements[5], a12 = this.elements[6], a13 = this.elements[7];
        var a20 = this.elements[8], a21 = this.elements[9], a22 = this.elements[10], a23 = this.elements[11];
        var a30 = this.elements[12], a31 = this.elements[13], a32 = this.elements[14], a33 = this.elements[15];
        var b00 = other.elements[0], b01 = other.elements[1], b02 = other.elements[2], b03 = other.elements[3];
        var b10 = other.elements[4], b11 = other.elements[5], b12 = other.elements[6], b13 = other.elements[7];
        var b20 = other.elements[8], b21 = other.elements[9], b22 = other.elements[10], b23 = other.elements[11];
        var b30 = other.elements[12], b31 = other.elements[13], b32 = other.elements[14], b33 = other.elements[15];
        dest.elements[0] = b00 * a00 + b01 * a10 + b02 * a20 + b03 * a30;
        dest.elements[1] = b00 * a01 + b01 * a11 + b02 * a21 + b03 * a31;
        dest.elements[2] = b00 * a02 + b01 * a12 + b02 * a22 + b03 * a32;
        dest.elements[3] = b00 * a03 + b01 * a13 + b02 * a23 + b03 * a33;
        dest.elements[4] = b10 * a00 + b11 * a10 + b12 * a20 + b13 * a30;
        dest.elements[5] = b10 * a01 + b11 * a11 + b12 * a21 + b13 * a31;
        dest.elements[6] = b10 * a02 + b11 * a12 + b12 * a22 + b13 * a32;
        dest.elements[7] = b10 * a03 + b11 * a13 + b12 * a23 + b13 * a33;
        dest.elements[8] = b20 * a00 + b21 * a10 + b22 * a20 + b23 * a30;
        dest.elements[9] = b20 * a01 + b21 * a11 + b22 * a21 + b23 * a31;
        dest.elements[10] = b20 * a02 + b21 * a12 + b22 * a22 + b23 * a32;
        dest.elements[11] = b20 * a03 + b21 * a13 + b22 * a23 + b23 * a33;
        dest.elements[12] = b30 * a00 + b31 * a10 + b32 * a20 + b33 * a30;
        dest.elements[13] = b30 * a01 + b31 * a11 + b32 * a21 + b33 * a31;
        dest.elements[14] = b30 * a02 + b31 * a12 + b32 * a22 + b33 * a32;
        dest.elements[15] = b30 * a03 + b31 * a13 + b32 * a23 + b33 * a33;
        return this;
    },
    
    transformV: function GLSharp_Util_Matrix4X4$transformV(vect) {
        /// <param name="vect" type="GLSharp.Util.Vector3">
        /// </param>
        /// <returns type="GLSharp.Util.Vector3"></returns>
        var x = vect.elements[0], y = vect.elements[1], z = vect.elements[2];
        vect.elements[0] = this.elements[0] * x + this.elements[4] * y + this.elements[8] * z + this.elements[12];
        vect.elements[1] = this.elements[1] * x + this.elements[5] * y + this.elements[9] * z + this.elements[13];
        vect.elements[2] = this.elements[2] * x + this.elements[6] * y + this.elements[10] * z + this.elements[14];
        return vect;
    },
    
    multiplyAffineM: function GLSharp_Util_Matrix4X4$multiplyAffineM(other) {
        /// <param name="other" type="GLSharp.Util.Matrix4X4">
        /// </param>
        /// <returns type="GLSharp.Util.Matrix4X4"></returns>
        var newe = GLSharp.Core.SystemCore.environment.createFloat32Array(16);
        newe[0] = this.elements[0] * other.elements[0] + this.elements[4] * other.elements[1] + this.elements[8] * other.elements[2];
        newe[1] = this.elements[1] * other.elements[0] + this.elements[5] * other.elements[1] + this.elements[9] * other.elements[2];
        newe[2] = this.elements[2] * other.elements[0] + this.elements[6] * other.elements[1] + this.elements[10] * other.elements[2];
        newe[3] = 0;
        newe[4] = this.elements[0] * other.elements[4] + this.elements[4] * other.elements[5] + this.elements[8] * other.elements[6];
        newe[5] = this.elements[1] * other.elements[4] + this.elements[5] * other.elements[5] + this.elements[9] * other.elements[6];
        newe[6] = this.elements[2] * other.elements[4] + this.elements[6] * other.elements[5] + this.elements[10] * other.elements[6];
        newe[7] = 0;
        newe[8] = this.elements[0] * other.elements[8] + this.elements[4] * other.elements[9] + this.elements[8] * other.elements[10];
        newe[9] = this.elements[1] * other.elements[8] + this.elements[5] * other.elements[9] + this.elements[9] * other.elements[10];
        newe[10] = this.elements[2] * other.elements[8] + this.elements[6] * other.elements[9] + this.elements[10] * other.elements[10];
        newe[11] = 0;
        newe[12] = this.elements[0] * other.elements[12] + this.elements[4] * other.elements[13] + this.elements[8] * other.elements[14] + this.elements[12];
        newe[13] = this.elements[1] * other.elements[12] + this.elements[5] * other.elements[13] + this.elements[9] * other.elements[14] + this.elements[13];
        newe[14] = this.elements[2] * other.elements[12] + this.elements[6] * other.elements[13] + this.elements[10] * other.elements[14] + this.elements[14];
        newe[15] = 1;
        this.elements = newe;
        return this;
    },
    
    rotate: function GLSharp_Util_Matrix4X4$rotate(angle, axis) {
        /// <param name="angle" type="Number">
        /// </param>
        /// <param name="axis" type="GLSharp.Util.Vector3">
        /// </param>
        /// <returns type="GLSharp.Util.Matrix4X4"></returns>
        var x = axis.elements[0], y = axis.elements[1], z = axis.elements[2];
        var len = Math.sqrt(x * x + y * y + z * z);
        if (len !== 1) {
            len = 1 / len;
            x *= len;
            y *= len;
            z *= len;
        }
        var s = Math.sin(angle);
        var c = Math.cos(angle);
        var t = 1 - c;
        var a00 = this.elements[0], a01 = this.elements[1], a02 = this.elements[2], a03 = this.elements[3];
        var a10 = this.elements[4], a11 = this.elements[5], a12 = this.elements[6], a13 = this.elements[7];
        var a20 = this.elements[8], a21 = this.elements[9], a22 = this.elements[10], a23 = this.elements[11];
        var b00 = x * x * t + c, b01 = y * x * t + z * s, b02 = z * x * t - y * s;
        var b10 = x * y * t - z * s, b11 = y * y * t + c, b12 = z * y * t + x * s;
        var b20 = x * z * t + y * s, b21 = y * z * t - x * s, b22 = z * z * t + c;
        this.elements[0] = a00 * b00 + a10 * b01 + a20 * b02;
        this.elements[1] = a01 * b00 + a11 * b01 + a21 * b02;
        this.elements[2] = a02 * b00 + a12 * b01 + a22 * b02;
        this.elements[3] = a03 * b00 + a13 * b01 + a23 * b02;
        this.elements[4] = a00 * b10 + a10 * b11 + a20 * b12;
        this.elements[5] = a01 * b10 + a11 * b11 + a21 * b12;
        this.elements[6] = a02 * b10 + a12 * b11 + a22 * b12;
        this.elements[7] = a03 * b10 + a13 * b11 + a23 * b12;
        this.elements[8] = a00 * b20 + a10 * b21 + a20 * b22;
        this.elements[9] = a01 * b20 + a11 * b21 + a21 * b22;
        this.elements[10] = a02 * b20 + a12 * b21 + a22 * b22;
        this.elements[11] = a03 * b20 + a13 * b21 + a23 * b22;
        return this;
    },
    
    rotateX: function GLSharp_Util_Matrix4X4$rotateX(angle) {
        /// <param name="angle" type="Number">
        /// </param>
        /// <returns type="GLSharp.Util.Matrix4X4"></returns>
        var s = Math.sin(angle);
        var c = Math.cos(angle);
        var a10 = this.elements[4], a11 = this.elements[5], a12 = this.elements[6], a13 = this.elements[7];
        var a20 = this.elements[8], a21 = this.elements[9], a22 = this.elements[10], a23 = this.elements[11];
        this.elements[4] = a10 * c + a20 * s;
        this.elements[5] = a11 * c + a21 * s;
        this.elements[6] = a12 * c + a22 * s;
        this.elements[7] = a13 * c + a23 * s;
        this.elements[8] = a10 * -s + a20 * c;
        this.elements[9] = a11 * -s + a21 * c;
        this.elements[10] = a12 * -s + a22 * c;
        this.elements[11] = a13 * -s + a23 * c;
        return this;
    },
    
    rotateY: function GLSharp_Util_Matrix4X4$rotateY(angle) {
        /// <param name="angle" type="Number">
        /// </param>
        /// <returns type="GLSharp.Util.Matrix4X4"></returns>
        var s = Math.sin(angle);
        var c = Math.cos(angle);
        var a00 = this.elements[0], a01 = this.elements[1], a02 = this.elements[2], a03 = this.elements[3];
        var a20 = this.elements[8], a21 = this.elements[9], a22 = this.elements[10], a23 = this.elements[11];
        this.elements[0] = a00 * c + a20 * -s;
        this.elements[1] = a01 * c + a21 * -s;
        this.elements[2] = a02 * c + a22 * -s;
        this.elements[3] = a03 * c + a23 * -s;
        this.elements[8] = a00 * s + a20 * c;
        this.elements[9] = a01 * s + a21 * c;
        this.elements[10] = a02 * s + a22 * c;
        this.elements[11] = a03 * s + a23 * c;
        return this;
    },
    
    rotateZ: function GLSharp_Util_Matrix4X4$rotateZ(angle) {
        /// <param name="angle" type="Number">
        /// </param>
        /// <returns type="GLSharp.Util.Matrix4X4"></returns>
        var s = Math.sin(angle);
        var c = Math.cos(angle);
        var a00 = this.elements[0], a01 = this.elements[1], a02 = this.elements[2], a03 = this.elements[3];
        var a10 = this.elements[4], a11 = this.elements[5], a12 = this.elements[6], a13 = this.elements[7];
        this.elements[0] = a00 * c + a10 * s;
        this.elements[1] = a01 * c + a11 * s;
        this.elements[2] = a02 * c + a12 * s;
        this.elements[3] = a03 * c + a13 * s;
        this.elements[4] = a00 * -s + a10 * c;
        this.elements[5] = a01 * -s + a11 * c;
        this.elements[6] = a02 * -s + a12 * c;
        this.elements[7] = a03 * -s + a13 * c;
        return this;
    },
    
    setRotation3: function GLSharp_Util_Matrix4X4$setRotation3(x, y, z) {
        /// <param name="x" type="Number">
        /// </param>
        /// <param name="y" type="Number">
        /// </param>
        /// <param name="z" type="Number">
        /// </param>
        /// <returns type="GLSharp.Util.Matrix4X4"></returns>
        var sx = Math.sin(x);
        var cx = Math.cos(x);
        var sy = Math.sin(y);
        var cy = Math.cos(y);
        var sz = Math.sin(z);
        var cz = Math.cos(z);
        this.elements[0] = cz * cy;
        this.elements[1] = sz * cy;
        this.elements[2] = -sy;
        this.elements[3] = 0;
        this.elements[4] = -sz * cx + cz * sy * sx;
        this.elements[5] = cz * cx + sz * sy * sx;
        this.elements[6] = cy * sx;
        this.elements[7] = 0;
        this.elements[8] = sz * sx + cz * sy * cx;
        this.elements[9] = cz * (-sx) + sz * sy * sx;
        this.elements[10] = cy * cx;
        this.elements[11] = 0;
        this.elements[12] = 0;
        this.elements[13] = 0;
        this.elements[14] = 0;
        this.elements[15] = 1;
        return this;
    },
    
    setRotation: function GLSharp_Util_Matrix4X4$setRotation(rotation) {
        /// <param name="rotation" type="GLSharp.Util.Vector3">
        /// </param>
        /// <returns type="GLSharp.Util.Matrix4X4"></returns>
        var x = rotation.elements[0];
        var y = rotation.elements[1];
        var z = rotation.elements[2];
        var sx = Math.sin(x);
        var cx = Math.cos(x);
        var sy = Math.sin(y);
        var cy = Math.cos(y);
        var sz = Math.sin(z);
        var cz = Math.cos(z);
        this.elements[0] = cz * cy;
        this.elements[1] = sz * cy;
        this.elements[2] = -sy;
        this.elements[3] = 0;
        this.elements[4] = -sz * cx + cz * sy * sx;
        this.elements[5] = cz * cx + sz * sy * sx;
        this.elements[6] = cy * sx;
        this.elements[7] = 0;
        this.elements[8] = sz * sx + cz * sy * cx;
        this.elements[9] = cz * (-sx) + sz * sy * sx;
        this.elements[10] = cy * cx;
        this.elements[11] = 0;
        this.elements[12] = 0;
        this.elements[13] = 0;
        this.elements[14] = 0;
        this.elements[15] = 1;
        return this;
    },
    
    scale: function GLSharp_Util_Matrix4X4$scale(scale) {
        /// <param name="scale" type="GLSharp.Util.Vector3">
        /// </param>
        /// <returns type="GLSharp.Util.Matrix4X4"></returns>
        this.elements[0] *= scale.elements[0];
        this.elements[1] *= scale.elements[0];
        this.elements[2] *= scale.elements[0];
        this.elements[3] *= scale.elements[0];
        this.elements[4] *= scale.elements[1];
        this.elements[5] *= scale.elements[1];
        this.elements[6] *= scale.elements[1];
        this.elements[7] *= scale.elements[1];
        this.elements[8] *= scale.elements[2];
        this.elements[9] *= scale.elements[2];
        this.elements[10] *= scale.elements[2];
        this.elements[11] *= scale.elements[2];
        return this;
    },
    
    scale1: function GLSharp_Util_Matrix4X4$scale1(value) {
        /// <param name="value" type="Number">
        /// </param>
        /// <returns type="GLSharp.Util.Matrix4X4"></returns>
        this.elements[0] *= value;
        this.elements[1] *= value;
        this.elements[2] *= value;
        this.elements[3] *= value;
        this.elements[4] *= value;
        this.elements[5] *= value;
        this.elements[6] *= value;
        this.elements[7] *= value;
        this.elements[8] *= value;
        this.elements[9] *= value;
        this.elements[10] *= value;
        this.elements[11] *= value;
        return this;
    },
    
    setScale1: function GLSharp_Util_Matrix4X4$setScale1(value) {
        /// <param name="value" type="Number">
        /// </param>
        /// <returns type="GLSharp.Util.Matrix4X4"></returns>
        this.elements[0] = value;
        this.elements[5] = value;
        this.elements[10] = value;
        return this;
    },
    
    setScale3: function GLSharp_Util_Matrix4X4$setScale3(x, y, z) {
        /// <param name="x" type="Number">
        /// </param>
        /// <param name="y" type="Number">
        /// </param>
        /// <param name="z" type="Number">
        /// </param>
        /// <returns type="GLSharp.Util.Matrix4X4"></returns>
        this.elements[0] = x;
        this.elements[5] = y;
        this.elements[10] = z;
        return this;
    },
    
    translate: function GLSharp_Util_Matrix4X4$translate(distance) {
        /// <param name="distance" type="GLSharp.Util.Vector3">
        /// </param>
        /// <returns type="GLSharp.Util.Matrix4X4"></returns>
        var x = distance.elements[0], y = distance.elements[1], z = distance.elements[2];
        this.elements[12] = this.elements[0] * x + this.elements[4] * y + this.elements[8] * z + this.elements[12];
        this.elements[13] = this.elements[1] * x + this.elements[5] * y + this.elements[9] * z + this.elements[13];
        this.elements[14] = this.elements[2] * x + this.elements[6] * y + this.elements[10] * z + this.elements[14];
        this.elements[15] = this.elements[3] * x + this.elements[7] * y + this.elements[11] * z + this.elements[15];
        return this;
    },
    
    translate3: function GLSharp_Util_Matrix4X4$translate3(x, y, z) {
        /// <param name="x" type="Number">
        /// </param>
        /// <param name="y" type="Number">
        /// </param>
        /// <param name="z" type="Number">
        /// </param>
        /// <returns type="GLSharp.Util.Matrix4X4"></returns>
        this.elements[12] = this.elements[0] * x + this.elements[4] * y + this.elements[8] * z + this.elements[12];
        this.elements[13] = this.elements[1] * x + this.elements[5] * y + this.elements[9] * z + this.elements[13];
        this.elements[14] = this.elements[2] * x + this.elements[6] * y + this.elements[10] * z + this.elements[14];
        this.elements[15] = this.elements[3] * x + this.elements[7] * y + this.elements[11] * z + this.elements[15];
        return this;
    },
    
    setTranslate: function GLSharp_Util_Matrix4X4$setTranslate(position) {
        /// <param name="position" type="GLSharp.Util.Vector3">
        /// </param>
        /// <returns type="GLSharp.Util.Matrix4X4"></returns>
        this.elements[12] = position.elements[0];
        this.elements[13] = position.elements[1];
        this.elements[14] = position.elements[2];
        return this;
    },
    
    setTranslate3: function GLSharp_Util_Matrix4X4$setTranslate3(x, y, z) {
        /// <param name="x" type="Number">
        /// </param>
        /// <param name="y" type="Number">
        /// </param>
        /// <param name="z" type="Number">
        /// </param>
        /// <returns type="GLSharp.Util.Matrix4X4"></returns>
        this.elements[12] = x;
        this.elements[13] = y;
        this.elements[14] = z;
        return this;
    },
    
    translateInverse: function GLSharp_Util_Matrix4X4$translateInverse(distance) {
        /// <param name="distance" type="GLSharp.Util.Vector3">
        /// </param>
        /// <returns type="GLSharp.Util.Matrix4X4"></returns>
        var x = -distance.elements[0], y = -distance.elements[1], z = -distance.elements[2];
        this.elements[12] = this.elements[0] * x + this.elements[4] * y + this.elements[8] * z + this.elements[12];
        this.elements[13] = this.elements[1] * x + this.elements[5] * y + this.elements[9] * z + this.elements[13];
        this.elements[14] = this.elements[2] * x + this.elements[6] * y + this.elements[10] * z + this.elements[14];
        this.elements[15] = this.elements[3] * x + this.elements[7] * y + this.elements[11] * z + this.elements[15];
        return this;
    },
    
    transpose: function GLSharp_Util_Matrix4X4$transpose() {
        /// <returns type="GLSharp.Util.Matrix4X4"></returns>
        var a01 = this.elements[1], a02 = this.elements[2], a03 = this.elements[3];
        var a12 = this.elements[6], a13 = this.elements[7];
        var a23 = this.elements[11];
        this.elements[1] = this.elements[4];
        this.elements[2] = this.elements[8];
        this.elements[3] = this.elements[12];
        this.elements[4] = a01;
        this.elements[6] = this.elements[9];
        this.elements[7] = this.elements[13];
        this.elements[8] = a02;
        this.elements[9] = a12;
        this.elements[11] = this.elements[14];
        this.elements[12] = a03;
        this.elements[13] = a13;
        this.elements[14] = a23;
        return this;
    },
    
    clone: function GLSharp_Util_Matrix4X4$clone() {
        /// <returns type="GLSharp.Util.Matrix4X4"></returns>
        return new GLSharp.Util.Matrix4X4(this.elements);
    },
    
    inverse: function GLSharp_Util_Matrix4X4$inverse() {
        /// <returns type="GLSharp.Util.Matrix4X4"></returns>
        var a00 = this.elements[0], a01 = this.elements[1], a02 = this.elements[2], a03 = this.elements[3];
        var a10 = this.elements[4], a11 = this.elements[5], a12 = this.elements[6], a13 = this.elements[7];
        var a20 = this.elements[8], a21 = this.elements[9], a22 = this.elements[10], a23 = this.elements[11];
        var a30 = this.elements[12], a31 = this.elements[13], a32 = this.elements[14], a33 = this.elements[15];
        var b00 = a00 * a11 - a01 * a10;
        var b01 = a00 * a12 - a02 * a10;
        var b02 = a00 * a13 - a03 * a10;
        var b03 = a01 * a12 - a02 * a11;
        var b04 = a01 * a13 - a03 * a11;
        var b05 = a02 * a13 - a03 * a12;
        var b06 = a20 * a31 - a21 * a30;
        var b07 = a20 * a32 - a22 * a30;
        var b08 = a20 * a33 - a23 * a30;
        var b09 = a21 * a32 - a22 * a31;
        var b10 = a21 * a33 - a23 * a31;
        var b11 = a22 * a33 - a23 * a32;
        var invDet = 1 / (b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06);
        this.elements[0] = (a11 * b11 - a12 * b10 + a13 * b09) * invDet;
        this.elements[1] = (-a01 * b11 + a02 * b10 - a03 * b09) * invDet;
        this.elements[2] = (a31 * b05 - a32 * b04 + a33 * b03) * invDet;
        this.elements[3] = (-a21 * b05 + a22 * b04 - a23 * b03) * invDet;
        this.elements[4] = (-a10 * b11 + a12 * b08 - a13 * b07) * invDet;
        this.elements[5] = (a00 * b11 - a02 * b08 + a03 * b07) * invDet;
        this.elements[6] = (-a30 * b05 + a32 * b02 - a33 * b01) * invDet;
        this.elements[7] = (a20 * b05 - a22 * b02 + a23 * b01) * invDet;
        this.elements[8] = (a10 * b10 - a11 * b08 + a13 * b06) * invDet;
        this.elements[9] = (-a00 * b10 + a01 * b08 - a03 * b06) * invDet;
        this.elements[10] = (a30 * b04 - a31 * b02 + a33 * b00) * invDet;
        this.elements[11] = (-a20 * b04 + a21 * b02 - a23 * b00) * invDet;
        this.elements[12] = (-a10 * b09 + a11 * b07 - a12 * b06) * invDet;
        this.elements[13] = (a00 * b09 - a01 * b07 + a02 * b06) * invDet;
        this.elements[14] = (-a30 * b03 + a31 * b01 - a32 * b00) * invDet;
        this.elements[15] = (a20 * b03 - a21 * b01 + a22 * b00) * invDet;
        return this;
    },
    
    inverse2: function GLSharp_Util_Matrix4X4$inverse2(dest) {
        /// <param name="dest" type="GLSharp.Util.Matrix4X4">
        /// </param>
        /// <returns type="GLSharp.Util.Matrix4X4"></returns>
        var a00 = this.elements[0], a01 = this.elements[1], a02 = this.elements[2], a03 = this.elements[3];
        var a10 = this.elements[4], a11 = this.elements[5], a12 = this.elements[6], a13 = this.elements[7];
        var a20 = this.elements[8], a21 = this.elements[9], a22 = this.elements[10], a23 = this.elements[11];
        var a30 = this.elements[12], a31 = this.elements[13], a32 = this.elements[14], a33 = this.elements[15];
        var b00 = a00 * a11 - a01 * a10;
        var b01 = a00 * a12 - a02 * a10;
        var b02 = a00 * a13 - a03 * a10;
        var b03 = a01 * a12 - a02 * a11;
        var b04 = a01 * a13 - a03 * a11;
        var b05 = a02 * a13 - a03 * a12;
        var b06 = a20 * a31 - a21 * a30;
        var b07 = a20 * a32 - a22 * a30;
        var b08 = a20 * a33 - a23 * a30;
        var b09 = a21 * a32 - a22 * a31;
        var b10 = a21 * a33 - a23 * a31;
        var b11 = a22 * a33 - a23 * a32;
        var invDet = 1 / (b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06);
        dest.elements[0] = (a11 * b11 - a12 * b10 + a13 * b09) * invDet;
        dest.elements[1] = (-a01 * b11 + a02 * b10 - a03 * b09) * invDet;
        dest.elements[2] = (a31 * b05 - a32 * b04 + a33 * b03) * invDet;
        dest.elements[3] = (-a21 * b05 + a22 * b04 - a23 * b03) * invDet;
        dest.elements[4] = (-a10 * b11 + a12 * b08 - a13 * b07) * invDet;
        dest.elements[5] = (a00 * b11 - a02 * b08 + a03 * b07) * invDet;
        dest.elements[6] = (-a30 * b05 + a32 * b02 - a33 * b01) * invDet;
        dest.elements[7] = (a20 * b05 - a22 * b02 + a23 * b01) * invDet;
        dest.elements[8] = (a10 * b10 - a11 * b08 + a13 * b06) * invDet;
        dest.elements[9] = (-a00 * b10 + a01 * b08 - a03 * b06) * invDet;
        dest.elements[10] = (a30 * b04 - a31 * b02 + a33 * b00) * invDet;
        dest.elements[11] = (-a20 * b04 + a21 * b02 - a23 * b00) * invDet;
        dest.elements[12] = (-a10 * b09 + a11 * b07 - a12 * b06) * invDet;
        dest.elements[13] = (a00 * b09 - a01 * b07 + a02 * b06) * invDet;
        dest.elements[14] = (-a30 * b03 + a31 * b01 - a32 * b00) * invDet;
        dest.elements[15] = (a20 * b03 - a21 * b01 + a22 * b00) * invDet;
        return this;
    },
    
    copy: function GLSharp_Util_Matrix4X4$copy(other) {
        /// <param name="other" type="GLSharp.Util.Matrix4X4">
        /// </param>
        other.elements[0] = this.elements[0];
        other.elements[1] = this.elements[1];
        other.elements[2] = this.elements[2];
        other.elements[3] = this.elements[3];
        other.elements[4] = this.elements[4];
        other.elements[5] = this.elements[5];
        other.elements[6] = this.elements[6];
        other.elements[7] = this.elements[7];
        other.elements[8] = this.elements[8];
        other.elements[9] = this.elements[9];
        other.elements[10] = this.elements[10];
        other.elements[11] = this.elements[11];
        other.elements[12] = this.elements[12];
        other.elements[13] = this.elements[13];
        other.elements[14] = this.elements[14];
        other.elements[15] = this.elements[15];
    }
}


////////////////////////////////////////////////////////////////////////////////
// GLSharp.Util.Quaternion4x4

GLSharp.Util.Quaternion4x4 = function GLSharp_Util_Quaternion4x4(elements) {
    /// <param name="elements" type="Array" elementType="Number">
    /// </param>
    /// <field name="elements" type="Array" elementType="Number">
    /// </field>
    this.elements = (elements == null) ? GLSharp.Core.SystemCore.environment.createFloat32Array(4) : GLSharp.Core.SystemCore.environment.createFloat32ArrayFromArray(elements);
}
GLSharp.Util.Quaternion4x4.prototype = {
    elements: null,
    
    inverse: function GLSharp_Util_Quaternion4x4$inverse() {
        /// <returns type="GLSharp.Util.Quaternion4x4"></returns>
        this.elements[0] *= -1;
        this.elements[1] *= -1;
        this.elements[2] *= -1;
        return this;
    },
    
    multiplyQ: function GLSharp_Util_Quaternion4x4$multiplyQ(other) {
        /// <param name="other" type="GLSharp.Util.Quaternion4x4">
        /// </param>
        /// <returns type="GLSharp.Util.Quaternion4x4"></returns>
        var qax = this.elements[0], qay = this.elements[1], qaz = this.elements[2], qaw = this.elements[3];
        var qbx = other.elements[0], qby = other.elements[1], qbz = other.elements[2], qbw = other.elements[3];
        this.elements[0] = qax * qbw + qaw * qbx + qay * qbz - qaz * qby;
        this.elements[1] = qay * qbw + qaw * qby + qaz * qbx - qax * qbz;
        this.elements[2] = qaz * qbw + qaw * qbz + qax * qby - qay * qbx;
        this.elements[3] = qaw * qbw - qax * qbx - qay * qby - qaz * qbz;
        return this;
    },
    
    multiplyV: function GLSharp_Util_Quaternion4x4$multiplyV(other) {
        /// <param name="other" type="GLSharp.Util.Vector3">
        /// </param>
        /// <returns type="GLSharp.Util.Vector3"></returns>
        var x = other.elements[0], y = other.elements[1], z = other.elements[2];
        var qx = this.elements[0], qy = this.elements[1], qz = this.elements[2], qw = this.elements[3];
        var ix = qw * x + qy * z - qz * y;
        var iy = qw * y + qz * x - qx * z;
        var iz = qw * z + qx * y - qy * x;
        var iw = -qx * x - qy * y - qz * z;
        other.elements[0] = ix * qw + iw * -qx + iy * -qz - iz * -qy;
        other.elements[1] = iy * qw + iw * -qy + iz * -qx - ix * -qz;
        other.elements[2] = iz * qw + iw * -qz + ix * -qy - iy * -qx;
        return other;
    },
    
    toMat4x4: function GLSharp_Util_Quaternion4x4$toMat4x4() {
        /// <returns type="GLSharp.Util.Matrix4X4"></returns>
        var ret = new GLSharp.Util.Matrix4X4(null);
        var x = this.elements[0], y = this.elements[1], z = this.elements[2], w = this.elements[3];
        var x2 = x + x;
        var y2 = y + y;
        var z2 = z + z;
        var xx = x * x2;
        var xy = x * y2;
        var xz = x * z2;
        var yy = y * y2;
        var yz = y * z2;
        var zz = z * z2;
        var wx = w * x2;
        var wy = w * y2;
        var wz = w * z2;
        ret.elements[0] = 1 - (yy + zz);
        ret.elements[1] = xy - wz;
        ret.elements[2] = xz + wy;
        ret.elements[3] = 0;
        ret.elements[4] = xy + wz;
        ret.elements[5] = 1 - (xx + zz);
        ret.elements[6] = yz - wx;
        ret.elements[7] = 0;
        ret.elements[8] = xz - wy;
        ret.elements[9] = yz + wx;
        ret.elements[10] = 1 - (xx + yy);
        ret.elements[11] = 0;
        ret.elements[12] = 0;
        ret.elements[13] = 0;
        ret.elements[14] = 0;
        ret.elements[15] = 1;
        return ret;
    },
    
    clone: function GLSharp_Util_Quaternion4x4$clone() {
        /// <returns type="GLSharp.Util.Quaternion4x4"></returns>
        return new GLSharp.Util.Quaternion4x4(this.elements);
    }
}


////////////////////////////////////////////////////////////////////////////////
// GLSharp.Util.VertexBoundingVolume

GLSharp.Util.VertexBoundingVolume = function GLSharp_Util_VertexBoundingVolume() {
    /// <field name="center" type="GLSharp.Util.Vector3">
    /// The center of the bounding volume.
    /// </field>
    /// <field name="vertexIndex" type="Number" integer="true">
    /// The vertex which is furthest away from the center. This is needed too calculate
    /// the radius of the bounding sphere after MV transformation.
    /// </field>
}
GLSharp.Util.VertexBoundingVolume.prototype = {
    center: null,
    vertexIndex: 0
}


////////////////////////////////////////////////////////////////////////////////
// GLSharp.Util.Vector3

GLSharp.Util.Vector3 = function GLSharp_Util_Vector3(elements) {
    /// <param name="elements" type="Array" elementType="Number">
    /// </param>
    /// <field name="elements" type="Array" elementType="Number">
    /// </field>
    this.elements = (elements == null) ? GLSharp.Core.SystemCore.environment.createFloat32Array(3) : GLSharp.Core.SystemCore.environment.createFloat32ArrayFromArray(elements);
}
GLSharp.Util.Vector3.build = function GLSharp_Util_Vector3$build(other) {
    /// <param name="other" type="GLSharp.Util.Vector3">
    /// </param>
    /// <returns type="GLSharp.Util.Vector3"></returns>
    return new GLSharp.Util.Vector3(other.elements);
}
GLSharp.Util.Vector3.build3 = function GLSharp_Util_Vector3$build3(x, y, z) {
    /// <param name="x" type="Number">
    /// </param>
    /// <param name="y" type="Number">
    /// </param>
    /// <param name="z" type="Number">
    /// </param>
    /// <returns type="GLSharp.Util.Vector3"></returns>
    var ret = new GLSharp.Util.Vector3(null);
    ret.elements[0] = x;
    ret.elements[1] = y;
    ret.elements[1] = z;
    return ret;
}
GLSharp.Util.Vector3.prototype = {
    elements: null,
    
    set: function GLSharp_Util_Vector3$set(other) {
        /// <param name="other" type="GLSharp.Util.Vector3">
        /// </param>
        this.elements[0] = other.elements[0];
        this.elements[1] = other.elements[1];
        this.elements[2] = other.elements[2];
    },
    
    set3: function GLSharp_Util_Vector3$set3(x, y, z) {
        /// <param name="x" type="Number">
        /// </param>
        /// <param name="y" type="Number">
        /// </param>
        /// <param name="z" type="Number">
        /// </param>
        this.elements[0] = x;
        this.elements[1] = y;
        this.elements[2] = z;
    },
    
    add: function GLSharp_Util_Vector3$add(other) {
        /// <param name="other" type="GLSharp.Util.Vector3">
        /// </param>
        /// <returns type="GLSharp.Util.Vector3"></returns>
        this.elements[0] += other.elements[0];
        this.elements[1] += other.elements[1];
        this.elements[2] += other.elements[2];
        return this;
    },
    
    add3: function GLSharp_Util_Vector3$add3(x, y, z) {
        /// <param name="x" type="Number">
        /// </param>
        /// <param name="y" type="Number">
        /// </param>
        /// <param name="z" type="Number">
        /// </param>
        /// <returns type="GLSharp.Util.Vector3"></returns>
        this.elements[0] += x;
        this.elements[1] += y;
        this.elements[2] += z;
        return this;
    },
    
    subtract: function GLSharp_Util_Vector3$subtract(other) {
        /// <param name="other" type="GLSharp.Util.Vector3">
        /// </param>
        /// <returns type="GLSharp.Util.Vector3"></returns>
        this.elements[0] -= other.elements[0];
        this.elements[1] -= other.elements[1];
        this.elements[2] -= other.elements[2];
        return this;
    },
    
    subtract3: function GLSharp_Util_Vector3$subtract3(x, y, z) {
        /// <param name="x" type="Number">
        /// </param>
        /// <param name="y" type="Number">
        /// </param>
        /// <param name="z" type="Number">
        /// </param>
        /// <returns type="GLSharp.Util.Vector3"></returns>
        this.elements[0] -= x;
        this.elements[1] -= y;
        this.elements[2] -= z;
        return this;
    },
    
    direction: function GLSharp_Util_Vector3$direction(to) {
        /// <param name="to" type="GLSharp.Util.Vector3">
        /// </param>
        /// <returns type="GLSharp.Util.Vector3"></returns>
        return this.clone().subtract(to).normalize();
    },
    
    distance: function GLSharp_Util_Vector3$distance(other) {
        /// <param name="other" type="GLSharp.Util.Vector3">
        /// </param>
        /// <returns type="Number"></returns>
        return Math.sqrt((other.elements[0] - this.elements[0]) * (other.elements[0] - this.elements[0]) + (other.elements[1] - this.elements[1]) * (other.elements[1] - this.elements[1]) + (other.elements[2] - this.elements[2]) * (other.elements[2] - this.elements[2]));
    },
    
    distance3: function GLSharp_Util_Vector3$distance3(x, y, z) {
        /// <param name="x" type="Number">
        /// </param>
        /// <param name="y" type="Number">
        /// </param>
        /// <param name="z" type="Number">
        /// </param>
        /// <returns type="Number"></returns>
        return Math.sqrt((x - this.elements[0]) * (x - this.elements[0]) + (y - this.elements[1]) * (y - this.elements[1]) + (z - this.elements[2]) * (z - this.elements[2]));
    },
    
    length: function GLSharp_Util_Vector3$length() {
        /// <returns type="Number" integer="true"></returns>
        return Math.sqrt(this.elements[0] * this.elements[0] + this.elements[1] * this.elements[1] + this.elements[2] * this.elements[2]);
    },
    
    normalize: function GLSharp_Util_Vector3$normalize() {
        /// <returns type="GLSharp.Util.Vector3"></returns>
        var len = 1 / this.length();
        this.elements[0] *= len;
        this.elements[1] *= len;
        this.elements[2] *= len;
        return this;
    },
    
    scale: function GLSharp_Util_Vector3$scale(val) {
        /// <param name="val" type="Number">
        /// </param>
        /// <returns type="GLSharp.Util.Vector3"></returns>
        this.elements[0] *= val;
        this.elements[1] *= val;
        this.elements[2] *= val;
        return this;
    },
    
    dot: function GLSharp_Util_Vector3$dot(other) {
        /// <param name="other" type="GLSharp.Util.Vector3">
        /// </param>
        /// <returns type="Number"></returns>
        return this.elements[0] * other.elements[0] + this.elements[1] * other.elements[1] + this.elements[2] * other.elements[2];
    },
    
    cross: function GLSharp_Util_Vector3$cross(other) {
        /// <param name="other" type="GLSharp.Util.Vector3">
        /// </param>
        /// <returns type="GLSharp.Util.Vector3"></returns>
        var x = this.elements[0], y = this.elements[1], z = this.elements[2];
        var x2 = other.elements[0], y2 = other.elements[1], z2 = other.elements[2];
        this.elements[0] = y * z2 - z * y2;
        this.elements[1] = z * x2 - x * z2;
        this.elements[2] = x * y2 - y * x2;
        return this;
    },
    
    multScalar: function GLSharp_Util_Vector3$multScalar(scalar) {
        /// <param name="scalar" type="Number">
        /// </param>
        this.elements[0] *= scalar;
        this.elements[1] *= scalar;
        this.elements[2] *= scalar;
    },
    
    multVect: function GLSharp_Util_Vector3$multVect(other) {
        /// <param name="other" type="GLSharp.Util.Vector3">
        /// </param>
        this.elements[0] *= other.elements[0];
        this.elements[1] *= other.elements[1];
        this.elements[2] *= other.elements[2];
    },
    
    clone: function GLSharp_Util_Vector3$clone() {
        /// <returns type="GLSharp.Util.Vector3"></returns>
        return new GLSharp.Util.Vector3(this.elements);
    }
}


Type.registerNamespace('GLSharp');

////////////////////////////////////////////////////////////////////////////////
// GLSharp.Engine

GLSharp.Engine = function GLSharp_Engine() {
    /// <field name="_renderHandle" type="GLSharp.Core.TimerHandle">
    /// </field>
    /// <field name="_cleanuphandle" type="GLSharp.Core.TimerHandle">
    /// </field>
    /// <field name="_updateHandle" type="GLSharp.Core.TimerHandle">
    /// </field>
    /// <field name="_lastTime" type="Number" integer="true">
    /// </field>
    /// <field name="_animQueue" type="Number">
    /// </field>
    /// <field name="_frames" type="Number" integer="true">
    /// </field>
    /// <field name="_animatedNodes" type="Array">
    /// </field>
    /// <field name="_controlledNodes" type="Array">
    /// </field>
    /// <field name="_b2World" type="Box2D.Dynamics.b2World">
    /// </field>
    /// <field name="_activeGame" type="GLSharp.Game.GameBase">
    /// </field>
    /// <field name="_activeWorld" type="GLSharp.Universe.World">
    /// </field>
    /// <field name="_graphics" type="GLSharp.Graphics.IGraphics">
    /// </field>
    /// <field name="_library" type="GLSharp.Content.Library">
    /// </field>
    this._lastTime = Date.get_now().getTime();
    this._animatedNodes = [];
    this._controlledNodes = [];
}
GLSharp.Engine.prototype = {
    _renderHandle: null,
    _cleanuphandle: null,
    _updateHandle: null,
    _animQueue: 0,
    _frames: 0,
    _b2World: null,
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
        this._bindWorld(this._activeWorld);
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
        var that = this;
        GLSharp.Core.SystemCore.timer.requestAnimationFrame(function() {
            that.get_graphics().render();
        });
        this._cleanuphandle = GLSharp.Core.SystemCore.timer.start(function() {
            that.get_library().update();
        }, 60000, true);
        this._updateHandle = GLSharp.Core.SystemCore.timer.start(function() {
            that._update();
        }, 1000 / 24, true);
        this.get_graphics().initialize(45, 0.1, 200);
        this.get_graphics().set_viewOccluder(new GLSharp.Graphics.ViewFrustrumOccluder());
        this.get_activeGame().initialize();
        this._b2World = new Box2D.Dynamics.b2World(new Box2D.Common.Math.b2Vec2(0, 0), true);
    },
    
    _update: function GLSharp_Engine$_update() {
        var now = Date.get_now().getTime();
        var delta = ((now - this._lastTime)) / 1000;
        this._updateControllers(delta);
        this._updateAnimation(delta);
        this._updateCollision(delta);
        this._lastTime = now;
    },
    
    _updateCollision: function GLSharp_Engine$_updateCollision(delta) {
        /// <param name="delta" type="Number">
        /// </param>
        this._b2World.Step(delta, 10, 10);
    },
    
    _updateAnimation: function GLSharp_Engine$_updateAnimation(delta) {
        /// <param name="delta" type="Number">
        /// </param>
        var engine = this;
        this._animQueue += delta;
        this._frames = Math.floor(this._animQueue / 0.015);
        this._animQueue -= this._frames * 0.015;
        this._animatedNodes.forEach(ss.Delegate.create(this, function(value) {
            if (value.animation != null) {
                value.animation.currentFrame += this._frames;
                if (value.animation.currentFrame >= value.animation.animationEnd) {
                    if (value.animation.loop) {
                        value.animation.currentFrame = value.animation.animationStart;
                    }
                    else {
                        value.animation.currentFrame = value.animation.animationEnd - 1;
                        return;
                    }
                }
                value.invalidateWorldTransformation();
            }
        }));
    },
    
    _updateControllers: function GLSharp_Engine$_updateControllers(delta) {
        /// <param name="delta" type="Number">
        /// </param>
        var that = this;
        this._controlledNodes.forEach(function(value) {
            if (value.controller != null) {
                value.controller.update(delta);
            }
        });
    },
    
    _bindWorld: function GLSharp_Engine$_bindWorld(world) {
        /// <param name="world" type="GLSharp.Universe.World">
        /// </param>
        world.nodeAdded.subscribe(ss.Delegate.create(this, this._worldNodeAdded), true);
        world.nodeRemoved.subscribe(ss.Delegate.create(this, this._worldNodeRemoved), true);
        var engine = this;
        world.get_rootNodes().forEach(function(value) {
            engine._worldNodeAdded(engine, value);
        });
    },
    
    _worldNodeRemoved: function GLSharp_Engine$_worldNodeRemoved(sender, args) {
        /// <param name="sender" type="Object">
        /// </param>
        /// <param name="args" type="Object">
        /// </param>
        var node = args;
        var engine = this;
        node.childrenList.forEach(function(value) {
            engine._worldNodeRemoved(engine, value);
        });
        if (node.animation != null) {
            this._animatedNodes.remove(node);
        }
        if (node.controller != null) {
            this._controlledNodes.remove(node);
        }
        if (node.get_components()['collision'] != null) {
            this._destroyCollision(node);
        }
        node.childAdded.unsubscribe(ss.Delegate.create(this, this._worldNodeAdded));
    },
    
    _worldNodeAdded: function GLSharp_Engine$_worldNodeAdded(sender, args) {
        /// <param name="sender" type="Object">
        /// </param>
        /// <param name="args" type="Object">
        /// </param>
        var node = args;
        var engine = this;
        node.childrenList.forEach(function(value) {
            engine._worldNodeAdded(engine, value);
        });
        if (node.animation != null) {
            this._animatedNodes.add(node);
        }
        if (node.controller != null) {
            this._controlledNodes.add(node);
        }
        if (node.get_components()['collision'] != null) {
            this._initializeCollision(node);
        }
        node.childAdded.subscribe(ss.Delegate.create(this, this._worldNodeAdded), true);
    },
    
    _initializeCollision: function GLSharp_Engine$_initializeCollision(node) {
        /// <param name="node" type="GLSharp.Universe.Node">
        /// </param>
        var component = node.get_components()['collision'];
        if (component.body != null) {
            this._destroyCollision(node);
        }
        component.body = this._b2World.CreateBody(component.bodyDefinition);
        component.body.CreateFixture(component.fixtureDefinition);
    },
    
    _destroyCollision: function GLSharp_Engine$_destroyCollision(node) {
        /// <param name="node" type="GLSharp.Universe.Node">
        /// </param>
        var component = node.get_components()['collision'];
        if (component.body == null) {
            return;
        }
        this._b2World.DestroyBody(component.body);
    },
    
    _initDebug: function GLSharp_Engine$_initDebug() {
        GLSharp.Core.SystemCore.logger.log('warning : debug is enabled.');
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


GLSharp.Content.ResourceItem.registerClass('GLSharp.Content.ResourceItem');
GLSharp.Content.LightItem.registerClass('GLSharp.Content.LightItem', GLSharp.Content.ResourceItem);
GLSharp.Content.LightConverter.registerClass('GLSharp.Content.LightConverter', null, GLSharp.Content.IResourceConverter);
GLSharp.Content.PropertyItem.registerClass('GLSharp.Content.PropertyItem');
GLSharp.Content.MaterialItem.registerClass('GLSharp.Content.MaterialItem', GLSharp.Content.ResourceItem);
GLSharp.Content.MaterialConverter.registerClass('GLSharp.Content.MaterialConverter', null, GLSharp.Content.IResourceConverter);
GLSharp.Content.TextureItem.registerClass('GLSharp.Content.TextureItem', GLSharp.Content.ResourceItem);
GLSharp.Content.TextureConverter.registerClass('GLSharp.Content.TextureConverter', null, GLSharp.Content.IResourceConverter);
GLSharp.Content.MeshItem.registerClass('GLSharp.Content.MeshItem', GLSharp.Content.ResourceItem);
GLSharp.Content.MeshConverter.registerClass('GLSharp.Content.MeshConverter', null, GLSharp.Content.IResourceConverter);
GLSharp.Content.NodeItem.registerClass('GLSharp.Content.NodeItem', GLSharp.Content.ResourceItem);
GLSharp.Content.NodeConverter.registerClass('GLSharp.Content.NodeConverter', null, GLSharp.Content.IResourceConverter);
GLSharp.Content.Handle.registerClass('GLSharp.Content.Handle');
GLSharp.Content.ResourceCollection.registerClass('GLSharp.Content.ResourceCollection');
GLSharp.Content.LibraryResult.registerClass('GLSharp.Content.LibraryResult');
GLSharp.Content.Library.registerClass('GLSharp.Content.Library');
GLSharp.Graphics.CullInfo.registerClass('GLSharp.Graphics.CullInfo');
GLSharp.Graphics.RegionOccluder.registerClass('GLSharp.Graphics.RegionOccluder', null, GLSharp.Graphics.IViewOccluder);
GLSharp.Graphics.ViewFrustrumOccluder.registerClass('GLSharp.Graphics.ViewFrustrumOccluder', null, GLSharp.Graphics.IViewOccluder);
GLSharp.Graphics.ShaderGroup.registerClass('GLSharp.Graphics.ShaderGroup');
GLSharp.Graphics.CompiledShader.registerClass('GLSharp.Graphics.CompiledShader');
GLSharp.Graphics.Color.registerClass('GLSharp.Graphics.Color');
GLSharp.Graphics.Core.RenderGroup.registerClass('GLSharp.Graphics.Core.RenderGroup');
GLSharp.Graphics.Effects.BloomEffect.registerClass('GLSharp.Graphics.Effects.BloomEffect', null, GLSharp.Graphics.Effects.IPostProcessEffect);
GLSharp.Graphics.Effects.DepthEffect.registerClass('GLSharp.Graphics.Effects.DepthEffect', null, GLSharp.Graphics.Effects.IPostProcessEffect);
GLSharp.Graphics.Effects.MotionBlurEffect.registerClass('GLSharp.Graphics.Effects.MotionBlurEffect', null, GLSharp.Graphics.Effects.IPostProcessEffect);
GLSharp.Graphics.Effects.SsaoEffect.registerClass('GLSharp.Graphics.Effects.SsaoEffect', null, GLSharp.Graphics.Effects.IPostProcessEffect);
GLSharp.Universe.Component.registerClass('GLSharp.Universe.Component');
GLSharp.Universe.CameraComponent.registerClass('GLSharp.Universe.CameraComponent', GLSharp.Universe.Component);
GLSharp.Universe.CollisionComponent.registerClass('GLSharp.Universe.CollisionComponent', GLSharp.Universe.Component);
GLSharp.Universe.ControllerBase.registerClass('GLSharp.Universe.ControllerBase');
GLSharp.Universe.LightComponent.registerClass('GLSharp.Universe.LightComponent', GLSharp.Universe.Component);
GLSharp.Universe.MaterialComponent.registerClass('GLSharp.Universe.MaterialComponent', GLSharp.Universe.Component);
GLSharp.Universe.ComponentCollection.registerClass('GLSharp.Universe.ComponentCollection');
GLSharp.Universe.MeshComponent.registerClass('GLSharp.Universe.MeshComponent', GLSharp.Universe.Component);
GLSharp.Universe.NodeAnimation.registerClass('GLSharp.Universe.NodeAnimation');
GLSharp.Universe.NodeAnimationGroup.registerClass('GLSharp.Universe.NodeAnimationGroup');
GLSharp.Universe.Node.registerClass('GLSharp.Universe.Node');
GLSharp.Universe.World.registerClass('GLSharp.Universe.World');
GLSharp.Util.Matrix4X4.registerClass('GLSharp.Util.Matrix4X4');
GLSharp.Util.Quaternion4x4.registerClass('GLSharp.Util.Quaternion4x4');
GLSharp.Util.VertexBoundingVolume.registerClass('GLSharp.Util.VertexBoundingVolume');
GLSharp.Util.Vector3.registerClass('GLSharp.Util.Vector3');
GLSharp.Engine.registerClass('GLSharp.Engine');
GLSharp.Game.GameBase.registerClass('GLSharp.Game.GameBase');
GLSharp.Content.MaterialConverter.colorType = 'color';
GLSharp.Content.MaterialConverter.textureHandleType = 'texture';
GLSharp.Content.MaterialConverter.floatType = 'float';
GLSharp.Content.ResourceItem._lastId = 0;
GLSharp.Universe.LightComponent.typePoint = 1;
GLSharp.Universe.Component._nextId = 0;
GLSharp.Universe.Component.meshComponent = 'mesh';
GLSharp.Universe.Component.materialComponent = 'material';
GLSharp.Universe.Component.textureComponent = 'texture';
GLSharp.Universe.Component.cameraComponent = 'camera';
GLSharp.Universe.Component.lightComponent = 'light';
GLSharp.Universe.Component.collisionComponent = 'collision';
GLSharp.Util.Matrix4X4._identity = null;
})();

//! This script was generated using Script# v0.7.4.0
