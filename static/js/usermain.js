/**
 * Created by atsidir on 2017.03.28..
 */

$(function() {
      showUserBoard();
});

function showUserBoard() {
    $.ajax({
    url:'/load_board',
    success: function(response){
       fillBoards(response);
        addAnimation()
    }
});
}

function fillBoards(boards) {
    $('#board').empty()
    for (var i=0;i<boards.length;i++){
        var html='<div id="'+i+'" class="boardbox col-xs-3">'+boards[i].name+'</div>';
        $("#board").append(html);
    }
    addBoardDiv()
}

function addBoardDiv() {

    var html='<div class="col-xs-3 card effect__click"><div class="newBoard card__front" >Add new board</div>' +
        '<form class="newBoard card__back" id="new_board"><input type="text" name=input_field id="input_field" placeholder="New Board Title"></div></div></div>';
    $("#board").append(html);
}

function addAnimation() {
    var cards = document.querySelectorAll(".card.effect__click");
    for (var i = 0, len = cards.length; i < len; i++) {
        var card = cards[i];
        clickListener(card);
    }

    function clickListener(card) {
        card.addEventListener("click", function () {
            var c = this.classList;
            if (c.contains("flipped") === true && c.contains("clicked") === false) {
                var new_card = document.getElementById("new_board");
                input_field.addEventListener("keypress", function () {
                    if (event.which == 13 || event.keyCode == 13) {
                        c.remove("flipped");
                        create_new_board();
                        $('#input_field').val("");
                    }
                })
            } else {
                c.add("flipped");
            }
        });
    }
}

function create_new_board(){
    var board_title=$('#input_field').serialize();
    $.ajax({
        url:'/create_new_board',
        data:board_title,
        type:'POST',
        success:function(data){
            console.log(data);
        },
        error: function(){
            alert("nope");
        }
    })

}


