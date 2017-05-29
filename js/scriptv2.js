 // When user selects sort button, sort by different dimensions

const recipeApp = {};
const appKey = "7HO1x5HwjMcsX0i3Y946W5LBJo6bLKvfr7lKRBJ4";
var selectedIngredients = [];
var currentNutrient = {};

//////////////////////
//////////////////////
/////////////MY DATA//
//////////////////////

// Store a list of all possible ingredients
var ingredients = {
	celery: { USDAnumber: "11143", displayName: "Celery", baseUnits: [1, "cup"], color:"green", filter:"vegetable"},
	clementines: { USDAnumber: "09433", displayName: "Clementine", baseUnits: [1, "fruit"], color:"orange", filter:"fruit"},
	banana: { USDAnumber: "09040", displayName: "Banana", baseUnits: [1, "cup"], color:"yellow", filter:"fruit"},
	almond_milk: { USDAnumber: "14091", displayName: "Unsweetened almond milk", baseUnits: [1, "cup"], color:"neutral", filter:"liquid"},
	vanilla_extract: { USDAnumber: "02050", displayName: "Vanilla extract", baseUnits: [1, "tsp"], color:"neutral", filter:"flavour"},
	vanilla_yogurt: { USDAnumber: "01119", displayName: "Low-fat vanilla yogurt", baseUnits: [6, "oz"], color:"neutral", filter:"diary"},
	beets: { USDAnumber: "11081", displayName: "Cooked beets", baseUnits: [0.5, "cup"], color:"pink", filter:"vegetable"},
	strawberries: { USDAnumber: "09316", displayName: "Strawberries", baseUnits: [1, "cup"], color:"pink", filter:"fruit"},
	strawberry_yogurt: { USDAnumber: "01284", displayName: "Low-fat strawberry greek yogurt", baseUnits: [6, "oz"], color:"pink", filter:"dairy"},
	nectarines: { USDAnumber: "09191", displayName: "Nectarines", baseUnits: [1, "cup"], color:"orange", filter:"fruit"},
	thyme: { USDAnumber: "02049", displayName: "Thyme sprig", baseUnits: [1, "tsp"], color:"green", filter:"herb"},
	honey: { USDAnumber: "19296", displayName: "Raw honey", baseUnits: [1, "cup"], color:"yellow", filter:"sweetener"},
	orange_juice: { USDAnumber: "09206", displayName: "Orange juice", baseUnits: [1, "cup"], color:"orange", filter:"liquid"},
	plain_yogurt: { USDAnumber: "01117", displayName: "Low-fat plain yogurt", baseUnits: [6, "oz"], color:"neutral", filter:"dairy"},
	mango: { USDAnumber: "09176", displayName: "Mango", baseUnits: [1, "cup"], color:"orange", filter:"fruit"},
	greek_yogurt: { USDAnumber: "01287", displayName: "Low-fat greek yogurt", baseUnits: [7, "oz"], color:"neutral", filter:"dairy"},
	coconut_water: { USDAnumber: "14090", displayName: "Coconut water", baseUnits: [1, "cup"], color:"neutral", filter:"liquid"},
	unsweetened_coconut: { USDAnumber: "12104", displayName: "Coconut meat", baseUnits: [1, "cup"], color:"neutral", filter:"fruit"},
	green_grapes: { USDAnumber: "09132", displayName: "Green grapes", baseUnits: [1, "cup"], color:"green", filter:"fruit"},
	arugula: { USDAnumber: "11959", displayName: "Arugula", baseUnits: [1, "leaf"], color:"green", filter:"vegetable"},
	peaches: { USDAnumber: "09236", displayName: "Peaches", baseUnits: [1, "cup"], color:"yellow", filter:"fruit"},
	matcha_tea: { USDAnumber: "14366", displayName: "Green tea powder", baseUnits: [1, "tsp"], color:"green", filter:"flavour"},
	coconut_milk: { USDAnumber: "12117", displayName: "Coconut milk", baseUnits: [1, "cup"], color:"neutral", filter:"liquid"},
	basil: { USDAnumber: "02044", displayName: "Basil", baseUnits: [5, "leaf"], color:"neutral", filter:"herb"},
	spinach: { USDAnumber: "11457", displayName: "Spinach", baseUnits: [1, "cup"], color:"green", filter:"herb"},
	cucumber: { USDAnumber: "11205", displayName: "Cucumber", baseUnits: [0.5, "cup"], color:"green", filter:"vegetable"},
	lemon_juice: { USDAnumber: "09524", displayName: "Lemon juice", baseUnits: [1, "tbsp"], color:"yellow", filter:"fruit"},
	lime_juice: { USDAnumber: "09160", displayName: "Lime juice", baseUnits: [1, "cup"], color:"yellow", filter:"fruit"},
	parsley: { USDAnumber: "11297", displayName: "Parsley", baseUnits: [1, "cup"], color:"green", filter:"herb"},
	salt: { USDAnumber: "02047", displayName: "Salt", baseUnits: [1, "tsp"], color:"neutral", filter:"flavour"},
	kale: { USDAnumber: "11233", displayName: "Kale", baseUnits: [1, "cup"], color:"green", filter:"vegetable"},
	pineapple: { USDAnumber: "09266", displayName: "Pineapple", baseUnits: [1, "cup"], color:"yellow", filter:"fruit"},
	gala_apple: { USDAnumber: "09503", displayName: "Gala apple", baseUnits: [1, "cup"], color:"pink", filter:"fruit"},
	agave_nectar: { USDAnumber:"19912", displayName: "Agave", baseUnits: [1, "tsp"], color:"yellow", filter:"sweetener"},
	blueberries: { USDAnumber: "09050", displayName: "Blueberries", baseUnits: [1, "cup"], color:"blue", filter:"fruit"},
	ginger: { USDAnumber: "11216", displayName: "Ginger", baseUnits: [1, "tsp"], color:"yellow", filter:"vegetable"},
	peanut_butter: { USDAnumber: "16098", displayName: "Smooth, salted peanut butter", baseUnits: [2, "tbsp"], color:"yellow", filter:"flavour"},
	pitted_cherries: { USDAnumber: "09367", displayName: "Pitted cherries", baseUnits: [1, "cup"], color:"pink", filter:"fruit"},
	iced_coffee: { USDAnumber: "14183", displayName: "Iced coffee", baseUnits: [1, "cup"], color:"neutral", filter:"flavour"}
};
// Store a list of recipes that hold a list of possible ingredients and the quantity of each ingredient, and the colour of each ingredient, the image for each ingredient
var recipes = {
	matchBasil: {displayName: "None selected", recipe:[]},
	matchBasil: {displayName: "matcha + basil", recipe:[["matcha_tea", 12], ["greek_yogurt", 2], ["coconut_milk", 0.06], ["basil", 6]]},
	kaleBanana: {displayName: "kale + pineapple + banana", recipe:[["kale", 1], ["pineapple", 1], ["banana", 0.25], ["almond_milk",0.25],["lemon_juice", 1]]},
	nectarineThyme: { displayName:"nectarine + thyme + honey", recipe: [["nectarines",0.5],["thyme", 6], ["honey",0.12], ["orange_juice", 0.25], ["plain_yogurt", 2]]},
	bananaMango: {displayName:"banana + mango + coconut", recipe: [["banana", 0.25],["mango",1], ["greek_yogurt", 2], ["coconut_water", 0.33], ["unsweetened_coconut", 0.25]]},
	clementineBanana: {displayName: "clementine + banana + vanilla", recipe: [["clementines",3],["banana",0.25], ["almond_milk", 0.25], ["vanilla_extract", 1], ["vanilla_yogurt", 2]]},
	grapeSpinach: {displayName: "grape + spinach + peach", recipe:[["green_grapes", 0.5], ["spinach", 1], ["arugula", 0.25], ["lime_juice", 0.02],["peaches", 1]]}
};
//Store a nutrient Reference List // Daily recommended values //Base nutrition of soylent
nutrientReference = {
	208 : ["Energy (kcal)", 2000, 400],
	203 : ["Protein (g)", 50, 20],
	204 : ["Total lipid (fat) (g)", 65, 21],
	205 : ["Carbohydrate (g)", 300, 26],
	291 : ["Fiber, total dietary (g)", 25, 3],
	269 : ["Sugars, total (g)", 25, 9],
	301 : ["Calcium (mg)", 1000, 200],
	303 : ["Iron (mg)", 18, 3.6],
	304 : ["Magnesium (mg)", 400, 80],
	645 : ["Fatty acids, total (g)", 20, 2],
	605 : ["Fatty acids, total trans (g)", 0, 0],
	601 : ["Cholesterol (mg)", 300, 0],
	646 : ["Fatty acids, total polyunsaturated", 20, 2.5],
	306 : ["Potassium (mg)", 3500, 700],
	307 : ["Sodium (mg)", 2400, 300],
	401 : ["Vitamin C (mg)", 60, 12],
	415 : ["Vitamin B6 (mg)", 2, 0.4],
	418 : ["Vitamin B12 (µg)", 6, 1.2],
	320 : ["Vitamin A (µg)", 5000, 1000],
	323 : ["Vitamin E (mg)", 30, 6],
	328 : ["Vitamin D (µg)", 400, 80]
};

////////////GET NUTRIENT INFORMATION////////////

// Get base ingredient nutrient information from API using ajax
recipeApp.getNutrientVal = function(ingredientName, quantity){
	//Call API
	//USDA API documentation site
	//https://ndb.nal.usda.gov/ndb/doc/apilist/API-NUTRIENT-REPORT.md API info
	var nutritionalVal = $.ajax({
		url:` https://api.nal.usda.gov/ndb/nutrients/?nutrients=208&nutrients=203&nutrients=204&nutrients=205&nutrients=291&nutrients=269&nutrients=301&nutrients=303&nutrients=304&nutrients=645&nutrients=605&nutrients=601&nutrients=646&nutrients=306&nutrients=307&nutrients=401&nutrients=418&nutrients=320&nutrients=323&nutrients=328`,
		method: "GET",
		dataType: "json",
		data: {
			format: "json",
		 	api_key: appKey,
		 	ndbno: ingredients[ingredientName].USDAnumber,
		 	}
	});

	//Store information from API
	$.when(nutritionalVal)
		.then(function(res){
			//each ingredient's information
			var selectedIngredient = res.report.foods[0];

			//write my own data that I will need later to each corresponding object as needed
			selectedIngredient.objectReference = ingredientName;
			selectedIngredient.selectedQty = quantity;
			selectedIngredient.baseUnit = ingredients[ingredientName].baseUnits[1];
			selectedIngredient.baseUnitAmt = ingredients[ingredientName].baseUnits[0];
			selectedIngredient.displayName = ingredients[ingredientName].displayName;

			//store these new objects in an array
			selectedIngredients.push(selectedIngredient);
			//console.log (selectedIngredients);

			//calculate nutritional info and display each ingredient when new items are added to selected Ingredients array
			recipeApp.calculateNutrientValue();
			recipeApp.displayIngredients();
		});
};

//Create a button for each ingredient
recipeApp.generateButtons = function(){
	for (let ingredient in ingredients){
		//Generate an ingredient unit
		//create a div that holds one header
		//one input field with -/+ for quantities
		let individualIngredient = ingredients[ingredient];
		let buttonHTMLString = $("<div>").addClass(`ingredientButtons__ingredient ${individualIngredient.color} ${individualIngredient.filter}`)
						.html(`<h2>${individualIngredient.displayName}</h2>
							<img src="assets/${ingredient}.svg" height="100px">
							<div class="inputContainer">
								<button class="increment ingredientQtyButton">+</button>
								<input type="text" name=${individualIngredient.displayName} id=${ingredient} class="ingredientQty" value="0">
								<button class="decrement ingredientQtyButton">-</button>
								<div class= "unit">${individualIngredient.baseUnits[1]}</div>
							</div>`);
		$(".ingredientButtons .wrapper").append(buttonHTMLString);
	};

	//Initiate isotope library after creating buttons
	recipeApp.isotopeFeatures();
}


//On click of each ingredient select ingredient
recipeApp.events = function(){

	//when you select a recipe
	$(".recipesOptions").change(function(){

		//empty out all existing user selections by setting all ingredient quantities to 0
		for (let ingredient in ingredients){
			recipeApp.loggingIngredientQty(0, ingredient);
		};

		//see which reipe the user chose
		let userChoice = $(this).val();

		//go into recipe object and look at the list of ingredients and quantity in each recipe
		//strawberryBeets : {displayName:"Strawberry Beets", recipe: [["strawberries",184],["beets",128]]}
		let selectedRecipe = recipes[userChoice].recipe;

		//for every recipe...
		for (let i = 0; i<selectedRecipe.length ; i = i + 1){
			let recipeIngredient = selectedRecipe[i][0];
			let recipeIngredientQty = selectedRecipe[i][1];

			//select the appropriate input field associated to the ingredient and change the value
			$(`#${recipeIngredient}`).val(recipeIngredientQty);
			//set quantities to preset quantities
			recipeApp.loggingIngredientQty(recipeIngredientQty, recipeIngredient, "+");
		};

		//calculate nutritional info and display each ingredient
		recipeApp.calculateNutrientValue();
		recipeApp.displayIngredients();
	});

	//when either + or - is clicked
	$(".ingredientButtons").on("click",".ingredientQtyButton", function(){
		//store the button that is clicked
		let $button = $(this);
		let whichButtonWasPressed = $button.text();

		//go into the parent element and find the input element's value
		//this is the existing value
		let oldValue = $button.parent().find("input").val();

		//if the + button was clicked
 		if (whichButtonWasPressed == "+") {
 			//add 1 to the old value
 			var newVal = parseFloat(oldValue) + 1;
 		} else {
	 		//Otherwise (- was clicked), check to see if the existing value is larger than 0
	 		//if old value is greater than 0 then decrease value by 1
	 		if (oldValue > 0) {
	 			var newVal = parseFloat(oldValue) - 1;
	 			//if existing value is less that 0 then just set value to 0
			 	} else {
			 		newVal = 0;
			 	}
	 		}

		//goto the parent element that the button lives within
		//find the input field and update to the new value
		$button.parent().find("input").val(newVal);

		//get what ingredient was selected by looking at the id of the input element
		var whichIngredientWasUpdated = $button.parent().find("input").attr("id");
		//log the new value of the input field and which ingredient was updated
		recipeApp.loggingIngredientQty(newVal, whichIngredientWasUpdated);
	});
}


//updating quantities of ingredients
recipeApp.loggingIngredientQty = function(quantity, whichIngredientWasUpdated, whichButtonWasPressed){

	var indexOfIngredient = selectedIngredients.map(function(e) { return e.objectReference; }).indexOf(whichIngredientWasUpdated);

	//if the quantity that was passed in is 0
	if(quantity === 0){
		//remove nutrient from selected array
		selectedIngredients.splice(indexOfIngredient);
		// console.log("please remove me");
		// console.log(selectedIngredients);

	} else if (quantity > 0 && indexOfIngredient === -1){
		//check if ingredient is already on selected array
		//if not, get nutrient and update value
		// console.log(quantity);
		// console.log("I need to be added to list");
		recipeApp.getNutrientVal(whichIngredientWasUpdated, quantity);

	} else {
		//if ingredient is already in selectedIngredient array, just update value
		//console.log("I update my quantity");
		//console.log(selectedIngredients);
		selectedIngredients[indexOfIngredient].selectedQty = quantity;
	};

	//calculate nutritional info and display each ingredient when new items are added to selected Ingredients array
	recipeApp.calculateNutrientValue();
	recipeApp.displayIngredients();

}


////Calculate nutrition
recipeApp.calculateNutrientValue = function(){

	//empty out the previous nutritional information
	currentNutrient = {};

	//go into each ingredient in the selectedIngredient array
	//for each nutrient in the nutrients array, new property, add value
	selectedIngredients.forEach(function(ingredient){
		//go into the nutrient object
		ingredient.nutrients.forEach(function(nutrient, index){
			for (let property in nutrient){
				//get all the nutrient ids
				if( property == "nutrient_id"){

					let idNumber = nutrient[property];
					//if the value of the nutrient is either -- or 0, set it to 0
					if (nutrient.value === "--" || nutrient.value === 0 ) {
						nutrient.value = "0";
					}
					//The nutrient value of each ingredient is the value in the object divided by the base unit of each ingredient multiplied by the selected quantity of the ingredient
					var nutrientValue = Number(nutrient.value)/ingredient.baseUnitAmt*ingredient.selectedQty;

					//If there is no such nutrient id in the nutritional information object
					if (currentNutrient[idNumber] === undefined){
						//then set it to the current nutrient value
						currentNutrient[idNumber] = nutrientValue; 
					} else {
						//otherwise add it to the current nutrient value
						currentNutrient[idNumber] = currentNutrient[idNumber] + nutrientValue;
					}
				}
			}
		});
	});

	// console.log(currentNutrient);
};


//Display each ingredient and nutritiononto the page
recipeApp.displayIngredients = function(){

	//empty previous ingredients
	$(".results__nutritionList ul").empty();

	//for every nutrient in the current Nutrient object
	for (let property in currentNutrient){

		//display the name of the nutrient, the value, and the daily value of the nutrient
		let nutrientName = nutrientReference[property][0];
		let nutrientValue = Math.round(currentNutrient[property]+nutrientReference[property][2]);
		let dailyValue = Math.floor((nutrientValue/nutrientReference[property][1])*100);
		//console.log(nutrientValue/nutrientReference[property][1]);

		//display result
		$(".results__nutritionList ul").append(`<li>
			<div class="main_info"><div>${nutrientName} ${nutrientValue}</div></div> 
			<div class="dailyValue">${dailyValue}%</div>
			</li>`);
	}


	//Now, updated ingredient panel
	//first empty and pre-existing ingredients
	$(".leftPanel__ingredientsAndQty ul").empty();

	for(let i = 0; i < selectedIngredients.length; i = i + 1) {

		//then display the name of the ingredient, the selected quantity and the unit
		let ingredientDisplay = selectedIngredients[i].displayName;
		let quantityDisplay = selectedIngredients[i].selectedQty;
		let unitDisplay = selectedIngredients[i].baseUnit;

		$(".leftPanel__ingredientsAndQty ul").append(`<li><div class="leftPanel__ingredientsAndQty">${quantityDisplay} ${unitDisplay}</div><div class="ingredientname">${ingredientDisplay}</div></li>`);
	};	
}

//FOR THE FUTURE - change soylent colour when ingredients are added or subtracted
// recipeApp.changeSoylentColor = () => {
// 	$(".results__soylentImage svg").css({fill: "linear-gradient(red, yellow)"})
// }


//Use isotope to filter ingredients
recipeApp.isotopeFeatures = function(){
	var $grid = $('.grid').isotope({
	    layoutMode: 'masonry',
	});

	$('.filter-button-group').on( 'click', 'button', function() {
	  var filterValue = $(this).attr('data-filter');
	  $grid.isotope({ filter: filterValue });
	});
}

//////////////////////
//////////////////////
//INIT AND DOC READY//
//////////////////////
//////////////////////

recipeApp.init = function(){
	recipeApp.events();
	recipeApp.generateButtons(); 
};

$(function() {
	//This is our starting point. When the DOM is ready we call the init
	//method to start things off.
	recipeApp.init(); 

});