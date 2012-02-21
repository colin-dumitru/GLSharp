// Words.cs
//

using System;
using System.Collections.Generic;

namespace GLSharp.Universe {
    public delegate void WorldHandler(World sender, Object args);

    public class World {
        private List<Node> _nodeList = null;

        /// <summary>
        /// 
        /// </summary>
        public List<Node> RootNodes {
            get { return _nodeList; }
        }

        /// <summary>
        /// Called when a node gets added.
        /// </summary>
        public event WorldHandler NodeAdded;
        /// <summary>
        /// Called when a node gets removed.
        /// </summary>
        public event WorldHandler NodeRemoved;


        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        public World() {
            this._nodeList = new List<Node>();
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        public void AddNode(Node node) {
            this._nodeList.Add(node);
            if (this.NodeAdded != null)
                this.NodeAdded(this, node);
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        public void RemoveNode(Node node) {
            this._nodeList.Remove(node);
            if (this.NodeRemoved != null)
                this.NodeRemoved(this, node);
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
				
				

        
    }
}
