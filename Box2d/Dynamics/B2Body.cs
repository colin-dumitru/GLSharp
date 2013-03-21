// B2Body.cs
//

using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using Box2D.Common.Math;

namespace Box2D.Dynamics {
    public enum B2BodyType {
        DynamicBody = 2,
        KinematicBody = 1,
        StaticBody = 0
    }

    [Imported]
    [ScriptName("b2Body")]
    public class B2Body {
        [ScriptName("m_xf")]
        public B2Transform Transform;
        [ScriptName("m_linearVelocity")]
        public B2Vec2 LinearVelocity;

        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        public B2Body() {
            throw new Exception("Cannot create instance of this class.");
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        [PreserveCase]
        public B2Fixture CreateFixture(B2FixtureDef def) {
            return null;
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        [PreserveCase]
        public void SetAwake(Boolean value) {
            
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
    }
}
