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
                        this._disclaimerWrap = this.wrap.findBlockInside({ block : 'stock-disclaimer-wrap'});
                    }
                }
            },
            schowInfoStock: function (e, data) {
                if(typeof data.error === "undefined"){

                    var arrCode = data.stockinfo[0].code_arr;
                    var indexCode = arrCode.indexOf(data.stockinfo[0].code_search);
                    var price = data.stockinfo[0].price_fca.replace(",", ".");
                    var prevCode = arrCode.slice(0, indexCode);
                    var nextCode = arrCode.slice(indexCode + 1);

                    var availabilityDealers = (typeof data.dealers != "undefined" && data.dealers.length !== 0)? true: false;

                    var stockInfo = [{
                            "code": data.stockinfo[0].code_search,
                            "code_prev": (prevCode.length === 0)? "-": prevCode,
                            "code_next": (nextCode.length === 0)? "-": nextCode,
                            "description": data.stockinfo[0].description,
                            "price_fca": (price === "")? "-": price,//(parseFloat(price)*1.18).toFixed(2),
                            "date_update": (!data.stockinfo[0].date_update)?'нет в наличии':'есть в наличии'
                    }];


                    BEMDOM.update(
                        this.domElem,
                        BEMHTML.apply({
                                block: 'stock-table',
                                title: "РЕЗУЛЬТАТЫ ПОИСКА",
                                th: [
                                        {width:"10%", text: 'Код товара'},
                                        {width:"15%", text: 'Предыдущий код*'},
                                        {width:"15%", text: 'Последущий код*'},
                                        {width:"30%", text: 'Наименование'},
                                        {width:"10%", text: 'Цена<sup>1</sup>'},
                                        {width:"20%", text: 'Склад<br/>АО «ЭфСиЭй РУС»<sup>2</sup>'},

                                    ],
                                rows: stockInfo
                         })
                    );

                    if(availabilityDealers){
                        var contentTableDelalers = [];
                        var _this = this;
                        $.each(data.dealers, function(i, val) {
                            var marker = _this._mapBlock.getMarkers(val.id);
                            if( marker !== false){
                                $.each(arrCode, function(i, tmpCode) {
                                    var row = {
                                        "code":   tmpCode,
                                        "city":   {elem: 'city-link', tag: 'span', js: {'city-id': marker.city_id}, content: marker.dealer_city},
                                        "name":   {elem: 'dealer-link', tag: 'span', js: {'dealer-id': marker.dealer_id}, content: marker.title},
                                        "adress": {elem: 'dealer-link', tag: 'span', js: {'dealer-id': marker.dealer_id}, content: marker.dealer_adress},
                                        "phone":  (marker.dealer_phone) ?
                                                  $.map(marker.dealer_phone, function(val){
                                                      if (val !== "") {
                                                          return { block: 'link', mods: {'type': 'tel'}, content: val };
                                                      }
                                                  }) : "",
                                      /*"price":  {elem: 'price', tag: 'span', content: val.price.replace(",", ".")},
                                        "email": (marker.dealer_email) ?
                                                    $.map(marker.dealer_email, function(val){
                                                        if (val !== "") {
                                                            return { block: 'link', mods: {'type': 'email'}, content: val };
                                                        }
                                                    }) : ""
                                                    */
                                    };
                                    contentTableDelalers.push(row);
                                });
                            }
                        });

                        BEMDOM.append(
                            this.domElem,
                            BEMHTML.apply({
                                    block: 'stock-table',
                                    th: [
                                            {width:"10%",  text: 'Код товара'},
                                            {width:"15%", text: 'Город'},
                                            {width:"15%", text: 'Дилер'},
                                            {width:"45%", text: 'Адрес'},
                                            {width:"18%", text: 'Телефон'},
                                            /*{width:"15%", text: 'Email'}
                                            {width:"15%", text: 'ЦЕНА, РУБ.'},*/
                                        ],
                                    rows: contentTableDelalers
                             })
                        );
                    }
                    var arrDisclaimer = [
                                            '*Уточняйте у дилера правильность подбора артикула. В случае предлагаемой замены номера, уточняйте его применимость к конкретному идентификационному номеру автомобиля (VIN).',
                                            '<sup>1</sup>Максимальная цена перепродажи, включая НДС.',
                                            '<sup>2</sup>Наличие на центральном складе АО «ЭфСиЭй РУС» на ' + data.stockinfo[0].date_update + '. Доступное количество уточняйте у ближайшего дилера.'
                                        ];
                    BEMDOM.update(
                        this._disclaimerWrap.domElem,
                        BEMHTML.apply({
                                block : 'stock-disclaimer',
                                content: arrDisclaimer
                         })
                    );
                }else {
                    BEMDOM.update(
                        this.domElem,
                        BEMHTML.apply({
                                block: 'stock-info',
                                elem: 'error',
                                content: data.error
                         })
                    );
                }
                this._buttonSearch.delMod('loaded');
            }
        }
    ));
});
