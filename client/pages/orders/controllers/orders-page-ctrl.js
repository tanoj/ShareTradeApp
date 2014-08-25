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
 * @OrdersPageCtrl controller
 *
 * @authors
 * Tanuj
 */
'use strict';
angular.module('shareTradeApp.controllers')
    .controller('OrdersPageCtrl', ['$scope', '$modal', '_', 'tdRepositorySvc', 'tdSocketSvc', function($scope, $modal, _, RepositorySvc, SocketSvc){

        // Handling socket events
        SocketSvc.on('orderCreatedEvent', function(newOrder){
            var order = _.filter($scope.orders, {id: newOrder.id});
            if(order.length === 0){ // Validating for not to add a duplicate order
                $scope.orders.push(newOrder);
            }
        }, $scope);

        SocketSvc.on('allOrdersDeletedEvent', function(){
            $scope.orders = [];
        }, $scope);

        SocketSvc.on('placementCreatedEvent', function(placement){
            var order = _.filter($scope.orders, {id: placement.orderId});

            if(order.length === 0) { return; }

            order = order[0];
            order.quantityPlaced += placement.quantityPlaced;
            order.status = placement.status;
        }, $scope);

        SocketSvc.on('executionCreatedEvent', function(execution){
            var order = _.filter($scope.orders, {id: execution.orderId});

            if(order.length === 0) { return; }

            order = order[0];
            order.quantityExecuted += execution.quantityExecuted;
            order.status = execution.status;
            order.executionPrice = execution.executionPrice;
        }, $scope);

        // Public Methods in the scope
        $scope.switchToView = function(viewName) {
            $scope.currentView = viewName;
        };

        $scope.refresh = function() {
            RepositorySvc.getOrders(true).then(function(orders){
                $scope.orders = orders;
            });
        };

        $scope.createOrder = function(){
            // opening the popup
            $modal.open({
                templateUrl: 'pages/orders/components/create-trades/orders-create-trades.html',
                controller: 'OrdersCreateTradesCtrl'
            });
        };

        $scope.deleteAllOrders = function() {
            RepositorySvc.deleteAllOrders();
        };

        // Init
        $scope.init = function(){
            $scope.switchToView('table');
            $scope.orders = [];
            $scope.refresh();
        };
    }])
;