/**
 * Created by peter on 2017.03.13..
 */
$(document).ready(function () {
    var cards = JSON.parse(localStorage.getItem("board1"));
    for (var card in cards) {
        var newDiv = document.createElement("p");
        var newContent = document.createTextNode(cards[card]);
        newDiv.appendChild(newContent);
        var currentDiv = document.getElementById("p1");
        document.body.insertBefore(newDiv, currentDiv);
    }

});

function add_card() {
    var cards = JSON.parse(localStorage.getItem("board1"));
    var length = cards.length()
    cards[length] = "Card "+length;
    for (var card in cards) {
        console.log(cards[card]);
    }
    localStorage.setItem("board1", JSON.stringify(cards));
    window.location.reload(false);

}

function create_example_data() {
    var cards = {1: "Card 1", 2: "Card 2", 3: "Card 3"};
    localStorage.setItem("board1", JSON.stringify(cards));
    window.location.reload(false);
}
    
