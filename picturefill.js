/*! Picturefill - Responsive Images that work today. (and mimic the proposed Picture element with span elements).
Author: Scott Jehl, Filament Group, 2012 | License: MIT/GPLv2
Modified specially for Albumeria */

(function (window) {
	'use strict';

	window.picturefill = function () {
		var ps = window.document.getElementsByTagName('span');

		// Loop the pictures
		for(var i = 0, il = ps.length; i < il; i++) {
			if (ps[i].getAttribute('data-picture') !== null) {

				var baseurl = ps[i].getAttribute('data-baseurl'),
				queries = ps[i].getAttribute('data-queries'),
				matches = [],
				query = '',
				media = '',
				src = '';

				if (queries) {
					queries = queries.split(',');

					for (var q in queries) {
						query = queries[q].split(':');

						media = (query[0] === 'default') ? '' : '(max-width:' + query[0] + 'px)';

						if (!media || (window.matchMedia && window.matchMedia(media).matches)) {
							src = baseurl + '?' + query[1];
						}

						if (query[0] === 'default') {
							media = '(-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi), (min-resolution: 2dppx)';
						}
						else {
							media = '(max-width:' + query[0] + 'px) and (-webkit-min-device-pixel-ratio: 2)' + ', (max-width:' + query[0] + 'px) and (min-resolution: 192dpi)' + ', (max-width:' + query[0] + 'px) and (min-resolution: 2dppx)';
						}

						if (!media || (window.matchMedia && window.matchMedia(media).matches)) {
							src = baseurl + '?' + query[1] + '&dppx=2';
						}
					}
				}


				// Find any existing img element in the picture element
				var picImg = ps[i].getElementsByTagName('img')[0];

				if (src !== '') {
					if (!picImg || picImg.parentNode.nodeName === 'NOSCRIPT') {
						picImg = window.document.createElement('img');
						picImg.alt = ps[i].getAttribute('data-alt');
					}
					else if (src === picImg.getAttribute('src')) {
						// Skip further actions if the correct image is already in place
						continue;
					}

					picImg.src =  src;
					ps[i].appendChild(picImg);
					picImg.removeAttribute('width');
					picImg.removeAttribute('height');
				}
				else if (picImg) {
					picImg.parentNode.removeChild(picImg);
				}
			}
		}
	};

	// Run on resize and domready (window.load as a fallback)
	if (window.addEventListener) {
		window.addEventListener('resize', window.picturefill, false);
		window.addEventListener('DOMContentLoaded', function () {
			window.picturefill();
			// Run once only
			window.removeEventListener('load', window.picturefill, false);
		}, false);
		window.addEventListener('load', window.picturefill, false);
	}
	else if (window.attachEvent) {
		window.attachEvent('onload', window.picturefill);
	}

}(window));
