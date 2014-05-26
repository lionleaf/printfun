// Code from Udacity "Interactive 3D programming" used as a skeleton
// @author lionleaf (Andreas Loeve Selvik)

var camera, scene, renderer;
var cameraControls, effectController;
var clock = new THREE.Clock();
var gridX = false;
var gridY = false;
var gridZ = false;
var axes = false;
var ground = false;

function fillScene() {
        scene = new THREE.Scene();
    
        var material = new THREE.LineBasicMaterial({
                color: 0x0000ff
        });

        var geometry = new THREE.Geometry();
        geometry.vertices.push(new THREE.Vector3(-10, 0, 0));
        geometry.vertices.push(new THREE.Vector3(0, 10, 0));
        geometry.vertices.push(new THREE.Vector3(10, 0, 0));


        $.getJSON("cointop.json", function(json) {
                console.log("wooho");
                jsn = json;
        });
        var line = new THREE.Line(geometry, material);
        scene.add(line);
        renderer.render(scene, camera);
}

function init() {

        var canvasWidth = window.innerWidth;
        var canvasHeight = window.innerHeight;
        var canvasRatio = canvasWidth / canvasHeight;

        // RENDERER
        renderer = new THREE.WebGLRenderer( { antialias: false } );
        renderer.gammaInput = true;
        renderer.gammaOutput = true;
        renderer.setSize(canvasWidth, canvasHeight);
        renderer.setClearColorHex( 0xAAAAAA, 1.0 );

        // CAMERA
        camera = new THREE.PerspectiveCamera( 40, canvasRatio, 1, 10000 );
        camera.position.set( -52, 51, 9 );
        // CONTROLS
        cameraControls = new THREE.OrbitAndPanControls(camera, renderer.domElement);
        cameraControls.target.set(0,0,0);

}

function addToDOM() {
        var container = document.getElementById('container');
        var canvas = container.getElementsByTagName('canvas');
        if (canvas.length>0) {
                container.removeChild(canvas[0]);
        }
        container.appendChild( renderer.domElement );
}

function drawHelpers() {
        if (ground) {
                Coordinates.drawGround({size:10000});
        }
        if (gridX) {
                Coordinates.drawGrid({size:10000,scale:0.01});
        }
        if (gridY) {
                Coordinates.drawGrid({size:10000,scale:0.01, orientation:"y"});
        }
        if (gridZ) {
                Coordinates.drawGrid({size:10000,scale:0.01, orientation:"z"});
        }
        if (axes) {
                Coordinates.drawAllAxes({axisLength:200,axisRadius:1,axisTess:50});
        }
}

function animate() {
        window.requestAnimationFrame(animate);
        render();
}

function render() {
        var delta = clock.getDelta();
        cameraControls.update(delta);

        if ( effectController.newGridX !== gridX || effectController.newGridY !== gridY || effectController.newGridZ !== gridZ || effectController.newGround !== ground || effectController.newAxes !== axes)
        {
                gridX = effectController.newGridX;
                gridY = effectController.newGridY;
                gridZ = effectController.newGridZ;
                ground = effectController.newGround;
                axes = effectController.newAxes;

                fillScene();
                drawHelpers();
        }

        renderer.render(scene, camera);
}



function setupGui() {

        effectController = {

                newGridX: gridX,
                newGridY: gridY,
                newGridZ: gridZ,
                newGround: ground,
                newAxes: axes
        };

        var gui = new dat.GUI();
        var h = gui.addFolder("Grid display");
        h.add( effectController, "newGridX").name("Show XZ grid");
        h.add( effectController, "newGridY" ).name("Show YZ grid");
        h.add( effectController, "newGridZ" ).name("Show XY grid");
        h.add( effectController, "newGround" ).name("Show ground");
        h.add( effectController, "newAxes" ).name("Show axes");
}


init();
fillScene();
drawHelpers();
setupGui();
addToDOM();
animate();
