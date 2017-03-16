/**
 * Created by peter on 2017.03.13..
 */

var can_add = true;

$(document).ready(function () {

    var board_title = localStorage.getItem("board");
    var cards = JSON.parse(localStorage.getItem(board_title));
    var length = eval(Object.keys(cards).length + 1);

    function show_title() {
        $("body").prepend($('<h1>' + board_title + '</h1>'));
    }

    function show_create_card_card() {
        $("#container").append(create_add_card_card());
        $("#add_card").animate({height: '300px', opacity: '0.3'}, 400);
        $("#add_card").animate({opacity: '1'}, "slow");
    }

    function show_cards() {
        for (var card_number in cards) {
            var text = cards[card_number];
            $("#container").append(create_card(text, card_number));
            $("#card" + card_number).width("170");
            $("#card" + card_number).animate({height: '300px', opacity: '0.3'}, 400);
            $("#card" + card_number).animate({opacity: '1'}, "slow");
        }
    }
    show_title();
    show_create_card_card();
    show_cards()
});


function add_card() {
    if (can_add === true) {
        can_add = false;
        var board_title = localStorage.getItem("board");
        var cards = JSON.parse(localStorage.getItem(board_title));
        var length = Object.keys(cards).length;
        var index = eval(length + 1)

        function create_new_card() {
            text = "";
            cards[length + 1] = text;
            $("#container").append(create_card(text, index));
        }

        function show_new_card() {
            $("#card" + index).animate({height: '300px', opacity: '0.3'}, "fast");
            $("#card" + index).animate({width: '200px', opacity: '0.3'}, "fast");
            $("#card" + index).animate({opacity: '1'}, "slow", function () {
                $("#textarea" + index).prop("readOnly", false);
                $("#textarea" + index).focus();
                $("#edit_card" + index).remove();
                $("#card" + index).append('<img id="save_card' + index + '" src="../static/css/save_icon.png" height="30" width="30" onclick="save_card(' + index + ')" style="position: absolute; left: 90px; top: 250px;">')
            });
        }

        create_new_card();
        show_new_card();
    }
}

function create_example_data() {
    localStorage.clear();
    localStorage.setItem("board", "board_name_from_boards");
    var cards = {1: "Card 1", 2: "Card 2", 3: "Card 3"};
    localStorage.setItem("board_name_from_boards", JSON.stringify(cards));
    location.reload();
}

function create_card(content, index) {
    return $('<div id="card' + index + '" class="col-xs-2" style="width: 1px; height: 1px; background-color: #b44214; ' +
        'word-wrap:break-word; margin:5px;border-radius:25px;opacity: 0.3">' +
        '<textarea id="textarea' + index + '" readonly maxlength="30" style="width: 160px; height: 230px; background-color: #b44214; ' +
        'word-wrap:break-word; margin:5px; font-size: 30px; border: none; resize: none;">' + content + '</textarea>' +
        '<img id="edit_card' + index + '" src="../static/css/pencil_and_paper-512.png" height="30" width="30" onclick="edit_card(' + index + ')" style="position: absolute; left: 90px; top: 250px;">' +
        '</div> </div>');
}

function create_add_card_card() {
    return $('<div class="col-xs-2" id="add_card" onclick="add_card()" style="width: 200px; height: 1px; background-color: #b44214; ' +
        'margin:5px;border-radius:25px ;opacity: 0.3">' +
        '<h2 align="center" style="font-size: 30px">Add new card</h2>' +
        '<img src="../static/css/plus.png" height="150" width="100" style="position: absolute; left: 50px; top: 100px;">' +
        '</div>');
}

function edit_card(index) {
    $("#textarea" + index).prop("readOnly", false);
    $("#textarea" + index).focus();
    $("#edit_card" + index).fadeOut(400, function () {
        $("#edit_card" + index).remove();
        $("#card" + index).append('<img id="save_card' + index + '" src="../static/css/save_icon.png" height="30" width="30" onclick="save_card(' + index + ')" style="position: absolute; left: 90px; top: 250px;">')
    });

}

function save_card(index) {
    var new_text = $("#textarea" + index).val();
    var board_title = localStorage.getItem("board");
    var cards = JSON.parse(localStorage.getItem(board_title));

    function save_card_data() {
        cards[index] = new_text;
        localStorage.setItem(board_title, JSON.stringify(cards));
    }

    function switch_to_edit_button() {
        $("#textarea" + index).prop("readOnly", true);
        $("#save_card" + index).fadeOut(400, function () {
        $("#save_card" + index).remove();
        $("#card" + index).append('<img id="edit_card' + index + '" src="../static/css/pencil_and_paper-512.png" height="30" width="30" onclick="edit_card(' + index + ')" style="position: absolute; left: 90px; top: 250px;">')
        });
    }
    save_card_data();
    switch_to_edit_button();
    can_add = true;
}