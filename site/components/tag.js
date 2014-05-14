define(function (require) {

	var Ractive  = require('Ractive'),
	    template = require('rv!./tag')


	return Ractive.extend({
		isolated: true,
		template: template,
		debug: true
	})

})