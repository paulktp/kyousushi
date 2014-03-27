// Global InAppBrowser reference
var iabRef = null;

function onDeviceReady() {
	setTimeout(function() {
        navigator.splashscreen.hide();
    }, 2000);

	
	//$("#app-status-ul").append('<li>deviceready event received</li>');
	
	navigator.geolocation.getCurrentPosition(onSuccess, onError);
	
	if(device.platform == "iOS"){
   	 initPushwoosh_IOS();
	}

	
	iabRef = window.open('http://www.kyousushi.com/', '_blank', 'location=no,toolbar=no');
    iabRef.addEventListener('loadstart', iabLoadStart);
    iabRef.addEventListener('loadstop', iabLoadStop);
    iabRef.removeEventListener('loaderror', iabLoadError);
    iabRef.addEventListener('exit', iabClose);

}
var onSuccess = function(position) {
	var element = document.getElementById('geolocation');
	element.innerHTML = position.coords.latitude+";"+position.coords.longitude;
    /*alert('Latitude: '          + position.coords.latitude          + '\n' +
          'Longitude: '         + position.coords.longitude         + '\n' +
          'Altitude: '          + position.coords.altitude          + '\n' +
          'Accuracy: '          + position.coords.accuracy          + '\n' +
          'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
          'Heading: '           + position.coords.heading           + '\n' +
          'Speed: '             + position.coords.speed             + '\n' +
          'Timestamp: '         + position.timestamp                + '\n');*/
};
function onError(error) {
    alert('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
}



function iabLoadStart(event) {
	if(device.platform =="Android"){
		navigator.notification.activityStart("Chargement", "patientez..."); 
	}else if(device.platform =="iOS"){
		navigator.splashscreen.show();
	}
	
    //alert(event.type + ' - ' + event.url);
}

function iabLoadStop(event) {

	if(device.platform =="Android"){
		navigator.notification.activityStop();
	}else if(device.platform =="iOS"){
		navigator.splashscreen.hide();
	}
    //alert(event.type + ' - ' + event.url);
}

function iabLoadError(event) {
    //alert(event.type + ' - ' + event.message);
}

function iabClose(event) {
     //alert(event.type);
     iabRef.removeEventListener('loadstart', iabLoadStart);
     iabRef.removeEventListener('loadstop', iabLoadStop);
     iabRef.removeEventListener('loaderror', iabLoadError);
     iabRef.removeEventListener('exit', iabClose);
}

function initPushwoosh_IOS()
{ 

	var pushNotification = window.plugins.pushNotification;
    pushNotification.onDeviceReady();
    
    pushNotification.registerDevice({alert:true, badge:true, sound:true, pw_appid:"C125D-81938", appname:"	Kyou"},
        function(status) {
            var deviceToken = status['deviceToken'];
            console.warn('registerDevice: ' + deviceToken);
            navigator.notification.alert('push token: ' + pushToken);
        },
        function(status) {
            console.warn('failed to register : ' + JSON.stringify(status));
            navigator.notification.alert(JSON.stringify(['failed to register ', status]));
        }
    );
     
    pushNotification.setApplicationIconBadgeNumber(0);
     
    document.addEventListener('push-notification', function(event) {

        var notification = event.notification;

        navigator.notification.alert(notification.aps.alert, alertCallback, "Notification", "OK") ;
        pushNotification.setApplicationIconBadgeNumber(0);
    });
    
}

function alertCallback(){
	
}


document.addEventListener('deviceready', onDeviceReady, true);