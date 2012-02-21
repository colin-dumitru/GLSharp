// ResourceManager.cs
//

using System;
using System.Collections.Generic;

namespace GLSharp.Data {
    public interface IResourceManager {
        /// <summary>
        /// Gets the resource with the provided name (and path). If the resource is not
        /// loaded, it will be loaded asyncroniously.
        /// </summary>
        /// <param name="resource">The resource name to be loaded.</param>
        /// <returns></returns>
        Resource GetResource(String resource);

        /// <summary>
        /// Forces the specified resource to be freed.
        /// </summary>
        /// <param name="resource">The resource name to be freed.</param>
        /// <returns>If the resource was found and freed.</returns>
        Boolean FreeResource(String resource);
    }
}
