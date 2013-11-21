angular.module('myApp')

    .factory('szemelyek', ['$http', function ($http, utils) {
        var path = 'http://localhost/collad/public/v1/szemelyek';
        var szemelyek = $http.get(path).then(function (resp) {
            return resp.data.content;
        });

        var factory = {};
        factory.all = function () {
            return szemelyek;
        };
        factory.get = function (id) {
            return szemelyek.then(function () {
                return utils.findById(szemelyek, id);
            })
        };
        return factory;
    }])

    .factory('utils', function () {

        return {

            // Util for finding an object by its 'id' property among an array
            findById: function findById(a, id) {
                for (var i = 0; i < a.length; i++) {
                    if (a[i].id == id) return a[i];
                }
                return null;
            },

            // Util for returning a randomKey from a collection that also isn't the current key
            newRandomKey: function newRandomKey(coll, key, currentKey) {
                var randKey;
                do {
                    randKey = coll[Math.floor(coll.length * Math.random())][key];
                } while (randKey == currentKey);
                return randKey;
            }

        };

    });