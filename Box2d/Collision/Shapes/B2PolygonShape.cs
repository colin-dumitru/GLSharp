// B2PolygonShape.cs
//

using System;
using System.Runtime.CompilerServices;

namespace Box2D.Collision.Shapes {
    [Imported]
    [ScriptName("b2PolygonShape")]
    public class B2PolygonShape : B2Shape {
        public B2PolygonShape() {
            throw new Exception("Cannot create instance of this class.");
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        [PreserveCase]
        public void SetAsBox(float halfWidth, float halfHeight) {
            
        }
    }
}
