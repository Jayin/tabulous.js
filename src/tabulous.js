;(function($, window, document, undefined) {

    var pluginName = "tabulous",
        defaults = {
            effect: 'scale',
            onSwitch: function() {}
        };

    function Plugin(element, options) {
        this.element = element;
        this.$elem = $(this.element);
        this.options = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }

    Plugin.prototype = {

        init: function() {
            //link tab
            var links = this.$elem.find('a');

         
            //firstdiv,内容页的容器container
            var $tabulous_container = this.$elem.find('.tabulous-container');

            //Tab 默认第一个
            this.$elem.find('li:first-child').find('a').addClass('tabulous-active');
            this.$elem.find('div').not(':first').not(':nth-child(1)').addClass('hide hide'+ this.options.effect);

            links.bind('click', {
                options: this.options,
                $elem: this.$elem
            }, function(e) {
                e.preventDefault();

                var $from_tab = e.data.$elem.find('.tabulous-active');
                var $to_tab = $(this);
                var $from_content = $tabulous_container.find('div' + $from_tab.attr('href'));
                var $to_content = $tabulous_container.find('div' + $to_tab.attr('href'));

                $from_content.removeClass('show show' + e.data.options.effect).addClass('make_transist').addClass('hide hide' + e.data.options.effect);
                $to_content.removeClass('hide hide' + e.data.options.effect).addClass('make_transist').addClass('show show' + e.data.options.effect);

                e.data.options.onSwitch($from_tab, $to_tab, $from_content, $to_content);

            });
        }
    };

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[pluginName] = function(options) {
        return this.each(function() {
            new Plugin(this, options);
        });
    };

})(jQuery, window, document);