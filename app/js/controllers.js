'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
controller('MyCtrl1', ['$scope','$http','$window',function($scope,$http,$window) {

	$scope.district = "";
	$scope.departs = [
	{'name':'不分科'},
	{'name':'眼科'},
	{'name':'耳鼻喉科'},		
	{'name':'小兒科'},
	{'name':'婦產科'},
	{'name':'復健科'}
	];
	$scope.depart = $scope.departs[0];
	$scope.afterserchDistrict = false;
	

	var now_classfication = 'hospital';
	// 基隆市
	$http.get('data/jilong.json').success(function(data){
		$scope.jilongshis = data;
		console.log("jilong~");
		console.log($scope.jilongshis);
	})
	//台北市
	$http.get('data/taibeishi.json').success(function(data){
		$scope.taipeishis = data;
		console.log($scope.taipeishis);
	});
	//新北市
	$http.get('data/xinbeishi.json').success(function(data){
		$scope.xinbeishis = data;
		console.log($scope.xinbeishis);
	});
	// 桃園縣
	$http.get('data/taoyuan.json').success(function(data){
		$scope.taoyuans = data;
		console.log($scope.taoyuans);
	});
	// 新竹縣
	$http.get('data/xinzhuxian.json').success(function(data){
		$scope.xinzhuxians = data;
		console.log($scope.xinzhuxians);
	});
	// 新竹市
	$http.get('data/xinzhushi.json').success(function(data){
		$scope.xinzhushis = data;
		console.log($scope.xinzhushis);
	});
	// 苗栗縣
	$http.get('data/miaoli.json').success(function(data){
		$scope.miaolis = data;
		console.log($scope.miaolis);
	});
	// 台中市
	$http.get('data/taizhongshi.json').success(function(data){
		$scope.taizhongshis = data;
		console.log($scope.taizhongshis);
	});
	// 彰化縣
	$http.get('data/zhanghua.json').success(function(data){
		$scope.zhanghuas = data;
		console.log($scope.zhanghuas);
	});
	// 雲林縣
	$http.get('data/yunlin.json').success(function(data){
		$scope.yunlins = data;
		console.log($scope.yunlins);
	});
	// 嘉義縣
	$http.get('data/jiayi.json').success(function(data){
		$scope.jiayis = data;
		console.log($scope.jiayis);
	});
	// 台南市
	$http.get('data/tainan.json').success(function(data){
		$scope.tainans = data;
		console.log($scope.tainans);
	});
	// 高雄市
	$http.get('data/gaoxiong.json').success(function(data){
		$scope.gaoxiongs = data;
		console.log($scope.gaoxiongs);
	});
	// 屏東縣
	$http.get('data/pingdong.json').success(function(data){
		$scope.pingdongs = data;
		console.log($scope.pingdongs);
	});
	// 宜蘭縣
	$http.get('data/yilan.json').success(function(data){
		$scope.yilans = data;
		console.log($scope.yilans);
	});
	// 花蓮縣
	$http.get('data/hualian.json').success(function(data){
		$scope.hualians = data;
		console.log($scope.hualians);
	});
	// 臺東縣
	$http.get('data/taidong.json').success(function(data){
		$scope.taidongs = data;
		console.log($scope.taidongs);
	});
	// 澎湖縣
	$http.get('data/penghu.json').success(function(data){
		$scope.penghus = data;
		console.log($scope.penghus);
	});
	// 金門縣
	$http.get('data/jinmen.json').success(function(data){
		$scope.jinmens = data;
		console.log($scope.jinmens);
	});
	// 連江縣
	$http.get('data/lianjiang.json').success(function(data){
		$scope.lianjiangs = data;
		console.log($scope.lianjiangs);
	});

	$http({
		method: "POST",
		url: "./php/getArticle.php"
	}).
	success(function(data){
		// alert("getArticle success");
		console.log("article");
		console.log(data);
		console.log(data.length);
		var i = data.length-1;
		// $scope.articles = data;

		$scope.title1 = data[i-1].title;
		$scope.content1 = data[i-1].content;
		$scope.date1 = data[i-1].date;
		$scope.title2 = data[i-2].title;
		$scope.content2 = data[i-2].content;
		$scope.date2 = data[i-2].date;
		$scope.title3 = data[i-3].title;
		$scope.content3 = data[i-3].content;
		$scope.date3 = data[i-3].date;
		$scope.title4 = data[i-4].title;
		$scope.content4 = data[i-4].content;
		$scope.date4 = data[i-4].date;
	}).
	error(function(){
		alert("getArticle error");
	});

	// 還沒做完， 醫院列表用， 但是診所超多真的要全部列出！？
	/*$scope.listAllclinic = function(cityname){
		$http({
			method: "POST",
			url: "./php/getAllClinic.php",
			data: $.param({
				"city" : cityname
			}),
			headers: {'Content-type': 'application/x-www-form-urlencoded'}
		}).
		success(function(data){
			$scope.

		})
}*/
	// 還沒做完， 醫院列表用， 但是診所超多真的要全部列出！？


	$scope.change_color = function(){
		$scope.color = $("#header").css("background-color");
		if($scope.color=="rgba(21, 104, 209, 0.611765)")
			$("#header").css("background-color","#FF6633");
		else
			$("#header").css("background-color","rgba(21, 104, 209, 0.611765)");

	}
	// 左邊地點清單
	$scope.location_display = function(locationId){
		var locationArray = [['jilong','基隆市'],
		['taipei','台北市'],['newtaipei','新北市'],['taoyuan','桃園縣'],['xinzhuxian','新竹縣'],
		['xinzhushi','新竹市'],['miaoli','苗栗縣'],['taichung','台中市'],['zhanghua','彰化縣'],
		['yunlin','雲林縣'],['jiayi','嘉義縣'],['tainan','台南市'],['gaoxiong','高雄市'],
		['pingdong','屏東縣'],['yilan','宜蘭縣'],['hualian','花蓮縣'],['taidong','台東縣'],
		['penghu','澎湖縣'],['jinmen','金門縣'],['lianjiang','連江縣']
		];
		console.log(locationId);
		var j = -1;
		for(var i=0;i<locationArray.length; i++){
			if(locationId==locationArray[i][0]){
				j=i;
				break;
			}
		}
		if($("#"+locationId).css("display")!="none"){
			$("#"+locationId).css("display","none");
			$("#"+locationArray[j][0]+"-button").html("+"+locationArray[j][1]);
		}
		else{
			$("#"+locationId).css("display","block");
			$("#"+locationArray[j][0]+"-button").html("-"+locationArray[j][1]);
		}
	}

	$scope.change_seach_condition = function(classfication){
		// alert(getInitialDistrict());
		$scope.district = getInitialDistrict();
		$scope.city = getInitialCity();
		$scope.igetInitialCity
		initialize(classfication);
		removeMarkers();

		if(classfication=="hospital"){
			$(".select-location-class-hospital").css("background-color","#9B9797");
			$(".select-location-class-clinic").css("background-color","#ffffff");
			now_classfication = "hospital";
		}
		else{
			$(".select-location-class-hospital").css("background-color","#ffffff");
			$(".select-location-class-clinic").css("background-color","#9B9797");
			$("#selectDepart").css('display', 'block');
			now_classfication = "clinic";
		}


	}

  	//在點選“區” 的分類， 變更google map
  	$scope.serchDistrict = function(districtId,locationNum,city){
  		var lat,lng,cityName;
  		// call google_map.js
  		$scope.city = city;
  		$scope.afterserchDistrict = true;
  		var map = after_select_init();
  		console.log("districtId: "+districtId);
  		console.log("locationNum: " + locationNum);
  		switch(locationNum){
  			case '-1':
  			cityName = $scope.jilongshis;
  			break;
  			case '0': 
  			cityName = $scope.taipeishis; 
  			break;  
  			case '1': 
  			cityName = $scope.xinbeishis; 
  			break;  
  			case '2':  
  			cityName = $scope.taoyuans;  
  			break;  
  			case '3':  
  			cityName = $scope.xinzhuxians; 
  			break;  
  			case '4':
  			cityName = $scope.xinzhushis;
  			break;  
  			case '5': 
  			cityName = $scope.miaolis;  
  			break;  
  			case '6': 
  			cityName = $scope.taizhongshis; 
  			break;  
  			case '7':  
  			cityName = $scope.zhanghuas; 
  			break;  
  			case '8': 
  			cityName = $scope.yunlins;  
  			break;  
  			case '9': 
  			cityName = $scope.jiayis; 
  			break;  
  			case '10': 
  			cityName = $scope.tainans;  
  			break;  
  			case '11':  
  			cityName = $scope.gaoxiongs;  
  			break;  
  			case '12':  
  			cityName = $scope.pingdongs; 
  			break;  
  			case '13':  
  			cityName = $scope.yilans;  
  			break;  
  			case '14':  
  			cityName = $scope.hualians; 
  			break;  
  			case '15':  
  			cityName = $scope.taidongs;  
  			break;  
  			case '16': 
  			cityName = $scope.penghus;  
  			break;  
  			case '17': 
  			cityName = $scope.jinmens; 
  			break;  
  			case '18': 
  			cityName = $scope.lianjiangs;  
  			break;
  		}
  		for(var i=0; i<cityName.length; i++){
  			if(districtId==cityName[i].english){
  				$scope.district = cityName[i].chinese;
  				break;
  			}
  		}
  		console.log("!!!city:");
  		console.log($scope.city);
  		console.log("district: " +$scope.district);
  		console.log("depart: " +$scope.depart.name);

  		if($scope.depart.name == "不分科"){
  			var dataJson = $.param({
  				"city" : $scope.city,
  				"district": $scope.district,
  				"classfication": now_classfication,
  				"depart": "all"
  			});
  		}
  		else{
  			var dataJson = $.param({
  				"city" : $scope.city,
  				"district": $scope.district,
  				"classfication": now_classfication,
  				"depart": $scope.depart.name
  			});

  		}
  		$http({
  			method: "POST",
  			url: './php/selectLocation.php',
  			data: dataJson,
  			headers: {'Content-type': 'application/x-www-form-urlencoded'}
  		}).success(function(data){	
  			console.log(data);
  			if(data[0]==false){
  				alert("抱歉！找不到您要的選擇，請換地區或是科別");
  			}
  			else{
  				removeMarkers();
				unsetCluster();
  				for( var i=0; i<data.length; i++){
  					// call google_map.js
  					addMarker(map,data[i]['name'],data[i]['lat'],data[i]['lng'],data[i]['tele'],i);
  				}
  				clusterMarkers(map,50, 15);
  				initialLocation = new google.maps.LatLng(data[0]['lat'],data[0]['lng']);
  				console.log("initialLocation: " + initialLocation);
  				map.setCenter(initialLocation);
  			}
  		}).
  		error(function(){
  			alert("serchDistrict error");
  		});

  	}


  	$("#selectDepart").change(function(){
  		var map = after_select_init();
  		console.log("!! city: "+ $scope.city);
  		console.log("!! district: "+ $scope.district);
  		console.log("!! class: "+ now_classfication);
  		console.log("!! depart: "+ $scope.depart.name);
  		if($scope.depart.name == "不分科"){
  			var dataJson = $.param({
  				"city": $scope.city,
  				"district": $scope.district,
  				"classfication": now_classfication,
  				"depart": "all"
  			});
  		}
  		else{
  			var dataJson = $.param({
  				"city" : $scope.city,
  				"district": $scope.district,
  				"classfication": now_classfication,
  				"depart": $scope.depart.name
  			});

  		}
  		console.log("json: " +dataJson);

  		$http({
  			method: "POST",
  			url: './php/selectLocation.php',
  			data: dataJson,
  			headers: {'Content-type': 'application/x-www-form-urlencoded'}
  		}).success(function(data){	
  			console.log(data);
  			if(data[0]==false){
  				alert("抱歉！找不到您要的選擇，請換地區或是科別");
  			}
  			else{
  				
  				removeMarkers();
  				for( var i=0; i<data.length; i++){
  					// call google_map.js
  					addMarker(map,data[i]['name'],data[i]['lat'],data[i]['lng'],data[i]['tele'],i);
  				}
  				if($scope.afterserchDistrict)
  					initialLocation = new google.maps.LatLng(data[0]['lat'],data[0]['lng']);
  				else
  					initialLocation = new google.maps.LatLng(getInitialLat(),getInitialLng());
  				console.log("initialLocation: " + initialLocation);

  				map.setCenter(initialLocation);
  				clusterMarkers(map,50, 15);
  			}
  		}).
  		error(function(){
  			alert("serchDistrict error");
  		});
  	});


$scope.searchRequest="";

$(document).keydown(function(event){
	if(event.keyCode==13){
		if($scope.searchRequest!=""){
			search2();
		}
	}
	// event.preventDefault();
	// alert('You pressed '+event.keyCode);
});

$scope.list = [];
function search2(){
	$http({
		method: "POST",
		url : './php/search.php',
		data : $.param({"argv":$scope.searchRequest}),
		headers: {'Content-type': 'application/x-www-form-urlencoded'}
	}).
	success(function(data){
		$("#section_for_googlemap").css("display","block");
		$("#section_for_article").css("display","none");
		$("#resultCount").css("display","block");
		// $("#left_block").css("visibility","hidden");
		// $("#fourArticle").css("display",'none');
		$("#section_for_hospitalList").css("display",'block');
		$("#searchList").css("display",'block');
		console.log(data);
		$scope.list = [];
		for(var i = 0 ;i<data.length; i++){
			if(data[i]!=false)
				$scope.list[i] = data[i];
		}
		$scope.count = $scope.list.length;
	}).
	error(function(){
		alert("search error!");
	});
}

$scope.search1 = function(){
	// alert("in search1");
	if($scope.searchRequest==null){
		alert("input somethong");
	}
	else{
		$http({
			method: "POST",
			url : './php/search.php',
			data : $.param({"argv":$scope.searchRequest}),
			headers: {'Content-type': 'application/x-www-form-urlencoded'}
		}).
		success(function(data){
			// $("#section_for_googlemap").css("display","block");
			$("#section_for_article").css("display","none");
			// $("#left_block").css("visibility","hidden");
			// $("#fourArticle").css("display",'none');
			$("#section_for_hospitalList").css("display",'block');
			$("#searchList").css("display",'block');
			$("#resultCount").css("display","block");
			$scope.list = [];
			console.log("~~~~");
			for(var i = 0 ;i<data.length; i++){
				if(data[i]!=false)
					$scope.list[i] = data[i];
			}
			$scope.count = $scope.list.length;
		}).
		error(function(){
			alert("search error!");
		});
	}
}

$scope.goToMap = function(name,tele,lat,lng){
	// $("#section_for_googlemap").css("display","block");
	$("#section_for_article").css("display","none");
	$("#left_block").css("visibility","block");
	// $("#fourArticle").css("display",'none');
	// $("#section_for_hospitalList").css("display",'none');
	$("#searchList").css("display",'block');
	var map = after_select_init();
	removeMarkers();
	addMarker(map,name,lat,lng,lng,0);
	initialLocation = new google.maps.LatLng(lat,lng);
	console.log("initialLocation: " + initialLocation);
	map.setCenter(initialLocation);
	clusterMarkers(map,50,15);
}


$scope.change_to_article = function(){
	$("#section_for_googlemap").css("display","none");
	$("#section_for_article").css("display","block");
	$("#left_block").css("visibility","hidden");
	// $("#resultCount").css("display","hidden");
	$("#fourArticle").css("display",'none');
	$("#section_for_hospitalList").css("visibility",'hidden');
}
$scope.change_to_googlemap = function(){
	$("#section_for_googlemap").css("display","block");
	$("#section_for_article").css("display","none");
	$("#left_block").css("visibility","visible");
	$("#fourArticle").css("display",'block');
	$("#section_for_hospitalList").css("visibility",'visible');
}

/*$scope.change_to_searchResult = function(){
	$("#section_for_googlemap").css("display","none");
	$("#section_for_article").css("display","none");
	$("#left_block").css("visibility","visible");
	$("#fourArticle").css("display",'block');
	$("#section_for_hospitalList").css("display",'block');
}*/


function navigate_to_mp(){
	$("#section_for_googlemap").css("display","block");
	$("#section_for_article").css("display","none");
	window.location.href="http://localhost/~Maydaycha/frank.webflows/app/index2.html";
}
function closeIt()
{
	return "Any string value here forces a dialog box to \n" + 
	"appear before closing the window.";
}

window.onbeforeunload = navigate_to_mp;



}]).
controller('MyCtrl2', ['$scope','$http','$window',function($scope,$http,$window) {

	// $("#section_for_googlemap").css("display","none");
	// // $("#section_for_hospitalList").css("display","none");
	// $("#section_for_article").css("display","block");
	// $("#left_block").css("visibility","hidden");
	$http({
		method: "POST",
		url: "./php/getArticle.php"
	}).
	success(function(data){
		// alert("getArticle success");
		console.log("article");
		console.log(data);
		console.log(data.length);
		var i = data.length-1;
		$scope.articles = data;
	}).
	error(function(){
		alert("getArticle error");
	});





	// 編輯文章
	/*
	$scope.content = "";
	$scope.title = "";

	$scope.saveAtricle = function(){
		var dataJson=$.param({
			"title":$scope.title, "content":$scope.content
		});

		$http({
			method: "POST",
			url: './php/article.php',
			data: dataJson,
			headers: {'Content-type': 'application/x-www-form-urlencoded'}
		}).
		success(function(data){	
			console.log(data);
			alert("文章已儲存");
			$window.location.href = "index2.html";
		}).
		error(function(){
			alert("save error");
		})

	}
	$scope.cleanArticle = function(){
		$scope.content="";
	}*/

}]).
controller('MyCtrl3', ['$scope','$http','$window',function($scope,$http,$window) {

	// $("#section_for_googlemap").css("display","none");
	// // $("#section_for_hospitalList").css("display","block");
	// $("#section_for_article").css("display","none");
	// $("#left_block").css("visibility","hidden");





}]);