// NodeConverter.cs
//

using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using Box2D.Collision.Shapes;
using Box2D.Dynamics;
using GLSharp.Universe;
using GLSharp.Util;

namespace GLSharp.Content {
    [Imported]
    [IgnoreNamespace]
    internal abstract class ReferenceObject {
        [PreserveCase]
        [IntrinsicProperty]
        public abstract String Type { get; set; }
        [PreserveCase]
        [IntrinsicProperty]
        public abstract String Resource { get; set; }
        [PreserveCase]
        [IntrinsicProperty]
        public abstract String Library { get; set; }
        [PreserveCase]
        [IntrinsicProperty]
        public abstract List<ReferenceObject> Children { get; set; }
    }

    [Imported]
    [IgnoreNamespace]
    internal abstract class AnimationObject {
        [PreserveCase]
        [IntrinsicProperty]
        public abstract int FrameCount { get; set; }

        [PreserveCase]
        [IntrinsicProperty]
        public abstract float[] TranslateX { get; set; }
        [PreserveCase]
        [IntrinsicProperty]
        public abstract float[] TranslateY { get; set; }
        [PreserveCase]
        [IntrinsicProperty]
        public abstract float[] TranslateZ { get; set; }

        [PreserveCase]
        [IntrinsicProperty]
        public abstract float[] RotateX { get; set; }
        [PreserveCase]
        [IntrinsicProperty]
        public abstract float[] RotateY { get; set; }
        [PreserveCase]
        [IntrinsicProperty]
        public abstract float[] RotateZ { get; set; }

        [PreserveCase]
        [IntrinsicProperty]
        public abstract float[] ScaleX { get; set; }
        [PreserveCase]
        [IntrinsicProperty]
        public abstract float[] ScaleY { get; set; }
        [PreserveCase]
        [IntrinsicProperty]
        public abstract float[] ScaleZ { get; set; }
    }

    [Imported]
    [IgnoreNamespace]
    internal abstract class ObCollision : CollisionObject {
        [PreserveCase]
        [IntrinsicProperty]
        public abstract float Width { get; set; }

        [PreserveCase]
        [IntrinsicProperty]
        public abstract float Height { get; set; }
    }

    [Imported]
    [IgnoreNamespace]
    internal abstract class SphereCollision : CollisionObject {
        [PreserveCase]
        [IntrinsicProperty]
        public abstract float Radius { get; set; }
    }

    [Imported]
    [IgnoreNamespace]
    internal abstract class CollisionObject {
        [PreserveCase]
        [IntrinsicProperty]
        public abstract String Type { get; set; }

        [PreserveCase]
        [IntrinsicProperty]
        public abstract float PositionX { get; set; }

        [PreserveCase]
        [IntrinsicProperty]
        public abstract float PositionY { get; set; }

        [PreserveCase]
        [IntrinsicProperty]
        public abstract Boolean Static { get; set; }
    }

    [Imported]
    [IgnoreNamespace]
    internal abstract class NodeObject {
        [PreserveCase]
        [IntrinsicProperty]
        public abstract String Id { get; set; }

        [PreserveCase]
        [IntrinsicProperty]
        public abstract float[] Translation { get; set; }
        [PreserveCase]
        [IntrinsicProperty]
        public abstract float[] PivotTranslation { get; set; }
        [PreserveCase]
        [IntrinsicProperty]
        public abstract float[] Scale { get; set; }
        [PreserveCase]
        [IntrinsicProperty]
        public abstract float RotateX { get; set; }
        [PreserveCase]
        [IntrinsicProperty]
        public abstract float RotateY { get; set; }
        [PreserveCase]
        [IntrinsicProperty]
        public abstract float RotateZ { get; set; }

        [PreserveCase]
        [IntrinsicProperty]
        public abstract AnimationObject Animation { get; set; }
        [PreserveCase]
        [IntrinsicProperty]
        public abstract CollisionObject Collision { get; set; }

        [PreserveCase]
        [IntrinsicProperty]
        public abstract List<NodeObject> Children { get; set; }
        [PreserveCase]
        [IntrinsicProperty]
        public abstract List<ReferenceObject> References { get; set; }
    }

    public class NodeItem : ResourceItem {
        public Node Root;

        public override Boolean Free() {
            this.Alocated = false;
            return true;
        }
        public override Boolean Readlocate() {
            this.Alocated = false;
            return true;
        }
    }

    public class NodeConverter : IResourceConverter {

        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
				
        public string TypeHandled {
            get { return "node"; }
        }

        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------

        public ResourceItem Convert(object input, String collection) {
            NodeObject root = (NodeObject) input;
            NodeItem ret = new NodeItem();

            ret.Root = this.ConvertNodeObject(root, null);
            return ret;
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        private Node ConvertNodeObject(NodeObject root, Node parent) {
            Node ret = new Node();

            ret.Id = root.Id;
            //ret.Local = new Matrix4X4(root.Matrix);

            /*apply transformation*/
            if(root.RotateX != 0) ret.RotateX(root.RotateX);
            if(root.RotateY != 0) ret.RotateY(root.RotateY);
            if(root.RotateZ != 0) ret.RotateZ(root.RotateZ);
            if(root.Translation != null) ret.Translate(new Vector3(root.Translation));
            if(root.PivotTranslation != null) ret.Pivot = new Vector3(root.PivotTranslation);
            if(root.Scale != null) ret.Scale(new Vector3(root.Scale));

            /*parent node*/
            if(parent != null)
                parent.AddChild(ret);

            /*animation*/
            if (root.Animation != null) {
                ret.Animation = new NodeAnimation();

                ret.Animation.TranslateX = root.Animation.TranslateX;
                ret.Animation.TranslateY = root.Animation.TranslateY;
                ret.Animation.TranslateZ = root.Animation.TranslateZ;

                ret.Animation.ScaleX = root.Animation.ScaleX;
                ret.Animation.ScaleY = root.Animation.ScaleY;
                ret.Animation.ScaleZ = root.Animation.ScaleZ;

                ret.Animation.RotateX = root.Animation.RotateX;
                ret.Animation.RotateY = root.Animation.RotateY;
                ret.Animation.RotateZ = root.Animation.RotateZ;

                ret.Animation.FrameCount = root.Animation.FrameCount;
                ret.Animation.CurrentFrame = 0;
                ret.Animation.AnimationStart = 0;
                ret.Animation.AnimationEnd = ret.Animation.FrameCount;
                ret.Animation.Loop = true;
            }

            /*collision*/
            if(root.Collision != null) {
                CollisionComponent collision = new CollisionComponent();

                collision.BodyDefinition = new B2BodyDef();
                collision.FixtureDefinition = new B2FixtureDef();

                /*body type*/
                if(root.Collision.Static)
                    collision.BodyDefinition.Type = B2BodyType.StaticBody;
                else
                    collision.BodyDefinition.Type = B2BodyType.DynamicBody;

                /*physics variabiles*/
                collision.FixtureDefinition.Density = 1.0f;
                collision.FixtureDefinition.Friction = 0.5f;
                collision.FixtureDefinition.Restitution = 0.2f;

                /*compute world translation and rotation*/
                Matrix4X4 world = ret.World.Clone();
                Vector3 transV =  world.TransformV(Vector3.Build3(0.0f, 0.0f, 0.0f));

                collision.BodyDefinition.Position.X = transV.Elements[0] + root.Collision.PositionX;
                collision.BodyDefinition.Position.Y = transV.Elements[2] + root.Collision.PositionY;

                Vector3 rotV = world.TransformV(Vector3.Build3(1.0f, 0.0f, 0.0f)).Subtract(transV);

                collision.BodyDefinition.Angle = Math.Atan2(rotV.Elements[2], rotV.Elements[0]);

                if(root.Collision.Type == "sphere") {
                    SphereCollision sc = (SphereCollision) root.Collision;

                    collision.FixtureDefinition.Shape = new B2CircleShape(sc.Radius);
                } else if(root.Collision.Type == "ob") {
                    ObCollision obc = (ObCollision) root.Collision;

                    collision.FixtureDefinition.Shape = new B2PolygonShape();
                    ((B2PolygonShape)collision.FixtureDefinition.Shape).SetAsBox(obc.Width / 2.0f, obc.Height / 2.0f);
                }

                ret.AddComponent(collision);
            }
            

            /*child nodes*/
            if (root.Children != null)
                foreach (NodeObject nodeObject in root.Children) {
                    this.ConvertNodeObject(nodeObject, ret);
                }

            List<Component> compColection = new List<Component>();

            /*components*/
            if (root.References != null)
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
            if(reference.Type == Component.MeshComponent) {
                MeshComponent comp = new MeshComponent();

                Handle handle = new Handle();
                handle.Collection = reference.Library;
                handle.Id = reference.Resource;

                comp.MeshHandle = handle;
                collection.Add(comp);
            } else if (reference.Type == Component.MaterialComponent) {
                MaterialComponent comp = new MaterialComponent();

                Handle handle = new Handle();
                handle.Collection = reference.Library;
                handle.Id = reference.Resource;

                comp.MaterialHandle = handle;
                collection.Add(comp);
            } else if(reference.Type == Component.LightComponent) {
                LightComponent comp = new LightComponent();

                Handle handle = new Handle();
                handle.Collection = reference.Library;
                handle.Id = reference.Resource;

                comp.LightHandle = handle;
                collection.Add(comp);
            }

            /*child references*/
            if (reference.Children != null)
                foreach (ReferenceObject referenceObject in reference.Children) {
                    this.ConvertReferences(referenceObject, collection);
                }
        }
    }
}
