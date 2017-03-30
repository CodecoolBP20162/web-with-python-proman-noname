$(function() {
      showUserBoard();
});

function addClickListenerToBoards(boards) {
    for (var i=0;i<boards.length;i++){
        var board_id_in_db = boards[i]["id_in_db"];
        var board = document.getElementById(board_id_in_db);
        addEventListenerToBoard(board,board_id_in_db)
    }
}

function addEventListenerToBoard(board,board_id_in_db) {
    board.addEventListener("mouseover", function () {
        $("#" + board_id_in_db + "d").toggleClass('slide-left')
    });

    board.addEventListener("mouseout", function () {
        $("#" + board_id_in_db + "d").toggleClass('slide-left')
    });

    board.addEventListener("click", function () {
        window.location.replace("/user_main/board/?title=" + board_id_in_db);
    });
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
    //$('#board').empty();
    for (var i=0;i<boards.length;i++){
        var deleteid=boards[i].id_in_db;
        var deletehtml='<div id="'+deleteid+'d'+'" class="deleteButton" onclick="event.cancelBubble=true;">X</div>';
        var html='<div id="'+boards[i].id_in_db+'" class="boardbox col-xs-2">'+boards[i].name+deletehtml+'</div>';
        $("#board").append(html);
        addDeleteListener(deleteid)
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

function addDeleteListener(boardid) {
    $("#"+boardid+'d').bind("click",function () {
        deleteBoard(boardid)
    })

}

function deleteBoard(boardid) {
    $.post('/delete_board',{boardid:boardid}, function () {
            $("#"+boardid).remove()
    })
}

function insertNewBoard(board) {
    var deletehtml='<div id="'+board.boardid+'d'+'" class="deleteButton" onclick="event.cancelBubble=true;">X</div>';
    var newItem = '<div id="'+board.boardid+'" class="boardbox col-xs-2">'+board.boardname+deletehtml+'</div>';
    $(newItem).insertBefore("#newBoard");

    var newboard=document.getElementById(board.boardid);

    addEventListenerToBoard(newboard,board.boardid);
    addDeleteListener(board.boardid)
}

function loadGame() {
    window.location.replace("/mini_game");
}

function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    //document.getElementById("boards_main").style.marginLeft = "250px";
}
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    //document.getElementById("boards_main").style.marginLeft= "150px";
}
