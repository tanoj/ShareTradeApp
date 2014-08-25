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
 * @tdRepositorySvc Service
 * It communicates with the server through $http to get the data
 * @authors
 * Tanuj
 */
'use strict';
angular.module('shareTradeApp.services')
	.factory('tdRepositorySvc', ['$http', '$q', '_', function($http, $q, _){
		var _loggedInUser = null,
			_users = null,
			_instruments = null,
			_orders = null;
		
		this.getUsers = function(){
			var deferred = $q.defer();
			if(_users) {
				deferred.resolve(_users);
			} else {
				$http.get('/rest/users').then(function(response){
					_users = response.data;
					deferred.resolve(_users);
				});
			}
			return deferred.promise;
		};

		this.getInstruments = function(){
			var deferred = $q.defer();
			if(_instruments) {
				deferred.resolve(_instruments);
			} else {
				$http.get('/rest/instruments').then(function(response){
					_instruments = response.data;
					deferred.resolve(_instruments);
				});
			}
			
			return deferred.promise;
		};

		this.getOrders = function(newRequest){
			var deferred = $q.defer();
			if(_orders && !newRequest) {
				deferred.resolve(_orders);
			} else {
				$http.get('/rest/orders').then(function(response){
					_orders = response.data;
					deferred.resolve(_orders);
				});
			}
			return deferred.promise;
		};

		this.getLoggedInUser = function(){
			return _loggedInUser;
		};

		this.getUser = function(id) {
			var matchedUsers = _.filter(_users,{id : id});
			return (matchedUsers.length === 1) ? matchedUsers[0] : null;
		};

		this.setLoggedInUserById = function(userId) {
			_loggedInUser = this.getUser(userId);
		};

        this.setLoggedInUser = function(user) {
            _loggedInUser = user;
        };
		this.deleteAllOrders = function(){
			$http.delete('/rest/orders').then(function(response){
				if(response.data !== 'OK'){
					console.log('Failed to delete orders.');	
				}
			});
		};

		return this;
	}])
;