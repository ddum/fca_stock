modules.define('map', ['i-bem__dom', 'loader_type_js', 'jquery'], function(provide, BEMDOM, loader, $) {
    provide(BEMDOM.decl({ block: 'map', modName: 'api', modVal: 'gmaps' }, {
        onSetMod: {
            'js': {
                inited: function () {
                    this.loadMapsApi();
                }
            }
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
                    "v=3.exp&language=" + this.params.lang,
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
                /*{
                  stylers: [
                    { hue: "#ddd" }
                  ]
                }*/
            ];

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
                styles: mapStyles
            };

            this._map = new google.maps.Map(this.domElem[0], mapOptions);

            // Блок поделится информацией о том, что он инициализировал карту.
            // В данных передаём ссылку на экземпляр карты.
            this.emit('map-inited', {
                map: this._map
            });
        },

        /**
         * @return {Map | Null} Экземпляр карты, либо null, если карта не инстанцирована.
         */
        getMap: function () {
            return this._map || null;
        }

    }));
});
