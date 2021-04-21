Ext.define('Rd.view.components.btnGrpRefreshAndTimespan', {
    extend      : 'Ext.container.ButtonGroup',
    xtype       : 'btnGrpRefreshAndTimespan',
    items       : [
        {   xtype   : 'splitbutton', 
            glyph   : Rd.config.icnReload , 
            scale   : 'large', 
            itemId  : 'reload',   
            tooltip : i18n('sReload'),
            ui      : Rd.config.btnUiRefresh,
            menu    : {
                items: [
                    '<b class="menu-title">Reload every:</b>',
                    {'text': '30 seconds',  'itemId': 'mnuRefresh30s','group': 'refresh','checked': false },
                    {'text': '1 minute',    'itemId': 'mnuRefresh1m', 'group': 'refresh','checked': false },
                    {'text': '5 minutes',   'itemId': 'mnuRefresh5m', 'group': 'refresh','checked': false },
                    {'text':'Stop auto reload','itemId':'mnuRefreshCancel', 'group': 'refresh', 'checked':true}
                ]
            }
        },
        {   
            xtype       : 'button', 
            text        : 'Past Hour',    
            toggleGroup : 'time_n', 
            enableToggle : true,
            scale       : 'large', 
            itemId      : 'hour', 
            pressed     : true,
            ui          : Rd.config.btnUiRefresh
        },
        { 
            xtype       : 'button', 
            text        : 'Past 24 Hours',   
            toggleGroup : 'time_n', 
            enableToggle : true, 
            scale       : 'large', 
            itemId      : 'day',
            ui          : Rd.config.btnUiRefresh 
        },
        { 
            xtype       : 'button', 
            text        : 'Past 7 Days',     
            toggleGroup : 'time_n', 
            enableToggle : true, 
            scale       : 'large', 
            itemId      : 'week',
            ui          : Rd.config.btnUiRefresh
        }
    ]
});

