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
		},
		init: function () {
			var self = this
			self.on('toggle', function (event) {
				var tagvalue = event.context;
				var keypath = 'selectedvalues[' + tagvalue.id +']'
				var selected = self.get(keypath)
				self.set(keypath, selected ? undefined : tagvalue)
			})
		}
	})

})