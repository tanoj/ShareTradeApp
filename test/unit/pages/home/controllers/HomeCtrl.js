
'use strict';
describe('Controller: HomeCtrl::', function () {
	var HomeCtrl,
		scope,
		RepositorySvc,
		$q,
		$rootScope;
	beforeEach(module('shareTradeApp'));
	beforeEach(inject(function ($controller, _$rootScope_, _$q_, _RepositorySvc_){
		$rootScope = _$rootScope_;
		scope = $rootScope.$new();
		RepositorySvc = _RepositorySvc_;
		$q = _$q_;
		HomeCtrl = $controller('HomeCtrl', {
			$scope: scope,
			RepositorySvc: RepositorySvc
		});
	}));
	describe('init()#', function () {
		it('method should be difined', function () {
			expect(scope.init).toBeDefined();
		});
		it('should call getUsers', function(){
			spyOn(scope, 'getUsers').andReturn(null);
			scope.init();
			expect(scope.getUsers).toHaveBeenCalled();
		});
	});
	describe('getUsers()#', function () {
		it('method should be difined', function () {
			expect(scope.getUsers).toBeDefined();
		});
		it('should fetch users from RepositorySvc ', function () {
			var deferred = $q.defer(),
				promise = deferred.promise,
				resolvedValue = [
									{name: 'user 1', id: '1'},
									{name: 'user 2', id: '2'}
								],
				resultingUsersPromise;

			spyOn(RepositorySvc, 'getUsers').andReturn(deferred.promise);
			resultingUsersPromise = scope.getUsers();
			deferred.resolve(resolvedValue);
			$rootScope.$apply();

			expect(RepositorySvc.getUsers).toHaveBeenCalled();
			expect(scope.users).toBe(resolvedValue);
		});
		it('should set the user value if users are available ', function () {
			var deferred = $q.defer(),
				promise = deferred.promise,
				resolvedValue = [
									{name: 'user 1', id: '1'},
									{name: 'user 2', id: '2'}
								],
				resultingUsersPromise;

			spyOn(RepositorySvc, 'getUsers').andReturn(deferred.promise);
			resultingUsersPromise = scope.getUsers();
			deferred.resolve(resolvedValue);
			$rootScope.$apply();
			expect(scope.user).toBe(resolvedValue[0].id);
		});
	});
	describe('login()#', function () {
		it('method should be difined', function () {
			expect(scope.login).toBeDefined();
		});
		it('should set the loggedin user when there user value is provided', function(){
			scope.user = 'uid1';
			spyOn(RepositorySvc, 'setloggedInUser').andReturn(null);
			scope.login();
			expect(RepositorySvc.setloggedInUser).toHaveBeenCalled();
		});
		it('should not set the loggedin user if the user value is not provided', function(){
			spyOn(RepositorySvc, 'setloggedInUser').andReturn(null);
			scope.login();
			expect(RepositorySvc.setloggedInUser).not.toHaveBeenCalled();
		});
		it('should redirect the page to ordertable page when the user value is provided', function(){
			scope.user = 'uid1';
			spyOn(RepositorySvc, 'setloggedInUser').andReturn(null);
			scope.login();
			expect(window.location.hash).toBe('#/orders');
		});
		it('should not redirect the page when the user value is not provided', function(){
			var preHash = window.location.hash;
			spyOn(RepositorySvc, 'setloggedInUser').andReturn(null);
			scope.login();
			expect(window.location.hash).toBe(preHash);
		});
	});
});