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
 * @ordersTableHeight directive
 * This directive calculates the available height in the view port
 *
 * @authors
 * Tanuj
 */
'use strict';
angular.module('shareTradeApp.directives')
    .directive('ordersTableHeight', ['$window', function ($window) {
        return {
            scope: {
                adjustingHeight : '=ordersTableHeight'
            },
            link: function(scope, iElement, iAttrs){
                var headerHeight = angular.element('header').height(),
                    controlsHeight = angular.element('[data-rel="trader-controls"]').height(),
                    existingElementsHeight = headerHeight + controlsHeight,
                    tableHeight;

                scope.adjustHeight = function(){
                    var viewPortHeight = angular.element($window).height(),
                        adjustingHeight = scope.adjustingHeight || 0;
                    if(viewPortHeight > existingElementsHeight){
                        tableHeight = viewPortHeight - existingElementsHeight + adjustingHeight;
                        iElement.height(tableHeight);
                    } else {
                        iElement.height(300);
                    }
                };

                // responding to the window resize event
                angular.element($window).bind('resize', function(){
                    scope.adjustHeight();
                });

                scope.adjustHeight();
            }
        }
    }])
;