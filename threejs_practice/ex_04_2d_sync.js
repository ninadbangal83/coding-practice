import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

/**
 * CONCEPT 8: 2D-3D SYNC (HTML OVERLAYS)
 * Goal: Make a standard HTML <div> follow a 3D object.
 */

const canvas = document.querySelector('#three-canvas');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(2, 2, 5);

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);

// 1. Create a 3D Object
const cube = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshStandardMaterial({ color: 0x4f46e5 }));
scene.add(cube);

// 2. Select the HTML Label (We will add this to index.html)
const label = document.querySelector('#floating-label');

// Lights
scene.add(new THREE.AmbientLight(0xffffff, 1));
const controls = new OrbitControls(camera, canvas);

function animate() {
    requestAnimationFrame(animate);
    
    // Rotate the cube
    cube.rotation.y += 0.01;
    cube.position.x = Math.sin(Date.now() * 0.001) * 2;

    // --- 3D to 2D SYNC LOGIC ---
    
    // 1. Get the 3D position of the cube
    const vector = new THREE.Vector3();
    cube.getWorldPosition(vector);
    
    // 2. Project the 3D position to the 2D screen (results in NDC -1 to +1)
    vector.project(camera);
    
    // 3. Convert NDC to actual screen pixels
    const x = (vector.x * 0.5 + 0.5) * window.innerWidth;
    const y = (-vector.y * 0.5 + 0.5) * window.innerHeight;
    
    // 4. Update the HTML label position
    if (label) {
        label.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px)`;
        
        // Hide label if it's behind the camera
        label.style.display = vector.z > 1 ? 'none' : 'block';
    }

    controls.update();
    renderer.render(scene, camera);
}

animate();
