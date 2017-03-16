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
    }

}

function Projects() {
    this.boardDict = {};
    this.add = function (boardName) {
        this.boardDict[Object.keys(this.boardDict).length] = boardName;
        var newBoard = new Board(boardName);
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

//exampleData();

var load_projects = function () {
    var boards = JSON.parse(localStorage.getItem("projects"));


    $("#projectshere").empty();
    $("#newprojectshere").empty();


    for (var board in boards) {

        var boardname = boards[board];

        $("#projectshere").append("<div class='cardplace'    id=" + board + "></div>");

        var htmltag = "<div id=" + boardname + " class='card' draggable='true'     > " + boardname + "</div>";
        $("#" + board).append(htmltag);
    }
    ;

    $("#newprojectshere").append("<div class='card new' id='newboardcard'>&times;</div>");
    $("#newboardcard").append("<input type='text' id='newBoardInput' placeholder='Project Name' style='display: none;' required>");
    $("#newboardcard").append("<input type='button' id='save' class='btn btn-default page-scroll bt-lg' value='Save' style='display: none;' onclick='saveNewBoard(),hide()'>");
    dragOn();

};

var newBoard = function () {
    document.getElementById('newBoardInput').style.display = 'flex';
    document.getElementById('save').style.display = 'flex';
    $("p").slideDown();
};

var hide = function () {
    document.getElementById('newBoardInput').style.display = 'none';
    document.getElementById('save').style.display = 'none';
};

var saveNewBoard = function () {
    var newBoard = $('#newBoardInput').val();
    var projects = new Projects();
    projects.update(newBoard);
    load_projects();
};

var replace = function (first, second) {
    var projects = new Projects();
    projects.get();
    projects.replace(first, second);
};


var dragged = Node;

function allowDrop(ev) {
    ev.preventDefault();

}


function dragenter(ev) {
    var contid = ev.target.parentNode.id;
    var targetid = dragged.parentNode.id;
    if (ev.target.parentNode === dragged.parentNode) {
        ev.preventDefault();
    }
    else {
        ev.preventDefault();
        ev.target.parentNode.replaceChild(dragged, ev.target);

        $('#' + targetid).empty();
        $('#' + targetid).append(ev.target);
        ev.target.style.opacity = 1;
        replace(contid, targetid);
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
    ev.target.style.opacity = 0;
}

$(document).ready(function () {
    load_projects();
});


$(document).on('click', '.card', function (e) {
    localStorage.setItem("board", this.id);
    show_board();
});


function dragOn() {
    $('.card').each(function () {
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

