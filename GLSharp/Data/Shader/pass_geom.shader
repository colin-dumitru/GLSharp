<?xml version="1.0" encoding="UTF-8"?>
<shader name="Test">
    <attribute type="vec3">aVertexPosition</attribute>

    <uniform type="mat4">uMVMatrix</uniform>
    <uniform type="mat4">uPMatrix</uniform>
    
    <vertex_shader>
        <![CDATA[
        attribute vec3 aVertexPosition;

        uniform mat4 uMVMatrix;
        uniform mat4 uPMatrix;
        uniform mat4 uCMatrix;

        void main(void) {
            gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
        }
        ]]>
    </vertex_shader>
    <fragment_shader>
        <![CDATA[
        precision mediump float;

        void main(void) {
            gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
        }
        ]]>
    </fragment_shader>
</shader>