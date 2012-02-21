using System;
using System.Collections.Generic;
using System.Linq;
using System.Html.Media.Graphics;
using System.Runtime.CompilerServices;
using System.Html;
using GLSharp.Data;

namespace GLSharp.Graphics {
    [Imported]
    public abstract class WebGL{

        /* What buffer to clear. Can use a combination of each one.*/
    const int DEPTH_BUFFER_BIT = 0x00000100;
    const int STENCIL_BUFFER_BIT = 0x00000400;
    const int COLOR_BUFFER_BIT = 0x00004000;

    /* BeginMode */
    const int POINTS = 0x0000;
    const int LINES = 0x0001;
    const int LINE_LOOP = 0x0002;
    const int LINE_STRIP = 0x0003;
    const int TRIANGLES = 0x0004;
    const int TRIANGLE_STRIP = 0x0005;
    const int TRIANGLE_FAN = 0x0006;

    /* BlendingFactorDest */
    const int ZERO = 0;
    const int ONE = 1;
    const int SRC_COLOR = 0x0300;
    const int ONE_MINUS_SRC_COLOR = 0x0301;
    const int SRC_ALPHA = 0x0302;
    const int ONE_MINUS_SRC_ALPHA = 0x0303;
    const int DST_ALPHA = 0x0304;
    const int ONE_MINUS_DST_ALPHA = 0x0305;

    /* BlendingFactorSrc */
    /*      ZERO */
    /*      ONE */
    const int DST_COLOR = 0x0306;
    const int ONE_MINUS_DST_COLOR = 0x0307;
    const int SRC_ALPHA_SATURATE = 0x0308;
    /*      SRC_ALPHA */
    /*      ONE_MINUS_SRC_ALPHA */
    /*      DST_ALPHA */
    /*      ONE_MINUS_DST_ALPHA */

    /* BlendEquationSeparate */
    const int FUNC_ADD = 0x8006;
    const int BLEND_EQUATION = 0x8009;
    const int BLEND_EQUATION_RGB = 0x8009;   /* same as BLEND_EQUATION */
    const int BLEND_EQUATION_ALPHA = 0x883D;

    /* BlendSubtract */
    const int FUNC_SUBTRACT = 0x800A;
    const int FUNC_REVERSE_SUBTRACT = 0x800B;

    /* Separate Blend Functions */
    const int BLEND_DST_RGB = 0x80C8;
    const int BLEND_SRC_RGB = 0x80C9;
    const int BLEND_DST_ALPHA = 0x80CA;
    const int BLEND_SRC_ALPHA = 0x80CB;
    const int CONSTANT_COLOR = 0x8001;
    const int ONE_MINUS_CONSTANT_COLOR = 0x8002;
    const int CONSTANT_ALPHA = 0x8003;
    const int ONE_MINUS_CONSTANT_ALPHA = 0x8004;
    const int BLEND_COLOR = 0x8005;

    /* Buffer Objects */
    const int ARRAY_BUFFER = 0x8892;
    const int ELEMENT_ARRAY_BUFFER = 0x8893;
    const int ARRAY_BUFFER_BINDING = 0x8894;
    const int ELEMENT_ARRAY_BUFFER_BINDING = 0x8895;

    const int STREAM_DRAW = 0x88E0;
    const int STATIC_DRAW = 0x88E4;
    const int DYNAMIC_DRAW = 0x88E8;

    const int BUFFER_SIZE = 0x8764;
    const int BUFFER_USAGE = 0x8765;

    const int CURRENT_VERTEX_ATTRIBUTE = 0x8626;

    /* CullFaceMode */
    const int FRONT = 0x0404;
    const int BACK = 0x0405;
    const int FRONT_AND_BACK = 0x0408;

    /* TEXTURE_2D */
    const int CULL_FACE = 0x0B44;
    const int BLEND = 0x0BE2;
    const int DITHER = 0x0BD0;
    const int STENCIL_TEST = 0x0B90;
    const int DEPTH_TEST = 0x0B71;
    const int SCISSOR_TEST = 0x0C11;
    const int POLYGON_OFFSET_FILL = 0x8037;
    const int SAMPLE_ALPHA_TO_COVERAGE = 0x809E;
    const int SAMPLE_COVERAGE = 0x80A0;

    /* ErrorCode */
    const int NO_ERROR = 0;
    const int INVALID_ENUM = 0x0500;
    const int INVALID_VALUE = 0x0501;
    const int INVALID_OPERATION = 0x0502;
    const int OUT_OF_MEMORY = 0x0505;

    /* FrontFaceDirection */
    const int CW = 0x0900;
    const int CCW = 0x0901;

    /* GetPName */
    const int LINE_WIDTH = 0x0B21;
    const int ALIASED_POINT_SIZE_RANGE = 0x846D;
    const int ALIASED_LINE_WIDTH_RANGE = 0x846E;
    const int CULL_FACE_MODE = 0x0B45;
    const int FRONT_FACE = 0x0B46;
    const int DEPTH_RANGE = 0x0B70;
    const int DEPTH_WRITEMASK = 0x0B72;
    const int DEPTH_CLEAR_VALUE = 0x0B73;
    const int DEPTH_FUNC = 0x0B74;
    const int STENCIL_CLEAR_VALUE = 0x0B91;
    const int STENCIL_FUNC = 0x0B92;
    const int STENCIL_FAIL = 0x0B94;
    const int STENCIL_PASS_DEPTH_FAIL = 0x0B95;
    const int STENCIL_PASS_DEPTH_PASS = 0x0B96;
    const int STENCIL_reff = 0x0B97;
    const int STENCIL_VALUE_MASK = 0x0B93;
    const int STENCIL_WRITEMASK = 0x0B98;
    const int STENCIL_BACK_FUNC = 0x8800;
    const int STENCIL_BACK_FAIL = 0x8801;
    const int STENCIL_BACK_PASS_DEPTH_FAIL = 0x8802;
    const int STENCIL_BACK_PASS_DEPTH_PASS = 0x8803;
    const int STENCIL_BACK_reff = 0x8CA3;
    const int STENCIL_BACK_VALUE_MASK = 0x8CA4;
    const int STENCIL_BACK_WRITEMASK = 0x8CA5;
    const int VIEWPORT = 0x0BA2;
    const int SCISSOR_BOX = 0x0C10;

    /*      SCISSOR_TEST */
    const int COLOR_CLEAR_VALUE = 0x0C22;
    const int COLOR_WRITEMASK = 0x0C23;
    const int UNPACK_ALIGNMENT = 0x0CF5;
    const int PACK_ALIGNMENT = 0x0D05;
    const int MAX_TEXTURE_SIZE = 0x0D33;
    const int MAX_VIEWPORT_DIMS = 0x0D3A;
    const int SUBPIXEL_BITS = 0x0D50;
    const int RED_BITS = 0x0D52;
    const int GREEN_BITS = 0x0D53;
    const int BLUE_BITS = 0x0D54;
    const int ALPHA_BITS = 0x0D55;
    const int DEPTH_BITS = 0x0D56;
    const int STENCIL_BITS = 0x0D57;
    const int POLYGON_OFFSET_UNITS = 0x2A00;

    /*      POLYGON_OFFSET_FILL */
    const int POLYGON_OFFSET_FACTOR = 0x8038;
    const int TEXTURE_BINDING_2D = 0x8069;
    const int SAMPLE_BUFFERS = 0x80A8;
    const int SAMPLES = 0x80A9;
    const int SAMPLE_COVERAGE_VALUE = 0x80AA;
    const int SAMPLE_COVERAGE_INVERT = 0x80AB;


    const int NUM_COMPRESSED_TEXTURE_FORMATS = 0x86A2;
    const int COMPRESSED_TEXTURE_FORMATS = 0x86A3;

    /* HintMode */
    const int DONT_CARE = 0x1100;
    const int FASTEST = 0x1101;
    const int NICEST = 0x1102;

    /* HintTarget */
    const int GENERATE_MIPMAP_HINT = 0x8192;

    /* DataType */
    const int BYTE = 0x1400;
    const int UNSIGNED_BYTE = 0x1401;
    const int SHORT = 0x1402;
    const int UNSIGNED_SHORT = 0x1403;
    const int INT = 0x1404;
    const int UNSIGNED_INT = 0x1405;
    const int FLOAT = 0x1406;

    /* PixelFormat */
    const int DEPTH_COMPONENT = 0x1902;
    const int ALPHA = 0x1906;
    const int RGB = 0x1907;
    const int RGBA = 0x1908;
    const int LUMINANCE = 0x1909;
    const int LUMINANCE_ALPHA = 0x190A;

    /* PixelType */
    /*      UNSIGNED_BYTE */
    const int UNSIGNED_SHORT_4_4_4_4 = 0x8033;
    const int UNSIGNED_SHORT_5_5_5_1 = 0x8034;
    const int UNSIGNED_SHORT_5_6_5 = 0x8363;

    /* Shaders */
    const int FRAGMENT_SHADER = 0x8B30;
    const int VERTEX_SHADER = 0x8B31;
    const int MAX_VERTEX_ATTRIBS = 0x8869;
    const int MAX_VERTEX_UNIFORM_VECTORS = 0x8DFB;
    const int MAX_VARYING_VECTORS = 0x8DFC;
    const int MAX_COMBINED_TEXTURE_IMAGE_UNITS = 0x8B4D;
    const int MAX_VERTEX_TEXTURE_IMAGE_UNITS = 0x8B4C;
    const int MAX_TEXTURE_IMAGE_UNITS = 0x8872;
    const int MAX_FRAGMENT_UNIFORM_VECTORS = 0x8DFD;
    const int SHADER_TYPE = 0x8B4F;
    const int DELETE_STATUS = 0x8B80;
    const int LINK_STATUS = 0x8B82;
    const int VALIDATE_STATUS = 0x8B83;
    const int ATTACHED_SHADERS = 0x8B85;
    const int ACTIVE_UNIFORMS = 0x8B86;
    const int ACTIVE_ATTRIBUTES = 0x8B89;
    const int SHADING_LANGUAGE_VERSION = 0x8B8C;
    const int CURRENT_PROGRAM = 0x8B8D;

    /* StencilFunction */
    const int NEVER = 0x0200;
    const int LESS = 0x0201;
    const int EQUAL = 0x0202;
    const int LEQUAL = 0x0203;
    const int GREATER = 0x0204;
    const int NOTEQUAL = 0x0205;
    const int GEQUAL = 0x0206;
    const int ALWAYS = 0x0207;

    /* StencilOp */
    /*      ZERO */
    const int KEEP = 0x1E00;
    const int REPLACE = 0x1E01;
    const int INCR = 0x1E02;
    const int DECR = 0x1E03;
    const int INVERT = 0x150A;
    const int INCR_WRAP = 0x8507;
    const int DECR_WRAP = 0x8508;

    /* StringName */
    const int VENDOR = 0x1F00;
    const int RENDERER = 0x1F01;
    const int VERSION = 0x1F02;

    /* TextureMagFilter */
    const int NEAREST = 0x2600;
    const int LINEAR = 0x2601;

    /* TextureMinFilter */
    /*      NEAREST */
    /*      LINEAR */
    const int NEAREST_MIPMAP_NEAREST = 0x2700;
    const int LINEAR_MIPMAP_NEAREST = 0x2701;
    const int NEAREST_MIPMAP_LINEAR = 0x2702;
    const int LINEAR_MIPMAP_LINEAR = 0x2703;

    /* TextureParameterName */
    const int TEXTURE_MAG_FILTER = 0x2800;
    const int TEXTURE_MIN_FILTER = 0x2801;
    const int TEXTURE_WRAP_S = 0x2802;
    const int TEXTURE_WRAP_T = 0x2803;

    /* TextureTarget */
    const int TEXTURE_2D = 0x0DE1;
    const int TEXTURE = 0x1702;

    const int TEXTURE_CUBE_MAP = 0x8513;
    const int TEXTURE_BINDING_CUBE_MAP = 0x8514;
    const int TEXTURE_CUBE_MAP_POSITIVE_X = 0x8515;
    const int TEXTURE_CUBE_MAP_NEGATIVE_X = 0x8516;
    const int TEXTURE_CUBE_MAP_POSITIVE_Y = 0x8517;
    const int TEXTURE_CUBE_MAP_NEGATIVE_Y = 0x8518;
    const int TEXTURE_CUBE_MAP_POSITIVE_Z = 0x8519;
    const int TEXTURE_CUBE_MAP_NEGATIVE_Z = 0x851A;
    const int MAX_CUBE_MAP_TEXTURE_SIZE = 0x851C;

    /* TextureUnit */
    const int TEXTURE0 = 0x84C0;
    const int TEXTURE1 = 0x84C1;
    const int TEXTURE2 = 0x84C2;
    const int TEXTURE3 = 0x84C3;
    const int TEXTURE4 = 0x84C4;
    const int TEXTURE5 = 0x84C5;
    const int TEXTURE6 = 0x84C6;
    const int TEXTURE7 = 0x84C7;
    const int TEXTURE8 = 0x84C8;
    const int TEXTURE9 = 0x84C9;
    const int TEXTURE10 = 0x84CA;
    const int TEXTURE11 = 0x84CB;
    const int TEXTURE12 = 0x84CC;
    const int TEXTURE13 = 0x84CD;
    const int TEXTURE14 = 0x84CE;
    const int TEXTURE15 = 0x84CF;
    const int TEXTURE16 = 0x84D0;
    const int TEXTURE17 = 0x84D1;
    const int TEXTURE18 = 0x84D2;
    const int TEXTURE19 = 0x84D3;
    const int TEXTURE20 = 0x84D4;
    const int TEXTURE21 = 0x84D5;
    const int TEXTURE22 = 0x84D6;
    const int TEXTURE23 = 0x84D7;
    const int TEXTURE24 = 0x84D8;
    const int TEXTURE25 = 0x84D9;
    const int TEXTURE26 = 0x84DA;
    const int TEXTURE27 = 0x84DB;
    const int TEXTURE28 = 0x84DC;
    const int TEXTURE29 = 0x84DD;
    const int TEXTURE30 = 0x84DE;
    const int TEXTURE31 = 0x84DF;
    const int ACTIVE_TEXTURE = 0x84E0;

    /* TextureWrapMode */
    const int REPEAT = 0x2901;
    const int CLAMP_TO_EDGE = 0x812F;
    const int MIRRORED_REPEAT = 0x8370;

    /* Uniform Types */
    const int FLOAT_VEC2 = 0x8B50;
    const int FLOAT_VEC3 = 0x8B51;
    const int FLOAT_VEC4 = 0x8B52;
    const int INT_VEC2 = 0x8B53;
    const int INT_VEC3 = 0x8B54;
    const int INT_VEC4 = 0x8B55;
    const int BOOL = 0x8B56;
    const int BOOL_VEC2 = 0x8B57;
    const int BOOL_VEC3 = 0x8B58;
    const int BOOL_VEC4 = 0x8B59;
    const int FLOAT_MAT2 = 0x8B5A;
    const int FLOAT_MAT3 = 0x8B5B;
    const int FLOAT_MAT4 = 0x8B5C;
    const int SAMPLER_2D = 0x8B5E;
    const int SAMPLER_CUBE = 0x8B60;

    /* Vertex Arrays */
    const int VERTEX_ATTRIB_ARRAY_ENABLED = 0x8622;
    const int VERTEX_ATTRIB_ARRAY_SIZE = 0x8623;
    const int VERTEX_ATTRIB_ARRAY_STRIDE = 0x8624;
    const int VERTEX_ATTRIB_ARRAY_TYPE = 0x8625;
    const int VERTEX_ATTRIB_ARRAY_NORMALIZED = 0x886A;
    const int VERTEX_ATTRIB_ARRAY_POINTER = 0x8645;
    const int VERTEX_ATTRIB_ARRAY_BUFFER_BINDING = 0x889F;

    /* Shader Source */
    const int COMPILE_STATUS = 0x8B81;

    /* Shader Precision-Specified Types */
    const int LOW_FLOAT = 0x8DF0;
    const int MEDIUM_FLOAT = 0x8DF1;
    const int HIGH_FLOAT = 0x8DF2;
    const int LOW_INT = 0x8DF3;
    const int MEDIUM_INT = 0x8DF4;
    const int HIGH_INT = 0x8DF5;

    /* Framebuffer Object. */
    const int FRAMEBUFFER = 0x8D40;
    const int RENDERBUFFER = 0x8D41;

    const int RGBA4 = 0x8056;
    const int RGB5_A1 = 0x8057;
    const int RGB565 = 0x8D62;
    const int DEPTH_COMPONENT16 = 0x81A5;
    const int STENCIL_INDEX = 0x1901;
    const int STENCIL_INDEX8 = 0x8D48;
    const int DEPTH_STENCIL = 0x84F9;

    const int RENDERBUFFER_WIDTH = 0x8D42;
    const int RENDERBUFFER_HEIGHT = 0x8D43;
    const int RENDERBUFFER_INTERNAL_FORMAT = 0x8D44;
    const int RENDERBUFFER_RED_SIZE = 0x8D50;
    const int RENDERBUFFER_GREEN_SIZE = 0x8D51;
    const int RENDERBUFFER_BLUE_SIZE = 0x8D52;
    const int RENDERBUFFER_ALPHA_SIZE = 0x8D53;
    const int RENDERBUFFER_DEPTH_SIZE = 0x8D54;
    const int RENDERBUFFER_STENCIL_SIZE = 0x8D55;

    const int FRAMEBUFFER_ATTACHMENT_OBJECT_TYPE = 0x8CD0;
    const int FRAMEBUFFER_ATTACHMENT_OBJECT_NAME = 0x8CD1;
    const int FRAMEBUFFER_ATTACHMENT_TEXTURE_LEVEL = 0x8CD2;
    const int FRAMEBUFFER_ATTACHMENT_TEXTURE_CUBE_MAP_FACE = 0x8CD3;

    const int COLOR_ATTACHMENT0 = 0x8CE0;
    const int DEPTH_ATTACHMENT = 0x8D00;
    const int STENCIL_ATTACHMENT = 0x8D20;
    const int DEPTH_STENCIL_ATTACHMENT = 0x821A;

    const int NONE = 0;

    const int FRAMEBUFFER_COMPLETE = 0x8CD5;
    const int FRAMEBUFFER_INCOMPLETE_ATTACHMENT = 0x8CD6;
    const int FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT = 0x8CD7;
    const int FRAMEBUFFER_INCOMPLETE_DIMENSIONS = 0x8CD9;
    const int FRAMEBUFFER_UNSUPPORTED = 0x8CDD;

    const int FRAMEBUFFER_BINDING = 0x8CA6;
    const int RENDERBUFFER_BINDING = 0x8CA7;
    const int MAX_RENDERBUFFER_SIZE = 0x84E8;

    const int INVALID_FRAMEBUFFER_OPERATION = 0x0506;

    /* Type of texture unpacking. */
    const int UNPACK_FLIP_Y = 0x9240;
    const int UNPACK_PREMULTIPLY_ALPHA = 0x9241;
    const int CONTEXT_LOST = 0x9242;
    const int UNPACK_COLORSPACE_CONVERSION = 0x9243;

    /* ---------------------------------------Core Functions-----------------------------------------------------------*/

    public abstract int getScreenWidth();

    public abstract int getScreenHeight();

    public abstract void blendColor(Color color);

    public abstract void blendEquation(int mode);

    public abstract void blendEquationSeparate(int modeRGB, int modeAlpha);

    public abstract void blendFunction(int sourceFactor, int destinationFactor);

    public abstract void blendFunctionSeparate(int sourceRGB, int destinationRGB, int sourceAlpha, int destinationAlpha);

    public abstract void clear(int mask);

    public abstract void clearColor(float red, float green, float blue, float alpha);

    public abstract void clearDepth(float depth);

    public abstract void clearStencil(int s);

    public abstract void colorMask(bool red, bool green, bool blue, bool alpha);

    public abstract void cullFace(int mode);

    public abstract void depthFunc(int func);

    public abstract void depthMask(bool flag);

    public abstract void depthRange(float zNear, float zFar);

    public abstract void disable(int component);

    public abstract void enable(int component);

    public abstract void finish();

    public abstract void flush();

    public abstract int getError();

    public abstract void hint(int target, int mode);

    public abstract bool isEnabled(int cap);

    public abstract void pixelStore(int pName, int param);

    public abstract void polygonOffset(float factor, float offset);

    public abstract void sampleCoverage(float value, bool invert);

    public abstract void scissor(int x, int y, int width, int height);

    public abstract void stencilFunction(int func, int reff, int mask);

    public abstract void stencilFuncSeparate(int face, int func, int reff, int mask);

    public abstract void stencilMask(int mask);

    public abstract void stencilMaskSeparate(int face, int mask);

    public abstract void stencilOp(int fail, int zFail, int zPass);

    public abstract void stencilOpSeparate(int face, int fail, int zFail, int zPass);

    public abstract void viewport(int x, int y, int width, int height);

    /* ------------------------------------------Drawing------------------------------------------------------*/

    public abstract void drawArrays(int mode, int first, int count);

    public abstract void drawElements(int mode, int count, int type, int offset);

    public abstract void frontFace(int mode);

    public abstract void lineWidth(float width);

    /* ------------------------------------------Textures------------------------------------------------------*/

    public abstract void activateTexture(int texture);

    public abstract void bindTexture(int target, Texture texture);

    public abstract void copyTexImage2D(int target, int level, int internalFormat, int x, int y, int width, int height,
                               int border);

    public abstract void copyTexSubImage2D(int target, int level, int xOffset, int yOffset,
                                  int x, int y, int width, int height);

    public abstract Texture createTexture();

    public abstract void deleteTexture(Texture texture);

    public abstract void generateMipmap(int target);

    public abstract float getTextureParameter(int target, int pName);

    public abstract bool isTexture(Texture texture);

    public abstract void texImage2D(int target, int level, int internalFormat, int format, int type, ImageData image);

    public abstract void texImage2D(int target, int level, int internalFormat, int format, int type, IImageResource image);

    public abstract void texParameter(int target, int pName, float param);

    public abstract void texParameter(int target, int pName, int param);

    public abstract void texImage2D(int target, int level, int xOffset, int yOffset, int format, int type, ImageData image);

    public abstract void texImage2D(int target, int level, int xOffset, int yOffset, int format, int type, IImageResource image);


    /* --------------------------------------------Shaders---------------------------------------------------*/

    public abstract void attachShader(ShaderProgram program, Shader shader);

    public abstract void compileShader(Shader shader);

    public abstract ShaderProgram createShaderProgram();

    public abstract Shader createShader(int type);

    public abstract void deleteShaderProgram(Shader program);

    public abstract void deleteShader(Shader shader);

    public abstract void detachShader(ShaderProgram program, Shader shader);

    public abstract List<Shader> getAttachedShaders(ShaderProgram program);

    public abstract Object getProgramParameter(ShaderProgram program, int pName);

    public abstract String getProgramInfoLog(ShaderProgram program);

    public abstract Object getShaderParameter(ShaderProgram shader, int pName);

    public abstract String getShaderInfoLog(Shader shader);

    public abstract String getShaderSource(Shader shader);

    public abstract bool isShaderProgram(ShaderProgram shaderProgram);

    public abstract bool isShader(Shader shader);

    public abstract void linkProgram(ShaderProgram program);

    public abstract void shaderSource(Shader shader, String source);

    public abstract void useProgram(ShaderProgram program);

    public abstract void validateProgram(ShaderProgram program);

    /* --------------------------------------Attributes and Uniforms---------------------------------------------------*/

    public abstract void bindAttributeLocation(ShaderProgram program, int index, String name);

    public abstract void disableVertexAttributeArray(int index);

    public abstract void enableVertexAttributeArray(int index);

    public abstract ActiveInfo getActiveAttribute(ShaderProgram program, int index);

    public abstract ActiveInfo getActiveUniform(ShaderProgram program, int index);

    public abstract int getAttributeLocation(ShaderProgram program, String name);

    public abstract List<float> getUniform(ShaderProgram program, UniformLocation location);

    public abstract UniformLocation getUniformLocation(ShaderProgram program, String name);

    public abstract Object getVertexAttribute(int index, int pName);

    public abstract int getVertexAttributeOffset(int index, int pName);

    public abstract void uniform1f(UniformLocation location, float x);

    public abstract void uniform1f(UniformLocation location, float[] v);

    public abstract void uniform1i(UniformLocation location, int x);

    public abstract void uniform1i(UniformLocation location, int[] v);

    public abstract void uniform2f(UniformLocation location, float x, float y);

    public abstract void uniform2f(UniformLocation location, float[] v);

    public abstract void uniform2i(UniformLocation location, int x, int y);

    public abstract void uniform2i(UniformLocation location, int[] v);

    public abstract void uniform3f(UniformLocation location, float x, float y, float z);

    public abstract void uniform3f(UniformLocation location, float[] v);

    public abstract void uniform3i(UniformLocation location, int x, int y, int z);

    public abstract void uniform3i(UniformLocation location, int[] v);

    public abstract void uniform4f(UniformLocation location, float x, float y, float z, float w);

    public abstract void uniform4f(UniformLocation location, float[] v);

    public abstract void uniform4i(UniformLocation location, int x, int y, int z, int w);

    public abstract void uniform4i(UniformLocation location, int[] v);

    public abstract void uniformMatrix2f(UniformLocation location, bool transpose, float[] value);

    public abstract void uniformMatrix3f(UniformLocation location, bool transpose, float[] value);

    public abstract void uniformMatrix4f(UniformLocation location, bool transpose, float[] value);

    public abstract void vertexAttribute1f(int index, float x);

    public abstract void vertexAttribute1f(int index, float[] values);

    public abstract void vertexAttribute2f(int index, float x, float y);

    public abstract void vertexAttribute2f(int index, float[] values);

    public abstract void vertexAttribute3f(int index, float x, float y, float z);

    public abstract void vertexAttribute3f(int index, float[] values);

    public abstract void vertexAttribute4f(int index, float x, float y, float z, float w);

    public abstract void vertexAttribute4f(int index, float[] values);

    public abstract void vertexAttributePointer(int index, int size, int type, bool normalized, int stride, int offset);


    /* ------------------------------------------- Buffers -------------------------------------------------------*/

    public abstract void bindBuffer(int target, Buffer buffer);

    public abstract void bufferData(int target, Array data, int usage);

    public abstract void bufferSubData(int target, int offset,Array data);

    public abstract Buffer createBuffer();

    public abstract void deleteBuffer(Buffer buffer);

    public abstract bool isBuffer(Buffer buffer);

    /* -----------------------------------------Frame Buffer-----------------------------------------------------------*/

    public abstract void bindFrameBuffer(int target, FrameBuffer frameBuffer);

    public abstract int checkFrameBufferStatus(int target);

    public abstract FrameBuffer createFameBuffer();

    public abstract void deleteFrameBuffer(FrameBuffer frameBuffer);

    public abstract void frameBufferRenderBuffer(int target, int attachment, int renderBufferTarget,
                                        RenderBuffer renderBuffer);
    public abstract void frameBufferTexture2D(int target, int attachment, int textureTarget, Texture texture, int level);

    public abstract Object getFrameBufferAttachmentParameter(int target, int attachment, int pName);

    public abstract bool isFrameBuffer(FrameBuffer frameBuffer);

    public abstract void readPixels(int x, int y, int width, int height, int format, int type, Array pixels);

    /* -----------------------------------------Render Buffer-----------------------------------------------------------*/

    public abstract void bindRenderBuffer(int target, RenderBuffer renderBuffer);

    public abstract RenderBuffer createRenderBuffer();

    public abstract void deleteRenderBuffer(RenderBuffer buffer);

    public abstract Object getRenderBufferParameter(int target, int pName);

    public abstract bool isRenderBuffer(RenderBuffer renderBuffer);

    public abstract void renderBufferStorage(int target, int internalFormat, int width, int height);
    }
}
