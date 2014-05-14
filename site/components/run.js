define(function (require) {

	var Ractive  = require('Ractive'),
	    template = require('rv!./run')


	// Returns duration string: "hh:mm:ss", "mm:ss" if no hours, ":ss" if no minutes
	function formatTime(milliseconds) {
		var duration = moment.duration(milliseconds)
		
		var hours = duration.hours()
		var minutes = duration.minutes()
		var seconds = duration.seconds()
		
		var t = ''
		
		if (hours) {
			t += hours + ':'
			
			if (minutes > 9) {
				t += minutes
			} else {
				t += '0' + minutes
			}
		} else {
			if (minutes > 9) {
				t += minutes
			} else if (minutes > 0) {
				t += '0' + minutes
			}
		}

		t += ':'
	
		if (seconds > 9) {
			t += seconds
		} else {
			t += '0' + seconds
		}
		
		return t
	}


	return Ractive.extend({
		isolated: true,
		template: template,
		debug: true,
		data: {
			formatTime: formatTime
		}
	})

})