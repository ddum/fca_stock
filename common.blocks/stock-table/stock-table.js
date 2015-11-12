modules.define('stock-table', ['i-bem__dom', 'jquery'], function(provide, BEMDOM, $) {
    provide(BEMDOM.decl( this.name, {
        onSetMod: {
            'js' : {
                'inited' : function() {
                    this.wrap = this.findBlockOutside('stock-wrap');

                    this._mapBlock = this.wrap.findBlockInside({ block: 'map', modName: 'api', modVal: 'gmaps' });

                    this.bindTo('dealer-link', 'click', this._onClick);
                    this.bindTo('city-link', 'click', this._onClick);
                }
            }
        },
        _onClick: function(e) {
            var className = e.target.className;
            var params = JSON.parse(e.target.getAttribute('data-bem'));
            this.wrap.pageScroll();
            this._mapBlock.mapFitBounds(params[className]);
        }
    }));
});
