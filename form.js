var secret;
function drawForm() {
    var form = $('#form');
    var settings = {
        'async': true,
        'crossDomain': true,
        'url': 'https://levelup-assessment-backend-ddmwdsdlta.now.sh/api/getFormSchema',
        'method': 'GET',
        'headers': {}
    }
    $.ajax(settings).done(function (response) {
        secret = response.secret.value;
        for (var key in response) {
            var element = response[key];
            //console.log(key);
            if (response.hasOwnProperty(key)) {
                if (element.type === 'submit') {
                    var button = $('<button></button>');
                    button.attr('type', element.type)
                    form.append(button);
                    button.click(submit)
                    button.text('Submit')

                } else {
                    if (element.type !== 'submit' && element.type !== 'hidden') {

                        var div = $('<div></div>')
                        var input = $('<input>');
                        var label = $('<label></label>');
                        label.text(key + ': ');
                        label.attr('for', key);
                        input.attr('id', key);
                        input.attr('type', element.type);
                        input.val(element.value);
                        input.attr('name', key);
                        div.append(label);
                        div.append(input);
                        form.append(div);
                    }
                }
            }
        }
    });
}

drawForm();

function submit(e) {
    e.preventDefault();
    var data = {
        name: $('input[name=name]').val(),
        repo: $('input[name=repo]').val(),
        email: $('input[name=email]').val(),
        age: $('input[name=age]').val(),
        final_submission: $('input[name=final_submission]').val(),
        secret: secret
    }
    var settings = {
        'async': true,
        'crossDomain': true,
        'url': 'https://levelup-assessment-backend-ddmwdsdlta.now.sh/api/submission',
        'method': 'POST',
        'headers': {
            'Content-Type': 'application/json'
        },
        'processData': false,
        'data': JSON.stringify(data)
    }

    $.ajax(settings).done(function (response) {
        console.log(response);
    });
}