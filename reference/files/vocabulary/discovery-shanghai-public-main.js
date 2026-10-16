//导航固定顶部
// jQuery(function($) {
// 	$(document).ready(function() {
// 		$('#header').stickUp();
// 	});
// });

    		$(".dropdown").hover(
        	function() { $('.dropdown-menu', this).fadeIn("fast");
        	},
        	function() { $('.dropdown-menu', this).fadeOut("fast");
    		});



		$("div.s-slide").myScroll({
	        speed:40, //数值越大，速度越慢
	        rowHeight:40 //li的高度
	    });

