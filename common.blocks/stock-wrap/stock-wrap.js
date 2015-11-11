modules.define('stock-wrap', ['i-bem__dom', 'jquery'], function(provide, BEMDOM, $) {
    provide(BEMDOM.decl(this.name, {
            onSetMod: {
                'js': {
                    'inited': function() {
                        this._buttonSearch = this.findBlockInside({ block : 'stock-button', modName : 'type', modVal : 'search' });
                        this._mapBlock = this.findBlockInside({ block: 'map', modName: 'api', modVal: 'gmaps' });

                        this._buttonSearch.on({ modName : 'loaded', modVal : '' }, function() {
                            this.pageScroll(this._mapBlock.domElem);
                        }, this);
                    }
                }
            },
            pageScroll: function (elem) {
                $('html, body').animate({
                    scrollTop: $(elem).offset().top
                }, 500);
            }
        }
    ));
});
