var imageList={};
var numbList=[];
var found=[];
for (var i=1;i<9;i++){
    numbList.push(i);
    numbList.push(i);
}


for (var i=1;i<17;i++) {
    var index=Math.floor(Math.random() * (17-i));
    imageList[i]=numbList[index];
    numbList.splice(index,1)
}

var firstp=0;
var secondp=0;
var previousid=0;

$(function () {
    for (var i=1;i<17;i++) {
    var html='<div id="'+i+'"class="col-xs-3 card effect__click">' +
        '<div class="newBoard card__front" ></div>' +
        '<div class="newBoard card__back" ></div></div></div>';
    $("#puzzle").append(html)
    }
    addAnimation()
});


function addAnimation() {
  var cards = document.querySelectorAll(".card.effect__click");
  for ( var i  = 0, len = cards.length; i < len; i++ ) {
    var card = cards[i];
    clickListener( card );
  }

  function clickListener(card) {
    card.addEventListener( "click", function() {

      if (previousid !== this.id) {
          var c = this.classList;
          var second=this.childNodes[1];
          if (c.contains("flipped") === true) {
              if (isFound(imageList[this.id])!==true) {
                c.remove("flipped");
                second.style.backgroundImage='';
              }
          } else {
              var imagen = imageList[this.id];
              console.log(previousid);
              second.style.backgroundImage = 'url("/static/pictures/' + imagen + '.jpg")';
              if (firstp === 0) {
                  firstp = imagen;
              } else {
                  if (firstp === imagen) {
                      found.push(firstp);
                      firstp = 0;
                      console.log("found");
                      console.log(found);
                  } else {

                  }
              }
              c.add("flipped");
              }
      } else {
          previousid=this.id;
      }
    });
  }
}

function isFound(number){
    for(var i=0;i<found.length;i++){
        if (found[i]===number) {
            return true
        }
    }
    return false
}