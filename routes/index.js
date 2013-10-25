exports.index = function(req, res){
 	var jsdom = require("jsdom");
 	var underscore = require("underscore");
 	if (req.params.month && req.params.day)
 		var url = "http://en.wikipedia.org/wiki/"+req.params.month+"_"+req.params.day;
 	else {
 	var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
 	var d = new Date();
 	var url = "http://en.wikipedia.org/wiki/"+months[d.getMonth()]+"_"+d.getDate();
 	}
 	jsdom.env({
 		url: url,
 		done: function (errors, window){
 			maindoc = window.document.getElementById("mw-content-text").getElementsByTagName("ul")
 			var even = maindoc[1].getElementsByTagName("li")
 			//res.send( maindoc[3].getElementsByTagName("li").toString())
 			var birth = maindoc[2].getElementsByTagName("li")
 			var death = maindoc[3].getElementsByTagName("li")


 			var filtered_birth = underscore.filter(birth, function(text){
 				return (parseInt(text.textContent.split(" ")[0]) >= 1950)
 			});

 			var filtered_death = underscore.filter(death, function(text){
 				return (parseInt(text.textContent.split(" ")[0]) >= 2000)
 			});

 			var filtered_even = underscore.filter(even, function(text){
 				return (parseInt(text.textContent.split(" ")[0]) >= 2000)
 			});

 			res.render('index', { title: 'Today in History '+months[d.getMonth()]+" "+d.getDate() ,even:filtered_even,birth:filtered_birth,death:filtered_death,});
 			/*filtered_birth.forEach(function(entry){
 				//console.log(entry.textContent);

 			})*/

 		}

 	})


 };

