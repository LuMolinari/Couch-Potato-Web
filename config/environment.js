'use strict';

module.exports = function(environment) {
  let ENV = {
    firebase: {
      apiKey: "AIzaSyB2CVRnv_C2Ek8qwYLPAjahfBo6H2MhA9I",
      authDomain: "couchpotatoweb-29176.firebaseapp.com",
      databaseURL: "https://couchpotatoweb-29176.firebaseio.com",
      projectId: "couchpotatoweb-29176",
      storageBucket: "couchpotatoweb-29176.appspot.com",
      messagingSenderId: "1034655500544",
      appId: "1:1034655500544:web:a7067bfd390c21b3e54be5",
      measurementId: "G-YW8VFTJ576"
    },
    modulePrefix: 'couch-potato-web',
    environment,
    rootURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. EMBER_NATIVE_DECORATOR_SUPPORT: true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },
    torii: {
      sessionServiceName: 'session'
    },
    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV.APP.autoboot = false;
  }

  if (environment === 'production') {
    // here you can enable a production-specific feature
  }

    ENV.TMBD_ACCESS_TOKEN = '4517228c3cc695f9dfa1dcb4c4979152';

  return ENV;
};
