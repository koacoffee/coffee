$('#coffeeform').submit(function() {
    $.ajax({
       type: 'POST',
       dataType: 'json', 
       url: 'data.json',
       data: {'data':$(this).serialize()},
       success: function(data) {
           alert(data.message);
       },
       failure: function (data) {
           alert('Please try again');
       }
    });
 });



// $('#coffeeform').on('submit', function(e){
//
//     // prevent default submit action
//     e.preventDefault();
//
//     var serialized = $(this).serializeArray(),
//         obj = {};
//
//     // build key-values
//     $.each(serialized, function(){
//        obj [this.name] = this.value;
//     });
//
//     // and the json string
//     var json = JSON.stringify(obj);
//
//     console.log(json);
//     // send your data here...
//
// });
