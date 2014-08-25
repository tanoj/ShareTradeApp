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
 * @HomePageCtrl controller
 *
 * @authors
 * Tanuj
 */
'use strict';
angular.module('shareTradeApp.controllers')
	.controller('HomePageCtrl', ['$scope', '$location', 'tdRepositorySvc', function($scope, $location, RepositorySvc){
		$scope.users = [];

        /* Retrieving the list of users from Repository service */
		$scope.getUsers = function(){
			RepositorySvc.getUsers().then(function(users){
				$scope.users = users;
				if($scope.users.length >= 1) {
					$scope.user = $scope.users[0].id; // Making the first element as the default selected element
				}
			});
		};

		$scope.init = function(){
			$scope.getUsers();
		};
	}])
;