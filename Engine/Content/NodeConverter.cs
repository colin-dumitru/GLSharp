// NodeConverter.cs
//

using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using GLSharp.Universe;
using GLSharp.Util;

namespace GLSharp.Content {
    [Imported]
    [IgnoreNamespace]
    internal abstract class ReferenceObject {
        public abstract String Type { get; set; }
        public abstract String Resource { get; set; }
        public abstract String Library { get; set; }
        public abstract List<ReferenceObject> Children { get; set; }
    }

    [Imported]
    [IgnoreNamespace]
    internal abstract class NodeObject {
        public abstract String Id { get; set; }
        public abstract float[] Matrix { get; set; }
        public abstract List<NodeObject> Children { get; set; }
        public abstract List<ReferenceObject> References { get; set; }
    }

    public class NodeConverter : IResourceConverter {

        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
				
        public string TypeHandled {
            get { return "node"; }
        }

        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
				
        public object Convert(object input) {
            NodeObject root = (NodeObject) input;
            return this.ConvertNodeObject(root);
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        private Node ConvertNodeObject(NodeObject root) {
            Node ret = new Node();

            ret.Id = root.Id;
            ret.Matrix = new Matrix4X4(root.Matrix);

            /*child nodes*/
            foreach (NodeObject nodeObject in root.Children) {
                ret.AddChild(this.ConvertNodeObject(nodeObject));
            }

            List<Component> compColection = new List<Component>();

            /*components*/
            foreach (ReferenceObject referenceObject in root.References) {
                this.ConvertReferences(referenceObject, compColection);
            }

            foreach (Component component in compColection) {
                ret.AddComponent(component);
            }

            return ret;
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        private void ConvertReferences(ReferenceObject reference, List<Component> collection) {
            //! change this to a factory method
            if(reference.Type == "mesh") {
                MeshComponent comp = new MeshComponent();

                Handle handle = new Handle();
                handle.Library = reference.Library;
                handle.Id = reference.Resource;

                comp.MeshHandle = handle;
                collection.Add(comp);
            } else if (reference.Type == "material") {
                MaterialComponent comp = new MaterialComponent();

                Handle handle = new Handle();
                handle.Library = reference.Library;
                handle.Id = reference.Resource;

                comp.MaterialHandle = handle;
                collection.Add(comp);
            }

            /*child references*/
            foreach (ReferenceObject referenceObject in reference.Children) {
                this.ConvertReferences(referenceObject, collection);
            }
        }
    }
}
