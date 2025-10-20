precision mediump float;
varying vec2 vUv;
uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform vec3 u_baseA;
uniform vec3 u_baseB;
uniform vec3 u_jewel;
uniform float u_timeScale;

// Hash / noise helpers
float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453123); }
float noise(vec2 p){
  vec2 i = floor(p);
  vec2 f = fract(p);
  float a = hash(i);
  float b = hash(i + vec2(1.0,0.0));
  float c = hash(i + vec2(0.0,1.0));
  float d = hash(i + vec2(1.0,1.0));
  vec2 u = f*f*(3.0-2.0*f);
  return mix(a,b,u.x) + (c-a)*u.y*(1.0-u.x) + (d-b)*u.x*u.y;
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p = p * 2.0 + vec2(1.7, 9.2);
    a *= 0.5;
  }
  return v;
}

// directional swirls similar to tendrils
float tendril(vec2 uv, float t) {
  float q = fbm(uv * 1.2 + vec2(t * 0.03));
  float r = fbm(uv * 2.0 + q * 0.8 + vec2(-t * 0.02));
  return smoothstep(0.2, 0.8, r * q);
}

vec3 iridescent(vec3 baseA, vec3 baseB, vec3 jewel, float id, float t) {
  // blend across hues with subtle time-based shifts
  float w = 0.5 + 0.5 * sin(t * 0.4 + id * 3.0);
  vec3 c = mix(baseA, baseB, w);
  // add jewel highlights
  c = mix(c, jewel, pow(abs(sin(t * 0.6 + id * 1.7)), 1.4) * 0.25);
  // slight gamma to warm colors
  return pow(c, vec3(0.95));
}

void main(){
  vec2 uv = (vUv - 0.5) * vec2(u_resolution.x / u_resolution.y, 1.0);
  float t = u_time * u_timeScale;

  // organic base cloud
  float base = fbm(uv * 0.9 + vec2(t*0.02));

  // decorative tendrils
  float tend = tendril(uv * vec2(1.2, 0.8) + vec2(0.0, t * 0.01), t);
  float tend2 = tendril(uv * vec2(0.6, 1.4) + vec2(10.0, -t * 0.008), t * 0.8);

  // combine and shape
  float shape = smoothstep(0.25, 0.9, base * 0.7 + tend * 1.2 + tend2 * 0.9);

  // ornamental strokes - thin luminous curves
  float strokes = smoothstep(0.88, 0.95, fbm(uv * 6.0 + vec2(t*0.12)));
  strokes *= 1.0 - smoothstep(0.0, 0.6, length(uv) );

  // iridescent color
  vec3 col = iridescent(u_baseA, u_baseB, u_jewel, base * 2.0, t);

  // accent the strokes with jewel color
  col += u_jewel * strokes * 0.6;

  float alpha = clamp(shape * 0.85 + strokes * 0.6, 0.0, 1.0);
  // vignetting to keep center softly lit
  float vign = smoothstep(0.9, 0.2, length(uv));
  alpha *= (1.0 - vign * 0.6);

  // subtle mouse-driven highlight
  vec2 m = u_mouse * vec2(u_resolution.x / u_resolution.y, 1.0);
  float md = 1.0 - smoothstep(0.0, 0.6, length(uv - m * 0.4));
  col += vec3(0.9,0.8,1.0) * md * 0.06;

  gl_FragColor = vec4(col, alpha * 0.95);
}
