'use strict';
describe('RepositorySvc', function () {
	var $httpBackend,
		$rootScope,
		RepositorySvc,
		url,$http;

	beforeEach(module('shareTradeApp'));
	beforeEach(inject(function (_$rootScope_, _$httpBackend_, _RepositorySvc_, _$http_) {
		RepositorySvc = _RepositorySvc_;
		$httpBackend = _$httpBackend_;
		$rootScope = _$rootScope_;
		$http = _$http_;
	}));

	afterEach(function () {
		$httpBackend.verifyNoOutstandingRequest();
		$httpBackend.verifyNoOutstandingExpectation();
	});

	describe('Method::getUsers()#', function () {
		var url = '/rest/users';
		it('getUsers() Method should be defined', function () {
			expect(RepositorySvc.getUsers).toBeDefined();
		});
		it('should make a GET request to the server.', function () {
			var	message = '';
			$httpBackend.whenGET(url).respond({message: 'Returning all users'});
			$httpBackend.expectGET(url);
			RepositorySvc.getUsers().then(function (response) {
				message = response.message;
			});
			$httpBackend.flush();
			expect(message).toBe('Returning all users');
		});
		it('should return the cached "users" when getUsers been called for the second time.', function(){
			// TODO : have to test multiple calls on $httpbackend
		});
	});
	describe('Method::getInstruments()#', function () {
		var url = '/rest/instruments';
		it('Method should be defined', function () {
			expect(RepositorySvc.getUsers).toBeDefined();
		});
		it('should make a GET request to the server.', function () {
			var	message = '';
			$httpBackend.whenGET(url).respond({message: 'Returning all instruments'});
			$httpBackend.expectGET(url);
			RepositorySvc.getInstruments().then(function (response) {
				message = response.message;
			});
			$httpBackend.flush();
			expect(message).toBe('Returning all instruments');
		});
		it('should return the cached "instruments" when getInstruments been called for the second time.', function(){
			// TODO : have to test multiple calls on $httpbackend
		});
	});
	describe('Method::getOrders()#', function () {
		var url = '/rest/orders';
		it('Method should be defined', function () {
			expect(RepositorySvc.getOrders).toBeDefined();
		});
		it('should make a GET request to the server.', function () {
			var	message = '';
			$httpBackend.whenGET(url).respond({message: 'Returning all orders'});
			$httpBackend.expectGET(url);
			RepositorySvc.getOrders().then(function (response) {
				message = response.message;
			});
			$httpBackend.flush();
			expect(message).toBe('Returning all orders');
		});
		it('should return the cached "orders" when getInstruments been called for the second time.', function(){
			// TODO : have to test multiple calls on $httpbackend
		});
	});
	describe('Method::deleteAllOrders()#', function () {
		var url = '/rest/orders';
		it('Method should be defined', function () {
			expect(RepositorySvc.deleteAllOrders).toBeDefined();
		});
		it('Method should call the backend', function(){
			$httpBackend.whenDELETE(url).respond('OK');
			$httpBackend.expectDELETE(url);
			RepositorySvc.deleteAllOrders();
			$httpBackend.flush();
		});
	});

	describe('Methods::get/setloggedInUser()#', function(){
		var users = [
						{name:'user 1', id: '1'},
						{name:'user 2', id: '2'}
					];

		it('should set and get the loggedinuser', function(){
			$httpBackend.whenGET('/rest/users').respond(users);
			RepositorySvc.getUsers();
			$httpBackend.flush();

			RepositorySvc.setloggedInUser('2');
			expect(RepositorySvc.getLoggedInUser().name).toBe(users[1].name);

			RepositorySvc.setloggedInUser('5'); // User is not there in the list
			expect(RepositorySvc.getLoggedInUser()).toBe(null);
		});
	});
});