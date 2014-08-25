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
 * @OrdersCreateTradesCtrl controller
 * This controller is used in a popup($modal)
 * Accepts a number as an input and generates the specified number of trades
 *
 * @authors
 * Tanuj
 */
'use strict';
angular.module('shareTradeApp.controllers')
	.controller('OrdersCreateTradesCtrl', ['$scope', '$http', '$modalInstance', 'tdRandomGeneratorSvc', function($scope, $http, $modalInstance, tdRandomGeneratorSvc){
		$scope.generateOrders = function (trades) {
			var randomVal = tdRandomGeneratorSvc,
				i,
				order,
				orderString,
				orders = [];
			for (i = 0; i < trades; i++) {
				order = {
					side: randomVal.sideGenerator(),
					symbol: randomVal.symbolGenerator(),
					quantity: randomVal.quantityGenerator(),
					limitPrice: randomVal.limitPriceGenerator(),
					traderId: randomVal.traderIdGenerator()
				};
				orderString = JSON.stringify(order);
				orders.push(orderString);
			}

            setTimeout(function(){
                for (var i = 0; i < orders.length; i++) {
                    $http.post('/rest/orders', orders[i]);
                }
            });
			return false;
		};

		$scope.createTrades = function (num) {
			if(!isNaN(num)) {
				num = Number(num);
				$scope.generateOrders(num);
				$modalInstance.close();
			}
		};

		$scope.cancel = function () {
			$modalInstance.dismiss('cancel');
		};
	}])
;