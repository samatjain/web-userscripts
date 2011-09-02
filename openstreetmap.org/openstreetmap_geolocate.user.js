// ==UserScript==
// @name           OpenStreetMap Geolocate
// @namespace      http://samat.org/
// @copyright      2010+, Samat Jain (http://samat.org)
// @version        1.0
// @description    Adds a "Geolocate me" button that centers the map to your current location as reported via HTML5 geolocation
// @include        http://www.openstreetmap.org/*
// @include        http://openstreetmap.org/*
// @license        GPL version 2 or any later version; http://www.gnu.org/copyleft/gpl.html

// ==/UserScript==

/*
Copyright (c) 2010 Samat Jain

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 2 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.

*/

/*
 * Changelog
 * 20100613 - v1.0 - First release uploaded to userscripts.org
 */

// Callback for successful geolocation
function success(position)
{
	// Reposition OpenLayers window to current location
	unsafeWindow.setPosition(position.coords.latitude, position.coords.longitude);
}

// Callback for unsuccessful geolocation
function error()
{
	unsafeWindow.alert("Sorry, unable to determine your location");
}

// Callback for "Geolocate me" click event
function geolocate()
{
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(success, error);
	} else {
		unsafeWindow.alert("Sorry, HTML 5 geolocation seems to be unsupported in your browser");
	}
}

// Create a "Geolocate me" link
var elmGeolocateMe = document.createElement('a');
elmGeolocateMe.href='javascript:void()';
elmGeolocateMe.addEventListener('click', geolocate, true);
elmGeolocateMe.appendChild(document.createTextNode('Geolocate me'));

// Position link on page
// NOTE: This could be better/more sophisticated
var elmSearchField = document.getElementById('search_field');
elmSearchField.parentNode.parentNode.insertBefore(elmGeolocateMe, elmSearchField.parentNode);


