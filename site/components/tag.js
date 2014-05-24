define(function (require) {

	var Ractive  = require('Ractive'),
	    template = require('rv!./tag'),
	    _        = require('lodash')


	return Ractive.extend({
		isolated: true,
		template: template,
		debug: true,
		data: {
		},
		init: function () {
			var self = this
			self.on('toggle', function (event) {
				var tagvalue = event.context
				if (self.data.selectedvalues[tagvalue.id]) {
					delete self.data.selectedvalues[tagvalue.id]
				} else {
					self.data.selectedvalues[tagvalue.id] = tagvalue
				}
				self.update('selectedvalues')
			})
			_isEmpty: _.isEmpty
		}
	})

})