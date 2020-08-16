function initMap() {
var mapOptions = {
	zoom: 8,
	center: new google.maps.LatLng(59.938635, 30.323118),
	mapTypeId: 'roadmap'
};

var map = new google.maps.Map(document.getElementById('contacts__map-google'), mapOptions);


var location = {lat: 59.938635,lng: 30.323118};
var marker = new google.maps.Marker({
	position: location,
	map: contacts__map-google,
	title: 'location'
});
}

var image = '../images/map-pin.png';
var marker = new google.maps.Marker({

  position: location,
  map: map,
  title: 'location',
  icon: image
});
