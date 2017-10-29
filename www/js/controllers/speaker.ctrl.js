(() => {
    'use strict';

    angular.module('devfestApp').controller('SpeakerCtrl', SpeakerCtrl);

    function SpeakerCtrl(SpeakerSrv, SessionSrv, $scope, $stateParams, $cordovaContacts) {
        var vm = this;

        var speakerContact = {};


        init();

        function init() {
            let speakerId = $stateParams.speakerId;
            SpeakerSrv.findById(speakerId).then(speaker => {
                SessionSrv.findBySpeakerId(speakerId).then(sessions => {
                    $scope.$apply(() => {
                        vm.speakerSessions = sessions;
                        vm.speaker = speaker;
                        speakerContact = findContact();
                    });
                })
            });
        }

        function findContact() {
            var options = new ContactFindOptions();
            options.filter = vm.speaker.name;
            options.multiple = true;
            var fields = [navigator.contacts.fieldType.displayName, navigator.contacts.fieldType.name];
            return navigator.contacts.find(fields, contacts => {
                if (contacts.length > 0) {
                    vm.contactHasToBeSaved = true;
                    return contacts[0];
                }
                return null;
            }, contactError => {
                alert("Erreur durant la vérification du contact");
            }, options);
        }

        vm.manageContacts = function () {
            if (vm.contactHasToBeSaved) {
                let newContact = navigator.contacts.create();
                newContact.displayName = vm.speaker.name;
                newContact.name = vm.speaker.name;
                newContact.nickName = vm.speaker.name;

                $cordovaContacts.save(newContact).then(result => {
                    speakerContact = result;
                    alert("Contact sauvegardé");
                }, error => {
                    console.log(error);
                })
            } else {
                speakerContact.remove(() => {
                    alert('Contact supprimé');
                }, contactError => {
                    alert("Le contact n\'a pas pu être supprimé : " + contactError);
                })
            }
        }
    }

})();