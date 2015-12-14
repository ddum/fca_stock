modules.define('stock-select', ['BEMHTML', 'i-bem__dom', 'jquery'], function(provide, BEMHTML, BEMDOM, $) {
    provide(BEMDOM.decl({ block : 'stock-select', modName : 'plugin', modVal : 'bem' }, {
        onSetMod: {
            'js': {
                'inited': function() {
                    this._select = this.findBlockInside('select');
                    this._popup = this.findBlockInside('popup');
                    this._menu = this._popup.findBlockInside('menu');

                    this.setMod('created');
                }
            }
        },
       setOptions: function (data) {
           _this = this;
           $.each( data, function( i, value ) {
               BEMDOM.append(
                   _this._menu.domElem,
                   BEMHTML.apply({
                        block : 'menu-item',
                        js: {val : value.val},
                        mods : {theme : 'stock'},
                        content : value.text
                    })
               );
           });
       },
       _getVal: function () {
           var value = this._select.getVal();
           if(value == 'none'){
               return false;
           }else{
               return value;
           }
       }
    }
));

});
