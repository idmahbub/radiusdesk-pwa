Ext.define('Rd.view.networkOverview.pnlNetworkDay', {
    extend  : 'Ext.panel.Panel',
    alias   : 'widget.pnlNetworkDay',
    //ui      : 'light',
    title   : "Day",
    headerPosition: 'right',
    height  : 550,
    margin  : 0,
    padding : 0,
    layout: {
        type    : 'vbox',
        align   : 'stretch'
    },
    requires	: [
        'Ext.data.Store',
        'Ext.data.BufferedStore'       
    ],
    initComponent: function() {
        var me      = this; 
        var m       = 5;
        var p       = 5;
        me.callParent(arguments);
    }
});
