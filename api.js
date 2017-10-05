'use strict';

var companies, news;

$.get('http://codeit.pro/frontTestTask/company/getList', function (response) {
    companies = response;
    $('.sphere').append(companies.list.length);
    var list = $('.list-group');
    companies.list.forEach(function(company){
        list.append('<li class="list-group-item">'+ company.name + '</li>')
    });
    $('.list-group-item').on('click', function(event){
        var name = $(this).html();
        var comp;
        for(var i = 0; i < companies.list.length; i++){
            if(companies.list[i].name == name){
                comp = companies.list[i];
                break;
            }
        }
        $('#partners-table').html('');
        for(var i = 0; i < comp.partners.length; i++){
            $('#partners-table').append('<tr> <td> ' + comp.partners[i].name + ' </td> <td>' + comp.partners[i].value +  '%</td> </tr>')
        }
    });

    console.log(response);
});

$.get('http://codeit.pro/frontTestTask/news/getList', function (response) {

});

