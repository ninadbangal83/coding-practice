import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

/**
 * CONCEPT 7: TEXTURES & MAPPING
 * Goal: Load images and apply them to 3D objects.
 */

const canvas = document.querySelector('#three-canvas');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(2, 2, 2);

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);

// 1. Setup Texture Loader
const textureLoader = new THREE.TextureLoader();

// 2. Load a texture (Using a placeholder image from the web)
// In a real project, this would be 'assets/wood.jpg' etc.
const texture = textureLoader.load('https://threejs.org/examples/textures/crate.gif');

// 3. Texture Settings (Tiling/Repeating)
// If you want the texture to repeat like a tiled floor:
/*
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
texture.repeat.set(2, 2); // Repeat 2 times on X and Y
*/

// 4. Create Material with Texture
const material = new THREE.MeshStandardMaterial({ 
    map: texture, // This is the main color texture
    roughness: 0.1
});

const cube = new THREE.Mesh(new THREE.BoxGeometry(2, 2, 2), material);
scene.add(cube);

// Lights
scene.add(new THREE.AmbientLight(0xffffff, 1));
const pointLight = new THREE.PointLight(0xffffff, 50);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);

const controls = new OrbitControls(camera, canvas);

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
animate();
