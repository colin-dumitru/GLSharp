// ResourceManager.cs
//

using System;
using System.Collections.Generic;

namespace GLSharp.Data {
    public sealed class ResourceManagerParams {
        private String _type;

        public String Type {
            get { return _type; }
            set { _type = value; }
        }
        
    }

    public interface IResourceManager {
        /// <summary>
        /// Gets the resource with the provided name (and path). If the resource is not
        /// loaded, it will be loaded asyncroniously.
        /// </summary>
        /// <param name="resource">The resource name to be loaded.</param>
        /// <param name="managerParams">The optional resource manager params. Can be null.</param>
        /// <returns></returns>
        Resource GetResource(String resource, ResourceManagerParams managerParams);

        /// <summary>
        /// Forces the specified resource to be freed.
        /// </summary>
        /// <param name="resource">The resource name to be freed.</param>
        /// <returns>If the resource was found and freed.</returns>
        Boolean FreeResource(String resource);
    }
}
