var crystNeeded = {
		Black : {'T1': 0, 'T2':0, 'T3':0, 'T4':0, 'T5':0},
		Green : {'T1': 0, 'T2':0, 'T3':0, 'T4':0, 'T5':0},
		White : {'T1': 0, 'T2':0, 'T3':0, 'T4':0, 'T5':0},
		Guard : {'T1': 0, 'T2':0, 'T3':0, 'T4':0, 'T5':0},
		Power : {'T1': 0, 'T2':0, 'T3':0, 'T4':0, 'T5':0},
		Tech : {'T1': 0, 'T2':0, 'T3':0, 'T4':0, 'T5':0},
		Healing : {'T1': 0, 'T2':0, 'T3':0, 'T4':0, 'T5':0},
		Support : {'T1': 0, 'T2':0, 'T3':0, 'T4':0, 'T5':0}
	};
	
var savedUnits = [];

var myJson;

$(document).ready(function() {
    // all custom jQuery will go here
	loadData();

		
	$('input[type=number]').on('input', function() {
		saveData(this.id);
		//recalculate deficit
			//get rowIndex
			//get columnIndex
			//get Type
			//recalculate
			//update
			
	});
	$('input')
		.button()
		.css({
			'height':'10px',
			'width' :'70px'
		});
	
	var $select = $('#unitselect');
	var $ablSelect = $('#abilityselect');
	$.getJSON('./jsondata/data.json', function(json) {
		myJson = json;
		
		$.each(myJson, function(i, val){
			$select.append($('<option />', { value: (i+1), text: val.name }));
		});
	});

	var index;
	var ablIndex;
	
	
	
	
	$select.on('selectmenuchange', function() {
		var unit = $(this).val();
		var $ablSelect = $('#abilityselect');
		$('#abilityselect').find('option').remove().end();
		$('#abilityselect').selectmenu('destroy').selectmenu({ style: 'dropdown' });
		var options = [];

		index = $('option:selected',this).index();
		if (index == 0) {
			return;
		}
		var abilities = myJson[index-1].ability;
		$.each(abilities, function(i, val){
			options.push("<option value='" + (i+1) + "'>" + val.name +"</option>");
		});
		$ablSelect.append(options.join('')).selectmenu();
		$ablSelect.selectmenu('enable');
	});
	
	$('#addbtn').click(function(){
		ablIndex = $('#abilityselect option:selected').index();
		var ability = myJson[index-1].ability[ablIndex];		

		var rowInfo = {};
		rowInfo.name = myJson[index-1].name;
		rowInfo.ability = ability;
		addUnitRow(rowInfo);

		var unitInfo = {};	
		unitInfo.unitIndex = index-1;
		unitInfo.abilityIndex = ablIndex;
		savedUnits.push(unitInfo);
		saveUnits();
	});
	
	$(document).on("click", ".rmvbtn", function() {
		var rowIdx = $(this).closest('tr').index();
		var row = $(this).parents('tr');
		
		var ability = {};
		ability.type = row[0].children[2].innerText;
		ability.T1 = row[0].children[3].innerText;
		ability.T2 = row[0].children[4].innerText;
		ability.T3 = row[0].children[5].innerText;
		ability.T4 = row[0].children[6].innerText;
		ability.T5 = row[0].children[7].innerText;
		
		
		calcMats(ability, false);
		updateTable();
		row.remove();
		savedUnits.splice(rowIdx, 1);
		saveUnits();
	});
	
	$(document).on("click", ".awknbtn", function() {
		//adjust inventory 
		$(this).parents("tr").remove();
	});
});

function addUnitRow(rowInfo) {	
	$('.cost table tbody')
		.append($('<tr />')
			.append($('<td />', {text: rowInfo.name}))
			.append($('<td />', {text: rowInfo.ability.name}))
			.append($('<td />', {text: rowInfo.ability.type}))
			.append($('<td />', {text: rowInfo.ability.T1}))
			.append($('<td />', {text: rowInfo.ability.T2}))
			.append($('<td />', {text: rowInfo.ability.T3}))
			.append($('<td />', {text: rowInfo.ability.T4}))
			.append($('<td />', {text: rowInfo.ability.T5}))
			.append($('<button />', {class:'awknbtn ui-button ui-widget ui-corner-all', text:'Awaken'}))
			.append($('<button />', {class:'rmvbtn ui-button ui-widget ui-corner-all', text:'Remove'}))				
		);
	calcMats(rowInfo.ability, true);
	updateTable();
}

function saveUnits() {
		var savedUnitsJSON = JSON.stringify(savedUnits)
		localStorage.setItem('savedUnits', savedUnitsJSON);
}

function saveData(cellId) {
	var input = $('#'+cellId).val();
	var itemName = 'ffbeEnhanceMats-' + cellId;
	localStorage.setItem(itemName, input);
}

function loadData() {
	for (var i in localStorage) 
	{
		if (i == 'savedUnits') {
			var units = JSON.parse(localStorage[i]);
			$.each(units, function(i, unit) {
				savedUnits.push(unit);
				var unitIndex = unit.unitIndex;
				var abilityIndex = unit.abilityIndex;
				var rowInfo = {};
				rowInfo.name = myJson[unitIndex].name;
				rowInfo.ability = myJson[unitIndex].ability[abilityIndex];
				addUnitRow(rowInfo);
			});
		}
		else {
			var cellId = i.slice(16)
			$('#'+cellId).val(localStorage[i]);
			//console.log(cellId);
			//console.log(localStorage[i]);
		}
	}
}

function calcMats(ability, isAdd) {
	if (isAdd) {
		crystNeeded[ability.type].T1 = +crystNeeded[ability.type].T1 + +ability.T1;
		crystNeeded[ability.type].T2 = +crystNeeded[ability.type].T2 + +ability.T2;
		crystNeeded[ability.type].T3 = +crystNeeded[ability.type].T3 + +ability.T3;
		crystNeeded[ability.type].T4 = +crystNeeded[ability.type].T4 + +ability.T4;
		crystNeeded[ability.type].T5 = +crystNeeded[ability.type].T5 + +ability.T5;
	}
	else {
		crystNeeded[ability.type].T1 = +crystNeeded[ability.type].T1 - +ability.T1;
		crystNeeded[ability.type].T2 = +crystNeeded[ability.type].T2 - +ability.T2;
		crystNeeded[ability.type].T3 = +crystNeeded[ability.type].T3 - +ability.T3;
		crystNeeded[ability.type].T4 = +crystNeeded[ability.type].T4 - +ability.T4;
		crystNeeded[ability.type].T5 = +crystNeeded[ability.type].T5 - +ability.T5;	
	}
	
}

function updateTable() {
	$.each(crystNeeded, function(i, val) {
		var type = i;
		var id1 = type.slice(0,2);
		var id2 = type.slice(0,3);
		$.each(val, function(j, cryst) {
			console.log(j);
			var cell1 = (id1 + j).toLowerCase();
			var cell2 = (id2 + j).toLowerCase();
			var value1 = $('#'+cell1).val();
			var value2 = +cryst - +value1;
			
			if (value2 > 0) {
				$('#'+cell2).css('color','red');
				$('#'+cell2).val(value2);
			}
			else {
				$('#'+cell2).css('color','green');
				$('#'+cell2).val(0);
			}
		});
	});
}