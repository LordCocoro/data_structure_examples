const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 500 );
camera.position.set( 0, 0, 100 );
camera.lookAt( 0, 0, 0 );


const scene = new THREE.Scene();
renderer.render( scene, camera );



  const loader = new THREE.FontLoader();
  loader.load( 'fonts/helvetiker_regular.typeface.json' , function ( response ) {
    scene = initScene( font );
    font = response;

    refreshText();

  } );


const TextGeometry = new THREE.TextGeometry( 'Hello three.js!' );
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00, wireframe: true } );
const cube = new THREE.Mesh( geometry, material);
const cube2 = new THREE.Mesh( geometry, material);
cube.position.x=-1;
cube.position.y=-1;
cube2.position.x=-3;
cube2.position.y=-3;
scene.add(cube)
scene.add(cube2)
scene.add(TextGeometry)
camera.position.z = 15;
const animate = function () {
  requestAnimationFrame( animate );
  scene.traverse(function (object) {
    if(object.isMesh === true){
      object.rotation.y += 0.01; 
    }
  })
renderer.render( scene, camera );
};
//console.log(cube.position);
//console.log(cube2.position);
animate();
let data ={}
data.cubeA =  cube;
data.cubeB =  cube2;
data.x1=cube.position.x;
data.x2=cube2.position.x;
data.y1=cube.position.y;
data.y2=cube2.position.y;

data.distance = Math.sqrt((Math.pow((data.x1-data.x2),2)+Math.pow((data.y1-data.y2),2)))/2
data.xm = (data.x1+data.x2)/2;
data.ym = (data.y1+data.y2)/2; 

let data2 ={}
data2.cubeA =  cube2;
data2.cubeB =  cube;
data2.x1=cube2.position.x;
data2.x2=cube.position.x;
data2.y1=cube2.position.y;
data2.y2=cube.position.y;

data2.distance = Math.sqrt((Math.pow((data2.x1-data2.x2),2)+Math.pow((data2.y1-data2.y2),2)))/2
data2.xm = (data2.x1+data2.x2)/2;
data2.ym = (data2.y1+data2.y2)/2;

const loopAtoB = (i,data) => {
  return new Promise((resolve)=>{
    setTimeout(function() {  
      data.cubeA.position.x = data.distance*Math.cos(i)+data.xm;
      data.cubeA.position.y = data.distance*Math.sin(i)+data.ym;
      //console.log(cube.position)
      renderer.render( scene, camera );
    i += ((Math.PI)/180);                  
    if (i < ((5*Math.PI/4)+0.0074533)) {           
      return resolve(loopAtoB(i,data));           
    }else{
      return resolve()
    }
  }, 2)
  })         
  }
const loopBtoA = (i,data) => {         
  return new Promise((resolve)=>{   
    setTimeout(function() {  
        data.cubeB.position.x = data.distance*Math.cos(i)+data.xm;
        data.cubeB.position.y = data.distance*Math.sin(i)+data.ym;
        //console.log(i);            
      if (i < (9*Math.PI/4)) { 
        i += ((Math.PI)/180);          
        return resolve(loopBtoA(i,data))          
      }else{
        return resolve()             
      }
    }, 2)
  })  
  }

  //console.log("hola")
  loopAtoB((Math.PI/4),data).then(()=>loopBtoA((5*Math.PI/4),data)).then(()=>loopAtoB((Math.PI/4),data2)).then(()=>loopBtoA((5*Math.PI/4),data2))
  


// (function loopAtoB(i) {         
//     setTimeout(function() {  
//         cube.position.x = distance*Math.cos(i)+xm;
//         cube.position.y = distance*Math.sin(i)+ym;
//         renderer.render( scene, camera );
//       i += ((Math.PI/2)/180);                  
//       if (i < ((5*Math.PI/4)+0.0074533)) {           
//         loopAtoB(i);           
//       }                 
//     }, 3000)
//   })(Math.PI/4)


    // for (let i = (5*Math.PI/4)//225; i <= ((9*Math.PI/4)+0.0074533)//360+45; i += ((Math.PI/2)/180)) {

            
    //         //console.log(i);
    //         renderer.render( scene, camera );
    // }
    
    // for (let i = (Math.PI/4)//45; i <= ((5*Math.PI/4)+0.0074533)//225; i += ((Math.PI/2)/180)) {

    //         setTimeout(()=>{
    //             setTimeout(()=>{cube.position.x = distance*Math.cos(i)+xm;
    //             cube.position.y = distance*Math.sin(i)+ym;},2000)
    //             //console.log(i);
    //             renderer.render( scene, camera );},1000)
    // }
  

// cube.position.x = x2;
// cube.position.y = y2;
// cube2.position.x = x1;
// cube2.position.y = y1;
console.log(cube.position);
console.log(cube2.position);