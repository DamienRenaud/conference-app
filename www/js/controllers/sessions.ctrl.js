(() => {
    'use strict';

    angular.module('devfestApp').controller('SessionsCtrl', SessionsCtrl);

    function SessionsCtrl(SessionSrv, $scope, ScheduleSrv) {
        var vm = this;

        vm.agenda = {};
        vm.displayedData = [];
        
        init();

        function init() {
            SessionSrv.findAll().then(response => {
                ScheduleSrv.findAll().then(sc => {
                    $scope.$apply(() => {
                        vm.agenda = sc;
                        vm.sessions = response;
                    });
                    vm.getDateSessions(vm.agenda[0]);
                })
                
            })
        }

        vm.getDateSessions = function(date) {
            vm.displayedData = [];
            date.timeslots.forEach(timeslot => {
                let displayedSessions = [];
                timeslot.sessions.forEach(session => {
                    displayedSessions.push(vm.sessions[session[0]]);                    
                })
                vm.displayedData.push({
                    startTime: timeslot.startTime,
                    endTime: timeslot.endTime,
                    sessions: displayedSessions
                })
            })
        }
    }

})();