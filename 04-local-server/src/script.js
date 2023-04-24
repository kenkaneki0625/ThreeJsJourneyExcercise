import * as THREE from 'three'
import gsap from 'gsap';

// Scene
const scene = new THREE.Scene()

//cursor
const cursor = {
    x:0, y:0
}

window.addEventListener('mousemove', (event) =>{
    cursor.x = event.clientX / sizes.width - 0.5
    cursor.y = -(event.clientY / sizes.height - 0.5)
})

const group = new THREE.Group()
scene.add(group)

const cube1 = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1,5,5,5),
    new THREE.MeshBasicMaterial({color: 'red'})
)
group.add(cube1)


//Axes helper
const axesHelper = new THREE.AxesHelper(2)

scene.add(axesHelper)


// Sizes
const sizes = {
    width: 800,
    height: 600
}

// Camera
const camera = new THREE.PerspectiveCamera(100, sizes.width / sizes.height)
camera.position.z = 2
// camera.position.x = 2
// camera.position.y = 2
camera.lookAt(group.position)
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('canvas.webgl')
})
renderer.setSize(sizes.width, sizes.height)

const clock = new THREE.Clock()

//Animations
const tick = () => {
    const elapsedTime = clock.getElapsedTime()
    
    // group.rotation.y = elapsedTime

        // camera.position.x = cursor.x * 3
        // camera.position.y = cursor.y * 3
        // camera.lookAt(new THREE.Vector3())

        camera.position.x = Math.sin(cursor.x * Math.PI * 2) *3
        camera.position.z = Math.cos(cursor.x * Math.PI * 2) *3
        camera.position.y = cursor.y * 3


        camera.lookAt(group.position)

    //render
    renderer.render(scene, camera)

    window.requestAnimationFrame(tick)
}
tick()