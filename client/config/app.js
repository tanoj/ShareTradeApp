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
 * Application Entry Point
 *
 * @authors
 * Tanuj
 */
'use strict';

// Declare app level module which depends on sub modules, filters, and services
angular.module('shareTradeApp', [
    'ngRoute',
    'shareTradeApp.globals',
    'shareTradeApp.filters',
    'shareTradeApp.services',
    'shareTradeApp.directives',
    'shareTradeApp.controllers',
    'shareTradeApp.animations',
    'ui.bootstrap',
    'ngGrid',
    'infinite-scroll',
    'angularLocalStorage'
])
;

// Declare sub modules
angular.module('shareTradeApp.globals', ['ngAnimate'])
  .value('_', _)
  .value('$', jQuery)
  .value('socket', io.connect())
  .value('d3', d3);
angular.module('shareTradeApp.controllers',[]);
angular.module('shareTradeApp.services',[]);
angular.module('shareTradeApp.filters',[]);
angular.module('shareTradeApp.directives',[])
angular.module('shareTradeApp.animations',[]);