define(function (require) {

	var Ractive  = require('Ractive'),
	    template = require('rv!./filter'),
	    R_tag    = require('components/tag')


	return Ractive.extend({
		isolated: true,
		template: template,
		components: {
			tagblock: R_tag
		}
	})

})