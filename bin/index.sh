#!/bin/bash	

_index_main() {
	cd src || return 1
	find ./lib -name '*.js' \
	| awk '
		{
			source = $0;
			module = $0;
			sub(/.*\//, "", module); 
			sub( /\.js$/, "", module );

			MODULES[ module ] = source;
		}
		END {
			for ( module in MODULES ) {
				source = MODULES[ module ];
				printf( "import %s from @%s@;\n", module, source );
			}

			c = " ";
			printf( "\nconst Rume4glo = {\n" );
			for ( module in MODULES ) {
				printf( "\t%s %s:%s\n", c, module, module );
				c = ",";
			}
			printf( "};\n\n" );

			printf( "export default Rume4glo;\n" );
		}
	' \
	| tr @ '"'
}

_index_main ${*}
