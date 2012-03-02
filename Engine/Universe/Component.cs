// Class1.cs
//

using System;
using System.Collections.Generic;

namespace GLSharp.Universe {
    public abstract class Component {
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
