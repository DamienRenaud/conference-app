(() => {
    'use strict';

    angular.module('devfestApp').controller('SessionCtrl', SessionCtrl);

    function SessionCtrl(SessionSrv, SpeakerSrv, $stateParams, $scope, $cordovaCamera, $cordovaActionSheet, $window, $document) {
        var vm = this;

        init();
        var cameraOptions = {
            quality: 100,
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: Camera.PictureSourceType.CAMERA,
            allowEdit: true,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 100,
            targetHeight: 100,
            saveToPhotoAlbum: false,
            correctOrientation: true
        };

        var actionSheetOptions = {
            title: 'What do you want with this image?',
            buttonLabels: ['Share via Facebook', 'Share via Twitter'],
            addCancelButtonWithLabel: 'Cancel',
            androidEnableCancelButton: true,
            winphoneEnableCancelButton: true,
            addDestructiveButtonWithLabel: 'Delete it'
        };


        vm.showSharingMenu = function () {
            document.addEventListener("deviceready", function () {
                $cordovaActionSheet.show(actionSheetOptions)
                    .then(function (btnIndex) {
                        var index = btnIndex;
                    });
            }, false);
        }



        function init() {
            let sessionId = $stateParams.sessionId;
            let speakers = [];
            SessionSrv.findById(sessionId).then(response => {
                getSessionNotes(response.id);
                if (response.speakers) {
                    response.speakers.forEach(speaker => {
                        SpeakerSrv.findById(speaker).then(sp => {
                            speakers.push(sp);
                            $scope.$apply(() => {
                                vm.session = response;
                                vm.speakers = speakers;
                            });
                        })
                    })
                }

                $scope.$apply(() => {
                    vm.session = response;
                    vm.speakers = speakers;
                });
            })
        }

        function getSessionNotes(sessionId){
            if($window.sessionStorage[sessionId]){
                vm.sessionNotes = JSON.parse($window.sessionStorage[sessionId]).sessionNotes;
            }
        }

        vm.saveNotes = function () {
            if(vm.sessionNotes && vm.sessionNotes != "") {
                let sessionId = vm.session.id;
                let savedNotes = {
                    sessionId: sessionId,
                    sessionNotes: vm.sessionNotes
                }
                $window.sessionStorage.setItem(sessionId, JSON.stringify(savedNotes));
            }
        }

        vm.getInstantPicture = function () {
            cameraOptions.sourceType = Camera.PictureSourceType.CAMERA;
            $cordovaCamera.getPicture(cameraOptions).then((imageData) => {
                var image = document.getElementById('sessionImage');
                image.src = "data:image/jpeg;base64," + imageData;
            })
        }

        vm.getLibraryPicture = function () {
            cameraOptions.sourceType = Camera.PictureSourceType.PHOTOLIBRARY;
            $cordovaCamera.getPicture(cameraOptions).then((imageData) => {
                var image = document.getElementById('sessionImage');
                image.src = "data:image/jpeg;base64," + imageData;
            })
        }
    }

})();