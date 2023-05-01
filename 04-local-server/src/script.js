import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import gsap from 'gsap'
import * as dat from 'dat.gui'


// TEXTURES
// const image = new Image()
// const texture = new THREE.Texture(image)
// image.onload=()=>{
//     texture.needsUpdate = true
// }
// image.src = '/textures/door/color.jpg'
const loadingManager = new THREE.LoadingManager()
const textureLoader = new THREE.TextureLoader()
const colorTexture = textureLoader.load('/textures/door/color.jpg')
// const alphaTexture = textureLoader.load('/textures/door/alpha.jpg')
// const heightTexture = textureLoader.load('/textures/door/height.jpg')
// const normalTexture = textureLoader.load('/textures/door/normal.jpg')
// const ambientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg')
// const metalnessTexture = textureLoader.load('/textures/door/metalness.jpg')
// const roughnessTexture = textureLoader.load('/textures/door/roughness.jpg')

// colorTexture.repeat.x=2
// colorTexture.repeat.y=3
// colorTexture.wrapS = THREE.MirroredRepeatWrapping
// colorTexture.wrapT = THREE.RepeatWrapping
// colorTexture.offset.x= 0.5
// colorTexture.rotation = 1

colorTexture.rotation = Math.PI/4
colorTexture.center.x=0.5
colorTexture.center.y=0.5

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

//debug
const gui = new dat.GUI()
const parameters = {
    color: 0xff0000,
    spin: () =>{
        gsap.to(group.rotation, 
            {duration:1,
        y:group.rotation.y + Math.PI *2})
    }
}


// Scene
const scene = new THREE.Scene()

const group = new THREE.Group()
scene.add(group)

gui.add(group.position, 'y', -3, 3, 0.01)
gui.add(group.position, 'x').min(-3).max(3).step(0.01).name("red cube x")
gui.add(group, 'visible')



const cube1 = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1,5,5,5),
    new THREE.MeshBasicMaterial({map : colorTexture})
)
group.add(cube1)



gui.add(cube1.material, 'wireframe')
gui.addColor(parameters, "color").onChange(()=>{
    cube1.material.color.set(parameters.color)
})
gui.add(parameters, 'spin')


/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 3
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}
tick()