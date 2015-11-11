modules.define('stock-button', ['i-bem__dom', 'jquery'], function(provide, BEMDOM, $) {

    provide(BEMDOM.decl({ block : 'stock-button', modName : 'type', modVal : 'search' }, {
        onSetMod: {
            'js': {
                'inited': function() {
                    this._button = this.findBlockOn('button');
                    this.wrap = this.findBlockOutside('stock-content');

                    this._inputNameSparePart = this.wrap.findBlockInside({ block : 'stock-input', modName : 'type', modVal : 'nameSP' });
                    this._inputCodeSparePart = this.wrap.findBlockInside({ block : 'stock-input', modName : 'type', modVal : 'codeSP' });
                    this._selectCity = this.wrap.findBlockInside({ block : 'stock-select', modName : 'type', modVal : 'region' });

                    this.bindTo('click',  this._onClick);
                }
            }
        },
        _onClick: function (e) {
            e.preventDefault();
            if(!this.hasMod('loaded')){
                this.setMod('loaded');
                this.emit('buttonSearchClick',
                            {
                                'filter':{
                                            'nameSparePart' : this._inputNameSparePart._getVal() || "",
                                            'codeSparePart' : this._inputCodeSparePart._getVal() || "",
                                            'idCity'        : this._selectCity._getVal() || ""
                                        },
                                'dealersList'   : this._selectCity.getDealersList()
                            }
                );
            }
        }
    }
));

});
