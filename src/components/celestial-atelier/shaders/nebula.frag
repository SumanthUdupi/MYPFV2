varying vec2 vUv;
uniform float uTime;
uniform vec2 uResolution;
uniform vec2 uMouse;
uniform bool uReduceMotion;
uniform bool uIsMobile;

float rand(vec2 n) {
    return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
}

float smoothnoise(vec2 p) {
    vec2 ip = floor(p);
    vec2 u = fract(p);
    u = u * u * (3.0 - 2.0 * u);

    float n00 = rand(ip);
    float n10 = rand(ip + vec2(1.0, 0.0));
    float n01 = rand(ip + vec2(0.0, 1.0));
    float n11 = rand(ip + vec2(1.0, 1.0));

    float nx0 = mix(n00, n10, u.x);
    float nx1 = mix(n01, n11, u.x);
    return mix(nx0, nx1, u.y);
}

float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 1.0;
    float frequency = 1.0;

    for (int i = 0; i < 6; i++) {
        value += amplitude * smoothnoise(p * frequency);
        amplitude *= 0.5;
        frequency *= 2.0;
    }
    return value;
}

void main() {
    vec2 uv = vUv;
    vec2 center = uv - 0.5;
    float time = uReduceMotion ? 0.0 : uTime * 0.05;

    vec3 void_color = vec3(0.04, 0.06, 0.15);
    vec3 sapphire = vec3(0.12, 0.25, 0.68);
    vec3 amethyst = vec3(0.58, 0.20, 0.92);
    vec3 emerald = vec3(0.18, 0.83, 0.75);
    vec3 gold = vec3(0.98, 0.75, 0.14);

    vec2 flowUv = uv * 2.5;
    flowUv += vec2(time * 0.3, time * 0.2);

    float n1 = fbm(flowUv);
    float n2 = fbm(flowUv + 100.0);
    float n3 = fbm(flowUv - 50.0);

    float noise = mix(n1, n2, sin(time) * 0.5 + 0.5);
    noise = mix(noise, n3, cos(time * 0.7) * 0.5 + 0.5);

    float dist = length(center);
    float vignette = exp(-dist * dist * 2.0);

    float density = noise * noise * vignette;

    if (!uReduceMotion) {
        vec2 mouse = vec2(uMouse.x * 0.5 + 0.5, uMouse.y * 0.5 + 0.5);
        float mouse_dist = distance(uv, mouse);
        float mouse_pull = exp(-mouse_dist * mouse_dist * 4.0) * 0.4;
        density += mouse_pull * smoothnoise(uv * 10.0 + time);
    }

    density = smoothstep(0.15, 0.85, density);

    float color_time = uv.x * 1.5 + time * 0.5;
    vec3 color;

    if (color_time < 0.25) {
        color = mix(void_color, sapphire, color_time * 4.0);
    } else if (color_time < 0.5) {
        color = mix(sapphire, amethyst, (color_time - 0.25) * 4.0);
    } else if (color_time < 0.75) {
        color = mix(amethyst, emerald, (color_time - 0.5) * 4.0);
    } else {
        color = mix(emerald, gold, (color_time - 0.75) * 4.0);
    }

    float shimmer = sin(uv.x * 6.0 + time) * cos(uv.y * 4.0 - time * 0.7) * 0.15 + 0.85;
    color *= shimmer;

    vec3 final_color = mix(void_color, color, density);
    float breathing = 1.0 + sin(time * 0.8) * 0.1;
    float alpha = density * 0.8 * breathing;

    gl_FragColor = vec4(final_color, alpha);
}