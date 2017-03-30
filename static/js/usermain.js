/**
 * Created by atsidir on 2017.03.28..
 */
$(function() {
      showUserBoard();
});



function addClickListenerToBoards(boards) {
    for (var i=0;i<boards.length;i++){
        var board_id_in_db = boards[i]["id_in_db"];
        var board = document.getElementById(i);
        addEventListenerToBoard(board,board_id_in_db)
    }

    function addEventListenerToBoard(board,board_id_in_db) {
        board.addEventListener("click", function(){
            window.location.replace("/user_main/board/?title="+board_id_in_db);
        });
    }
}

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
    $('#board').empty();
    for (var i=0;i<boards.length;i++){
        var html='<div id="'+i+'" class="boardbox col-xs-2">'+boards[i].name+'</div>';
        $("#board").append(html);
    }
    addClickListenerToBoards(boards);
    addBoardDiv()
}

function addBoardDiv() {

    var html='<div id="newBoard" class="col-xs-2 card effect__click"><div class="newBoard card__front" >Add new board</div>' +
        '<form class="newBoard card__back" id="new_board"><input type="text" name=input_field id="input_field" placeholder="New Board Title"></div></div></div>';
    $("#board").append(html);
    addInputEvent()
}

function addAnimation() {
    $(".card.effect__click").bind("click",function () {

            var c = this.classList;
            console.log(c);
            if (c.contains("flipped") === true && c.contains("clicked") === false) {
                //c.add("clicked");
            } else {
                c.add("flipped");
            }
        });
}

function addInputEvent() {
    input_field.addEventListener("keypress", function () {
                    if (event.which == 13 || event.keyCode == 13) {
                        var c=$(".card.effect__click");
                        event.preventDefault();
                        c.removeClass("flipped");
                        create_new_board();
                    }
                })
}

function create_new_board(){
    var board_title=$('#input_field').serialize();
    $.ajax({
        url:'/create_new_board',
        data:board_title,
        type:'POST',
        success:function(data){
            if($('#input_field').val()!==""){
                $('#input_field').val("");
                insertNewBoard(data)
            }

        },
        error: function(){
            alert("nope");
        }
    })
}

function insertNewBoard(boardname) {
    var boardnumb=$("#board").children().length-1;
    var newItem = '<div id="'+boardnumb+'" class="boardbox col-xs-2">'+boardname+'</div>';
    $(newItem).insertBefore("#newBoard");
}

