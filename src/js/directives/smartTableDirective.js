angular.module('TekoriusAngularSkeleton')

.directive('smartTable',
    function SmartTableDirective() {
        return {
            restrict: 'E',
            templateUrl: 'list_table.html',
            scope: {
                //endpoint: '=api',
                result: '=',
                //loading: '=',
                config: '='
            },
            controller: ['$scope', '$rootScope',
                function SmartTableDirectiveController($scope, $rootScope) {

                    $scope.config.limit = $scope.config.limit || 10;
                    $scope.config.page = $scope.config.page || 1;
                    if(!$scope.config.limits) {
                        $scope.config.limits = [5, 10, 25, 100, 250];
                    }

                    $scope.details = function(item) {
                        if(typeof $scope.config.details === 'function') {
                            $scope.config.details(item);
                        }
                    };

                    $scope.edit = function(item) {
                        if(typeof $scope.config.edit === 'function') {
                            $scope.config.edit(item);
                        }
                    };

                    $scope.remove = function(item) {
                        if(typeof $scope.config.delete === 'function') {
                            $scope.config.delete(item);
                        }
                        else {
                            $rootScope.confirm().then(function(item) {
								$scope.config.deleteCallback(item);
							});
                        }
                    };

                    $scope.config.refresh = function() {
                        $scope.callServer();
                    };

                    $scope.callServer = function callServer(tableState, ctrl) {
                        if(!!ctrl && !$scope.tableCtrl) {
                            $scope.tableCtrl = ctrl;
                        }
                        if(!tableState && $scope.tableCtrl) {
                            $scope.tableCtrl.pipe();
                            return;
                        }

                        $scope.config.loading = true;
                        var pagination = tableState.pagination;

                        //var number = pagination.number || 10;
                        var number = $scope.config.limit || 10;
                        var start = (($scope.config.page || 1) - 1) * number;
                        var sort = tableState.sort.predicate;
                        if(sort) {
                            var orderBy = '{"' + sort + '":"' + (tableState.sort.reverse ? 'asc' : 'desc') + '"}';
                        }

                        $scope.config.endpoint({
                            q: $scope.config.search,
                            limit: number,
                            offset: start,
                            orderBy: orderBy
                        }).then(function(data) {
                            $scope.result = data.data;
                            tableState.pagination.numberOfPages = Math.ceil(data.data.count / number);
                            $scope.config.loading = false;
                            //$scope.$apply;
                        }, function(data) {
                            $scope.config.loading = false;
                        });
                    };

                }]
        }
    })
;