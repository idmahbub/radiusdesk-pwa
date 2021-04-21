Ext.define('Rd.view.networkOverview.pnlNetworkMonth', {
    extend  : 'Ext.panel.Panel',
    alias   : 'widget.pnlNetworkMonth',
    //ui      : 'light',
    title   : 'Month',
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
        
        Ext.create('Ext.data.Store', {
            storeId : 'monthMeshStore',
            fields  :[ 
                {name: 'id',            type: 'int'},
                {name: 'time_unit',     type: 'string'}
            ]
        });
            
        var chart = Ext.create('Ext.chart.CartesianChart',{
            itemId: 'monthChart',
            legend: {
                type    : 'dom',
                docked  : 'bottom'
            },
            insetPadding: {
                top     : 20,
                left    : 20,
                right   : 20,
                bottom  : 0
            },
            width   : '80%',
            height  : '100%',
            store   : Ext.data.StoreManager.lookup('monthMeshStore'),
            axes    : [
                {
                    type        : 'numeric',
                    position    : 'left',
                    adjustByMajorUnit: true,
                    grid        : true,
                    renderer    : function(axis, label, layoutContext) {
                        return Ext.ux.bytesToHuman(label);
                    },
                    minimum: 0
                }, 
                {
                    type        : 'category',
                    position    : 'bottom',
                    grid        : false
                }
            ],
            interactions: ['itemhighlight'],
            series: [
            ]
        });       
        me.items = chart;              
        me.callParent(arguments);
    }
});
