// Class1.cs
//

using System;
using System.Collections.Generic;

namespace GLSharp.Graphics {
    public interface IUniform {

        /// <summary>
        /// Gets or sets the uniform location used byt the uniform.
        /// </summary>
        IUniformLocation UniformLocation { get; set; }

        /// <summary>
        /// Gets the name of the uniform.
        /// </summary>
        String Name { get; }

        /// <summary>
        /// Sets the value of the uniform.
        /// </summary>
        /// <param name="value"></param>
        void Set(Object value);
    }
}
