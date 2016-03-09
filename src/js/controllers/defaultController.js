angular.module('TekoriusAngularSkeleton')

.controller('DefaultController',
    function DefaultController($scope, $q, $timeout, Api) {
        $scope.loading = true;

        $scope.edit = function() {
            alert('edit');
        };

        $scope.refresh = function() {
            $scope.tableConfig.refresh();
        };

        $scope.tableConfig = {
            details: true,
            edit: $scope.edit,
            delete: true,
            buttons: true,
            //showLimit: true,
            //showSearch: true,
            responsive: true,
            endpoint: Api.default.list,
            loading: $scope.loading,
            columns: [
                { name: 'name', display: 'Vardas' },
                { name: 'id', display: 'Pavarde' },
                { name: 'sthg', display: 'Something' }
            ]

        }
    })
;