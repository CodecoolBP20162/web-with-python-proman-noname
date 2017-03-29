/**
 * Created by oliver on 2017.03.28..
 */


function render_html() {
    var cell1={'name':'Elso'}
    var cell2= {'name':'Masodik'}
    var cell3={'name':'Harmadik'}
    var cell_list = [cell1,cell2,cell3]
    var data={'new':cell_list}
    for (var key in data) {
        var lista=data.key
        console.log(lista)

    }
}

$(function () {
    $.ajax({
    url: '/load_board',
    success:function (response) {
        console.log(response.new)
        $.each( response, function( i, item ) {
            console.log(item[2])
        var html =
            "<td>" + item[0] + "</td>" +
            "<td>" + item[1] + "</td>" +
            "<td>" + item[2] + "</td>";
          $("<tr/>").html(html).appendTo("#records");
    });

    }
})
})
