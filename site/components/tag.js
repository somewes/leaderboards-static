define(function (require) {

	var Ractive  = require('Ractive'),
	    template = require('rv!./tag'),
	    _        = require('lodash')


	return Ractive.extend({
		isolated: true,
		template: template,
		debug: true,
		data: {
			isEmpty: _.isEmpty
		}
	})

})