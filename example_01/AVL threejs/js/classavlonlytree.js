
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 500 );
camera.position.set( 0, 0, 100 );
camera.lookAt( 0, 0, 0 );

const loader = new THREE.FontLoader();

const scene = new THREE.Scene();
renderer.render( scene, camera );

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial( { color: 0x00f0ff, wireframe: true } );
const lineMat = new THREE.LineBasicMaterial( { color: 0x0080ff } );

scene.background = new THREE.Color( 0x000000 );

var groupLines = new THREE.Group();
var groupCubes = new THREE.Group();
const phi = (1 + Math.sqrt(5)/2)

// const steps = []
// const datosSteps = []
// // const cube = new THREE.Mesh( geometry2, material2);
camera.position.z = 80;
camera.position.y = -50;



const animate = function () {
  requestAnimationFrame( animate );
  scene.traverse(function (object) {
    if(object.isMesh === true){
      object.rotation.y += 0.01; 
    }
  })
renderer.render( scene, camera );
};

animate();
let extractDataBtwNode  = function(NodoA,NodoB){
  let data ={}
  data.cubeA =  NodoA.cube;
  data.cubeB =  NodoB.cube;
  data.x1=data.cubeA.position.x;
  data.x2=data.cubeB.position.x;
  data.y1=data.cubeA.position.y;
  data.y2=data.cubeB.position.y;
  
  data.distance = Math.sqrt((Math.pow((data.x1-data.x2),2)+Math.pow((data.y1-data.y2),2)))/2
  data.xm = (data.x1+data.x2)/2;
  data.ym = (data.y1+data.y2)/2; 
  return data
  
}
let loopAtoBLeftDown = function(i,data) {  //initi with (Math.PI/4) // 45°
  return new Promise((resolve)=>{
  setTimeout(function() {  
      data.cubeA.position.x = data.distance*Math.cos(i)+data.xm;
      data.cubeA.position.y = data.distance*Math.sin(i)+data.ym;
      //renderer.render( scene, camera );
    if (i <= ((5*Math.PI/4)+0.0074533)) {  
      i += ((Math.PI/2)/180);         
      return resolve(loopAtoBLeftDown(i,data));           
    }
    else{
      data.cubeA.position.x = data.x2
      data.cubeA.position.y = data.y2
      return resolve()
    }
  }, 2)
}) 
}
let loopBtoARightUp = function(i=(5*Math.PI/4),data) {  ///(5*Math.PI/4) // 225°
  return new Promise((resolve)=>{
  setTimeout(function() {  
      data.cubeB.position.x = data.distance*Math.cos(i)+data.xm;
      data.cubeB.position.y = data.distance*Math.sin(i)+data.ym;
      //renderer.render( scene, camera );                     
    if (i <= ((9*Math.PI/4)+0.0074533)) {
      i += ((Math.PI)/180);            
      return resolve(loopBtoARightUp(i,data));    
    } 
    else{
      data.cubeB.position.x = data.x1
      data.cubeB.position.y = data.y1
      return resolve ()
    }                
  }, 2)})

}

let loopAtoBRightDown  = function(i=(3*Math.PI/4),data) { // (3*Math.PI/4) /// 135°
  return new Promise((resolve)=>{
  setTimeout(function() {  
      data.cubeA.position.x = data.distance*Math.cos(i)+data.xm;
      data.cubeA.position.y = data.distance*Math.sin(i)+data.ym;
      //renderer.render( scene, camera );
    
    if (i < ((7*Math.PI/4)+0.0074533)) {           
      i += ((Math.PI)/180);                  
      return resolve(loopAtoBRightDown(i,data)); 
    }        
    else{
      data.cubeA.position.x = data.x2
      data.cubeA.position.y = data.y2
      return resolve()
    }         
  }, 2)
})
}
let loopBtoALeftUp  = function(i=(7*Math.PI/4),data) {  // (7*Math.PI/4) // 315°
  return new Promise((resolve)=>{
  setTimeout(function() {  
      data.cubeB.position.x = data.distance*Math.cos(i)+data.xm;
      data.cubeB.position.y = data.distance*Math.sin(i)+data.ym;
      //renderer.render( scene, camera );
                      
    if (i < ((11*Math.PI/4)+0.0074533)) {           
      i += ((Math.PI/2)/180);
      return resolve(loopBtoALeftUp(i,data));
    }
    else{
      data.cubeB.position.x = data.x1
      data.cubeB.position.y = data.y1
      return resolve();
    }
  }, 2)
})
}

function sleep(ms) {
  const start = Date.now();
  while (Date.now() < start + ms);
}
  class Nodo{
    constructor(value)
    {
    this.cube=new THREE.Mesh(geometry, material);
    this.value=value;
    this.left=null;
    this.right=null;
    this.height=0;
    }
  }

  class ArbolBinario {
    constructor()
    {
        this.root = null
        this.current = this.root
    }
  async changeSites(valueA,valueB){
    return new Promise ((resolve)=>{
        //console.log(valueA)
        let a = this.search(valueA);
        let b = this.search(valueB)
        return resolve(changeInLeft(a,b))
    })
    }
    insert(parent, newValue){
      if(parent.value<newValue.value){
        if(parent.right&&parent.right.value){
          this.insert(parent.right, newValue)
        }else{
          parent.right=newValue
          
        }
      }else{
        if(parent.left&&parent.left.value){
          this.insert(parent.left, newValue)
        }else{
          
          parent.left=newValue
          
        }
      }
  
    }

    add(value){
    const newValue = new Nodo(value)
    if(!this.root){
      this.root=newValue   
      groupCubes.add(this.root.cube);  
      return "Arbol inicializado"
    }else{
      this.insert(this.root, newValue)
    }
    this.getHeight(this.root)
    this.root=this.checkBalance(this.root)
  }
  
    balancear(parent){
    if(parent.height>1 && parent.right && (parent.right.height>1||parent.right.height<-1)){
      parent.right = this.balancear(parent.right)
    }else if(parent.height<-1 && parent.left && (parent.left.height<-1||parent.left.height>1)){
      parent.left = this.balancear(parent.left)
    }else if(parent.height<0 &&parent.left.height===-1){
      if(parent.left.right){
        var saveRight = parent.left.right
      }
      if(parent.left.left){
        var saveLeft =parent.left.left
      }
      parent.left.right = new Nodo(parent.value)
      parent.left.right.right=parent.right
      parent =parent.left
      parent.right.left=saveRight
      parent.left =saveLeft
    }else if(parent.height<0 &&parent.left.height===1){
      if(parent.left.right.left){
        var saveLeft = parent.left.right.left
      }if(parent.left.right.right){
        var saveRight = parent.left.right.right
      }
      parent.left.right.right = new Nodo(parent.value)
      parent.left.right.right.right = parent.right
      parent.left.right.left = new Nodo(parent.left.value)
      parent.left.right.left.left=parent.left.left
      parent =parent.left.right
      parent.left.right = saveLeft
      parent.right.left = saveRight
    }else if(parent.height>0 &&parent.right.height===1){
      if(parent.right.left){
        var saveLeft =parent.right.left
      }if(parent.right.right){
        var saveRight = parent.right.right
      }
      parent.right.left = new Nodo(parent.value)
      parent.right.left.left =parent.left
      //let aux = parent
      parent = parent.right
      // parent.left.cube.position.x = aux.cube.position.x - 2
      // parent.left.cube.position.y = aux.cube.position.y - 2
      // let data1 = extractDataBtwNode (aux,parent)
      // let data2 = extractDataBtwNode (aux,parent.left)
      // let data3 = extractDataBtwNode (aux.right,parent.right)
      // let data4 = extractDataBtwNode (aux.right,parent.right)
      parent.left.right = saveLeft
      // datosSteps.push(data1,data2,data3)
      // console.log(datosSteps);
      // loopBtoALeftUp((7*Math.PI/4),data1).then(()=>loopBtoALeftUp((7*Math.PI/4),data3)).then(()=>loopAtoBLeftDown((Math.PI/4),data2))
      parent.right=saveRight

  
    }else if(parent.height>0 &&parent.right.height===-1){
      if(parent.right.left.right){
        var saveRight = parent.right.left.right
      }
      if(parent.right.left.left){
        saveLeft=parent.right.left.left
      }
      parent.right.left.left = new Nodo(parent.value)
      parent.right.left.right = new Nodo(parent.right.value)
      parent.right.left.right.right=parent.right.right
      parent.right.left.left.left = parent.left
      parent =parent.right.left
      parent.right.left = saveRight
      parent.left.right =saveLeft
    }
  
    return parent
  
  }
  
  search(n){
    this.current = this.root
    //console.log(this.current);
    return this.find(n)
  }
  
  find(x){
    //console.log(this.current);
    //console.log(x);
    if(this.current && this.current.value===x){
      return this.current
    }else if( this.current && this.current.value<x){
        this.current = this.current.right
        return this.find(x)
        
        //return this.find(x)
    }else if(this.current && this.current.value>x){
      this.current = this.current.left
      return this.find(x)
    }
    return false
  }

  hasLeft(Nodo){
    return !!Nodo.left
  }

  farestLeft(Nodo){
    if(this.hasLeft(Nodo)){
      return this.farestLeft(Nodo.left)
    }
    return Nodo
  }

  deleted(x){
    const deleted = this.search(x)
    if(deleted.right){
      var ascended = this.farestLeft(deleted.right)
      //this.delete(ascended.value)
      deleted.value = ascended.value
    }else if(deleted.left){
      deleted.value=deleted.left.value
      deleted.right =deleted.left.right
      deleted.left=deleted.left.left
    }else{
      this.findNodoAndDestroy(deleted)      
    }
  }
  
  findNodoAndDestroy(Nodo){
    this.current = this.root
    while(true){
      if(Nodo.value<this.current.value){
        if(this.current.left === Nodo){
          setTimeout(()=>{scene.remove(this.current.left.cube);},1000)
          setTimeout(()=>{this.current.left = null;},1000)
          break
        }else{
          this.current=this.current.left
        }
      }else if(Nodo.value>this.current.value){
        if(this.current.right === Nodo){
          setTimeout(()=>{scene.remove(this.current.right.cube);},1000)
          setTimeout(()=>{this.current.right = null;},1000)
          this.current.right = null
          break
        }else{
          this.current = this.current.right
        }
      }
    }
  }
  getMax(Nodo){
    var max= 0
    console.log(Nodo);
    if(Nodo.right){
      max = this.getMax(Nodo.right)
    }
    else{
      const materialR = new THREE.MeshBasicMaterial( { color: 0x0000ff } );
      Nodo.cube.material = materialR
      return max  
    }
    return max 
  }
  getMin(Nodo){
    console.log(Nodo);
    if(Nodo.left){
      this.getMin(Nodo.left)
    }
    else{
      const materialR = new THREE.MeshBasicMaterial( { color: 0x00ffff } );
      Nodo.cube.material = materialR
      return Nodo.value
    }
    return Nodo.value
  }
  getGraph(Nodo){
   
    groupLines.clear()
    groupCubes.clear()
    groupCubes.add(this.root)
    this.graph(Nodo)
    scene.remove(groupCubes);
    console.log(groupCubes);
    scene.add(groupCubes);
    scene.remove(groupLines)
    console.log(groupLines);
    scene.add(groupLines)
    console.log(this.root);
  }

  graph(Nodo){
    let h = this.getHeight(Nodo)+3;
    var alpha = 0
    var radius = h
    const randomColor = Math.floor(Math.random()*16777215).toString(16);
    console.log(randomColor);
    if(h>1){
      alpha = (h-1)*Math.PI/(h+4);
    }
    else{
      h=2
      alpha = Math.PI/2
    }
    radius = radius - (0.0174533/radius)
    console.log(radius);
    alpha = alpha - (0.0174533*30);
    console.log(alpha);
    if(Nodo.left){  
      console.log(Nodo.left);
      Nodo.left.cube.position.x = radius*Math.cos((3*Math.PI-alpha)/2)+Nodo.cube.position.x;
      Nodo.left.cube.position.y = radius*Math.sin((3*Math.PI-alpha)/2)+Nodo.cube.position.y;
      let points = [];
      points.push(new THREE.Vector2(Nodo.left.cube.position.x,Nodo.left.cube.position.y))
      points.push(new THREE.Vector2(Nodo.cube.position.x,Nodo.cube.position.y))
      //console.log(points);
      const materialR = new THREE.MeshBasicMaterial( { color: randomColor, wireframe: true } );
      Nodo.left.cube.material = materialR
      const geometryLine = new THREE.BufferGeometry().setFromPoints( points );
      const line = new THREE.Line( geometryLine, lineMat );
      groupCubes.add(Nodo.left.cube);
      groupLines.add(line)
      points = [];
      //console.log(Nodo.left.cube.position);
      Nodo.left=this.graph(Nodo.left)
    }
    if(Nodo.right){
      radius = radius - (2/radius)
      alpha = alpha - Math.abs(alpha-phi)/phi;
      console.log(Nodo.right);
      groupCubes.add(Nodo.right.cube);
      Nodo.right.cube.position.x = radius*Math.cos((3*Math.PI+alpha)/2)+Nodo.cube.position.x;
      Nodo.right.cube.position.y = radius*Math.sin((3*Math.PI+alpha)/2)+Nodo.cube.position.y;
      let points = [];
      points.push(new THREE.Vector2(Nodo.right.cube.position.x,Nodo.right.cube.position.y))
      points.push(new THREE.Vector2(Nodo.cube.position.x,Nodo.cube.position.y))
      //console.log(points);
      const geometryLine = new THREE.BufferGeometry().setFromPoints( points );
      const line = new THREE.Line( geometryLine, lineMat );
      groupLines.add(line)
      points = [];
      //console.log(Nodo.right.cube.position);
      //console.log(Nodo.right);
      Nodo.right=this.graph(Nodo.right)
    }

    return Nodo
  }
  getHeight(Nodo){
    Nodo.height=0
    var heightRight=0
    var heightLeft=0
    if(Nodo.left){
      heightLeft-=this.getHeight(Nodo.left)
    }
    if(Nodo.right){
      heightRight+=this.getHeight(Nodo.right)
    }
    Nodo.height=heightRight+heightLeft
  
    return Math.max(heightRight, Math.abs(heightLeft))+1
  }
  
  checkBalance(Nodo){
    if(Nodo.left){
      Nodo.left = this.checkBalance(Nodo.left)
    }
    if(Nodo.right){
      Nodo.right=this.checkBalance(Nodo.right)
    }
    this.getHeight(this.root)
    if(Nodo.height>1 || Nodo.height<-1){
      Nodo = this.balancear(Nodo)
      this.getHeight(this.root)
      Nodo=this.checkBalance(Nodo)
      //console.log(Nodo);
      }
      //console.log(this.root);
     return Nodo
  }

}
