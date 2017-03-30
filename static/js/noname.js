$(function() {

      initDragula();
});




function initDragula() {
    var drake = dragula({
          isContainer: function (el) {
              return el.classList.contains('newList');
          }
      });

      drake.on('drop',function (el, target,source) {
          var children=target.children;
          for(var i=0;i<children.length;i++){
              var data={'oldstatus':source.id,'oldid':el.id,'newstatus':target.id,'newid':i};
              updateData(data);
              $(children[i]).attr("id",i)
          }

          var sourcechild=source.children;
          for(var i=0;i<sourcechild.length;i++){
              $(sourcechild[i]).attr("id",i)
          }
      });
}



function updateData(data) {
    $.ajax({
                  url: '/save_data',
                  data: JSON.stringify(data),
                  contentType: "application/json",
                  type: 'post'
              });
}

function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    //document.getElementById("boards_main").style.marginLeft = "250px";
}
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    //document.getElementById("boards_main").style.marginLeft= "150px";
}

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


