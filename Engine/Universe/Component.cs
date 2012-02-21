// Class1.cs
//

using System;
using System.Collections.Generic;

namespace GLSharp.Universe {
    public abstract class Component {
        private String _type;

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


        /// <summary>
        /// Gets called on the draw cycle.
        /// </summary>
        public abstract void Draw();
        /// <summary>
        /// Gets called in the update cycle.
        /// </summary>
        /// <param name="dt">Delta time</param>
        public abstract void Update(long dt);
        
    }
}
