modules.define('stock-select', ['BEMHTML', 'i-bem__dom', 'jquery'], function(provide, BEMHTML, BEMDOM, $) {
    provide(BEMDOM.decl({ block : 'stock-select', modName : 'type', modVal : 'region' }, {
        onSetMod: {
            'created': function() {
                this.getCityObject();
            }
        },
        getCityObject: function () {
            $.ajax({
                url: '../../files/city.json',
                data: {},
                dataType: 'json',
                success: function (data) {
                    if (data.city === undefined){
                        return;
                    }
                    this.setOptions($.map(data.city, function (value) {
                        return {val: value.id, text: value.name_ru};
                    })

                    );
                    if(typeof data.city != "undefined") this.dealersList = data.dealers;
                },
                error: function (request, status, error) {
                    console.log(request.responseText);
                },
                context: this
           });
       },
       getDealersList: function () {
           return this.dealersList;
       }
    }
));

});
