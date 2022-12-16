
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