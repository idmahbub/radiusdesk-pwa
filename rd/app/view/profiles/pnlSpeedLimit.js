Ext.define('Rd.view.profiles.pnlSpeedLimit', {
    extend      : 'Ext.panel.Panel',
    glyph       : Rd.config.icnSpeed,
    alias       : 'widget.pnlSpeedLimit',
    requires    : [
        'Rd.view.profiles.vcSpeedLimit'
    ],
    controller  : 'vcSpeedLimit',
    layout      : { type: 'vbox'},
    //layout      : { type: 'vbox', align: 'center' },
    title       : "SPEED LIMIT",
    initComponent: function(){
        var me      = this;
        var w_sec   = 350;
        var w_rd    = 68;
        me.width    = 550;
        me.padding  = 5;
        me.items    = [
			{
			    xtype       : 'sldrToggle',
			    fieldLabel  : 'Enabled',
			    userCls     : 'sldrDark',
			    name        : 'speed_limit_enabled',
			    itemId      : 'speed_limit_enabled',
			    value       : 1,
			    listeners   : {
					change  : 'sldrToggleChange'
				}
			},
			{ 
			    xtype       : 'container',
			    itemId      : 'cntDetail',
			    items       : [
			        {
			            xtype       : 'container',
                        layout      : 'hbox',
                        width       : w_sec+15,
                        items       : [
                            {
                                xtype       : 'displayfield',
                                width       : 180,
                                margin      : '15 0 0 15',
                                padding     : 0,
                                fieldLabel  : "<i class='fa fa-arrow-up'></i> Up Amount",
                                value       : 1
                            },
                            {
			                    xtype       : 'sliderfield',
                                name        : 'speed_upload_amount',
                                userCls     : 'sldrDark',
                                itemId      : 'sldrSpeedUploadAmount',
                                width       : 150,
                                increment   : 1,
                                minValue    : 1,
                                maxValue    : 1023,
                                listeners   : {
					                change  : 'sldrSpeedUploadAmountChange'
				                }
                            }
                        ]
                    },
                    {
                        xtype       : 'radiogroup',
                        fieldLabel  : "<i class='fa fa-arrow-up'></i> Up Unit",
                        itemId      : 'rgrpSpeedUploadUnit',
                        columns     : 2,
                        vertical    : false,
                        items       : [
                            {
                                boxLabel  : 'Kb/s',
                                name      : 'speed_upload_unit',
                                inputValue: 'kbps',
                                margin    : '0 15 0 0',
                                checked   : true
                            }, 
                            {
                                boxLabel  : 'Mb/s',
                                name      : 'speed_upload_unit',
                                inputValue: 'mbps',
                                margin    : '0 0 0 0'
                            }
                        ]
                    },
                    {
			            xtype       : 'container',
                        layout      : 'hbox',
                        width       : w_sec+15,
                        items       : [
                            {
                                xtype       : 'displayfield',
                                width       : 180,
                                margin      : '15 0 0 15',
                                padding     : 0,
                                fieldLabel  : "<i class='fa fa-arrow-down'></i> Down Amount",
                                value       : 1
                            },
                            {
			                    xtype       : 'sliderfield',
                                name        : 'speed_download_amount',
                                userCls     : 'sldrDark',
                                itemId      : 'sldrSpeedDownloadAmount',
                                width       : 150,
                                increment   : 1,
                                minValue    : 1,
                                maxValue    : 1023,
                                listeners   : {
					                change  : 'sldrSpeedDownloadAmountChange'
				                }
                            }
                        ]
                    },
                    {
                        xtype       : 'radiogroup',
                        fieldLabel  : "<i class='fa fa-arrow-down'></i> Down Unit",
                        itemId      : 'rgrpSpeedDownloadUnit',
                        columns     : 2,
                        vertical    : false,
                        items       : [
                            {
                                boxLabel  : 'Kb/s',
                                name      : 'speed_download_unit',
                                inputValue: 'kbps',
                                margin    : '0 15 0 0',
                                checked   : true
                            }, 
                            {
                                boxLabel  : 'Mb/s',
                                name      : 'speed_download_unit',
                                inputValue: 'mbps',
                                margin    : '0 0 0 0'
                            }
                        ]
                    }
                ]
            }
        ];       
        this.callParent(arguments);
    }
});
