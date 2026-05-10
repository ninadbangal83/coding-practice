import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'


const canvas = document.querySelector('#three-canvas');

const scene = new THREE.Scene();
scene.background = new THREE.Color('lightblue')

const windowW = window.innerWidth
const windowH = window.innerHeight
const camera = new THREE.PerspectiveCamera(75, windowW / windowH, 0.1, 1000)
camera.position.set(2, 2, 5)
camera.lookAt(0, 0, 0)

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true })
renderer.setSize(windowW, windowH)
renderer.setPixelRatio(Math.min(window.devicePixelRatio))

const ambientLight = new THREE.AmbientLight('white')
scene.add(ambientLight);

const pointLight = new THREE.PointLight('white');
pointLight.position.set(5, 5, 5)
scene.add(pointLight)

const pointLightHelper = new THREE.PointLightHelper(pointLight)
scene.add(pointLightHelper)

const gridHelper = new THREE.GridHelper(10, 10)
scene.add(gridHelper)

const axesHelper = new THREE.AxesHelper(3);
scene.add(axesHelper)

const orbitControls = new OrbitControls(camera, canvas)
orbitControls.enableDamping = true;
orbitControls.dampingFactor = 0.1;
orbitControls.minDistance = 2;
orbitControls.maxDistance = 10;
orbitControls.minPolarAngle = Math.PI / 4;
orbitControls.maxPolarAngle = Math.PI / 2;
// orbitControls.enableZoom = false;
// orbitControls.enablePan = false;
// orbitControls.enableRotate = false;

const group = new THREE.Group();
scene.add(group);

const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshStandardMaterial({
    color: 'blue',
    roughness: 0.1,
    metalness: 0.5,

})

const cube = new THREE.Mesh(geometry, material);
cube.position.set(0, 0, 0)
group.add(cube)


const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load('https://threejs.org/examples/textures/crate.gif')

const geometry1 = new THREE.SphereGeometry(1)
const material1 = new THREE.MeshStandardMaterial({
    color: 'white',
    map: texture,
})

const sphere = new THREE.Mesh(geometry1, material1);
sphere.position.set(1, 1, 1)
cube.add(sphere)


const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

window.addEventListener('mousemove', (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
})

window.addEventListener('click', (event) => {
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects([cube, sphere], true);

    if (intersects.length > 0) {
        intersects[0].object.material.color.set(Math.random() * 0xffffff)
    }
})

const label = document.querySelector('#floating-label')

const info = document.createElement('div')
info.style.cssText = 'position:fixed; top:20px; left:20px; color:white; font-family:sans-serif; background:rgba(0,0,0,0.5); padding:10px;';
document.body.appendChild(info)

const animate = () => {
    requestAnimationFrame(animate);
    cube.rotation.y += 0.01;
    // cube.rotation.y -= 0.01;
    group.rotation.x += 0.01

    let objs = [cube, sphere]
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(objs, true)

    objs.forEach(c => c.scale.set(1, 1, 1))

    if (intersects.length > 0) {
        intersects[0].object.scale.set(1.2, 1.2, 1.2);
        canvas.style.cursor = 'pointer'
    } else {
        canvas.style.cursor = 'default'
    }

    const vec = new THREE.Vector3();
    sphere.getWorldPosition(vec);

    vec.project(camera)

    const x = (vec.x * 0.5 + 0.5) * window.innerWidth;
    const y = (vec.y * 0.5 + 0.5) * window.innerHeight;

    if (label) {
        label.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px)`;

        label.style.display = vec.z > 1 ? 'none' : 'block';
    }

    // const time = Date.now() * 0.002;
    // cube.position.x = Math.cos(time) * 3;
    // cube.position.z = Math.sin(time) * 3;


    const distance = sphere.position.distanceTo(cube.position);
    const direction = new THREE.Vector3()
    direction.subVectors(sphere.position, cube.position).normalize();

    info.innerHTML = `
    distance: ${distance.toFixed(2)}<br>
    direction x: ${direction.x.toFixed(2)}<br>
    direction z: ${direction.y.toFixed(2)}
    `

    orbitControls.update()
    renderer.render(scene, camera)
}

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
})

animate()

