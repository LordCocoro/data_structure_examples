let qt;
let count = 0;

function setup() {
    createCanvas(600, 600);


    let boundary = new Rectangle(300, 300, 300, 300);

    qt = new QuadTree(boundary, 4);


   
    background(0);
    qt.show();
}
function drawCircle(){
    for (let i = 0; i <= 2*Math.PI; i += 0.0174533) {
        let p = new Point((200*(Math.cos(i))+300), 200*(Math.sin(i))+300);
        qt.insert(p);
    }
}

function drawLineFromInput(){
    let p1x = parseInt(document.getElementById("p1x").value,10)
    let p1y = parseInt(document.getElementById("p1y").value,10)
    let p2x = parseInt(document.getElementById("p2x").value,10)
    let p2y = parseInt(document.getElementById("p2y").value,10)
    let p1 = new Point(p1x,p1y)
    let p2 = new Point(p2x,p2y)
    drawLine(p1,p2)
}
function drawLine(p1,p2){
    let distance = p1.getDistance(p2)
    let xd = Math.abs(p2.x-p1.x)
    let yd = Math.abs(p2.y-p1.y)
    let xd1 = p2.x-p1.x
    let yd1 = p2.y-p1.y
    let psx =[]
    let psy = []
    console.log(xd);
    console.log(yd);
    if(xd>0 && yd>0){
        for (let i = 0; i <= xd; i+=xd/distance) {
            let xaux = 0
            if(xd1>0)xaux = p1.x + i; else xaux = p1.x - i;
            psx.push(xaux)
        }
        for (let i = 0; i <= yd; i+=yd/distance) {
            let yaux = 0
            if(yd1>0) yaux = p1.y + i; else yaux = p1.y - i
            psy.push(yaux)
        }
        for (let i = 0; i < psx.length; i++) {
            let p = new Point(psx[i],psy[i])
            qt.insert(p);
        }
    }
    else if(xd === 0){
        console.log("xd = 0");
        for (let i = 0; i <= yd; i+=yd/distance) {
            let yaux = 0
            if(yd1>0) yaux = p1.y + i; else yaux = p1.y - i
            psy.push(yaux)
        }
        for (let i = 0; i < psy.length; i++) {
            let p = new Point(p1.x,psy[i])
            qt.insert(p);
        }
    }
    else if(yd === 0){
        console.log("yd = 0");
        for (let i = 0; i <= xd; i+=xd/distance) {
            let xaux = 0
            if(xd1>0)xaux = p1.x + i; else xaux = p1.x - i;
            psx.push(xaux)
        }
        for (let i = 0; i < psx.length; i++) {
            let p = new Point(psx[i],p1.y)
            qt.insert(p);
        }
    }
}
function drawGeometry(){
    let n = parseInt(document.getElementById("geo").value,10)
    if(n>2)
    {let lines = []
    for (let i = Math.PI/4; i <= 2*Math.PI; i += 2*Math.PI/n) {
        let p = new Point((200*(Math.cos(i))+300), 200*(Math.sin(i))+300);
        lines.push(p)
        qt.insert(p);
    }
    for (let i = 0; i < lines.length; i++){
        console.log(lines[i]);
        if(lines[i+1]){
            drawLine(lines[i],lines[i+1])
        }
        else{
            drawLine(lines[0],lines[i])
        }
    }}
    else{
        alert("ingrese un numero mayor a 2")
    }
}
window.onload = function (){
    document.getElementById("btn-draw").addEventListener("click",drawLineFromInput)
    document.getElementById("btn-draw-g").addEventListener("click",drawGeometry)
    document.getElementById("btn-draw-c").addEventListener("click",drawCircle)
}

function draw() {
 
    if ( mouseIsPressed ) {
    for (let i = 0; i < 1; i ++) {
        let m = new Point ( mouseX + random (-5 ,5) , mouseY + random (-5 ,5) );
         qt.insert (m)
    }
    }
    background (0) ;
     qt.show () ;
    
     stroke (0 ,255 ,0) ;
     rectMode ( CENTER );
     let range = new Rectangle ( mouseX ,mouseY ,50 ,50)
     rect ( range.x , range.y , range.w *2 , range.h *2) ;
     let points = [];
     
     qt.query (range , points);
     //console.log(points);
     for (let p of points ){
        strokeWeight (4) ;
        point (p.x , p.y );

    }
    var print = points.map(function(e){
        return '<li>'+e.x+' '+e.y+'</li>'
      })
    document.querySelector("div").innerHTML = JSON.stringify(print)
}

