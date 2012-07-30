/**
 * All is directly copied or inspired from http://razorjack.net/quicksand/index.html
 *
 * @author  Jacek Galanciak <https://github.com/razorjack/quicksand/>
 * @author  Jean-François Lépine <jeanfrancois@lepine.pro>
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




hbw.ui.listing = {

    preferences: {
        duration: 800,
        easing: 'easeInOutQuad',
        adjustHeight: false
    },

    html: {
        $container : null,
        $clone : null
    },

    selector : {
        container: '#list-features'
    },

    sortingPreference: null,

    filter: function(type, value, callback) {

        if(hbw.ui.listing.html.$container == null) {
            hbw.ui.listing.html.$container = $(hbw.ui.listing.selector.container);
            hbw.ui.listing.html.$clone  = hbw.ui.listing.html.$container.clone(true,true);
        }
        if(hbw.ui.listing.sortingPreference == null) {
            //
            // Default sorting
            hbw.ui.listing.sortingPreference = {
                by: function(v) {
                    return $(v).find('.feature-title').text().toLowerCase();
                }
            };
        }

        //
        // Filter elements
        var $list = hbw.ui.listing.html.$container;
        var $data = hbw.ui.listing.html.$clone
        var $filteredElements;

        switch(type) {
            case 'all':
                $filteredElements = $data.find('.feature');
                break;
            case 'tag':
                $filteredElements = $data.find('.feature.tag-' + value);
                break;
            case 'state':
                $filteredElements = $data.find('.feature.' + value);
                break;
        }

        //
        // Sort elements
        $filteredElements = $filteredElements.sorted(hbw.ui.listing.sortingPreference);

        //
        // Apply filter
        $list.quicksand($filteredElements, hbw.ui.listing.preferences, callback );
    },

    sort:function(type, value, callback) {
        
        switch(type) {
            case 'name':
                hbw.ui.listing.sortingPreference = {
                    by: function(v) {
                        return $(v).find('.feature-title').text().toLowerCase();
                    }
                };
                break;
            case 'state':
                hbw.ui.listing.sortingPreference = {
                    by: function(v) {
                        return parseFloat($(v).data(value));
                    }
                };

        }
        hbw.ui.listing.filter('all', null, callback);
    }
}
