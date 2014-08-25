/**
 * Copyright 2014 Archfirst
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Application Routing
 *
 * @authors
 * Tanuj
 */
'use strict';
angular.module('shareTradeApp')
	.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/home', {templateUrl: 'pages/home/partials/home-page.html', controller: 'HomePageCtrl'});
		$routeProvider.when('/orders', {templateUrl: 'pages/orders/partials/orders-page.html', controller: 'OrdersPageCtrl'});
		$routeProvider.otherwise({redirectTo: '/home'});
	}])
;