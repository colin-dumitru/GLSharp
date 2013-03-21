// JSInputProvider.cs
//

using System;
using System.Collections.Generic;
using System.Html;
using System.Runtime.CompilerServices;
using GLSharp.Html;

namespace GLSharp.Core {
    [Imported]
    [IgnoreNamespace]
    abstract class MouseEvent{
        [IntrinsicProperty]
        public abstract int PageX { get; }
        [IntrinsicProperty]
        public abstract int PageY { get; }
        [IntrinsicProperty]
        public abstract CanvasElementGl Target { get; }
    }

    public class JsInputProvider : IInputProvider {
        private List<Boolean> _keys = new List<bool>();

        private float _mouseX = 0;
        private float _mouseY = 0;

        private int _screenX;
        private int _screenY;

        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        public void Initialize(CanvasElement canvas, int screenX, int screenY) {
            this._screenX = screenX;
            this._screenY = screenY;

            /*no functions to minimize delegate creation*/
            JsInputProvider that = this;

            canvas.AddEventListener("keydown", delegate(ElementEvent e) {
                that._keys[e.KeyCode] = true;
            }, true);

            canvas.AddEventListener("keyup", delegate(ElementEvent e) {
                that._keys[e.KeyCode] = false;
            }, true);

            canvas.AddEventListener("mousedown", delegate(ElementEvent e) {
                that._keys[Keys.MouseLeft] = true;
            }, true);

            canvas.AddEventListener("mouseup", delegate(ElementEvent e) {
                that._keys[Keys.MouseRight] = true;
            }, true);

            canvas.AddEventListener("mousemove", delegate(ElementEvent e) {

                /*convert to screen space*/
                that._mouseX = (((float)(((MouseEvent)(Object)e).PageX - e.Target.OffsetLeft) / this._screenX) - 0.5f) * 2.0f;
                that._mouseY = (((float)(((MouseEvent)(Object)e).PageY - e.Target.OffsetTop) / this._screenY) - 0.5f) * 2.0f;
            }, true);
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        private void MouseMove(ElementEvent e) {
            this._mouseX = e.OffsetX;
            this._mouseY = e.OffsetY;
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        private void MouseUp(ElementEvent e) {
            this._keys[Keys.MouseRight] = true;
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        private void MouseDown(ElementEvent e) {
            this._keys[Keys.MouseLeft] = true;
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        private void KeyUp(ElementEvent e) {
            this._keys[e.KeyCode] = false;
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        private void KeyDown(ElementEvent e) {
            this._keys[e.KeyCode] = true;
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        public bool KeySet(int key) {
            return this._keys[key];
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        public float MouseX {
            get { return this._mouseX; }
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        public float MouseY {
            get { return this._mouseY; }
        }
    }
}
