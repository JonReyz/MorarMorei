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

// Funcao que nao deixa os sliders representarem um intervalo invalido
Mapa.prototype.minPriceChanged = function() {
	var min_price = document.getElementById('min_price')
	var max_price = document.getElementById('max_price')
	document.getElementById('min_price_label').innerHTML = 'Preço mínimo: R$' + min_price.value;
	if (Number(max_price.value) < Number(min_price.value)) {
		max_price.value = min_price.value
		this.maxPriceChanged()
	} else {
		this.refresh()
	}
}

Mapa.prototype.maxPriceChanged = function() {
	var min_price = document.getElementById('min_price')
	var max_price = document.getElementById('max_price')
	document.getElementById('max_price_label').innerHTML = 'Preço máximo: R$' + max_price.value;
	if (Number(min_price.value) > Number(max_price.value)) {
		min_price.value = max_price.value
		this.minPriceChanged()
	} else {
		this.refresh()
	}
}

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

		var minPrice = document.getElementById('min_price').value;
		var maxPrice = document.getElementById('max_price').value;

		if (Number(realty.price) < minPrice || Number(realty.price) > maxPrice) {
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

	markUSP1(this.map);
	markUSP2(this.map)
	markUFSCAR(this.map);
	markIFSP(this.map);
	markRodov(this.map);
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

function markUSP1(map){
	var p1 = new google.maps.LatLng(-22.002538, -47.900000);
	var p2 = new google.maps.LatLng(-22.002280, -47.899356);
	var p3 = new google.maps.LatLng(-22.003871, -47.896180);
	var p4 = new google.maps.LatLng(-22.005781, -47.896116);
	var p5 = new google.maps.LatLng(-22.007969, -47.891975);
	var p6 = new google.maps.LatLng(-22.011439, -47.891869);
	var p7 = new google.maps.LatLng(-22.011420, -47.896863);
	var p8 = new google.maps.LatLng(-22.004409, -47.900767);
	var p9 = new google.maps.LatLng(-22.003638, -47.900241);
	var p10 = new google.maps.LatLng(-22.004977, -47.900617);
	var p11 = new google.maps.LatLng(-22.006598, -47.899168);
	var p12 = new google.maps.LatLng(-22.007533, -47.899276);
	var p13 = new google.maps.LatLng(-22.010338, -47.896915);
	var p14 = new google.maps.LatLng(-22.007948, -47.895897);
	var p15 = new google.maps.LatLng(-22.011439, -47.895851);
	
	var flightPathUSP1 = new google.maps.Polygon({
		path: [p1,p2,p3,p4,p5,p14,p15,p7,p13,p12,p11,p10,p8,p9],
		strokeColor: "#FFFF00",
		strokeOpacity: 0.8,
		strokeWeight: 2,
		fillColor: "#FFFF00",
		fillOpacity: 0.4
	});
	flightPathUSP1.setMap(map);
	
	
	var mat1 = new google.maps.LatLng(-22.006206, -47.895236);
	var mat2 = new google.maps.LatLng(-22.006225, -47.895195);
	var mat3 = new google.maps.LatLng(-22.006264, -47.895225);
	var mat4 = new google.maps.LatLng(-22.006251, -47.895264);
	
	var flightPathMat = new google.maps.Polygon({
		path: [mat1,mat2,mat3,mat4],
		strokeColor: "#FF0000",
		strokeOpacity: 0.8,
		strokeWeight: 2,
		fillColor: "#FF0000",
		fillOpacity: 0.4
	});
	flightPathMat.setMap(map);
}

function markUSP2(map){
	var p1 = new google.maps.LatLng(-22.000715, -47.929290);
	var p2 = new google.maps.LatLng(-22.001119, -47.928550);
	var p3 = new google.maps.LatLng(-22.002910, -47.927868);
	var p4 = new google.maps.LatLng(-22.007529, -47.931399);
	var p5 = new google.maps.LatLng(-22.006640, -47.933195);
	var p6 = new google.maps.LatLng(-22.004628, -47.935575);
	var p7 = new google.maps.LatLng(-22.003144, -47.935602);
	var p8 = new google.maps.LatLng(-21.999988, -47.934324);
	var p9 = new google.maps.LatLng(-21.996720, -47.934261);
	var p10 = new google.maps.LatLng(-21.999325, -47.930100);
	var p11 = new google.maps.LatLng(-22.000492, -47.929870);
	
	var flightPathUSP2 = new google.maps.Polygon({
		path: [p1,p2,p3,p4,p5,p6,p7,p8,p9,p10,p11],
		strokeColor: "#FFFF00",
		strokeOpacity: 0.8,
		strokeWeight: 2,
		fillColor: "#FFFF00",
		fillOpacity: 0.4
	});
	flightPathUSP2.setMap(map);
	
	var pos = new google.maps.LatLng(-22.005264, -47.893702);
	google.maps.event.addListener(flightPathUSP2, 'click', function() {
		addInfo(map);
	});	
}

function markUFSCAR(map){
	var f1 = new google.maps.LatLng(-21.988063, -47.876934);
	var f2 = new google.maps.LatLng(-21.981110, -47.876202);
	var f3 = new google.maps.LatLng(-21.980984, -47.877342);
	var f4 = new google.maps.LatLng(-21.978729, -47.876467);
	var f5 = new google.maps.LatLng(-21.976083, -47.882623);
	var f6 = new google.maps.LatLng(-21.979481, -47.883817);
	var f7 = new google.maps.LatLng(-21.980095, -47.885675);
	var f8 = new google.maps.LatLng(-21.986624, -47.884281);
	var f9 = new google.maps.LatLng(-21.989088, -47.884978);
	var f10 = new google.maps.LatLng(-21.989874, -47.884778);
	var f11 = new google.maps.LatLng(-21.990831, -47.883341);
	var f12 = new google.maps.LatLng(-21.990667, -47.881991);
	var f13 = new google.maps.LatLng(-21.988516, -47.878426);
	
	var flightPathUFSCAR = new google.maps.Polygon({
		path: [f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f11,f12,f13],
		strokeColor: "#FF0000",
		strokeOpacity: 0.8,
		strokeWeight: 2,
		fillColor: "#FF0000",
		fillOpacity: 0.4
	});
	flightPathUFSCAR.setMap(map);
}

function markIFSP(map){
	var ifsp1 = new google.maps.LatLng(-21.971157, -47.878597);
	var ifsp2 = new google.maps.LatLng(-21.970278, -47.879511);
	var ifsp3 = new google.maps.LatLng(-21.968735, -47.878217);
	var ifsp4 = new google.maps.LatLng(-21.969273, -47.877561);
	var ifsp5 = new google.maps.LatLng(-21.968861, -47.877253);
	var ifsp6 = new google.maps.LatLng(-21.968062, -47.877938);
	var ifsp7 = new google.maps.LatLng(-21.965659, -47.877842);
	var ifsp8 = new google.maps.LatLng(-21.966624, -47.876534);
	var ifsp9 = new google.maps.LatLng(-21.968347, -47.876601);
	
	var flightPathIFSP = new google.maps.Polygon({
		path: [ifsp1,ifsp2,ifsp3,ifsp4,ifsp5,ifsp6,ifsp7,ifsp8,ifsp9],
		strokeColor: "#00FF00",
		strokeOpacity: 0.8,
		strokeWeight: 2,
		fillColor: "#00FF00",
		fillOpacity: 0.4
	});
	flightPathIFSP.setMap(map);
}

function markRodov(map){
	var r1 = new google.maps.LatLng(-22.005097, -47.889951);
	var r2 = new google.maps.LatLng(-22.005077, -47.889116);
	var r3 = new google.maps.LatLng(-22.005917, -47.889080);
	var r4 = new google.maps.LatLng(-22.005913, -47.889928);
	
	var flightPathRodov = new google.maps.Polygon({
		path: [r1,r2,r3,r4],
		strokeColor: "#0000FF",
		strokeOpacity: 0.8,
		strokeWeight: 2,
		fillColor: "#0000FF",
		fillOpacity: 0.4
	});
	flightPathRodov.setMap(map);
}

function addInfo(map){
	info = new google.maps.Marker({
		map: map,
		animation: google.maps.Animation.DROP,
		position: new google.maps.LatLng(-22.001591, -47.931772),
		icon: 'https://i.imgur.com/k9IepaU.png'
	});
	
	var infowindow = new google.maps.InfoWindow({
		content: 'Estudantes podem fazer o percurso entre os campi da USP 					utilizando os ônibus disponibilizados pela universidade <a 		target="_blank"			href="http://www.puspsc.usp.br/horario-de-onibus-areas-1-e-					2/" </a><br/> Horários'
	});
	var pos = new google.maps.LatLng(-22.001591, -47.931772);
	google.maps.event.addListener(info,'click',function() {
		infowindow.open(map,info);
	});
		
}
