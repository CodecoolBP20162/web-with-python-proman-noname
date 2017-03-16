/**
 * Created by peter on 2017.03.13..
 */
function showBoard() {
    var board_title = localStorage.getItem("board");
    console.log(board_title);
    var cards = JSON.parse(localStorage.getItem(board_title));
    console.log(cards);
    /*
    var length = eval(Object.keys(cards).length+1);
    var title = $('<h1>' + board_title + '</h1>');
    $("body").prepend(title)
    var add_card = create_add_card();
    $("#container").append(add_card);
    for (var card in cards) {
        var text = cards[card];
        var card = create_card(text, card);
        $("#container").append(card);
    }
    */

};

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
        '<button style="background-color: transparent; border: none;"><img src="../static/css/pencil_and_paper-512.png" height="30" width="30" onclick="edit_card(' + index + ')"></button>' +
        '<button style="background-color: transparent; border: none;"><img src="../static/css/save_icon.png" height="30" width="30" onclick="save_card(' + index + ')"></button>' +
        '</div> </div>');
}

function create_add_card() {
    return $('<div class="col-lg-2" style="width: 200px; height: 300px; background-color: #b44214; ' +
        'margin:5px;border-radius:25px">' +
            '<img src="../static/css/plus.png" height="150" width="100" onclick="add_card()" style="position: absolute; left: 50px; top: 75px;">'+
        '</div>');
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