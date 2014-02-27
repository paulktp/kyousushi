// Global InAppBrowser reference
var iabRef = null;

function onDeviceReady() {
	
	//$("#app-status-ul").append('<li>deviceready event received</li>');
	
	iabRef = window.open('http://wp1.ktp-concept.com/', '_blank', 'location=yes');
    iabRef.addEventListener('loadstart', iabLoadStart);
    iabRef.addEventListener('loadstop', iabLoadStop);
    iabRef.removeEventListener('loaderror', iabLoadError);
    iabRef.addEventListener('exit', iabClose);

}

function iabLoadStart(event) {
    //alert(event.type + ' - ' + event.url);
}

function iabLoadStop(event) {
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