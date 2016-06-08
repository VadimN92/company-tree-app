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

    app.directive("vnList", ["companyService", function(companyService) {
        return {
            restrict: 'E',
            templateUrl: "templates/item.html",
            scope: {
                items: '=data'
            },
            link: function (scope, element, attrs) {
                scope.editCompany = editCompany;
                scope.deleteCompany = deleteCompany;

                function editCompany(id) {
                    alert("edit company " + id);
                };

                function deleteCompany(id) {
                    companyService.deleteCompany({"id": id}, function (response) {
                       console.log(response);
                    });
                }

            }
        };
    }]);
    
})();