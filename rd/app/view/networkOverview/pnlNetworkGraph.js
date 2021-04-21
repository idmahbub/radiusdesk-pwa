Ext.define('Rd.view.networkOverview.pnlNetworkGraph', {
    extend  : 'Ext.panel.Panel',
    alias   : 'widget.pnlNetworkGraph',
    margins : '0 0 0 0',
    plain   : true,
    border  : false,
    initComponent: function(){
        var me      = this;
        me.store    = Ext.create(Ext.data.Store,{});
        
        var chart = Ext.create('Ext.chart.CartesianChart',{
             insetPadding: {
                top     : 20,
                left    : 20,
                right   : 20,
                bottom  : 20
            },
            width   : '80%',
            store   : me.store,
            legend: {
                type    : 'dom',
                docked  : 'top'
            },
            axes    : [
                {
                    type        : 'numeric',
                    position    : 'left',
                    adjustByMajorUnit: true,
                    grid        : true,
                    renderer    : function(axis, label, layoutContext) {
                        return Ext.ux.bytesToHuman(label);
                    },
                    minimum     : 0
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
