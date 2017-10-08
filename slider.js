'use strict'
new Swiper ('.swiper-container', {
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
            $(sliderContent[i]).append('<div class="row"><div class="col-md-6 cont-right"><img class="image-wrap slider-elements" src="' + result[i].img + '" alt="">'
                + '<p class="author-wrap slider-elements">' + result[i].author + '</p>'
                + '<p class="public-wrap slider-elements">' + result[i].date + '</p></div>'
                + '<div class="col-md-6"><div class="cont-left"><h5 class="title-wrap slider-elements">' + result[i].link + '</h5></div>'
                + '<p class="text-news slider-elements">' + result[i].description + '</p></div></div>');
        }

    });
   
});