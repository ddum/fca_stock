modules.define('stock-input', ['i-bem__dom'], function(provide, BEMDOM) {

    provide(BEMDOM.decl(this.name, {
        onSetMod: {
            'js': {
                'inited': function() {
                    this._input = this.findBlockInside('input');
                    this._setVal(this.params.val);

                    this.bindTo('focusin',  this._onInFocus);
                    this.bindTo('focusout', this._onOutFocus);
                }
            }
        },
        _setVal: function(txt){
            this._input.setVal(txt, this);
        },
        _onInFocus: function() {
            if(this._input.getVal() == this.params.val){
                this._setVal('');
            }
        },
        _onOutFocus: function() {
            if(this._input.getVal() == ''){
                this._setVal(this.params.val);
            }
        }
    }
));

});
