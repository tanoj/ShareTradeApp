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
 * @MainCtrl controller
 * This controller holds the data of loggedIn user and shares across the child controllers.
 * @authors
 * Tanuj
 */

/*global
 window, angular
 */
'use strict';
angular.module('shareTradeApp.controllers')
	.controller('MainCtrl', ['$scope', '$location', 'storage', 'tdRepositorySvc', function($scope, $location, localStorage, RepositorySvc){
		$scope.init = function(){
            // Binding the loggedInUser to the local storage | using ['angularLocalStorage']
            localStorage.bind($scope,'loggedInUser',{defaultValue: undefined ,storeName: 'traderdesktop'});


            if($scope.loggedInUser === 'undefined' || $scope.loggedInUser === undefined){
                $scope.loggedInUser = undefined
            }
			if(!$scope.loggedInUser) {
                            // Redirecting to the Home page
				$location.path('/'); 
			} else {
                            
                RepositorySvc.setLoggedInUser($scope.loggedInUser); 
                $location.path('/orders');
            }
		};
		$scope.login = function(user){
			if(!user){
				alert('Please select a user');
				return;
			}
			$scope.loggedInUser = user;
                        // This information would be used by RepositorySvc while generating the trades
            RepositorySvc.setLoggedInUser($scope.loggedInUser); 
			$location.path('/orders');
		};
        $scope.logOut = function(){
            $scope.loggedInUser = '';
            // Redirecting to the Home page
            $location.path('/'); 
        };
	}])
;