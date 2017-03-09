'use strict';

export default function routes($stateProvider) {
	'ngInject';

	$stateProvider.state('aboutme', {
		url: '/aboutme',
		template: '<aboutme></aboutme>'
	});
}