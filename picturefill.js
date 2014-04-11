
/*! Picturefill - Responsive Images that work today. (and mimic the proposed Picture element with span elements). Author: Scott Jehl, Filament Group, 2012 | License: MIT/GPLv2 
modified specially for Albumeria */

(function( w ){

	// Enable strict mode
	"use strict";

	w.picturefill = function() {
		var ps = w.document.getElementsByTagName( "span" );

		// Loop the pictures
		for( var i = 0, il = ps.length; i < il; i++ ){
			if( ps[ i ].getAttribute( "data-picture" ) !== null ){

			var baseurl = ps[ i ].getAttribute( "data-baseurl" );
			var queries = ps[ i ].getAttribute( "data-queries" );

			var matches = [];
			var query = "", media = "", src = "";
			var src = "";
			var media = "";

			if (queries) {
				queries = queries.split(",");

				for (var q in queries) {
					query = queries[q].split(":");

					media = (query[0] === "default") ? "" : "(max-width:"+query[0]+ "px)";

					if( !media || ( w.matchMedia && w.matchMedia( media ).matches ) ){
						src = baseurl+"?"+query[1];
					}

					media = (query[0] === "default") ? "(-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi), (min-resolution: 2dppx)" : "(max-width:"+query[0]+ "px) and (-webkit-min-device-pixel-ratio: 2)" + ", (max-width:"+query[0]+ "px) and (min-resolution: 192dpi)" + ", (max-width:"+query[0]+ "px) and (min-resolution: 2dppx)";

					if( !media || ( w.matchMedia && w.matchMedia( media ).matches ) ){
						src = baseurl+"?"+query[1]+"&dppx=2";
					}

				}
			}


			// Find any existing img element in the picture element
			var picImg = ps[ i ].getElementsByTagName( "img" )[ 0 ];

			if( src != "" ){
				if( !picImg || picImg.parentNode.nodeName === "NOSCRIPT" ){
					picImg = w.document.createElement( "img" );
					picImg.alt = ps[ i ].getAttribute( "data-alt" );
				}
				else if( src === picImg.getAttribute("src") ){
					// Skip further actions if the correct image is already in place
					continue;
				}

				picImg.src =  src;
				ps[i].appendChild( picImg );
				picImg.removeAttribute("width");
				picImg.removeAttribute("height");
			}
			else if( picImg ){
				picImg.parentNode.removeChild( picImg );
			}

		}
		}
	
	};

	// Run on resize and domready (w.load as a fallback)
	if( w.addEventListener ){
		w.addEventListener( "resize", w.picturefill, false );
		w.addEventListener( "DOMContentLoaded", function(){
			w.picturefill();
			// Run once only
			w.removeEventListener( "load", w.picturefill, false );
		}, false );
		w.addEventListener( "load", w.picturefill, false );
	}
	else if( w.attachEvent ){
		w.attachEvent( "onload", w.picturefill );
	}

}( this ));
