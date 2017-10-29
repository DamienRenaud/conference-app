(() => {
    'use strict';

    angular.module('devfestApp').controller('SpeakersCtrl', SpeakersCtrl);

    function SpeakersCtrl(SpeakerSrv, $scope) {
        var vm = this;
        
        init();

        function init() {
            SpeakerSrv.findAll().then(response => {
                $scope.$apply(() => {
                    vm.speakers = response;
                    console.log(vm.speakers)
                });
            })
        }
    }

})();