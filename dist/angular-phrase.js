(function() {
  var phrase;

  phrase = angular.module("phrase", ['pascalprecht.translate', 'ng']);

  phrase.value("phraseAuthToken", "");

  phrase.value("phraseEnabled", true);

  phrase.value("phraseDecoratorPrefix", "{{__");

  phrase.value("phraseDecoratorSuffix", "__}}");

  phrase.config([
    "$provide", function($provide) {
      return $provide.decorator("$translate", [
        "$delegate", "phraseEnabled", "phraseDecoratorPrefix", "phraseDecoratorSuffix", function($translate, phraseEnabled, phraseDecoratorPrefix, phraseDecoratorSuffix) {
          if (phraseEnabled) {
            $translate._instant = $translate.instant;
            $translate.instant = function(translationId, interpolateParams, interpolationId) {
              return "" + phraseDecoratorPrefix + "phrase_" + translationId + phraseDecoratorSuffix;
            };
          }
          return $translate;
        }
      ]);
    }
  ]);

}).call(this);

(function() {
  var phrase;

  phrase = angular.module("phrase", ['pascalprecht.translate', 'ng']);

  phrase.config([
    "$compileProvider", function($compileProvider) {
      return $compileProvider.directive('translate', [
        "phraseEnabled", "phraseDecoratorPrefix", "phraseDecoratorSuffix", function(phraseEnabled, phraseDecoratorPrefix, phraseDecoratorSuffix) {
          if (phraseEnabled) {
            return {
              priority: 1001,
              terminal: true,
              restrict: 'AE',
              scope: true,
              compile: function(ele, attr) {
                var newString, tString;
                tString = ele.attr('translate');
                newString = "" + phraseDecoratorPrefix + "phrase_" + tString + phraseDecoratorSuffix;
                if (attr.translateValues) {
                  newString += " (" + attr.translateValues + ")";
                }
                ele.html(newString);
                return ele.removeAttr('translate');
              }
            };
          } else {
            return {};
          }
        }
      ]);
    }
  ]);

}).call(this);

(function() {
  var phrase;

  phrase = angular.module("phrase");

  phrase.directive("phraseJavascript", [
    "phraseEnabled", "phraseAuthToken", "$window", function(phraseEnabled, phraseAuthToken, $window) {
      return {
        restrict: "EA",
        replace: true,
        link: function() {
          var url;
          if (phraseEnabled) {
            url = ['https://', 'phraseapp.com/assets/phrase/0.1/app.js?', new Date().getTime()].join('');
            $window.phrase_auth_token = phraseAuthToken;
            return $window.jQuery.getScript(url);
          }
        }
      };
    }
  ]);

}).call(this);
