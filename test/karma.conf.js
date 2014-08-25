/*global
  module
*/
'use strict';
module.exports = function(config){
  config.set({

    basePath : '../',

    files : [
      'client/bower_components/jquery/dist/jquery.js',
      'client/bower_components/lodash/dist/lodash.js',
      'client/bower_components/d3/d3.js',
      'client/bower_components/angular/angular.js',
      'client/bower_components/angular-animate/angular-animate.js',
      'client/bower_components/angular-route/angular-route.js',
      'client/bower_components/angular-mocks/angular-mocks.js',
      'client/bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
      'node_modules/socket.io/node_modules/socket.io-client/dist/socket.io.js',
      'client/config/app.js',
      'client/pages/**/*.js',
      'client/common/**/*.js',
      'client/components/**/*.js',
      'test/unit/**/*.js'
    ],

    autoWatch : true,

    frameworks: ['jasmine'],

    browsers : ['Chrome'],

    plugins : [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-junit-reporter'
            ],

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }

  });
};
