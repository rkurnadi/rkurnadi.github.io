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
		

	var $select = $('#unitselect');
	$.each(myJson, function(i, val){
		$select.append($('<option />', { value: (i+1), text: val[i+1].name }));
	});
	
	$select.change(function() {
		var unit = $(this).val();
		var $abilities = $("#abilityselect");
		var index = $('option:selected',this).index();
		var abilities = myJson[index].ability;
		$.each(abilities, function(i, val){
			$abilities.append($('<option />', { value: (i+1), text: val[i+1].name }));
		});		
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