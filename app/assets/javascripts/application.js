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

function Mapa() {
	this.initialized = false
	this.map = null
	this.mapOptions = {
		zoom: 17,
		center: new google.maps.LatLng(-22.0059848, -47.8931638),
	}
	this.realties = new Array()
	this.descriptions = new Array()

	this.realtyClusterer = null
	this.descriptionClusterer = null

	// flag que diz se o usuario está adicionando uma nova descricão
	this.addingDescription = false
	// posicao em que a nova descrição será adicionada
	this.newDescriptionPosition = null
}

// Cria o objeto mapa
var mapa = new Mapa()

// Funcao que atualiza os markers sendo mostrado no momento, de acordo com os filtros ativos
Mapa.prototype.refresh = function() {
	// funcao que cria o marker dos imoveis
	function createRealtyMarker(realty) {
		var marker = new google.maps.Marker({
			position: new google.maps.LatLng(realty['latitude'], realty['longitude']),
			title: realty['address'],
			icon: 'moradiaicon.png'
		});

		google.maps.event.addListener(marker, 'click', function() {
			$.get(
				'realties/' + realty['id'],
				{ },
				function(data) {
					$('#info').html(data);
				}
			);
		});

		return marker;
	}

	// funcao que filtra os imoveis
	function filterRealty(realty) {
		if (!document.getElementById('imoveis').checked) {
			return false;
		}

		if (!realty.price) {
			return false;
		}

		return true;
	}

	// funcao que cria o marker das descricoes
	function createDescriptionMarker(desc) {
		var marker = new google.maps.Marker({
			position: new google.maps.LatLng(desc['latitude'], desc['longitude']),
			icon: 'info-1.png'
		});

		google.maps.event.addListener(marker, 'click', function() {
			$.get(
				'markers/' + desc['id'],
				{ },
				function(data) {
					$('#info').html(data);
				}
			);
		});

		return marker
	}

	// funcao que filtra as descricoes
	function filterDescription(desc) {
		if (!document.getElementById('descricoes').checked) {
			return false;
		}

		return true;
	}

	if (this.realtyClusterer) {
		var markers = this.realties.filter(filterRealty).map(createRealtyMarker);
		this.realtyClusterer.clearMarkers();
		this.realtyClusterer.addMarkers(markers);
	} else {
		var markers = this.realties.filter(filterRealty).map(createRealtyMarker);
		this.realtyClusterer = new MarkerClusterer(this.map, markers, 
			{imagePath: '/moradiacluster'}
		);
	}

	if (this.descriptionClusterer) {
		var markers = this.descriptions.filter(filterDescription).map(createDescriptionMarker);
		this.descriptionClusterer.clearMarkers();
		this.descriptionClusterer.addMarkers(markers);
	} else {
		var markers = this.descriptions.filter(filterDescription).map(createDescriptionMarker);
		this.descriptionClusterer = new MarkerClusterer(this.map, markers,
			// {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'}
			{imagePath: '/infocluster'}
		);
	}
}

// Funcao que requisita as moradias do servidor
Mapa.prototype.updateRealties = function() {
	console.log('Requisitando moradias...')

	$.get(
		'realties.json',
		{},
		function(data) {
			mapa.realties = data
			mapa.refresh();

			console.log('Recebeu as moradias')
		}
	);
}

// Funcao que requisita as descricoes do servidor
Mapa.prototype.updateDescriptions = function() {
	// requisita as descricoes do servidor
	console.log('Requisitando as descricoes...')
	$.get(
		'markers.json',
		{},
		function(data) {
			mapa.descriptions = data
			mapa.refresh();

			console.log('Recebeu as descricoes')
		}
	);
}

// Funcao que inicializa o mapa
Mapa.prototype.initialize = function(map) {
	if (this.initialized) {
		console.log('Mapa ja foi inicializado.')
		return
	}

	// inicializa o google maps
	this.map = new google.maps.Map(map, this.mapOptions)
	this.initialized = true

	// evento on click
	this.map.addListener('click', function(e) {
		if (mapa.addingDescription) {
			mapa.newDescriptionPosition = e.latLng;

			$('#info').html('\
				  Descricão:<br><textarea id="descricao"></textarea><br>\
				  <button type="button" onclick="mapa.createDescription()")">Salvar</button>\
				  <button type="button" onclick="mapa.cancelNewDescription()">Cancelar</button>\
			');

			mapa.addingDescription = false;
		}
	})

	this.updateRealties();
	this.updateDescriptions();
}

Mapa.prototype.addDescription = function() {
	this.addingDescription = true;
}

Mapa.prototype.createDescription = function() {
	if (this.newDescriptionPosition) {
		var description = document.getElementById('descricao').value;

		$.post(
			'/markers',

			{
				'marker': {
					latitude: this.newDescriptionPosition.lat(),
					longitude: this.newDescriptionPosition.lng(),
					description: description
				}
			},

			function(data) {
				$('#info').html(data);
				mapa.updateDescriptions();
			}
		);

		this.newDescriptionPosition = null
	}
}

Mapa.prototype.cancelNewDescription = function() {
	$('#info').html('Clique em um marker para ver informações sobre ele');
}

document.addEventListener("turbolinks:load", function() {
	var map = document.getElementById('map');
	if (map) {
		mapa.initialize(document.getElementById('map'))
	}
});
