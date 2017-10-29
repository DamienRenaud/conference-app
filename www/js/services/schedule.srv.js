(() => {
    'use strict';

    angular.module('devfestApp').factory('ScheduleSrv', ScheduleSrv);

    function ScheduleSrv() {
        var service = {};

        service.findAll = function() {
            return window.fetch("https://raw.githubusercontent.com/DevInstitut/conference-data/master/schedule.json")
            .then(response => {
                return response.json();
            })
        };
        
        return service;
    }

})();