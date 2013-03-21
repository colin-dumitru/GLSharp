using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;


namespace Box2D.Common.Math {
    [Imported]
    [ScriptName("b2Vec2")]
    public class B2Vec2 {
        public float X;
        public float Y;

        public B2Vec2(float x, float y) {
            throw new Exception("Cannot create instance of this class.");
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        [PreserveCase]
        public void Set(float x, float y) {
            
        }
    }
}
