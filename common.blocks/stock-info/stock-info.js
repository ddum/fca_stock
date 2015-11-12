modules.define('stock-info', ['BEMHTML', 'i-bem__dom', 'jquery'], function(provide, BEMHTML, BEMDOM, $) {
    provide(BEMDOM.decl(this.name, {
            onSetMod: {
                'js': {
                    'inited': function() {
                        this.wrap = this.findBlockOutside('stock-content');


                        // Слушаем отрисовку карты
                        this._mapBlock = this.wrap.findBlockInside({ block: 'map', modName: 'api', modVal: 'gmaps' });
                        this._mapBlock.on('map-show', this.schowInfoStock, this);

                        this._buttonSearch = this.wrap.findBlockInside({ block : 'stock-button', modName : 'type', modVal : 'search' });
                    }
                }
            },
            schowInfoStock: function (e, data) {
                BEMDOM.update(
                    this.domElem,
                    BEMHTML.apply({
                            block: 'stock-table',
                            title: "РЕЗУЛЬТАТЫ ПОИСКА",
                            th: [
                                    {width:"20%", text: 'КОД ТОВАРА'},
                                    {width:"60%", text: 'НАИМЕНОВАНИЕ'},
                                    {width:"20%", text: 'ДАТА ОБНОВЛЕНИЯ'}
                                ],
                            rows: data.stockinfo
                     })
                );

                var contentTableDelalers = [];
                var _this = this;
                $.each(data.dealers, function(i, val) {
                    var marker = _this._mapBlock.getMarkers(val);
                    if( marker !== false){
                        contentTableDelalers.push({
                            "name":   {elem: 'dealer-link', tag: 'span', js: {'dealer-id': marker.dealer_id}, content: marker.title},
                            "city":   {elem: 'city-link', tag: 'span', js: {'city-id': marker.city_id}, content: marker.dealer_city},
                            "adress": {elem: 'dealer-link', tag: 'span', js: {'dealer-id': marker.dealer_id}, content: marker.dealer_adress},
                            "phone":  (marker.dealer_phone) ?
                                         $.map(marker.dealer_phone, function(val){
                                            if (val !== "") {
                                                return { block: 'link', mods: {'type': 'tel'}, content: val };
                                            }
                                         }) : "",
                            "email": (marker.dealer_email) ? 
                                        $.map(marker.dealer_email, function(val){
                                            if (val !== "") {
                                                return { block: 'link', mods: {'type': 'email'}, content: val };
                                            }
                                        }) : ""
                        });
                    }
                });

                BEMDOM.append(
                    this.domElem,
                    BEMHTML.apply({
                            block: 'stock-table',
                            th: [
                                    {width:"30%", text: 'ДИЛЕР'},
                                    {width:"15%", text: 'ГОРОД'},
                                    {width:"25%", text: 'АДРЕС'},
                                    {width:"15%", text: 'ТЕЛЕФОН'},
                                    {width:"15%", text: 'EMAIL'}
                                ],
                            rows: contentTableDelalers
                     })
                );

                this._buttonSearch.delMod('loaded');
            }
        }
    ));
});
