'use strict';

export default function routes($stateProvider) {
	'ngInject';

	$stateProvider.state('list', {
		url: '/list?cat',
		template: '<list></list>'
	})
}