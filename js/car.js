var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.z = 300;

THREE.ImageUtils.crossOrigin = '';

var sceneCar = document.getElementById("CarCanvas");

var renderer = new THREE.WebGLRenderer( { canvas: CarCanvas });
// renderer.setSize( window.innerWidth, window.innerHeight );

var controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.enableZoom = true;

var keyLight = new THREE.DirectionalLight(new THREE.Color('hsl(30, 100%, 75%)'), 1.0);
keyLight.position.set(-100, 0, 100);

var fillLight = new THREE.DirectionalLight(new THREE.Color('hsl(240, 100%, 75%)'), 0.75);
fillLight.position.set(100, 0, 100);

var backLight = new THREE.DirectionalLight(0xffffff, 1.0);
backLight.position.set(100, 0, -100).normalize();

scene.add(keyLight);
scene.add(fillLight);
scene.add(backLight);

var mtlLoader = new THREE.MTLLoader();
mtlLoader.setTexturePath('http://noirvortex.co.uk/bluesky/model/');
mtlLoader.setPath('http://noirvortex.co.uk/bluesky/model/');
mtlLoader.load('swift2.mtl', function (materials) {

    materials.preload();

    var objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.setPath('http://noirvortex.co.uk/bluesky/model/');
    objLoader.load('swift2.obj', function (object) {

        scene.add(object);
        object.position.y -= 60;

    });  
});

// Look up the size the canvas is being displayed
var width = renderer.domElement.clientWidth;
var height = renderer.domElement.clientHeight;
 
// check if the canvas is the same size
if (renderer.domElement.width !== width ||
    renderer.domElement.height !== height) {
 
    // it's not the same size so make it the same size
    var updateCSSStyle = false;
    renderer.setSize( width, height, updateCSSStyle );
}

var animate = function () {
	requestAnimationFrame( animate );
    controls.update();
	renderer.render(scene, camera);
};
animate();
