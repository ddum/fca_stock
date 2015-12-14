modules.define('stock-select', ['BEMHTML', 'i-bem__dom', 'jquery', 'jquery__selectbox'], function(provide, BEMHTML, BEMDOM, $) {
    provide(BEMDOM.decl({ block : 'stock-select', modName : 'plugin', modVal : 'selectbox' }, {
        onSetMod: {
            'js': {
                'inited': function() {
                    this.domElem.selectbox();
                    this.setMod('created');
                }
            }
        },
        setOptions: function (data) {
           _this = this;
           $.each( data, function( i, value ) {
               _this.domElem.append('<option value="' + value.val + '">' + value.text + '</option>');
           });
           this.domElem.trigger('refresh');
       },
       _getVal: function () {
           var value = this.domElem.val();
           if(value == 'none'){
               return false;
           }else{
               return value;
           }
       }
    }
));

});
