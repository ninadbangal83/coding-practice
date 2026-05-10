import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

/**
 * CONCEPT 1: INTERACTION & RAYCASTING
 * Goal: Click and Hover detection.
 */

const canvas = document.querySelector('#three-canvas');
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x222222);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);

// 1. Create multiple cubes
const geometry = new THREE.BoxGeometry(1, 1, 1);
const cubes = [];
for(let i = 0; i < 3; i++) {
    const cube = new THREE.Mesh(geometry, new THREE.MeshStandardMaterial({ color: 0x4f46e5 }));
    cube.position.x = (i - 1) * 2;
    scene.add(cube);
    cubes.push(cube);
}

// 2. Setup Raycaster
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

// 3. Mouse Move Listener (For Hover)
window.addEventListener('mousemove', (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
});

// 4. Click Listener (For Selection)
window.addEventListener('click', () => {
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(cubes);

    if (intersects.length > 0) {
        // Change the color of the clicked object
        intersects[0].object.material.color.set(Math.random() * 0xffffff);
    }
});

scene.add(new THREE.AmbientLight(0xffffff, 0.8));
const controls = new OrbitControls(camera, canvas);

function animate() {
    requestAnimationFrame(animate);

    // HOVER LOGIC: Highlight objects on hover
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(cubes);

    // Reset all
    cubes.forEach(c => c.scale.set(1, 1, 1));
    
    // Highlight the one we are touching
    if (intersects.length > 0) {
        intersects[0].object.scale.set(1.2, 1.2, 1.2);
        canvas.style.cursor = 'pointer';
    } else {
        canvas.style.cursor = 'default';
    }

    controls.update();
    renderer.render(scene, camera);
}

animate();
