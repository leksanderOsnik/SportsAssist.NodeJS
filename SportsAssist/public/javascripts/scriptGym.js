$(document).ready(function(){
let i = 0 
let tempArray = []; 
let arrayProtoType; 
$("#editWorkoutInterface").hide(); 
$("#pastWorkoutsInterface").hide(); 

$("#createWorkoutButton").click(function() 
{
$("#controls").hide(); 
$("#editWorkoutInterface").show(); 
}); 



$("#prevWorkout").click(function(){
$("#controls").hide();     
$("#pastWorkoutsInterface").show(); 

}); 

$("#appendexercise").click(function()
{
let exerciseName = $("#exerciseName").val(); 
let exerciseSets = $("#exerciseSets").val();
let exerciseReps = $("#exerciseReps").val(); 
let exerciseWeight = $("#exerciseWeight").val();
let tempObject = {name: exerciseName, sets: exerciseSets, reps: exerciseReps, weight: exerciseWeight}; 
tempArray.push(tempObject);
arrayProtoType = JSON.stringify(tempArray); 

let str = "<tr><td>" + exerciseName + "</td>" + "<td>" + exerciseSets + "</td>" + "<td>" + exerciseReps + "</td>" + "<td>" + exerciseWeight + "</td></tr>"; 
i++; 
$("#exerciseTableBody").append(str); 
}); 



$("#postExercise").click(function(){
let csrf = $("#cybersecuritydiv").val(); 
let str = "<form method='POST' action='addexercise'>" + "<input type='text' value='" + csrf + "' name='_csrf'>" + "<input type='text'  name='reqcontent' + value='" + arrayProtoType +"'></form>";
$(str).appendTo("body").submit(); 
}); 


}); 