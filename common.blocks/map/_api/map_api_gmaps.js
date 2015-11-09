modules.define('map', ['BEMHTML', 'i-bem__dom', 'loader_type_js', 'jquery'], function(provide, BEMHTML, BEMDOM, loader, $) {
    provide(BEMDOM.decl({ block: 'map', modName: 'api', modVal: 'gmaps' }, {
        onSetMod: {
            'js': {
                inited: function () {
                    this._markers = [];
                    this._lang = this.params.lang;
                    this.loadMapsApi();

                    // Слушаем клик конпки поиск.
                    this._buttonSearch = this.findBlockOutside('stock-content').findBlockInside({ block : 'stock-button', modName : 'type', modVal : 'search' });
                    this._buttonSearch.on('buttonSearchClick', this.onButtonSearchClick, this);
                }
            }
        },

        onButtonSearchClick: function (e, data) {
            this.setMod('loaded');
            this.loadGeoObj(data);
        },

        loadGeoObj: function (data) {
            if(JSON.stringify( this.prevFilter ) == JSON.stringify( data )){
                this._buttonSearch.delMod('loaded');
                return;
            }else{
                this.prevFilter = data;
            }
            $.ajax({
                url: '../../files/stock.json',
                data: $.param(data),
                dataType: 'json',
                success: this.setMarkerMap,
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

        setMarkerMap:function (data) {
            var _this = this;

            $.each(data.result, function(i, val) {
               var marker = new google.maps.Marker({
                   position: new google.maps.LatLng(val.dealer_latitude, val.dealer_longitude),
                   map: _this._map,
                   title: val['dealer_name_' + _this._lang]
               });

               //элементы из json, которые попадают в InfoWindow
               var fieldsInfoWindow = [ 'dealer_adress_' + _this._lang,
                                        'dealer_email',
                                        'dealer_phone'
                                    ];
               var contentInfoWindow = $.map( fieldsInfoWindow, function( field, i ) {
                   if(val[field] === false || typeof val[field] == "undefined" ){
                       return null;
                   }else{
                       return { type: field.replace(/dealer_|_ru|_en/g,""), text: val[field] };
                   }
               });

               marker.info = new google.maps.InfoWindow({
                   content: BEMHTML.apply({
                                block : 'map-infowindow',
                                js: {dealer_id : val.id},
                                title: val['dealer_name_' + _this._lang],
                                items: contentInfoWindow
                            })
               });

                google.maps.event.addListener(marker, 'click', function() {
                    _this.closeActivInfoWin();
                    marker.info.open( _this._map, marker);
                    _this.activMarker = marker;
                });


               _this._markers.push(marker);
            });

            this._buttonSearch.delMod('loaded');
        },
        closeActivInfoWin: function() {
            if(this.activMarker) this.activMarker.info.close();
        },
        /**
         * @return {Map | Null} Экземпляр карты, либо null, если карта не инстанцирована.
         */
        getMap: function () {
            return this._map || null;
        }

    }));
});
