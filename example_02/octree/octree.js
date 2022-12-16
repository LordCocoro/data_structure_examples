import { OrbitControls } from "./OrbitControls.js";
import * as THREE from "./three.module.js";

class Point {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    show() {
        var circle = new THREE.Mesh(new THREE.SphereGeometry(0.2, 32, 32, 0, Math.PI * 2), material2);
        circle.position.x = this.x;
        circle.position.y = this.y;
        circle.position.z = this.z;
        scene.add(circle);
    }
}


class Cube {
    constructor(x, y, z, w, h, d) {
        this.x = x; // center
        this.y = y;
        this.z = z;
        this.w = w; // width
        this.h = h; // height
        this.d = d; // depth (profundidad)
    }

    show() {
        var geometry = new THREE.BoxGeometry(this.w, this.h, this.d);
        this.cube = new THREE.Mesh(geometry, material3);
        this.cube.position.x = this.x;
       this.cube.position.y = this.y;
       this.cube.position.z = this.z;
        scene.add(this.cube);
        this.showLines();

    }
    showLines() {
        //create a blue LineBasicMaterial
        const material = new THREE.LineBasicMaterial({ color: 0xffffff });
        let vectorA = new THREE.Vector3(this.x - this.w / 2, this.y - this.h / 2, this.z - this.d / 2);
        let vectorB = new THREE.Vector3(this.x + this.w / 2, this.y - this.h / 2, this.z - this.d / 2);
        let vectorC = new THREE.Vector3(this.x - this.w / 2, this.y - this.h / 2, this.z + this.d / 2);
        let vectorD = new THREE.Vector3(this.x + this.w / 2, this.y - this.h / 2, this.z + this.d / 2);
        let vectorE = new THREE.Vector3(this.x - this.w / 2, this.y + this.h / 2, this.z - this.d / 2);
        let vectorF = new THREE.Vector3(this.x + this.w / 2, this.y + this.h / 2, this.z - this.d / 2);
        let vectorG = new THREE.Vector3(this.x - this.w / 2, this.y + this.h / 2, this.z + this.d / 2);
        let vectorH = new THREE.Vector3(this.x + this.w / 2, this.y + this.h / 2, this.z + this.d / 2);
        console.log("vectorA", vectorA);
        console.log("vectorB", vectorB);
        console.log("vectorC", vectorC);
        console.log("vectorD", vectorD);
        console.log("vectorE", vectorE);
        console.log("vectorF", vectorF);
        console.log("vectorG", vectorG);
        console.log("vectorH", vectorH);

        console.log("this.w ", this.w)
        console.log("this.h ", this.h)
        console.log("this.d ", this.d)
        console.log("this.x ", this.x)
        console.log("this.y ", this.y)
        console.log("this.z ", this.z)

        let points = [];
        points.push(vectorA);
        points.push(vectorB);
        let geometryLine = new THREE.BufferGeometry().setFromPoints(points);
        let line = new THREE.Line(geometryLine, new THREE.LineBasicMaterial({ color: 0xffffff }));
        scene.add(line);

        points = [];
        points.push(vectorA);
        points.push(vectorC);
        geometryLine = new THREE.BufferGeometry().setFromPoints(points);
        line = new THREE.Line(geometryLine, new THREE.LineBasicMaterial({ color: 0xffffff }));
        scene.add(line)
        points = [];
        points.push(vectorB);
        points.push(vectorD);
        geometryLine = new THREE.BufferGeometry().setFromPoints(points);
        line = new THREE.Line(geometryLine, new THREE.LineBasicMaterial({ color: 0xffffff }));
        scene.add(line)
        points = [];
        points.push(vectorC);
        points.push(vectorD);
        geometryLine = new THREE.BufferGeometry().setFromPoints(points);
        line = new THREE.Line(geometryLine, new THREE.LineBasicMaterial({ color: 0xffffff }));
        scene.add(line)
        points = [];
        points.push(vectorE);
        points.push(vectorA);
        geometryLine = new THREE.BufferGeometry().setFromPoints(points);
        line = new THREE.Line(geometryLine, new THREE.LineBasicMaterial({ color: 0xffffff }));
        scene.add(line)
        points = [];
        points.push(vectorB);
        points.push(vectorF);
        geometryLine = new THREE.BufferGeometry().setFromPoints(points);
        line = new THREE.Line(geometryLine, new THREE.LineBasicMaterial({ color: 0xffffff }));
        scene.add(line)
        points = [];
        points.push(vectorD);
        points.push(vectorH);
        geometryLine = new THREE.BufferGeometry().setFromPoints(points);
        line = new THREE.Line(geometryLine, new THREE.LineBasicMaterial({ color: 0xffffff }));
        scene.add(line)
        points = [];
        points.push(vectorC);
        points.push(vectorG);
        geometryLine = new THREE.BufferGeometry().setFromPoints(points);
        line = new THREE.Line(geometryLine, new THREE.LineBasicMaterial({ color: 0xffffff }));
        scene.add(line)
        points = [];
        points.push(vectorE);
        points.push(vectorG);
        geometryLine = new THREE.BufferGeometry().setFromPoints(points);
        line = new THREE.Line(geometryLine, new THREE.LineBasicMaterial({ color: 0xffffff }));
        scene.add(line)
        points = [];
        points.push(vectorF);
        points.push(vectorE);
        geometryLine = new THREE.BufferGeometry().setFromPoints(points);
        line = new THREE.Line(geometryLine, new THREE.LineBasicMaterial({ color: 0xffffff }));
        scene.add(line)
        points = [];
        points.push(vectorH);
        points.push(vectorF);
        geometryLine = new THREE.BufferGeometry().setFromPoints(points);
        line = new THREE.Line(geometryLine, new THREE.LineBasicMaterial({ color: 0xffffff }));
        scene.add(line)
        points = [];
        points.push(vectorG);
        points.push(vectorH);
        geometryLine = new THREE.BufferGeometry().setFromPoints(points);
        line = new THREE.Line(geometryLine, new THREE.LineBasicMaterial({ color: 0xffffff }));
        scene.add(line)
    }
    remove() {
        scene.remove(this.cube);
    }

    // verifica si este objeto contiene un objeto Punto
    contains(point) {
        return (point.x >= this.x - this.w/2 &&
            point.x < this.x + this.w/2 &&
            point.y >= this.y - this.h/2 &&
            point.y < this.y + this.h/2 &&
            point.z >= this.z - this.d/2 &&
            point.z < this.z + this.d/2);
    }

    intersects(range) {
        let A = new Point (range.x - range.w/2, range.y + range.h/2, range.z - range.d/2)
        let B = new Point (range.x + range.w/2, range.y + range.h/2, range.z - range.d/2)
        let C = new Point (range.x - range.w/2, range.y - range.h/2, range.z - range.d/2)
        let D = new Point (range.x + range.w/2, range.y - range.h/2, range.z - range.d/2)        
        let E = new Point (range.x - range.w/2, range.y + range.h/2, range.z + range.d/2)
        let F = new Point (range.x + range.w/2, range.y + range.h/2, range.z + range.d/2)
        let G = new Point (range.x - range.w/2, range.y - range.h/2, range.z + range.d/2)
        let H = new Point (range.x + range.w/2, range.y - range.h/2, range.z + range.d/2)

        if(this.contains(A) || this.contains(B) || this.contains(C) || this.contains(D) ||
           this.contains(E) || this.contains(F) || this.contains(G) || this.contains(H)){
            return true
        }
        return false
    }

}


class Octree {
    constructor(boundary, n) {
        this.boundary = boundary; // Cube
        this.capacity = n; // capacidad maxima de cada cuadrante
        this.points = []; // vector , almacena los puntos a almacenar
        this.divided = false;
    }

    subdivide() {
        let x = this.boundary.x;
        let y = this.boundary.y;
        let z = this.boundary.z;
        let w = this.boundary.w;
        let h = this.boundary.h;
        let d = this.boundary.d;
        var qt_northeast_top = new Cube(x + w / 4, y + h / 4, z + d / 4, w / 2, h / 2, d / 2);
        var qt_northeast_bot = new Cube(x + w / 4, y + h / 4, z - d / 4, w / 2, h / 2, d / 2);
        var qt_northwest_top = new Cube(x - w / 4, y + h / 4, z + d / 4, w / 2, h / 2, d / 2);
        var qt_northwest_bot = new Cube(x - w / 4, y + h / 4, z - d / 4, w / 2, h / 2, d / 2);
        var qt_southeast_top = new Cube(x + w / 4, y - h / 4, z + d / 4, w / 2, h / 2, d / 2);
        var qt_southeast_bot = new Cube(x + w / 4, y - h / 4, z - d / 4, w / 2, h / 2, d / 2);
        var qt_southwest_top = new Cube(x - w / 4, y - h / 4, z + d / 4, w / 2, h / 2, d / 2);
        var qt_southwest_bot = new Cube(x - w / 4, y - h / 4, z - d / 4, w / 2, h / 2, d / 2);
        this.northeast_top = new Octree(qt_northeast_top, this.capacity);
        this.northeast_bot = new Octree(qt_northeast_bot, this.capacity);
        this.northwest_top = new Octree(qt_northwest_top, this.capacity);
        this.northwest_bot = new Octree(qt_northwest_bot, this.capacity);
        this.southeast_top = new Octree(qt_southeast_top, this.capacity);
        this.southeast_bot = new Octree(qt_southeast_bot, this.capacity);
        this.southwest_top = new Octree(qt_southwest_top, this.capacity);
        this.southwest_bot = new Octree(qt_southwest_bot, this.capacity);
        qt_northeast_top.show();
        qt_northeast_bot.show();
        qt_northwest_top.show();
        qt_northwest_bot.show();
        qt_southeast_top.show();
        qt_southeast_bot.show();
        qt_southwest_top.show();
        qt_southwest_bot.show();
        for (let p of this.points) {
            if (qt_northeast_top.contains(p)) {
                this.northeast_top.points.push(p);
            }else if (qt_northeast_bot.contains(p)) {
                this.northeast_bot.points.push(p);
            }else if (qt_northwest_top.contains(p)) {
                this.northwest_top.points.push(p);
            }else if (qt_northwest_bot.contains(p)) {
                this.northwest_bot.points.push(p);
            }else if (qt_southeast_top.contains(p)) {
                this.southeast_top.points.push(p);
            }else if (qt_southeast_bot.contains(p)) {
                this.southeast_bot.points.push(p);
            }else if (qt_southwest_top.contains(p)) {
                this.southwest_top.points.push(p);
            }else if (qt_southwest_bot.contains(p)) {
                this.southwest_bot.points.push(p);
            }
        }
        this.boundary.remove();
        this.subdivide = true;
    }

    insert(point) {
        //console.log("insert", point);
        //si no esta dentro del limite retornamos insercion no dada
        if (!this.boundary.contains(point)) {
            return false;
        }
        //si estamos dentro de la capacidad insertamos e insercion hecha
        if (this.points.length < this.capacity) {
            this.points.push(point);
            point.show();
            return true;
        } else {
            if (!this.divided) {
                this.subdivide();
                this.divided = true;
            }
            //si se inserta en algun cubo retorna tu y termina el if
            if (this.northeast_top.insert(point)) {
                return true;
            } else if (this.northeast_bot.insert(point)) {
                return true;
            } else if (this.northwest_top.insert(point)) {
                return true;
            } else if (this.northwest_bot.insert(point)) {
                return true;
            } else if (this.southeast_top.insert(point)) {
                return true;
            } else if (this.southeast_bot.insert(point)) {
                return true;
            } else if (this.southwest_top.insert(point)) {
                return true;
            } else if (this.southwest_bot.insert(point)) {
                return true;
            }
        }
    }
    query(range,points){
        if(!this.boundary.intersects(range)){

        }
        else{
            this.points.forEach(p => {
                if(range.contains(p)){
                    console.log(p);
                    points.push(p) 
                }
            });
            if(this.divided){
                this.northeast_top.query(range,points);
                this.northeast_bot.query(range,points);
                this.northwest_top.query(range,points);
                this.northwest_bot.query(range,points);
                this.southeast_top.query(range,points);
                this.southeast_bot.query(range,points);
                this.southwest_top.query(range,points);
                this.southwest_bot.query(range,points);
            }
        }  
    }
    getTotal(){

    }
}
// creating scene
var scene = new THREE.Scene();
scene.background = new THREE.Color( 0x000000 );
    // add camera
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight);
//renderer
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
// agregar al html
document.body.appendChild(renderer.domElement);
var material3 = new THREE.MeshBasicMaterial({
    color: 0x1D3AA3,
    transparent: true,
    opacity: .2
});

var material4 = new THREE.MeshBasicMaterial({
    color: 0x00A6C0 ,
    transparent: true,
    opacity: .8
});

var material2 = new THREE.MeshBasicMaterial({
    color: 0xA5E65A,
    
});
let cube_ = new Cube(0, 0, 0, 20, 20, 20);
//let cube_query = new Cube(0, 0, window.scrollX, 5, 5, 5);
cube_.show();
//cube_query.show();
let octree = new Octree(cube_, 4);
for (let i = 0; i < 50; i++) {
    //get decimal numbers between -10 to 10
    let x = Math.ceil(Math.random() * 10 * 100) / 100 * (Math.round(Math.random()) ? 1 : -1)
    let y = Math.ceil(Math.random() * 10 * 100) / 100 * (Math.round(Math.random()) ? 1 : -1)
    let z = Math.ceil(Math.random() * 10 * 100) / 100 * (Math.round(Math.random()) ? 1 : -1)
    
    let p = new Point(x, y, z);
    octree.insert(p)

}

//Posicion de la camara
camera.position.x = 40;
camera.position.y = 40;
camera.position.z = 40;


//add controls
var controls = new OrbitControls(camera, renderer.domElement);
controls.minDistance = 30;
controls.maxDistance = 3;
controls.enableZoom = true;
controls.enableRotate = true;

window.addEventListener("resize", redimention);

function redimention() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
}
//cubo query
// let cube_fake = new Cube(0, 0, 0, 5, 5, 5);
// var geometry_q = new THREE.BoxGeometry(5,5,5);
// var cube_q = new THREE.Mesh(geometry_q, material4);
// console.log(octree);
// cube_q.position.x = 0;
// cube_q.position.y = 0;
// cube_q.position.z = 0;
// scene.add(cube_q);
// window.addEventListener("keydown", function (event) {
//     switch (event.key){
//         case "w":
//             cube_fake.z--;
//             cube_q.position.z--;
//             break;
//         case "s":
//             cube_fake.z++;
//             cube_q.position.z++;
//             break;
//         case "a":
//             cube_fake.x--;
//             cube_q.position.x--;
//             break;
//         case "d":
//             cube_fake.x++;
//             cube_q.position.x++;
//             break;
//         case " ":
//             cube_fake.y++;
//             cube_q.position.y++;
//             break;
//         case "<":
//             cube_fake.y--;
//             cube_q.position.y--;
//             break;
//     }
//     let points = []
//     octree.query(cube_fake,points)
//     points.sort()
//     let result = points.filter((item,index)=>{
//         return points.indexOf(item) === index;
//       })
//     var print = result.map(function(e){
//         return '<li> ('+e.x+', '+e.y+', '+e.z+')</li>'
//       })
//     document.getElementById("lista").innerHTML = JSON.stringify(print)
//   },false);

function add(){
    let x = Math.ceil(Math.random() * 10 * 100) / 100 * (Math.round(Math.random()) ? 1 : -1)
    let y = Math.ceil(Math.random() * 10 * 100) / 100 * (Math.round(Math.random()) ? 1 : -1)
    let z = Math.ceil(Math.random() * 10 * 100) / 100 * (Math.round(Math.random()) ? 1 : -1)
    let p = new Point(x, y, z);
    octree.insert(p)
}
window.onload = function (){
    document.getElementById("btn-add").addEventListener("click",add)
}

//add animation
var animate = function() {
    requestAnimationFrame(animate);

    
    //cube.rotation.x += 0.01;
    //cube.rotation.y += 0.01;

    //renderizar
    renderer.render(scene, camera);
}
animate()