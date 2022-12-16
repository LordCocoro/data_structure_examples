k = 3;
c = ["XXS","S","M","L","XL","XXL","XXXL"]

 class Node {
 constructor (point , axis){
 this.point = point;
 this.left = null;
 this.right = null;
 this.axis = axis;
 this.visited = false
 }
 }

 function getHeight ( node ) {
    if (node == null)
    return 0;
    return max(1 + getHeight(node.left), 1 + getHeight(node.right))
 }
 function generate_dot ( node ){
    if (node != null) {
		if (node.left != null) {
			console.log("\"" + node.point + "\"" + "->" + "\"" + node.left.point + "\"");
		}
		if (node.right != null) {
			console.log("\"" + node.point + "\"" + "->" + "\"" + node.right.point + "\"");
		}
		generate_dot(node.left);
		generate_dot(node.right);
    }
 }
 function distanceSquared ( point1 , point2 ){
	 var distance = 0;
	 for (var i = 0; i < k; i ++)
	 distance += Math.pow (( point1 [i] - point2 [i]) , 2) ;
	 return Math.sqrt ( distance );
	}


function distanceMinkowski ( point1 , point2,p){
	var distance = 0;
	for (var i = 0; i < k; i ++)
	distance += Math.pow (Math.abs( point1 [i] - point2 [i]) , p) ;
	if(p==0){
		return Math.pow ( distance,p);
	}
	else{
		return Math.pow ( distance,1/p );
	}
	}	



 function closest_interation ( points , point ) {
	 if(points.left &&  point[points.axis]<points.point[points.axis]){
		return closest_point_brute_force ( points.left , point )
	 }
	 else if(points.right && point[points.axis]>points.point[points.axis]){
		return closest_point_brute_force ( points.right , point )
	 }
	 return points
 }

 function closest_point_brute_force(points, point) {
	var PointCe = points[0];
	var DistanceMin = distanceSquared(points[0], point);
	for (var i = 1; i < points.length; i++) {
		var t = distanceSquared(points[i], point);
		if (DistanceMin > t) {
			PointCe = points[i];
			DistanceMin = t;
		}
	}
	return PointCe;
}

 function naive_closest_point (node , point , depth = 0, best = null ) {
    if (node === null)
        return best;
    var axis = depth % k;
    var next_best = null; 
    var next_branch = null; 
    if (best === null || (distanceSquared(best, point) > distanceSquared(node.point, point)))
        next_best = node.point;
    else
        next_best   = best;
    if (point[axis] < node.point[axis])
        next_branch = node.left
    else
        next_branch = node.right
    return  naive_closest_point(next_branch, point, depth +1, next_best);
 }


 function closer_point(point, p1, p2,p) {
	if (p1 == null) {
		return p2;
	}
	if (p2 == null) {
		return p1;
	}
	var d1 = distanceMinkowski(p1.point, point,p);
	var d2 = distanceMinkowski(p2.point, point,p);
	if (d1 < d2)
		return p1;
	else
		return p2
}
function closest_point(node, point,p, depth = 0) {

	if (node === null)
		return null;
	var axis = depth % k;
	var next_branch = null; 
	var opposite_branch = null; 

	if (point[axis] < node.point[axis]) {
		next_branch = node.left;
		opposite_branch = node.right;
	} else {
		next_branch = node.right;
		opposite_branch = node.left;
	}

	
	var best = closer_point(point, node, closest_point(next_branch, point,p, depth + 1),p);

	if (distanceMinkowski(point, best.point,p) > Math.abs(point[axis] - node.point[axis])) {
		best = closer_point(point, best, closest_point(opposite_branch, point,p, depth + 1),p);
	}



	return best;
}
function closest_point_p(node, point, nt_point,p,depth = 0) {

	if (node === null)
		return null;
	var axis = depth % k;
	var next_branch = null; 
	var opposite_branch = null;

	if(node.point.every(function(v,i) { return v === nt_point.point[i] } )){
		node.visited = true
	}

	if(node.visited == false){
	if (point[axis] < node.point[axis]) {
		next_branch = node.left;
		opposite_branch = node.right;
	} else {
		next_branch = node.right;
		opposite_branch = node.left;
	}
	
		var best = closer_point(point, node, closest_point_p(next_branch, point,nt_point,p, depth + 1),p);

		if (distanceMinkowski(point, best.point,p) > Math.abs(point[axis] - node.point[axis])) {
			
			best = closer_point(point, best, closest_point_p(opposite_branch, point,nt_point,p, depth + 1),p);
		}
	}
		return best;
	


}


function knn_feedback_classifier(node, point,n_neighbors=5,p=2){
	let n = node
	let queue = []
	let h = 0
	let nt_point = closest_point(n, point,p)
	let dt = {}
	dt = {
		p: nt_point.point,
		d: distanceMinkowski(point,nt_point.point,p)
	}
	queue.push(dt)
	while(h<n_neighbors-1){
		nt_point = closest_point_p(n, point, nt_point,p)
		
		dt = {
			p: nt_point.point,
			d: distanceMinkowski(point,nt_point.point,p)
		}
		queue.push(dt)
		h++;
	}
	console.log(count_class(queue))
	queue.sort(function(a,b){return a.d - b.d;})
	return queue
}



var pt = 0;
function range_query_circle(node, center, radio, queue,p, depth = 0) {
	if (node == null) {
		return null;
	}
	pt += 1;
	//console.log(p);
	var axis = node.axis;
	var next_branch = null;
	var opposite_branch = null;
	if (center[axis] < node.point[axis]) {
		next_branch = node.left;
		opposite_branch = node.right;
	} else {
		next_branch = node.right;
		opposite_branch = node.left;
	}
	var best = closer_point(center, node, range_query_circle(next_branch, center, radio, queue,p, depth + 1),p);
	if (Math.abs(center[axis] - node.point[axis]) <= radio || distanceMinkowski(center, best.point,p) > Math.abs(center[axis] - node.point[axis])) {
		if (distanceMinkowski(center, node.point,p) <= radio ) {
			var d = {
				p : node.point,
				d : distanceMinkowski(center,node.point,p)
			}
			queue.push(d);
		}
		best = closer_point(center, best, range_query_circle(opposite_branch, center, radio, queue,p, depth + 1),p);
	}
	return best;
}

function knn_parabolic_range(node,point,queue,n_neighbors=5,p=2){
	let h = 1
	let best =closest_point(node, point,p)
	let radio = distanceMinkowski(point,best.point,p)
	let pf = radio/2
	while(queue.length <n_neighbors ){
		queue = []
		range_query_circle(node, point, radio, queue,p)
		radio = Math.sqrt(4*pf*h) // funcion parabolica
		h++;
	}
	queue.sort(function(a,b){return a.d - b.d;})//78
	queue = queue.slice(0,n_neighbors)
	console.log(count_class(queue))

	return queue

}


function count_class(arr){
	let b = []
	c.forEach(e => {
		let count = arr.filter(a => a.p[k] == e).length
		let data ={
			class: e,
			count: count
		}
		b.push(data)
	});
	b.sort(function(a,b){return b.count - a.count;})
	return b[0]
}

 function build_kdtree ( points , depth = 0) {
	var n = points.length;

	//define si es x o y
	var axis = depth % k;

	if (n <= 0) {
		return null;
	}
	if (n == 1) {
		//console.log(points[0]);
		return new Node(points[0], axis)
	}
	// el punto medio del arr points
	var median = Math.floor(points.length / 2);

	//ordena los valores de forma acendente dependiendo el nivel si es x o y
	points.sort(function (a, b) {
		return a[axis] - b[axis];
	});

	//asignamos las mitades a cada 
	var left = points.slice(0, median);
	var right = points.slice(median + 1);
	var node = new Node(points[median].slice(0, k+1), axis,);
	node.left = build_kdtree(left, depth + 1);
	node.right = build_kdtree(right, depth + 1);

	return node;
 }