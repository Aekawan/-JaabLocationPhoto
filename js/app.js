function location(){

	var lat =7.8945603;
	var long = 98.3529433;

	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position) {

				lat = position.coords.latitude;
				long = position.coords.longitude;
        initMap(lat,long);//แสดงแผนที่

	});
	}else {

		lat =7.8945603;
		long = 98.3529433;

	}

initMap(lat,long);//แสดงแผนที่

}


function initMap(lat,long) {

	var mlat = lat;
	var mlong = long;

var mapsGoo = google.maps;
var Position = new mapsGoo.LatLng(mlat,mlong);//ละติจูด,ลองติจูด เริ่มต้น โดยผมให้เริ่มต้นที่ กรุงเตบ
var myOptions = {
		center:Position,//ตำแหน่งแสดงแผนที่เริ่มต้น
 scrollwheel: false,
		zoom:16,//ซูมเริ่มต้น คือ 8
		mapTypeId: mapsGoo.MapTypeId.ROADMAP //ชนิดของแผนที่
		};

var map = new mapsGoo.Map(document.getElementById("map_canvas"),myOptions);
//var infowindow = new mapsGoo.InfoWindow();
var marker = new mapsGoo.Marker({//เรียกเมธอดMarker(ปักหมุด)
		position: Position,
 draggable:true,
		title:"คลิกแล้วเคลื่อนย้ายหมุดไปยังตำแหน่งที่ต้องการ"
 });
var Posi=marker.getPosition();//เลือกเมธอดแสดงตำแหน่งของตัวปักหมุด
myMaps_locat(Posi.lat(),Posi.lng());
marker.setMap(map);//แสดงตัวปักหมุดโลด!!
//ตรวจจับเหตุการณ์ต่างๆ ที่เกิดใน google maps
mapsGoo.event.addListener(marker, 'dragend', function(ev) {//ย้ายหมุด
 var location =ev.latLng;
 mlat = location.lat();
 mlong = location.lng();
 myMaps_locat(mlat,mlong );
 $('#myhead').html('');

 var service = new google.maps.places.PlacesService(map);
 service.nearbySearch({
 	location: {lat:mlat ,lng:mlong},
 	radius: 1000,
 }, callback);

});
mapsGoo.event.addListener(marker, 'click', function(ev) {//คลิกที่หมุด
 var location =ev.latLng;
 myMaps_locat(mlat,mlong);
});


var service = new google.maps.places.PlacesService(map);
service.nearbySearch({
	location: Position,
	radius: 1000,
}, callback);

$('#menu').change(function() {
	var typeplace = $('#menu').val();
	console.log(typeplace);
	$('#myhead').html('');
	var service = new google.maps.places.PlacesService(map);
	service.nearbySearch({
		location: {lat:mlat ,lng:mlong},
		radius: 1000,
		types:[typeplace]
	}, callback);

});

}


function myMaps_locat(lat,lng){
 console.log(lat);//เอาค่าละติจูดไปแสดงที่ Tag HTML ที่มีแอตทริบิวต์ id ชื่อ mapsLat
 console.log(lng);//เอาค่าลองติจูดไปแสดงที่ Tag HTML ที่มีแอตทริบิวต์ id ชื่อ mapsLng

}

function callback(results, status) {
	$('#myhead').html('');
	if (status === google.maps.places.PlacesServiceStatus.OK) {

		//$('#img1').attr("src", results[1].photos[0].getUrl({'maxWidth': 400, 'maxHeight': 400}));
		//$('#pname').html('&commat;'+ results[1].name);

		var leng = results.length / 4;
		console.log(leng);
   var check = 0;
   for (var i = 0; i < leng; i++) {

		 var place = results[i];
		 console.log(results[i]);

		 $('#myhead').append('<div class="columns" id="mydata'+i+'"></div>');

		  for (let j = 1; j < 5; j++) {
				try {

					var photo = results[j+check].photos[0].getUrl({'maxWidth': 400, 'maxHeight': 400});
					var name = results[j+check].name;
					if (name.length > 15){
						var titlename = name.substr(0, 13)+'...';
					} else {
						var titlename = name;
					}
					$('#mydata'+i).append('<div class=\"column is-3\"><div class=\"card\"><header class=\"card-header\"><p class=\"card-header-title\">@'+titlename+'</p></header><div class=\"card-image\"><figure class=\"image is-4by3\"> <img id=\"img1\" src=\"'+photo+'\" alt=\"Image\"></figure></div></div></div>');


				} catch (e) {


					$('#mydata'+i).append('<div class=\"column is-3\"><div class=\"card\"><header class=\"card-header\"><p class=\"card-header-title\">@'+titlename+'</p></header><div class=\"card-image\"><figure class=\"image is-4by3\"> <img id=\"img1\" src=\"http://www.crescendobuffalo.com/Common/images/jquery/galleria/image-not-found.png\" alt=\"Image\"></figure></div></div></div>');


				}


			}
			check = check + 4;





 }
	}
}


function auto(){
google.maps.event.addDomListener(window, 'load', function () {
		var places = new google.maps.places.Autocomplete(document.getElementById('txtPlaces'));
		google.maps.event.addListener(places, 'place_changed', function () {
				var place = places.getPlace();
				var address = place.formatted_address;
				var latitude = place.geometry.location.lat();
				var longitude = place.geometry.location.lng();
       $('#myhead').html('');
			  initMap(latitude,longitude);


		});
});
}

location();
auto();
