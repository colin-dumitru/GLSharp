using System;
using System.Collections.Generic;
using System.Linq;
using GLSharp.Content;
using GLSharp.Data;
using GLSharp.Graphics.Core;
using GLSharp.Graphics.Effects;
using GLSharp.Universe;

namespace GLSharp.Graphics {
    public enum ClearMode {
        Depth = 0x00000100,
        Stencil = 0x00000400,
        Color = 0x00004000
    }

    public interface IGraphics {
        /// <summary>
        /// Gets the width of the drawing area.
        /// </summary>
        int Width { get; }
        /// <summary>
        /// Gets the height of the drawing area.
        /// </summary>
        int Height { get; }

        /// <summary>
        /// Gets and sets the World used for rendering / updating.
        /// </summary>
        World World { get;}

        /// <summary>
        /// Camera node.
        /// </summary>
        Node Camera { get; set; }

        /// <summary>
        /// Sets or gets the view occluder.
        /// </summary>
        IViewOccluder ViewOccluder { get; set; }

        /// <summary>
        /// Initializes the graphics layer.
        /// </summary>
        /// <returns></returns>
        void Initialize(float fov, float zNear, float zFar);

        /// <summary>
        /// Renders the active world.
        /// </summary>
        void Render();

        /// <summary>
        /// Clears the active frame buffer.
        /// </summary>
        /// <param name="color">If the color chould be cleared.</param>
        /// <param name="depth">If the depth should be cleared.</param>
        void Clear(Boolean color, Boolean depth);

        /// <summary>
        /// Allocates a texture into memory
        /// </summary>
        /// <param name="texture">The texture to alocate into memory.</param>
        /// <returns>If the operation has succeded</returns>
        Boolean AllocateTexture(TextureItem texture);

        /// <summary>
        /// Dealocates a texture from memory.
        /// </summary>
        /// <param name="texture">The texture to dealocate.</param>
        /// <returns>If the operation has succeded.</returns>
        Boolean FreeTexture(TextureItem texture);

        /// <summary>
        /// Allocates a mesh into memory (all the VBO's associated)
        /// </summary>
        /// <param name="mesh">The mesh to allocate.</param>
        /// <returns>If the operation has succeded</returns>
        Boolean AllocateMesh(MeshItem mesh);

        /// <summary>
        /// Dealocates a mesh from memory.
        /// </summary>
        /// <param name="mesh">Themesh object to dealocate.</param>
        /// <returns>If the operation has succeded.</returns>
        Boolean DealocateMesh(MeshItem mesh);

        /// <summary>
        /// Adds a known shader and a way to bind it used for rendering.
        /// </summary>
        /// <param name="shaderGroup"></param>
        void AddShaderGroup(ShaderGroup shaderGroup);

        /// <summary>
        /// Sets the shader as the active shader.
        /// </summary>
        /// <param name="shader">The shader which will become active.</param>
        void BindShader(CompiledShader shader);

        /// <summary>
        /// binds a texture to a specified uniform location inside the active shader.
        /// </summary>
        /// <param name="uniform">The uniform location.</param>
        /// <param name="texture">The texture.</param>
        void BindTexture(IUniformLocation uniform, ITexture texture, int index);

        /// <summary>
        /// Creates an empty render texture.
        /// </summary>
        /// <returns>The render texture.</returns>
        ITexture CreateRenderTexture();

        /// <summary>
        /// Creates a render group used for offscreen rendering.
        /// </summary>
        /// <param name="commonDepth">If a new depth buffer should be created, or the main
        /// one should be reused.</param>
        RenderGroup CreateRenderGroup(Boolean commonDepth);

        /// <summary>
        /// Cleanes a render group.
        /// </summary>
        /// <param name="old"></param>
        void CleanRenderGroup(RenderGroup old);

        /// <summary>
        /// Switches the active render group.
        /// </summary>
        /// <param name="group">The render group to switch to.</param>
        void SwitchRenderGroup(RenderGroup group);

        /// <summary>
        /// Renderes the active post process effect to the active render group.
        /// </summary>
        void RenderPostProcess();

        /// <summary>
        /// Adds a new post process effect in thhe render queue.
        /// </summary>
        /// <param name="effect">The post process effects to add.</param>
        void QueuePostProcess(IPostProcessEffect effect);

        /// <summary>
        /// Enables or disables the blend function.
        /// </summary>
        /// <param name="enable">The state of the blend function.</param>
        void SetBlend(Boolean enable);

    }
}
