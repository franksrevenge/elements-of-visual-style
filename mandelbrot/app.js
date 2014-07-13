
require( [ '../src/loader' ],
function()
{
	'use strict';
	
	require( [ 'App/Mandelbrot', '../mandelbrot/ui' ],
	function( Mandelbrot, ui )
	{
		var app;

		var init = function()
		{
			app = new Mandelbrot( 'surface' );

			ui.init( app );

			app.draw();
		};


		init();

	} );
} );