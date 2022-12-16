function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}
	var dataJSON = []
	var data = []
	var pivots = []
	readTextFile("./data.json", function(txt){
		var datas = JSON.parse(txt);
		
		//console.log(data);
		dataJSON=(datas)
		dataJSON.forEach(e => {
			if(e.age==null || e.height==null ){
				pivots.push(e)
			}	
			else{
				data.push ([e.age,e.height,e.weight,e.size]);
			}			
		});

		var pon=[25,171,73];
		var n_n = 5
		var root = build_kdtree(data);

		console.log(root);
		console.log("////////////KNN_FEEDBACK_CLASSIFIER/////////////");
		console.log(pon);
		console.log("Hamming");
		console.log(closest_point(root,pon,0).point);
		console.log(knn_feedback_classifier(root,pon,n_n,0));
		console.log("Invert");
		console.log(closest_point(root,pon,0.7).point);
		console.log(knn_feedback_classifier(root,pon,n_n,0.7));
		console.log("Manhattan");
		console.log(closest_point(root,pon,1).point);
		console.log(knn_feedback_classifier(root,pon,n_n,1));
		console.log("Euclidian");
		console.log(closest_point(root,pon,2).point);
		console.log(knn_feedback_classifier(root,pon,n_n,2));

		var q2=[];

		console.log("////////////KNN_PARABOLIC_RANGE/////////////");
		console.log("Hamming");
		console.log(closest_point(root,pon,0).point);
		console.log(knn_parabolic_range(root,pon,q2,n_n,0));
		console.log("Invert");
		console.log(closest_point(root,pon,0.7).point);
		console.log(knn_parabolic_range(root,pon,q2,n_n,0.7));
		console.log("Manhattan");
		console.log(closest_point(root,pon,1).point);
		console.log(knn_parabolic_range(root,pon,q2,n_n,1));
		console.log("Euclidian");
		console.log(closest_point(root,pon,2).point);
		console.log(knn_parabolic_range(root,pon,q2,n_n,2));

})


