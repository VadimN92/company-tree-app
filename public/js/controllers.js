(function() {
    'use strict';
    var app = angular.module('app');

    app.controller('mainController', ["$scope", "$mdDialog", "companyService", function($scope, $mdDialog, companyService) {

        $scope.companies = [];
        $scope.hide = false;

        $scope.crateCompany = createCompany;

        $scope.getCompanies = getCompanies;

        function getCompanies() {
            companyService.getCompanies(function(response) {
                $scope.companies = [].concat(response.data);
                $scope.hide = true;
                console.log(response);
            });
        }


        function createCompany() {
            $mdDialog.show({
                templateUrl: "templates/create-company.html",
                openFrom: '#dialog',
                closeTo: '#dialog',
                scope: $scope,
                clickOutsideToClose: true,
                preserveScope: true,
                controller: function($scope, $mdDialog, companyService){
                    //$scope.companiesList = [];
                    companyService.getListCompaniens(function(response) {
                        /* !!! check errors here !!!*/
                        console.log('response');
                        console.log(typeof response.data);
                        console.log($scope.companiesList);
                        $scope.companiesList = [].concat(response.data);
                        console.log($scope.companiesList);
                        console.log(typeof $scope.companiesList);
                    });
                    $scope.createCompany = function() {
                        var data = {
                            name: $scope.com.nameCompany,
                            annual: $scope.com.annualEarnings,
                            companyType: {type: $scope.com.radioTypeCompany, parentId: $scope.com.parentCompany || false}
                        };
                        companyService.newCompany(data, function (response) {
                            /* !!! check errors here !!!*/
                            console.log(response);
                            $scope.getCompanies();
                            $mdDialog.cancel();
                            $scope.com = {};
                        });


                    };
                    $scope.closeDialog = function () {
                        $mdDialog.cancel();
                    };
                }
            });
        }

    }]);
})();