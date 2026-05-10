import * as THREE from 'three';

/**
 * CONCEPT 3: CUSTOM SHADERS (GLSL)
 * Goal: Run code directly on the GPU for special effects.
 */

const canvas = document.querySelector('#three-canvas');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 3;

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);

// 1. Define the ShaderMaterial
const shaderMaterial = new THREE.ShaderMaterial({
    uniforms: {
        uTime: { value: 0 }
    },
    // Vertex Shader: Changes the SHAPE (math per vertex)
    vertexShader: `
        varying vec2 vUv;
        uniform float uTime;
        void main() {
            vUv = uv;
            vec3 pos = position;
            pos.z += sin(pos.x * 10.0 + uTime) * 0.1; // Wave effect
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
    `,
    // Fragment Shader: Changes the COLOR (math per pixel)
    fragmentShader: `
        varying vec2 vUv;
        uniform float uTime;
        void main() {
            float color = 0.5 + 0.5 * sin(uTime + vUv.x * 10.0);
            gl_FragColor = vec4(vUv.x, color, 1.0, 1.0);
        }
    `
});

const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2, 32, 32), shaderMaterial);
scene.add(mesh);

function animate() {
    requestAnimationFrame(animate);
    // Update the time uniform so the shader moves
    shaderMaterial.uniforms.uTime.value += 0.05;
    renderer.render(scene, camera);
}
animate();
