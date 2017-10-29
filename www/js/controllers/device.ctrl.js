(() => {
    'use strict';

    angular.module('devfestApp').controller('DeviceCtrl', DeviceCtrl);

    function DeviceCtrl($stateParams, $scope, $cordovaDevice, $cordovaNetwork) {
        var vm = this;

        init();

        function init() {
            vm.device = $cordovaDevice.getDevice();
            vm.connection = $cordovaNetwork.getNetwork();
        }
    }

})();