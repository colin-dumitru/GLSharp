// Node.cs
//

using System;
using System.Collections.Generic;
using GLSharp.Util;

namespace GLSharp.Universe {
    public delegate void NodeHandler(Node sender, Object args);

    public class Node {
        /// <summary>
        /// Called when a component is added.
        /// </summary>
        public event NodeHandler ComponentAdded;
        /// <summary>
        /// Called when a component is removed.
        /// </summary>
        public event NodeHandler ComponentRemoved;
        /// <summary>
        /// Called when a child node is added.
        /// </summary>
        public event NodeHandler ChildAdded;
        /// <summary>
        /// Called when a child node is removed.
        /// </summary>
        public event NodeHandler ChildRemoved;

        /// <summary>
        /// Called when the node transformation has changed.
        /// </summary>
        public event NodeHandler TransformChanged;

        private readonly Dictionary<String, Component> _components = new Dictionary<string, Component>();

        public Dictionary<String, Component> Components {
            get { return this._components; }
        }

        private String _id = "Undefined";

        /// <summary>
        /// The name of the node.
        /// </summary>
        public String Id { get { return this._id; } set { this._id = value; } }

        private Matrix4X4 _cachedTransformation;
        private Boolean _needWordUpdate;

        /*World transformation matrix.*/
        public Matrix4X4 World {
            get {
                if (this._needWordUpdate)
                    this.UpdateWorldTransformation();
                return _cachedTransformation;
            }
        }

        private Matrix4X4 _localTransformation;

        /// <summary>
        /// Local transformation matrix.
        /// </summary>
        public Matrix4X4 Local {
            get { return _localTransformation; }
            set { _localTransformation = value; }
        }

        private Vector3 _localTranslation;

        /// <summary>
        /// Local translation.
        /// </summary>
        public Vector3 LocalTranslation {
            get { return _localTranslation; }
        }

        private Vector3 _localRotation;

        /// <summary>
        /// Local Rotation.
        /// </summary>
        public Vector3 LocalRotation {
            get { return _localRotation; }
            set { _localRotation = value; }
        }

        private Vector3 _localScale;

        /// <summary>
        /// Local Scale.
        /// </summary>
        public Vector3 LocalScale {
            get { return _localScale; }
            set { _localScale = value; }
        }

        private Dictionary<String, Node> _children;

        /// <summary>
        /// Child nodes.
        /// </summary>
        public Dictionary<String, Node> Children {
            /*lazy init*/
            get {
                if (this._children == null)
                    this._children = new Dictionary<string, Node>();

                return this._children;
            }
        }

        private Node _parent;

        /// <summary>
        /// Parent node.
        /// </summary>
        public Node Parent {
            get { return _parent; }
            set { _parent = value; }
        }

        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        public Node() {
            this._needWordUpdate = true;

            this._localTransformation = Matrix4X4.Identity.Clone();
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        private void UpdateWorldTransformation() {
            this._cachedTransformation = this.Parent.World.Clone().MultiplyAffineM(this._cachedTransformation);

            this._needWordUpdate = false;
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        public void InvalidateWorldTransformation() {
            this._needWordUpdate = true;
            foreach (KeyValuePair<string, Node> keyValuePair in Children) {
                keyValuePair.Value.InvalidateWorldTransformation();
            }
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        public void AddComponent(Component component) {
            component.Parent = this;

            this._components[component.Type] = component;
            if (this.ComponentAdded != null)
                this.ComponentAdded(this, component);
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        public void RemoveComponent(Component component) {
            component.Parent = null;

            this._components.Remove(component.Type);
            if (this.ComponentRemoved != null)
                this.ComponentRemoved(this, component);
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        public Component GetComponent(String type) {
            return this._components[type];
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        public void AddChild(Node child) {
            if (this._children[child.Id] != null)
                throw new Exception("Child with the same name already exists.");
            this._children[child.Id] = child;
            child.Parent = this;

            if (this.ChildAdded != null)
                this.ChildAdded(this, child);
        }

        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        public Boolean RemoveChild(Node child) {
            if (this._children[child.Id] == null)
                return false;
            this._children.Remove(child.Id);
            child.Parent = null;

            if (this.ChildRemoved != null)
                this.ChildRemoved(this, child);

            return true;
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        public Node FindChild(String id, Boolean deep) {
            //!++ todo
            return null;
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        public void Translate(Vector3 distance) {
            this._localTranslation.Add(distance);

            this._localTransformation.Translate(distance);
            this.InvalidateWorldTransformation();

            if (this.TransformChanged != null)
                this.TransformChanged(this, null);
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        public void Rotate(float angle, Vector3 axis) {
            this._localRotation.Add(axis.Clone().Scale(angle));

            this._localTransformation.Rotate(angle, axis);
            this.InvalidateWorldTransformation();

            if (this.TransformChanged != null)
                this.TransformChanged(this, null);
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        public void Scale(Vector3 scale) {
            this._localScale.Add(scale);

            this._localTransformation.Scale(scale);
            this.InvalidateWorldTransformation();

            if (this.TransformChanged != null)
                this.TransformChanged(this, null);
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------

    }
}
