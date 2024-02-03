const scene = new THREE.Scene();
const camera = new THREE.OrthographicCamera();
const renderer = new THREE.WebGLRenderer();
renderer.setSize(800, 800);
document.body.appendChild(renderer.domElement);
camera.position.z = 5;

const dvdGeometry = new THREE.PlaneGeometry(0.4, 0.3);
const dvdMaterial = new THREE.MeshBasicMaterial({ color: Math.random() * 0xffffff });
const dvd = new THREE.Mesh(dvdGeometry, dvdMaterial);
scene.add(dvd);

dvd.position.set(0, 0, 0);
let velocity = new THREE.Vector2(0.005, 0.005);
let bouncesLeft = 8;

function animate() {
    requestAnimationFrame(animate);

    dvd.position.x += velocity.x;
    dvd.position.y += velocity.y;

    const boxWidth = dvdGeometry.parameters.width * dvd.scale.x;
    const boxHeight = dvdGeometry.parameters.height * dvd.scale.y;

    if (dvd.position.x + boxWidth / 2 > 1 || dvd.position.x - boxWidth / 2 < -1) {
        velocity.x *= -1;
        dvd.scale.y -= 0.1;
        dvd.scale.x -= 0.1;
        dvdMaterial.color.setRGB(Math.random(), Math.random(), Math.random()); // Change color
        bouncesLeft--;
    }

    if (dvd.position.y + boxHeight / 2 > 1 || dvd.position.y - boxHeight / 2 < -1) {
        velocity.y *= -1;
        dvd.scale.y -= 0.1;
        dvd.scale.x -= 0.1;
        dvdMaterial.color.setRGB(Math.random(), Math.random(), Math.random()); // Change color
        bouncesLeft--;
    }

    if (bouncesLeft <= 0) {
        console.log("Object Not Found");
        dvd.visible = false;
    }

    renderer.render(scene, camera);
}

animate();
