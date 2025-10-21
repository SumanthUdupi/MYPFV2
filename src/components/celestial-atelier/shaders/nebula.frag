
// nebula.frag
uniform float uTime;
uniform vec2 uResolution;
uniform vec2 uMouse;
uniform bool uReduceMotion;

varying vec2 vUv;

// Art Nouveau color palette
const vec3 COLOR_VOID = vec3(0.039, 0.055, 0.153);
const vec3 COLOR_EMERALD = vec3(0.176, 0.831, 0.749);
const vec3 COLOR_GOLD = vec3(0.984, 0.745, 0.369);
const vec3 COLOR_SAPPHIRE = vec3(0.118, 0.251, 0.675);
const vec3 COLOR_AMETHYST = vec3(0.576, 0.200, 0.918);

// 2D Rotation
mat2 rotate2d(float angle){
    return mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
}

// Noise function from https://www.shadertoy.com/view/MsfGzM
float noise(vec2 p) {
	return fract(sin(dot(p.xy ,vec2(12.9898,78.233))) * 43758.5453);
}

// FBM implementation from https://www.shadertoy.com/view/MsfGzM
float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    for (int i = 0; i < 6; i++) {
        value += amplitude * noise(p);
        p *= 2.0;
        amplitude *= 0.5;
    }
    return value;
}

// Whiplash curve function
float whiplash(vec2 p, float freq, float amplitude) {
    float s = sin(p.x * freq) * amplitude;
    return smoothstep(-0.1, 0.1, s - p.y);
}

void main() {
    vec2 uv = (vUv - 0.5) * (uResolution.xy / uResolution.y);

    // Time for ambient animation
    float time = uReduceMotion ? 0.0 : uTime * 0.05;

    // Nebula layers
    vec3 nebula = vec3(0.0);
    for(int i = 1; i <= 5; i++) {
        float fi = float(i);
        vec2 layerUv = uv;
        layerUv = rotate2d(time * 0.1 * fi) * layerUv;
        layerUv *= (1.0 + fi * 0.2);

        float f = fbm(layerUv * 2.0);
        f *= whiplash(layerUv, 3.0 + fi * 0.5, 0.2 + fi * 0.05);
        // Softer edges for the nebula clouds
        f = smoothstep(0.3, 0.7, f);

        // Color mixing
        vec3 color1 = mix(COLOR_EMERALD, COLOR_GOLD, sin(time * 0.2 + fi) * 0.5 + 0.5);
        vec3 color2 = mix(COLOR_SAPPHIRE, COLOR_AMETHYST, cos(time * 0.3 - fi) * 0.5 + 0.5);

        // Increased brightness and contribution of each layer
        nebula += mix(color1, color2, f) * f * (1.0 / 5.0) * (0.4 + fi * 0.2);
    }

    // Add mouse interaction
    if (!uReduceMotion) {
        vec2 mouseUv = (uMouse - 0.5) * (uResolution.xy / uResolution.y);
        float mouseDist = length(uv - mouseUv);
        float mouseEffect = smoothstep(0.2, 0.0, mouseDist);
        // Use an Art Nouveau color for the mouse light
        nebula += mix(COLOR_GOLD, COLOR_EMERALD, 0.5) * mouseEffect * 0.8;
    }

    // Vignette
    float vignette = 1.0 - length(vUv - 0.5) * 1.2;
    nebula *= vignette;

    // Final color with a boost and volumetric alpha
    gl_FragColor = vec4(nebula * 1.5, smoothstep(0.1, 0.7, length(nebula)));
}
