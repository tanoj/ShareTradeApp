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
 * @tdShowChange directive
 * This directive takes a value(number), blinks a pipe when there is a change in the value
 * If the change in the value is a decrease, it blinks in red color
 * If the change in the value is an increase, it blinks in green color
 *
 * Dependencies: jQuery for animating the opacity
 * @Usage:
 * <td-show-change ng-model="order.quantityExecuted"></td-show-change>
 *
 * @authors
 * Tanuj
 */
'use strict';
angular.module('shareTradeApp.directives')
    .directive('tdShowChange', [function(){
        var template = '<span class="td-show-change-pipe" ng-class="animclass" >' +
                        '</span>';
        return {
            restrict: 'E',
            template: template,
            scope: {
                val: '=ngModel'
            },
            link: function (scope, iElement, iAttrs) {
                console.log('hyh');
                scope.animclass = '';
                scope.$watch('val', function(n,o){
                    scope.animclass = '';
                    if(typeof n === 'number'){
                        if(n > o) {
                            scope.up();
                        } else {
                            scope.down();
                        }
                    }
                });

                scope.up = function(){
                    scope.animclass = 'sc-up';
                    var el = iElement.find('.td-show-change-pipe');
                    el.stop().css('opacity',1).animate({opacity: 0},700);
                };
                scope.down =function(){
                    scope.animclass = 'sc-down';
                    var el = iElement.find('.td-show-change-pipe');
                    el.stop().css('opacity',1).animate({opacity: 0},700);
                };
            }
        };
    }])
;