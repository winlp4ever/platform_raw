import $ from 'jquery';

function autoResize() {
    let textareas = $('textarea.md-input');
    let hiddenDiv = $('<div class="hiddenDiv"></div>');
    $('.md-editor').append(hiddenDiv);
    hiddenDiv.css({
        'display': 'none',
        'height': 'auto',
        'white-space': 'pre-wrap',
        'word-wrap': 'break-word',
        'min-height': textareas.eq(0).css('height'),
        'z-index': '-2'
    })
    textareas.each(function() {
        $(this).on({
            input: function() {
                hiddenDiv.html($(this).val());
                console.log(hiddenDiv.css('height'));
                $(this).css('height', hiddenDiv.css('height'));
            }
        })
    });
}

function keysBehaviours() {
    $('.md-editor').on('keydown', 'textarea.md-input', function(e) {
        // capture Tab Key in textbox
        let keycode = e.keyCode | e.which;
        if (keycode == 9) {
            e.preventDefault();
            $(this).val($(this).val() + '\t');
        }
    })
}

export {autoResize, keysBehaviours};