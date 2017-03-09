'use strict';

export default function routes($stateProvider) {
	'ngInject';

	$stateProvider.state('mngpropadd', {
		url: '/mngpropadd',
		template: '<mngpropadd></mngpropadd>'
	})
}