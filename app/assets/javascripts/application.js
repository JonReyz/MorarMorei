// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require rails-ujs
//= require activestorage
//= require turbolinks
//= require_tree .
//= require jquery
//= require gmaps

document.addEventListener("turbolinks:load", function() {
	function initialize() {
		if (document.getElementById('map')) {
			var mapOptions = {
				zoom: 17,
				center: new google.maps.LatLng(-22.0059848, -47.8931638),
			};

			var map = new google.maps.Map(document.getElementById('map'), mapOptions);

			function createMarker(row) {
				var marker = new google.maps.Marker({
					position: new google.maps.LatLng(row['latitude'], row['longitude']),
					title: row['address'],
				});

				google.maps.event.addListener(marker, 'click', function() {
					$.get(
						'realties/' + row['id'],
						{ },
						function(data) {
							$('#info').html(data);
						}
					);
				});

				return marker
			}

			$.get(
				'realties.json',
				{},
				function(data) {
					var markers = data.map(createMarker);

					var markerCluster = new MarkerClusterer(map, markers, {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});

				}
			);
		}
	}

	initialize()
});
