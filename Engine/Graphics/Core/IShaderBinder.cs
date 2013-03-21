// IShaderBinder.cs
//

using System;
using System.Collections.Generic;
using GLSharp.Content;
using GLSharp.Universe;
using GLSharp.Util;

namespace GLSharp.Graphics {
    public interface IShaderBinder {
        void BindGeometryPass(Matrix4X4 pMatrix);
        void BindGeometryInstance(Matrix4X4 mvMatrix, Matrix4X4 nMatrix);
        void BindGeometryMesh(MeshItem mesh);
        void BindGeometryMaterial(MaterialItem material);
        void BindGeometryPassNum(int pass);

        void BindLightPass(ITexture diffuse, ITexture position, ITexture normal, float[] viewport);
        void BindLight(Vector3 lightPos, LightItem light, Matrix4X4 mvMatrix, Matrix4X4 pMatrix);
        void BindLightMesh(MeshItem lightVolume);

        void BindPrePostPass(ITexture diffuse, ITexture position, ITexture normal, ITexture accumulation);
        void BindFinalPass(ITexture post);


    }

}
