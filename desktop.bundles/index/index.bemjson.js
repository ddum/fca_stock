module.exports = {
    block : 'page',
    title : 'stock',
    head : [

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
                            mods : { mode : 'radio', theme : 'stock'},
                            name : 'region',
                            val : 1,
                            options : [
                                { val : 1, text : 'Город 1' },
                                { val : 2, text : 'Город 2' },
                                { val : 3, text : 'Город 3' }
                            ]
                        },
                        {
                            block : 'input',
                            mix: [ { block: 'stock-input', js: {val : 'НАИМЕНОВАНИЕ'} }],
                        },
                        {
                            block : 'input',
                            mix: [ { block: 'stock-input', js: {val : 'КОД ТОВАРА'} }],
                        },
                        {
                            block : 'button',
                            mix: [ { block: 'stock-button'}, { block: 'stock-content', elem: 'button' } ],
                            mods : { type : 'link' },
                            text : 'ПОИСК'
                        }
                    ]
                }
            ]
        }
    ]
};
