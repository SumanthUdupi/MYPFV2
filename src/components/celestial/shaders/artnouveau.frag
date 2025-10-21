
// Art Nouveau Nebula Fragment Shader

#ifdef GL_ES
precision mediump float;
#endif

varying vec2 vUv;

uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform vec2 u_ripple_position;
uniform float u_ripple_time;
uniform vec3 u_color1;
uniform vec3 u_color2;
uniform vec3 u_color3;

// 2D Random function
float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

// 2D Noise function
float noise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));

    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.y * u.x;
}

// Fractal Brownian Motion
float fbm(vec2 st) {
    float value = 0.0;
    float amplitude = 0.5;
    for (int i = 0; i < 4; i++) { // Reduced from 6 to 4 octaves
        value += amplitude * noise(st);
        st *= 2.0;
        amplitude *= 0.5;
    }
    return value;
}

void main() {
    vec2 st = vUv;
    st.x *= u_resolution.x / u_resolution.y;

    // Animate the nebula
    float time = u_time * 0.05;

    // Warp the coordinates
    vec2 q = vec2(fbm(st + time * 0.1), fbm(st + vec2(1.0)));
    vec2 r = vec2(fbm(st + q + time * 0.2), fbm(st + q + vec2(1.0)));

    // Use the warped coordinates to create the nebula
    float nebula = fbm(st + r);

    // Ripple effect
    float ripple_dist = distance(st, u_ripple_position / u_resolution);
    float ripple = sin(ripple_dist * 20.0 - u_ripple_time * 5.0) * 0.1;
    ripple = max(0.0, ripple);
    nebula += ripple;

    // Color mapping
    vec3 color = mix(u_color1, u_color2, smoothstep(0.3, 0.5, nebula));
    color = mix(color, u_color3, smoothstep(0.4, 0.6, fbm(st + q)));
    color = mix(color, u_color1, smoothstep(0.6, 0.8, nebula));

    // Add a subtle glow
    float glow = smoothstep(0.4, 0.5, nebula);
    color += glow * 0.1;

    // Final color with alpha
    gl_FragColor = vec4(color, smoothstep(0.2, 0.7, nebula));
}
