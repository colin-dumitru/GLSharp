// ViewFrustrumOccluder.cs
//

using System;
using System.Collections.Generic;
using GLSharp.Content;
using GLSharp.Universe;
using GLSharp.Util;

namespace GLSharp.Graphics {
     //------------------------------------------------------------------------------------------
    //------------------------------------------------------------------------------------------
    public class ViewFrustrumOccluder : IViewOccluder {
        public ViewFrustrumOccluder() {
            
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        public bool Test(CullInfo cullInfo, Node node, MeshItem meshItem) {

            float x = meshItem.BoundingVolume.Center.Elements[0];
            float y = meshItem.BoundingVolume.Center.Elements[1];
            float z = meshItem.BoundingVolume.Center.Elements[2];

            /*First: we transform our coordinate into eye coordinates from model-view.*/
            float xp = x * cullInfo.ModelView[0] + y * cullInfo.ModelView[4] + z * cullInfo.ModelView[8] + cullInfo.ModelView[12];
            float yp = x * cullInfo.ModelView[1] + y * cullInfo.ModelView[5] + z * cullInfo.ModelView[9] + cullInfo.ModelView[13];
            float zp = x * cullInfo.ModelView[2] + y * cullInfo.ModelView[6] + z * cullInfo.ModelView[10] + cullInfo.ModelView[14];

            /*then we transform the furthest away vertex to mv to comute sphere radius*/
            float xv = meshItem.Mesh[meshItem.BoundingVolume.VertexIndex * 3];
            float yv = meshItem.Mesh[meshItem.BoundingVolume.VertexIndex * 3 + 1];
            float zv = meshItem.Mesh[meshItem.BoundingVolume.VertexIndex * 3 + 2];

            float xpv = xv * cullInfo.ModelView[0] + yv * cullInfo.ModelView[4] + zv * cullInfo.ModelView[8] + cullInfo.ModelView[12];
            float ypv = xv * cullInfo.ModelView[1] + yv * cullInfo.ModelView[5] + zv * cullInfo.ModelView[9] + cullInfo.ModelView[13];
            float zpv = xv * cullInfo.ModelView[2] + yv * cullInfo.ModelView[6] + zv * cullInfo.ModelView[10] + cullInfo.ModelView[14];

            /*now we compute the radius*/
            float r = Math.Sqrt((xp - xpv) * (xp - xpv) + (yp - ypv) * (yp - ypv) + (zp - zpv) * (zp - zpv));

             /*Now - we apply the "plane equation" of each clip plane to see how far from the clip plane our point is.  
             The clip planes are directed: positive number distances mean we are INSIDE our viewing area by some distance;
             negative means outside.  So ... if we are outside by less than -r, the ENTIRE sphere is out of bounds.
             We are not visible!  We do the near clip plane, then sides, then far, in an attempt to try the planes
             that will eliminate the most geometry first...half the world is behind the near clip plane, but not much is
             behind the far clip plane on sunny day.*/
            if ((xp * cullInfo.NearClip [0] + yp * cullInfo.NearClip [1] + zp * cullInfo.NearClip [2] + cullInfo.NearClip [3] + r) < 0) return false;
            if ((xp * cullInfo.BotClip  [0] + yp * cullInfo.BotClip  [1] + zp * cullInfo.BotClip  [2] + cullInfo.BotClip  [3] + r) < 0) return false;
            if ((xp * cullInfo.TopClip  [0] + yp * cullInfo.TopClip  [1] + zp * cullInfo.TopClip  [2] + cullInfo.TopClip  [3] + r) < 0) return false;
            if ((xp * cullInfo.LeftClip [0] + yp * cullInfo.LeftClip [1] + zp * cullInfo.LeftClip [2] + cullInfo.LeftClip [3] + r) < 0) return false;
            if ((xp * cullInfo.RightClip[0] + yp * cullInfo.RightClip[1] + zp * cullInfo.RightClip[2] + cullInfo.RightClip[3] + r) < 0) return false;
            if ((xp * cullInfo.FarClip  [0] + yp * cullInfo.FarClip  [1] + zp * cullInfo.FarClip  [2] + cullInfo.FarClip  [3] + r) < 0) return false;
            return true;
        }
        
    }
}
