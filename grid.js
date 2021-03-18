beginGrid();

function genGridData() {
	var data = new Array();
	var xpos = 1; //starting xpos and ypos at 1 so the stroke will show when we make the grid below
	var ypos = 1;
	var width = 80;
	var height = 30;
	var click = 0;
	
	// iterate for rows	
	for (var row = 0; row < 50; row++) {
		data.push( new Array() );
		
		// iterate for cells/columns inside rows
		for (var column = 0; column < 50; column++) {
			data[row].push({
				x: xpos,
				y: ypos,
				width: width,
				height: height,
				click: click
			})
			// increment the x position. I.e. move it over by 50 (width variable)
			xpos += width;
		}
		// reset the x position after a row is complete
		xpos = 1;
		// increment the y position for the next row. Move it down 50 (height variable)
		ypos += height;	
	}
	return data;
}

var grids = new Array();

var copiedPattern = new Array();

function copyPattern(grid){
	copiedPattern = [];
	$("#"+grid+" svg .row rect").each(function(){
		if($(this).attr("id") == "c0"){
			copiedPattern.push(5)
		}
		else if($(this).attr("id") == "c1"){
			copiedPattern.push(1)
		}
		else if($(this).attr("id") == "c2"){
			copiedPattern.push(2)
		}
		else if($(this).attr("id") == "c3"){
			copiedPattern.push(0)
		}
		else if($(this).attr("id") == "c4"){
			copiedPattern.push(3)
		}
	})
	console.log(copiedPattern);
}

function pastePattern(grid){
	var counter = 0;
	$("#"+grid+" svg .row rect").each(function(){
		if(copiedPattern[counter] == 5){
			$(this).attr("id","c0");
			$(this).css("fill","#fff");
			counter+= 1;
		}
		else if(copiedPattern[counter] == 1){
			$(this).attr("id","c1");
			$(this).css("fill","#2C93E8");
			counter += 1;
		}
		else if(copiedPattern[counter] == 2){
			$(this).attr("id","c2");
			$(this).css("fill","#F56C4E");
			counter += 1;
		}
		else if(copiedPattern[counter] == 0){
			$(this).attr("id","c3");
			$(this).css("fill","#838690");
			counter += 1;
		}
		else if(copiedPattern[counter] == 3){
			$(this).attr("id","c4");
			$(this).css("fill","#0f0");
			counter += 1;
		}
	})
}

function clearGrid(grid){
	$("#"+grid+" svg .row rect").each(function(){
		$(this).attr("id","c0");
		$(this).css("fill","#fff");
	})
}

function beginGrid(){
	grids = [];
	for(var i=0; i< counter_check; i++){
		grids.push(genGridData());
	}
	drawGrids();
}

function clearGrids(){
	$("#grid_holder").html = "";
}

function drawGrids(){

	for(var g = 0; g < grids.length; g++){
		var gridData = grids[g];
		console.log(gridData);
		copyPattern("grid0");
		if (document.getElementById("grid"+g).getElementsByTagName('svg').length) {
			console.log('test1 has svg');
		}
		else{
			document.getElementById("grid"+g).innerHTML = "";
			document.getElementById("grid"+g).innerHTML = "<label>Level "+g+" : </label><button style=\"float:right\" onclick=\"clearGrid('grid"+g+"')\">Clear</button><button style=\"float:right\" onclick=\"pastePattern('grid"+g+"')\">Paste</button><button style=\"float:right\" onclick=\"copyPattern('grid"+g+"')\">Copy</button>"

		var grid = d3.select("#grid"+g).append("svg").attr("width","300%").attr("height","200%");
		var id = "grid"+g
		if(id == "grid0"){
		}
		else{
			$("#grid"+g+" label").css("display","none");
			grid.attr("display","none");
		}

		var row = grid.selectAll(".row")
		.data(gridData)
		.enter().append("g")
		.attr("class", "row");

		var column = row.selectAll(".square")
		.data(function(d) { return d; })
		.enter().append("rect")
		.attr("class","square")
		.attr("x", function(d) { return d.x; })
		.attr("y", function(d) { return d.y; })
		.attr("width", function(d) { return d.width; })
		.attr("height", function(d) { return d.height; })
		.style("fill", "#fff")
		.style("stroke", "#222")
		.attr("id","c0")
		.on('click', function(d) {
		   d.click ++;
		   if ((d.click)%5 == 0 ) { d3.select(this).style("fill","#fff").attr("id","c0"); }
		   if ((d.click)%5 == 1 ) { d3.select(this).style("fill","#2C93E8").attr("id","c1"); }
		   if ((d.click)%5 == 2 ) { d3.select(this).style("fill","#F56C4E").attr("id","c2"); }
		   if ((d.click)%5 == 3 ) { d3.select(this).style("fill","#838690").attr("id","c3"); }
		   if ((d.click)%5 == 4 ) { d3.select(this).style("fill","#0f0").attr("id","c4"); }
		});
		}
		pastePattern(id);
	}
}

	function generateModule(){

		reload();
		console.log("Test Generate Module")
		console.log(grids);

		// console.log(grids);
		var types = [];
		var levels_values = [];

        $("#levelsForm div").each(function() {
          types.push($(this).find("select.fieldtype").first().val())
		});
		var lvls = [];
		console.log(types);

		var grid_length = 0;
		$("svg").each(function(){
			grid_length += 1;
		})

		for(var t=0;t<grid_length;t++){
			lvls.push(types[t+1])
		}

		var levels_all = lvls.join()
		
		console.log(levels_all);
        // var bots = document.getElementById("bots").value;

		for(var c = 0; c < grid_length; c++){

			var array = [];
			var rowCount = 0;
			$("#grid"+c+" svg .row").each(function(){
				rowCount = rowCount + 1;
			});

			var colCount = 0;
			$("#grid"+c+" svg .row rect").each(function(){
				colCount = colCount + 1;
			})

			var cols = colCount / rowCount;

			console.log(rowCount)
			console.log(cols)

			$("#grid"+c+" svg .row rect").each(function(){
				if($(this).attr("id") == "c0"){
					array.push(5)
				}
				else if($(this).attr("id") == "c1"){
					array.push(1)
				}
				else if($(this).attr("id") == "c2"){
					array.push(2)
				}
				else if($(this).attr("id") == "c3"){
					array.push(0)
				}
				else if($(this).attr("id") == "c4"){
					array.push(3)
				}
			})

			var counter = 0;
			var values = [];
			array.forEach(a => {
				if(counter < 50){
					values.push(a)
					counter = counter + 1
				}
				else{
					values.push('|')
					values.push(a)
					counter = 1
				}
			})
			var res = values.join()
			var shape = res.replaceAll(",|,", "|");
			console.log(shape);

			levels_values.push(shape)
			levels_values.push("_")
		}

		var lvl_vals = levels_values.join().replaceAll(",_,","_").replaceAll(",_","");
		var value = levels_all+"_"+lvl_vals;
		console.log(value);

		unityInstance.SendMessage("JavascriptHook", "GenerateModule", value);
		unityInstance.SendMessage("JavascriptHook", "uploadBOQ");
	  }
	  
	  function reload(){
		unityInstance.SendMessage("JavascriptHook", "clearReload");
	  }

	  function toogleCover(){
		unityInstance.SendMessage("JavascriptHook", "ToogleCover");
	  }
