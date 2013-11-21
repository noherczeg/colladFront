// Make sure to include the `ui.router` module as a dependency.
angular.module('myApp')
    .config(
        [          '$stateProvider', '$urlRouterProvider',
            function ($stateProvider,   $urlRouterProvider) {

                /////////////////////////////
                // Redirects and Otherwise //
                /////////////////////////////

                // Use $urlRouterProvider to configure any redirects (when) and invalid urls (otherwise).
                $urlRouterProvider
                    .when('/', '/esemenyek')

                    // If the url is ever invalid, e.g. '/asdf', then redirect to '/' aka the home state
                    .otherwise('/');


                //////////////////////////
                // State Configurations //
                //////////////////////////


                $stateProvider

                    .state("esemenyek", {
                        url: "/esemenyek",
                        templateUrl: 'app/partials/esemenyek.html'
                    })

                    .state('szemelyek', {

                        url: '/szemelyek',

                        templateUrl: 'app/partials/szemelyek.html',

                        // Use `resolve` to resolve any asynchronous controller dependencies
                        // *before* the controller is instantiated. In this case, since contacts
                        // returns a promise, the controller will wait until contacts.all() is
                        // resolved before instantiation. Non-promise return values are considered
                        // to be resolved immediately.
                        resolve: {
                            szemelyek: ['szemelyek',
                                function( szemelyek){
                                    return szemelyek.all();
                                }]
                        },

                        // You can pair a controller to your template. There *must* be a template to pair with.
                        controller: ['$scope', '$state', 'szemelyek', 'utils',
                            function (  $scope,   $state,   szemelyek,   utils) {

                                // Add a 'contacts' field in this abstract parent's scope, so that all
                                // child state views can access it in their scopes. Please note: scope
                                // inheritance is not due to nesting of states, but rather choosing to
                                // nest the templates of those states. It's normal scope inheritance.
                                $scope.szemelyek = szemelyek;

                                $scope.currentPage = 1; //current page
                                $scope.maxSize = 5; //pagination max size
                                $scope.entryLimit = 5; //max rows for data table

                                /* init pagination with $scope.list */
                                $scope.noOfPages = Math.ceil($scope.szemelyek.length/$scope.entryLimit);
                                $scope.setPage = function(pageNo) {
                                    $scope.currentPage = pageNo;
                                };

                                $scope.filter = function() {
                                    window.setTimeout(function() { //wait for 'filtered' to be changed
                                        /* change pagination with $scope.filtered */
                                        $scope.noOfPages = Math.ceil($scope.filtered.length/$scope.entryLimit);
                                    }, 10);
                                };

                                $scope.goToRandom = function () {
                                    var randId = utils.newRandomKey($scope.contacts, "id", $state.params.contactId);

                                    // $state.go() can be used as a high level convenience method
                                    // for activating a state programmatically.
                                    $state.go('contacts.detail', { contactId: randId });
                                };
                            }]
                    })

                    ///////////
                    // About //
                    ///////////

                    .state('about', {
                        url: '/about',

                        // Showing off how you could return a promise from templateProvider
                        templateProvider: ['$timeout',
                            function (        $timeout) {
                                return $timeout(function () {
                                    return '<p class="lead">UI-Router Resources</p><ul>' +
                                        '<li><a href="https://github.com/angular-ui/ui-router/tree/master/sample">Source for this Sample</a></li>' +
                                        '<li><a href="https://github.com/angular-ui/ui-router">Github Main Page</a></li>' +
                                        '<li><a href="https://github.com/angular-ui/ui-router#quick-start">Quick Start</a></li>' +
                                        '<li><a href="https://github.com/angular-ui/ui-router/wiki">In-Depth Guide</a></li>' +
                                        '<li><a href="https://github.com/angular-ui/ui-router/wiki/Quick-Reference">API Reference</a></li>' +
                                        '</ul>';
                                }, 100);
                            }]
                    })
            }]);