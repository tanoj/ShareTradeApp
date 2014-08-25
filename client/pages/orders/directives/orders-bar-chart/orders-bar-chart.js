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
 * @ordersBarChart directive
 * This directive injects a d3 chart
 *
 * @Usage:
 * <orders-bar-chart orders="orders"></orders-bar-chart>
 *
 * @authors
 * Tanuj
 */
'use strict';
angular.module('shareTradeApp.directives')
   .directive('ordersBarChart', ['ordersBarChartSvc', function (d3chart) {
		return {
			restrict: 'EA',
			replace: true,
			scope: {
				orders: '=orders'
			},
			templateUrl: 'pages/orders/directives/orders-bar-chart/orders-bar-chart.html',
			link: function (scope, iElement, iAttrs) {

				d3chart.draw(angular.element('[data-d3holder="svg"]', iElement[0]).get(0));

				for (var i = scope.orders.length - 1; i >= 0; i--) {
					d3chart.addRow(scope.orders[i]);
				}

				scope.$watch('orders', function(n, o){
					if(n.length === 0) { // All rows been deleted
						d3chart.clearAllRows();
					} else if(n.length > o.length) { // New row been added
						d3chart.addRow(scope.orders[scope.orders.length-1]);
					} else { // A change occured in the property of an object
						for (var i = scope.orders.length - 1; i >= 0; i--) {
                            if(o[i] && !angular.equals(n[i], o[i])) {
                                d3chart.updateRow(scope.orders[i]);
                            }
						}
					}
				}, true);
			}
		};
	}])
;