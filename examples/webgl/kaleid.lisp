(clear)
(import $path)

;this all has to be on one line so that 
;the parser will take it as one arg
;im sure it would be possible to introduce 
;backticks for multiline strings

(runshader (fragmentshader "precision highp float;uniform sampler2D u_image;varying vec2 v_texCoord;vec2 kaleid(vec2 st, float nSides){st-=0.5;float r = length(st);float a = atan(st.y, st.x);float pi = 2.0*3.1416;a = mod(a,pi/nSides);a = abs(a-pi/nSides/2.0);return r*vec2(cos(a), sin(a));}void main() {vec2 coord = kaleid(v_texCoord,5.0);gl_FragColor = texture2D(u_image, coord);}"))

