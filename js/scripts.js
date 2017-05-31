$(document).ready(function() {
    // all custom jQuery will go here	
	loadData();
	var myJson;
		
	$(":input").on("input", function() {
		//var name = this.id;
		//var value = $("#"+name).val();
		//alert("Hello " + this.id + " " + value);
		saveData(this.id);
	});
	
	$.getJSON("./jsondata/data.json", function(json) {
		myJson = json;
		});
});

function saveData(cellId) {
	var input = $("#"+cellId).val();
	var itemName = "ffbeEnhanceMats-" + cellId;
	localStorage.setItem(itemName, input);
}

function loadData() {
	for (var i in localStorage) 
	{
		var cellId = i.slice(16)
		$("#"+cellId).val(localStorage[i]);
		//console.log(cellId);
		//console.log(localStorage[i]);
	}
}