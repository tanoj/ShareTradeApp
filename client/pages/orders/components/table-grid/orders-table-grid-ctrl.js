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
 * @OrdersTableGridCtrl controller
 *
 * @authors
 * Tanuj
 */
'use strict';
angular.module('shareTradeApp.controllers')
    .controller('OrdersTableGridCtrl', ['$scope', function($scope){

        // when The infinite scroll ['infinite-scroll'] event occurs,
        // We are increasing the total displayable items
        $scope.loadMore = function(){
            if($scope.totalDisplayed < $scope.orders.length){
                $scope.totalDisplayed += 30;
            }
        };

        $scope.updateScrollOptions = function(){
            if($scope.orders.length === 0){ // All orders been deleted
                $scope.totalDisplayed= 30; // Resetting the default displayed items
            }
        };

        // Init
        $scope.init = function(){
            $scope.totalDisplayed = 0;
            $scope.orders = $scope.$parent.orders;

            // Syncing orders when there is a change in parent controller (OrdersPageCtrl)
            $scope.$watch('$parent.orders', function(){
                $scope.orders = $scope.$parent.orders;
                $scope.updateScrollOptions();
            });
        };
        $scope.init();
    }])
;