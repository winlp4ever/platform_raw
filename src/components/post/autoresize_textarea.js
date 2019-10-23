import $ from 'jquery';

export default function autoResize() {
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
    // Adds a class to all textareas
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