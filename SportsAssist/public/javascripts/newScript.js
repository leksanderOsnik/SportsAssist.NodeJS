/**** Joe Script   
      04.04.2020 
****/ 

$(document).ready(function(){ 


$(".saveChangeDiv").on("click", function()
{
  let protoPlayer =  $(this).attr("id").slice(1);
  let tok = $("#cybersecurityProtocol").val(); 
  let goalsId = "#G" + protoPlayer; 
  let momId = "#M" + protoPlayer; 
  let cardId = "#C" + protoPlayer; 
  let cleanSheetId = "#X" + protoPlayer; 
  let assistId = "#A" + protoPlayer; 
  protoPlayer = protoPlayer.slice(1); 
  let goals = ($(goalsId)).html(); 
  let mom = ($(momId)).html(); 
  let cards = ($(cardId)).html(); 
  let cleanSheet = ($(cleanSheetId)).html(); 
  let assist = ($(assistId)).html(); 
const str = `${"<form method='POST' action='/dashboard/squad'> " + "<input type='text' name='player' value='"}${protoPlayer}'>` + `<input type= 'text' name='goals' value ='${goals}'>` + `<input type='text' name='mom' value='${mom}'><input type='text' name='cards' value ='${cards}'>` + `<input type='text' name='cleanSheet' value='${cleanSheet}'><input type='text' name ='assist' value='${assist}'>` + `<input type='hidden' name='_csrf' value='${tok}'></form>`;
$(str).appendTo("body").submit(); 
});  

  $("a").on("click", function()
  {
    let fieldToChange = ($(this).attr("name")); 
    let userSelected = ($(this).attr("id"));  
    let original; 
    switch(fieldToChange)
    {

      case "GoalUp": 

      original = parseInt(($("#G-"+userSelected)).text()); 
      original++
      ($("#G-"+userSelected)).text(original); 
      showSaveButton(userSelected); 
      break; 

      case "GoalDown": 
      original = parseInt(($("#G-"+userSelected)).text()); 
      original--; 
      ($("#G-"+userSelected)).text(original);
      showSaveButton(userSelected); 
      break; 

      case "MomUp": 
      original = parseInt(($("#M-"+userSelected)).text()); 
      original++
      ($("#M-"+userSelected)).text(original); 
      showSaveButton(userSelected); 
      break; 

 
      case "MomDown":
      original = parseInt(($("#M-"+userSelected)).text()); 
      original--; 
      ($("#M-"+userSelected)).text(original); 
      showSaveButton(userSelected); 
      break; 



      case "CardUp": 
      original = parseInt(($("#C-"+userSelected)).text()); 
      original++; 
      ($("#C-"+userSelected)).text(original);
      showSaveButton(userSelected);  
      break; 



      case "CardDown":
      original = parseInt(($("#C-"+userSelected)).text()); 
      original--; 
      ($("#C-"+ userSelected)).text(original); 
      showSaveButton(userSelected); 
      break; 

      case "CleanSheetUp":    
      original = parseInt(($("#X-"+userSelected)).text()); 
      original++; 
      ($("#X-"+ userSelected)).text(original);
      showSaveButton(userSelected);  
      break;  

      case "CleanSheetDown":
      original = parseInt(($("#X-"+userSelected)).text()); 
      original--; 
      ($("#X-"+ userSelected)).text(original); 
      showSaveButton(userSelected); 
      break;


     case "AssistUp": 
     original = parseInt(($("#A-"+userSelected)).text()); 
     original++;
     ($("#A-"+ userSelected)).text(original); 
     showSaveButton(userSelected); 
      break; 


      case "AssistDown":
      original = parseInt(($("#A-"+userSelected)).text()); 
      original--;
     ($("#A-"+ userSelected)).text(original); 
      showSaveButton(userSelected); 
     break; 
  
      default: break; 
    }
  });

  function showSaveButton(protoUserID)
  {
  const protoDiv = "#Z-" + protoUserID; 
  ($(protoDiv).css("display", "inline")); 
  }


});




