(() => {
    'use strict';

    angular.module('devfestApp').factory('SpeakerSrv', SpeakerSrv);

    function SpeakerSrv() {

        var service = {};

        service.findAll = function () {
            return window.fetch("https://raw.githubusercontent.com/DevInstitut/conference-data/master/speakers.json")
                .then(response => {
                    return response.json();
                })
        };

        service.findById = function (speakerId) {
            return window.fetch("https://raw.githubusercontent.com/DevInstitut/conference-data/master/speakers.json")
                .then(response => {
                    return response.json().then(resAsJson => {
                        return resAsJson[speakerId];
                    })
                })
        };

        return service;
    }

})();