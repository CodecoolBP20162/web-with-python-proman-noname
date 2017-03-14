/**
 * Created by peter on 2017.03.13..
 */



$(document).ready(function () {
    var board_title = localStorage.getItem("board");
    var cards = JSON.parse(localStorage.getItem(board_title));
    var title = $('<h1>' + board_title + '</h1>');
    $("body").prepend(title)
    for (var card in cards) {
        var text = cards[card];
        var card = create_card(text);
        $("#container").append(card);
    }
});

function add_card() {
    var board_title = localStorage.getItem("board");
    var cards = JSON.parse(localStorage.getItem(board_title));
    var length = Object.keys(cards).length;
    text = "Card " + eval(length + 1);
    cards[length + 1] = text
    var card = create_card(text);
    $("#container").append(card);
    localStorage.setItem(board_title, JSON.stringify(cards));

}

function create_example_data() {
    localStorage.clear();
    localStorage.setItem("board", "board_name_from_boards");
    var cards = {1: "Card 1", 2: "Card 2", 3: "Card 3"};
    localStorage.setItem("board_name_from_boards", JSON.stringify(cards));
    location.reload();
}

function create_card(content) {
    return $('<div class="col-lg-2" style="width: 200px; height: 300px; background-color: #b44214; ' +
        'margin: auto; word-wrap:break-word;margin:5px 5px 5px 5px;border-radius: 25px">' +
        '<h2>' + content + '</h2>' +
        '<div class="button_group" style="position: absolute; bottom: 10px; right: 50px">' +
        '<button style="background-color: transparent; border: none;"><img src="../static/css/pencil_and_paper-512.png" height="30" width="30"></button>' +
        '<button style="background-color: transparent; border: none;"><img src="../static/css/save_icon.png" height="30" width="30"></button>' +
        '</div> </div>');
}
