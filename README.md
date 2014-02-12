Conditionizr
============

IE11 Compatibily Mode CSS Conditional Comments Improvisor -  for testing older versions of IE in IE11.


##Usage

	<!--[if lt IE 8]><link rel="stylesheet" type="text/css" media="screen" href="css/ie7.css"  />< ![endif]-->

Becomes:

	Conditionizr.settings({
	  base:'css/',
		rules: {
			'lt': {
				version:    8,
				stylesheet: 'ie7.css',
				media: 'screen'
			}
		}
	});


##Options

	// prepend this string to stylesheets in rules 
	//(e.g a 'base' parameter of 'css/ie/' would turn a 'stylesheet' of 'ie7.css' into 'css/ie/ie7.css')
	base:       '',    
	
	// optional logging - false to turn off
	logging:	true,  
	
	// true for HTML5 Doctype - false currently only adds type="text/css" to stylesheets to adhere to non HTML5 Doctypes 
	html5:		true,  
	
	//true adds a console log entry when the browser isn't IE (useful to remind you to remove script in production)
	notIElog:   true,  
	
	//prepends console logs with this string
	logLabel:   'IE Compatibility Mode Conditional CSS: '



##Liscence

This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with this program. If not, see http://www.gnu.org/licenses/.
