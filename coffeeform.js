function getFormData(event) {
  event.preventDefault();
  var inputData = {
    coffee: $('input[name=coffee]').val(),
    flavor: $('input[name=flavor]').val(),
    body: $('input[name=body]').val(),
    ft: $('input[name=ft]').val(),
    cup: $('input[name=cup]').val(),
    location: $('input[name=location]').val(),

// Feel like the function below should be combined with the one above somehow.    
$(function(){
  $('#coffeeform').on('submit', function(e){
    e.preventDefault();
    $.ajax({
    type: "POST",
    url: "http://localhost:3000",
    data: $(this).serialize(),
    success: function() {
    alert('Success!');
           }
        });
      });
    });

};
var jsonToPage = new Resource(inputData); // 'Resource' ok here?
var stringifiedJson = JSON.stringify(jsonToPage);
var bestJson = stringifiedJson.replace(/",/g , '", <br>'); //Is '/g' regex so that all of the json content is wiped out of the html page after user clicks 'Submit'?
$('#jsonArea').html(bestJson);
}

// $('submit').on('click',getFormData);
