let root = null;
let controlDiv;
let controlBar;
let insertForm;
let insertButton;
let deleteForm;
let deleteButton;
let searchForm;
let searchButton;
let minimumButton;
let maximumButton;
let showButton;
let value;
let BST;
let delay = 1000;
let msg = "";

class Node
{
    constructor(data, parent)
    {
        this.data = data;
        this.left = null;
        this.right = null;
        this.height = 0;
        this.location = null;
        this.parent = parent;
        this.x = windowWidth / 2;
        this.y = windowHeight / 6;
        this.activo = false;
    }
}



    
//right rotate
function rightRotate(y){
    let x = y.left;
    let T2 = x.right;
    x.right = y;
    y.left = T2;
    y.height = Math.max(getAltura(y.left), getAltura(y.right)) + 1;
    x.height = Math.max(getAltura(x.left), getAltura(x.right)) + 1;
    return x;
}
    
//left rotate
function leftRotate(x) {
    let y = x.right;
    let T2 = y.left;
    y.left = x;
    x.right = T2;
    x.height = Math.max(getAltura(x.left), getAltura(x.right)) + 1;
    y.height = Math.max(getAltura(y.left), getAltura(y.right)) + 1;
    return y;
}
    
// get balance factor of a node
function getBalanceFactor(N){
    if (N == null){
        return 0;
    }
    
    return getAltura(N.left) - getAltura(N.right);
}
    
    
// helper function to insert a node
function insertNodeHelper(node, item){
  
    // find the position and insert the node
    if (node === null){
        node = newNode(item);
        node.location = "root";
        root = node;
    }
    
    if (item < node.data){
        node.left = insertNodeHelper(node.left, item);
        node.left.location = 'left';
    }else if (item > node.data){
        node.right = insertNodeHelper(node.right, item);
        node.right.location = 'right';
    }else{
        return node;
    }
    
    // update the balance factor of each node
    // and, balance the tree
    node.height = 1 + Math.max(getAltura(node.left), getAltura(node.right));
    
    let balanceFactor = getBalanceFactor(node);
    
    if (balanceFactor > 1) {
        if (item < node.left.data) {
            return rightRotate(node);
        } else if (item > node.left.data) {
            node.left = leftRotate(node.left);
            node.left.location = 'left';
            return rightRotate(node);
        }
    }
    
    if (balanceFactor < -1) {
        if (item > node.right.data) {
            return leftRotate(node);
        } else if (item < node.right.data) {
            node.right = rightRotate(node.right);
            node.right.location = 'right';
            return leftRotate(node);
        }
    }

    actualizarPosiciones(node);
    
    return node;
}
    
// insert a node
function insertNode(){
    // console.log(root);
    value = parseInt(insertForm.value(), 10);
    root = insertNodeHelper(root, value);
}
    
//get node with minimum value
function nodeWithMimumValue(node){
    let current = node;
    while (current.left !== null){
        current = current.left;
    }
    return current;
}
    
    // delete helper
function deleteNodeHelper(root, item){
  
    // find the node to be deleted and remove it
    if (root == null){
        return root;
    }
    if (item < root.data){
        root.left = deleteNodeHelper(root.left, item);
    }else if (item > root.data){
        root.right = deleteNodeHelper(root.right, item);
    }else {
        if ((root.left === null) || (root.right === null)) {
            let temp = null;
            if (temp == root.left){
                temp = root.right;
            }else{
                temp = root.left;
            }
            
            if (temp == null) {
                temp = root;
                root = null;
            } else{
                root = temp;
            }
        } else {
            let temp = nodeWithMimumValue(root.right);
            root.data = temp.data;
            root.right = deleteNodeHelper(root.right, temp.data);
        }
    }
    if (root == null){
        return root;
    }

    // Update the balance factor of each node and balance the tree
    root.height = Math.max(getAltura(root.left), getAltura(root.right)) + 1;
    
    let balanceFactor = getBalanceFactor(root);
    if (balanceFactor > 1) {
        if (getBalanceFactor(root.left) >= 0) {
            return rightRotate(root);
        } else {
            root.left = leftRotate(root.left);
            return rightRotate(root);
        }
    }
    if (balanceFactor < -1) {
        if (getBalanceFactor(root.right) <= 0) {
            return leftRotate(root);
        } else {
            root.right = rightRotate(root.right);
            return leftRotate(root);
        }
    }
    return root;
}
    
//delete a node
function deleteNode(item){
    root = deleteNodeHelper(root, item);
}
    
    // print the tree in pre - order
function preOrder(){
    preOrderHelper(root);
}
    
function preOrderHelper(node){
    if (node) {
        console.log(node.data);
        preOrderHelper(node.left);
        preOrderHelper(node.right);
    }
}

function setup() {
    controlDiv = createDiv();
    controlDiv.parent('mainContent');
    controlDiv.id('controlSection');
    controlBar = createElement('table');
    controlDiv.child(controlBar);
    insertForm = addControls('Input', '', '');
    insertButton = addControls('Button', 'Insertar', insertNode);
    /*deleteForm = addControls('Input', '', '');
    deleteButton = addControls('Button', 'Eliminar', eliminar);
    searchForm = addControls('Input', '', '');
    searchButton = addControls('Button', 'Buscar', buscar);
    minimumButton = addControls('Button', 'Mínimo', minimo);
    maximumButton = addControls('Button', 'Máximo', maximo);*/
    showButton = addControls('Button', 'Imprimir Arbol', preOrder);

    const canvas = createCanvas(1024, 500);
    canvas.parent('mainContent');
    textSize(16);
}

function draw() {
    background('white');
    displayNode(root);
    fill('black');
    textAlign(LEFT);
    text(msg, 30, 50);
}


function newNode(item) 
{ 
    var temp = new Node(); 
    temp.data = item; 
    temp.left = null;
    temp.right = null; 
    temp.parent = null; 
    return temp; 
} 



//Funcion para añadir elementos del formulario al canvas
function addControls(type, name, onClick) {
    let element;
    switch (type) {
      case 'Input':
        element = createInput();
        element.size(100);
        element.addClass('form-control');
        break;
      case 'Button':
        element = createButton(name);
        element.mousePressed(onClick);
        element.addClass('btn btn-info me-5');
        break;
      case 'Label':
        element = createP(name);
        element.class('control-label');
        break;
      default: break;
    }
    const tableEntry = createElement('td');
    tableEntry.child(element);
    controlBar.child(tableEntry);
    return element;
}

//Dibuja un nodo en canvas
function displayNode(curr) {
    var position = 0;

    if (curr != null) {
        ellipseMode(CENTER);
        textAlign(CENTER);
        stroke('black');
        strokeWeight(3);
        if (curr.left != null){
            line(curr.x, curr.y, curr.left.x, curr.left.y);
        }

        if (curr.right != null){
            line(curr.x, curr.y, curr.right.x, curr.right.y);
        }
        noStroke();
        fill('red');
        if (curr.activo) ellipse(curr.x, curr.y, 40, 40);
        fill(166, 230, 255);
        ellipse(curr.x, curr.y, 30, 30);
        fill('black');
        text(curr.data, curr.x, curr.y + 5);
        displayNode(curr.left);
        displayNode(curr.right);
    }
}

//Obtiene altura de un nodo
function getAltura(node) {
    if (node == null) return 0;
    //console.log(node.height);
    return node.height;
  }
  

// Se mueven las posiciones en el canvas, (2^(altura del nodo actual + 1)) * 15
function actualizarPosiciones(node) {
    if (node != null) {
        if (node.location === 'left'){
            node.x = node.parent.x - ((2 ** (getAltura(node.right) + 1)) * 15);

        }else if (node.location === 'right'){
            node.x = node.parent.x + ((2 ** (getAltura(node.left) + 1)) * 15);

        }else if (node.location === 'root') {
            node.x = windowWidth / 2;
            node.y = 50;
        }

        if (node.parent != null){
            node.y = node.parent.y + 40;
        }
        if (node.left != null){
            node.left.parent = node; 
        }
        if (node.right != null){
            node.right.parent = node;
        }
        actualizarPosiciones(node.left);
        actualizarPosiciones(node.right);
    }
}

// Desactiva todos los nodos
function desactivarNodos(node) {
    if (node !== null) {
      node.activo = false;
      desactivarNodos(node.left);
      desactivarNodos(node.right);
    }
}

//Establece un delay entre cada paso
function sleep(ms) {
    console.log("llama sleep");
    const start = Date.now();
    while (Date.now() < start + ms);
}

//return height of the node
function height(N){
    if (N === null){
    return 0;
    }
    
    return N.height;
}