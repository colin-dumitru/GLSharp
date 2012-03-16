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

        private readonly Dictionary<String, Component> _components = new Dictionary<string, Component>();

        private String _id = "Undefined";

        /// <summary>
        /// The name of the node.
        /// </summary>
        public String Id { get { return this._id; } set { this._id = value; } }

        private Matrix4X4 _matrix4;

        /// <summary>
        /// A 4x4 transformation matrix.
        /// </summary>
        public Matrix4X4 Matrix {
            get { return _matrix4; }
            set { _matrix4 = value; }
        }

        private Dictionary<String, Node> _children;

        public Dictionary<String, Node> Children {
            /*lazy init*/
            get {
                if(this._children == null)
                    this._children = new Dictionary<string, Node>();

                return this._children;
            }
        }
        

        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        public Node() {
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        public void AddComponent(Component component) {
            this._components[component.Type] = component;
            if (this.ComponentAdded != null)
                this.ComponentAdded(this, component);
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        public void RemoveComponent(Component component) {
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
            if(this._children[child.Id] != null)
                throw new Exception("Child with the same name already exists.");
            this._children[child.Id] = child;

            if (this.ChildAdded != null)
                this.ChildAdded(this, child);
        }

        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
		public Boolean RemoveChild(Node child) {
            if (this._children[child.Id] == null)
                return false;
            this._children.Remove(child.Id);

            if (this.ChildRemoved != null)
                this.ChildRemoved(this, child);
		}
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
		public Node FindChild(String id, Boolean deep) {
		    //!++ todo
		}
				
    }
}
