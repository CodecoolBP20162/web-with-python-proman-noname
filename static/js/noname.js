function Board(name)
{
    this.name=name;
    this.dict={};
    this.valami="valami";
    this.add = function (item) {
        this.dict[item]="week1";
    }
};

function Projects() {
  this.boardDict = {};
  this.add= function (name) {
    this.boardDict[name]=new Board(name);
  }
};

var projects=new Projects();
projects.add("NoName");
projects.add("SpaceShip");
projects.add("Codezero");
projects.add("Nuclear missile");
localStorage.projects = JSON.stringify(projects);


var init= function (boardsObject) {
    console.log(boardsObject);
    for (var board in boardsObject.boardDict)
    {

         $("#projectshere").append("<div class='card'>"+boardsObject.boardDict[board].name+"</div>");
    };

};





$(document).ready(function() {
    var projects = JSON.parse(localStorage.projects );
    console.log(projects );
    init(projects )

});