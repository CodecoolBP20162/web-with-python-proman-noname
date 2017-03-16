function Board(name) {
    this.name = name;
    this.dict = {};
    this.add = function (item) {
        this.dict[item] = "week1";
    }
};

function Projects() {
    this.boardDict = {};
    this.add = function (name) {
        this.boardDict[Object.keys(this.boardDict).length] = new Board(name);

    };
    this.get = function () {
        var dict = JSON.parse(localStorage.getItem("projects"));
        this.boardDict = dict["boardDict"];
    };
    this.save = function () {
        localStorage.setItem("projects", JSON.stringify(this));
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
};

var exampleData=function () {
    var projects = new Projects();
    console.log(projects.boardDict.length);
    projects.add("NoName");
    console.log(projects.dictlen);
    projects.add("SpaceShip");
    projects.add("Codezero");
    console.log(projects.dictlen);
    projects.add("Nuclear missile");
    console.log(projects.boardDict);
    localStorage.setItem("projects", JSON.stringify(projects));

}

//exampleData();

var load_projects = function () {
    var boardsObject = JSON.parse(localStorage.getItem("projects"));
    $("#projectshere").empty();
    $("#newprojectshere").empty();
    $("#projectshere").append("<div class='newBoard'><a href='javascript:void(0)' class='container text-center' id ='newprojectshere' ></a></div>");

    for (var board in boardsObject.boardDict) {

        var boardname = boardsObject.boardDict[board].name;
        $("#projectshere").append("<div class='cardplace'    id=" + board + "></div>");

        var htmltag = "<div id=" + boardname + " class='card' draggable='true'  ondragover='allowDrop(event)' ondragenter='dragenter(event)' ondragstart='drag(event)' ondragend='dragend(event)'><input type='image' src='/static/pictures/pin.png' height='40' width='40'><p></p>" + boardname + "</div>"
        $("#" + board).append(htmltag);
    }
    ;

    $("#newprojectshere").append("<div class='card new' id='newboardcard'><input type='image' src='/static/pictures/plus.png' height='40' width='40' onclick='showInputs()'></div>");
    $("#newboardcard").append("<input type='text' class='inputBox' id='newBoardInput' size=10x'  maxlength='30' placeholder='Project Name' required>");
    $("#newboardcard").append("<input type='button' id='save' class='inputButton' value='Save' onclick='saveNewBoard()'>");

};

var newBoard = function () {
    document.getElementById('newBoardInput').style.display = 'flex';
    document.getElementById('save').style.display = 'flex';
};

var showInputs = function(){
    var inputBox = document.getElementById('newBoardInput');
    var inputButton = document.getElementById('save');
    if (inputBox.style.display === 'none') {
        inputBox.style.display = 'flex';
        inputButton.style.display = 'flex';
    } else {
        inputBox.style.display = 'none';
        inputButton.style.display = 'none';
    }
}

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
    //load_projects();
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
        ev.target.style.opacity=1;
        replace(contid, targetid);
    };

}

function dragend(ev) {
    ev.target.style.opacity=1;

}

function drag(ev) {
    ev.dataTransfer.setData("boardid", ev.target.id);
    ev.dataTransfer.setData("contid", ev.target.parentNode.id);
    dragged =ev.target;
    ev.target.style.opacity=0;

};

$(document).ready(function () {
    /*localStorage.clear();*/
    /*exampleData();*/
    load_projects();
});