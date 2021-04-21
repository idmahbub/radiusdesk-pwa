Ext.define('Rd.controller.cSettings', {
    extend: 'Ext.app.Controller',
    views: [
        'settings.pnlSettings',
        'settings.cmbMapPrefs'
    ],
    stores: [
        'sSettings'
    ],
    models: [
    ],
    config: {
        urlAddEntry     : '/cake3/rd_cake/settings/edit.json', 
        urlViewEntry    : '/cake3/rd_cake/settings/index.json'
    },
    init: function () {
        var me = this;
        if (me.inited) {
            return;
        }
        me.inited = true;

        me.control({
            'pnlSettings #save': {
                click: me.add
            },
            'pnlSettings': {
                beforeshow: me.loadData
            }
        })
    },

    actionIndex: function (pnl) {
        var me = this;


        if (me.populated) {
            return;
        }
        var vd = Ext.create('Rd.view.settings.pnlSettings', {
            region: 'center',
            layout: 'fit',
            margins: '0 0 0 0',
            border: false,
            itemId: 'pnlSettings'
        });

        pnl.add(vd);
        var form    = pnl.down('form');       
            
        form.load({url:me.getUrlViewEntry(), method:'GET', success: function (form, action) {
                try {
                    var resp = Ext.decode(action.response.responseText);

                    if (resp.data.length > 0) {
                        // addstudent returns student model with Id so we can re-load model into form so form will have isDirty false
                        var student = Ext.create('Rd.model.mSetting');
                        student.set(resp.data[0]);
                        form.loadRecord(student);
                    }
                }
                catch (ex) {
                    Ext.Msg.alert('Status', 'Exception: ' + ex.Message);

                }
            },
            failure: function (form, action) {
                Ext.Msg.alert("Load failed", action.result.errorMessage);
            }});


        //We first create a plain dashboard


        me.populated = true;

    },
    add: function (button) {
        var me  = this;
        var form = button.up('form');
        form.submit({
            clientValidation: true,
            url: me.getUrlAddEntry(),
            success: function (form, action) {

                Ext.ux.Toaster.msg(
                    "Settings updated",
                    "Setting updated successfully",
                    Ext.ux.Constants.clsInfo,
                    Ext.ux.Constants.msgInfo
                );
            },
            failure: Ext.ux.formFail
        });
    },
    loadData: function (win) {
        var me      = this;
        var form    = win.down('form');    
        form.load({url:me.getUrlViewEntry(), method:'GET'});
    }


});
