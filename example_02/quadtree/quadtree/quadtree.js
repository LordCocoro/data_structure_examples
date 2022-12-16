class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

class Rectangle {
    constructor(x, y, w, h) {
        this.x = x; // center
        this.y = y;
        this.w = w; // half width
        this.h = h; // half height

    }

    // verifica si este objeto contiene un objeto Punto
    contains(point) {
        return (point.x >= this.x - this.w &&
            point.x < this.x + this.w &&
            point.y >= this.y - this.h &&
            point.y < this.y + this.h);

    }

    // // verifica si este objeto se intersecta con otro objeto Rectangle
    intersects(range) {
        let A = new Point (range.x - range.w,range.y + range.h)
        let B = new Point (range.x + range.w,range.y + range.h)
        let C = new Point (range.x - range.w,range.y - range.h)
        let D = new Point (range.x + range.w,range.y - range.h)
        if(this.contains(A) || this.contains(B) || this.contains(C) || this.contains(D)){
            return true
        }
        return false
    }
}

class QuadTree {
    constructor(boundary, n) {
        this.boundary = boundary; // Rectangle
        this.capacity = n; // capacidad maxima de cada cuadrante
        this.points = []; // vector , almacena los puntos a almacenar
        this.divided = false;

    }

    subdivide() {
        let x = this.boundary.x;
        console.log(x);
        let y = this.boundary.y;
        console.log(y);
        let w = this.boundary.w;
        console.log(w);
        let h = this.boundary.h;
        console.log(h);
        var qt_northeast = new Rectangle(x + w / 2, y - h / 2, w / 2, h / 2);
        console.log("qt_northeast", qt_northeast)
        var qt_northwest = new Rectangle(x - w / 2, y - h / 2, w / 2, h / 2);
        console.log("qt_northwest", qt_northwest)
        var qt_southeast = new Rectangle(x + w / 2, y + h / 2, w / 2, h / 2);
        console.log("qt_southeast", qt_southeast)
        var qt_southwest = new Rectangle(x - w / 2, y + h / 2, w / 2, h / 2);
        console.log("qt_southwest", qt_southwest)

        this.northeast = new QuadTree(qt_northeast, this.capacity);
        this.northwest = new QuadTree(qt_northwest, this.capacity);
        this.southeast = new QuadTree(qt_southeast, this.capacity);
        this.southwest = new QuadTree(qt_southwest, this.capacity);
        this.divided = true;

        // verifica si el punto hijo contiene al punto y si lo hace lo agrega
        for (let p of this.points) {
            if (qt_northeast.contains(p)) {
                this.northeast.points.push(p);
            }else if (qt_northwest.contains(p)) {
                this.northwest.points.push(p);
            }else if (qt_southeast.contains(p)) {
                this.southeast.points.push(p);
            }else if (qt_southwest.contains(p)) {
                this.southwest.points.push(p);
            }
        }
        this.divided = true;
    }

    insert(point) {
        //console.log("insert", point);
        //si no esta dentro del limite retornamos insercion no dada
        if (!this.boundary.contains(point)) {
            return false;
        }
        //si estamos dentro de la capacidad insertamos e insercion hecha
        if (this.points.length < this.capacity) {
            console.log("this.points.length", this.points.length)
            this.points.push(point);
            return true;
        } else {
            if (!this.divided) {
                this.subdivide();
                this.divided = true;
            }
            if (this.northeast.insert(point)) {
                return true;
            } else if (this.northwest.insert(point)) {
                return true;
            } else if (this.southeast.insert(point)) {
                return true;
            } else if (this.southwest.insert(point)) {
                return true;
            }
        }
    }
    query(range,points){
        
        this.points.forEach(p => {
            if(range.contains(p)){
                points.push(p) 
            }
        });
        if(this.divided){
            this.northeast.query(range,points);
            this.northwest.query(range,points);
            this.southeast.query(range,points);
            this.southwest.query(range,points);
        }
    }
    show() {
        stroke(255);
        strokeWeight(1);
        noFill();
        rectMode(CENTER);
        rect(this.boundary.x, this.boundary.y, this.boundary.w * 2, this.boundary.h * 2);
        if (this.divided) {
            this.northeast.show();
            this.northwest.show();
            this.southeast.show();
            this.southwest.show();
        }

        for (let p of this.points) {
            stroke(255);
            strokeWeight(4);
            point(p.x, p.y);
        }
    }
}
