Ext.define('Rd.view.profiles.vcDataLimit', {
    extend  : 'Ext.app.ViewController',
    alias   : 'controller.vcDataLimit',
    init    : function() {
        var me = this;
    },
    sldrToggleChange: function(sldr){
		var me 		    = this;
		var pnl    	    = sldr.up('panel');
		var cnt         = pnl.down('#cntDetail');

		
        var value       = sldr.getValue();     
		if(value == 0){
		    cnt.hide();
      
		}else{
		    cnt.show();
		}
	},
	sldrDataAmountChange: function(sldr){
        var me 		= this;
		var fc    	= sldr.up('container');
        fc.down('displayfield').setValue(sldr.getValue());
    }/*,
    onHwmodeChange: function(hwmode){
        var me      = this;   
        var pnl     = hwmode.up('panel');//fs   
        var n_t		= pnl.down('#numRadioTwoChan');
		var n_v		= pnl.down('#numRadioFiveChan');
		var mesh    = pnl.down('#chkMesh');
		
		if(hwmode.getValue() =='11g'){
	        pnl.setTitle("2.4GHz");
	        pnl.setUI('panel-green');
		}else{
		    pnl.setTitle("5GHz");
		    pnl.setUI('panel-blue');
		}
		if(mesh.getValue()){ //Hide channel selection if there is a mesh interface
		    n_t.setVisible(false);
		    n_t.setDisabled(true);
		    n_v.setVisible(false);
		    n_v.setDisabled(true);
		}else{
		    if(hwmode.getValue() =='11g'){
		        n_t.setVisible(true);
		        n_t.setDisabled(false);
		        n_v.setVisible(false);
		        n_v.setDisabled(true);
		    }else{
		        n_t.setVisible(false);
		        n_t.setDisabled(true);
		        n_v.setVisible(true);
		        n_v.setDisabled(false);
		    }
        }
		
        if(hwmode.getValue() =='11a_ac'){
            me.addAcHtMode();
        }else{
            me.removeAcHtMode();
        }
    },
    addAcHtMode: function(){
        var me = this;
        var w  = me.getView();
        w.down('#radio_htmode_vht20').setVisible(true);
        w.down('#radio_htmode_vht40').setVisible(true);
        w.down('#radio_htmode_vht80').setVisible(true);
    },
    removeAcHtMode: function(radio_number){
        var me = this;
        var w  = me.getView();
       
        w.down('#radio_htmode_vht20').setVisible(false);
        w.down('#radio_htmode_vht40').setVisible(false);
        w.down('#radio_htmode_vht80').setVisible(false);
    },
    onChkMeshChange:function(chk){
        var me      = this;   
        var pnl     = chk.up('panel');//fs   
        var n_t		= pnl.down('#numRadioTwoChan');
		var n_v		= pnl.down('#numRadioFiveChan');
		var hwmode  = pnl.down('#hwmode');
		if(chk.getValue()){ //Hide channel selection if there is a mesh interface
		    n_t.setVisible(false);
		    n_t.setDisabled(true);
		    n_v.setVisible(false);
		    n_v.setDisabled(true);
		}else{
		    if(hwmode.getValue() =='11g'){
		        n_t.setVisible(true);
		        n_t.setDisabled(false);
		        n_v.setVisible(false);
		        n_v.setDisabled(true);
		    }else{
		        n_t.setVisible(false);
		        n_t.setDisabled(true);
		        n_v.setVisible(true);
		        n_v.setDisabled(false);
		    }
        }
    },
    OnChkIncludeBeaconIntervalChange : function(chk){
        var me = this;
        var w  = me.getView();
        var i  = w.down('#nfBeaconInterval');
        if(chk.getValue()){
            i.setVisible(true);
            i.setDisabled(false);
        }else{
            i.setVisible(false);
            i.setDisabled(true);
        }  
    },
    OnChkIncludeDistanceChange : function(chk){
        var me = this;
        var w  = me.getView();
        var i  = w.down('#nfDistance');
        if(chk.getValue()){
            i.setVisible(true);
            i.setDisabled(false);
        }else{
            i.setVisible(false);
            i.setDisabled(true);
        }  
    }*/  
});
