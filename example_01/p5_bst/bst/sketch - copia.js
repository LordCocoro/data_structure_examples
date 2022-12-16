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

function setup() {
    controlDiv = createDiv();
    controlDiv.parent('mainContent');
    controlDiv.id('controlSection');
    controlBar = createElement('table');
    controlDiv.child(controlBar);
    insertForm = addControls('Input', '', '');
    insertButton = addControls('Button', 'Insertar', insertar);
    deleteForm = addControls('Input', '', '');
    deleteButton = addControls('Button', 'Eliminar', eliminar);
    searchForm = addControls('Input', '', '');
    searchButton = addControls('Button', 'Buscar', buscar);
    minimumButton = addControls('Button', 'Mínimo', minimo);
    maximumButton = addControls('Button', 'Máximo', maximo);
    //showButton = addControls('Button', 'Imprimir Arbol', imprimirArbol);

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

//Funcion para insertar un nuevo elemento
function insertar(){
    data = parseInt(insertForm.value(), 10);
    insertForm.value('');
    //Si el arbol está vacío agregamos el nuevo nodo directamente
    if(root === null){
        node = newNode(data);
        node.location = "root";
        root = node;
    }else{
        insertarNodo(root, data);
    }
}

function insertarNodo(node, key){
    
    // Si el arbol está vacío, retorna un nuevo nodo.
    if (node == null) return newNode(key); 

    console.log(node.data+" "+node.activo);
    
    // Si el árbol no está vacío, recorremos
    if (key < node.data){
        var lchild = insertarNodo(node.left, key); 
        node.left = lchild;
        lchild.location = 'left';

        // Definimos el padre del subnodo izquierdo
        lchild.parent = node;
        
    }else if (key > node.data){
        var rchild = insertarNodo(node.right, key); 
        node.right = rchild;
        rchild.location = 'right';

        // Definimos el padre del subnodo derecho
        rchild.parent = node; 
    }
    
    node.height = Math.max(getAltura(node.left), getAltura(node.right)) + 1; 
    actualizarPosiciones(root);

    return node; 
}


//Funcion para eliminar un elemento
function eliminar(){
    data = parseInt(deleteForm.value(), 10);
    deleteForm.value('');
    root = eliminarNodo(root, data);
}

function eliminarNodo(node, key)
{
          
    if(node === null)
        return null;
    else if(key < node.data){
        node.left = eliminarNodo(node.left, key);
        return node;
    }else if(key > node.data){
        node.right = eliminarNodo(node.right, key);
        return node;
    }else{
        if(node.left === null && node.right === null)
        {
            node = null;
            return node;
        }
  
        if(node.left === null)
        {
            node = node.right;
            return node;
        }
          
        else if(node.right === null)
        {
            node = node.left;
            return node;
        }
        var aux = findMinNode(node.right);
        node.data = aux.data;
  
        node.right = eliminarNodo(node.right, aux.data);
        
        actualizarPosiciones(node);
        return node;
    }
  
}

function findMinNode(node)
{
    if(node.left === null)
        return node;
    else
        return findMinNode(node.left);
}

//Funcion para buscar un elemento
function buscar(){
    data = parseInt(searchForm.value(), 10);
    searchForm.value('');
    busquedaIterativa(root, data);
    //desactivarNodos(root);
}

function busquedaIterativa(node, key){
    while (node != null) {
        if (key > node.data){
            node = node.right;
        }else if (key < node.data){
            node = node.left;
        }else{
            msg = "Encontrado!";
            return true;
        }
    }
    msg = "No Existe!";
    return false;
}

//Funcion para hallar el elemento mínimo
function minimo(){
    if (root === null) {
        msg = "Árbol vacío!";
        return false;
    }

    let currNode = root;

    while (currNode.left !== null) {
        currNode = currNode.left;
    }
    msg = "El valor mínimo es: "+currNode.data;
    return currNode.data;
}


//Funcion para hallar el elemento máximo
function maximo(){
    if (root === null) {
        msg = "Árbol vacío!";
        return false;
    }

    let currNode = root;
    
    while (currNode.right !== null) {
        currNode = currNode.right;
    }

    msg = "El valor máximo es: "+currNode.data;
    return currNode.data;
  
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

