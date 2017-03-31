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
function showLogin(){
    var button=$('#login_btn');
    switch (button.text()){
        case "Login":
            button.text("Cancel");
            break;
        case "Cancel":
            button.text("Login");
            break;
    }
    if ($('#sign_up_btn').text()==="Cancel"){
        $('#sign_up_btn').text("Sign up");
        $('#data_for_sign_up').slideToggle("slow");
    }
    $('#data_for_login').slideToggle("slow");
}

function showSignUp(){
    var button=$('#sign_up_btn');
    switch (button.text()){
        case "Sign up":
            button.text("Cancel");
            break;
        case "Cancel":
            button.text("Sign up");
            break;
    }
    if ($('#login_btn').text()==="Cancel"){
        $('#login_btn').text("Login");
        $('#data_for_login').slideToggle("slow");
    }
    $('#data_for_sign_up').slideToggle("slow");
}



