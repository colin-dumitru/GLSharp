// Words.cs
//

using System;
using System.Collections.Generic;
using GLSharp.Core;

namespace GLSharp.Universe {
    public delegate void WorldHandler(World sender, Object args);

    public class World {
        private List<Node> _rootNodes = new List<Node>();

        public List<Node> RootNodes {
            get { return _rootNodes; }
        }
        

        /// <summary>
        /// Called when a node gets added. The sender pbject is of type World.
        /// </summary>
        public Event NodeAdded = new Event();
        /// <summary>
        /// Called when a node gets removed.
        /// </summary>
        public Event NodeRemoved = new Event();

        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        public World() {
            this.Reset();
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        public void Reset() {
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        public void AddRootNode(Node node) {
            if(node == null)
                throw new Exception("Node cannot be null.");

            this._rootNodes.Add(node);
            this.NodeAdded.Fire(this, node);
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        public void RemoveNode(Node node) {
            if(node == null)
                return;

            this._rootNodes.Remove(node);
            this.NodeRemoved.Fire(this, node);
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
				
				

        
    }
}
