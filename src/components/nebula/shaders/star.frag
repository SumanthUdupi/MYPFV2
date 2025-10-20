precision mediump float;
varying vec2 vUv;
uniform float u_time;
uniform float u_phase;
uniform vec3 u_color;

void main() {
  float d = length(vUv - 0.5);
  float alpha = smoothstep(0.5, 0.0, d);
  float tw = 0.5 + 0.5 * sin(u_time * 6.0 + u_phase);
  vec3 col = u_color * (0.6 + 0.4 * tw);
  gl_FragColor = vec4(col, alpha * tw);
}
