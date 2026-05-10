import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

/**
 * CONCEPT 5: SCENE HIERARCHY (GROUPING)
 * Goal: Parent-Child relationships and Local vs World space.
 */

const canvas = document.querySelector('#three-canvas');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 5, 10);

const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);

// 1. Create a Parent Group
const solarSystem = new THREE.Group();
scene.add(solarSystem);

// 2. Add Earth to the Solar System
const earth = new THREE.Mesh(new THREE.SphereGeometry(1), new THREE.MeshStandardMaterial({ color: 'blue' }));
solarSystem.add(earth);

// 3. Add Moon as a CHILD of Earth
const moon = new THREE.Mesh(new THREE.SphereGeometry(0.3), new THREE.MeshStandardMaterial({ color: 'gray' }));
moon.position.x = 3; // 3 units away from Earth
earth.add(moon); // Moon follows Earth!

scene.add(new THREE.AmbientLight(0xffffff, 1));
const controls = new OrbitControls(camera, canvas);

function animate() {
    requestAnimationFrame(animate);

    // Rotate Earth (Moon rotates with it because it's a child)
    earth.rotation.y += 0.01;

    // Rotate the whole system
    solarSystem.rotation.y += 0.005;

    controls.update();
    renderer.render(scene, camera);
}
animate();
