$(document).ready(function(){
	$.ajax({
		type: 'GET',
		url: '../test.html'
	}).success(function(response){
		$('h1').text(response);
	})
})

