#!/bin/bash	

_minnow_main() {
	find src/lib -type f | xargs cat | _minnow_it
}

_minnow_it() {
	_minnow_commies \
	| _minnow_modless \
	| _minnow_spaceless 
}

_minnow_commies() {
	sed 's,/\*,☃&☃,g;s,\*/,☃&☃,' \
	| tr '☃' '\n' \
	| sed 's,//.*,,' \
	| awk '/\/\*/ { K = 1 } !K { print } /\*\// { K = 0 } ' 
}

_minnow_modless() {
	sed 's,^import .*,,;s,^export .*,,' 
}


_minnow_spaceless() {
	tr '\t' ' ' | sed -E 's,^ +,,;s, +, ,g;s, +$,,' \
	| sed 's, *\([[,{}()=!@<;>#?:+*/\-]\) *,\1,g;s, ],],g;' \
	| grep -v '^$' 
}

_minnow_main ${*}
