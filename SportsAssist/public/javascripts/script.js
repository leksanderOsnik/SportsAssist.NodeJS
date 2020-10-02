var manager = false;
var passSwitch = 0;

(function($) {
  "use strict"; // Start of use strict

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top - 48)
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $('.js-scroll-trigger').click(function() {
    $('.navbar-collapse').collapse('hide');
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $('body').scrollspy({
    target: '#mainNav',
    offset: 54
  });

  // Collapse Navbar
  var navbarCollapse = function() {
    if ($("#mainNav").offset().top > 100) {
      $("#mainNav").addClass("navbar-shrink");
    } else {
      $("#mainNav").removeClass("navbar-shrink");
    }
  };
  // Collapse now if page is not at top
  navbarCollapse();
  // Collapse the navbar when page is scrolled
  $(window).scroll(navbarCollapse);

})(jQuery); // End of use strict


// Main Home Page Div Redirects

$(document).ready(function(){
  $("#oneDiv").click(function(){
    $(location).attr('href', '/login');
  });
});

$(document).ready(function(){
  $("#twoDiv").click(function(){
    $(location).attr('href', '/signup')
  });
});

$(document).ready(function(){
  $("#oneDivTrain").click(function(){
    $(location).attr('href', '/dashboard/training/team');
  });
});

$(document).ready(function(){
  $("#twoDivTrain").click(function(){
    $(location).attr('href', '/dashboard/training/individual')
  });
});




// Home Page Contact Form

function handleClick()
{
$.ajax({
    url: 'addContact',
    dataType: 'json',
    type: 'post',
    contentType: 'application/json',
    data: JSON.stringify({
        "firstName": $('#firstname').val(),
        "lastName": $('#lastname').val(),
                                        "position": $('#position').val(),
        "email": $('#email').val(),
                                        "phNum": $('#phNum').val(),
        "subject": $('#subject').val(),
        "message": $('#message').val()
    }),
    processData: false,
    success: function (data, textStatus, jQxhr) {
        alert("Success!");
    },
    error: function (jqXhr, textStatus, errorThrown) {
        console.log(errorThrown);
    }
});
}

// Jersey Changer on Teach Creation Wizard

$(document).ready(function(){
  $('#jerseyType, #col_1, #col_2').on('change', function(){
    switch(parseInt($("#jerseyType").val())) {
        case 1:
            $("#col_2").show();
            $("#preJer").css("background", "repeating-linear-gradient(to right,"+$("#col_1").val()+","+$("#col_1").val()+" "+(10)+"px,"+$("#col_2").val()+" "+(10)+"px,"+$("#col_2").val()+" "+(20)+"px)");
            break;
        case 2:
            $("#col_2").show();
            $("#preJer").css("background", "linear-gradient(to bottom right, "+$("#col_1").val()+", "+$("#col_2").val()+")");
          break;
        case 3:
            $("#col_2").show();
            $("#preJer").css("background", "linear-gradient(-90deg,"+$("#col_1").val()+", "+$("#col_2").val()+")");
          break;
        case 4:
            $("#col_2").hide();
            $("#preJer").css("background", $("#col_1").val());
          break;
        case 5:
            $("#col_2").show();
            $("#preJer").css("background", "repeating-linear-gradient(to bottom,"+$("#col_1").val()+","+$("#col_1").val()+" "+(10)+"px,"+$("#col_2").val()+" "+(10)+"px,"+$("#col_2").val()+" "+(20)+"px)");
          break;
        case 6:
            $("#col_2").show();
            $("#preJer").css("background"," linear-gradient(to bottom, "+$("#col_1").val()+" 0%, "+$("#col_1").val()+" 50%, "+$("#col_2").val()+" 50%, "+$("#col_2").val()+" 100%)");
          break;
        case 7:
            $("#col_2").show();
            $("#preJer").css("background", "linear-gradient(to right, "+$("#col_1").val()+" 0%, "+$("#col_1").val()+" 50%, "+$("#col_2").val()+" 50%, "+$("#col_2").val()+" 100%)");           
          break;
        case 8:
            $("#col_2").show();
            $("#preJer").css("background", "linear-gradient(to bottom, "+$("#col_1").val()+" 0%, "+$("#col_1").val()+" 45%, "+$("#col_2").val()+" 45%, "+$("#col_2").val()+" 60%, "+$("#col_1").val()+" 60%, "+$("#col_1").val()+" 100%)");           
          break;
        case 9:
            $("#col_2").show();
            $("#preJer").css("background", "linear-gradient(to right, "+$("#col_1").val()+" 0%, "+$("#col_1").val()+" 27%, "+$("#col_2").val()+" 27%, "+$("#col_2").val()+" 73%, "+$("#col_1").val()+" 73%, "+$("#col_1").val()+" 100%)");           
          break;
        default:
            $("#col_2").show();
            $("#preJer").css("background", "black");
      }
  });
});

// Smaller Unchangeable Jersey on Dashboard

$(document).ready(function() {

  if($.cookie("team") != undefined){

    let teamx = JSON.parse($.cookie("team").slice(2)); 
    console.log(teamx); 
    const col1 = teamx.col1; 
    const col2 = teamx.col2; 
    const jerseyT = teamx.jerseyType; 
    switch(parseInt(jerseyT)) {
        case 1:
            $("#iconJer").css("background", "repeating-linear-gradient(to right,"+col1+","+col1+" "+(5)+"px,"+col2+" "+(5)+"px,"+col2+" "+(10)+"px)");
            break;
        case 2:
            $("#iconJer").css("background", "linear-gradient(to bottom right, "+col1+", "+col2+")");
          break;
        case 3:
            $("#iconJer").css("background", "linear-gradient(-90deg,"+col1+", "+col2+")");
          break;
        case 4:
            $("#iconJer").css("background", col1);
          break;
        case 5:
            $("#iconJer").css("background", "repeating-linear-gradient(to bottom,"+col1+","+col1+" "+(5)+"px,"+col2+" "+(5)+"px,"+col2+" "+(10)+"px)");
          break;
        case 6:
            $("#iconJer").css("background"," linear-gradient(to bottom, "+col1+" 0%, "+col1+" 50%, "+col2+" 50%, "+col2+" 100%)");
          break;
        case 7:
            $("#iconJer").css("background", "linear-gradient(to right, "+col1+" 0%, "+col1+" 50%, "+col2+" 50%, "+col2+" 100%)");           
          break;
        case 8:
            $("#iconJer").css("background", "linear-gradient(to bottom, "+col1+" 0%, "+col1+" 45%, "+col2+" 45%, "+col2+" 60%, "+col1+" 60%, "+col1+" 100%)");           
          break;
        case 9:
            $("#iconJer").css("background", "linear-gradient(to right, "+col1+" 0%, "+col1+" 27%, "+col2+" 27%, "+col2+" 73%, "+col1+" 73%, "+col1+" 100%)");           
          break;
        default:
            $("#iconJer").css("background", "black");
      }
    }
  }
);




// Allows selection 

$(document).ready(function()
{
$("#teamDiv2").click(function()
{
console.log("hitting it ")
if($.cookie("teamArr") != undefined){
let teamArray = JSON.parse($.cookie("teamArr").slice(2))[(parseInt($("#teamDiv2").find("img").attr("id").slice(1)) - 1)]._id; 
let tok = document.getElementsByTagName('meta').thecsrf.getAttribute('content'); 
let str = "<form method='POST' action='/dashboard'><input type= 'text' name='teamId' value = '" + teamArray + "'/>" + "<input type='hidden' name='_csrf' value='"+ tok + "'/></form>";
$(str).appendTo("body").submit(); }});}); 




$(document).ready(function() 
{
  $("span").on("click", function()
  {
  if($.cookie("teamArr") != undefined){
  let teamArray = JSON.parse($.cookie("teamArr").slice(2))[parseInt(($(this).find("img").attr("id").slice(1)))-1]._id; 
  let tok = document.getElementsByTagName('meta').thecsrf.getAttribute('content'); 
  let str = "<form method='POST' action='/dashboard'><input type= 'text' name='teamId' value = '" + teamArray + "'/>" + "<input type='hidden' name='_csrf' value='"+ tok + "'/></form>";
  $(str).appendTo("body").submit(); 
  }});
});

/*
function handleSelection() {

let teamArray = JSON.parse($.cookie("teamArr").slice(2))[(parseInt($("#teamDiv").find("img").attr("id").slice(1)) - 1)]._id; 
let tok = document.getElementsByTagName('meta').thecsrf.getAttribute('content'); 
let str = "<form method='POST' action='/selectTeam'><input type= 'text' name='teamId' value = '" + teamArray + "'/>" + "<input type='hidden' name='_csrf' value='"+ tok + "'/></form>";
$(str).appendTo("body").submit();

}



*/ 








// Jerseys in Team List



$(document).ready(function(){

  if($.cookie("teamArr") != undefined){

    let res = JSON.parse($.cookie("teamArr").slice(2)); 
    let numJerseys = res.length;


    // Set Slides

    if(numJerseys <= 12)
    {
      $("#slide3").hide();
      $("#slide3").removeClass();
    }
    if(numJerseys <= 6)
    {

      $("#slide2").hide();
      $("#slide2").removeClass();
      $("#prev").hide();
      $("#next").hide();

    }

    for(let j = 1; j < 19 ; j++)
    {
      if(j > numJerseys)
      {

          $("#j"+j+"").hide();
          $("#o"+j+"").hide();
      }
    }
for (let i = 0; i< numJerseys; i++)
{

      let  col1 = res[i].col1; 
      let  col2 = res[i].col2; 
      let k = i + 1; 
      $("#j" + k + "txt").html(res[i].teamName); 
    switch(parseInt(res[i].jerseyType)) 
    {
        case 1:
            $("#j"+(k)+"").css("background", "repeating-linear-gradient(to right,"+col1+","+col1+" "+(10)+"px,"+col2+" "+(10)+"px,"+col2+" "+(20)+"px)");
            break;
        case 2:
            $("#j"+(k)+"").css("background", "linear-gradient(to bottom right, "+col1+", "+col2+")");
          break;
        case 3:
            $("#j"+(k)+"").css("background", "linear-gradient(-90deg,"+col1+", "+col2+")");
          break;
        case 4:
            $("#j"+(k)+"").css("background", col1);
          break;
        case 5:
            $("#j"+(k)+"").css("background", "repeating-linear-gradient(to bottom,"+col1+","+col1+" "+(10)+"px,"+col2+" "+(10)+"px,"+col2+" "+(20)+"px)");
          break;
        case 6:
            $("#j"+(k)+"").css("background"," linear-gradient(to bottom, "+col1+" 0%, "+col1+" 50%, "+col2+" 50%, "+col2+" 100%)");
          break;
        case 7:
            $("#j"+(k)+"").css("background", "linear-gradient(to right, "+col1+" 0%, "+col1+" 50%, "+col2+" 50%, "+col2+" 100%)");           
          break;
        case 8:
            $("#j"+(k)+"").css("background", "linear-gradient(to bottom, "+col1+" 0%, "+col1+" 45%, "+col2+" 45%, "+col2+" 60%, "+col1+" 60%, "+col1+" 100%)");           
          break;
        case 9:
            $("#j"+(k)+"").css("background", "linear-gradient(to right, "+col1+" 0%, "+col1+" 27%, "+col2+" 27%, "+col2+" 73%, "+col1+" 73%, "+col1+" 100%)");           
          break;
        default:
            $("#j"+(k)+"").css("background", col1);
      }
    }
  }
  });


// Password Change

$(document).ready(function(){
  $("#passLab").click(function(){
    if(passSwitch == 0){
      $("#pass1").show();
      $("#pass2").show();
      passSwitch = 1;
      $("#passLab").html("Change Password <i class=\"fas fa-caret-up\"></i>");
    }
    else{
      $("#pass1").hide();
      $("#pass2").hide();
      passSwitch = 0;
      $("#passLab").html("Change Password <i class=\"fas fa-caret-down\"></i>");
    }
  });
});


function setUpVideo(vidsAvailable){

    if(vidsAvailable){

      $("#vidTd").show();
      $("#vidListTd").show();
      $("#commentsTd").show();
      $("#infoTd").show();

    }
    else{

      $("#noVidMessage").show();

    }
    

}

function validateYT(){

  if($("#vidName").val().length < 1){

    alert("You must enter a Video Title");
    return;

  }

  if($("#vidCode").val().length != 11){

    alert("Not a valid YouTube Video ID");
    return;

  }

  var alphabet="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890-_"

  for(var i=0; i<$("#vidCode").val().length;i++){

    for(var j = 0; j<alphabet.length; j++){

      if($("#vidCode").val().charAt(i) == alphabet.charAt(j)){

        break;

      }
      else if(j == (alphabet.length - 1)){

        alert("Not a valid YouTube Video ID");
        return;

      }
    }

  }

  $("#vidForm").submit();

}

$(document).ready(function(){
  $('#proType, #procol_1, #procol_2').on('change', function(){
    switch(parseInt($("#proType").val())) {
        case 1:
            $("#prePro1").attr("src","../images/male1.png");
            $("#prePro2").attr("src","../images/male2.png");
            $("#prePro1").css("background", ""+$("#procol_1").val()+"");
            $("#prePro2").css("background", ""+$("#procol_2").val()+"");
            break;
        case 2:
            $("#prePro1").attr("src","../images/female1.png");
            $("#prePro2").attr("src","../images/female2.png");
            $("#prePro1").css("background", ""+$("#procol_1").val()+"");
            $("#prePro2").css("background", ""+$("#procol_2").val()+"");
          break;
        default:
            $("#prePro1").css("background", "black");
            $("#prePro2").css("background", "white");
      }
  });
});

$(document).ready(function(){
  $( "#vidCode1" ).keyup(function() {

  if($("#vidCode1").val().length != 11){

    $("#vidCode1").css("color", "red");
  

  }
  else{

    $("#vidCode1").css("color", "green");

  }





});
});


// Smaller Unchangeable profile Avatar on Dashboard / Teams

function setAvatar(col1, col2, proT) {
    
    switch(parseInt(proT)) {
        case 1:
            $("#iconPro1").attr("src","../images/male1.png");
            $("#iconPro2").attr("src","../images/male2.png");
            $("#iconPro1").css("background", ""+col1+"");
            $("#iconPro2").css("background", ""+col2+"");
            break;
        case 2:
            $("#iconPro1").attr("src","../images/female1.png");
            $("#iconPro2").attr("src","../images/female2.png");
            $("#iconPro1").css("background", ""+col1+"");
            $("#iconPro2").css("background", ""+col2+"");
            break;
        default:
            $("#iconPro1").attr("src","../images/male1.png");
            $("#iconPro2").attr("src","../images/male2.png");
            $("#iconPro1").css("background", "white");
            $("#iconPro2").css("background", "black");
           
      }
}

function setSettingsJersey(col1, col2,jerseyT) {

    $("#jerseyType").val(jerseyT);

    switch(parseInt(jerseyT)) {
        case 1:
            $("#preJer").css("background", "repeating-linear-gradient(to right,"+col1+","+col1+" "+(10)+"px,"+col2+" "+(10)+"px,"+col2+" "+(20)+"px)");
            break;
        case 2:
            $("#preJer").css("background", "linear-gradient(to bottom right, "+col1+", "+col2+")");
          break;
        case 3:
            $("#preJer").css("background", "linear-gradient(-90deg,"+col1+", "+col2+")");
          break;
        case 4:
            $("#preJer").css("background", col1);
          break;
        case 5:
            $("#preJer").css("background", "repeating-linear-gradient(to bottom,"+col1+","+col1+" "+(10)+"px,"+col2+" "+(10)+"px,"+col2+" "+(20)+"px)");
          break;
        case 6:
            $("#preJer").css("background"," linear-gradient(to bottom, "+col1+" 0%, "+col1+" 50%, "+col2+" 50%, "+col2+" 100%)");
          break;
        case 7:
            $("#preJer").css("background", "linear-gradient(to right, "+col1+" 0%, "+col1+" 50%, "+col2+" 50%, "+col2+" 100%)");           
          break;
        case 8:
            $("#preJer").css("background", "linear-gradient(to bottom, "+col1+" 0%, "+col1+" 45%, "+col2+" 45%, "+col2+" 60%, "+col1+" 60%, "+col1+" 100%)");           
          break;
        case 9:
            $("#preJer").css("background", "linear-gradient(to right, "+col1+" 0%, "+col1+" 27%, "+col2+" 27%, "+col2+" 73%, "+col1+" 73%, "+col1+" 100%)");           
          break;
        default:
            $("#preJer").css("background", "black");
      }
    }
  

  function setAvatarSettings(col1, col2,type) {

      $("#proType").val(type);


      switch(parseInt(type)) {
        case 1:
            $("#prePro1").attr("src","../images/male1.png");
            $("#prePro2").attr("src","../images/male2.png");
            $("#prePro1").css("background", ""+col1+"");
            $("#prePro2").css("background", ""+col2+"");
            break;
        case 2:
            $("#prePro1").attr("src","../images/female1.png");
            $("#prePro2").attr("src","../images/female2.png");
            $("#prePro1").css("background", ""+col1+"");
            $("#prePro2").css("background", ""+col2+"");
            break;
        default:
            $("#prePro1").attr("src","../images/male1.png");
            $("#prePro2").attr("src","../images/male2.png");
            $("#prePro1").css("background", "white");
            $("#prePro2").css("background", "black");
           
      }
    }

    function linkVideo(id){

      var url = "/dashboard/video/"+id+"";

       $(location).attr('href', url);

    }

    $(document).ready(function(){
      $("#notLink").click(function(){
          $("#form").submit();
      });
   });

$(document).ready(function(){
    $("#appendexercise").click(function()
      {
          $('#exercises tr:last').after('<tr><td><input id="exerciseName'+exerciseCount+'" type="text" name="name" placeholder="Exercise" value=""></td><td><input id="exerciseSets'+exerciseCount+'"type="text" name="sets" placeholder="Sets" value=""></td><td><input id="exerciseReps'+exerciseCount+'" type="text"  name="reps" placeholder="Reps" value=""><td><input id="exerciseWeight'+exerciseCount+'" type="text"  name="weight" placeholder="Weight" value=""></td></td><tr>');
      
          exerciseCount++;
      }); 
  });

$(document).ready(function(){

    

    $("#submitworkout").click(function()
      {
          for (i = 1; i <exerciseCount; i++){

            let exerciseName = $("#exerciseName"+i).val(); 
            let exerciseSets = $("#exerciseSets"+i).val();
            let exerciseReps = $("#exerciseReps"+i).val(); 
            let exerciseWeight = $("#exerciseWeight"+i).val();
            let tempObject = {name: exerciseName, sets: exerciseSets, reps: exerciseReps, weight: exerciseWeight}; 

            tempArray.push(tempObject);

          }

        arrayProtoType = JSON.stringify(tempArray); 

        $("#reqcontent").val(arrayProtoType);

        $("#exerciseForm").submit();
      }); 
  });




  











