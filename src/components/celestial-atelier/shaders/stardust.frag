
// stardust.frag
varying float vType;
varying vec3 vColor;

void main() {
    float strength = distance(gl_PointCoord, vec2(0.5));
    float alpha = 1.0;
    vec3 finalColor = vColor;

    if (vType < 0.5) { // Cosmic Dust
        alpha = smoothstep(0.5, 0.1, strength) * 0.5;
    } else if (vType < 1.5) { // Jeweled Stars
        alpha = smoothstep(0.5, 0.2, strength) * 0.8;
        finalColor *= 1.5; // Make them brighter
    } else { // Hero Ornamental Stars
        // Four-pointed star with curved rays
        float star = 1.0 - smoothstep(0.4, 0.5, strength);
        float rays = sin(atan(gl_PointCoord.y - 0.5, gl_PointCoord.x - 0.5) * 4.0) * 0.5 + 0.5;
        star *= rays;
        alpha = star;
        finalColor *= 2.0; // Make them the brightest
    }

    gl_FragColor = vec4(finalColor, alpha);
}
