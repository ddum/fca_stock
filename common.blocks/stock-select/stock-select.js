modules.define('stock-select', ['BEMHTML', 'i-bem__dom', 'jquery'], function(provide, BEMHTML, BEMDOM, $) {

    provide(BEMDOM.decl(this.name, {
        onSetMod: {
            'js': {
                'inited': function() {
                    if(this.hasMod('type', 'region')){
                        this._select = this.findBlockInside('select');
                        this._popup = this.findBlockInside('popup');
                        this._menu = this._popup.findBlockInside('menu');
                        this._menuItem = this._menu.findBlockInside('menu-item');
                        this.getCityObject();
                    }
                }
            }
        },
        getCityObject: function () {
            $.ajax({
                url: '../../files/city.json',
                data: {},
                dataType: 'json',
                success: this.setValSelect,
                error: function (request, status, error) {
                    console.log(request.responseText);
                },
                context: this
           });
       },
       setValSelect: function (data) {
           if (data.result === undefined){
               console.log('error');
               return;
           }
           _this = this;
           $.each( data.result, function( i, value ) {
               BEMDOM.append(
                   _this._menu.domElem,
                   BEMHTML.apply({
                        block : 'menu-item',
                        js: {val : value.id},
                        mods : {theme : 'stock'},
                        content : value.name
                    })
               );
           });
       }
    }
));

});
