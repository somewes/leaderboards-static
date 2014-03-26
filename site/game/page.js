define(['lodash', 'moment', 'Ractive', 'rv!./template', 'data/games/sm64'], function (_, moment, Ractive, template, game) {
	var data = {
		_: _,
		game: game,
		filter: {}
	};

	data.formatTime = function (milliseconds) {
		var duration = moment.duration(milliseconds);
		
		var hours = duration.hours();
		var minutes = duration.minutes();
		var seconds = duration.seconds();
		
		var t = ''; // Return value: hh:mm:ss, mm:ss if no hours, :ss if no minutes
		
		if (hours) {
			t += hours + ':';
			
			if (minutes > 9) {
				t += minutes;
			} else {
				t += '0' + minutes;
			}
		} else {
			if (minutes > 9) {
				t += minutes;
			} else if (minutes > 0) {
				t += '0' + minutes;
			}
		}

		t += ':';
	
		if (seconds > 9) {
			t += seconds;
		} else {
			t += '0' + seconds;
		}
		
		return t;
	};

	data.filterRuns = function (_filter, runs) {
		var filter = function (combineFunc, filterSet) {
			if (_.size(filterSet) > 0) {
				runs = _.filter(runs, function (run) {
					return combineFunc(filterSet, function (value, tag) {
						return run.tags[tag] === value;
					});
				});
			}
		};
	
		filter(_.all, _filter.all);
		filter(_.any, _filter.any);
		filter(_.compose(function(f){return !f;}, _.all), _filter.not);
		return runs;
	};

	var ractive = new Ractive({
		el: 'main',
		template: template,
		data: data
	});


	ractive.on('change-filter', function (event, filter) {
		console.log('filter: ' + filter);
	});
});
