'use strict';
var sort = 'decrease';
var companies, news, chartData;

// <li><div class="cont-right"><img class="image-wrap slider-elements" src="" alt="">
//     <p class="author-wrap slider-elements">asdfasdf</p>
//     <p class="public-wrap slider-elements">asdfasdf</p></div>
//     <div class="cont-left"><h5 class="title-wrap slider-elements">asdfasdf</h5>
//     <p class="text-news slider-elements">asdfasdf</p></div></li>
//
$.get('http://codeit.pro/frontTestTask/company/getList', function (response) {
    companies = response;
    chartData = loc();
    google.charts.load('current', {'packages': ['corechart']});
    google.charts.setOnLoadCallback(drawChart);
    $('.sphere').append(companies.list.length);
    var list = $('#comp-list');
    companies.list.forEach(function (company) {
        list.append('<li class="list-group-item">' + company.name + '</li>')
    });

    //вывод партнеров и процент акций
    $('.list-group-item').on('click', function (event) {
        var name = $(this).html();
        var comp;


        //разворачивание блока "company partners"
        $('#list-block').slideDown('slow', function () {

            for (var i = 0; i < companies.list.length; i++) {
                if (companies.list[i].name == name) {
                    comp = companies.list[i];
                    break;
                }
            }

            comp.partners.sort(function (val, val2) {
                return val2.value - val.value;
            });


            $('#partners-table').html('');
            for (var i = 0; i < comp.partners.length; i++) {
                $('#partners-table').append('<tr> <td>' + comp.partners[i].name + ' </td> <td>' + comp.partners[i].value + '%</td> </tr>')
            }
        });

        $('#btn').on('click', function (event) {
            if (sort == 'decrease') {
                comp.partners.sort(function (val, val2) {
                    return val2.value - val.value;
                });
                sort = 'increase';
            } else if (sort == 'increase') {
                comp.partners.sort(function (val, val2) {
                    return val.value - val2.value;
                });
                sort = 'decrease';
            } else {
                comp.partners.sort(function (val, val2) {
                    return val2.value - val.value;
                });
                sort = 'decrease';
            }

            $('#partners-table').html('');
            for (var i = 0; i < comp.partners.length; i++) {
                $('#partners-table').append('<tr> <td>' + comp.partners[i].name + ' </td> <td>' + comp.partners[i].value + '%</td> </tr>')
            }
        });

        $('#btn1').on('click', function (event) {
            comp.partners.sort(function (a, b) {
                if (a.name < b.name) return -1;
                if (a.name > b.name) return 1;
                return 0;
            });
            sort = 'alphabet';

            $('#partners-table').html('');
            for (var i = 0; i < comp.partners.length; i++) {
                $('#partners-table').append('<tr> <td>' + comp.partners[i].name + ' </td> <td>' + comp.partners[i].value + '%</td> </tr>')
            }
        });
    });

});

function loc() {
    var obj = {};
    var sum = 0;

    for (var i = 0; i < companies.list.length; i++) {
        if (obj[companies.list[i].location.name]) {
            obj[companies.list[i].location.name] += 1;
        } else {
            obj[companies.list[i].location.name] = 1;
        }
    }

    for (var key in obj) {
        sum += obj[key];
    }

    for (var key in obj) {
        obj[key] = obj[key] / sum * 100;
    }

    return obj;

}

function drawChart() {

    var arr = [];
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Country');
    data.addColumn('number', 'Percent');
    for (var key in chartData) {
        arr.push([key, chartData[key]])
    }
    data.addRows(arr);


    // Set chart options
    var options = {
        'width': 300,
        'height': 175
    };

    // Instantiate and draw our chart, passing in some options.
    var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
    chart.draw(data, options);

    $('g[column-id]').on('click', function () {
        $('#loc_list').html('');
        for (var i = 0; i < companies.list.length; i++) {
            if (companies.list[i].location.name === $(this).attr('column-id')) {
                $('#loc_list').append('<li class="list-group-item">' + companies.list[i].name + '</li>')
            }
        }
        $('#loc_list').css('display', 'block');
        $('#chart_div').css('display', 'none');
    });

    $('#btn-chart').on('click', function () {
        $('#loc_list').css('display', 'none');
        $('#chart_div').css('display', 'block');
    })
}