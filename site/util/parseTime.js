define(function (require) {
	
	var levenshtein = require('levenshtein')

	return function (input) {
		if (typeof input !== 'string') {
			return 0
		}

		var ms = 0

		var tomilliseconds = {
			'hours': function (s) { return (_.parseInt(s) || 0) * 60 * 60 * 1000 },
			'minutes': function (s) { return (_.parseInt(s) || 0) * 60 * 1000 },
			'seconds': function (s) { return (_.parseInt(s) || 0) * 1000 },
			'milliseconds': function (s) { return (_.parseInt(s) || 0) },
			'ms': function (s) { return (_.parseInt(s) || 0) }
		};

		var match = /^\s*((\d{1,2}):)?(\d{1,2})?:(\d\d)?(.(\d{1,3}))?\s*$/.exec(input)

		if (match) {
			ms += tomilliseconds.hours(match[2]);
			ms += tomilliseconds.minutes(match[3]);
			ms += tomilliseconds.seconds(match[4]);
			ms += tomilliseconds.milliseconds(match[6]);
		} else {
			var words = input.match(/([a-zA-Z]+)/g)
			var numbers = input.match(/\d+/g)

			if (words) {
				_.each(numbers, function (number, index) {
					var word = words[index]
					if (word) {
						ms += (_.min(tomilliseconds, function (fn, key) {
							return levenshtein(key.substring(0, word.length), word.toLowerCase())
						}))(number)
					}
				})
			}
		}

		return ms
	}

})
