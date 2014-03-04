// Global InAppBrowser reference
var iabRef = null;

function onDeviceReady() {
	setTimeout(function() {
        navigator.splashscreen.hide();
    }, 2000);

	
	//$("#app-status-ul").append('<li>deviceready event received</li>');
	
	iabRef = window.open('http://www.kyousushi.com/', '_blank', 'location=no,toolbar=no');
    iabRef.addEventListener('loadstart', iabLoadStart);
    iabRef.addEventListener('loadstop', iabLoadStop);
    iabRef.removeEventListener('loaderror', iabLoadError);
    iabRef.addEventListener('exit', iabClose);

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


document.addEventListener('deviceready', onDeviceReady, true);