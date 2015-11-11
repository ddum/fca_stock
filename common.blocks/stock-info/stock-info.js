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
                                    {'width':"20%", 'text': 'КОД ТОВАРА'},
                                    {'width':"60%", 'text': 'НАИМЕНОВАНИЕ'},
                                    {'width':"20%", 'text': 'ДАТА ОБНОВЛЕНИЯ'}
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
                            "name": marker.title,
                            "city": marker.dealer_city,
                            "adress": marker.dealer_adress,
                            "phone": Array.isArray(marker.dealer_phone) ? marker.dealer_phone.join("<br/>") : marker.dealer_phone,
                            "email": Array.isArray(marker.dealer_email) ? marker.dealer_email.join("<br/>") : marker.dealer_email
                        });
                    }
                });

                BEMDOM.append(
                    this.domElem,
                    BEMHTML.apply({
                            block: 'stock-table',
                            th: [
                                    {'width':"30%", 'text': 'ДИЛЕР'},
                                    {'width':"15%", 'text': 'ГОРОД'},
                                    {'width':"25%", 'text': 'АДРЕС'},
                                    {'width':"15%", 'text': 'ТЕЛЕФОН'},
                                    {'width':"15%", 'text': 'EMAIL'}
                                ],
                            rows: contentTableDelalers
                     })
                );

                this._buttonSearch.delMod('loaded');
            }
        }
    ));
});
