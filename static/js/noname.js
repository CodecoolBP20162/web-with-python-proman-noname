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
    document.getElementById("main").style.marginLeft = "250px";
}
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft= "0";
}

