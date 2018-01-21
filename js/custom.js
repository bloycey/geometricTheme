// NOTICE!! THIS IS REQUIRED TO MAKE YOUR NETO SHOPPING CART WORK
// DO NOT REMOVE UNLESS YOU REALLY KNOW WHAT YOU ARE DOING

(function($) {
	$.extend({
		initPageFuncs: function() {
			// Ajax Wish List
			$.addToWishList({
				'class': 'wishlist_toggle',
				'textclass': 'wishlist_text',
				'htmlon': '<i class="icon ion-ios-heart wish-love white text-center"></i>',
				'htmloff': '<i class="icon ion-ios-heart-outline wish-nolove white text-center"></i>',
				'tooltip_css': 'whltooltips'
			});
			// Ajax Add To Cart
			$.addToCartInit({
				'cart_id' :  'cartcontents',
				'target_id': 'cartcontentsheader',
				'image_rel': 'itmimg'
			});

			$(".disp_ajax_templ").unbind();
			$(".disp_ajax_templ").change(function() {
				var sku = $(this).val();
				var rel = $(this).attr('rel');
				$.load_ajax_template(rel, {'sku':sku, 'showloading':true, 'procdata':'n'}, {onLoad: function (){$.initPageFuncs();}});
			});
			// This renders the instant search results - edit design of ajax results here
			$.initSearchField({
				'result_header'		: '<ul class="nav nav-list">',
				'result_body'		: '<li><a href="##url##" search-keyword="##keyword##"><img border="0" src="##thumb##" width="36" height="36"/><span class="title">##model##</span></a></li>',
				'result_footer'		: '</ul>',
				'category_header'	: '<ul class="nav nav-list">',
				'category_body'		: '<li><a href="##url##"><span class="thumb"><img border="0" src="##thumb##" width="36" height="36"/></span><span class="title">##fullname##</span> <span class="label label-default">##typename##</span></a></li>',
				'category_footer'	: '</ul>'
			});
		},

// For child product multi-add to cart function
		checkValidQty: function() {
			var found = 0;
			$("#multiitemadd :input").each(function() {
				if ($(this).attr('id').match(/^qty/)) {
					if ($(this).val() > 0) {
						found = 1;
					}
				}
			});
			if (found == 0) {
				$.fancybox("Please specify a quantity before adding to cart");
				return false;
			}
			return true;
		},

		modQtyByMulti: function(obj,act) {
			var mul = 1;
			var maxm;
			var minm = 0;
			var objid = obj.replace(/^qty/,'');
			if ($('#qty'+objid).length > 0) {
				if ($('#multiplier_qty'+objid).length > 0) {
					mul = $('#multiplier_qty'+objid).val();
				}
				if ($('#min_qty'+objid).length > 0) {
					minm = $('#min_qty'+objid).val();
				}
				if ($('#max_qty'+objid).length > 0) {
					maxm = $('#max_qty'+objid).val();
				}

				var cur = $('#'+obj).val();
				if (isNaN(cur)) {
					cur = 0;
				}

				if (act == 'add') {
					cur = parseInt(cur) + parseInt(mul);
					if (!isNaN(maxm) && cur > maxm) {
						cur = maxm;
					}
				}
				else if (act == 'subtract') {
					cur = parseInt(cur) - parseInt(mul);
					if (cur < minm) {
						cur = minm;
					}
				}

				$('#qty'+objid).val(cur);
			}
		}
	});
})(jQuery);

$(document).ready(function() {
	// Popup Credit Card CCV Description At Checkout
	$("#card_ccv").fancybox();

	// Popup Terms At Checkout
	$("#terms").fancybox({
		'width' : 850,
		'height': 650
	});

	// Jquery Ui Date Picker
	$(".datepicker").datepicker({ dateFormat: "dd/mm/yy" });
	$.initPageFuncs();

	// Carousel
	$('.carousel').carousel();

	// Nice Select

	$('select.nice').niceSelect();

});

$(".btn-loads").click(function(){
	$(this).button("loading");
	var pendingbutton=this;
	setTimeout(function(){
		$(pendingbutton).button("reset");
	},3000);
});

// Fancybox
$(document).ready(function() {
	$(".fancybox").fancybox();	
});

// Tooltip
$('.tipsy').tooltip({trigger:'hover',placement:'bottom'});
$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip(); 
});

// Who needs AddThis?
function windowPopup(url, width, height) {
	// Calculate the position of the popup so
	// it’s centered on the screen.
	var left = (screen.width / 2) - (width / 2),
		top = (screen.height / 2) - (height / 2);
	window.open(url,"","menubar=no,toolbar=no,resizable=yes,scrollbars=yes,width=" + width + ",height=" + height + ",top=" + top + ",left=" + left);
}
$(".js-social-share").on("click", function(e) {
	e.preventDefault();
	windowPopup($(this).attr("href"), 500, 300);
});

$('.nToggleMenu').click(function(){
	var toggleTarget = $(this).attr('data-target')
	$(toggleTarget).slideToggle();});


$('.addtocart').click(function(){
	$('.cart-box').addClass('animated bounce');
	setTimeout(function(){ 
		$('.cart-box').removeClass('animated bounce');
	}, 3000);	
})	



$('.product-image-wrapper').hover(function(){
	if($(window).width() > 992) {
	$(this).find('.thumbnail-wish-wrapper').addClass('display-block animated fadeInUp');
	}
});

$('.product-image-wrapper').mouseleave(function(){
	if($(window).width() > 992) {
	$(this).find('.thumbnail-wish-wrapper').removeClass('display-block animated fadeInUp');
	}
});


$('.thumbnail-wish-wrapper').click(function(){
	$('.love-box').addClass('animated bounce');
	setTimeout(function(){ 
		$('.love-box').removeClass('animated bounce');
	}, 3000);	
})	

function initSlider() {

var numImages = $('img.pp-product-img').length;
var setCenter;
var numslides;
if (numImages > 3) {
	setCenter = true;
	numslides = 3
} else {
	setCenter = false;
	numslides = 1;
}


$('.product-image-slider').slick({
	centerMode: setCenter,
  	slidesToShow: numslides,
	  centerPadding: '0px',
	  infinite: true,
  	responsive: [
    {
      breakpoint: 1200,
	  centerMode: false,
      settings: {
        slidesToShow: 1
      }
    },
	{
		breakpoint: 767,
	  centerMode: false,
      settings: {
        slidesToShow: 1
      }	
	}
  ]
});

}

