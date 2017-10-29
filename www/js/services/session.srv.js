(() => {
    'use strict';

    angular.module('devfestApp').factory('SessionSrv', SessionSrv);

    function SessionSrv() {
        var service = {};

        service.findAll = function() {
            return window.fetch("https://raw.githubusercontent.com/DevInstitut/conference-data/master/sessions.json")
            .then(response => {
                return response.json();
            })
        };

        service.findById = function(sessionId) {
            return window.fetch("https://raw.githubusercontent.com/DevInstitut/conference-data/master/sessions.json")
            .then(response => {
                return response.json().then(resAsJson => {
                    return resAsJson[sessionId];
                })
            })
        };

        service.findBySpeakerId = function(speakerId) {
            return window.fetch("https://raw.githubusercontent.com/DevInstitut/conference-data/master/sessions.json")
            .then(response => {
                return response.json().then(resAsJson => {
                    let speakerSessions = [];
                    for(let key in resAsJson) {
                        if(resAsJson[key].speakers && resAsJson[key].speakers.find(id => id == speakerId)) {
                            speakerSessions.push(resAsJson[key]);
                        }
                    }
                    return speakerSessions;
                })
            })
        };
        
        return service;
    }

})();