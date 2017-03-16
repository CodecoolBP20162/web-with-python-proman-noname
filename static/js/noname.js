function Card(title) {
    this.title = title;

}
function Board(name) {
    this.name = name;
    this.cards = {};
    this.add = function (cardtitle) {
        this.cards[Object.keys(this.cards).length] = cardtitle;
        var newCard = new Card(cardtitle);
        localStorage.setItem(cardtitle, JSON.stringify(newCard));

    };
    this.get = function () {
        this.cards = JSON.parse(localStorage.getItem(this.name));

    };
    this.save = function () {
        localStorage.setItem(this.name, JSON.stringify(this.cards));
    };

    this.update = function (cardtitle) {
        this.add(cardtitle);
        this.save();
    };

    this.replace = function (first, second) {
        var temp = this.cards[first];
        this.cards[first] = this.cards[second];
        this.cards[second] = temp;
        this.save();
    }

}

function Projects() {
    this.boardDict = {};
    this.add = function (boardName) {
        this.boardDict[Object.keys(this.boardDict).length] = boardName;
        var newBoard = new Board(boardName);
        console.log(newBoard.cards);
        localStorage.setItem(boardName, JSON.stringify(newBoard.cards));


    };
    this.get = function () {
        this.boardDict = JSON.parse(localStorage.getItem("projects"));

    };
    this.save = function () {
        localStorage.setItem("projects", JSON.stringify(this.boardDict));
    };

    this.update = function (item) {
        this.get();
        this.add(item);
        this.save();
    };

    this.replace = function (first, second) {
        var temp = this.boardDict[first];
        this.boardDict[first] = this.boardDict[second];
        this.boardDict[second] = temp;
        this.save();
    };
}

var exampleData = function () {
    var projects = new Projects();


    projects.add("NoName");
    projects.add("SpaceShip");
    projects.add("Codezero");

    projects.add("Nuclear missile");
    projects.save();

};

var load_projects = function () {
    var boards = JSON.parse(localStorage.getItem("projects"));


    $("#projectshere").empty();
    $("#newprojectshere").empty();
    $("#projectshere").append("<div class='cardplace'><div class='card' id='newboardcard'><input type='image' class='plus' src='/static/pictures/plus.png' height='40' width='40' onclick='showInputs()'></div></div>");


    for (var board in boards) {

        var boardname = boards[board];

        $("#projectshere").append("<div class='cardplace'    id=" + board + "></div>");


        var htmltag = "<div id=" + boardname + " class='card boardcard' draggable='true'><input draggable='false' type='image' src='/static/pictures/pin.png' height='40' width='40'><p></p> " + boardname + "</div>";

        $("#" + board).append(htmltag);
    }
    ;

    $("#newboardcard").append("<input type='text' class='inputBox' id='newBoardInput' size=10x'  maxlength='30' placeholder='Project Name' required>");
    $("#newboardcard").append("<input type='button' id='save' class='inputButton' value='Save' onclick='saveNewBoard()'>");
    dragOn("boardcard");
};



var showInputs = function () {
    var inputBox = document.getElementById('newBoardInput');
    var inputButton = document.getElementById('save');
    if (inputBox.style.display === 'none') {
        inputBox.style.display = 'flex';
        inputButton.style.display = 'flex';
    } else {
        inputBox.style.display = 'none';
        inputButton.style.display = 'none';
    }
};


var saveNewBoard = function () {
    var newBoard = $('#newBoardInput').val();
    var projects = new Projects();
    projects.update(newBoard);
    showInputs();
    load_projects();
};

var replace = function (first, second) {
    var projects = new Projects();
    projects.get();
    projects.replace(first, second);
};

var replaceCard = function (first, second) {
    var boardname = get_data("board_title");
    var board = new Board(boardname);
    board.get();
    board.replace(first, second);
};

var dragged = Node;


function allowDrop(ev) {
    ev.preventDefault();

}


function dragenter(ev) {

    if (ev.target.classList.contains("boardcard") || ev.target.classList.contains("ball")) {

        var targetid = ev.target.parentNode.id;
        var contid = dragged.parentNode.id;

        if (contid === targetid) {
            ev.preventDefault();
        } else {
            ev.preventDefault();
            ev.target.parentNode.replaceChild(dragged, ev.target);

            $('#' + contid).empty();
            $('#' + contid).append(ev.target);
            ev.target.style.opacity = 1;
            console.log(ev.target);
            if (dragged.classList.contains("boardcard")) {
                replace(contid, targetid);
            }
            else
                replaceCard(contid, targetid);
        }
    }


}


function dragend(ev) {
    ev.target.style.opacity = 1;

}

function drag(ev) {
    console.log(ev);
    ev.originalEvent.dataTransfer.setData("boardid", ev.target.id);
    ev.originalEvent.dataTransfer.setData("contid", ev.target.parentNode.id);
    dragged = ev.target;
    dragged.style.opacity = 0;
}

$(document).ready(function () {

    var actual=localStorage.getItem("actual");


    if (actual===null) {
        load_projects();
    } else {
        if (actual==="true"){
            load_projects();
        } else {
            show_board();
        }
    }

});

function setActual() {
    localStorage.setItem("actual",true);
    location.reload();

}
$(document).on('click', '.boardcard', function (e) {
    localStorage.setItem("board", this.id);
    localStorage.setItem("actual",false);
    show_board();
});


function dragOn(className) {
    $('.' + className).each(function () {
        $(this).on('dragstart', function (e) {
            drag(e);
        });
        $(this).on('dragover', function (e) {
            allowDrop(e);
        });
        $(this).on('dragenter', function (e) {
            dragenter(e);
        });
        $(this).on('dragend', function (e) {
            dragend(e);
        });
    });
}

