Ext.define('Rd.controller.cNetworkOverview', {
    extend: 'Ext.app.Controller',
    actionIndex: function(pnl){
        console.log("Gooi hom pappie");
        var me = this;   
        if (me.populated) {
            return; 
        }         
        pnl.add({
            xtype   : 'pnlNetworkOverview',
            border  : false,
            itemId  : 'tabNetworkOverview',
            plain   : true
        });       
        me.populated = true;
	}, 
    views   : [
        'networkOverview.pnlNetworkOverview'
    ],
    stores  : [
	
	],
    models  : [
       
    ],
    config  : {
        urlUsageForRealm    : '/cake3/rd_cake/data-usages/usage_for_realm.json',
        username            : false,
        type                : 'realm' //default is realm
    },
    refs    : [
       //  {  ref: 'grid',         selector: 'gridMeshOverview'}   
    ],
    init    : function() {
         var me = this;
        if (me.inited) {
            return;
        }
        me.inited = true;
        me.control({
            'pnlNetworkOverview cmbMesh' : {
                afterrender : me.afterRenderEventMesh   
            }
        });
    },
    afterRenderEventMesh: function(cmb){
        var me      = this;
        var dd      = me.application.getDashboardData();
        var mn      = 'Koos Se Mesh';
        var m_id    = 1;
        var rec     = Ext.create('Rd.model.mMesh', {name: mn, id: m_id});
        cmb.getStore().loadData([rec],false);
        cmb.setValue(m_id);    
    }    
});
