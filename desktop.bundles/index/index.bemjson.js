module.exports = {
    block : 'page',
    title : 'stock',
    head : [
        { elem : 'meta', attrs : { name : 'viewport', content : 'width=device-width, initial-scale=1' } },
        { elem : 'css', url : 'index.min.css' }
    ],
    scripts: [{ elem : 'js', url : 'index.min.js' }],
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
                                    block : 'stock-header',
                                    elem: 'title',
                                    content : [
                                        'ЦЕНЫ И НАЛИЧИЕ ЗАПАСНЫХ ЧАСТЕЙ'
                                    ]
                                },
                                { block : 'stock-header', elem: 'hr' },
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
                }
            ]
        }
    ]
};
