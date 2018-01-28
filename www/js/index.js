// next is to do a jquery ajax call

var app = {
    // Application Constructor
		vOld:0,
    vNew:0,
    stack:[],
    mx:0,
    mn:0,
    move:0,
    mov:0,
    mot:[],
    cnt:[],
    initialize: function() {
        this.bindEvents();
    },
    bindEvents: function() {

        document.addEventListener('deviceready',this.onDeviceReady,false);
	    document.addEventListener("whip",app.whip,false);
	    document.addEventListener('offline',app.offline);
	    document.addEventListener('online',app.ol);
    },
    onDeviceReady: function() {
			app.ol();
	    app.cnt.push(document.getElementById("w"));
			app.cnt.push(document.getElementById("horn"));
    },
    ol:function(){
	    app.mov = navigator.accelerometer.watchAcceleration(app.onSuccess,app.onError,{frequency:100});
    },
    offline:function () {
	    navigator.accelerometer.clearWatch(app.mov);
    },
    onSuccess :function(pos){
	    app.onChange(pos);
    	var diff = app.vNew - app.vOld;
    	app.motion(diff);
    	app.onChange(pos);
    },

	onError: function(error){
		alert("err:" + error);
	},

    onBtnClick:function(){
        app.mn = app.mx = 0;
        var ses = {detail:document.getElementById("f1").value};
	    app.whip(ses);
    },
    onChange:function(pos){
    	app.stack.push(pos);
    	if (app.stack.length >4){
    		app.stack.reverse();
    		app.stack.pop();
    		app.stack.reverse();
    		for(var a = 0;a < 2;a++)
    			app.vOld += app.stack[a].x + app.stack[a].y + app.stack[a].z;
		    for(var a = 2;a < 4;a++)
			    app.vNew += app.stack[a].x + app.stack[a].y + app.stack[a].z;
		    app.vOld =app.vOld/6;
		    app.vNew =app.vNew/6;
	    }
    },
    motion:function(diff){
    	var cnt = 11;
	    if((diff > cnt) && app.mx === 0){
		    app.mot = [];
		    var custEvent = new CustomEvent('whip',{
		    	detail : document.getElementById("f1").value
		    });
		    if (app.mx ===0) {
			    document.dispatchEvent(custEvent);
			    app.mx = 1;
		    }
	    }
    	if (diff > -3 && diff <= 4){
    		app.mot=[];
    	}
    	if ((diff > cnt || diff < -cnt) && app.mot.length == 0){
    		app.mot.push(diff);
		    // document.addEventListener("whip",app.whip,false);
    	}
    	if (app.mot.length > 5){
    		app.mot.reverse();
		    app.mot.pop();
		    app.mot.reverse();
    	}
    },
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');
    },
    whip:function(eve){
	    try {
		    var url = $(app.cnt[parseInt(eve.detail)]).attr('src');
		    //alert(url);
		    app.mn = new Media('/android_asset/www/' + url,
				    function () {
				    },
				    // error callback
				    function (err) {
					    alert(err.message);
				    }
		    );
		    app.mn.play();
	    } catch (ex){
	    	alert(ex);
	    } finally {
		    setTimeout(function () {
		    	app.mn.stop();
			    app.mn.release();
			    app.mx = 0;
		    },3000);
	    }
    }
};
