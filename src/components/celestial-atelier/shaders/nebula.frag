varying vec2 vUv;
uniform float uTime;
uniform vec2 uResolution;
uniform vec2 uMouse;
uniform bool uReduceMotion;
uniform bool uIsMobile;

float randomfn(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

float noisefn(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    float a = randomfn(i);
    float b = randomfn(i + vec2(1.0, 0.0));
    float c = randomfn(i + vec2(0.0, 1.0));
    float d = randomfn(i + vec2(1.0, 1.0));

    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.y * u.x;
}

float fbmfn(vec2 st) {
    float value = 0.0;
    float amplitude = 0.5;
    float maxAmplitude = 0.0;

    for (int i = 0; i < 7; i++) {
        value += amplitude * noisefn(st);
        maxAmplitude += amplitude;
        st *= 2.0;
        amplitude *= 0.5;
    }
    return value / maxAmplitude;
}

float worleyfn(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    float minDist = 1.0;
    for (int x = -1; x <= 1; x++) {
        for (int y = -1; y <= 1; y++) {
            vec2 neighbor = vec2(float(x), float(y));
            vec2 point = randomfn(i + neighbor) * 0.5 + neighbor;
            float dist = distance(f, point);
            minDist = min(minDist, dist);
        }
    }
    return minDist;
}

vec2 artNouveauWarp(vec2 uv, float time) {
    vec2 warpedUv = uv;

    float sinWarp = sin(uv.y * 3.5 + time * 0.3) * 0.12;
    float cosWarp = cos(uv.x * 3.0 + time * 0.4) * 0.12;
    warpedUv.x += sinWarp;
    warpedUv.y += cosWarp;

    float spiralAngle = atan(uv.y - 0.5, uv.x - 0.5);
    float spiralDist = length(uv - 0.5);
    spiralAngle += time * 0.15 + spiralDist * 2.0;
    warpedUv += vec2(cos(spiralAngle) * 0.08, sin(spiralAngle) * 0.08) * spiralDist;

    float angle = time * 0.08;
    mat2 rotationMatrix = mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
    warpedUv = rotationMatrix * (warpedUv - 0.5) + 0.5;

    return warpedUv;
}

void main() {
    vec2 st = gl_FragCoord.xy / uResolution.xy;
    vec2 centerUv = st - 0.5;
    st.x *= uResolution.x / uResolution.y;

    vec3 colorVoid = vec3(0.039, 0.055, 0.153);
    vec3 colorEmerald = vec3(0.176, 0.831, 0.753);
    vec3 colorGold = vec3(0.984, 0.749, 0.141);
    vec3 colorAmethyst = vec3(0.576, 0.200, 0.918);
    vec3 colorSapphire = vec3(0.118, 0.251, 0.686);

    float finalNoise = 0.0;
    float time = uReduceMotion ? 0.0 : uTime;
    int layerCount = uIsMobile ? 3 : 7;

    for(int i = 1; i <= 7; i++) {
        if (i > layerCount) break;
        float fi = float(i);
        
        float layerAngle = time * (0.08 + fi * 0.03) + fi * 0.8;
        mat2 layerRotation = mat2(cos(layerAngle), -sin(layerAngle), sin(layerAngle), cos(layerAngle));
        vec2 rotatedUv = layerRotation * centerUv + 0.5;
        
        vec2 warpedUv = artNouveauWarp(rotatedUv, time * (0.1 + fi * 0.05));

        float layerNoise = fbmfn(warpedUv * (1.0 + fi * 0.3));
        layerNoise += worleyfn(warpedUv * (2.0 + fi * 0.5)) * 0.3;

        if (!uReduceMotion) {
            vec2 mouseSt = vec2(uMouse.x * 0.5 + 0.5, uMouse.y * 0.5 + 0.5);
            float mouseDist = distance(st, mouseSt);
            float mouseInfluence = pow(1.0 - smoothstep(0.0, 0.3, mouseDist), 2.0);
            warpedUv += (uMouse / 3.0) * mouseInfluence * 0.15 * (1.0 + sin(time * 2.0) * 0.5);
        }

        float layerAlpha = 1.0 / (fi * 0.8 + 0.4);
        finalNoise += layerNoise * layerAlpha;
    }

    finalNoise = smoothstep(0.35, 0.65, finalNoise);

    float hueShift = sin(st.x * 3.0 + time * 0.15) * 0.5 + 0.5;
    hueShift += sin(st.y * 2.5 - time * 0.1) * 0.3;
    hueShift = fract(hueShift);

    vec3 color1 = mix(colorEmerald, colorGold, hueShift);
    vec3 color2 = mix(colorGold, colorAmethyst, sin(hueShift * 3.14159 + time * 0.2) * 0.5 + 0.5);
    vec3 color3 = mix(colorSapphire, colorEmerald, cos(hueShift * 3.14159 - time * 0.15) * 0.5 + 0.5);

    vec3 mixedColor = mix(color1, color2, sin(st.y * 2.0 + time * 0.1) * 0.5 + 0.5);
    mixedColor = mix(mixedColor, color3, finalNoise * 0.5);

    float shimmer = sin(st.x * 8.0 + time * 0.5) * cos(st.y * 6.0 - time * 0.3) * 0.3 + 0.3;
    mixedColor += vec3(shimmer * 0.2);

    float edgeDistance = length(centerUv);
    float edgeGlow = pow(1.0 - smoothstep(0.0, 1.0, edgeDistance), 2.0) * 0.4;
    mixedColor += colorGold * edgeGlow * (1.0 + sin(time * 0.5) * 0.3);

    vec3 finalColor = mix(colorVoid, mixedColor, finalNoise);
    float alpha = finalNoise * (0.8 + edgeGlow * 0.4);

    if (!uReduceMotion) {
        float breathing = 1.0 + sin(time * 0.5) * 0.08;
        alpha *= breathing;
    }

    gl_FragColor = vec4(finalColor, alpha);
}