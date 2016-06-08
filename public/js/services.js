(function() {
    'use strict';
    var app = angular.module('app');

    app.factory('companyService', ["$http", function($http) {
        return {
            getListCompaniens: function (callback) {
                $http.get('/api/getListCompanies')
                    .then(function success(res) {
                        callback(res);
                    }, function error(err) {
                        callback(err);
                    });
            },
            newCompany: function(data, callback) {
                $http.post('/api/newCompany', data)
                    .then(function success(res) {
                        callback(res);
                        console.log(res);
                    }, function error(err) {
                        callback(err);
                    });
            },
            getCompanies: function(callback) {
                $http.get('/api/getCompanies')
                    .then(function success(res) {
                        callback(res);
                    }, function error(err) {
                        callback(err);
                    });
            },
            deleteCompany: function (id, callback) {
                console.log(id);
                $http.post('/api/deleteCompany', id)
                    .then(function success(res) {
                        callback(res);
                    }, function error(err) {
                        callback(err);
                    });
            }
        }
    }]);
})();