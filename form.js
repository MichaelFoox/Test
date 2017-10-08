'use strict';

$('#post-btn').on('click', function (e) {
    e.preventDefault();

    if (isValid()) {
        document.location.href = "comp.html";
        $.post('http://codeit.pro/frontTestTask/user/registration', $('#post-form').serialize(),
            function (response) {
                console.log(response);
            })
    }
})

function isValid() {
    var regex = /^[a-zA-Z ]{2,30}$/;
    var err = [];
    $('#err-block').html('');
    // var a = $('#post-form').serializeArray();
    if (!$('#name')[0].value.match(regex)) {
        err.push({
            "message": "Name is not valid",
            "field": "name",
            "status": "Form Error"
        })
    }

    if (!$('#secondname')[0].value.match(regex)) {
        err.push({
            "message": "Secondname is not valid",
            "field": "secondname",
            "status": "Form Error"
        })
    }
    if ($('#pass')[0].value.length < 8) {
        var errorMessage = {
            "message": "Password must be bigger than 8 symbols!",
            "field": "pass",
            "status": "Form Error"
        }
        err.push(errorMessage)
    }


    err.forEach(function (error) {
        $('#err-block').append("<div class='error-mass'>" + error.message + "</div>");
    })

    if (err.length) {
        return false;
    } else {
        return true;
    }
}