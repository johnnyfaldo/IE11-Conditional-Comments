/*
 * Conditionizr - IE11 Compatibily Mode Conditional CSS Improvisor 
 * Author: John Faldo
 * 
 */

var Conditionizr = {
	
	isIE:false,
	
	version:null,
	
	init: function() {
		
		//get useragent string
		var ua = navigator.userAgent.toLowerCase();
		var which = (ua.indexOf('msie') != -1) ? parseInt(ua.split('msie')[1]) : false; //determine if IE and if so which version
		this.isIE    = (!which) ? false : true;  
		this.version = (!this.isIE) ? null : which;
				
	},
	
	//versions of IE supported in IE11 compatibility mode
	versions: [
		5,7,8,9,10,11
	],
	
	//add stylesheet to page
	include: function(css, media) {
		
		media = (media) ? media : 'screen';
			
	    var head = document.getElementsByTagName('head')[0],
	    	link = document.createElement("link");
		
		if(!this.options.html5) {
	    	link.setAttribute("type", "text/css");
	    }
	    
	    link.setAttribute("rel", "stylesheet");
	    link.setAttribute("href", this.options.base+css);
	    link.setAttribute("media", media);
	    head.appendChild(link);	
	    
	    //optionally log the file inclusion
		if(this.options.logging) {
			console.log(this.options.logLabel +' Included: '+this.options.base+css);
		}	
		
	},
	
    //conditional statements 
	logic: function() {
				
		return {						
			
			gte: function(version, css, media) {
				if(this.version >= version) {
				    this.include(css, media);
				}
			},
			
			gt: function(version, css, media) {
				if(this.version > version) {
					this.include(css, media);
				}	
			},
			
			lte: function(version, css, media) {
				if(this.version <= version) {
					this.include(css, media);
				}
			},
			
			lt: function(version, css, media) {
				if(this.version < version) {
					this.include(css, media);
				}
			}
			
		};
		
	},
	
	//application options
	options: {
		
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
		
	},
	
	//application is initiated when user applies their settings
	settings: function(settings) {
		
		this.init();
		
		//only run in IE 
		if(this.isIE) {

			//loop through users settings
			for(setting in settings) {
				
				//if we're looking at the rules object
				if(setting === 'rules'){
					
					var logic = this.logic(),
						rules = settings[setting];
										
					//loop through them
					for(rule in rules) {
						
						//get data 
						var current 	= rules[rule],
							version     = parseInt(current['version']),
							stylesheet  = current['stylesheet'],
							media       = (current['media']) ? current['media'] : null; 
							
						//invoke
						logic[rule].call(this, version, stylesheet, media);
						
					}
					
				}else {
					//not rules - if option exists overwrite with user defined parameter
					if(this.options.hasOwnProperty(setting)) {
						this.options[setting] = settings[setting];
					}
				}
							
			}
			
		}else {
			//not ie - optionally log this 
			if(this.options.notIElog) {
				console.log('IE Compatibility Mode Conditional CSS: Not IE Versions 5-10');
			}
		}
		
	}

};

