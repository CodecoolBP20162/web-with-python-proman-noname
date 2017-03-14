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

/*
var projects = new Projects();
console.log(projects.boardDict.length);
projects.add("NoName");
console.log(projects.dictlen);
projects.add("SpaceShip");
projects.add("Codezero");
console.log(projects.dictlen);
projects.add("Nuclear missile");
console.log(projects.boardDict);
localStorage.setItem("projects", JSON.stringify(projects));*/


var load_projects = function () {
    var boardsObject = JSON.parse(localStorage.getItem("projects"));
    $("#projectshere").empty();
    $("#newprojectshere").empty();


    for (var board in boardsObject.boardDict) {

        var boardname = boardsObject.boardDict[board].name;
        $("#projectshere").append("<div class='cardplace'    id=" + board + "></div>");

        var htmltag = "<div id=" + boardname + " class='card' draggable='true' ondrop='drop(event)' ondragover='allowDrop(event)' ondragstart='drag(event)'>" + boardname + "</div>"
        $("#" + board).append(htmltag);
    };

    $("#newprojectshere").append("<div class='card' >New Board</div>");

};

var newBoard = function () {
    document.getElementById('newBoardInput').style.display = 'flex';
    document.getElementById('save').style.display = 'flex';
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
    //load_projects();
};

$(document).ready(function () {
    load_projects();
});

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("boardid", ev.target.id);
    ev.dataTransfer.setData("contid", ev.target.parentNode.id);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("boardid");
    var contid = ev.dataTransfer.getData("contid");
    var targetid=ev.target.parentNode.id;
    ev.target.parentNode.replaceChild(document.getElementById(data),ev.target);
    $('#' + contid).empty();
    $('#' + contid).append(ev.target);
    replace(contid, targetid);
}