angular.module('TekoriusAngularSkeleton', [
    'ui.router',
    'ui.bootstrap',
    'wysiwyg.module',
    'TekoriusAngularSkeleton.controllers.Main',
    'TekoriusAngularSkeleton.controllers.Default',
    'TekoriusAngularSkeleton.directives.iCheck',
    'TekoriusAngularSkeleton.directives.SmartTable',
    'TekoriusAngularSkeleton.services.Api'
])

.run(function() {
        //
    })

.config(function($urlRouterProvider, $stateProvider, ApiProvider) {
        ApiProvider.rootUrl('http://127.0.0.1/crudgen/web/app_dev.php');

        $urlRouterProvider.otherwise('/default/');

        $stateProvider
            .state('root', {
                abstract: true,
                views: {
                    'root': {
                        templateUrl: 'root.html'
                    },
                    'header@root': {
                        templateUrl: 'header.html'
                    },
                    'sidebar@root': {
                        templateUrl: 'sidebar.html'
                    }
                }
            })

            .state('login', {
                url: '/login',
                views: {
                    'root': {
                        templateUrl: 'login.html'
                    }
                }
            })

            // === Default State ===
            .state('default', {
                parent: 'root',
                url: '/default',
                template: '<ui-view></ui-view>',
                ///templateUrl: 'default.html'
                abstract: true
            })

            .state('default.list', {
                url: '/',
                templateUrl: 'default_list.html',
                controller: 'DefaultController'
            })

            .state('components', {
                parent: 'root',
                url: '/components',
                templateUrl: 'components.html'
            })
        ;
    })
;