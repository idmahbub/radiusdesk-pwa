Ext.define('Rd.view.networkOverview.pnlNetworkWeek', {
    extend  : 'Ext.panel.Panel',
    alias   : 'widget.pnlNetworkWeek',
    ui      : 'light',
    title   : "Week",
    headerPosition: 'right',
    height  : 550,
    margin  : 0,
    padding : 0,
    border  : true,
    layout: {
        type    : 'vbox',
        align   : 'stretch'
    },
    requires	: [
        'Ext.data.Store' 
    ],
    initComponent: function() {
        var me      = this; 
        var m       = 5;
        var p       = 5;
        Ext.create('Ext.data.Store', {
            storeId : 'weekMacStore',
            fields  :[ 
                {name: 'id',            type: 'int'},
                {name: 'mac',           type: 'string'},
                {name: 'vendor',        type: 'string'},
                {name: 'rx_bytes',      type: 'int'},
                {name: 'tx_bytes',      type: 'int'},
                {name: 'total_bytes',   type: 'int'},
                {name: 'avg_signal',    type: 'int'}
            ]
        });
        
        Ext.create('Ext.data.Store', {
            storeId : 'weekNodeStore',
            fields  :[ 
                {name: 'id',            type: 'int'},
                {name: 'name',          type: 'string'},
                {name: 'node_id',       type: 'int'},
                {name: 'rx_bytes',      type: 'int'},
                {name: 'tx_bytes',      type: 'int'},
                {name: 'total_bytes',   type: 'int'},
                {name: 'avg_signal',    type: 'int'}
            ]
        });          
        
        me.items = [
            {
                xtype   : 'panel',
                flex    : 1,
                border  : false,
                layout: {
                    type    : 'hbox',
                    align   : 'stretch'
                },
                items : [
                    {
                        xtype   : 'panel',
                        margin  : m,
                        padding : p,
                        flex    : 1,
                        bodyCls : 'pnlInfo',
                        layout  : 'fit',
                        border  : true,
                        ui      : 'light',
                        itemId  : 'weeklyTotal',
                        tpl     : new Ext.XTemplate(
                            '<div class="divInfo">',
                            '<h1 style="font-size:250%;font-weight:lighter;">{total_bytes}</h1>',       
                            '<p style="color: #000000; font-size:110%;">',
                                '<span class="grpUp"><i class="fa fa-arrow-circle-down"></i></span> In: {rx_bytes}',
                                '&nbsp;&nbsp;&nbsp;&nbsp;',
                                '<span class="grpDown"><i class="fa fa-arrow-circle-up"></i></span> Out: {tx_bytes}',
                            '</p>',
                            '</div>'
                        ),
                        data    : {
                        }
                    },
                    {
                        flex            : 1,
                        margin          : 0,
                        padding         : 0,
                        border          : false,
                        itemId          : 'plrWeekly',
                        xtype           : 'polar',
                        innerPadding    : 10,
                        interactions    : ['rotate', 'itemhighlight'],
                        store           : Ext.data.StoreManager.lookup('weekMacStore'),
                        series          : {
                           type         : 'pie',
                          
                           highlight    : true,
                           angleField   : 'total_bytes',
                           label        : {
                               field    : 'name',
                               display  : 'rotate'
                           },
                           donut        : 10,    
                           tooltip      : {
                                trackMouse: true,
                                renderer: function (tooltip, record, item) {
                                    tooltip.setHtml(
                                        "<h2>"+record.get('username')+"</h2><h3>"+Ext.ux.bytesToHuman(record.get('total_bytes'))+"</h3>"
                                    );
                                }
                            }    
                        }
                    },
                    {
                        xtype   : 'grid',
                        margin  : m,
                        padding : p,
                        ui      : 'light',
                        title   : 'Top 10 Devices For The Week',
                        glyph   : Rd.config.icnDevice,
                        itemId  : 'gridTopTenDaily',
                        border  : true,       
                        store   : Ext.data.StoreManager.lookup('weekMacStore'),
                        emptyText: 'No Users For This Week',
                        columns: [
                            { 
                                text        : 'MAC Address',  
                                dataIndex   : 'mac',
                                flex        : 1,
                                xtype       : 'templatecolumn', 
                                tpl         : new Ext.XTemplate(
                                    "<tpl if='(!Ext.isEmpty(vendor))'>",
                                        "{mac}<span style='color:grey;'> ({vendor})</span>",
                                    '<tpl else>',
                                        '{mac}',
                                    '</tpl>'
                                )     
                            },
                            { text: 'Data In',   dataIndex: 'tx_bytes',  hidden: true, renderer: function(value){
                                    return Ext.ux.bytesToHuman(value)              
                                } 
                            },
                            { text: 'Data Out',  dataIndex: 'rx_bytes', hidden: true,renderer: function(value){
                                    return Ext.ux.bytesToHuman(value)              
                                } 
                            },
                            { text: 'Data Total',dataIndex: 'total_bytes',tdCls: 'gridMain',renderer: function(value){
                                    return Ext.ux.bytesToHuman(value)              
                                } 
                            }
                        ],    
                        flex: 1
                    }
                ]
            },
            {
                xtype   : 'panel',
                flex    : 1,
                border  : false,
                layout: {
                    type    : 'hbox',
                    align   : 'stretch'
                },
                items   : [
                    {
                        xtype   : 'pnlDataUsageGraph',
                        flex    : 2,
                        margin  : 0,
                        padding : 0,
                        layout  : 'fit',
                        border  : false   
                    },
                    {
                        xtype   : 'grid',
                        itemId  : 'gridNodes',
                        margin  : m,
                        padding : p,
                        ui      : 'light',
                        title   : 'Nodes',
                        glyph   : Rd.config.icnMesh,
                        border  : true,
                        hidden  : false,       
                        store   : Ext.data.StoreManager.lookup('weekNodeStore'),
                        emptyText: 'No Nodes For This Week',
                        bufferedRenderer : true,
                        columns: [
                            { 
                                text        : 'Node Name',  
                                dataIndex   : 'name',
                                flex        : 1
                            },
                            { text: 'Data In',   dataIndex: 'tx_bytes',  hidden: true, renderer: function(value){
                                    return Ext.ux.bytesToHuman(value)              
                                } 
                            },
                            { text: 'Data Out',  dataIndex: 'rx_bytes', hidden: true,renderer: function(value){
                                    return Ext.ux.bytesToHuman(value)              
                                } 
                            },
                            { text: 'Data Total',dataIndex: 'total_bytes',tdCls: 'gridMain',renderer: function(value){
                                    return Ext.ux.bytesToHuman(value)              
                                } 
                            }
                        ],
                        flex: 1
                    }
                ]
            }
        ];
        me.callParent(arguments);
    }
});
