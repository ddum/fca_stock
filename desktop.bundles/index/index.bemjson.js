module.exports = {
    block : 'page',
    title : 'stock',
    head : [
        {
            content : { elem : 'css', url : 'index.min.css' }
        },
        {
            elem : 'conditional-comment',
            condition : '<= IE 9',
            content : { elem : 'css', url : 'index.ie.css' } // стили для IE9 и ниже
        }
    ],
    scripts : [
        {
            elem : 'conditional-comment',
            condition : '< IE 9',
            content : { elem : 'js', url : '//yastatic.net/es5-shims/0.0.1/es5-shims.min.js' }, // Подключение es5-shim для IE8 и ниже
        },
        { elem : 'js', url : 'index.min.js' }
    ],
    content : [
        {
            block : 'stock-wrap',
            content : [
                {
                    block : 'stock-header',
                    content : [
                        {
                            block : 'stock-header',
                            elem: 'content',
                            content : [
                                {
                                    elem: 'title',
                                    content : [
                                        'ЦЕНЫ И НАЛИЧИЕ ЗАПАСНЫХ ЧАСТЕЙ'
                                    ]
                                },
                                {elem: 'hr' },
                                {
                                    block : 'menu-logo',
                                    mix: [ { block: 'stock-header', elem: 'menu-logo' } ],
                                    items:[
                                        {
                                            url: 'http://www.alfaromeo.ru/',
                                            brand: 'alfaromeo'
                                        },
                                        {
                                            url: 'http://www.fiat.ru/',
                                            brand: 'fiat'
                                        },
                                        {
                                            url: 'http://www.jeep-russia.ru/',
                                            brand: 'jeep'
                                        },
                                        {
                                            url: 'http://www.fiatprofessional.ru/',
                                            brand: 'fiatprofessional'
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    block : 'stock-content',
                    content : [
                        {
                            elem: 'title',
                            content : [
                                'ПОИСК НАИМЕНОВАНИЯ'
                            ]
                        },
                        {
                            block : 'select',
                            mix: [ { block: 'stock-select', js: true, mods : {type: 'region'} }],
                            mods : { mode : 'radio', theme : 'stock'},
                            name : 'region',
                            val : 'none',
                            options : [
                                { val : 'none', text : 'Выберите город' },
                            ]
                        },
                        {
                            block : 'input',
                            mix: [ {
                                 block: 'stock-input',
                                 js: {val : 'НАИМЕНОВАНИЕ'},
                                 mods : {type: 'nameSP'}
                             }],
                        },
                        {
                            block : 'input',
                            mix: [ {
                                block: 'stock-input',
                                js: {val : 'КОД ТОВАРА'},
                                mods : {type: 'codeSP'}
                            }],
                        },
                        {
                            block : 'button',
                            mix: [ { block: 'stock-button', js: true, mods : {type: 'search'} }, { block: 'stock-content', elem: 'button' } ],
                            mods : { type : 'link' },
                            text : 'ПОИСК'
                        },
                        {
                            block: 'map',
                            mods: { 'api': 'gmaps' },
                            // Параметры для загрузки АПИ Google Maps
                            js: {
                                'lang': 'ru',
                                'center': [55.76, 37.64],
                                'zoom': 10,
                                'styles': true
                            }
                        }
                    ]
                }
            ]
        }
    ]
};
