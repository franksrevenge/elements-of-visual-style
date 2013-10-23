
var BetterTexturedTriangle = {
	
	p1			: new Point2D(),
	p2			: new Point2D(),
	p3			: new Point2D(),
	uv1			: new Point3D(),
	uv2			: new Point3D(),
	uv3			: new Point3D(),
	uvMul		: new Point3D(),
	uv12		: new Point3D(),
	uv13		: new Point3D(),
	uv23		: new Point3D(),
	uvLeft		: new Point3D(),
	uvRight		: new Point3D(),
	uvLeft2		: new Point3D(),
	uvPos		: new Point3D(),
	uvSlider	: new Point3D(),
	ud			: new Point2D(),
	pd			: new Point2D(),



	/**
	 * @param {Point2D} p1
	 * @param {Point2D} p2
	 * @param {Point2D} p3
	 * @param {Point3D} uv1
	 * @param {Point3D} uv2
	 * @param {Point3D} uv3
	 */

	draw : function( p1, p2, p3, color ) //( p1, p2, p3, uv1, uv2, uv3, texture )
	{
		this.p1.set( p1 );
		this.p2.set( p2 );
		this.p3.set( p3 );
		/*this.uv1.set( uv1 );
		this.uv2.set( uv2 );
		this.uv3.set( uv3 );*/
		
		this.sortPoints( this.p1, this.p2, this.p3, this.uv1, this.uv2, this.uv3 );

		var midPoint = new Point2D( 
				this.p1.x + ( ( this.p2.y - this.p1.y ) / ( this.p3.y - this.p1.y ) ) * ( this.p3.x - this.p1.x ),
				this.p2.y
			);
		

		this.drawHalf2( this.p1, this.p2, midPoint, color );
		this.drawHalf2( this.p3, this.p2, midPoint, color );
		
		
		/*
		
		
		var line12		= Line.calculate( this.p1, this.p2 );
		var line13		= Line.calculate( this.p1, this.p3 );
		var line23		= Line.calculate( this.p2, this.p3 );
		
		// Convert UV 0..1 range to real texture coordinates
		this.uvMul.set( texture.getWidth() - 1, texture.getHeight() - 1, 1 );
		this.uv1.multiply( this.uvMul );
		this.uv2.multiply( this.uvMul );
		this.uv3.multiply( this.uvMul );
		
		this.uv1.round();
		this.uv2.round();
		this.uv3.round();
	
		this.interpolate( line12, this.uv1, this.uv2, this.uv12 );
		this.interpolate( line13, this.uv1, this.uv3, this.uv13 );
		this.interpolate( line23, this.uv2, this.uv3, this.uv23 );

		Line.step( line23 );
		
		this.uvLeft.set( this.uv1 );
		this.uvRight.set( this.uv1 );
		this.uvLeft2.set( this.uv2 );
		
	 	this.uvRight.add( this.uv13, true );
		 
		// this.uvLeft2.add( this.uv23, true );
		this.uvLeft2.add( this.uv23, true );
		
		// this.uvRight.add( this.uv13, true );
		// this.uvLeft.add( this.uv12, true );
		
		this.drawHalf( line12, line13, this.uvLeft, this.uvRight, this.uv12, this.uv13, texture, false );		
		this.drawHalf( line23, line13, this.uvLeft2, this.uvRight, this.uv23, this.uv13, texture, true );
		*/
	},
	
	
	drawHalf2 : function( p1, p2, p3, color )
	{
		var surface		= Draw.getSurface();
		var data		= surface.getData();
		
		var dxLeft		= Math.abs( ( p3.x - p1.x ) + 1 ) / ( Math.abs( p3.y - p1.y ) + 1 );
		var dxRight		= Math.abs( ( p2.x - p1.x ) + 1 ) / ( Math.abs( p2.y - p1.y ) + 1 );
		
		if( p3.x - p1.x < 0 )
			dxLeft = -dxLeft;
		
		if( p2.x - p1.x < 0 )
			dxRight = -dxRight;
		
		if( dxLeft > dxRight )
		{
			var tmp = dxLeft;
			dxLeft = dxRight;
			dxRight = tmp;
		}
		
		var minX = p1.x;
		var maxX = p1.x;
		
		var colR		= color.r;
		var colG		= color.g;
		var colB		= color.b;		

		var sy			= 1;
		
		if( p3.y < p1.y )
		{
			sy = -1;
		}
		
		var yMax		= Math.max( Math.round( p1.y ), Math.round( p3.y ) );
		var yMin		= Math.min( Math.round( p1.y ), Math.round( p3.y ) );
		
		
		for( var y = Math.round( p1.y ); ( y <= yMax ) && ( y >= yMin ); y += sy )
		{
			if( ( y >= 0 ) && ( y < surface.getHeight() ) )
			{
				var minPlotX = Math.round( minX );
				var maxPlotX = Math.round( maxX );
				
				if( 
					( minPlotX < surface.getWidth() ) && 
					( maxPlotX >= 0 )					
				)
				{
					if( minPlotX < 0 )
					{
						minPlotX -= minPlotX;
					}
					
					if( maxPlotX >= surface.getWidth() )
					{
						maxPlotX -= maxPlotX - ( surface.getWidth() - 1 );
					}					
					
					for( var x = minPlotX; x <= maxPlotX; x++ )
					{
						var ptr = ( y * surface.getWidth() + x ) * 4;

						data[ ptr++ ] = colR;
						data[ ptr++ ] = colG;
						data[ ptr++ ] = colB;

						ptr++;
					}	
				}
			}
			
			minX += dxLeft;
			maxX += dxRight;
		}		
	},
	
	
	
	interpolate : function( line, uv1, uv2, resultLine )
	{
	/*	this.pd.x = line.px2 - line.px1;
		this.pd.y = line.py2 - line.py1;

		this.ud.set( uv2 );
		this.ud.subtract( uv1 );

		resultLine.x = this.ud.x / this.pd.x * this.pd.x / ( this.pd.y );
		resultLine.y = this.ud.y / this.pd.y * this.pd.y / ( this.pd.y );
	*/	
		resultLine.x = ( uv2.x - uv1.x ) / ( line.dy * line.sy );
		resultLine.y = ( uv2.y - uv1.y ) / ( line.dy * line.sy );			
	},
	

	drawHalf : function( lineA, lineB, uvLeft, uvRight, uvAdderLeft, uvAdderRight, texture, secondHalf )
	{		
		var surface		= Draw.getSurface();
		var data		= surface.getData();
		var uvData		= texture.data;
				
		var width		= surface.getWidth();
		var height		= surface.getHeight();

		var uvWidth		= texture.getWidth();
		var uvHeight	= texture.getHeight();

		var y			= lineA.py1;		
		
		var maxX		= width;
		var minX		= 0;
				
		var ptr			= ( y * width + 1 ) << 2; // * 4
				

		while
		(
			( ( secondHalf === true ) && ( ( lineA.done !== true ) || ( lineB.done !== true ) ) ) ||
			( ( lineA.done !== true ) && ( lineB.done !== true ) )
		)
 		{
			Line.step( lineA );
			Line.step( lineB );
			
			minX = Math.max( 0, Math.min( lineA.lastPlotX, lineA.pxStart, lineB.lastPlotX, lineB.pxStart ) );

			ptr	+= ( width - maxX + minX - 1 ) << 2; // * 4
			
			maxX = Math.min( width - 1, Math.max( lineA.lastPlotX, lineA.pxStart, lineB.lastPlotX, lineB.pxStart ) );
						
			if( ( y >= 0 ) && ( y < height ) && ( minX <= maxX ) )
			{
				if( Math.min( lineA.lastPlotX, lineA.pxStart ) < Math.min( lineB.lastPlotX, lineB.pxStart ) )
				{
					this.uvSlider.set( uvRight );
					this.uvSlider.subtract( uvLeft, true );
					this.uvPos.set( uvLeft );
				}
				else
				{
					this.uvSlider.set( uvLeft );
					this.uvSlider.subtract( uvRight, true );
					this.uvPos.set( uvRight );
				}
				
				this.uvSlider.divideByVal( Math.abs( Math.max( maxX - minX + 1 ), 1 ), true );
				
				for( var x = minX; x <= maxX; x++ )
				{
					var uvPtr		= ( Math.round( this.uvPos.y ) * uvWidth + Math.round( this.uvPos.x ) ) << 2;
					
					data[ ptr++ ]	= uvData[ uvPtr ];
					data[ ptr++ ]	= uvData[ uvPtr + 1 ];
					data[ ptr++ ]	= uvData[ uvPtr + 2 ];
					
					ptr++;

					this.uvPos.add( this.uvSlider );
				}
			}
			else
			{
				ptr += ( maxX - minX + 1 ) << 2; // * 4 
			}
			

			uvLeft.add( uvAdderLeft, true );
			uvRight.add( uvAdderRight, true );
			
			y	+= lineA.sy;
		}
		
		uvLeft.subtract( uvAdderLeft, true );
	},
	
	
	sortPoints : function( p1, p2, p3, uv1, uv2, uv3 )
	{
		if( p3.y < p1.y )
		{
			p3.swap( p1 );
			uv3.swap( uv1 );
		}
		
		if( p2.y < p1.y )
		{
			p2.swap( p1 );
			uv2.swap( uv1 );
		}
		
		if( p3.y < p2.y )
		{
			p3.swap( p2 );
			uv3.swap( uv2 );
		}
	}
	
	
	
	
};


