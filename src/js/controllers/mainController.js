angular.module('TekoriusAngularSkeleton.controllers.Main', [])

.controller('MainController',
    function MainController($scope, $rootScope, $uibModal) {
        // Set page params
        $scope.pageTitle = 'Page';
        $scope.pageSubtitle = 'Subtitle';

        // Set alerts
        $scope.alerts = [
        ];

        $rootScope.alert = function(message, type, title) {
            //
        };

        /**
         * Show a confirmation message with OK and Cancel buttons
         * @param [message] {string} A message to be displayed in the modal
         * @param [type] {null|'success'|'primary'|'info'|'warning'|'danger'} Type of modal
         * @param [title] {string} Title to be displayed
         * @param [ok] {string|null} Text on ok button
         * @param [cancel] {string|null} Text to be displayed on cancel button
         * @param [closable] {boolean} Display close button?
         */
        $rootScope.confirm = function(message, type, title, ok, cancel, closable) {
            return $rootScope.dialog(
                message ? message : 'Do you want to continue?',
                type,
                title ? title : 'Please confirm',
                ok ? ok : 'Yes',
                null,
                cancel ? cancel : 'Cancel',
                closable
            );
        };

        $rootScope.prompt = function(message, type, title, yes, no, cancel, closable) {
            return $rootScope.dialog(
                message ? message : 'Are you sure?',
                type,
                title ? title : 'Please confirm',
                yes ? yes : 'Yes',
                no ? no : 'No',
                cancel ? cancel : 'Cancel',
                closable
            );
        };

        $rootScope.dialog = function(message, type, title, ok, no, cancel, closable) {
            var modal = $uibModal.open({
                templateUrl: 'message_modal.html',
                controller: 'MessageModalController'
            });

            modal.data = {
                message: message,
                title: title ? title : 'Attention!',
                type: type,
                ok: ok ? ok : 'OK',
                no: no ? no : null,
                cancel: cancel ? cancel : null,
                closable: closable ? closable : true
            };

            return modal.result;
        };

        $scope.test = function() {
            $rootScope.confirm('Patvirtink!').then(function() {
                $rootScope.prompt('Ivertink!').then(function() {
                    alert('yay');
                })
            })
        }
    })

.controller('MessageModalController',
    function MessageModalController($scope, $uibModalInstance) {
        $scope.data = $uibModalInstance.data;

        $scope.ok = function() {
            $uibModalInstance.close('ok');
        };

        $scope.no = function() {
            $uibModalInstance.close('no')
        };

        $scope.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        };
    })
;