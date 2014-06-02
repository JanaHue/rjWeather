
var weather = {
	
	init : function(){
		weather.pullValue();
	},

	getWeather : function(city){
		var api_key = "404daa466e49de46";
		var hotPocket = encodeURI(city);
		var url = "http://api.wunderground.com/api/" + api_key + "/conditions/q/"+ hotPocket +".json";

		$.ajax(url,{
			type : "GET",
			dataType : "jsonp",
			success : function(data){
				var w = data.current_observation;
				var temp = w.temp_c;
				var precip = w.precip_today_metric;
				var date = w.local_time_rfc822;
				var hour = date.slice(17,19);
				var day = date.slice(0,3);

				//date and time
				if (hour > 13) {
					console.log("it's after 1pm");
				}
				else {
					console.log("it's before 1pm");
				};

				if (day == "Sat" || day == "Sun") {
					console.log("it's the weekend");
				}
				else {
					console.log("it's a weekday");
				};
				
				//hot and dry
				if (temp > 20 && (precip == 0 || precip == "--")) {
					console.log(1)
				};

				//hot and wet
				if (temp > 20 && precip > 0) {
					console.log(2)
				};

				//warm and dry
				if (temp <= 20 && temp > 12 && (precip == 0 || precip == "--")) {
					console.log(3)
				};
			
				//warm and wet
				if (temp <= 20 && temp > 12 && precip > 0) {
					console.log(4)
				};	

				//cool and dry
				if (temp <= 12 && temp > 8 && (precip == 0 || precip == "--")) {
					console.log(5)
				};

				//cool and wet
				if (temp <= 12 && temp > 8 && precip > 0) {
					console.log(6)
				};

				//cold and dry
				if (temp <= 8 && temp >= 0 && (precip == 0 || precip == "--")) {
					console.log(7)
				};

				//cold and wet
				if (temp <= 8 && temp >= 0 && precip > 0) {
					console.log(8)
				};

				//really cold and dry
				if (temp < 0 && temp > -15 && (precip == 0 || precip == "--")) {
					console.log(9)
				};

				//really cold and wet
				if (temp < 0 && temp > -15 && precip > 0 ) {
					console.log(10)
				};
			
				//freezing
				if (temp < -15) {
					console.log(11)
				};

			}
		}); //end ajax
	},

	pullValue : function(){
		$("form.city").on("submit",function(e){
			e.preventDefault();
			var city = $("input[type=text]").val();
			weather.getWeather(city);
		});
	},

}; //end namespace



$(function() {
	weather.init();
}); //end doc ready




