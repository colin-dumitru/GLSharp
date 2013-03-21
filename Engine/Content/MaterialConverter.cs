// MaterialConverter.cs
//

using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;

namespace GLSharp.Content {

    [IgnoreNamespace]
    [Imported]
    internal abstract class PropertyObject {
        [PreserveCase]
        [IntrinsicProperty]
        public abstract String Name { get; set; }
        [PreserveCase]
        [IntrinsicProperty]
        public abstract String Type { get; set; }
        [PreserveCase]
        [IntrinsicProperty]
        public abstract String Value { get; set; }
    }

    [IgnoreNamespace]
    [Imported]
    internal abstract class MaterialObject {
        [PreserveCase]
        [IntrinsicProperty]
        public abstract String Id { get; set; }
        [PreserveCase]
        [IntrinsicProperty]
        public abstract String Shader { get; set; }
        [PreserveCase]
        [IntrinsicProperty]
        public abstract List<PropertyObject> Properties { get; set; }
    }
    //------------------------------------------------------------------------------------------
    //------------------------------------------------------------------------------------------
    public class PropertyItem {
        public String Type;
        public Object Value;
    }
    //------------------------------------------------------------------------------------------
    //------------------------------------------------------------------------------------------
    public class MaterialItem : ResourceItem{
        public Dictionary<String, PropertyItem> Properties;
        public String Shader;

        public override Boolean Free() {
            this.Alocated = false;
            return true;
        }
        public override Boolean Readlocate() {
            this.Alocated = true;
            return true;
        }
    }
    //------------------------------------------------------------------------------------------
    //------------------------------------------------------------------------------------------
    public class MaterialConverter : IResourceConverter {
        public const String ColorType = "color";
        public const String TextureHandleType = "texture";
        public const String FloatType = "float";

        public string TypeHandled {
            get { return "material"; }

        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        public ResourceItem Convert(object input, String collection) {
            MaterialItem ret = new MaterialItem();
            MaterialObject obj = (MaterialObject) input;

            ret.Properties = new Dictionary<string, PropertyItem>();

            obj.Properties.ForEach(delegate(PropertyObject value) {
                PropertyItem property = new PropertyItem();

                if(value.Type == ColorType) {
                    property.Type = ColorType;
                    property.Value = value.Value.Split(new RegularExpression("[^0-9.]+"));
                } else if(value.Type == FloatType) {
                    property.Type = FloatType;
                    property.Value = float.Parse(value.Value);
                } else if (value.Type == TextureHandleType) {
                    Handle handle = new Handle();

                    handle.Id = value.Value;
                    handle.Collection = collection;

                    property.Type = TextureHandleType;
                    property.Value = handle;
                }

                ret.Properties[value.Name] = property;
            });

            ret.Shader = obj.Shader;

            return ret;
        }
    }
}
