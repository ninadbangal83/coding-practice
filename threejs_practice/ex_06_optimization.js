import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

/**
 * CONCEPT 2: OPTIMIZATION (INSTANCED MESH)
 * Goal: Render 1,000 objects in ONE draw call.
 */

const canvas = document.querySelector('#three-canvas');
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x111111);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(10, 10, 10);

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);

// --- 1. INSTANCED MESH (For thousands of moving objects) ---
const geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
const material = new THREE.MeshStandardMaterial({ color: 0x00ff88 });
const count = 1000;
const instancedMesh = new THREE.InstancedMesh(geometry, material, count);
scene.add(instancedMesh);

const matrix = new THREE.Matrix4();
for (let i = 0; i < count; i++) {
    matrix.setPosition((Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10);
    instancedMesh.setMatrixAt(i, matrix);
}

// --- 2. LOD (Level of Detail) ---
// High poly at close range, Low poly at far range.
const lod = new THREE.LOD();

// Level 0: High Poly (High detail)
const highPoly = new THREE.Mesh(new THREE.SphereGeometry(1, 32, 32), new THREE.MeshStandardMaterial({ color: 'red' }));
lod.addLevel(highPoly, 0); // Show at distance 0-5

// Level 1: Medium Poly
const medPoly = new THREE.Mesh(new THREE.SphereGeometry(1, 16, 16), new THREE.MeshStandardMaterial({ color: 'orange' }));
lod.addLevel(medPoly, 5); // Show at distance 5-10

// Level 2: Low Poly (Very simple)
const lowPoly = new THREE.Mesh(new THREE.SphereGeometry(1, 4, 4), new THREE.MeshStandardMaterial({ color: 'yellow' }));
lod.addLevel(lowPoly, 10); // Show at distance 10+

lod.position.set(0, 5, 0);
scene.add(lod);

scene.add(new THREE.AmbientLight(0xffffff, 1));
const controls = new OrbitControls(camera, canvas);

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
animate();
