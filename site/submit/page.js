define(['lodash', 'Ractive', 'rv!./template', 'data/games/sm64', 'data/platforms'], function (_, Ractive, template, game, platforms) {

	var levenshtein = (function() {
	        var row2 = [];
	        return function(s1, s2) {
	            if (s1 === s2) {
	                return 0;
	            } else {
	                var s1_len = s1.length, s2_len = s2.length;
	                if (s1_len && s2_len) {
	                    var i1 = 0, i2 = 0, a, b, c, c2, row = row2;
	                    while (i1 < s1_len)
	                        row[i1] = ++i1;
	                    while (i2 < s2_len) {
	                        c2 = s2.charCodeAt(i2);
	                        a = i2;
	                        ++i2;
	                        b = i2;
	                        for (i1 = 0; i1 < s1_len; ++i1) {
	                            c = a + (s1.charCodeAt(i1) === c2 ? 0 : 1);
	                            a = row[i1];
	                            b = b < a ? (b < c ? b + 1 : c) : (a < c ? a + 1 : c);
	                            row[i1] = b;
	                        }
	                    }
	                    return b;
	                } else {
	                    return s1_len + s2_len;
	                }
	            }
	        };
	})();

	var parseTime = function (input) {
		if (typeof input !== 'string')
			return 0;

		var ms = 0;

		var tomilliseconds = {
			'hours': function (s) { return (_.parseInt(s) || 0) * 60 * 60 * 1000; },
			'minutes': function (s) { return (_.parseInt(s) || 0) * 60 * 1000; },
			'seconds': function (s) { return (_.parseInt(s) || 0) * 1000; },
			'milliseconds': function (s) { return (_.parseInt(s) || 0); }
		};

		var match = /^\s*((\d{1,2}):)?(\d{1,2})?:(\d\d)?(.(\d{1,3}))?\s*$/.exec(input);

		if (match) {
			ms += tomilliseconds.hours(match[2]);
			ms += tomilliseconds.minutes(match[3]);
			ms += tomilliseconds.seconds(match[4]);
			ms += tomilliseconds.milliseconds(match[6]);
		} else {
			var words = input.match(/([a-zA-Z]+)/g);
			var numbers = input.match(/\d+/g);

			if (words) {
				_.each(numbers, function (number, index) {
					var word = words[index];
					if (word) {
						word = word.toLowerCase();
						ms += (_.min(tomilliseconds, function (fn, key) {
							return levenshtein(key.substring(0, word.length), word);
						}))(number);
					}
				});
			}
		}

		return ms;
	};

	var data = {
		game: game,
		platforms: platforms,
		time: null
	};

	data.formatTime = function (time) {
		var hours = Math.floor(time / 1000 / 60 / 60);
		var minutes = Math.floor(time / 1000 / 60) % 60;
		var seconds = Math.floor(time / 1000) % 60;
		var milliseconds = time % 1000;

		return 'Hours: ' + hours + ', Minutes: ' + minutes + ', Seconds: ' + seconds + ', Milliseconds: ' + milliseconds;
	};

	var ractive = new Ractive({
		el: 'main',
		template: template,
		debug: true,
		data: data
	});

	ractive.observe('timeinput', function (timeinput) {
		ractive.set('time', parseTime(timeinput));
	});

});
