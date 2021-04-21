Ext.define('Rd.view.settings.pnlSettings', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.pnlSettings',
    border: false,
    layout: 'hbox',
    store:'sSettings',
    bodyStyle: { backgroundColor: Rd.config.panelGrey },
    initComponent: function () {
        var me = this;

        me.items = {
            xtype: 'form',
            height: '100%',
            width: 500,
            layout: 'anchor',
            autoScroll: true,
            frame: true,
            bodyPadding: 10,
            fieldDefaults: {
                msgTarget: 'under',
                labelClsExtra: 'lblRd',
                labelAlign: 'left',
                labelSeparator: '',
                margin: Rd.config.fieldMargin,
                labelWidth: Rd.config.labelWidth,
                maxWidth: Rd.config.maxWidth
            },
            items: [

                {
                    xtype: 'fieldset',
                    title: 'MAPS',
                    defaultType: 'textfield',
                    defaults: {
                        anchor: '100%'
                    },
                    items: [

                        {
                            xtype: 'textfield',
                            fieldLabel: 'Google api key',
                            name: 'google_map_api_key',
                            itemId: 'google_map_api_key',
                            allowBlank: true,
                            blankText: i18n('sSupply_a_value'),
                            labelClsExtra: 'lblRdReq'     

                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Baidu api key',
                            name: 'baidu_map_api_key',
                            itemId: 'baidu_map_api_key',
                            allowBlank: true,

                            blankText: i18n('sSupply_a_value'),
                            labelClsExtra: 'lblRdReq'
                        },                      
                        { 
                            xtype         : 'cmbMapPrefs', 
                            labelClsExtra : 'lblRdReq',
                            name          :'map_to_use',
                            allowBlank    : false,
                            listeners     : {
                              //  change : 'onCmbMapPrefsChange'
                            } 
                        }                     

                    ]
                },
                {
                    xtype: 'fieldset',
                    title: 'MQTT',
                    defaultType: 'textfield',
                    defaults: {
                        anchor: '100%'
                    },
                    items: [
                        {
                            fieldLabel      : 'MQTT User',
                            name            : 'mqtt_user',
                            allowBlank      : false,
                            blankText       : i18n('sSupply_a_value'),
                            labelClsExtra   : 'lblRdReq'
                        },
                        {
                            fieldLabel      : 'MQTT Password',
                            name            : 'mqtt_password',
                            allowBlank      : false,
                            blankText       : i18n('sSupply_a_value'),
                            labelClsExtra   : 'lblRdReq'
                        },                 
                        {
                            fieldLabel      : 'MQTT Server URL',
                            name            : 'mqtt_server_url',
                            allowBlank      : false,
                            blankText       : i18n('sSupply_a_value'),
                            labelClsExtra   : 'lblRdReq'
                        },
                        {
                            fieldLabel      : 'MQTT Command Topic',
                            name            : 'mqtt_command_topic',
                            allowBlank      : false,
                            blankText       : i18n('sSupply_a_value'),
                            labelClsExtra   : 'lblRdReq'
                        }        
                    ]
                }
            ],
            buttons: [
                {
                    itemId: 'save',
                    formBind: true,
                    text: i18n('sSave'),
                    scale: 'large',
                    iconCls: 'b-save',
                    glyph: Rd.config.icnYes,
                    margin: Rd.config.buttonMargin
                }
            ]
        };
        me.callParent(arguments);
    }
});
