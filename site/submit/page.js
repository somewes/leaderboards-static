define(['jquery', 'lodash', 'Ractive', 'rv!./template', 'leaderboards/api/games/sm64', 'leaderboards/api/platforms', 'components/tagvalueselect'], function ($, _, Ractive, template, game, platforms) {

	// TEMPORARY until tag types added to server
	_.each(game.tags, function (tag) {
		tag.type = 'list';
	});


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
		if (typeof input !== 'string') {
			return 0;
		}

		var ms = 0;

		var tomilliseconds = {
			'hours': function (s) { return (_.parseInt(s) || 0) * 60 * 60 * 1000; },
			'minutes': function (s) { return (_.parseInt(s) || 0) * 60 * 1000; },
			'seconds': function (s) { return (_.parseInt(s) || 0) * 1000; },
			'milliseconds': function (s) { return (_.parseInt(s) || 0); },
			'ms': function (s) { return (_.parseInt(s) || 0); }
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
						ms += (_.min(tomilliseconds, function (fn, key) {
							return levenshtein(key.substring(0, word.length), word.toLowerCase());
						}))(number);
					}
				});
			}
		}

		return ms;
	};

	var tags = _.clone(game.tags, true);

	var data = {
		_: _,
		game: game,
		platforms: _.filter(platforms, function (p) { return _.contains(game.platforms, p.id); }),
		// Selected values for submission
		timedtags: _.where(tags, {timed: true}),
		untimedtags: _.where(tags, {untimed: true}),
		time: null,
		platform: null
	};

	data.formatTime = function (time) {
		var hours = Math.floor(time / 1000 / 60 / 60);
		var minutes = Math.floor(time / 1000 / 60) % 60;
		var seconds = Math.floor(time / 1000) % 60;
		var milliseconds = time % 1000;

		return hours + 'h ' + minutes + 'm ' + seconds + 's ' + milliseconds + 'ms';
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

	ractive.on('submit', function (event) {
		event.original.preventDefault();

		ractive.set('info', 'Submitting...');

		$.post('/leaderboards/api/speedrun/', {
			user: 2,
			game: game.id,
			time: ractive.get('time'),
			video: ractive.get('video'),
			comments: ractive.get('comments'),
			tags: [],
			username: 'speedrunner',
			api_key: 'a87e33657f5f6796bb3a57ecc213f712edf02088'
		}).done(function (response) {
			ractive.set('info', 'Success!');
		}).fail(function (response) {
			ractive.set('info', 'Error: ' + JSON.stringify(response));
		});
	});
});
