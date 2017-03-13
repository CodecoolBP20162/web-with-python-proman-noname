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
    $("#projectshere").empty();
    $("#newprojectshere").empty();


    for (var board in boardsObject.boardDict)
    {
         $("#projectshere").append("<div class='card'>"+boardsObject.boardDict[board].name+"</div>");
    };
    $("#newprojectshere").append("<div class='card'>New Board</div>");

};

var newBoard=function () {
    document.getElementById('newBoardInput').style.display = 'flex';
    document.getElementById('save').style.display = 'flex';
}

var saveNewBoard=function(){
    var newBoard=$('#newBoardInput').val();
    var dict = JSON.parse(localStorage.projects );
    var projects = new Projects();
    console.log(dict["boardDict"]);
    projects.boardDict=dict["boardDict"];
    projects.add(newBoard);
    localStorage.projects = JSON.stringify(projects);
    var dict = JSON.parse(localStorage.projects );
    console.log(dict["boardDict"]);
    init(dict);


}




$(document).ready(function() {
    var projects = JSON.parse(localStorage.projects );
    console.log("kakis");
    init(projects );

});