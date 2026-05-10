import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

/**
 * 🧱 THE BOILERPLATE SETUP
 * This is the minimum code you need to start any Three.js project.
 * Memorize this structure for your interview!
 */

// 1. CORE SETUP
const canvas = document.querySelector('#three-canvas');
const scene = new THREE.Scene();

// 2. CAMERA
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(2, 2, 5);

// 3. RENDERER
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// 4. ADD AN OBJECT (So the scene isn't empty)
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial({ color: 0x4f46e5 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// 5. LIGHTS
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 50);
pointLight.position.set(2, 3, 4);
scene.add(pointLight);

// 6. CONTROLS
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// 7. ANIMATION LOOP
function animate() {
    requestAnimationFrame(animate);
    
    // Logic updates
    cube.rotation.y += 0.01;
    
    controls.update();
    renderer.render(scene, camera);
}

// 8. RESIZE HANDLING
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

animate();
