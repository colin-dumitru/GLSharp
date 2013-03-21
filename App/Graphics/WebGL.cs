using System;
using System.Collections.Generic;
using System.Linq;
using System.Html.Media.Graphics;
using System.Runtime.CompilerServices;
using System.Html;
using GLSharp.Data;

namespace GLSharp.Graphics {

    public class WebGLContextAttributes {
        public Boolean Alpha = true;
        public Boolean Depth = true;
        public Boolean Stencil = false;
        public Boolean Antialias = false;
        public Boolean PremultipliedAlpha = true;
        public Boolean PreserveDrawingBuffer = false;
    }

    public class WebGLE {
        /* What buffer to clear. Can use a combination of each one.*/
        public const int DepthBufferBit = 0x00000100;
        public const int StencilBufferBit = 0x00000400;
        public const int ColorBufferBit = 0x00004000;

        /* BeginMode */
        public const int Points = 0x0000;
        public const int Lines = 0x0001;
        public const int LineLoop = 0x0002;
        public const int LineStrip = 0x0003;
        public const int Triangles = 0x0004;
        public const int TriangleStrip = 0x0005;
        public const int TriangleFan = 0x0006;

        /* BlendingFactorDest */
        public const int Zero = 0;
        public const int One = 1;
        public const int SrcColor = 0x0300;
        public const int OneMinusSrcColor = 0x0301;
        public const int SrcAlpha = 0x0302;
        public const int OneMinusSrcAlpha = 0x0303;
        public const int DstAlpha = 0x0304;
        public const int OneMinusDstAlpha = 0x0305;

        /* BlendingFactorSrc */
        /*      ZERO */
        /*      ONE */
        public const int DstColor = 0x0306;
        public const int OneMinusDstColor = 0x0307;
        public const int SrcAlphaSaturate = 0x0308;
        /*      SRC_ALPHA */
        /*      ONE_MINUS_SRC_ALPHA */
        /*      DST_ALPHA */
        /*      ONE_MINUS_DST_ALPHA */

        /* BlendEquationSeparate */
        public const int FuncAdd = 0x8006;
        public const int BlendEquationRgb = 0x8009;   /* same as BLEND_EQUATION */
        public const int BlendEquationAlpha = 0x883D;

        /* BlendSubtract */
        public const int FuncSubtract = 0x800A;
        public const int FuncReverseSubtract = 0x800B;

        /* Separate Blend Functions */
        public const int BlendDstRgb = 0x80C8;
        public const int BlendSrcRgb = 0x80C9;
        public const int BlendDstAlpha = 0x80CA;
        public const int BlendSrcAlpha = 0x80CB;
        public const int ConstantantColor = 0x8001;
        public const int OneMinusConstantColor = 0x8002;
        public const int ConstantAlpha = 0x8003;
        public const int OneMinusConstantAlpha = 0x8004;
        public const int BlendColor = 0x8005;

        /* Buffer Objects */
        public const int ArrayBuffer = 0x8892;
        public const int ElementArrayBuffer = 0x8893;
        public const int ArrayBufferBinding = 0x8894;
        public const int ElementArrayBufferBinding = 0x8895;

        public const int StreamDraw = 0x88E0;
        public const int StaticDraw = 0x88E4;
        public const int DynamicDraw = 0x88E8;

        public const int BufferSize = 0x8764;
        public const int BufferUsage = 0x8765;

        public const int CurrentVertexAttribute = 0x8626;

        /* CullFaceMode */
        public const int Front = 0x0404;
        public const int Back = 0x0405;
        public const int FrontAndBack = 0x0408;

        /* TEXTURE_2D */
        public const int CullFace = 0x0B44;
        public const int Blend = 0x0BE2;
        public const int Dither = 0x0BD0;
        public const int StencilTest = 0x0B90;
        public const int DepthTest = 0x0B71;
        public const int ScissorTest = 0x0C11;
        public const int PolygonOffsetFill = 0x8037;
        public const int SampleAlphaToCoverage = 0x809E;
        public const int SampleCoverage = 0x80A0;

        /* ErrorCode */
        public const int NoError = 0;
        public const int InvalidEnum = 0x0500;
        public const int InvalidValue = 0x0501;
        public const int InvalidOperation = 0x0502;
        public const int OutOfMemory = 0x0505;

        /* FrontFaceDirection */
        public const int Cw = 0x0900;
        public const int Ccw = 0x0901;

        /* GetPName */
        public const int LineWidth = 0x0B21;
        public const int AliasedPointSizeRange = 0x846D;
        public const int AliasedLineWidthRange = 0x846E;
        public const int CullFaceMode = 0x0B45;
        public const int FrontFace = 0x0B46;
        public const int DepthRange = 0x0B70;
        public const int DepthWritemask = 0x0B72;
        public const int DepthClearValue = 0x0B73;
        public const int DepthFunc = 0x0B74;
        public const int StencilClearValue = 0x0B91;
        public const int StencilFunc = 0x0B92;
        public const int StencilFail = 0x0B94;
        public const int StencilPassDepthFail = 0x0B95;
        public const int StencilPassDepthPass = 0x0B96;
        public const int StencilReff = 0x0B97;
        public const int StencilValueMask = 0x0B93;
        public const int StencilWritemask = 0x0B98;
        public const int StencilBackFunc = 0x8800;
        public const int StencilBackFail = 0x8801;
        public const int StencilBackPassDepthFail = 0x8802;
        public const int StencilBackPassDepthPass = 0x8803;
        public const int StencilBackReff = 0x8CA3;
        public const int StencilBackValueMask = 0x8CA4;
        public const int StencilBackWritemask = 0x8CA5;
        public const int Viewport = 0x0BA2;
        public const int ScissorBox = 0x0C10;

        /*      SCISSOR_TEST */
        public const int ColorClearValue = 0x0C22;
        public const int ColorWritemask = 0x0C23;
        public const int UnpackAlignment = 0x0CF5;
        public const int PackAlignment = 0x0D05;
        public const int MaxTextureSize = 0x0D33;
        public const int MaxViewportDims = 0x0D3A;
        public const int SubpixelBits = 0x0D50;
        public const int RedBits = 0x0D52;
        public const int GreenBits = 0x0D53;
        public const int BlueBits = 0x0D54;
        public const int AlphaBits = 0x0D55;
        public const int DepthBits = 0x0D56;
        public const int StencilBits = 0x0D57;
        public const int PolygonOffsetUnits = 0x2A00;

        /*      POLYGON_OFFSET_FILL */
        public const int PolygonOffsetFactor = 0x8038;
        public const int TextureBinding_2D = 0x8069;
        public const int SampleBuffers = 0x80A8;
        public const int Samples = 0x80A9;
        public const int SampleCoverageValue = 0x80AA;
        public const int SampleCoverageInvert = 0x80AB;


        public const int NumCompressedTextureFormats = 0x86A2;
        public const int CompressedTextureFormats = 0x86A3;

        /* HintMode */
        public const int DontCare = 0x1100;
        public const int Fastest = 0x1101;
        public const int Nicest = 0x1102;

        /* HintTarget */
        public const int GenerateMipmapHint = 0x8192;

        /* DataType */
        public const int ByteT = 0x1400;
        public const int UnsignedByteT = 0x1401;
        public const int ShortT = 0x1402;
        public const int UnsignedShortT = 0x1403;
        public const int IntT = 0x1404;
        public const int UnsignedIntT = 0x1405;
        public const int FloatT = 0x1406;

        /* PixelFormat */
        public const int DepthComponent = 0x1902;
        public const int Alpha = 0x1906;
        public const int Rgb = 0x1907;
        public const int Rgba = 0x1908;
        public const int Luminance = 0x1909;
        public const int LuminanceAlpha = 0x190A;

        /* PixelType */
        /*      UNSIGNED_BYTE */
        public const int UnsignedShort4444 = 0x8033;
        public const int UnsignedShort5551 = 0x8034;
        public const int UnsignedShort565 = 0x8363;

        /* Shaders */
        public const int FragmentShader = 0x8B30;
        public const int VertexShader = 0x8B31;
        public const int MaxVertexAttribs = 0x8869;
        public const int MaxVertexUniformVectors = 0x8DFB;
        public const int MaxVaryingVectors = 0x8DFC;
        public const int MaxCombinedTextureImageUnits = 0x8B4D;
        public const int MaxVertexTextureImageUnits = 0x8B4C;
        public const int MaxTextureImageUnits = 0x8872;
        public const int MaxFragmentUniformVectors = 0x8DFD;
        public const int ShaderType = 0x8B4F;
        public const int DeleteStatus = 0x8B80;
        public const int LinkStatus = 0x8B82;
        public const int ValidateStatus = 0x8B83;
        public const int AttachedShaders = 0x8B85;
        public const int ActiveUniforms = 0x8B86;
        public const int ActiveAttributes = 0x8B89;
        public const int ShadingLanguageVersion = 0x8B8C;
        public const int CurrentProgram = 0x8B8D;

        /* StencilFunction */
        public const int Never = 0x0200;
        public const int Less = 0x0201;
        public const int Equal = 0x0202;
        public const int Lequal = 0x0203;
        public const int Greater = 0x0204;
        public const int Notequal = 0x0205;
        public const int Gequal = 0x0206;
        public const int Always = 0x0207;

        /* StencilOp */
        /*      ZERO */
        public const int Keep = 0x1E00;
        public const int Replace = 0x1E01;
        public const int Incr = 0x1E02;
        public const int Decr = 0x1E03;
        public const int Invert = 0x150A;
        public const int IncrWrap = 0x8507;
        public const int DecrWrap = 0x8508;

        /* StringName */
        public const int Vendor = 0x1F00;
        public const int Renderer = 0x1F01;
        public const int Version = 0x1F02;

        /* TextureMagFilter */
        public const int Nearest = 0x2600;
        public const int Linear = 0x2601;

        /* TextureMinFilter */
        /*      NEAREST */
        /*      LINEAR */
        public const int NearestMipmapNearest = 0x2700;
        public const int LinearMipmapNearest = 0x2701;
        public const int NearestMipmapLinear = 0x2702;
        public const int LinearMipmapLinear = 0x2703;

        /* TextureParameterName */
        public const int TextureMagFilter = 0x2800;
        public const int TextureMinFilter = 0x2801;
        public const int TextureWrapS = 0x2802;
        public const int TextureWrapT = 0x2803;

        /* TextureTarget */
        public const int Texture_2D = 0x0DE1;
        public const int Texture = 0x1702;

        public const int TextureCubeMap = 0x8513;
        public const int TextureBindingCubeMap = 0x8514;
        public const int TextureCubeMapPositiveX = 0x8515;
        public const int TextureCubeMapNegativeX = 0x8516;
        public const int TextureCubeMapPositiveY = 0x8517;
        public const int TextureCubeMapNegativeY = 0x8518;
        public const int TextureCubeMapPositiveZ = 0x8519;
        public const int TextureCubeMapNegativeZ = 0x851A;
        public const int MaxCubeMapTextureSize = 0x851C;

        /* TextureUnit */
        public const int Texture0 = 0x84C0;
        public const int Texture1 = 0x84C1;
        public const int Texture2 = 0x84C2;
        public const int Texture3 = 0x84C3;
        public const int Texture4 = 0x84C4;
        public const int Texture5 = 0x84C5;
        public const int Texture6 = 0x84C6;
        public const int Texture7 = 0x84C7;
        public const int Texture8 = 0x84C8;
        public const int Texture9 = 0x84C9;
        public const int Texture10 = 0x84CA;
        public const int Texture11 = 0x84CB;
        public const int Texture12 = 0x84CC;
        public const int Texture13 = 0x84CD;
        public const int Texture14 = 0x84CE;
        public const int Texture15 = 0x84CF;
        public const int Texture16 = 0x84D0;
        public const int Texture17 = 0x84D1;
        public const int Texture18 = 0x84D2;
        public const int Texture19 = 0x84D3;
        public const int Texture20 = 0x84D4;
        public const int Texture21 = 0x84D5;
        public const int Texture22 = 0x84D6;
        public const int Texture23 = 0x84D7;
        public const int Texture24 = 0x84D8;
        public const int Texture25 = 0x84D9;
        public const int Texture26 = 0x84DA;
        public const int Texture27 = 0x84DB;
        public const int Texture28 = 0x84DC;
        public const int Texture29 = 0x84DD;
        public const int Texture30 = 0x84DE;
        public const int Texture31 = 0x84DF;
        public const int ActiveTexture = 0x84E0;

        /* TextureWrapMode */
        public const int Repeat = 0x2901;
        public const int ClampToEdge = 0x812F;
        public const int MirroredRepeat = 0x8370;

        /* Uniform Types */
        public const int FloatVec2 = 0x8B50;
        public const int FloatVec3 = 0x8B51;
        public const int FloatVec4 = 0x8B52;
        public const int IntVec2 = 0x8B53;
        public const int IntVec3 = 0x8B54;
        public const int IntVec4 = 0x8B55;
        public const int Bool = 0x8B56;
        public const int BoolVec2 = 0x8B57;
        public const int BoolVec3 = 0x8B58;
        public const int BoolVec4 = 0x8B59;
        public const int FloatMat2 = 0x8B5A;
        public const int FloatMat3 = 0x8B5B;
        public const int FloatMat4 = 0x8B5C;
        public const int Sampler_2D = 0x8B5E;
        public const int SamplerCube = 0x8B60;

        /* Vertex Arrays */
        public const int VertexAttribArrayEnabled = 0x8622;
        public const int VertexAttribArraySize = 0x8623;
        public const int VertexAttribArrayStride = 0x8624;
        public const int VertexAttribArrayType = 0x8625;
        public const int VertexAttribArrayNormalized = 0x886A;
        public const int VertexAttribArrayPointer = 0x8645;
        public const int VertexAttribArrayBufferBinding = 0x889F;

        /* Shader Source */
        public const int CompileStatus = 0x8B81;

        /* Shader Precision-Specified Types */
        public const int LowFloat = 0x8DF0;
        public const int MediumFloat = 0x8DF1;
        public const int HighFloat = 0x8DF2;
        public const int LowInt = 0x8DF3;
        public const int MediumInt = 0x8DF4;
        public const int HighInt = 0x8DF5;

        /* Framebuffer Object. */
        public const int FrameBuffer = 0x8D40;
        public const int Renderbuffer = 0x8D41;

        public const int Rgba4 = 0x8056;
        public const int Rgb5A1 = 0x8057;
        public const int Rgb565 = 0x8D62;
        public const int DepthComponent16 = 0x81A5;
        public const int StencilIndex = 0x1901;
        public const int StencilIndex8 = 0x8D48;
        public const int DepthStencil = 0x84F9;

        public const int RenderbufferWidth = 0x8D42;
        public const int RenderbufferHeight = 0x8D43;
        public const int RenderbufferInternalFormat = 0x8D44;
        public const int RenderbufferRedSize = 0x8D50;
        public const int RenderbufferGreenSize = 0x8D51;
        public const int RenderbufferBlueSize = 0x8D52;
        public const int RenderbufferAlphaSize = 0x8D53;
        public const int RenderbufferDepthSize = 0x8D54;
        public const int RenderbufferStencilSize = 0x8D55;

        public const int FramebufferAttachmentObjectType = 0x8CD0;
        public const int FramebufferAttachmentObjectName = 0x8CD1;
        public const int FramebufferAttachmentTextureLevel = 0x8CD2;
        public const int FramebufferAttachmentTextureCubeMapFace = 0x8CD3;

        public const int ColorAttachment0 = 0x8CE0;
        public const int DepthAttachment = 0x8D00;
        public const int StencilAttachment = 0x8D20;
        public const int DepthStencilAttachment = 0x821A;

        public const int None = 0;

        public const int FramebufferComplete = 0x8CD5;
        public const int FramebufferIncompleteAttachment = 0x8CD6;
        public const int FramebufferIncompleteMissingAttachment = 0x8CD7;
        public const int FramebufferIncompleteDimensions = 0x8CD9;
        public const int FramebufferUnsupported = 0x8CDD;

        public const int FramebufferBinding = 0x8CA6;
        public const int RenderbufferBinding = 0x8CA7;
        public const int MaxRenderbufferSize = 0x84E8;

        public const int InvalidFramebufferOperation = 0x0506;

        /* Type of texture unpacking. */
        public const int UnpackFlipY = 0x9240;
        public const int UnpackPremultiplyAlpha = 0x9241;
        public const int ContextLost = 0x9242;
        public const int UnpackColorspaceConversion = 0x9243;

    }


    [Imported]
    public abstract class WebGL {



        /* ---------------------------------------SystemCore Functions-----------------------------------------------------------*/

        public abstract int GetScreenWidth();

        public abstract int GetScreenHeight();

        public abstract void BlendColor(Color color);

        public abstract void BlendEquation(int mode);

        public abstract void BlendEquationSeparate(int modeRgb, int modeAlpha);

        public abstract void BlendFunc(int sourceFactor, int destinationFactor);

        public abstract void BlendFunctionSeparate(int sourceRgb, int destinationRgb, int sourceAlpha, int destinationAlpha);

        public abstract void Clear(int mask);

        public abstract void ClearColor(float red, float green, float blue, float alpha);

        public abstract void ClearDepth(float depth);

        public abstract void ClearStencil(int s);

        public abstract void ColorMask(bool red, bool green, bool blue, bool alpha);

        public abstract void CullFace(int mode);

        public abstract void DepthFunc(int func);

        public abstract void DepthMask(bool flag);

        public abstract void DepthRange(float zNear, float zFar);

        public abstract void Disable(int component);

        public abstract void Enable(int component);

        public abstract void Finish();

        public abstract void Flush();

        public abstract int GetError();

        public abstract void Hint(int target, int mode);

        public abstract bool IsEnabled(int cap);

        public abstract void PixelStorei(int pName, int param);

        public abstract void PolygonOffset(float factor, float offset);

        public abstract void SampleCoverage(float value, bool invert);

        public abstract void Scissor(int x, int y, int width, int height);

        public abstract void StencilFunction(int func, int reff, int mask);

        public abstract void StencilFuncSeparate(int face, int func, int reff, int mask);

        public abstract void StencilMask(int mask);

        public abstract void StencilMaskSeparate(int face, int mask);

        public abstract void StencilOp(int fail, int zFail, int zPass);

        public abstract void StencilOpSeparate(int face, int fail, int zFail, int zPass);

        public abstract void Viewport(int x, int y, int width, int height);

        /* ------------------------------------------Drawing------------------------------------------------------*/

        public abstract void DrawArrays(int mode, int first, int count);

        public abstract void DrawElements(int mode, int count, int type, int offset);

        public abstract void FrontFace(int mode);

        public abstract void LineWidth(float width);

        /* ------------------------------------------Textures------------------------------------------------------*/

        public abstract void ActiveTexture(int texture);

        public abstract void BindTexture(int target, ITexture texture);

        public abstract void CopyTexImage2D(int target, int level, int internalFormat, int x, int y, int width, int height,
                                   int border);

        public abstract void CopyTexSubImage2D(int target, int level, int xOffset, int yOffset,
                                      int x, int y, int width, int height);

        public abstract ITexture CreateTexture();

        public abstract void DeleteTexture(ITexture texture);

        public abstract void GenerateMipmap(int target);

        public abstract float GetTextureParameter(int target, int pName);

        public abstract bool IsTexture(ITexture texture);

        public abstract void TexImage2D(int target, int level, int internalFormat, int format, int type, ImageData image);

        public abstract void TexImage2D(int target, int level, int internalFormat, int format, int type, IImageResource image);

        public abstract void TexParameterf(int target, int pName, float param);

        public abstract void TexParameteri(int target, int pName, int param);

        public abstract void TexImage2D(int target, int level, int xOffset, int yOffset, int format, int type, ImageData image);

        public abstract void TexImage2D(int target, int level, int xOffset, int yOffset, int format, int type, IImageResource image);
        
        public abstract void TexImage2D(int target, int level, int internalformat, int width, int height, int border, int format,
                    int type, float[] pixels);

        /* --------------------------------------------Shaders---------------------------------------------------*/

        public abstract void AttachShader(IShaderProgram program, IShader shader);

        public abstract void CompileShader(IShader shader);

        public abstract IShaderProgram CreateProgram();

        public abstract IShader CreateShader(int type);

        public abstract void DeleteShaderProgram(IShader program);

        public abstract void DeleteShader(IShader shader);

        public abstract void DetachShader(IShaderProgram program, IShader shader);

        public abstract List<IShader> GetAttachedShaders(IShaderProgram program);

        public abstract Object GetProgramParameter(IShaderProgram program, int pName);

        public abstract String GetProgramInfoLog(IShaderProgram program);

        public abstract Object GetShaderParameter(IShader shader, int pName);

        public abstract String GetShaderInfoLog(IShader shader);

        public abstract String GetShaderSource(IShader shader);

        public abstract bool IsShaderProgram(IShaderProgram shaderProgram);

        public abstract bool IsShader(IShader shader);

        public abstract void LinkProgram(IShaderProgram program);

        public abstract void ShaderSource(IShader shader, String source);

        public abstract void UseProgram(IShaderProgram program);

        public abstract void ValidateProgram(IShaderProgram program);

        /* --------------------------------------Attributes and Uniforms---------------------------------------------------*/

        public abstract void BindAttributeLocation(IShaderProgram program, int index, String name);

        public abstract void DisableVertexAttributeArray(int index);

        public abstract void EnableVertexAttribArray(int index);

        public abstract IActiveInfo GetActiveAttribute(IShaderProgram program, int index);

        public abstract IActiveInfo GetActiveUniform(IShaderProgram program, int index);

        public abstract int GetAttribLocation(IShaderProgram program, String name);

        public abstract List<float> GetUniform(IShaderProgram program, IUniformLocation location);

        public abstract IUniformLocation GetUniformLocation(IShaderProgram program, String name);

        public abstract Object GetVertexAttrib(int index, int pName);

        public abstract int GetVertexAttribOffset(int index, int pName);

        public abstract void Uniform1f(IUniformLocation location, float x);

        public abstract void Uniform1fv(IUniformLocation location, float[] v);

        public abstract void Uniform1i(IUniformLocation location, int x);

        public abstract void Uniform1iv(IUniformLocation location, int[] v);

        public abstract void Uniform2f(IUniformLocation location, float x, float y);

        public abstract void Uniform2fv(IUniformLocation location, float[] v);

        public abstract void Uniform2i(IUniformLocation location, int x, int y);

        public abstract void Uniform2iv(IUniformLocation location, int[] v);

        public abstract void Uniform3f(IUniformLocation location, float x, float y, float z);

        public abstract void Uniform3fv(IUniformLocation location, float[] v);

        public abstract void Uniform3i(IUniformLocation location, int x, int y, int z);

        public abstract void Uniform3iv(IUniformLocation location, int[] v);

        public abstract void Uniform4f(IUniformLocation location, float x, float y, float z, float w);

        public abstract void Uniform4fv(IUniformLocation location, float[] v);

        public abstract void Uniform4i(IUniformLocation location, int x, int y, int z, int w);

        public abstract void Uniform4iv(IUniformLocation location, int[] v);

        public abstract void UniformMatrix2fv(IUniformLocation location, bool transpose, float[] value);

        public abstract void UniformMatrix3fv(IUniformLocation location, bool transpose, float[] value);

        public abstract void UniformMatrix4fv(IUniformLocation location, bool transpose, float[] value);

        public abstract void VertexAttrib1f(int index, float x);

        public abstract void VertexAttrib1fv(int index, float[] values);

        public abstract void VertexAttrib2f(int index, float x, float y);

        public abstract void VertexAttrib2fv(int index, float[] values);

        public abstract void VertexAttrib3f(int index, float x, float y, float z);

        public abstract void VertexAttrib3fv(int index, float[] values);

        public abstract void VertexAttrib4f(int index, float x, float y, float z, float w);

        public abstract void VertexAttrib4fv(int index, float[] values);

        public abstract void VertexAttribPointer(int index, int size, int type, bool normalized, int stride, int offset);


        /* ------------------------------------------- Buffers -------------------------------------------------------*/

        public abstract void BindBuffer(int target, IBuffer buffer);

        public abstract void BufferData(int target, Array data, int usage);

        public abstract void BufferSubData(int target, int offset, Array data);

        public abstract IBuffer CreateBuffer();

        public abstract void DeleteBuffer(IBuffer buffer);

        public abstract bool IsBuffer(IBuffer buffer);

        /* -----------------------------------------Frame Buffer-----------------------------------------------------------*/

        public abstract void BindFramebuffer(int target, IFrameBuffer frameBuffer);

        public abstract int CheckFramebufferStatus(int target);

        public abstract IFrameBuffer CreateFramebuffer();

        public abstract void DeleteFramebuffer(IFrameBuffer frameBuffer);

        public abstract void FramebufferRenderbuffer(int target, int attachment, int renderBufferTarget,
                                            IRenderBuffer renderBuffer);
        public abstract void FramebufferTexture2D(int target, int attachment, int textureTarget, ITexture texture, int level);

        public abstract Object GetFramebufferAttachmentParameter(int target, int attachment, int pName);

        public abstract bool IsFramebuffer(IFrameBuffer frameBuffer);

        public abstract void ReadPixels(int x, int y, int width, int height, int format, int type, Array pixels);

        /* -----------------------------------------Render Buffer-----------------------------------------------------------*/

        public abstract void BindRenderbuffer(int target, IRenderBuffer renderBuffer);

        public abstract IRenderBuffer CreateRenderbuffer();

        public abstract void DeleteRenderbuffer(IRenderBuffer buffer);

        public abstract Object GetRenderbufferParameter(int target, int pName);

        public abstract bool IsRenderbuffer(IRenderBuffer renderBuffer);

        public abstract void RenderbufferStorage(int target, int internalFormat, int width, int height);

        /*--------------------------------------------Extensions------------------------------------------------------------*/

        public abstract String[] GetSupportedExtensions();

        public abstract Object GetExtension(String extension);
    }
}
