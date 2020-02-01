#!/usr/bin/env node 

import fs from 'fs';
import path from 'path';

const make_test = function() {
	const self = this;

	self.main = function( args ) {
		let sources = self.findSources( args.slice() );
		for ( let i = 0 ; i < sources.length ; i++ ) {
			self.makeTest( sources[ i ] );
		}
	};

	self.findSources = function( directories ) {
		let sources = [];
		while ( directories.length ) {
			let directory = directories.pop();
			directory = directory.replace( /\/+$/, '' );

			let files = fs.readdirSync( directory );
			for ( let i = 0 ; i < files.length ; i++ ) {
				let file = directory + '/' + files[ i ];
				let stat = fs.statSync( file );
				if ( fs.statSync( file ).isDirectory() ) {
					directories.push( file );
				} else {
					sources.push( path.resolve( file ) );
				}
			}
		}
		return sources;
	};

	self.makeTest = function( source ) {
		let name = source.replace( /.*\//, '' ).replace( /\.[a-z]+/, '' );

		let cwd = process.cwd();
		let base = source.substr( cwd.length + 1 );
		let test = base.replace( /^[^\/]*\//, 'test/' ).replace( /(\.[a-z]+$)/, 'Test$1' );
		let testDirectory = test.replace( /\/[^\/]+$/, '' );

		if ( fs.existsSync( test ) ) {
			console.log( 'SKIPPING: ' + test );
			return;
		}


		// FIXME: should figure this out based on something or other...
		let toImport = '../' + base;

		import( toImport ).then( (mod)=>{
			if ( 'default' in mod ) mod = mod.default;
			self.makeModuleTest( mod, name, cwd, source, base, test, testDirectory )
		});
	}

	self.makeModuleTest = function( mod, name, cwd, source, base, test, testDirectory ) {
		let back = testDirectory.split( '/' ).length;
		let backed = '';
		for ( let i = 0 ; i < back ; i++ ) {
			backed += '../';
		}

		console.log( 'name: ' + name );

		let testCount = 0;
		let lines = [];
		lines.push( "import test from 'tape';" );
		lines.push( "import " + name + " from '" + backed + base + "';" );

		for ( let k in mod ) {
			let v = mod[ k ];
			console.log( k );
			if ( 'function' == typeof( v ) ) {
				testCount++;
				lines.push( "" );
				lines.push( "test.test('" + name + "." + k + " test', function (t) {" );
				lines.push( "\tt.plan( 1 );" );
				lines.push( "\tt.equals( 1, 1 );" );
				lines.push( "});" );
			}
		}

		if ( !testCount ) return;
		console.log( '-----' );
		console.log( 'cwd:  ' + cwd );
		console.log( 'src:  ' + source );
		console.log( 'base: ' + base );
		console.log( 'test: ' + test );
		console.log( 'tdir: ' + testDirectory );

		fs.mkdirSync( testDirectory, { recursive: true } );
		fs.writeFileSync( test, lines.join( '\n' ) + '\n' );
	}
};

new make_test().main( process.argv.slice( 2 ) );
