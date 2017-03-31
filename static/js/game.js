var imageList = {};
var numbList = [];
var found = [];
for (var i = 1; i < 9; i++) {
    numbList.push(i);
    numbList.push(i);
}


for (var i = 1; i < 17; i++) {
    var index = Math.floor(Math.random() * (17 - i));
    imageList[i] = numbList[index];
    numbList.splice(index, 1)
}
var opened = 0;
var firstp = 0;
var firstCardClass;
var firstCardBlack;
var previousid = 0;
var secondCardClass;
var secondCardBack;

$(function () {
    for (var i = 1; i < 17; i++) {
        var html = '<div id="' + i + '"class="col-xs-3 card effect__click">' +
            '<div class="newBoard card__front" ></div>' +
            '<div class="newBoard card__back" ></div></div></div>';
        $("#puzzle").append(html)
    }
    addCardFunction()
});


function addCardFunction() {
    var cards = document.querySelectorAll(".card.effect__click");
    for (var i = 0, len = cards.length; i < len; i++) {
        var card = cards[i];
        clickListener(card);
    }

    function clickListener(card) {
        card.addEventListener("click", function () {
            if (previousid !== this.id && isNotFound(this.id)) {
                console.log("beenegedett");
                previousid = this.id;
                flipCard(this);
                var imageId = imageList[card.id];
                if (opened === 2) {
                    flipBackTwoOpenedCards();
                }
                opened += 1;
                if (firstp === 0) {
                    firstp = imageList[this.id];
                    saveFirstCard(this);
                } else {
                    if (firstp === imageId) {
                        found.push(imageId);
                        firstp = 0;
                        opened = 0;
                    } else {
                        saveSecondCard(this);
                    }
                }
            }
        });
    }
}

function isNotFound(id) {
    var imageId=imageList[id];
    console.log(imageId);
    for (i=0;i<found.length;i++){
        if (found[i]===imageId)
        {
            console.log("hamis");
            return false
        }
    }
    return true
}

function flipCard(card) {
    var thisClassList = card.classList;
    var cardBack = card.childNodes[1];
    var imageId = imageList[card.id];
    cardBack.style.backgroundImage = 'url("/static/pictures/' + imageId + '.jpg")';
    thisClassList.add("flipped");

}

function flipBackTwoOpenedCards() {
    firstCardClass.remove("flipped");
    firstCardBlack.style.backgroundImage = '';
    secondCardClass.remove("flipped");
    secondCardBack.style.backgroundImage = '';
    opened = 0;
    firstp = 0;
}

function saveFirstCard(card) {
    firstCardClass = card.classList;
    firstCardBlack = card.childNodes[1];
}

function saveSecondCard(card) {
    secondCardClass = card.classList;
    secondCardBack = card.childNodes[1];
}