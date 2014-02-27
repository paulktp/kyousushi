function onDeviceReady() {
	
	$("#app-status-ul").append('<li>deviceready event received</li>');
}

document.addEventListener('deviceready', onDeviceReady, true);