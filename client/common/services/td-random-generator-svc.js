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
 * @tdRandomGeneratorSvc Service
 * This service generate the random values for a trade
 * @authors
 * Tanuj
 */

'use strict';
angular.module('shareTradeApp.services')
	.factory('tdRandomGeneratorSvc', ['_', 'tdRepositorySvc', function(_, RepositorySvc){
		var _quantity,
			_limitPrice,
			_side;
		var ins = null;
		
		RepositorySvc.getInstruments().then(function(instruments){
			ins = instruments;
		});

		this.sideGenerator = function(){
			var random = Math.random();
			if(random >= 0 && random <= 0.5){
				_side= 'Buy';
			}
			else{
				_side = 'Sell';
			}
			return _side;
		};

		this.quantityGenerator = function(){
			var random = Math.random();
			_quantity = Math.floor(random*100);
			if (_quantity === 0) {
				_quantity = 1;
			}
			return _quantity;
		};

		this.limitPriceGenerator = function(){
			var random = Math.random();
			_limitPrice = Math.floor(random*1000);
			return _limitPrice;
		};

		this.symbolGenerator = function (){
			var symbolArray = [],
				len,
				random,
				index,
				instruments = ins;
			_.each(instruments, function (ins) {
				symbolArray.push(ins);
			});
			len = symbolArray.length;
			random = Math.random();
			index = Math.round(random*(len-1));
			return symbolArray[index]['symbol'];
		};

		this.traderIdGenerator = function () {
			var _traderId;
			if(RepositorySvc.getLoggedInUser() === null){
				if (sessionStorage.getItem('store')) {
					_traderId = RepositorySvc.getUser(sessionStorage.getItem('store')).get('id');
				} else {
					_traderId = '-';
				}
            } else{
                _traderId = RepositorySvc.getLoggedInUser()['id'];
            }
			return _traderId;
		};
		return this;
	}])
;