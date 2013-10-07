
/**
 * @link http://en.wikipedia.org/wiki/3D_projection#Perspective_projection
 */

function Camera()
{
	this.position		= new Point3D( 0, 0, 0 );
	this.orientation	= new Vector3D( 0, 0, 100.0 );
	this.viewerPosition	= new Point3D( -320, -240, 200.0 );
}


Camera.prototype = {
	
	
	/**
	 * @param {Point3D[]} sourcePoints
	 * @param {Point3D[]} targetPoints
	 */
	
	transform : function( sourcePoints, targetPoints )
	{
		var camPos	= this.position;
		var l		= sourcePoints.length;
		
		var cosX	= Math.cos( this.orientation.x );
		var sinX	= Math.sin( this.orientation.x );
		
		var cosY	= Math.cos( this.orientation.y );
		var sinY	= Math.sin( this.orientation.y );
		
		var cosZ	= Math.cos( this.orientation.z );
		var sinZ	= Math.sin( this.orientation.z );	
		
		for( var i = 0; i < l; i++ )
		{
			var sourcePoint	= sourcePoints[ i ];
			var targetPoint	= targetPoints[ i ];			
			
			var sourceMinusCamX = sourcePoint.x - camPos.x;
			var sourceMinusCamY = sourcePoint.y - camPos.y;
			var sourceMinusCamZ = sourcePoint.z - camPos.z;
			
			var cosZSourceMinusCamX = cosZ * ( sourceMinusCamX );
			var sinZSourceMinusCamX = sinZ * ( sourceMinusCamX );
			
			var cosZSourceMinusCamY	= cosZ * ( sourceMinusCamY );
			var sinZSourceMinusCamY = sinZ * ( sourceMinusCamY );
			
			var cosYSourceMinusCamZ = cosY * ( sourceMinusCamZ );
			
			var sinYsinZcosZCamYCamX = sinY * ( sinZSourceMinusCamY + cosZSourceMinusCamX );
			
			
			targetPoint.x = cosZ *
					(
						sinZSourceMinusCamY + 
						cosZSourceMinusCamX 
					)
					-
					(
						sinY * sourceMinusCamZ
					);

			targetPoint.y = sinX *
					(
						cosYSourceMinusCamZ +
						sinYsinZcosZCamYCamX
					)
					+ 
					cosX *
					(
						cosZSourceMinusCamY -
						sinZSourceMinusCamX
					);

			targetPoint.z = cosX *
					(
						cosYSourceMinusCamZ +
						sinYsinZcosZCamYCamX
					)
					-
					sinX *
					(
						cosZSourceMinusCamY -
						sinZSourceMinusCamX
					);
		}
	},
	
	
	/**
	 * @param {Point3D[]} sourcePoints
	 * @param {Point2D[]} targetPoints
	 */
	
	project : function( sourcePoints, targetPoints )
	{
		var l				= sourcePoints.length;
		var viewerPosition	= this.viewerPosition;
		
		for( var i = 0; i < l; i++ )
		{
			var sourcePoint = sourcePoints[ i ];
			var targetPoint = targetPoints[ i ];
			var zDiv		= viewerPosition.z / sourcePoint.z;
			
			targetPoint.x	= zDiv * sourcePoint.x - viewerPosition.x;
			targetPoint.y	= zDiv * sourcePoint.y - viewerPosition.y;
		}
	},
	
	
	applyMatrix : function( matrix )
	{
		var cosX	= Math.cos( this.orientation.x );
		var sinX	= Math.sin( this.orientation.x );
		
		var cosY	= Math.cos( this.orientation.y );
		var sinY	= Math.sin( this.orientation.y );
		
		var cosZ	= Math.cos( this.orientation.z );
		var sinZ	= Math.sin( this.orientation.z );		
		
		var m1 = new Matrix( [
				[ 1, 0, 0 ],
				[ 0, cosX, -sinX ],
				[ 0, sinX, cosX ]
			] );
		
		var m2 = new Matrix( [
				[ cosY, 0, sinY ],
				[ 0, 1, 0 ],
				[ -sinY, 0, cosY ]
			] );
		
		var m3 = new Matrix( [
				[ cosZ, -sinZ, 0 ],
				[ sinZ, cosZ, 0 ],
				[ 0, 0, 1 ]
			] );
			
		var m1m2	= m1.multiplyMatrix( m2 );		
		var m1m2m3	= m1m2.multiplyMatrix( m3 );
	}
	
	
	
};
