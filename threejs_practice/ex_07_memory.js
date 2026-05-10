import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

/**
 * CONCEPT 6: MEMORY MANAGEMENT (DISPOSE)
 * Goal: Safely removing objects to prevent memory leaks.
 */

const canvas = document.querySelector('#three-canvas');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);

let currentCube = null;

function createCube() {
    // If a cube already exists, we MUST dispose of it before creating a new one
    if (currentCube) {
        scene.remove(currentCube);
        currentCube.geometry.dispose();
        currentCube.material.dispose();
        console.log("Old Memory Cleared!");
    }

    const geometry = new THREE.BoxGeometry(2, 2, 2);
    const material = new THREE.MeshStandardMaterial({ color: Math.random() * 0xffffff });
    currentCube = new THREE.Mesh(geometry, material);
    scene.add(currentCube);
    console.log("New Cube Created");
}

// Button to trigger creation/deletion
const btn = document.getElementById('memory-btn');
if (btn) {
    btn.style.display = 'block'; // Show it only for this example
    btn.onclick = createCube;
}

createCube(); // Create the first one

scene.add(new THREE.AmbientLight(0xffffff, 1));
function animate() {
    requestAnimationFrame(animate);
    if(currentCube) currentCube.rotation.y += 0.01;
    renderer.render(scene, camera);
}
animate();
