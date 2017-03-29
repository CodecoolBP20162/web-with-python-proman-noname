/**
 * Created by atsidir on 2017.03.28..
 */

$(function() {
      showUserBoard();
});



function showCards(board_id_in_db){
    $.post("/get_status_list",function( data ) {
        for (var i =0;i<data.length;i++) {
            var status = data[i];
            getCellListByStatus(status)
        }

        function getCellListByStatus(status) {
            $.post("/load_cells_by_status",{board_id:board_id_in_db, status:status}, function( data ) {
                console.log(data)
            });
        }
    })

}

function addClickListenerToBoards(boards) {
    for (var i=0;i<boards.length;i++){
        var board_id_in_db = boards[i]["id_in_db"]
        var board = document.getElementById(i)
        addEventListenerToBoard(board,board_id_in_db)
    }

    function addEventListenerToBoard(board,board_id_in_db) {
        board.addEventListener("click", function(){
            showCards(board_id_in_db)
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
    for (var i=0;i<boards.length;i++){
        var html='<div id="'+i+'" class="boardbox col-xs-3">'+boards[i].name+'</div>';
        $("#board").append(html);
    }
    addClickListenerToBoards(boards)
    addBoardDiv()
}

function addBoardDiv() {

    var html='<div class="col-xs-3 card effect__click"><div class="newBoard card__front" >Add new board</div>' +
        '<div class="newBoard card__back" >Backboard</div></div></div>';
    $("#board").append(html);
}

function addAnimation() {
  var cards = document.querySelectorAll(".card.effect__click");
  for ( var i  = 0, len = cards.length; i < len; i++ ) {
    var card = cards[i];
    clickListener( card );
  }

  function clickListener(card) {
    card.addEventListener( "click", function() {
      var c = this.classList;
      c.contains("flipped") === true ? c.remove("flipped") : c.add("flipped");
    });
  }
}