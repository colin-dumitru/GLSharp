<?xml version="1.0" encoding="UTF-8"?>
<shader name="Test">

  <uniform>uMVMatrix</uniform>
  <uniform>uPMatrix</uniform>
  <uniform>uLightPos</uniform>
  <uniform>uLightColor</uniform>
  <uniform>uLightType</uniform>
  <uniform>uLightIntensity</uniform>
  <uniform>uSDiffuse</uniform>
  <uniform>uSPosition</uniform>
  <uniform>uSNormal</uniform>
  <uniform>uViewport</uniform>

  <attribute>aVertexPosition</attribute>
    
    <vertex_shader>
        <![CDATA[
		/*vertex position*/
        attribute vec3 aVertexPosition;
		
		/*viewport dimensions*/
		uniform vec2 uViewport;
		/*model view matrix*/
        uniform mat4 uMVMatrix;
		/*perspective matrix*/
        uniform mat4 uPMatrix;
		/*view space light position*/
		uniform vec3 uLightPos;
		/*light color*/
		uniform vec3 uLightColor;
		/*light type*/
		uniform int uLightType;
		/*light intensity*/
		uniform float uLightIntensity;
		
		/*texture samplers*/
		uniform sampler2D uSDiffuse;
		uniform sampler2D uSPosition;
		uniform sampler2D uSNormal;
		
        void main(void) {
			/*output*/
			gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
        }
        ]]>
    </vertex_shader>
    <fragment_shader>
        <![CDATA[
		
        precision mediump float;
		
		#define ATT_FACTOR 0.3
		
		/*viewport dimensions*/
		uniform vec2 uViewport;
		/*view space light position*/
		uniform vec3 uLightPos;
		/*light color*/
		uniform vec3 uLightColor;
		/*light type*/
		uniform int uLightType;
		/*light intensity*/
		uniform float uLightIntensity;
		
		/*texture samplers*/
		uniform sampler2D uSDiffuse;
		uniform sampler2D uSPosition;
		uniform sampler2D uSNormal;
		

        void main(void) {	
			vec2 texCoord = vec2(gl_FragCoord.x / uViewport.x, gl_FragCoord.y / uViewport.y);
			vec4 color = texture2D(uSDiffuse, texCoord);
			vec4 position = texture2D(uSPosition, texCoord);
			vec4 normal = texture2D(uSNormal, texCoord);
			
			if(uLightType == 1){
				vec3 L = normalize(uLightPos - position.xyz);   
				vec3 E = normalize(-position.xyz); 
				vec3 R = normalize(-reflect(L,normal.xyz));
				
				/*diffuse*/
				vec4 Idiff = vec4(uLightColor, 1.0) * max(dot(normal.xyz, L), 0.0);  

				/*specular*/
				vec4 Ispec = vec4(1.0, 1.0, 1.0, 1.0) 
							* pow(max(dot(R,E),0.0), 0.3 * color.w);
				
				/*attenuation*/
				float dist = abs(length(uLightPos - position.xyz));
				float att = (1.0 / (1.0 + dist)) * uLightIntensity;
				
				//gl_FragColor = vec4((Idiff.xyz + Ispec.xyz)* att, 1.0);
				//gl_FragColor = vec4((Idiff.xyz + Ispec.xyz), att * ATT_FACTOR);
				gl_FragColor = vec4(Idiff.xyz, att);
			}
        }
        ]]>
    </fragment_shader>
</shader>