/**
 * @class
 */
var Helper = {
	
	/**
	 * @param {Event} event
	 * @param {String} elementID
	 * 
	 * @link http://stackoverflow.com/a/5932203/844771
	 * @author Ryan Artecona
	 */
	
	getCanvasCoordinates : function( event, elementID )
	{
		var totalOffsetX	= 0;
		var totalOffsetY	= 0;
		var canvasX			= 0;
		var canvasY			= 0;
		var element			= Helper.getElement( elementID );

		do
		{
			totalOffsetX += element.offsetLeft - element.scrollLeft;
			totalOffsetY += element.offsetTop - element.scrollTop;
		}
		while( element = element.offsetParent )

		canvasX = event.pageX - totalOffsetX;
		canvasY = event.pageY - totalOffsetY;

		return { x:canvasX, y:canvasY };
	},
	
	
	/**
	 * @param {String} elementType Type of element
	 * @param {String} [elementID] Element ID
	 * @returns {Element}
	 */
	
	createElement : function( elementType, elementID )
	{
		var element = document.createElement( elementType );
		
		if( elementID )
		{
			element.setAttribute( 'id', elementID );
		}
		
		return element;
	},
	
	
	/**
	 * @param {Element} element
	 */
	
	removeElement : function( element )
	{
		element.parentNode.removeChild( element );
	},
	
	
	/**
	 * @param {String} elementID Element ID
	 */
	
	getElement : function( elementID )
	{
		return document.getElementById( elementID );
	},
	
	
	/**
	 * @param {Object} object
	 * @returns {Object}
	 */
	
	extend : function( object )
	{
		return $.extend( {}, object );		
	},

	/**
	 * Load data from URL
	 * @param {String} url
	 * @param {Function} successFunction
	 * @param {Function} [errorFunction]
	 */
	load : function( url, successFunction, errorFunction )
	{
		$.ajax(
				{
					'url'		: url,
					'error'		: errorFunction,
					'success'	: successFunction
				}
			);
	},


	create2DArray : function( sizeA, sizeB )
	{
		var a = new Array( sizeA );

		for( var i = 0; i < sizeA; i++ )
		{
			a[ i ] = new Array( sizeB );
		}

		return a;
	}



	
};
