'use strict';

export default function routes($stateProvider) {
	'ngInject';

	$stateProvider.state('mngaboutme', {
		url: '/mngaboutme',
		template: '<mngaboutme></mngaboutme>'
	})
}