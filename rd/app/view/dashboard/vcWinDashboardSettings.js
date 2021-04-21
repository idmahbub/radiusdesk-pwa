Ext.define('Rd.view.dashboard.vcWinDashboardSettings', {
    extend  : 'Ext.app.ViewController',
    alias   : 'controller.vcWinDashboardSettings',
    config : {
        urlCheckExperimental : '/cake3/rd_cake/meshes/mesh_experimental_check.json',
        tagData : {
            'radius'    : 'RADIUS',
            'meshdesk'  : "MESH Networks"
           // 'apdesk'    : "Access Points"
        }
    },
    init: function() {
        var me = this;
    },
    onOverviewsToIncludeSelect: function(tag){
		var me      = this;
		var form    = tag.up('form');
		var realm   = form.down('cmbRealm');
		var s       = tag.getValue();
		if(Ext.Array.contains(s,'radius_overview')){
		    realm.setVisible(true);
		    realm.setDisabled(false);       
		}else{
		    realm.setVisible(false);
		    realm.setDisabled(true);
		}
	},
	onChkWlActiveChange: function(chk){
        var me       = this;
        var pnl    = chk.up('panel');
         if(chk.getValue()){ 
         
            pnl.down('#txtWlHeader').setDisabled(false);
            pnl.down('#clrWlHeaderBg').setDisabled(false);
            pnl.down('#clrWlHeaderFg').setDisabled(false); 
            pnl.down('#txtWlFooter').setDisabled(false); 
            pnl.down('#chkWlImgActive').setDisabled(false); 
            pnl.down('#flWlImgFileUpload').setDisabled(false);
          
         }else{
         
            pnl.down('#txtWlHeader').setDisabled(true);
            pnl.down('#clrWlHeaderBg').setDisabled(true);
            pnl.down('#clrWlHeaderFg').setDisabled(true); 
            pnl.down('#txtWlFooter').setDisabled(true); 
            pnl.down('#chkWlImgActive').setDisabled(true); 
            pnl.down('#flWlImgFileUpload').setDisabled(true);
         }  
    },
    onChkWlImgActiveChange: function(chk){
        var me      = this;
        var pnl     = chk.up('panel');
        var value   = chk.getValue();
        if(value){   
            pnl.down('#flWlImgFileUpload').setDisabled(false);        
        }else{
            pnl.down('#flWlImgFileUpload').setDisabled(true);
        }
    }
    
});
