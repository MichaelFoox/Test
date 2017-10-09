'use strict'

new Swiper('.swiper-container', {
    // Optional parameters
    direction: 'horizontal',
    loop: false,

    // If we need pagination
    pagination: '.swiper-pagination',

    // Navigation arrows
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev',
});

$(document).ready(function () {

    $.get('http://codeit.pro/frontTestTask/news/getList', function (response) {
        var result = response.list;
        var sliderContent = $(".swiper-slide")

        for (var i = 0; i < response.list.length; i++) {
            var d = new Date(+result[i].date);
            var currDate = d.getDate();
            var currMonth = d.getMonth() + 1;
            var currYear = d.getFullYear();
            if (currDate < 10) {
                currDate = "0" + currDate;
            }
            if (currMonth < 10) {
                currMonth = "0" + currMonth;
            }
            $(sliderContent[i]).append('<div class="container"><div class="cont-right"><img class="image-wrap slider-elements" src="' + result[i].img + '" alt="">'
                + '<p class="author-wrap slider-elements">' + result[i].author + '</p>'
                + '<p class="public-wrap slider-elements">' + currDate + '.' + currMonth + '.' + currYear + '</p></div>'
                + '<div class="cont-left"><h5 class="title-wrap slider-elements">' + result[i].link + '</h5>'
                + '<p class="text-news slider-elements string-length">' + result[i].description + '</p></div></div>');
        }
        console.log(response);
    });
});


