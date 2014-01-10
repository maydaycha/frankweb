
// -----------Golbal variable-----------
var map, geocoder,_lat,_lng;
var marker={},info={}; var taipei = new google.maps.LatLng(25.0366641,121.5499766);

var global_district;
var markerCluster;
var isfirst = true;
var minZoomLevel = 5;
// -----------Golbal variable-----------
// $(document).ready(function() { initialize('hospital'); });
window.onload=initialize('hospital');

var type;
function initialize(classfication){ 
	// var type;
	geocoder = new google.maps.Geocoder();  
	var mapOptions = {
		zoom: 11,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	map = new google.maps.Map(document.getElementById("section_for_googlemap"),mapOptions);
	if(classfication=="clinic")
		type="clinic";
	else
		type="hospital";
	map.setCenter(taipei);
	ajaxGetJson_1(map,25.0366641,121.5499766,type);
	getCurrentPosition(true,type);

	/* limit the minimum zoom */
	google.maps.event.addListener(map, 'zoom_changed', function(){
		if(map.getZoom() < minZoomLevel)
			map.setZoom(minZoomLevel);
	});
}



// for controller to initial a map
function after_select_init(){
	geocoder = new google.maps.Geocoder();  
	var mapOptions = {
		//center: latlng, 
		zoom: 12,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	map = new google.maps.Map(document.getElementById("section_for_googlemap"),mapOptions);

	/* limit the minimum zoom */
	google.maps.event.addListener(map, 'zoom_changed', function(){
		if(map.getZoom() < minZoomLevel)
			map.setZoom(minZoomLevel);
	});

	return map;

}

function getCurrentPosition(init,type){
	if(navigator.geolocation) {
		browserSupportFlag = true;
		navigator.geolocation.getCurrentPosition(function(position) {
			_lat=position.coords.latitude;
			_lng=position.coords.longitude;
			// 基隆
			// _lat = 25.128531;
			// _lng = 121.751905;

			initialLocation = new google.maps.LatLng(_lat,_lng);
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
	var after_drag = false;
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
				// if(!isfirst){
					unsetCluster();
					// isfirst = false;
				// }
				for( var i=0; i<data.length; i++){
					addMarker(map,data[i]['name'],data[i]['lat'],data[i]['lng'],data[i]['tele'],i);
				}

				google.maps.event.addListener(map,"dragend",function()
				{
					console.log(map.getCenter().lat());
					console.log(map.getCenter().lng());
					ajaxGetJson(map, map.getCenter().lat(), map.getCenter().lng(), type);

				});
				clusterMarkers(map,50, 15);
				global_district = data[0]['district'];
				global_city = data[0]['city'];
				console.log("initial~ district: " + global_district);
				console.log("initial~ city: " + global_city);
			},
			error: function(){
				console.log("ajax error");
			} 
		});
	}

	function ajaxGetJson_1(map,lat,lng,classfication){
		// var classfication = 'hospital';
		var obj = {"lat":lat,"lng":lng,"class":classfication};
		$.ajax({     
			url: "./php/getAddress.php",     
			type: "POST",     
			dataType: "json",
			data: obj,
			success: function(data) {
				// console.log(data);
				// removeMarkers();
				// if(!isfirst){
					// unsetCluster();
					// isfirst = false;
				// }
				for( var i=0; i<data.length; i++){
					addMarker(map,data[i]['name'],data[i]['lat'],data[i]['lng'],data[i]['tele'],i);
				}
				google.maps.event.addListener(map,"dragend",function()
				{
					console.log(map.getCenter().lat());
					console.log(map.getCenter().lng());
					ajaxGetJson(map, map.getCenter().lat(), map.getCenter().lng(), type);

				});
				clusterMarkers(map,50, 15);
				global_district = data[0]['district'];
				global_city = data[0]['city'];
				console.log("initial~ district: " + global_district);
				console.log("initial~ city: " + global_city);
			},
			error: function(){
				console.log("ajax1 error")
			} 
		});
	}


	function removeMarkers(){
		for(var i=0; i< Object.size(marker); i++)
			marker[i].setMap(null);
		marker = [];
	}
	function unsetCluster(){
		markerCluster.clearMarkers();
	}
	function clusterMarkers(map,gridsize, zoom){
		var mcOptions = {gridSize: gridsize, maxZoom: zoom};
		markerCluster = new MarkerClusterer(map, marker, mcOptions);
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


