//------------------------------------------------------------------------------------------------------------------------------------------------------
// GLOBAL VARIABLES
//------------------------------------------------------------------------------------------------------------------------------------------------------
var counter = 0





//------------------------------------------------------------------------------------------------------------------------------------------------------
// FUNCTIONS
//------------------------------------------------------------------------------------------------------------------------------------------------------







//------------------------------------------------------------------------------------------------------------------------------------------------------
// APP FLOW
//------------------------------------------------------------------------------------------------------------------------------------------------------

// Initialize Firebase
var config = {
	apiKey: "AIzaSyB66z9et7iVAWyigivr81ghw6xz_UESNRc",
	authDomain: "train-app-d7d89.firebaseapp.com",
	databaseURL: "https://train-app-d7d89.firebaseio.com",
	storageBucket: "train-app-d7d89.appspot.com",
	messagingSenderId: "652231030318"
};

firebase.initializeApp(config);

var database = firebase.database();

// Store values from form on submit button click
$("#train-submit").on("click", function() {
	event.preventDefault();

	var trainName = $("#train-name-input").val().trim();
	$("#train-name-input").val("");

	var trainDestination = $("#destination-input").val().trim();
	$("#destination-input").val("");

	var trainTime = $("#first-time-input").val().trim();
	$("#first-time-input").val("");

	var trainFrequency = $("#frequency-input").val().trim();
	$("#frequency-input").val("");

	database.ref().push({
        tName: trainName,
		destination: trainDestination,
		time: trainTime,
		frequency: trainFrequency
    });
});

// Grabs data from firebase
database.ref().on('child_added', function(childSnapshot) {

	// Console logs our train info
	console.log(childSnapshot.val().tName);
    console.log(childSnapshot.val().destination);
    console.log(childSnapshot.val().time);
    console.log(childSnapshot.val().frequency);

    // Creates new row for each train
	var newRow = $("<tr>");
	newRow.attr("id", "train-row-" + counter);
	$("#train-table").append(newRow);

	// Creates a td for train name and appends to the data table
	var trainNameTd = $("<td>", {id: "train-name-td"});
	trainNameTd.html(childSnapshot.val().tName);
	$("#train-row-" + counter).append(trainNameTd);

	// Creates a td for train destination and appends to the data table
	var trainDestinationTd = $("<td>", {id: "train-destination-td"});
	trainDestinationTd.html(childSnapshot.val().destination);
	$("#train-row-" + counter).append(trainDestinationTd);

	// Creates a td for train frequency and appends to the data table
	var trainFrequencyTd = $("<td>", {id: "train-frequency-td"});
	trainFrequencyTd.html(childSnapshot.val().frequency);
	$("#train-row-" + counter).append(trainFrequencyTd);

	// Creates a td for train time and appends to the data table
	var trainTimeTd = $("<td>", {id: "train-time-td"});
	trainTimeTd.html(childSnapshot.val().time);
	$("#train-row-" + counter).append(trainTimeTd);

	counter++;

	// Handles errors that may occur
	}, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
});