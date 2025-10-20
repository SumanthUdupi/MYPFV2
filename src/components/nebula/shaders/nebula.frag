precision mediump float;
varying vec2 vUv;
uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform vec3 u_colorA;
uniform vec3 u_colorB;

// 2D Random / noise helpers
float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

float noise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

float fbm(vec2 st) {
    float value = 0.0;
    float amplitude = 0.5;
    for (int i = 0; i < 6; i++) {
        value += amplitude * noise(st);
        st *= 2.0;
        amplitude *= 0.5;
    }
    return value;
}

void main() {
    vec2 st = vUv;
    st.x *= u_resolution.x / u_resolution.y;

    // mouse interaction
    vec2 mouse = vec2(u_mouse.x * (u_resolution.x / u_resolution.y), u_mouse.y);
    float dist = distance(st, mouse);
    st += normalize(st - mouse) * (1.0 - smoothstep(0.0, 0.5, dist)) * 0.08;

    vec2 q = vec2(0.0);
    q.x = fbm(st + 0.0 * u_time);
    q.y = fbm(st + vec2(1.0));

    vec2 r = vec2(0.0);
    r.x = fbm(st + 1.0 * q + vec2(1.7, 9.2) + 0.15 * u_time);
    r.y = fbm(st + 1.0 * q + vec2(8.3, 2.8) + 0.126 * u_time);

    float f = fbm(st + r);

    vec3 color = mix(vec3(0.768, 0.651, 0.384), vec3(0.643, 0.525, 0.259), clamp((f * f) * 4.0, 0.0, 1.0));
    color = mix(color, vec3(0.0), clamp(length(q), 0.0, 1.0));
    color = mix(color, vec3(1.0), clamp(abs(r.x), 0.0, 1.0));

    float alpha = clamp((f * f * f + 0.6 * f * f + 0.5 * f), 0.0, 1.0);
    gl_FragColor = vec4(color, alpha);
}
