/**
 * Created by Vlad on 24.09.2017.
 */
'use strict';

$('#post-btn').on('click', function (e) {
    e.preventDefault();
    if(validate()) {

        // $.post('http://codeit.pro/frontTestTask/user/registration', $('#post-form').serialize(),
        //     function (response) {
        //         console.log(response);
        //     })
    } else {

    }
});

function validate() {
    var regex = /^[a-zA-Z ]{2,30}$/;
    var err = [];

    // var a = $('#post-form').serializeArray();
    if(!$('#name')[0].value.match(regex)) {
        err.push({"message" : "Name is not valid",
            "field" : "name",
            "status" : "Form Error"
        })
    }

    if(!$('#secondname')[0].value.match(regex)) {
        err.push({"message" : "Secondname is not valid",
            "field" : "secondname",
            "status" : "Form Error"
        })
    }
    if($('#pass')[0].value.length < 8) {
        err.push({"message" : "Password must be bigger than 8 symbols!",
            "field" : "pass",
            "status" : "Form Error"
        })
    }
    console.log(err);

    err.forEach(function(error){
        $('#err-block').append("<div class='error-mass'>" + error.message + "</div>");
    })
}


