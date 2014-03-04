
// -----------Golbal variable-----------
var map, geocoder,_lat,_lng, last_lat = 25.0366641, last_lng = 121.5499766;
var marker={},info={}; var taipei = new google.maps.LatLng(25.0366641,121.5499766);

var global_district;
var markerCluster;
var isfirst = true;
var minZoomLevel = 10;
var maxZoomLevel = 15;
var now_range = 0.05;
// -----------Golbal variable-----------
// $(document).ready(function() { initialize('hospital'); });
window.onload=initialize('hospital');

var type;
function initialize(classfication){ 
	// var type;
	geocoder = new google.maps.Geocoder();  
	var mapOptions = {
		zoom: 13,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		maxZoom: 15
	};
	map = new google.maps.Map(document.getElementById("section_for_googlemap"),mapOptions);
	if(classfication=="clinic")
		type="clinic";
	else
		type="hospital";
	map.setCenter(taipei);

	ajaxGetJson(map,25.0366641,121.5499766, type, false);
	getCurrentPosition(true, type);

	/* limit the minimum zoom */
	google.maps.event.addListener(map, 'zoom_changed', function(){
		if(map.getZoom() < minZoomLevel)
			map.setZoom(minZoomLevel);
		if(map.getZoom() > maxZoomLevel)
			map.setZoom(maxZoomLevel);


	});
}



// for controller to initial a map
function after_select_init(){
	geocoder = new google.maps.Geocoder();  
	var mapOptions = {
		//center: latlng, 
		zoom: 12,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		maxZoom: 15
	};
	map = new google.maps.Map(document.getElementById("section_for_googlemap"),mapOptions);

	/* limit the minimum zoom */
	google.maps.event.addListener(map, 'zoom_changed', function(){
		if(map.getZoom() < minZoomLevel)
			map.setZoom(minZoomLevel);
		if(map.getZoom() > maxZoomLevel)
			map.setZoom(maxZoomLevel);
	});

	return map;

}

function getCurrentPosition(init,type){
	if(navigator.geolocation) {
		browserSupportFlag = true;
		navigator.geolocation.getCurrentPosition(function(position) {
			_lat=position.coords.latitude;
			_lng=position.coords.longitude;
			last_lat = _lat;
			last_lng = _lng;
			// 基隆
			// _lat = 25.128531;
			// _lng = 121.751905;

			initialLocation = new google.maps.LatLng(_lat,_lng);
			map.setCenter(initialLocation);
			console.log('getCUrrrentPosition');
			console.log("initial lat: " +_lat);
			console.log("initial lng: " +_lng);
			if(init)
				ajaxGetJson(map,_lat,_lng,type, false);
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
			ajaxGetJson(map,_lat,_lng,type, true);
		alert("Set location to Taipei");


	}
}


function addMarker(map, locationName, lat, lng, tele, count){
	var after_drag = false;
	var latlng = new google.maps.LatLng(lat,lng);
	marker[count] = new google.maps.Marker({
		position:latlng,
		title: locationName
	});

	// 新增InfoWindow
	var infowindow = new google.maps.InfoWindow(); 
	info[count] = infowindow;
	/*InfoWindow的內容，可用Html語法*/
	infowindow.setContent("名稱："+locationName+"</br>"+"電話："+tele);

	/*在Marker click時，顯示InfoWindow：*/
	google.maps.event.addListener(marker[count], 'click', function() {
			//先清除其他marker
			for(var i=0; i<Object.size(marker); i++)
				info[i].close();
			//open
			infowindow.open(map, marker[count]);
		});
	google.maps.event.addListener(marker[count],"mouseover",function()
	{
		for(var i=0; i<Object.size(marker); i++)
			info[i].close();
			//open
			infowindow.open(map, marker[count]);
		});

	google.maps.event.addListener(marker[count],"mouseout",function()
	{
		for(var i=0; i<Object.size(marker); i++)
			info[i].close();
	});
}


Object.size = function(obj) {
	var size = 0, key;
	for (key in obj) {
		if (obj.hasOwnProperty(key)) size++;
	}
	return size;
};

function ajaxGetJson(map,lat,lng,classfication, removeCluster){
	var obj = {"lat":lat,"lng":lng,"class":classfication};
	$.ajax({     
		url: "./php/getAddress.php",     
		type: "POST",     
		dataType: "json",
		data: obj,
		success: function(data) {
			console.log(data);
			if(removeCluster){
				removeMarkers();
				unsetCluster();
			}
			for( var i=0; i<data.length; i++){
				addMarker(map,data[i]['name'],data[i]['lat'],data[i]['lng'],data[i]['tele'],i);
			}

			google.maps.event.addListener(map,"dragend",function(){
				console.log("drag: range: " + now_range);
				console.log("last lat : " + last_lat);
				console.log("map.getCenter().lat() : " + map.getCenter().lat());
				console.log(Math.abs(last_lat - map.getCenter().lat()));
				if(Math.abs(last_lat - map.getCenter().lat()) > 0.05 || Math.abs(last_lng - map.getCenter().lng()) > 0.05 ){
						// console.log("call Nearby");
						last_lat = map.getCenter().lat();
						last_lng = map.getCenter().lng();
						getNearby(map, map.getCenter().lat(), map.getCenter().lng(), type, now_range);	
					}
				});
			google.maps.event.addListener(map, "zoom_changed", function(){
				console.log("now zoom: "+map.getZoom());
				if(map.getZoom() <= minZoomLevel)
					return;
					// alert("got Nearby");
					switch(map.getZoom()){
						case 8: now_range = 2; break;
						case 9: now_range = 1; break;
						case 10: now_range = 0.5; break;
						case 11: now_range = 0.2; break;
						case 12: now_range = 0.1; break;
						case 13: now_range = 0.05; break;
						default: now_range = 0.02; break;
					}
					console.log("now_range :" +now_range);
					getNearby(map, map.getCenter().lat(), map.getCenter().lng(), type, now_range);
				});
			clusterMarkers(map,50, 15);
			global_district = data[0]['district'];
			global_city = data[0]['city'];
			console.log("initial~ district: " + global_district);
			console.log("initial~ city: " + global_city);
		},
		error: function(data){
			console.log("ajax error");
		} 
	});
}

function getNearby(map, lat, lng, classfication, range){
	var obj = {"lat":lat,"lng":lng,"class":classfication, "range": range};
	console.log(obj);
	$.ajax({     
		url: "./php/getNearby.php",     
		type: "GET",
		dataType: "json",
		data: obj,
		success: function(data) {
				// handler for when result is empty array
				if(data.length != 0){
					global_district = data[0]['district'];
					global_city = data[0]['city'];
					removeMarkers();
					unsetCluster();
					for( var i=0; i<data.length; i++){
						addMarker(map,data[i]['name'],data[i]['lat'],data[i]['lng'],data[i]['tele'],i);
					}
					clusterMarkers(map,50, 15);
				}
			},
			error: function(data){
				console.log("ajax error");
				console.log(data);
			} 
		});
}


function removeMarkers() {
	for(var i=0; i< Object.size(marker); i++)
		marker[i].setMap(null);
	marker = [];
}
function unsetCluster() {
	markerCluster.clearMarkers();
}
function clusterMarkers(map,gridsize, zoom) {
	zoom = 20;
	var mcOptions = {gridSize: gridsize, maxZoom: zoom, zoomOnClick: false};
	markerCluster = new MarkerClusterer(map, marker, mcOptions);
}
function getInitialDistrict() {
	return global_district;
}
function getInitialCity() {
	return global_city;
}
function getInitialLat() {
	return _lat;
}
function getInitialLng() {
	return _lng;
}


