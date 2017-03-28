/*
$(function () {
    $('form').submit(function () {
        var email= $.trim($('#email').val());
        if(email.includes('@')) {
            $.ajax({
                    url: '/',
                    data: $('form').serialize(),
                    type: 'POST',
                    success: function(response){
                    $("#result").empty();
				    $("#result").append(response.success)
			        }
                }
            )
        }
        return false
    });
});
*/
console.log('ready');



