$(function () {

    var boardid = getBoardIdFromUrl();
    add_title(boardid);
    showCards(boardid);
    initDragula();
    formSubmitMod();


});

function formSubmitMod() {
    $('form').submit(function () {
        create_new_cell();
        return false
    });
}

function add_title(boardid) {
    $.post("/get_board_title", {board_id: boardid}, function (data) {
        $("#title_card").append(data)
        });


};


function create_new_cell(){
    var cell_title=$('#name_id').val();
    var boardid=getBoardIdFromUrl();
    var posted_data={cell_title:cell_title,boardid:boardid};
    $.ajax({
        url:'/create_new_cell',
        data:posted_data,
        type:'POST',
        success:function(data){
            console.log(data);
            //if($('#new_cell_form').val()!==""){
                //$('#new_cell_form').val("");
               // console.log(data)

            }

        })
}

function showCards(board_id_in_db) {

    $.post("/get_status_list", {board_id: board_id_in_db}, function (data) {
        for (var i = 0; i < data.length; i++) {
            var status = data[i];
            getCellListByStatus(status)
        }

        function getCellListByStatus(status) {
            $.post("/load_cells_by_status", {board_id: board_id_in_db, status: status}, function (data) {
                renderCells(status, data)
            });
        }
    })
}

function renderCells(status, data) {
    console.log(data);
    for (i = 0; i < data.length; i++) {
        var html = "<div id=" + (i + 1) + " data-dbid=" + data[i].id_in_db + ">" + data[i].name + "</div>";
        $('#' + status).append(html)
    }
}


function initDragula() {
    var drake = dragula({
        isContainer: function (el) {
            return el.classList.contains('newList');
        }
    });

    drake.on('drop', function (el, target, source) {
        var children = target.children;
        for (var i = 0; i < children.length; i++) {
            $(children[i]).attr("id", i)
        }
        var data = {
            'old_db_id': el.dataset.dbid,
            'oldstatus': source.id,
            'oldid': el.id,
            'newstatus': target.id,
            'newid': i
        };
        updateData(data);

        var sourcechild = source.children;
        for (var i = 0; i < sourcechild.length; i++) {
            $(sourcechild[i]).attr("id", i)
        }
    });
}


function updateData(data) {
    $.ajax({
        url: '/save_data',
        data: JSON.stringify(data),
        contentType: "application/json",
        type: 'post'
    });
}

function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    //document.getElementById("boards_main").style.marginLeft = "250px";
}
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    //document.getElementById("boards_main").style.marginLeft= "150px";
}


function getBoardIdFromUrl() {
    var urlParams = new URLSearchParams(window.location.search);
    var url_title = urlParams.get('title');
    $(".board_title").text(url_title);
    return url_title;
}