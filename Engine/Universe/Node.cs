// Node.cs
//

using System;
using System.Collections.Generic;

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

        private String _name = "Undefined";
        private readonly List<Component> _components = new List<Component>();

        /// <summary>
        /// The name of the node.
        /// </summary>
        public String Name { get { return _name; } set { _name = value; } }

        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        public Node() {
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        public void AddComponent(Component component) {
            this._components.Add(component);
            if (this.ComponentAdded != null)
                this.ComponentAdded(this, component);
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        public void RemoveComponent(Component component) {
            this._components.Remove(component);
            if (this.ComponentRemoved != null)
                this.ComponentRemoved(this, component);
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
				
    }
}
