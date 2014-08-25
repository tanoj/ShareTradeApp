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
 * @ordersBarChartSvc service
 * This service has the implementation of d3 chart
 * @authors
 * Tanuj
 */
'use strict';
angular.module('shareTradeApp.services')
	.factory('ordersBarChartSvc', ['d3', '$', function(d3, $){

		var baseEl,
            count,
			placedColor = {'fill': '#FDBD5A'},
            executedColor = {'fill': '#FD8300'},
            quantityColor = {'fill': '#FFF4CE'},
			xAxisFill = {'fill': 'none', 'shape-rendering': 'crispEdges', 'stroke': '#000'},
			// textColor = {'fill': '#000000'},
			placedBars = {},
			executedBars = {},
			quantityBars = {},
			orderList = {},
			margin,
			width,
			height,
			x,
			y,
			color,
			xAxis,
			yAxis,
			svg,
			state,
			xx,
			xAx;
		var _draw  = function(DOMNode) {
			count = 0;
            baseEl = DOMNode;
			DOMNode.innerHTML = '';
			margin = {top: 40, right: 100, bottom: 30, left: 60};
			width = 80;
			height = 500 - margin.top - margin.bottom;
			x = d3.scale.linear().rangeRound([0, width]);
			y = d3.scale.linear();
			xx = d3.scale.linear().rangeRound([0, 600]);
			color = d3.scale.ordinal().range(['#a05d56', '#d0743c', '#ff8c00']);
			xAxis = d3.svg.axis().scale(xx).orient('top').tickFormat(d3.format('.0%'));
			yAxis = d3.svg.axis().scale(y).orient('left');
			svg = d3.select(DOMNode).append('svg')
			.attr({'width': width + 20 + '%',
					'height': 22,
					'class': 'barChartSVG'
				})
			.append('g')
			    .attr('transform', 'translate(' + margin.left +  ',' + margin.top + ')');

            svg.append('g').attr('class', 'x axis').call(xAxis);
			state = svg.selectAll('.state')
                        .append('g')
			            .attr({
                            'class': 'state',
                            'transform': function () {
                                return 'translate(0,0)';
                            }
                        });


            svg.append('text')
                .text('Order Id')
                .attr({
                    'transform': 'rotate(270)',
                    'class': 'yLabelDesktop',
                    'x': -100,
                    'y': -45
                });

			svg.append('text')
                .text('Order Id')
                .attr({
                    'transform':'rotate(0)',
                    'class': 'yLabelMobile',
                    'x': -35,
                    'y': -20
                });

			svg.append('text')
                .text('Total')
                .attr({
                    'class':'totalValues',
                    'x': width +4 +'%',
                    'y': 0
                });

			$('path', baseEl).remove();
			xAx = svg.append('g');
			xAx.append('rect')
			        .attr({
                        'y': -1,
                        'x':0,
                        'height': 1,
                        'width': '80%'
                    });

			xAx.append('rect')
                    .attr({
                        'y': -6,
                        'x': width/2 -0.5 + '%',
                        'height': 6,
                        'width': 0.5
                    });

			xAx.append('rect')
                .attr({
                    'y': -6,
                    'x': width + '%',
                    'height': 6,
                    'width': 0.5
                });

			// making the x-axis tick values responsive
			$('.tick>text').each(function (index, element) {
                var x;
                $(element).parent().attr('transform', 'translate(0, 0)');
				x = $(element).text().split('%')[0]/1.24 + '%';
				$(element).attr('x', x);
				if ($(element).text().split('%')[0] % 50 !== 0) {
                    $(element).text('');
                }
			});

			$('.axis path, .axis line').attr(xAxisFill);
		};

		// adding a new order to the bar td-bar-orders-bar-chart
		var _addRow = function(order) {
			var placed = order.quantityPlaced,
				executed = order.quantityExecuted,
                quantity = order.quantity,
				newOrder,
                count = _getCount();

			// applying validations
			if(placed > quantity || executed > quantity || executed > placed) {
				throw new Error('Total Orders cannot be less than Orders Placed or Executed.');
			}
			if(executed > placed) {
				throw new Error('Executed Orders cannot be greater than Orders Placed.');
			}

			if(!svg) {
				return 0;
			}

			newOrder = svg.append('g')
                        .attr({
                            class: 'orderBar bar-group',
                            transform:"translate(0, 15)"
                        });
                        //.html(barTemplate);

            quantityBars[order.id] = newOrder.append('rect')
                .attr({
                    'class':'bar bar-totalorder',
                    'actualValue': quantity,
                    'width': quantity*(x.range()[1]/quantity) + '%',
                    'height': 15
                })
                .attr(quantityColor);

            placedBars[order.id] = newOrder.append('rect')
                .attr({
                    'class': 'bar bar-placed',
                    'actualValue': placed,
                    'width': placed*(x.range()[1]/quantity) + '%',
                    'height': 15
                })
                .attr(placedColor);
            executedBars[order.id] = newOrder.append('rect')
                .attr({
                    'class': 'bar bar-executed',
                    'actualValue':executed,
                    'width': executed*(x.range()[1]/quantity) + '%',
                    height: 15
                })
                .attr(executedColor);

            newOrder.append('text')
                .attr({
                    'class':'bar-text-id',
                    'x':-12-3*('' + order.id + '').length*2,
                    'y': 12
                })
                .text(order.id);

            newOrder.append('text')
                .attr({
                    'class': 'bar-text-total',
                    'x': width + 6 - ('' + quantity+'').length*0.2 +'%',
                    'y': 10
                })
                .text(quantity);
            newOrder.append('rect')
                .attr({
                    'class': 'bar-connector',
                    'x':width + '%',
                    'height': 1,
                    'width': 7.5 + '%',
                    'y': 20
                })
                .attr(quantityColor);

			count++;
			orderList[order.id] = newOrder;

            _adjustBarHeight();
		};


		// updating a preexisting order bar
		var _updateRow = function (order) {
            var updatePlaced,
                updateExecuted,
                actualValue,
                index;

            if(!svg) {
				return 0;
			}
			updatePlaced = order.quantityPlaced,
			updateExecuted = order.quantityExecuted,
			index = order.id,
            actualValue = quantityBars[index].attr('actualValue');
			placedBars[index].attr('width', updatePlaced*(x.range()[1]/actualValue) + '%');
			executedBars[index].attr('width', updateExecuted*(x.range()[1]/actualValue) + '%');
		};

		var _getCount = function() {
			return svg.selectAll('g.orderBar')[0].length;
		};

		var _clearAllRows = function(){
			svg.selectAll('g.orderBar').remove();
		};

        var _adjustBarHeight = function(){
            var
                container = $('svg.barChartSVG'),
                totalHeight = $(window).height() - 200,
                numBars = _getCount(),
                barMinHeight = 15,
                availableHeight = totalHeight - 40,
                newBarHeight = availableHeight/ numBars;
            if(newBarHeight < barMinHeight) {
                newBarHeight = barMinHeight;
            }

            container.attr('height', 39+42+ (newBarHeight*numBars));
            svg.selectAll('g.bar-group').each(function(err, idx){
                var el = d3.select(this);
                el.attr({
                    transform: 'translate(0, ' + (idx*newBarHeight+3) + ')'
                });
                el.selectAll('rect.bar').attr({
                    height: newBarHeight-3
                })
                el.select('rect.bar-connector').attr({
                    y: newBarHeight - 4
                });

                el.selectAll('text')
                    .attr('style','font-size: 10px');
                if(newBarHeight-3 <= 15) {
                    el.selectAll('text')
                        .attr('style','font-size: 10px');
                }
            });
        };

		return {
			draw : _draw,
			addRow : _addRow,
			clearAllRows: _clearAllRows,
			updateRow : _updateRow,
            adjustBarHeight: _adjustBarHeight,
			p: placedBars,
			e: executedBars,
			q: quantityBars,
			o: orderList,
			orderCount: _getCount
		};
	}])
;