/**
 * All is directly copied or inspired from http://razorjack.net/quicksand/index.html
 *
 * @author  Jacek Galanciak <https://github.com/razorjack/quicksand/>
 */

(function($) {
    $.fn.sorted = function(customOptions) {
        var options = {
            reversed: false,
            by: function(a) {
                return a.text();
            }
        };
        $.extend(options, customOptions);

        $data = $(this);
        arr = $data.get();
        arr.sort(function(a, b) {

            var valA = options.by($(a));
            var valB = options.by($(b));
            if (options.reversed) {
                return (valA < valB) ? 1 : (valA > valB) ? -1 : 0;
            } else {
                return (valA < valB) ? -1 : (valA > valB) ? 1 : 0;
            }
        });
        return $(arr);
    };

})($);

$(function() {


    if($('#list-features').length == 0) {
        return;
    }

    var read_button = function(class_names) {
        var r = {
            selected: false,
            type: 0
        };
        for (var i=0; i < class_names.length; i++) {
            if (class_names[i].indexOf('selected-') == 0) {
                r.selected = true;
            }
            if (class_names[i].indexOf('segment-') == 0) {
                r.segment = class_names[i].split('-')[1];
            }
        };
        return r;
    };

    var determine_sort = function($buttons) {
        var $selected = $buttons.parent().filter('[class*="selected-"]');
        return $selected.find('a').attr('data-value');
    };

    var determine_kind = function($buttons) {
        var $selected = $buttons.parent().filter('[class*="selected-"]');
        return $selected.find('a').attr('data-value');
    };

    var $preferences = {
        duration: 800,
        easing: 'easeInOutQuad',
        adjustHeight: false
    };

    var $list = $('#list-features');
    var $data = $list.clone();

    var $controls = $('ul.splitter ul, .feature-tags');

    $controls.each(function(i) {

        var $control = $(this);
        var $buttons = $control.find('a');

        $buttons.bind('click', function(e) {

            var $button = $(this);
            var $button_container = $button.parent();
            var button_properties = read_button($button_container.attr('class').split(' '));
            var selected = button_properties.selected;
            var button_segment = button_properties.segment;


            $button.addClass('btn-primary');
            if (!selected) {

                $buttons.parent().removeClass('selected-0').removeClass('selected-1').removeClass('selected-2')
                $button_container.addClass('selected-' + button_segment)

                $buttons.removeClass('btn-primary');
                $button.addClass('btn-primary');

                var sorting_type = determine_sort($controls.eq(1).find('a'));
                var sorting_kind = determine_kind($controls.eq(0).find('a'));
                if (sorting_kind == 'all') {
                    var $filtered_data = $data.find('.feature');
                } else if (sorting_kind == 'tag') {
                    var $filtered_data = $data.find('.feature.tag-' + $button.data('tag'));
                } else {
                    var $filtered_data = $data.find('.feature.' + sorting_kind);
                }

                if (sorting_type == 'name') {
                    var $sorted_data = $filtered_data.sorted({
                        by: function(v) {
                            return $(v).find('.feature-title').text().toLowerCase();
                        }
                    });
                } else {
                    var $sorted_data = $filtered_data.sorted({
                        by: function(v) {
                            return parseFloat($(v).data(sorting_type));
                        }
                    });

                }
                $list.quicksand($sorted_data, $preferences);

            }

            e.preventDefault();
        });

    });


    $('#box-controls .controls').each(function() {
        var $a = $('a', $(this)).filter(':first');
        $a.click();
    });

});