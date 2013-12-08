
// -----------Golbal variable-----------
var map, geocoder,_lat,_lng;
var marker={},info={}; 
var taipei = new google.maps.LatLng(25.0366641,121.5499766);
var global_district;
var markerCluster;
// -----------Golbal variable-----------
//$(document).ready(function() { initialize(); });
window.onload=initialize();
function initialize(classfication){ 
	var type;
	geocoder = new google.maps.Geocoder();  
	var mapOptions = {
		zoom: 11,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	map = new google.maps.Map(document.getElementById("section_for_googlemap"),mapOptions);
	if(classfication=='clinic')
		type='clinic';
	else
		type="hospital";
	getCurrentPosition(true,type);
}

// for controller to initial a map
function after_select_init(){
	geocoder = new google.maps.Geocoder();  
	//var latlng = new google.maps.LatLng(24.078213, 120.537869);
	var mapOptions = {
		//center: latlng, 
		zoom: 12,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	map = new google.maps.Map(document.getElementById("section_for_googlemap"),mapOptions);
	return map;

}

function getCurrentPosition(init,type){
	if(navigator.geolocation) {
		browserSupportFlag = true;
		navigator.geolocation.getCurrentPosition(function(position) {
			_lat=position.coords.latitude;
			_lng=position.coords.longitude;
			initialLocation = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
			map.setCenter(initialLocation);
			console.log('getCUrrrentPosition');
			console.log("initial lat: " +_lat);
			console.log("initial lng: " +_lng);
			if(init)
				ajaxGetJson(map,_lat,_lng,type);
		}, function() {
			console.log("%s",browserSupportFlag);
			handleNoGeolocation(browserSupportFlag);
		});	
	}
	// Browser doesn't support Geolocation
	else {
		browserSupportFlag = false;
		handleNoGeolocation(browserSupportFlag);
	}
	function handleNoGeolocation(errorFlag) {
		if (errorFlag == true)
			alert("地圖定位失敗");
		else 
			alert("您的瀏覽器不支援定位服務");
		// alert("set location to Taipei");
		initialLocation = taipei;
		map.setCenter(initialLocation);
		// Taipei
		_lat=25.0366641;
		_lng=121.5499766;
		if(init)
			ajaxGetJson(map,_lat,_lng,type);
		alert("Set location to Taipei");


	}
}


function addMarker(map,locationName,lat,lng,tele,count){
	console.log("addMarker");
	var latlng = new google.maps.LatLng(lat,lng);
	marker[count] = new google.maps.Marker({
		// map:map,
		position:latlng,
		title: locationName
	});
	// marker.setMap(map);
	// marker.setMap(null);
	// 新增InfoWindow：
	var infowindow = new google.maps.InfoWindow();    //初始一個物件
	info[count] = infowindow;
	infowindow.setContent("名稱："+locationName+"</br>"+"電話："+tele);    //InfoWindow的內容，可用Html語法

		// 在Marker click時，顯示InfoWindow：
		google.maps.event.addListener(marker[count], 'click', function() {
			//先清除其他marker
			for(var i=0; i<Object.size(marker); i++)
				info[i].close();
			//open
			infowindow.open(map, marker[count]);
		});
	}


	Object.size = function(obj) {
		var size = 0, key;
		for (key in obj) {
			if (obj.hasOwnProperty(key)) size++;
		}
		return size;
	};

	function ajaxGetJson(map,lat,lng,classfication){
		// var classfication = 'hospital';
		var obj = {"lat":lat,"lng":lng,"class":classfication};
		$.ajax({     
			url: "./php/getAddress.php",     
			type: "POST",     
			dataType: "json",
			data: obj,
			success: function(data) {
				// console.log(data);
				removeMarkers();
				// unsetCluster(markerCluster);
				for( var i=0; i<data.length; i++){
					addMarker(map,data[i]['name'],data[i]['lat'],data[i]['lng'],data[i]['tele'],i);
				}
				clusterMarkers(30, 13);
				// clustering markers
				// var mcOptions = {gridSize: 30, maxZoom: 13};
				// var markerCluster = new MarkerClusterer(map, marker, mcOptions);
				global_district = data[0]['district'];
				global_city = data[0]['city'];
				console.log("initial~ district: " + global_district);
				console.log("initial~ city: " + global_city);
			},
			error: function(){
				alert("ajax error");
			} 
		});
	}

	function clusterMarkers(gridsize, zoom){
		var mcOptions = {gridSize: gridsize, maxZoom: zoom};
		markerCluster = new MarkerClusterer(map, marker, mcOptions);
	}

	function removeMarkers(){
		for(var i=0; i< Object.size(marker); i++)
			marker[i].setMap(null);
		marker = [];
	}
	function unsetCluster(){
		markerCluster.clearMarkers();
	}


	function getInitialDistrict(){
		return global_district;
	}
	function getInitialCity(){
		return global_city;
	}
	function getInitialLat(){
		return _lat;
	}
	function getInitialLng(){
		return _lng;
	}


