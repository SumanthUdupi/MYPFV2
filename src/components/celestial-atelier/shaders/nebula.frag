varying vec2 vUv;
uniform float uTime;
uniform vec2 uResolution;
uniform vec2 uMouse;
uniform bool uReduceMotion;
uniform bool uIsMobile;

float randomfn(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

float smoothNoise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);
    f = f * f * (3.0 - 2.0 * f);

    float a = randomfn(i);
    float b = randomfn(i + vec2(1.0, 0.0));
    float c = randomfn(i + vec2(0.0, 1.0));
    float d = randomfn(i + vec2(1.0, 1.0));

    float u = mix(a, b, f.x);
    float v = mix(c, d, f.x);
    return mix(u, v, f.y);
}

float fbmSmooth(vec2 st) {
    float value = 0.0;
    float amplitude = 0.5;
    float frequency = 1.0;
    float maxValue = 0.0;

    for (int i = 0; i < 8; i++) {
        value += amplitude * smoothNoise(st * frequency);
        maxValue += amplitude;
        amplitude *= 0.5;
        frequency *= 2.0;
    }
    return value / maxValue;
}

float turbulence(vec2 st, float time) {
    float value = 0.0;
    float amplitude = 1.0;
    float frequency = 0.5;

    for (int i = 0; i < 6; i++) {
        value += amplitude * abs(smoothNoise(st * frequency + time * 0.1));
        amplitude *= 0.5;
        frequency *= 2.0;
    }
    return value;
}

vec3 nebulaPalette(float t) {
    vec3 a = vec3(0.118, 0.251, 0.686);
    vec3 b = vec3(0.576, 0.200, 0.918);
    vec3 c = vec3(0.176, 0.831, 0.753);
    vec3 d = vec3(0.984, 0.749, 0.141);
    
    if (t < 0.33) {
        return mix(a, b, t * 3.0);
    } else if (t < 0.66) {
        return mix(b, c, (t - 0.33) * 3.0);
    } else {
        return mix(c, d, (t - 0.66) * 3.0);
    }
}

void main() {
    vec2 uv = vUv;
    vec2 centerUv = uv - 0.5;
    float time = uReduceMotion ? 0.0 : uTime * 0.1;

    vec3 colorVoid = vec3(0.039, 0.055, 0.153);
    
    float noiseVal = fbmSmooth(uv * 3.0 + time);
    float turbVal = turbulence(uv * 2.5, time);
    
    float distFromCenter = length(centerUv);
    float vignette = 1.0 - distFromCenter * distFromCenter * 0.8;
    
    float density = noiseVal * turbVal * vignette;
    
    float mouseDist = distance(uv, vec2(uMouse.x * 0.5 + 0.5, uMouse.y * 0.5 + 0.5));
    float mouseEffect = exp(-mouseDist * mouseDist * 3.0) * 0.3;
    density += mouseEffect;
    
    density = smoothstep(0.2, 0.8, density);
    
    float hueShift = sin(uv.x * 2.0 + time) * 0.5 + 0.5;
    hueShift += sin(uv.y * 1.5 - time * 0.7) * 0.3;
    hueShift = fract(hueShift);
    
    vec3 nebulaColor = nebulaPalette(hueShift);
    
    vec3 finalColor = mix(colorVoid, nebulaColor, density);
    
    float breathing = 1.0 + sin(time * 1.5) * 0.15;
    float alpha = density * 0.85 * breathing;
    
    gl_FragColor = vec4(finalColor, alpha);
}