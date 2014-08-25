'use strict';
describe('Controller: OrderTableCtrl::', function () {
	var OrderTableCtrl,
		scope,
		RepositorySvc,
		SocketSvc,
		$modal,
		$q,
		$rootScope;
	beforeEach(module('shareTradeApp'));
	beforeEach(inject(function ($controller, _$rootScope_, _$q_, _RepositorySvc_, _SocketSvc_, _$modal_){
		$rootScope = _$rootScope_;
		scope = $rootScope.$new();
		RepositorySvc = _RepositorySvc_;
		SocketSvc = _SocketSvc_;
		$modal = _$modal_;
		$q = _$q_;
		OrderTableCtrl = $controller('OrderTableCtrl', {
			$scope: scope,
			RepositorySvc: RepositorySvc,
			SocketSvc: SocketSvc,
			$modal: $modal
		});
	}));
	describe('init()#', function () {
		it('method should be difined', function () {
			expect(scope.init).toBeDefined();
		});
		it('should refresh the orders\' list', function(){
			spyOn(scope, 'refresh');
			scope.init();
			expect(scope.refresh).toHaveBeenCalled();
		});
		it('should update the loggedin user', function(){
			spyOn(RepositorySvc, 'getLoggedInUser').andReturn('test');
			scope.init();
			expect(scope.loggedInUser).toBe('test');
		});
	});

	describe('switchToTabularView()#', function () {
		it('method should be difined', function () {
			expect(scope.switchToTabularView).toBeDefined();
		});
		it('should switch the views', function(){
			spyOn(RepositorySvc, 'getLoggedInUser');
			spyOn(scope, 'refresh');
			scope.init();
			scope.switchToTabularView();
			expect(scope.views.tabularView).toBeTruthy();
			expect(scope.views.graphView).toBeFalsy();
		});
	});
	describe('switchToGraphView()#', function () {
		it('method should be difined', function () {
			expect(scope.switchToGraphView).toBeDefined();
		});
		it('should switch the views', function(){
			spyOn(RepositorySvc, 'getLoggedInUser');
			spyOn(scope, 'refresh');
			scope.init();
			scope.switchToGraphView();
			expect(scope.views.tabularView).toBeFalsy();
			expect(scope.views.graphView).toBeTruthy();
		});
	});
	describe('refresh()#', function () {
		it('method should be difined', function () {
			expect(scope.refresh).toBeDefined();
		});
		it('should update the orders', function(){
			var deferred = $q.defer(),
				resolvedValue = [{name:'user 1', id:'1'}];
			spyOn(RepositorySvc, 'getOrders').andReturn(deferred.promise);
			deferred.resolve(resolvedValue);

			scope.refresh();
			expect(RepositorySvc.getOrders).toHaveBeenCalled();
			
		});
	});
	describe('createOrder()#', function () {
		it('method should be difined', function () {
			expect(scope.createOrder).toBeDefined();
		});
		it('should open the modal', function(){
			spyOn($modal, 'open');
			scope.createOrder();
			expect($modal.open).toHaveBeenCalled();
		});
	});
	describe('deleteAllOrders()#', function () {
		it('method should be difined', function () {
			expect(scope.deleteAllOrders).toBeDefined();
		});
		it('should call the RepositorySvc.deleteAllOrders', function(){
			spyOn(RepositorySvc, 'deleteAllOrders');
			scope.deleteAllOrders();
			expect(RepositorySvc.deleteAllOrders).toHaveBeenCalled();
		});
	});
	describe('Socket-Event Listeners', function () {
		var socket = io.connect();
		beforeEach(function(){
			spyOn(RepositorySvc, 'getLoggedInUser');
			spyOn(scope, 'refresh');
			scope.init();
		});
		it('should update the orders when new order been created', function(){
			var newOrder = {name: 'order 1', id: '1'};
			$rootScope.$apply();
			//socket.$emit('orderCreatedEvent', {orderId: 'n1', symbol: 'new'});
			// Todo: Find fix for : the context is not scope when the call back executes.
			//expect(scope.orders[0]).toEqual(newOrder);
		});
	});
});