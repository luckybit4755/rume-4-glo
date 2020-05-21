import Utilo from './Utilo.js';

// like Vectoro, but uses array offsets, for the most part offsets should 
// be 0 == offset % 3
const Vertexo = {
	surfaceNormal:function( normals, vertices, n, i, j, k, tmp1, tmp2 ) {
		let v0 = Utilo.idk( tmp1, new Float32Array( 3 ) ); 
		let v1 = Utilo.idk( tmp2, new Float32Array( 3 ) );
		this.subtract( vertices, v0, i, j, 0 );
		this.subtract( vertices, v1, k, j, 0 );
		this.normalize( v0, v0, 0, 0 );
		this.normalize( v1, v1, 0, 0 );
		this.cross( v0, v1, normals, 0, 0, n );
	}
	, add:function( vertices, to, i, j, o ) {
		to[ o + 0 ] = vertices[ i + 0 ] + vertices[ j + 0 ];
		to[ o + 1 ] = vertices[ i + 1 ] + vertices[ j + 1 ];
		to[ o + 2 ] = vertices[ i + 2 ] + vertices[ j + 2 ];
	}
	, subtract:function( vertices, to, i, j, o ) {
		to[ o + 0 ] = vertices[ i + 0 ] - vertices[ j + 0 ];
		to[ o + 1 ] = vertices[ i + 1 ] - vertices[ j + 1 ];
		to[ o + 2 ] = vertices[ i + 2 ] - vertices[ j + 2 ];
	}
	/* safe for vertices == to */
	, normalize:function( vertices, to, i, o ) {
		let length = this.length( vertices, i );
		if ( 0 == length ) length = 1;
		to[ o + 0 ] = vertices[ i + 0 ] / length;
		to[ o + 1 ] = vertices[ i + 1 ] / length;
		to[ o + 2 ] = vertices[ i + 2 ] / length;
	}
	, length:function( vertices, i ) {
		return Math.sqrt( this.length2( vertices, i ) );
	}
	, length2:function( vertices, i ) {
		return (
			  vertices[ i + 0 ] * vertices[ i + 0 ] 
			+ vertices[ i + 1 ] * vertices[ i + 1 ] 
			+ vertices[ i + 2 ] * vertices[ i + 2 ] 
		);
	}
	, cross:function( v0, v1, normals, i, j, n ) {
		normals[ n + 0 ] = v0[ i + 1 ]*v1[ j + 2 ] - v0[ i + 2 ]*v1[ j + 1 ] // nx = v0.y * v1.z - v0.z * v1.y <-- xyzzy
		normals[ n + 1 ] = v0[ i + 2 ]*v1[ j + 0 ] - v0[ i + 0 ]*v1[ j + 2 ] // ny = v0.z * v1.x - v0.x * v1.z
		normals[ n + 2 ] = v0[ i + 0 ]*v1[ j + 1 ] - v0[ i + 1 ]*v1[ j + 0 ] // nz = v0.x * v1.y - v0.y * v1.x
	}
	, dot:function( v0, v1, i, j ) {
		return (
			  v0[ i + 0 ] * v1[ j + 0 ]
			+ v0[ i + 1 ] * v1[ j + 1 ]
			+ v0[ i + 2 ] * v1[ j + 2 ]
		)
	}
};

export default Vertexo;
