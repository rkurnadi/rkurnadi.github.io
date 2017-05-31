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
	
	var $select = $('#unitselect');
	
	$.getJSON("./jsondata/data.json", function(json) {
		myJson = json;
		
		$.each(myJson, function(i, val){
			$select.append($('<option />', { value: (i+1), text: val.name }));
		});
	});

	
	var index;
	var ablIndex;
	
	$select.change(function() {
		var unit = $(this).val();
		var $ablSelect = $('#abilityselect');
		$ablSelect.empty();
		index = $('option:selected',this).index();
		var abilities = myJson[index-1].ability;
		$.each(abilities, function(i, val){
			$ablSelect.append($('<option />', { value: (i+1), text: val.name }));
		});		
	});
	
	$('#addbtn').click(function() {
		ablIndex = $('#abilityselect option:selected').index();
		var ability = myJson[index-1].ability[ablIndex];
		$('.cost table tbody')
			.append($('<tr />')
				.append($('<td />', {id:'a', text: ability.type}))
				.append($('<td />', {id:'b', text: ability.T1}))
				.append($('<td />', {text: ability.T2}))
				.append($('<td />', {text: ability.T3}))
				.append($('<td />', {text: ability.T4}))
				.append($('<td />', {text: ability.T5}))
				.append($('<input />', {type: 'button', class:'awknbtn', value:'Awaken'}))
				.append($('<input />', {type: 'button', class:'rmvbtn', value:'Remove'}))				
				);
	});
	
	$(document).on("click", ".rmvbtn", function() {
		$(this).parents("tr").remove();
	});
	
	$(document).on("click", ".awknbtn", function() {
		//adjust inventory 
		$(this).parents("tr").remove();
	});
});

function saveData(cellId) {
	var input = $('#'+cellId).val();
	var itemName = 'ffbeEnhanceMats-' + cellId;
	localStorage.setItem(itemName, input);
}

function loadData() {
	for (var i in localStorage) 
	{
		var cellId = i.slice(16)
		$('#'+cellId).val(localStorage[i]);
		//console.log(cellId);
		//console.log(localStorage[i]);
	}
}

function calcMats(ability) {
	
}