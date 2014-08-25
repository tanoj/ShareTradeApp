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
 * @ordersFloatingBars directive
 * This directive displays the progress bars of the orders
 *
 * @authors
 * Tanuj
 */
'use strict';
angular.module('shareTradeApp.directives')
    .directive('ordersFloatingBars', [function () {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                orders: '=orders'
            },
            priority: 100,
            templateUrl: 'pages/orders/directives/orders-floating-bars/orders-floating-bars.html',
            link: function (scope) {
                scope.totalDisplayed = 0;

                // when The infinite scroll ['infinite-scroll'] event occurs,
                // We are increasing the total displayable items
                scope.loadMore = function(){
                    if(scope.totalDisplayed < scope.orders.length){
                        scope.totalDisplayed += 40;
                    }
                };
                scope.widthPercent = function(a,b){
                    return Math.round((a/b)*100);
                };

                scope.$parent.$watch('orders', function(){
                    scope.orders = scope.$parent.orders;
                    scope.totalDisplayed = 40;
                });
            }
        };
    }])
;