<?xml version="1.0" encoding="UTF-8"?>
<shader name="SSAO">

  <uniform>uSPost</uniform>
  <uniform>uSAccumulation</uniform>
  
  <attribute>aVertexPosition</attribute>
  
    <vertex_shader>
        <![CDATA[
		/*vertex position*/
        attribute vec3 aVertexPosition;
		
		/*texture samplers*/
		uniform sampler2D uSPost;
		uniform sampler2D uSAccumulation;
		
		/*vertex position*/
		varying vec2    vTexCoord;

        void main(void) {
			/*output*/
			vTexCoord = vec2((aVertexPosition.x + 1.0) / 2.0, (aVertexPosition.y + 1.0) / 2.0);
			gl_Position  = vec4(aVertexPosition, 1.0);
        }
        ]]>
    </vertex_shader>
    <fragment_shader>
        <![CDATA[
		
        precision mediump float;

		/*vertex position*/
		varying vec2    vTexCoord;
		
		/*texture samplers*/
		uniform sampler2D uSPost;
		uniform sampler2D uSAccumulation;
		
		const float blurSize = 1.0 / 512.0;
		const float blur1 = blurSize;
		const float blur2 = blurSize * 2.0;
		const float blur3 = blurSize * 3.0;
		const float blur4 = blurSize * 4.0;

        void main(void) {		
			vec4 color = texture2D(uSPost, vTexCoord);
			vec4 acc = texture2D(uSAccumulation, vTexCoord);
			
			vec4 sum = vec4(0.0);
 
			/*y blur*/
			sum += texture2D(uSAccumulation, vec2(vTexCoord.x - blur4, vTexCoord.y)) * 0.05;
			sum += texture2D(uSAccumulation, vec2(vTexCoord.x - blur2, vTexCoord.y)) * 0.08;
			sum += texture2D(uSAccumulation, vec2(vTexCoord.x - blur1, vTexCoord.y)) * 0.09;
			sum += texture2D(uSAccumulation, vec2(vTexCoord.x + blur1, vTexCoord.y)) * 0.09;
			sum += texture2D(uSAccumulation, vec2(vTexCoord.x + blur2, vTexCoord.y)) * 0.08;
			sum += texture2D(uSAccumulation, vec2(vTexCoord.x + blur4, vTexCoord.y)) * 0.05;

			/*x blur*/
			sum += texture2D(uSAccumulation, vec2(vTexCoord.x, vTexCoord.y - blur4)) * 0.05;
			sum += texture2D(uSAccumulation, vec2(vTexCoord.x, vTexCoord.y - blur2)) * 0.08;
			sum += texture2D(uSAccumulation, vec2(vTexCoord.x, vTexCoord.y - blur1)) * 0.09;
			sum += texture2D(uSAccumulation, vec2(vTexCoord.x, vTexCoord.y + blur1)) * 0.09;
			sum += texture2D(uSAccumulation, vec2(vTexCoord.x, vTexCoord.y + blur2)) * 0.08;
			sum += texture2D(uSAccumulation, vec2(vTexCoord.x, vTexCoord.y + blur4)) * 0.05;

			sum += texture2D(uSAccumulation, vec2(vTexCoord.x, vTexCoord.y)) * 0.12;
		   
			/*SSAO + diffuse*/
			gl_FragColor = vec4(color.x * sum.x, color.y * sum.y, color.z * sum.z, 1.0);
			//gl_FragColor = sum;
        }
        ]]>
    </fragment_shader>
</shader>