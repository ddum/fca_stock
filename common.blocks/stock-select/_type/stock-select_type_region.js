modules.define('stock-select', ['BEMHTML', 'i-bem__dom', 'jquery'], function(provide, BEMHTML, BEMDOM, $) {
    provide(BEMDOM.decl({ block : 'stock-select', modName : 'type', modVal : 'region' }, {
        onSetMod: {
            'js': {
                'inited': function() {
                    this._select = this.findBlockInside('select');
                    this._popup = this.findBlockInside('popup');
                    this._menu = this._popup.findBlockInside('menu');
                    this._menuItem = this._menu.findBlockInside('menu-item');
                    this.getCityObject();
                }
            }
        },
        getCityObject: function () {
            $.ajax({
                //url: '../../files/city.json',
                url: '/script/getJsonDealer.php',
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
           if (data.city === undefined){
               return;
           }
           _this = this;
           $.each( data.city, function( i, value ) {
               BEMDOM.append(
                   _this._menu.domElem,
                   BEMHTML.apply({
                        block : 'menu-item',
                        js: {val : value.id},
                        mods : {theme : 'stock'},
                        content : value.name_ru
                    })
               );
           });
           if(typeof data.city != "undefined") this.dealersList = data.dealers;
       },
       _getVal: function () {
           var value = this._select.getVal();
           if(value == 'none'){
               return false;
           }else{
               return value;
           }
       },
       getDealersList: function () {
           return this.dealersList;
       }
    }
));

});
