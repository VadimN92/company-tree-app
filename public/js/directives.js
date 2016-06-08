(function () {
    'use strict';
    var app = angular.module('app');

    app.directive('vnContainer', [function() {
        return {
            restrict: 'E',
            template: "<section id='container-list'><md-list><md-list-item ng-repeat='item in list'>{{item.name}}</md-list-item></md-list></section>",
            scope: {
                list: '=data'
            },
            link: function (scope, element, attrs) {
                    console.log(scope.list);
                    buildList(scope.list);
                    /*for(var index in scope.list) {
                        angular.element(".container-list").append("<vn-list item='scope.list[index]'></vn-list>")(scope);
                    }*/
                function buildList(objs) {
                }
            }
        };
    }]);

    app.directive("vnList", ["$mdDialog", function($mdDialog) {
        return {
            restrict: 'E',
            templateUrl: "templates/item.html",
            scope: {
                items: '=data'
            },
            link: function (scope, element, attrs) {
                scope.editCompany = editCompany;
                scope.deleteCompany = deleteCompany;

                function editCompany(obj) {
                    $mdDialog.show({
                        templateUrl: "templates/edit-company.html",
                        clickOutsideToClose: true,
                        preserveScope: true,
                        controller: function ($scope, $mdDialog, companyService) {
                            $scope.com = obj;
                            $scope.companiesList = [];
                            companyService.getListCompaniens(function(response) {
                                /* !!! check errors here !!!*/
                                $scope.companiesList = [].concat(response.data);
                            });
                            if(obj.parent_id == "false") {
                                $scope.com.radioTypeCompany = "mainCompany";
                            } else {
                                $scope.com.radioTypeCompany = "subsidiaryCompany";
                            }



                            $scope.update = function() {
                                var data = {
                                    id: $scope.com._id,
                                    name: $scope.com.name,
                                    annual: $scope.com.annual,
                                    parent_id:  $scope.com.parentCompany || false
                                };
                                console.log($scope.com.parentCompany);
                                console.log(data);
                                companyService.updateCompany(data, function(response) {
                                    console.log(response);

                                    $mdDialog.cancel();
                                    scope.$emit('myCustomEvent', 'Data to send');
                                });
                            }
                            $scope.closeDialog = function () {
                                $mdDialog.cancel();
                            };
                        }
                    });
                };

                function deleteCompany(id) {
                    /**/
                    $mdDialog.show({
                        templateUrl: "templates/delete-company.html",

                        clickOutsideToClose: true,
                        preserveScope: true,
                        controller: function ($scope, $mdDialog, companyService) {
                            $scope.closeDialog = function () {
                                $mdDialog.cancel();
                            };
                            $scope.yes = function() {
                                companyService.deleteCompany({"id": id}, function (response) {
                                    console.log(response);
                                    scope.$emit('myCustomEvent', 'Data to send');
                                    $mdDialog.cancel();
                                });
                            };
                        }
                    });
                }

            }
        };
    }]);
    
})();