modules.define('stock-input', ['i-bem__dom'], function(provide, BEMDOM) {

    provide(BEMDOM.decl(this.name, {
        onSetMod: {
            'js': {
                'inited': function() {
                    this._input = this.findBlockOn('input');
                    this._setVal(this.params.val);

                    this.bindTo('focusin',  this._onInFocus);
                    this.bindTo('focusout', this._onOutFocus);
                }
            }
        },
        _setVal: function(txt){
            this._input.setVal(txt, this);
        },
        _getVal: function(){
            var value = this._input.getVal();
            if(value == this.params.val){
                return false;
            }else{
                return value;
            }
        },
        _onInFocus: function() {
            if(this._input.getVal() == this.params.val){
                this._setVal('');
            }
        },
        _onOutFocus: function() {
            if(this._input.getVal() === ''){
                this._setVal(this.params.val);
            }
        }
    }
));

});
