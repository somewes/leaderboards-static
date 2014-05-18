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


	var data = {

		game: game,

		platforms: hashByProp(game.platforms, 'id'),

		tags: hashByProp(game.tags, 'id'),

		tagvalues: hashByProp(game.tagvalues, 'id'),

		filterRuns: function filterRuns(runs, filter) { // block filter
			if (!filter) {
				return
			}

			var tagblocks = _.filter(filter.tagblocks, function (tagblock) {
				return tagblock.tagvalues.length > 0
			})

			return _.filter(runs, function (run) {
				return _.all(tagblocks, function (tagblock) {
					var values = tagblock.tagvalues;
					return values.length > 0 && _.any(values, function (value) {
						return _.contains(run.tagvalues, value.id)
					})
				})
			})
		},

		limit: function limit(list, length) {
			return _.first(list, length)
		},

		filters: _.map(game.filters, function (filter) {
			return {
				id: filter.id,
				name: filter.name,
				tagblocks: _.map(game.tags, function (tag) {
					return {
						tag: tag,
						tagvalues: _.map(_.intersection(filter.tagvalues, tag.tagvalues), function (tagvalueid) {
							return _.findWhere(game.tagvalues, { id: tagvalueid })
						})
					}
				})
			}
		}),

		augmentedRuns: _.map(game.speedruns, function (run) {
			return _.assign(_.clone(run), {
				tagblocks: _.map(game.tags, function (tag) {
					return {
						tag: tag,
						tagvalues: _.map(_.intersection(run.tagvalues, tag.tagvalues), function (tagvalueid) {
							return _.findWhere(game.tagvalues, { id: tagvalueid })
						})
					}
				})
			})
		})
	}


	var components = {
		tagblock: R_tag,
		runblock: R_run
	}


	var ractive = new Ractive({
		el: 'main',
		template: template,
		debug: true,
		data: data,
		components: components
	})


	ractive.on('change-filter-game', function (event) {
		ractive.set('filter', undefined)
	})

	ractive.on('change-filter', function (event, filterid) {
		ractive.set('filter', _.findWhere(data.filters, { id: filterid }))
	})

})
