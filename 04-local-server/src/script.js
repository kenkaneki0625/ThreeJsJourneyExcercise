import * as THREE from 'three'

// Scene
const scene = new THREE.Scene()

const group = new THREE.Group()
group.position.y = 1
group.scale.y = .3
group.rotateY(-1)
scene.add(group)

const cube1 = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial({color: 'red'})
)
group.add(cube1)

const cube2 = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial({color: 'blue'})
)
cube2.position.x=2
group.add(cube2)

const cube3 = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial({color: 'green'})
)
cube3.position.y=3
group.add(cube3)


//Axes helper
const axesHelper = new THREE.AxesHelper(2)

scene.add(axesHelper)


// Sizes
const sizes = {
    width: 800,
    height: 600
}

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
camera.position.x = 1
camera.position.y = 1
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('canvas.webgl')
})
renderer.setSize(sizes.width, sizes.height)

//Clock
const clock = new THREE.Clock()

//Animations
const tick = () => {

    //Clock
    const elapsedTime = clock.getElapsedTime()

    //update object
    // group.rotation.y = elapsedTime
    group.rotation.y = Math.sin(elapsedTime)
    group.position.y = Math.cos(elapsedTime)
    camera.position.x = Math.tan(elapsedTime )
    camera.lookAt(cube1.position)

    //render
    renderer.render(scene, camera)

    window.requestAnimationFrame(tick)
}
tick()