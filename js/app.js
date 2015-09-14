$(document).ready(function() {
	$('.tab-links a').on('click', function(e){
		e.preventDefault();
		var currentTab = $(this).attr('href');

		$('.results ' + currentTab).show().siblings().hide();

		$(this).parent('li').addClass('active').siblings().removeClass('active');
	});
});