uniform float u_time;
uniform float u_opacity;
varying vec2 vUv;

void main() {
  float alpha = (sin((vUv.x + u_time) * 10.0) * 0.5 + 0.5) * u_opacity;
  gl_FragColor = vec4(0.768, 0.651, 0.384, alpha);
}
