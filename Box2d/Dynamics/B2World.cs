// B2World.cs
//

using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using Box2D.Common.Math;

namespace Box2D.Dynamics {
    [Imported]
    [ScriptName("b2World")]
    public class B2World {
        public B2World(B2Vec2 gravity, Boolean allowSleep) {
            throw new Exception("Cannot create instance of this class.");
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        [PreserveCase]
        public B2Body CreateBody(B2BodyDef def) {
            return null;
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        [PreserveCase]
        public void DestroyBody(B2Body body) {
            
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        [PreserveCase]
        public void Step(float frameRate, int velocityIterations, int positionIterations) {
            
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        [PreserveCase]
        public void ClearForces() {
            
        }

    }
}
