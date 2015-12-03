modules.define('map', ['BEMHTML', 'i-bem__dom', 'loader_type_js', 'jquery'], function(provide, BEMHTML, BEMDOM, loader, $) {
    provide(BEMDOM.decl({ block: 'map', modName: 'api', modVal: 'gmaps' }, {
        onSetMod: {
            'js': {
                inited: function () {
                    this._markers = {};
                    this._lang = this.params.lang;
                    this.loadMapsApi();

                    this.wrap = this.findBlockOutside('stock-content');

                    // Слушаем клик конпки поиск.
                    this._buttonSearch = this.wrap.findBlockInside({ block : 'stock-button', modName : 'type', modVal : 'search' });
                    this._buttonSearch.on('buttonSearchClick', this.onButtonSearchClick, this);
                }
            }
        },
        mapFitBounds: function (data) {
            this.closeActivInfoWin();
            var bounds = new google.maps.LatLngBounds();
            $.each(this._markers, function(i, val) {
                if( val.visible &&
                    (typeof data['dealer-id'] !== "undefined" && val.dealer_id == data['dealer-id']) ||
                    (typeof data['city-id']   !== "undefined" && val.city_id   == data['city-id']) ||
                    data === "all"
                ){
                    bounds.extend(val.getPosition());
                }
            });

            this._map.fitBounds(bounds);
            if( this._map.getZoom() > 18){
                this._map.setZoom(17);
            }
            /*else if(this._map.getZoom() < 9){
                this._map.setZoom(10);
            }*/
        },
        onButtonSearchClick: function (e, data) {
            this.setMod('loaded');
            this.loadGeoObj(data);
        },

        loadGeoObj: function (data) {
            if(JSON.stringify( this.prevFilter ) == JSON.stringify( data.filter )){
                this._buttonSearch.delMod('loaded');
                return;
            }else{
                this.prevFilter = data.filter;
            }
            this.dealersList = data.dealersList;
            $.ajax({
                url: '../../files/stock.json',
                data: $.param(data.filter),
                dataType: 'json',
                success: function (data) {
                    if(typeof data.error === "undefined"){
                        this.showMarkerMap(data.dealers);
                        this.mapFitBounds("all");
                    }else{
                        this.showMarkerMap([]);
                    }
                    //карта отрисована
                    this.delMod('loaded').emit('map-show', data );
                },
                error: function (request, status, error) {
                    console.log(request.responseText);
                },
                context: this
           });
        },

        /**
         * Загрузчик API.
         */
        loadMapsApi: function () {
            if (!window.google) {
                var apiScript = {},
                    apiCallback = 'mapsloaded';

                window[apiCallback] = $.proxy(function () {
                    this.onAPILoaded();
                }, this);

                apiScript.src = [
                    "https://maps.googleapis.com/maps/api/js?",
                    "v=3.exp&language=" + this._lang,
                    "&callback=" + apiCallback,
                    "&libraries=places"
                ].join('');
                loader(apiScript.src);

            } else {
                this.onAPILoaded();
            }
        },
        /**
         * Выполнится после загрузки API.
         */
        onAPILoaded: function () {
            // Запускаем инициализацию карты.
            this.initMap();
        },
        /**
         * Инициализация карты.
         */
        initMap: function () {
            var coordCenter = this.params.center || [55.76, 37.64];
            this._center = new google.maps.LatLng(coordCenter[0], coordCenter[1]);

            var mapStyles = [
                {
                  stylers: [
                    { hue: "#ddd" },
                    { "saturation": -100 }
                  ]
                }
            ];

            var stockMapStyles = this.params.styles ? mapStyles : [];

            var mapOptions = {
                zoom: this.params.zoom || 10,
                minZoom: 3,
                center: this._center,
                mapTypeControl: true,
                mapTypeControlOptions: {
                    style: google.maps.MapTypeControlStyle.DEFAULT,
                    position: google.maps.ControlPosition.RIGHT_BOTTOM
                },
                panControl: false,
                zoomControl: true,
                zoomControlOptions: {
                    position: google.maps.ControlPosition.LEFT_BOTTOM
                },
                streetViewControl: true,
                streetViewControlOptions: {
                    position: google.maps.ControlPosition.LEFT_BOTTOM
                },
                styles: stockMapStyles
            };

            this._map = new google.maps.Map(this.domElem[0], mapOptions);

            // Блок поделится информацией о том, что он инициализировал карту.
            // В данных передаём ссылку на экземпляр карты.
            this.emit('map-inited', {
                map: this._map
            });
        },

        showMarkerMap:function (pointDealers) {
            var _this = this;
            pointDealers = pointDealers.map(function(item){
                return item.id;
            });
            $.each(this.dealersList, function(i, dealer) {

                if(typeof _this._markers[dealer.id] == "undefined"){
                    //маркер нужно поставить, но он еще не создан
                    if($.inArray( dealer.id , pointDealers ) != -1){
                        var marker = new google.maps.Marker({
                            position: new google.maps.LatLng(dealer.dealer_latitude, dealer.dealer_longitude),
                            map: _this._map,
                            title: dealer['dealer_name_' + _this._lang],
                            dealer_city: dealer['dealer_region_name_' + _this._lang],
                            dealer_adress: dealer['dealer_adress_' + _this._lang],
                            dealer_email: dealer.dealer_email,
                            dealer_phone: dealer.dealer_phone,
                            dealer_id: dealer.id,
                            city_id: dealer.dealer_region,
                            visible: true
                        });

                        //элементы из json, которые попадают в InfoWindow
                        var fieldsInfoWindow = [
                                                'dealer_region_name_' + _this._lang,
                                                'dealer_adress_' + _this._lang,
                                                'dealer_email',
                                                'dealer_phone',
                                                'dealer_site_url'
                                                ];
                        var contentInfoWindow = $.map( fieldsInfoWindow, function( field, i ) {
                            if(dealer[field] === false || typeof dealer[field] == "undefined" ){
                               return null;
                            }else{
                                var mods="";
                                if (field == 'dealer_phone') mods = "tel";
                                if (field == 'dealer_email') mods = "email";
                                if (field == 'dealer_site_url') mods = "web";
                                return { "type": field.replace(/dealer_|_ru|_en/g,""), "text": dealer[field], "mods": mods };
                            }
                        });

                        marker.info = new google.maps.InfoWindow({
                           content: BEMHTML.apply({
                                        block : 'map-infowindow',
                                        js: {dealer_id : dealer.id},
                                        title: dealer['dealer_name_' + _this._lang],
                                        items: contentInfoWindow
                                    })
                        });

                        google.maps.event.addListener(marker, 'click', function() {
                            _this.openInfoWin(marker);
                        });
                        _this._markers[dealer.id] = marker;
                    }
                }else{
                    var tmpMarker = _this._markers[dealer.id];
                    if($.inArray( dealer.id , pointDealers ) == -1){
                        //Убрать с карты ранее созданный маркер
                        _this._markers[dealer.id].visible = false;
                        tmpMarker.setMap(null);
                    }else{
                        //Поставить на карту ранее созданный маркер
                        _this._markers[dealer.id].visible = true;
                        tmpMarker.setMap(_this._map);
                    }
                }
            });
        },
        closeActivInfoWin: function() {
            if(this.activMarker) this.activMarker.info.close();
        },
        openInfoWin: function(marker) {
            this.closeActivInfoWin();
            marker.info.open( this._map, marker);
            this.activMarker = marker;
        },
        getMarkers: function (id) {
            return this._markers[id] || false;
        },
        /**
         * @return {Map | Null} Экземпляр карты, либо null, если карта не инстанцирована.
         */
        getMap: function () {
            return this._map || null;
        }

    }));
});
