// RegionOccluder.cs
//

using System;
using System.Collections.Generic;
using GLSharp.Content;
using GLSharp.Universe;

namespace GLSharp.Graphics {
    public class RegionOccluder : IViewOccluder {
        private float _regionX;
        private float _regionY;

        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        public RegionOccluder(float regionX, float regionY) {
            this._regionX = regionX;
            this._regionY = regionY;
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

            if (xp + r < -this._regionX) return false;
            if (xp - r > this._regionX) return false;
            if (yp + r < -this._regionY) return false;
            if (yp - r > this._regionY) return false;
            return true;
        }
    }
}
