/**
 * Created by peter on 2017.03.13..
 */


var can_add = true;

function get_data(what_to_return) {
    var board_title = localStorage.getItem("board");
    switch (what_to_return) {
        case "board_title":
            return board_title;
            break;
        case "cards":
            return JSON.parse(localStorage.getItem(board_title));
            break;
    }
}

function save_card_data(index, new_text) {
    var board_title = get_data("board_title");
    var board = get_data("cards");
    var cards=board.cards;
    cards[index] = new_text;
    localStorage.setItem(board_title, JSON.stringify(board));
}

function show_board() {
    $("#projectshere").empty();
    $("#newprojectshere").empty();

    var board_title = get_data("board_title");

    var board = get_data("cards");
    var cards=board.cards;


    function show_title() {
        $("body").prepend($('<h1>' + board.name + '</h1><h5 id="haha"></h5>'));
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
            $("#card" + card_number).width("200");
            $("#card" + card_number).animate({height: '300px', opacity: '0.3'}, 400);
            $("#card" + card_number).animate({opacity: '1'}, "slow");
        }
    }

    show_title();
    show_create_card_card();
    show_cards();
    dragOn("ball");

}



function add_card() {
    if (can_add === true) {
        can_add = false;
        var board_title = get_data("board_title");
        var board = get_data("cards");
        var cards=board.cards;
        console.log(cards);
        var length = Object.keys(cards).length;
        var index = eval(length + 1);

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
                $("#card" + index).append('<img class ="edit_save_button" id="save_card' + index + '" src="../static/pictures/floppy.png" onclick="save_card(' + index + ')">')
            });
        }

        create_new_card();
        show_new_card();
        dragOn("ball");
    } else {
        show_popup()
    }
}

function create_example_data() {
    localStorage.clear();
    localStorage.setItem("board", "board_name_from_boards");
    var cards = {1: "Card 1,Task1", 2: "Card 2,Task2", 3: "Card 3,Task3"};
    localStorage.setItem("board_name_from_boards", JSON.stringify(cards));
    location.reload();
}

function create_card(content, index) {

    return $('<div class="cardplace2" id='+index+'><div id="card' + index + '" class="card newcard ball" draggable="true">' + "<input type='image' draggable='false' class='pin' src='/static/pictures/pin.png' height='40' width='40'><p></p>" +
        '<textarea draggable="false"class="textarea" maxlength=30 readonly id="textarea' + index + '">' + content + '</textarea>' +
        '<img class="edit_save_button" draggable="false" id="edit_card' + index + '" src="../static/pictures/pen.png" onclick="edit_card(' + index + ')">' +
        '</div> </div></div>');
}

function create_add_card_card() {
    return $('<div class="col-xs-2 new2_col-xs-2"  id="add_card" onclick="add_card()">' +
        '<h2 class="h2">Add new card</h2>' +
        '<img class="plus_image "src="../static/pictures/plus.png">' +
        '</div>');
}

function edit_card(index) {

    $("#textarea" + index).prop("readOnly", false);
    $("#textarea" + index).focus();
    $("#edit_card" + index).fadeOut(400, function () {
        $("#edit_card" + index).remove();
        $("#card" + index).append('<img class="edit_save_button" id="save_card' + index + '" src="../static/pictures/floppy.png" onclick="save_card(' + index + ')">');
    });

}

function save_card(index) {
    var new_text = $("#textarea" + index).val();

    function switch_to_edit_button() {
        $("#textarea" + index).prop("readOnly", true);
        $("#save_card" + index).fadeOut(400, function () {
            $("#save_card" + index).remove();
            $("#card" + index).append('<img class="edit_save_button" id="edit_card' + index + '" src="../static/pictures/pen.png" onclick="edit_card(' + index + ')">');
        });
    }

    save_card_data(index, new_text);
    switch_to_edit_button();
    can_add = true;
}

function show_popup() {
    $("#bsalert").remove();

    $("#haha").append('<div class="alert alert-info fade in" id="bsalert"> <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a> <strong>Fill out and save the last card.</strong></div>').hide().fadeIn(1000).fadeOut(1500);

}