
/*
 *  Project: WS Rangeslider
 *  Description: rangeslider   
 *  Author: Wiebe Steven v/d Meer
 *  License:
 */
;(function ( $, window, document, undefined ) {
    //DEFAULTS
    var pluginName = "wsFileInput",
        defaults = {
          'value':'Browse'
        };

    //CONSTRUCTOR
    function Plugin( element, options ) {
        this.element = element;
        this.options = $.extend( {}, defaults, options );
        this._defaults = defaults;
        this._name = pluginName;
        this.init(); 
    }
    
    //PROTOTYPE
    Plugin.prototype = {
        init: function() {
            
            //OBJECT
            var obj = $(this.element);
            //var type = obj[0].nodeName.toLowerCase()
            
            if(!obj.is('input:file') ) {
                throw "Not a file input element: use type='file'"
            
            }
            
            
            var id = obj.attr("id") || "";
            var cl = obj.attr("class")|| "";
            //WRAP OBJECTS
            obj.wrap('<div class="ws-file-input '+cl+'" id="'+id+'" />').wrap('<div class="button" />').wrap('<div class="file-trigger" />');
            obj.removeClass();
           
            //SET BUTTON IN TRIGGER
            obj.css({marginLeft: "-150px"});
            
            //VARIABLES
            var main = obj.closest(".ws-file-input");
            var button = main.children(".button");
            button.prepend(this.options.value);
            var trigger = button.children(".file-trigger");
           
            //ADD INPUT
            main.prepend('<input type="text" class="new-input" readonly="" />')
            var input = main.children(".new-input");
           
            //MOVE
            var x = 0 , y = 0;
    
            button.mousemove(function(e){
                x = (e.pageX-button.offset().left)-(trigger.width()*.5);
                y = (e.pageY-button.offset().top)-(trigger.height()*.5);
                trigger.css({top:y,left:x})   
            }).mouseout(function(e){
                trigger.css({top:0,left:0})
            });
            
            //ON CHANGE
            obj.change(function(){	
               input.val($(this).val());
            })
           
            /**
            *DEBUG FUNCTION
            *log: login string
            */
            function debug(log) {
                if (window.console != undefined) {
                    console.log(log);
                }
            }
        },
    };

    $.fn[pluginName] = function ( options ) {
        var args = arguments;
        if (options === undefined || typeof options === 'object') {
            return this.each(function () {
                if (!$.data(this, 'plugin_' + pluginName)) {
                    $.data(this, 'plugin_' + pluginName, new Plugin( this, options ));
                }
            });
        } else if (typeof options === 'string' && options[0] !== '_' && options !== 'init') {
            var returns;
            this.each(function () {
                var instance = $.data(this, 'plugin_' + pluginName);
                if (instance instanceof Plugin && typeof instance[options] === 'function') {
                    returns = instance[options].apply( instance, Array.prototype.slice.call( args, 1 ) );
                }
                if (options === 'destroy') {
                  $.data(this, 'plugin_' + pluginName, null);
                }
            });
            return returns !== undefined ? returns : this;
        }
    };

}(jQuery, window,document));


