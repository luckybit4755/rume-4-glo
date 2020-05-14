#!/bin/bash

#############################################################################
# 
# My sweetie like the webGL cube demo with the Opel logos, but wanted
# something he could share and use in forum posts which is not a good fit
# atm... Someday maybe
# 
# So... I dug up my ancient povray tricks to render some gifs at various
# resolutions.
# 
# Unfortunately, there's some angle where you can see thru the cube... 
# Someday...
# 
# @author Valerie GvM
# @date 2020-05-14
# 
#############################################################################

_opel_povray_main() {
	local size=${1-512}

	_opel_povray_ini > opel-povray.ini
	_opel_povray_pov > opel-povray.pov

	povray +ua -W${size} -H${size} opel-povray.ini \
	&& convert -loop 0 -alpha set -dispose previous opel-povray*png opel-povray-${size}.gif

	rm -f opel-povray*.png 

	ls ${PWD}/*gif
}

_opel_povray_pov() {
cat << POV
#include "colors.inc"

#declare image1 = "../images/cube-maps/opel/Opel1.jpg"
#declare image2 = "../images/cube-maps/opel/Opel2.jpg"
#declare image3 = "../images/cube-maps/opel/Opel3.jpg"
#declare image4 = "../images/cube-maps/opel/Opel4.jpg"
#declare image5 = "../images/cube-maps/opel/Opel5.jpg"
#declare image6 = "../images/cube-maps/opel/Opel6.jpg"

global_settings{
	noise_generator 3
	max_trace_level 4
}        

camera {
	right x
	location <0, 0, -20> 
	look_at <0,0,0>
}

light_source { <0, -40,-15> color White } 

box { 
	<-1, -1, -1>,< 1, 1, 1>
	// adapted from http://news.povray.org/povray.binaries.images/thread/%3Cweb.5a3fc73f52f18fa389df8d30%40news.povray.org%3E/
	texture{
		cubic
		/* RIGHT */ texture{pigment{image_map{jpeg image1 map_type 0 once } 
		rotate -90*y translate <0,-.5,-.5> scale 2}
		finish { phong 0 }}

		/* TOP   */ texture{pigment{image_map{jpeg image2 map_type 0 once } 
		rotate 90*x translate <-.5,0,-.5> scale 2}
		finish { phong 0 }}

		/* REAR  */ texture{pigment{image_map{jpeg image3 map_type 0 once } 
		scale <-1,1,1> translate <.5,-.5,0> scale 2}
		finish { phong 0 }}

		/* LEFT  */ texture{pigment{image_map{jpeg image4 map_type 0 once } 
		rotate 90*y translate <0,-.5,.5> scale 2}
		finish { phong 0 }}

		/* BOTTOM */ texture{pigment{image_map{jpeg image5 map_type 0 once } 
		rotate -90*x translate <-.5,0,.5> scale 2}
		finish { phong 0 }}

		/* FRONT  */ texture{pigment{image_map{jpeg image6 map_type 0 once } 
		translate <-.5,-.5,0> scale 2} 
		finish { phong 0 }} 
	}

 	scale < 5, 5, 5 >
	rotate < 360 * clock , 360 - 360 * clock , 360 * clock >
	translate< 0, 0, 0 >
}
POV
}

_opel_povray_ini() {
	local frames=${1-36}
cat << INI
+A +V +J

Antialias=On
Antialias_Threshold=0.2
Antialias_Depth=3

Input_File_Name="opel-povray.pov"

Initial_Frame=1
Final_Frame=${frames}
Initial_Clock=0
Final_Clock=1

Cyclic_Animation=on
Pause_when_Done=off
INI
}

_opel_povray_main ${*}
