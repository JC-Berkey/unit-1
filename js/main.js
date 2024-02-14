//function to create a table with cities and their populations
function cities(){
    //define two arrays for cities and population
    var cityPop = [
        { 
            city: 'Madison',
            population: 233209
        },
        {
            city: 'Milwaukee',
            population: 594833
        },
        {
            city: 'Green Bay',
            population: 104057
        },
        {
            city: 'Superior',
            population: 27244
        }
    ];

    //append the table element to the div
    $("#mydiv").append("<table>");

    //append a header row to the table
    $("table").append("<tr>");

    //add the "City" and "Population" columns to the header row
    $("tr").append("<th>City</th><th>Population</th>");

    //loop to add a new row for each city
    for (var i = 0; i < cityPop.length; i++){
        //assign longer html strings to a variable
        var rowHtml = "<tr><td>" + cityPop[i].city + "</td><td>" + cityPop[i].population + "</td></tr>";
        //add the row's html string to the table
        $("table").append(rowHtml);
    };
    addColumns(cityPop);
    addEvents();
    debugAjax();
};
// this function adds the City Size Column
function addColumns(cityPop){
    
    $('tr').each(function(i){

    	if (i == 0){
            //first time through it adds the City Size title
    		$(this).append('<th>City Size</th>');
    	} else {
            //determines whether city is Small, Medium, or Large
    		var citySize;

    		if (cityPop[i-1].population < 100000){
    			citySize = 'Small';

    		} else if (cityPop[i-1].population < 500000){
    			citysize = 'Medium';

    		} else {
    			citySize = 'Large';
    		};
            //appends the city size to the table
    		$(this).append('<td' + citySize + '</td>');
    	};
    });
};
// This function handles user events
function addEvents(){

	$('table').mouseover(function() {
		
		var color = "rgb(";
        //this for loop makes a random RGB color when the mouse
        //is over
		for (var i=0; i<3; i++){

			var random = Math.round(Math.random() * 255);

			color += random;

			if (i<2){
				color += ",";
			
			} else {
				color += ")";
			}
		}
        //adds the color to the css style
        document.querySelector("table").style.color = color;
	});
    //function to alert if mouse is clicked
	function clickme(){
        //Prints this message when user clicks
		alert('Hey, you clicked me!');
	};
    //adds this functionality tot he table
	$('table').on('click', clickme);
};
function debugAjax(){

    var myData;
	
	fetch('data/MegaCities.geojson')
		.then(function(response){
			return response.json();
		})
        .then(function(response){
            myData = response;
            debugCallback(myData);
        })

};
function debugCallback(response){
	$('#mydiv').append('<br>GeoJSON data:<br>' + JSON.stringify(response));
};

//call the initialize function when the window has loaded
$(document).ready(cities);
