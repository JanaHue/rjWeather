 
var weather = {
	
	init : function(){
		weather.pullValue();
		weather.openModal();
		weather.closeModal();
	},


	pullValue : function(){
		$("form.city").on("submit",function(e){
			e.preventDefault();
			var city = $("input[type=text]").val();
			weather.getWeather(city);
			$("h2.condition").empty();
			$("h3.subtext").empty();
			$(".paragraphs").empty();
			$(".gallery").empty();

		});
	},

	getWeather : function(city){
		var api_key = "404daa466e49de46";
		var hotPocket = encodeURI(city);
		var url = "http://api.wunderground.com/api/" + api_key + "/conditions/q/"+ hotPocket +".json";

		$.ajax(url,{
			type : "GET",
			dataType : "jsonp",
			success : function(data){
				if(!data.current_observation) {
					$(".paragraphs").append("<p class='error'>Please be super specific, ie. Toronto, Canada</p>");
					return false;
				}


				var filter = []; 
				var w = data.current_observation;
				// console.log(w);
				var main = w.weather
				var temp = w.temp_c;
				var precip = w.precip_today_metric;
				var date = w.local_time_rfc822;
				var hour = date.slice(17,19);
				var day = date.slice(0,3);
				var sub = "You should wear";
				var p1;
				var p2;
			
				$("h2.condition").text(main);
				$("h3.subtext").text(sub);
				$(".gallery").append("<img src= />");
				//date and time
				if (hour > 13) {
					console.log("it's after 1pm");
					filter.push("n");
				}
				else {
					console.log("it's before 1pm");
					filter.push("m");
				};

				if (day == "Sat" || day == "Sun") {
					console.log("it's the weekend");
					filter.push("p");
				}
				else {
					console.log("it's a weekday");
					filter.push("w");
				};
				
				//hot and dry
				if (temp > 20 && (precip == 0 || precip == "--")) {
					console.log(1)
					filter.push("a","5");
					$(".gallery img").attr("src", "i/hot_and_dry.jpg");
					p1 = "Something";
					p2 = "Individual";
				};

				//hot and wet
				if (temp > 20 && precip > 0) {
					console.log(2)
					filter.push("a","4");
					$(".gallery img").attr("src", "i/hot_and_wet.jpg");
					p1 = "Something";
					p2 = "Individual";
				};

				//warm and dry
				if (temp <= 20 && temp > 12 && (precip == 0 || precip == "--")) {
					console.log(3)
					filter.push("b","5");
					$(".gallery img").attr("src", "i/warm_and_wet.jpg");
					p1 = "For Each";
					p2 = "Condition";
				};
				
				//warm and wet
				if (temp <= 20 && temp > 12 && precip > 0) {
					console.log(4)
					filter.push("b","4");
					$(".gallery img").attr("src", "i/warm_and_wet.jpg");
					p1 = "Something";
					p2 = "Individual";
				};	

				//cool and dry
				if (temp <= 12 && temp > 8 && (precip == 0 || precip == "--")) {
					console.log(5)
					filter.push("c","5");
					$(".gallery img").attr("src", "i/cool_and_dry.jpg");
					p1 = "Something";
					p2 = "Individual";
				};

				//cool and wet
				if (temp <= 12 && temp > 8 && precip > 0) {
					console.log(6)
					filter.push("c","4");
					$(".gallery img").attr("src", "i/cool_and_wet.jpg");
					p1 = "Something";
					p2 = "Individual";
				};

				//cold and dry
				if (temp <= 8 && temp >= 0 && (precip == 0 || precip == "--")) {
					console.log(7)
					filter.push("d","5");
					p1 = "Something";
					p2 = "Individual";
				};

				//cold and wet
				if (temp <= 8 && temp >= 0 && precip > 0) {
					console.log(8)
					filter.push("d","4");
					p1 = "Something";
					p2 = "Individual";
				};

				//really cold and dry
				if (temp < 0 && temp > -15 && (precip == 0 || precip == "--")) {
					console.log(9)
					filter.push("e","5");
					p1 = "Something";
					p2 = "Individual";
				};

				//really cold and wet
				if (temp < 0 && temp > -15 && precip > 0 ) {
					console.log(10)
					filter.push("e","4");
					p1 = "Something";
					p2 = "Individual";
				};
			
				//freezing
				if (temp < -15) {
					console.log(11)
					filter.push("f");
					p1 = "Something";
					p2 = "Individual";
				};

				$(".paragraphs").append("<p>"+p1+"</p>");
				$(".paragraphs").append("<p>"+p2+"</p>");
				// console.log(p1);
				// console.log(p2);
				// console.log(filter)
			} //end success function
		}); //end ajax
	},

	openModal : function(){
		$("form.city").on("submit", function(e){
			$(".overlay").fadeIn();

		});
	},

	closeModal : function(){
		$(".overlay").on('click', function(e){
			if ($(e.currentTarget).hasClass("closeModal")){
				$(".overlay").fadeOut();
			}
		});
		$(document).on("keydown", function(e){
			if (e.which == 27){
				$(".overlay").fadeOut();
			}
		});
		// $(document).on("keydown", function(e){
		// 	if (e.which == 13){
		// 		$(".overlay").fadeOut();
		// 	}
		// });
	},

	resetForm : function(){
		//find a way to clear the form
		//when does this function get called?
		// filter.length = 0;
	},

}; //end namespace



$(function() {
	weather.init();
}); //end doc ready





