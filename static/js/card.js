/**
 * Created by peter on 2017.03.13..
 */
$(document).ready(function () {
    var board_title = localStorage.getItem("board");
    var cards = JSON.parse(localStorage.getItem(board_title));
    var length = eval(Object.keys(cards).length+1);
    var title = $('<h1>' + board_title + '</h1>');
    $("body").prepend(title)
    for (var card in cards) {
        var text = cards[card];
        var card = create_card(text, card);
        $("#container").append(card);
    }
    var card = create_card("Add card", length);
    $("#container").append(card);
});

function add_card() {
    var board_title = localStorage.getItem("board");
    var cards = JSON.parse(localStorage.getItem(board_title));
    var length = Object.keys(cards).length;
    var index = eval(length + 1)
    text = "Card " + index;
    cards[length + 1] = text
    var card = create_card(text, index);
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

function create_card(content, index) {
    return $('<div class="col-lg-2" style="width: 200px; height: 300px; background-color: #b44214; ' +
        'word-wrap:break-word; margin:5px;border-radius:25px">' +
        '<textarea id="textarea' + index + '"readonly maxlength="30" style="width: 160px; height: 230px; background-color: #b44214; ' +
        'word-wrap:break-word; margin:5px; font-size: 30px; border: none; resize: none;">' + content + '</textarea>' +
        '<div class="button_group" style="position: absolute; bottom: 10px; right: 50px">' +
        '<button style="margin:5px" class="btn btn-success" onclick="edit_card(' + index + ')">Edit</button>' +
        '<button style="margin:5px" class="btn btn-info" onclick="save_card(' + index + ')">Save</button>' +
        '</div> </div>');
}

function edit_card(index) {
    textarea = "textarea" + index
    document.getElementById(textarea).readOnly = false;
    document.getElementById(textarea).focus();
}

function save_card(index) {
    textarea = "textarea" + index
    document.getElementById(textarea).readOnly = true;
    var new_text = document.getElementById(textarea).value;
    var board_title = localStorage.getItem("board");
    var cards = JSON.parse(localStorage.getItem(board_title));
    cards[index] = new_text;
    localStorage.setItem(board_title, JSON.stringify(cards));
}