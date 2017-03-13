/**
 * Created by peter on 2017.03.13..
 */
$(document).ready(function () {
    var cards = JSON.parse(localStorage.getItem("board1"));
    for (var card in cards) {
        var newContent = cards[card];
        var card_button = $('<input type="button" value="'+newContent+'"/>');
        $("body").append(card_button);
    }

});

function add_card() {
    var cards = JSON.parse(localStorage.getItem("board1"));
    var length = Object.keys(cards).length;
    newContent = "Card " + eval(length + 1);
    cards[length + 1] = newContent
    var card_button = $('<input type="button" value="'+newContent+'"/>');
    $("body").append(card_button);
    localStorage.setItem("board1", JSON.stringify(cards));

}

function create_example_data() {
    localStorage.clear();
    var cards = {1: "Card 1", 2: "Card 2", 3: "Card 3"};
    localStorage.setItem("board1", JSON.stringify(cards));
    location.reload();
}
    
