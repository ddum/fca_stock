modules.define('stock-input', ['i-bem__dom'], function(provide, BEMDOM) {

    provide(BEMDOM.decl(this.name, {
        onSetMod: {
            'js': {
                'inited': function() {
                    this._input = this.findBlockOn('input');
                    this._setVal(this.params.val);

                    this.wrap = this.findBlockOutside('stock-content');
                    this._buttonSearch = this.wrap.findBlockInside({ block : 'stock-button', modName : 'type', modVal : 'search' });

                    this.bindTo('focusin',  this._onInFocus);
                    this.bindTo('focusout', this._onOutFocus);
                    this.bindTo('keydown', this._onKeyDown);
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
        },
        _onKeyDown: function(e) {
            console.log(e.keyCode);
            if(e.keyCode == 13){
                this._buttonSearch._onClick(e);
            }
        }
    }
));

});
