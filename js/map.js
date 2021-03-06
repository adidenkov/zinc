// https://www.taniarascia.com/google-maps-apis-for-multiple-locations/

function addMarker(map, infowindow, data) {
    var marker = new google.maps.Marker({
		position: new google.maps.LatLng(data.lat, data.lon),
		map: map
	});

    var info = "<strong>" + data.category + "</strong><br>for " + data.employer + "<br>";
    for(var i in data.address) {
        info += data.address[i] + "<br>";
    }
    info += "<button onclick=\"window.location.href=\'work#" + data.employer.replace(' ', '_').toLowerCase() + "\'\";>Learn More</button>";
    
	google.maps.event.addListener(marker, 'click', (function (marker, i) {
		return function () {
			infowindow.setContent(info);
			infowindow.open(map, marker);
		};
	})(marker, i));
}

function initMap() {
	var map = new google.maps.Map(document.getElementById('map'), {
		zoom: 13,
		center: new google.maps.LatLng(41.976816, -87.659916),
		mapTypeId: google.maps.MapTypeId.ROADMAP
	});
	
	var infowindow = new google.maps.InfoWindow({});
	
	addMarker(map, infowindow, {category:"Shoveling snow", employer:"Scrooge McDuck", address:["666 Pain Ct", "Honolulu, HI 77777"], lat:41.976816, lon:-87.659916});
    addMarker(map, infowindow, {category:"Moving", employer:"Mr. Rockefeller", address:["1025 W Belmont Ave", "Chicago, IL 60657"], lat:41.939670, lon:-87.655167});
    addMarker(map, infowindow, {category:"Gardeing", employer:"Taylor Swift", address:["6600 N Sheridan Rd", "Chicago, IL 60626"], lat:42.002707, lon:-87.661236});
    addMarker(map, infowindow, {category:"Lawn Mowing", employer:"Anrew Ng", address:["778 Huku Rd", "Chicago, IL 60626"], lat:41.996816, lon:-87.659916});
    addMarker(map, infowindow, {category:"Shoveling Snow", employer:"George Tang", address:["5782 Kim St", "Chicago, IL 60657"], lat:41.979670, lon:-87.675167});
    addMarker(map, infowindow, {category:"Shoveling snow", employer:"alex105", address:["888 North Bld", "Chicago, IL 60626"], lat:42.012707, lon:-87.761236});
    
}