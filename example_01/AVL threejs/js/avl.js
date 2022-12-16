

tree = new ArbolBinario()

for (let i = 0; i < 200 ; i++) {
    let vrand  = Math.floor(Math.random()*101)
    tree.add(vrand)
}
// tree.add(100)
// tree.add(1)
setTimeout(()=> tree.getGraph(tree.root),1000)

function add(){
    key = document.getElementById("agregar").value
    newint = parseInt(key)
    tree.add(newint)
    console.log(tree);
    tree.root
    tree.getGraph(tree.root)
    //tree.add(key)
}

function eliminar(){
    key = document.getElementById("agregar").value
    newint = parseInt(key)
    tree.deleted(newint)
    console.log(tree);
    tree.root
    tree.getGraph(tree.root)
    //tree.add(key)
}

function getMax(){
    var dat = tree.getMax(tree.root)
    console.log(dat);
    document.getElementById("mostrar").value = tree.getMax(tree.root)
}

function getMin(){  
    var dat2 = tree.getMin(tree.root)
    console.log(dat2);
    document.getElementById("mostrar").value = tree.getMin(tree.root)
}
window.onload = function (){
    document.getElementById("btn-add").addEventListener("click",add)
    document.getElementById("btn-del").addEventListener("click",eliminar)
    document.getElementById("btn-max").addEventListener("click",getMax)
    document.getElementById("btn-min").addEventListener("click",getMin)
}

