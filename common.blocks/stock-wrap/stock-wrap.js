modules.define('stock-wrap', ['i-bem__dom', 'jquery'], function(provide, BEMDOM, $) {
    provide(BEMDOM.decl(this.name, {
            onSetMod: {
                'js': {
                    'inited': function() {
                        this._buttonSearch = this.findBlockInside({ block : 'stock-button', modName : 'type', modVal : 'search' });
                        this._mapBlock = this.findBlockInside({ block: 'map', modName: 'api', modVal: 'gmaps' });
                        this._stockInfo = this.findBlockInside({ block: 'stock-info'});

                        this._buttonSearch.on({ modName : 'loaded', modVal : '' }, function() {
                            this.pageScroll(this._stockInfo.domElem);
                        }, this);
                    }
                }
            },
            pageScroll: function (elem) {
                var scrollElem = elem || this._mapBlock.domElem;
                $('html, body').animate({
                    scrollTop: $(scrollElem).offset().top - 20
                }, 500);
            }
        }
    ));
});
