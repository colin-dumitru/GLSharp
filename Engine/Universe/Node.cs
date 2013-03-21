// Node.cs
//

using System;
using System.Collections.Generic;
using GLSharp.Core;
using GLSharp.Util;

namespace GLSharp.Universe {
    public class NodeAnimation {
        public int FrameCount;

        public int CurrentFrame;
        public int AnimationStart;
        public int AnimationEnd;
        public Boolean Loop;

        public float[] TranslateX;
        public float[] TranslateY;
        public float[] TranslateZ;

        public float[] RotateX;
        public float[] RotateY;
        public float[] RotateZ;

        public float[] ScaleX;
        public float[] ScaleY;
        public float[] ScaleZ;
    }

    public class NodeAnimationGroup {
        public List<NodeAnimation> Animations = new List<NodeAnimation>();

        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        public void SetStartFrame(int frame, Boolean resetCurrent) {
            NodeAnimationGroup that = this;

            if (resetCurrent) {
                this.Animations.ForEach(delegate(NodeAnimation value) {
                    value.AnimationStart = frame;
                    value.CurrentFrame = frame;
                });
            } else {
                this.Animations.ForEach(delegate(NodeAnimation value) {
                    value.AnimationStart = frame;
                });
            }
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        public void SetEndFrame(int frame) {
            NodeAnimationGroup that = this;

            this.Animations.ForEach(delegate(NodeAnimation value) {
                value.AnimationEnd = frame;
                if (value.CurrentFrame >= frame && value.Loop)
                    value.CurrentFrame = value.AnimationStart;
            });
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        public void SetRange(int start, int end, Boolean resetCurrent) {
            NodeAnimationGroup that = this;

            if (resetCurrent) {
                this.Animations.ForEach(delegate(NodeAnimation value) {
                    value.AnimationStart = start;
                    value.AnimationEnd = end;
                    value.CurrentFrame = start;
                });
            } else {
                this.Animations.ForEach(delegate(NodeAnimation value) {
                    value.AnimationStart = start;
                    value.AnimationEnd = end;
                });
            }
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        public void SetLoop(Boolean loop) {
            NodeAnimationGroup that = this;

            this.Animations.ForEach(delegate(NodeAnimation value) {
                value.Loop = loop;
            });
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        public void ResetAnimation() {
            NodeAnimationGroup that = this;

            this.Animations.ForEach(delegate(NodeAnimation value) {
                value.CurrentFrame = value.AnimationStart;
            });
        }
    }
    //------------------------------------------------------------------------------------------
    //------------------------------------------------------------------------------------------
    public class Node {
        /// <summary>
        /// Called when a component is added.
        /// </summary>
        public Event ComponentAdded = new Event();
        /// <summary>
        /// Called when a component is removed.
        /// </summary>
        public Event ComponentRemoved = new Event();
        /// <summary>
        /// Called when a child node is added.
        /// </summary>
        public Event ChildAdded = new Event();
        /// <summary>
        /// Called when a child node is removed.
        /// </summary>
        public Event ChildRemoved = new Event();

        /// <summary>
        /// Called when the node transformation has changed.
        /// </summary>
        public Event TransformChanged = new Event();

        private readonly Dictionary<String, Component> _components = new Dictionary<string, Component>();

        public Dictionary<String, Component> Components {
            get { return this._components; }
        }

        /// <summary>
        /// The name of the node.
        /// </summary>
        public String Id;

        /*cachec world transformation*/
        private Matrix4X4 _worldTransformation;
        /*if the world transformation matrix need to be recalculated*/
        private Boolean _needWordUpdate;

        /*World transformation matrix.*/
        public Matrix4X4 World {
            get {
                if (this._needWordUpdate)
                    this.UpdateWorldTransformation();
                return _worldTransformation;
            }
        }

        private Matrix4X4 _localRotationMatrix;
        private Matrix4X4 _localTranslationMatrix;
        private Matrix4X4 _localScaleMatrix;
        private Matrix4X4 _localTransformMatrix;
        private Matrix4X4 _pivotMatrix;
        private Matrix4X4 _inversePivotMatrix;

        /// <summary>
        /// Local transformation matrix.
        /// </summary>
        public Matrix4X4 Local {
            get {
                if (this._needWordUpdate)
                    this.UpdateWorldTransformation();
                return _localTransformMatrix;
            }
        }

        private Vector3 _pivot;

        /// <summary>
        /// Gets the pivot for rotation.
        /// </summary>
        public Vector3 Pivot {
            get { return this._pivot; }
            set {
                this._pivot = value;
                this._pivotMatrix = Matrix4X4.Identity.Clone().Translate(this._pivot);
                this._inversePivotMatrix = Matrix4X4.Identity.Clone().TranslateInverse(this._pivot);
            }
        }

        /// <summary>
        /// Local translation.
        /// </summary>
        public Vector3 LocalTranslation;

        /// <summary>
        /// Local Rotation.
        /// </summary>
        public Vector3 LocalRotation;

        /// <summary>
        /// Local Scale.
        /// </summary>
        public Vector3 LocalScale;

        /// <summary>
        /// Animation object.
        /// </summary>
        public NodeAnimation Animation;

        /// <summary>
        /// Child nodes.
        /// </summary>
        public Dictionary<String, Node> Children = new Dictionary<string, Node>();

        /// <summary>
        /// Child Nodes.
        /// </summary>
        public List<Node> ChildrenList = new List<Node>();

        /// <summary>
        /// Parent node.
        /// </summary>
        public Node Parent;

        /// <summary>
        /// Controller
        /// </summary>
        public ControllerBase Controller;

        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        public Node() {
            this._needWordUpdate = true;

            this._localRotationMatrix = Matrix4X4.Identity.Clone();
            this._localScaleMatrix = Matrix4X4.Identity.Clone();
            this._localTranslationMatrix = Matrix4X4.Identity.Clone();
            this._localTransformMatrix = Matrix4X4.Identity.Clone();
            this._worldTransformation = new Matrix4X4(null);

            this.LocalTranslation = new Vector3(null);
            this.LocalScale = new Vector3(null);
            this.LocalRotation = new Vector3(null);

            this.Pivot = new Vector3(null);
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        private void UpdateWorldTransformation() {

            /*this._localScaleMatrix.MultiplyM2(this._localRotationMatrix, this._localTransformMatrix);
            this._localTransformMatrix.MultiplyM2(this._localTranslationMatrix, this._localTransformMatrix);*/

            if (this.Animation != null) {
                this._localTranslationMatrix.SetTranslate3(
                    this.Animation.TranslateX[this.Animation.CurrentFrame] + this.LocalTranslation.Elements[0],
                    this.Animation.TranslateY[this.Animation.CurrentFrame] + this.LocalTranslation.Elements[1],
                    this.Animation.TranslateZ[this.Animation.CurrentFrame] + this.LocalTranslation.Elements[2]);
                this._localScaleMatrix.SetScale3(
                    this.Animation.ScaleX[this.Animation.CurrentFrame] + this.LocalScale.Elements[0], 
                    this.Animation.ScaleY[this.Animation.CurrentFrame] + this.LocalScale.Elements[1],
                    this.Animation.ScaleZ[this.Animation.CurrentFrame] + this.LocalScale.Elements[2]);
                this._localRotationMatrix.SetRotation3(
                    this.Animation.RotateX[this.Animation.CurrentFrame] + this.LocalRotation.Elements[0],
                    this.Animation.RotateY[this.Animation.CurrentFrame] + this.LocalRotation.Elements[1],
                    this.Animation.RotateZ[this.Animation.CurrentFrame] + this.LocalRotation.Elements[2]
                    );
            }

            this._localTranslationMatrix.Copy(this._localTransformMatrix);
            this._localTransformMatrix.MultiplyM2(this._pivotMatrix, this._localTransformMatrix);
            this._localTransformMatrix.MultiplyM2(this._localRotationMatrix, this._localTransformMatrix);
            this._localTransformMatrix.MultiplyM2(this._inversePivotMatrix, this._localTransformMatrix);
            this._localTransformMatrix.MultiplyM2(this._localScaleMatrix, this._localTransformMatrix);

            if (this.Parent != null)
                //this._localTransformMatrix.MultiplyM2(this.Parent.World, this._worldTransformation);
                this.Parent.World.MultiplyM2(this._localTransformMatrix, this._worldTransformation);
            else
                this._worldTransformation = this._localTransformMatrix;

            this._needWordUpdate = false;
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        public void InvalidateWorldTransformation() {
            this._needWordUpdate = true;
            this.ChildrenList.ForEach(delegate(Node value) { value.InvalidateWorldTransformation(); });
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        public void AddComponent(Component component) {
            component.Parent = this;

            this._components[component.Type] = component;
            this.ComponentAdded.Fire(this, component);
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        public void RemoveComponent(Component component) {
            component.Parent = null;

            this._components.Remove(component.Type);
            this.ComponentRemoved.Fire(this, component);
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        public Component GetComponent(String type) {
            return this._components[type];
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        public void AddChild(Node child) {
            if (this.Children[child.Id] != null)
                throw new Exception("Child with the same name already exists.");

            this.Children[child.Id] = child;
            this.ChildrenList.Add(child);
            child.Parent = this;

            this.ChildAdded.Fire(this, child);
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        public Boolean RemoveChild(Node child) {
            if (this.Children[child.Id] == null)
                return false;

            this.Children.Remove(child.Id);
            this.ChildrenList.Remove(child);
            child.Parent = null;

            this.ChildRemoved.Fire(this, child);

            return true;
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        public Node FindChild(String id, Boolean deep) {
            if (this.Id == id)
                return this;

            if (this.Children[id] != null)
                return this.Children[id];

            if (!deep)
                return null;

            foreach (KeyValuePair<string, Node> child in Children) {
                Node ret = child.Value.FindChild(id, deep);

                if (ret != null)
                    return ret;
            }

            return null;
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        public void Translate(Vector3 distance) {
            this.LocalTranslation.Add(distance);
            this._localTranslationMatrix.Translate(distance);

            this.InvalidateWorldTransformation();

            this.TransformChanged.Fire(this, null);
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        public void Translate3(float x, float y, float z) {
            this.LocalTranslation.Add3(x, y, z);
            this._localTranslationMatrix.Translate3(x, y, z);

            this.InvalidateWorldTransformation();

            this.TransformChanged.Fire(this, null);
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        public void Rotate(float angle, Vector3 axis) {
            this.LocalRotation.Add(axis.Clone().Scale(angle));
            this._localRotationMatrix.Rotate(angle, axis);

            this.InvalidateWorldTransformation();

            this.TransformChanged.Fire(this, null);
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        public void RotateX(float angle) {
            this.LocalRotation.Elements[0] += angle;
            this._localRotationMatrix.RotateX(angle);

            this.InvalidateWorldTransformation();

            this.TransformChanged.Fire(this, null);
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        public void RotateY(float angle) {
            this.LocalRotation.Elements[1] += angle;
            this._localRotationMatrix.RotateY(angle);

            this.InvalidateWorldTransformation();

            this.TransformChanged.Fire(this, null);
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        public void RotateZ(float angle) {
            this.LocalRotation.Elements[2] += angle;
            this._localRotationMatrix.RotateZ(angle);

            this.InvalidateWorldTransformation();

            this.TransformChanged.Fire(this, null);
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        public void Scale(Vector3 scale) {
            this.LocalScale.MultVect(scale);
            this._localScaleMatrix.Scale(scale);

            this.InvalidateWorldTransformation();

            this.TransformChanged.Fire(this, null);
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        public void BindController(ControllerBase controller) {
            this.Controller = controller;
            controller.Bind(this);
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
    }
}
