define(  ['Ractive', 'rv!./tag-templates/list', 'rv!./tag-templates/boolean'],
function ( Ractive ,  listTemplate            ,  booleanTemplate            ) {

	var templates = {
		'list': listTemplate,
		'boolean': booleanTemplate
	};

	Ractive.components.tagvalueselect = Ractive.extend({
		template: '{{>innerTemplate}}',
		beforeInit: function (options) {
			var template = templates[options.data.tag.type];

			if (template) {
				options.partials.innerTemplate = template;
			} else {
				throw "Error at tagvalueselect component: Invalid tag type";
			}
		}
	});

});