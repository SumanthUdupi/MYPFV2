uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
varying vec2 vUv;

// 2D Random function
float random (vec2 st) {
    return fract(sin(dot(st.xy,
                         vec2(12.9898,78.233)))*
        43758.5453123);
}

// 2D Noise function
float noise (vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));

    vec2 u = f*f*(3.0-2.0*f);
    return mix(a, b, u.x) +
            (c - a)* u.y * (1.0 - u.x) +
            (d - b) * u.x * u.y;
}

// Fractal Brownian Motion
float fbm (vec2 st) {
    float value = 0.0;
    float amplitude = .5;
    float frequency = 0.;
    for (int i = 0; i < 6; i++) {
        value += amplitude * noise(st);
        st *= 2.;
        amplitude *= .5;
    }
    return value;
}

void main() {
    vec2 st = vUv;
    st.x *= u_resolution.x / u_resolution.y;

    // Add mouse interaction
    float dist = distance(st, vec2(u_mouse.x * (u_resolution.x / u_resolution.y), u_mouse.y));
    st += normalize(st - vec2(u_mouse.x * (u_resolution.x / u_resolution.y), u_mouse.y)) * (1.0 - smoothstep(0.0, 0.5, dist)) * 0.1;

    vec3 color = vec3(0.0);

    vec2 q = vec2(0.);
    q.x = fbm( st + 0.00*u_time );
    q.y = fbm( st + vec2(1.0) );

    vec2 r = vec2(0.);
    r.x = fbm( st + 1.0*q + vec2(1.7,9.2)+ 0.15*u_time );
    r.y = fbm( st + 1.0*q + vec2(8.3,2.8)+ 0.126*u_time);

    float f = fbm(st+r);

    color = mix(vec3(0.768, 0.651, 0.384),
                vec3(0.643, 0.525, 0.259),
                clamp((f*f)*4.0,0.0,1.0));

    color = mix(color,
                vec3(0,0,0),
                clamp(length(q),0.0,1.0));

    color = mix(color,
                vec3(1.0, 1.0, 1.0),
                clamp(length(r.x),0.0,1.0));

    gl_FragColor = vec4((f*f*f+.6*f*f+.5*f)*color,1.);
}
