/**** Joe Script   
      04.04.2020 
****/ 

$(document).ready(function(){ 
$(".optionTraining").click(function()
{
let selection = $(this).attr("id"); 
let csrf = $("#cybersecuritydiv").val(); 
let decision; 
switch(selection)
{

case "personal":
console.log("hitting personal!");
decision = 1; 
break;

case "public":
console.log("hitting public!"); 
decision = 2; 
break; 

case "teamOnly":
console.log("hitting team only!");
decision = 3; 
break; 
}

let str = "<form method='POST' action='/dashboard/training/individual/sessions'>" + "<input type='text' value='" + csrf + "' name='_csrf'>" + "<input type='text'  name='decision' + value='" + decision+"'></form>";
$(str).appendTo("body").submit(); 
});
}); 



