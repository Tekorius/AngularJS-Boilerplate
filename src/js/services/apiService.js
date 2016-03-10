angular.module('TekoriusAngularSkeleton')

	.provider('Api', [ApiProvider]);

function ApiProvider() {
	var config = {
		rootUrl: null
	};

	this.rootUrl = function (url) {
		config.rootUrl = url;
	};

	this.$get = ['$http', '$q', '$state', '$rootScope', '$timeout', function ($http, $q, $state, $rootScope, $timeout) {
		return new ApiService($http, $q, $state, $rootScope, $timeout, config)
	}];
}

function ApiService($http, $q, $state, $rootScope, $timeout, config) {

	var svc = this;

	this.connectedUser = null;

	this.default = {
		list: function (filter) {
			return svc.call('/noobs', 'GET', filter, null, true);

			if (!filter) {
				filter = {
					limit: 10,
					offset: 0
				}
			}

			var q = $q.defer();

			$timeout(function () {
				var res = [];
				for (var i = 0; i < filter.limit && i < 69; i++) {
					res.push({name: 'Vardenis', surname: 'Pavardenis', sthg: 'kazkas'});
				}

				q.resolve({
					data: {
						count: 69,
						result: res
					}
				});
			}, 1000);

			return q.promise;

			// return svc.call('/items', 'GET', filter);
		}
	};

	/**
	 * Make a call to API endpoint
	 * @param {string} endpoint Endpoint to call
	 * @param {'GET'|'POST'|'PUT'|'DELETE'} method Method used to call an endpoint
	 * @param {object} [query] GET parameters attached to the url
	 * @param {object} [params] Request body sent to endpoint
	 * @param {boolean} [anonymous] Should we try to include connected user token
	 */
	this.call = function call(endpoint, method, query, params, anonymous) {

		// not connected
		if (!anonymous && !this.connectedUser) {
			var promise = $q.defer();
			promise.reject('Please login');
			return promise.promise;
		}

		var httpPromise = $http({
			url: config.rootUrl + endpoint + '',
			method: method,
			headers: {
				'X-AUTH-TOKEN': anonymous ? undefined : this.connectedUser.token
			},
			params: query,
			data: params
		});

		httpPromise.catch(function (response) {
			if (response.status == 400) {
				$rootScope.alert('Form error', 'danger');
			}
			// not logged in
			else if (response.status == 401) {
				alert('Please relog');
				svc.connectedUser = null;
				$state.go('login');
			}
			// not allowed
			else if (response.status == 403) {
				$rootScope.alert('This action is forbidden', 'danger');
			}
			// server error
			else if (response.status == 500) {
				if (response.data.error
					&& response.data.error.exception
					&& response.data.error.exception.length > 0
					&& response.data.error.exception[0].message) {
					var message = response.data.error.exception[0].message;
				}
				$rootScope.alert('Server error: ' + message, 'danger');
			}
		});

		return httpPromise;
	};

	this.upload = function upload(data, headers) {
		return function (file, xhr, formData) {
			var dt = data;
			if (typeof data === 'function') {
				dt = data();
			}

			_.forEach(dt, function (value, key) {
				if (typeof value !== 'undefined') {
					formData.append(key, value);
				}
			});

			xhr.setRequestHeader('X-AUTH-TOKEN', svc.connectedUser.token);
		}
	};

	this.url = function (endpoint, query) {
		var qp = '';
		_.forEach(query, function (value, key) {
			qp += encodeURIComponent(key) + '=' + encodeURIComponent(value);
		});
		return config.rootUrl + endpoint + (qp.length > 0 ? '?' + qp : '');
	};

	this.getRootUrl = function () {
		return config.rootUrl;
	}

}

;