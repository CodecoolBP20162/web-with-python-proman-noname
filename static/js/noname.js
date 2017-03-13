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
 var projects=new Projects();
  console.log(projects.boardDict.length);
 projects.add("NoName");
  console.log(projects.dictlen);
 projects.add("SpaceShip");
 projects.add("Codezero");
  console.log(projects.dictlen);
 projects.add("Nuclear missile");
 console.log(projects.boardDict);
 localStorage.setItem("projects",JSON.stringify(projects));*/


var load_projects = function () {
    var boardsObject = JSON.parse(localStorage.getItem("projects"));
    $("#projectshere").empty();
    $("#newprojectshere").empty();


    for (var board in boardsObject.boardDict) {
        $("#projectshere").append("<div class='card'>" + boardsObject.boardDict[board].name + "</div>");
    };

    $("#newprojectshere").append("<div class='card'>New Board</div>");

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

var replace = function () {
    var projects = new Projects();
    projects.get();
    projects.replace(0, 1);
    load_projects();
};

$(document).ready(function () {
    load_projects();
});