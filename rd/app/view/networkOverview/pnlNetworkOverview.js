Ext.define('Rd.view.networkOverview.pnlNetworkOverview', {
    extend      : 'Ext.panel.Panel',
    alias       : 'widget.pnlNetworkOverview',
    scrollable  : true,
    layout      : {
      type  : 'vbox',
      align : 'stretch'  
    },
    requires: [
        'Rd.view.networkOverview.vcPnlNetworkOverview',
        'Rd.view.networkOverview.pnlNetworkDay',
        'Rd.view.networkOverview.pnlNetworkWeek',
        'Rd.view.networkOverview.pnlNetworkMonth',
        'Rd.view.components.cmbMesh'
    ],
    listeners   : {
        afterlayout  : 'resizeSegments'
    },
    controller : 'vcPnlNetworkOverview',
    initComponent: function() {
        var me      = this;
        var scale   = 'small';
        
         me.dockedItems= [
            {
                xtype   : 'toolbar',
                dock    : 'top',
                items   : [
                    {  
                        glyph   : Rd.config.icnReload,    
                        scale   : scale, 
                        itemId  : 'reload',
                        ui      : 'button-orange',   
                        tooltip: i18n('sReload'),
                        listeners   : {
                            click   : 'reload'
                        }
                    },
                    {
                        xtype       : 'cmbMesh',
                        width       : 400,
                        labelWidth  : 50,
                        listeners   : {
                            change      : 'onMeshChange'
                        }
                    },
                    '|',
                    { 
                        scale       : scale, 
                        glyph       : Rd.config.icnLeft,
                        reference   : 'btnTimeBack',
                        tooltip     : 'Go Back 1Day',
                        listeners   : {
                            click   : 'onClickTimeBack'
                        }
                    },  
                    {
                        xtype       : 'datefield',
                        itemId      : 'dtDate',
                        reference   : 'dtDate',
                        name        : 'date',
                        format      : "d/m/Y",
                        value       : new Date(),
                        width       : 120,
                        listeners   : {
                            change  : 'dateChange'
                        }
                    },
                    { 
                        scale       : scale, 
                        glyph       : Rd.config.icnRight,
                        reference   : 'btnTimeForward',
                        tooltip     : 'Go Forward 1Day',
                        disabled    : true,
                        listeners   : {
                            click: 'onClickTimeForward'
                        }
                    }, 
                    '|',
                    { 
                        scale       : scale, 
                        glyph       : Rd.config.icnHourStart,
                        text        : 'Day',
                        ui          : 'button-pink',
                        listeners   : {
                            click: 'onClickTodayButton'
                        }
                    },  
                    { 
                        scale       : scale,
                        glyph       : Rd.config.icnHourHalf,
                        text        : 'Week',
                        ui          : 'button-purple',
                        listeners   : {
                            click: 'onClickThisWeekButton'
                        }
                    },
                    { 
                        scale       : scale, 
                        glyph       : Rd.config.icnHourEnd,
                        text        : 'Month',
                        ui          : 'button-brown',
                        listeners   : {
                             click: 'onClickThisMonthButton'
                        }
                    }
                ]
            }         
        ];
        
          me.items = [
            {
                xtype       : 'pnlNetworkDay',
                reference   : 'pnlNetworkDay',
                glyph       : Rd.config.icnHourStart
            },
            {
                xtype       : 'pnlNetworkWeek',
                reference   : 'pnlNetworkWeek',
                glyph       : Rd.config.icnHourHalf
            },
            {
                xtype       : 'pnlNetworkMonth',
                reference   : 'pnlNetworkMonth',
                glyph       : Rd.config.icnHourEnd
            }
        ];
              
        
        me.callParent(arguments);
    }
});
