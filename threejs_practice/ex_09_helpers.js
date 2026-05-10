import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

/**
 * CONCEPT 9: HELPERS (DEBUGGING)
 * Goal: Use visual aids to see the math of your scene.
 */

const canvas = document.querySelector('#three-canvas');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(5, 5, 5);

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);

// --- 1. AXES HELPER ---
// X = Red, Y = Green, Z = Blue
// Argument is the size of the axes lines.
const axesHelper = new THREE.AxesHelper(3);
scene.add(axesHelper);

// --- 2. GRID HELPER ---
// Arguments: (size, divisions)
const gridHelper = new THREE.GridHelper(10, 10);
scene.add(gridHelper);

// 3. Create an object to help
const cube = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1), 
    new THREE.MeshStandardMaterial({ color: 'orange' })
);
cube.position.y = 0.5; // Sit on the grid
scene.add(cube);

// --- 4. BOX HELPER ---
// Shows the bounding box of an object.
const boxHelper = new THREE.BoxHelper(cube, 0xffff00);
scene.add(boxHelper);

// --- 5. LIGHT HELPERS ---
const pointLight = new THREE.PointLight(0xffffff, 50);
pointLight.position.set(2, 3, 2);
scene.add(pointLight);

const pointLightHelper = new THREE.PointLightHelper(pointLight, 0.5);
scene.add(pointLightHelper);

scene.add(new THREE.AmbientLight(0xffffff, 0.5));
const controls = new OrbitControls(camera, canvas);

function animate() {
    requestAnimationFrame(animate);
    
    // Animate the cube and the box helper will follow!
    cube.rotation.y += 0.01;
    boxHelper.update(); 

    controls.update();
    renderer.render(scene, camera);
}

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

animate();
