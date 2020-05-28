import Utilo from './Utilo.js';

// like Vectoro, but uses array offsets, for the most part offsets should 
// be 0 == offset % 3. arguments like v1, v2, v3 and to should be like:
// {v:[0.1,0.2,0.3],o:0} ... where "v" is the vertex data and "o" is the offset
// if the offset is undefined, it defaults to 0
const Vertexo = {
	surfaceNormal:function( v1, v2, v3, to, tmp1, tmp2 ) {
		tmp1 = Utilo.idk( tmp1, {v:new Float32Array( 3 )} ); 
		tmp2 = Utilo.idk( tmp2, {v:new Float32Array( 3 )} );
		this.subtract( v1, v2, tmp1 );
		this.subtract( v3, v2, tmp2 );
		this.normalize( tmp1 );
		this.normalize( tmp2 );
		this.cross( tmp1, tmp2, to );
	}
	, add:function( v1, v2, to ) {
		let i = Utilo.idk( v1.o, 0 );
		let j = Utilo.idk( v2.o, 0 );
		let k = Utilo.idk( to.o, 0 );
		to.v[ k + 0 ] = v1.v[ i + 0 ] + v2.v[ j + 0 ];
		to.v[ k + 1 ] = v1.v[ i + 1 ] + v2.v[ j + 1 ];
		to.v[ k + 2 ] = v1.v[ i + 2 ] + v2.v[ j + 2 ];
	}
	, subtract:function( v1, v2, to ) {
		let i = Utilo.idk( v1.o, 0 );
		let j = Utilo.idk( v2.o, 0 );
		let k = Utilo.idk( to.o, 0 );
		to.v[ k + 0 ] = v1.v[ i + 0 ] - v2.v[ j + 0 ];
		to.v[ k + 1 ] = v1.v[ i + 1 ] - v2.v[ j + 1 ];
		to.v[ k + 2 ] = v1.v[ i + 2 ] - v2.v[ j + 2 ];
	}
	, tween:function( time, v1, v2, to ) {
		let i = Utilo.idk( v1.o, 0 );
		let j = Utilo.idk( v2.o, 0 );
		let k = Utilo.idk( to.o, 0 );
		to.v[ k + 0 ] = v1.v[ i + 0 ] + time * ( v2.v[ j + 0 ] - v1.v[ i + 0 ] );
		to.v[ k + 1 ] = v1.v[ i + 1 ] + time * ( v2.v[ j + 1 ] - v1.v[ i + 1 ] );
		to.v[ k + 2 ] = v1.v[ i + 2 ] + time * ( v2.v[ j + 2 ] - v1.v[ i + 2 ] );
	}
	/* safe for vertices == to */
	, normalize:function( v1, to ) {
		let i = Utilo.idk( v1.o, 0 );
		to = Utilo.idk( to, v1 );
		let k = Utilo.idk( to.o, 0 );
		let length = this.length( v1 );
		if ( 0 == length ) length = 1;
		to.v[ k + 0 ] = v1.v[ i + 0 ] / length;
		to.v[ k + 1 ] = v1.v[ i + 1 ] / length;
		to.v[ k + 2 ] = v1.v[ i + 2 ] / length;
	}
	, length:function( v1 ) {
		return Math.sqrt( this.length2( v1 ) );
	}
	, length2:function( v1 ) {
		let i = Utilo.idk( v1.o, 0 );
		return (
			  v1.v[ i + 0 ] * v1.v[ i + 0 ] 
			+ v1.v[ i + 1 ] * v1.v[ i + 1 ] 
			+ v1.v[ i + 2 ] * v1.v[ i + 2 ] 
		);
	}
	, cross:function( v1, v2, to ) {
		let i = Utilo.idk( v1.o, 0 );
		let j = Utilo.idk( v2.o, 0 );
		let k = Utilo.idk( to.o, 0 );
		to.v[ k + 0 ] = v1.v[ i + 1 ]*v2.v[ j + 2 ] - v1.v[ i + 2 ]*v2.v[ j + 1 ];
		to.v[ k + 1 ] = v1.v[ i + 2 ]*v2.v[ j + 0 ] - v1.v[ i + 0 ]*v2.v[ j + 2 ];
		to.v[ k + 2 ] = v1.v[ i + 0 ]*v2.v[ j + 1 ] - v1.v[ i + 1 ]*v2.v[ j + 0 ];
	}
	, dot:function( v1, v2 ) {
		let i = Utilo.idk( v1.o, 0 );
		let j = Utilo.idk( v2.o, 0 );
		return (
			  v1.v[ i + 0 ] * v2.v[ j + 0 ]
			+ v1.v[ i + 1 ] * v2.v[ j + 1 ]
			+ v1.v[ i + 2 ] * v2.v[ j + 2 ]
		)
	}
};

export default Vertexo;
