<?xml version="1.0" encoding="UTF-8"?>
<shader name="Depth Effect">

  <uniform>uSPost</uniform>
  
  <attribute>aVertexPosition</attribute>
  
    <vertex_shader>
        <![CDATA[
		/*vertex position*/
        attribute vec3 aVertexPosition;
		
		/*texture samplers*/
		uniform sampler2D uSPost;
		
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
		
		vec4 Desaturate(vec3 color, float Desaturation)
		{
			vec3 grayXfer = vec3(0.3, 0.59, 0.11);
			vec3 gray = vec3(dot(grayXfer, color));
			return vec4(mix(color, gray, Desaturation), 1.0);
		}
		
        void main(void) {		
			vec4 post = texture2D(uSPost, vTexCoord);
			float dist = ((0.5 - vTexCoord.x) * (0.5 - vTexCoord.x) + (0.5 - vTexCoord.y) * (0.5 - vTexCoord.y));
			
			if(dist > 0.08) {
			
				/*blur*/
				float blurSize = (dist - 0.05) * 0.01;
				float blur1 = blurSize;
				float blur2 = blurSize * 2.0;
				float blur3 = blurSize * 3.0;
				float blur4 = blurSize * 4.0;
				
				post = vec4(0.0);
	 
				/*y blur*/
				post += texture2D(uSPost, vec2(vTexCoord.x - blur4, vTexCoord.y)) * 0.03;
				post += texture2D(uSPost, vec2(vTexCoord.x - blur3, vTexCoord.y)) * 0.05;
				post += texture2D(uSPost, vec2(vTexCoord.x - blur2, vTexCoord.y)) * 0.06;
				post += texture2D(uSPost, vec2(vTexCoord.x - blur1, vTexCoord.y)) * 0.07;
				post += texture2D(uSPost, vec2(vTexCoord.x + blur1, vTexCoord.y)) * 0.07;
				post += texture2D(uSPost, vec2(vTexCoord.x + blur2, vTexCoord.y)) * 0.06;
				post += texture2D(uSPost, vec2(vTexCoord.x + blur3, vTexCoord.y)) * 0.05;
				post += texture2D(uSPost, vec2(vTexCoord.x + blur4, vTexCoord.y)) * 0.03;

				/*x blur*/
				post += texture2D(uSPost, vec2(vTexCoord.x, vTexCoord.y - blur4)) * 0.03;
				post += texture2D(uSPost, vec2(vTexCoord.x, vTexCoord.y - blur3)) * 0.05;
				post += texture2D(uSPost, vec2(vTexCoord.x, vTexCoord.y - blur2)) * 0.06;
				post += texture2D(uSPost, vec2(vTexCoord.x, vTexCoord.y - blur1)) * 0.07;
				post += texture2D(uSPost, vec2(vTexCoord.x, vTexCoord.y + blur1)) * 0.07;
				post += texture2D(uSPost, vec2(vTexCoord.x, vTexCoord.y + blur2)) * 0.06;
				post += texture2D(uSPost, vec2(vTexCoord.x, vTexCoord.y + blur3)) * 0.05;
				post += texture2D(uSPost, vec2(vTexCoord.x, vTexCoord.y + blur4)) * 0.03;

				post += texture2D(uSPost, vec2(vTexCoord.x, vTexCoord.y)) * 0.16;
				
				post = Desaturate(post.xyz, (dist - 0.08) * 4.0);
			}
			
			post.x *= 0.7;
			post.y *= 1.1;
			post.z *= 1.1;
			
			gl_FragColor = (post);
        }
        ]]>
    </fragment_shader>
</shader>