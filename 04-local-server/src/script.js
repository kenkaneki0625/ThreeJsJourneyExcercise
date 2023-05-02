import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import gsap from 'gsap'
import * as dat from 'dat.gui'
import { SphereGeometry } from 'three'




const loadingManager = new THREE.LoadingManager()
const textureLoader = new THREE.TextureLoader()
const colorTexture = textureLoader.load('/textures/door/color.jpg')
const alphaTexture = textureLoader.load('/textures/door/alpha.jpg')
const heightTexture = textureLoader.load('/textures/door/height.jpg')
const normalTexture = textureLoader.load('/textures/door/normal.jpg')
const ambientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg')
const metalnessTexture = textureLoader.load('/textures/door/metalness.jpg')
const roughnessTexture = textureLoader.load('/textures/door/roughness.jpg')
const matcapTexture = textureLoader.load('/textures/matcaps/1.png')
const gradientTexture = textureLoader.load('/textures/gradients/3.jpg')

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

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


//objects

const material = new THREE.MeshBasicMaterial()
material.map = colorTexture
// material.color = new THREE.Color(0x00ff00)
// material.opacity=0.5
material.transparent=true
material.alphaMap= alphaTexture



const sphere = new THREE.Mesh(
    new SphereGeometry(0.5,16,16), material
)
sphere.position.x=-1.5
const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(1,1), material
)
const tourus = new THREE.Mesh(
    new THREE.TorusGeometry(.3,.2,16,32),material
)
tourus.position.x=1.5
scene.add(sphere,plane,tourus)

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
    sphere.rotation.y= 0.1*elapsedTime
    plane.rotation.y= 0.1*elapsedTime
    tourus.rotation.y= 0.1*elapsedTime
    sphere.rotation.x= 0.15*elapsedTime
    plane.rotation.x= 0.15*elapsedTime
    tourus.rotation.x= 0.15*elapsedTime

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}
tick()