
// stardust.vert
uniform float uTime;
uniform vec2 uMouse;
attribute float size;
attribute float type;
varying float vType;
varying vec3 vColor;

void main() {
    vType = type;
    vColor = color;
    vec3 pos = position;

    // Stardust Repulsion
    float dist = distance(pos.xy, uMouse * 15.0); // Adjust multiplier to match scene scale
    float repulsionRadius = 3.0;
    float repulsionStrength = 2.0;

    if (dist < repulsionRadius) {
        vec2 direction = normalize(pos.xy - uMouse * 15.0);
        float force = (1.0 - dist / repulsionRadius) * repulsionStrength;
        pos.xy += direction * force;
    }

    // Gentle drift for all particles
    pos.y += sin(uTime * 0.1 + position.x * 10.0) * 0.1;
    pos.x += cos(uTime * 0.1 + position.y * 10.0) * 0.1;

    // Hero ornamental stars have a more pronounced movement
    if (type > 1.5) {
        pos.z += cos(uTime * 0.3 + position.x * 5.0) * 0.3;
    }

    vec4 modelViewPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * modelViewPosition;
    gl_PointSize = size * (300.0 / -modelViewPosition.z);
}
