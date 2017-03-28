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
       fillBoard(response)
    }
});
}

function fillBoard(boards) {
    for (var i=0;i<boards.length;i++){
        var html='<div id="'+i+'" class="boardbox">'+boards[i].name+'</div>';
        $("#board").append(html)
    }
}