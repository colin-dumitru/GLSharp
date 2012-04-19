using System;
using System.Collections.Generic;
using System.Linq;
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
        /// Gets or sets the color used for clearing.
        /// </summary>
        Color ClearColor { get; set; }
        /// <summary>
        /// Gets or sets the clear mode.
        /// </summary>
        ClearMode ClearMode { get; set; }

        /// <summary>
        /// Gets and sets the World used for rendering / updating.
        /// </summary>
        World World { get; set; }

        /// <summary>
        /// Initializes the graphics layer.
        /// </summary>
        /// <returns></returns>
        void Initialize();

        /// <summary>
        /// Clears the drawing area using the clear mode set.
        /// </summary>
        void Clear();

        /// <summary>
        /// Renders the active world.
        /// </summary>
        void Render();

    }
}
