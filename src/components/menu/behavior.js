import $ from 'jquery';

function OptionOnClick() {
    console.log('ok');
    $('button.option').on('onclick', function() {
        $(this).css('background-color', 'white');
    });
}

export {OptionOnClick};