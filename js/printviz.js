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

    

    $.getJSON("cointop.json", function(json) {
        var geometry = new THREE.Geometry();
        var commands = {};
        var last_a = 0;
        var lx = ly = lz = 0;

        for(var i = 0; i < json.length; i++){
            var obj = json[i];
            commands[obj.command.function] = 1;
            if(obj.command.function == "move"){
                var params = obj.command.parameters;
                var a = params.a;
                var thickness = a - last_a;

                var x = params.x;
                var y = params.y;
                var z = params.z;

                var dx = x - lx;
                var dy = y - ly;
                var dz = z - lz;

                var len = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2) + Math.pow(dz, 2));

                thickness /= len;
                thickness *= 10;

                geometry.vertices.push(new THREE.Vector3(params.x, params.z, params.y));

                var material = new THREE.LineBasicMaterial({
                    color: 0x0000ff,
                    linewidth: thickness
                });
                var line = new THREE.Line(geometry, material);
                

                if(thickness > 0){
                    scene.add(line);
                }

                //Add this point as the startingpoint of the next line!
                geometry = new THREE.Geometry();
                geometry.vertices.push(new THREE.Vector3(params.x, params.z, params.y));
                
                
                //Update "last" values
                
                last_a = a;
                lx = x;
                ly = y;
                lz = z;

            }
        }
        console.log(commands);
        jsn = json;
        
        renderer.render(scene, camera);
    });
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
