// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js

function initWorker() {
  if (!('serviceWorker' in navigator)) {
    console.log('Service worker non supporté'); return;
  }
  navigator.serviceWorker.register('sw.js')
    .then(() => {
      console.log('Enregistrement OK');
    })
    .catch(error => {
      console.log('Enregistrement KO :', error);
    });
}

initWorker();

angular.module('devfestApp', ['ionic', 'ngCordova'])

  .run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }
    });
  })

  .config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

    $ionicConfigProvider.tabs.position('bottom');

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider

      // setup an abstract state for the tabs directive
      .state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: 'templates/tabs.html'
      })

      // Each tab has its own nav history stack:

      .state('tab.home', {
        url: '/home',
        views: {
          'tab-home': {
            templateUrl: 'templates/tab-home.html',
          }
        }
      })
      .state('tab.device', {
        url: '/device',
        views: {
          'tab-device': {
            templateUrl: 'templates/tab-device.html',
            controller: 'DeviceCtrl',
            controllerAs: 'vm'
          }
        }
      })

      .state('tab.sessions', {
        url: '/sessions',
        views: {
          'tab-sessions': {
            templateUrl: 'templates/tab-sessions.html',
            controller: 'SessionsCtrl',
            controllerAs: 'vm'
          }
        }
      })
      .state('tab.session-detail', {
        url: '/sessions/:sessionId',
        views: {
          'tab-sessions': {
            templateUrl: 'templates/session-detail.html',
            controller: 'SessionCtrl',
            controllerAs: 'vm'
          }
        }
      })
      .state('tab.notes-session', {
        url: '/sessions/:sessionId/note',
        views: {
          'tab-sessions': {
            templateUrl: 'templates/notes-session.html',
            controller: 'SessionCtrl',
            controllerAs: 'vm'
          }
        }
      })

      .state('tab.speakers', {
        url: '/speakers',
        views: {
          'tab-speakers': {
            templateUrl: 'templates/tab-speakers.html',
            controller: 'SpeakersCtrl',
            controllerAs: 'vm'
          }
        }
      })
      .state('tab.speaker-detail', {
        url: '/speakers/:speakerId',
        views: {
          'tab-speakers': {
            templateUrl: 'templates/speaker-detail.html',
            controller: 'SpeakerCtrl',
            controllerAs: 'vm'
          }
        }
      });


    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/tab/home');

  });
