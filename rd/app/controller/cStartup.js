/* 
This controller is the starting point. 
It checks if a user is logged in
If not it will load the Login controller and call it's Index action
If they are logged in it will load the Dashboard controller and call it's Index action
*/

Ext.define('Rd.controller.cStartup', {
    extend: 'Ext.app.Controller',
    mixins : [
        'Ext.route.Mixin'
    ],

    routes : {
        'login' 						: 'onLoginRoute',
		'dashboard'						: 'onDashboardRoute',
		'passwordreset'					: 'onPasswordReset'
    },
    config: {
        urlCheckToken:          '/cake3/rd_cake/dashboard/check_token.json'
    },
    refs: [
        { ref: 'viewP',         selector: 'viewP',          xtype: 'viewP',      autoCreate: false }
    ],
	init: function() {
        me = this;
        me.control({
            '*': {
                unmatchedroute: 'handleUnmatchedRoute'
            }
        });
	},
	actionIndex: function(){
        var me          = this;     
		
        me.application.setSelLanguage(Rd.config.selLanguage); //We hardcode the language since it is not very efficient to store the phrases in DB
        Ext.Ajax.setExtraParams({'sel_language': me.application.getSelLanguage()});
		me.originalRoute = Rd.getApplication().getDefaultToken();
		setTimeout(function(){
		  Ext.get('loading').remove();
		  Ext.get('loadSpin').fadeOut({remove:true});
		}, 250);

    },
    // ROUTING
    onLoginRoute: function() {
        var me = this,
			token = Ext.util.Cookies.get("Token"); 
			
		me.cleanUpWins();
		//No token?
        if(token == null){
            me.showAuth();
        } else {
			//me.redirectTo('dashboard', {replace: true}); // Continue if already logged in
			me.redirectTo('dashboard'); // Continue if already logged in
			return;
		}
    },
    onDashboardRoute: function() {
        var me = this,
			token = Ext.util.Cookies.get("Token"); 
			
		me.cleanUpWins();
		//No token?
        if(token == null){
            me.showAuth();
        } else {
			me.checkToken(token).catch(function(error) {
				console.log('Auth Error - '+error);
				me.showAuth();
			}).then(function(authData) {
                if(authData != undefined){//Apply phrases to the cusom VTypes to include language:
					me.application.applyVtypes();
					Ext.Ajax.setExtraParams({}); // Clear any old ones out
					//Set extra params to token's value
					//This is the second place of three where we set the extraParams. The token is valid 3rt blace in cLogin.js
					Ext.Ajax.setExtraParams({'token': authData.data.token,'sel_language': me.application.getSelLanguage()});
					me.application.setDashboardData(authData.data);
					me.showMain();
				}
				return;
			});
        }
    },
    onPasswordReset: function() {
        var me = this; 
			
        me.application.runAction('cPasswordReset','Index'); // TODO

    },
	//
	//  cleanUpWins - Close windows that may have been reached during "out of app" /password resett/login processes
	cleanUpWins: function() {
		var me = this,
		    lwin = Ext.ComponentQuery.query('#winLogin')[0],
			msgWin = Ext.ComponentQuery.query('panel[cls~=x-message-box]')[0],
			vp = me.getViewP(); //No token?
		vp.removeAll(true);
		if(msgWin != undefined){
			try {
				msgWin.close();
			} catch (err) {
				// just pass through
			}
		} 
		if(lwin != undefined){
			lwin.close();
		} 
	},
	// Verify Valid Token on backend
	checkToken: function(token){
		var me = this;
        return new Ext.Promise(function (resolve, reject) {
            var screen_width = Ext.getBody().getViewSize().width;
            var auto_compact = false;
            if(screen_width < 1000){ //Smaller screens -> Auto compact
                auto_compact = true;
            }
            //Check if the back-end likes our token
            Ext.Ajax.request({
                url: me.getUrlCheckToken(),
                params: {
                    token       : token,
                    auto_compact: auto_compact
                },
                method: 'GET',
                success: function(response){
                    var jsonData = Ext.JSON.decode(response.responseText);
                    //Set the phrases
                    if(jsonData.success){ //Token is ok, let us continiue
                        resolve(jsonData);
                    }else{
                        reject(response.status+':'+response.statusText);
                    }
                },
				failure: function(response, opts) {
					 reject(response.status+':'+response.statusText);
				}
            });
		});
	},
    showAuth: function() {
        this.application.runAction('cLogin','Index');
    },
    showMain: function() {
        this.application.runAction('cDashboard','Index');
    },
    handleUnmatchedRoute: function(route) {
        var me = this;

        var target = Rd.getApplication().getDefaultToken();
        Ext.log.warn('Route unknown: ', route);
        if (route !== target) {
            me.redirectTo(target, {replace: true});
        }
    }

});
