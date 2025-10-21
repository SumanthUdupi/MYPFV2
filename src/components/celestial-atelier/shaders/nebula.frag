
// nebula.frag

varying vec2 vUv;
uniform float uTime;
uniform vec2 uResolution;
uniform vec2 uMouse;
uniform bool uReduceMotion;
uniform bool uIsMobile;

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
    float frequency = 0.0;

    for (int i = 0; i < 6; i++) {
        value += amplitude * noise(st);
        st *= 2.0;
        amplitude *= 0.5;
    }
    return value;
}

// Art Nouveau curve distortion
vec2 artNouveauWarp(vec2 uv, float time) {
    vec2 warpedUv = uv;

    // Whiplash curve distortion
    float sinWarp = sin(uv.y * 4.0 + time * 0.5) * 0.1;
    float cosWarp = cos(uv.x * 3.0 + time * 0.3) * 0.1;
    warpedUv.x += sinWarp;
    warpedUv.y += cosWarp;

    // Rotational element for swirling
    float angle = time * 0.1;
    mat2 rotationMatrix = mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
    warpedUv = rotationMatrix * (warpedUv - 0.5) + 0.5;

    return warpedUv;
}

void main() {
    vec2 st = gl_FragCoord.xy / uResolution.xy;
    st.x *= uResolution.x / uResolution.y; // Aspect ratio correction

    // Colors from the palette
    vec3 colorVoid = vec3(0.039, 0.055, 0.153); // #0a0e27
    vec3 colorEmerald = vec3(0.176, 0.831, 0.753); // #2dd4bf
    vec3 colorGold = vec3(0.984, 0.749, 0.141); // #fbbf24

    float finalNoise = 0.0;
    float time = uReduceMotion ? 0.0 : uTime;
    int layerCount = uIsMobile ? 3 : 5;

    // Create nebula layers
    for(int i = 1; i <= 5; i++) {
        if (i > layerCount) break;
        float fi = float(i);
        vec2 warpedUv = artNouveauWarp(st * (1.0 + fi * 0.2), time * (0.1 + fi * 0.05));

        // Mouse interaction for breathing effect
        if (!uReduceMotion) {
            float mouseDist = distance(st, vec2(uMouse.x * 0.5 + 0.5, uMouse.y * 0.5 + 0.5));
            warpedUv += (uMouse / 2.0) * pow(1.0 - smoothstep(0.0, 0.2, mouseDist), 2.0) * 0.2;
        }

        finalNoise += fbm(warpedUv) * (1.0 / fi);
    }

    finalNoise = smoothstep(0.4, 0.6, finalNoise);

    // Color mapping
    vec3 mixedColor = mix(colorEmerald, colorGold, sin(st.x * 5.0 + uTime) * 0.5 + 0.5);
    vec3 finalColor = mix(colorVoid, mixedColor, finalNoise);

    gl_FragColor = vec4(finalColor, finalNoise);
}
