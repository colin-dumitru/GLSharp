// Class1.cs
//

using System;
using System.Collections.Generic;

namespace GLSharp.Universe {
    /// <summary>
    /// Manages a collection of components.
    /// </summary>
    public class ComponentCollection {
        private Dictionary<String, List<Component>> _components = new Dictionary<string, List<Component>>();
        private List<String> _knownTypes = new List<string>();

        public void AddKnownType(String type) {
            this._knownTypes.Add(type);
        }

        public void RemoveKnowType(String type) {
            this._knownTypes.Remove(type);
            /*also remove the collection for this type*/
            this._components.Remove(type);
        }

        /// <summary>
        /// Adds a component to the collection. If the component is not a known type
        /// it is ignored.
        /// </summary>
        /// <param name="component">The component to add.</param>
        /// <returns>If the compoent is a known type and if it was added to the collection.</returns>
        public Boolean AddComponent(Component component) {
            if (!this._knownTypes.Contains(component.Type)) return false;

            this._components[component.Type].Add(component);

            return true;
        }

        /// <summary>
        /// Removes a component to the collection. If the component is not a known type
        /// it is ignored.
        /// </summary>
        /// <param name="component">The component to remove.</param>
        /// <returns>If the compoent is a known type and if it was removed from the collection.</returns>
        public Boolean RemoveComponent(Component component) {
            if (!this._knownTypes.Contains(component.Type)) return false;

            return this._components[component.Type].Remove(component);
        }

        public List<Component> GetCollection(String type) {
            if (!this._knownTypes.Contains(type)) return null;

            return this._components[type];
        } 
    }
    //------------------------------------------------------------------------------------------
    //------------------------------------------------------------------------------------------
    public abstract class Component {
        public const String MeshComponent = "mesh";
        public const String MaterialComponent = "material";

        protected String _type;

        /// <summary>
        /// Unique type of the component.
        /// </summary>
        public String Type {
            get { return _type; }
            set { _type = value; }
        }

        private Node _parent;

        /// <summary>
        /// Parent node which contains the component.
        /// </summary>
        public Node Parent {
            get { return _parent; }
            set { _parent = value; }
        }
        
    }
}
