
    var goal, isMetric;
    var age,height,weight,calories, protein, carbohydrates, fats;

    
 $(document).ready(function(){
        $("#systemMeasure").change(function(){
          isMetric = $("#systemMeasure").val();
          if(isMetric==1){
            $("#metricHeight").replaceWith("<input class='form-control-lg' id='feet' placeholder='Height(feet)'><input id='inches'class='form-control-lg' placeholder='(inches)'>")
            $("#metricWeight").replaceWith("<input id='imperialWeight' class='form-control-lg' placeholder='Weight (lbs)'>")
            return isMetric;
          }
          else if(isMetric==0){
            $("#feet").replaceWith("<input id='metricHeight' class='form-control-lg' placeholder='Height (cm)'>");
            $("#inches").remove();
            $("#imperialWeight").replaceWith("<input id='metricWeight' class='form-control-lg' placeholder='Weight (kg)'>")
            return isMetric;
          }
          
        });
        
      });
$(document).ready(function(){
        $("#nutritionSubmitButton").click(function(){
          isMetric=$('#systemMeasure').val();
          
          if(isMetric==0){
            age=$("#age").text();
            height=$("#metricHeight").val();
            weight=$("#metricWeight").val();

          }
            else if(isMetric==1){
              age=$("#age").text();
              height=($("#feet").val()*30.48)+($("#inches").val()*2.54);
              weight=($("#imperialWeight").val()/2.2046);
              console.log(height);
              console.log(weight);
              


            }
          calories =  Math.ceil((10*weight+6.25*height-5*age+5)*1.55);
          protein=Math.ceil(weight*1.6);
          fats=Math.ceil((calories*0.3)/9);
          carbohydrates=Math.ceil((calories-((fats*9)+(protein*4)))/4);
        let tok = $("#token").val();
          console.log(tok);
          console.log($("#token").val());
         var str ='<form method="POST" action="/dashboard/nutrition/" id="nutritionFormSubmit" >      <input id="metricHeight" name="height" value="'+height+'" placeholder="Height (cm)"><br>      <input id="metricWeight" placeholder="Weight (kg)" name="weight" value="'+weight+'"><br>      <input type="hidden" name="_csrf" value="'+tok+'">    </form>'
          $("#nutritionSubmitDiv").replaceWith(str);
            $("#nutritionFormSubmit").submit();

          
            $("#caloriesValue").html(calories);
            $("#macroPro").html(protein+"g");
            $("#macroFat").html(fats+"g");
            $("#macroCarb").html(carbohydrates+"g");
        });
        
      });
    $(document).ready(function(){
      age=$("#age").text();
      weight=$("#weight").text();
      height=$("#height").text();
      calories =  Math.ceil((10*weight+6.25*height-5*age+5)*1.55);
      protein=Math.ceil(weight*1.6);
          fats=Math.ceil((calories*0.3)/9);
          carbohydrates=Math.ceil((calories-((fats*9)+(protein*4)))/4);
          $("#caloriesValue").html(calories);
            $("#macroPro").html(protein+"g");
            $("#macroFat").html(fats+"g");
            $("#macroCarb").html(carbohydrates+"g");



      
            $("#weightGoal").change(function(){
          calories =  Math.ceil((10*weight+6.25*height-5*age+5)*1.55);
          if($("weightGoal").val()==0){
            calories=calories;
          }
          if($("#weightGoal").val()==1){
            calories=calories-500;
            }
          if($("#weightGoal").val()==2){
            calories=calories+500;
          }
          protein=Math.ceil(weight*1.6);
          fats=Math.ceil((calories*0.3)/9);
          carbohydrates=Math.ceil((calories-((fats*9)+(protein*4)))/4);
          $("#caloriesValue").html(calories);
            $("#macroPro").html(protein+"g");
            $("#macroFat").html(fats+"g");
            $("#macroCarb").html(carbohydrates+"g");
          });
          });      

