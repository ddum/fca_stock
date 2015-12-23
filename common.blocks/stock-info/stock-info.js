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
                if(typeof data.error === "undefined"){
                    var arrDisclaimer = [
                                            '<sup>1</sup>Указанная Розничная цена - максимально допустимая цена ( с учетом НДС).',
                                            '<sup>2</sup>Наличие на центральном складе АО «ЭфСиЭй РУС' +  ((!data.stockinfo[0].date_update)?'':'на ' + data.stockinfo[0].date_update)
                                        ];

                    var arrCode = data.stockinfo[0].code_arr;
                    var indexCode = arrCode.indexOf(data.stockinfo[0].code_search);
                    var price = data.stockinfo[0].price_fca.replace(",", ".");
                    var prevCode = arrCode.slice(0, indexCode);
                    var nextCode = arrCode.slice(indexCode + 1);

                    var availabilityDealers = (typeof data.dealers != "undefined" && data.dealers.length !== 0)? true: false;

                    if(data.stockinfo[0].date_update !== false){
                        arrDisclaimer.push('<sup>3</sup>Доступное количество уточняйте у ближайшего дилера.');
                    }

                    var stockInfo = [{
                            "code": data.stockinfo[0].code_search,
                            "code_prev": (prevCode.length === 0)? "-": prevCode,
                            "code_next": (nextCode.length === 0)? "-": nextCode,
                            "description": data.stockinfo[0].description,
                            "price_fca": (price === "")? "-": (parseFloat(price)*1.18).toFixed(2),
                            "date_update": (!data.stockinfo[0].date_update)?'нет в наличии':'есть в наличии<sup>3</sup>'
                    }];


                    BEMDOM.update(
                        this.domElem,
                        BEMHTML.apply({
                                block: 'stock-table',
                                title: "РЕЗУЛЬТАТЫ ПОИСКА",
                                th: [
                                        {width:"10%", text: 'КОД ТОВАРА'},
                                        {width:"15%", text: 'ПРЕДЫДУЩИЙ КОД'},
                                        {width:"15%", text: 'ПОСЛЕДУЩИЙ КОД'},
                                        {width:"30%", text: 'НАИМЕНОВАНИЕ'},
                                        {width:"15%", text: 'РОЗНИЧНАЯ ЦЕНА<sup>1</sup>'},
                                        {width:"15%", text: 'СКЛАД<br/>АО «ЭФСИЭЙ РУС»<sup>2</sup>'},

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
                                contentTableDelalers.push({
                                    "name":   {elem: 'dealer-link', tag: 'span', js: {'dealer-id': marker.dealer_id}, content: marker.title},
                                    "code":   arrCode,
                                    "city":   {elem: 'city-link', tag: 'span', js: {'city-id': marker.city_id}, content: marker.dealer_city},
                                    "adress": {elem: 'dealer-link', tag: 'span', js: {'dealer-id': marker.dealer_id}, content: marker.dealer_adress},
                                    "price":  {elem: 'price', tag: 'span', content: val.price.replace(",", ".")},
                                    /*"phone":  (marker.dealer_phone) ?
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
                                    */
                                });
                            }
                        });

                        BEMDOM.append(
                            this.domElem,
                            BEMHTML.apply({
                                    block: 'stock-table',
                                    th: [
                                            {width:"15%", text: 'ДИЛЕР'},
                                            {width:"15%", text: 'КОД ТОВАРА'},
                                            {width:"15%", text: 'ГОРОД'},
                                            {width:"40%", text: 'АДРЕС'},
                                            {width:"15%", text: 'ЦЕНА, РУБ.'},
                                            /*{width:"15%", text: 'ТЕЛЕФОН'},
                                            {width:"15%", text: 'EMAIL'}*/
                                        ],
                                    rows: contentTableDelalers
                             })
                        );
                    }

                    BEMDOM.append(
                        this.domElem,
                        BEMHTML.apply({
                                block: 'stock-disclaimer',
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
