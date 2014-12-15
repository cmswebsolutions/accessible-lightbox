jQuery(document).ready(function($){


		$('.gallery dt a').on('click keypress', function(event){
			var keycode = (event.keyCode ? event.keyCode : event.which);
			if(keycode == '13' || event.type == 'click'){
				event.preventDefault();
				$(this).parent().parent().lightboxMe();
			}
		});

		$.fn.extend({
			lightboxMe: function(){

				window.addEventListener("touchmove", disableScroll);

				function disableScroll(event){
					if (!event.target.classList.contains('scrollable')) {
						// no more scrolling
						event.preventDefault();
					}
				}

				$('#img-box #photo').css('max-height', ( $(window).outerHeight() * 0.8 ) );
				$(window).resize(function () {
					$('#img-box #photo').css('max-height', ( $(window).outerHeight() * 0.8 ) );
				});

				// remove all <br /> tags from the gallery
				var gallery = $(this).parent().parent().parent();
				$('.gallery').find('br').remove();

				// Find the number of images in the gallery
				var gallerysize = gallery.find('.gallery-item');
				gallerysize = gallerysize.length;

				// get the index of the image that initialized the gallery
				var currentitem = $('.gallery-item').index($(this));

				// save the last element with focus, so we can restore later
				var focuspos = $(':focus');

				// grab the src, alt, and caption of the requested image
				var src = 		$(this).find('a').attr('href');
				var alt = 		$(this).find('img').attr('alt');
				var caption = 	$(this).find('dd').text();

				// If already loaded, just show the lightbox
				if( $('#lightbox #photo').attr('src') == src ){
					$('#lightbox').addClass('active');
					$('#lightbox').focus();
				}

				// Set the attributes
				$('#lightbox #photo').attr('src', src).attr('alt', alt);
				$('#lightbox .caption').text(caption);

				// Once the photo loads, show the lightbox
				$('#lightbox #photo').on('load', function(e){
					$('#lightbox').addClass('active');
				});

				// Set focus to the lightbox
				$('#lightbox').focus();

				// Next photo button
				$('#lightbox #next').on('click', function(e){
					currentitem++;

					var nextslide = currentitem + 1;

					if ( currentitem + 1 >= gallerysize ){
						nextslide = gallerysize;
						currentitem = -1;
					}

					var nextitem = gallery.find('.gallery-item:nth-of-type(' + nextslide + ')');

					var src = 		nextitem.find('a').attr('href');
					var alt = 		nextitem.find('img').attr('alt');
					var caption = 	nextitem.find('dd').text();

					$('#lightbox').addClass('changing');
					window.setTimeout(changeSrc, 200);

					function changeSrc() {
						var img = $('#lightbox #photo');
						img.load(function(e){
							window.setTimeout(showImage, 20);
						});
						$('#lightbox #photo').attr('src', src).attr('alt', alt);
						$('#lightbox .caption').text(caption);
					}

					function showImage() {
						$('#lightbox').removeClass('changing');
					}

				});

				// Previous image button
				$('#lightbox #prev').on('click', function(e){

					currentitem--;

					var nextslide = currentitem + 1;

					if( currentitem <= -1 ){
						nextslide = gallerysize;
						currentitem = gallerysize - 1;
					}

					var nextitem = gallery.find('.gallery-item:nth-of-type(' + nextslide + ')');

					var src = 		nextitem.find('a').attr('href');
					var alt = 		nextitem.find('img').attr('alt');
					var caption = 	nextitem.find('dd').text();

					$('#lightbox').addClass('changing');
					window.setTimeout(changeSrc, 200);

					function changeSrc() {
						var img = $('#lightbox #photo');
						img.load(function(e){
							window.setTimeout(showImage, 20);
						});
						$('#lightbox #photo').attr('src', src).attr('alt', alt);
						$('#lightbox .caption').text(caption);
					}

					function showImage() {
						$('#lightbox').removeClass('changing');
					}
				});


				// Close Button
				$('#lightbox #close').on('click keypress', function(event){
					$('#lightbox').removeClass('active');

					window.removeEventListener("touchmove", disableScroll);

					var keycode = (event.keyCode ? event.keyCode : event.which);

					if(keycode == '13'){
						focuspos.focus();
					}
				});

			}
		});
});