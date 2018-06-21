class MapController < ApplicationController
	def index
		@map = GMaps.new(div: '#map', lat: -12.043333, lng: -77.028333)
		@map.addMarker(lat: -12.043333,
		               lng: -77.028333,
		               title: 'Lima',
		               click: GMaps::JS["function(e) { alert('You clicked in this marker'); }"])
		@map.addMarker(lat: -12.042,
		               lng: -77.028333,
		               title: 'Marker with InfoWindow',
		               infoWindow: {
		                 content: '<p>HTML Content</p>'
		               })
	end
end
