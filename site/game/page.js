define(function (require) {

	var _        = require('lodash'),
		moment   = require('moment'),
		Ractive  = require('Ractive'),
	    template = require('rv!./template'),
		game     = require('game'),
		R_tag    = require('components/tag'),
		R_run    = require('components/run')


	// Returns object with keys being the value of property 'prop' for each object in array
	function hashByProp(arrayOfObjects, prop) {
		return _.zipObject(_.pluck(arrayOfObjects, prop), arrayOfObjects)
	}


	function filterRun(filter, run) {
		console.log('[filterRuns]\nfilter: \n' + JSON.stringify(filter) + '\nrun:\n' + JSON.stringify(run));
	}


	function filterTag(filter, tag) {
		return _.map(_.intersection(filter.tagvalues, tag.tagvalues), function (id) { return game.tagvalues[id] })
	}


	var ractive = new Ractive({
		el: 'main',
		template: template,
		debug: true,
		data: {
			game: game,
			platforms: hashByProp(game.platforms, 'id'),
			tags: hashByProp(game.tags, 'id'),
			tagvalues: hashByProp(game.tagvalues, 'id'),

			_: _,
			filterRun: filterRun,
			filterTag: filterTag
		},
		components: {
			tagblock: R_tag,
			runblock: R_run
		}
	})

	ractive.on('change-filter-game', function (event) {
		ractive.set('filter', null)
	})

	ractive.on('change-filter', function (event, filterid) {
		var filter = _.findWhere(game.filters, { id: filterid })
		var tagblocks = _.map(game.tags, function (tag) {
			return {
				tag: tag,
				tagvalues: _.map(_.intersection(filter.tagvalues, tag.tagvalues), function (tagvalueid) {
					return _.findWhere(game.tagvalues, { id: tagvalueid })
				})
			}
		})

		ractive.set('filter', filter)
		ractive.set('tagblocks', tagblocks)
	})

})
