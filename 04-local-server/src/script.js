import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

// Scene
const scene = new THREE.Scene()

//cursor
const cursor = {
    x:0, y:0
}

const canvas = document.querySelector('canvas.webgl')

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
    width: window.innerWidth,
    height: window.innerHeight
}


//resize handler
window.addEventListener('resize',()=>{
    sizes.width= window.innerWidth,
    sizes.height= window.innerHeight
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()
    renderer.setSize(sizes.width, sizes.height)
})

// Camera
const camera = new THREE.PerspectiveCamera(100, sizes.width / sizes.height)
camera.position.z = 3
// camera.position.x = 2
// camera.position.y = 2
camera.lookAt(group.position)
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
// controls.target.y = 1
// controls.update()


// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

//pixel ratio
renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))

//fullscreen
window.addEventListener('dblclick', () =>
{   
    const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement
    //wont work on safari lol
    // if(!document.fullscreenElement){
    //     canvas.requestFullscreen()
    // }else{
    //     document.exitFullscreen()
    // }

    if(!fullscreenElement){
        if(canvas.requestFullscreen){
            canvas.requestFullscreen()
        }else if(canvas.webkitRequestFullscreen){
            canvas.webkitRequestFullscreen()
        }
    }else{
        if(document.exitFullscreen){
            document.exitFullscreen()
        }else if(document.webkitExitFullscreen){
            document.webkitExitFullscreen()
        }
    }
})

const clock = new THREE.Clock()

//Animations
const tick = () => {
    const elapsedTime = clock.getElapsedTime()
    controls.update()
    

    //render
    renderer.render(scene, camera)

    window.requestAnimationFrame(tick)
}
tick()