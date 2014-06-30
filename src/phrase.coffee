phrase = angular.module "phrase", ['pascalprecht.translate', 'ng']

phrase.value "phraseAuthToken", ""
phrase.value "phraseEnabled", true
phrase.value "phraseDecoratorPrefix", "{{__"
phrase.value "phraseDecoratorSuffix", "__}}"

phrase.config ["$provide", ($provide) ->
  $provide.decorator "$translate", ["$delegate", "phraseEnabled", "phraseDecoratorPrefix", "phraseDecoratorSuffix", ($translate, phraseEnabled, phraseDecoratorPrefix, phraseDecoratorSuffix) ->
    if phraseEnabled
      $translate._instant = $translate.instant
      $translate.instant = (translationId, interpolateParams, interpolationId) ->
        "#{phraseDecoratorPrefix}phrase_#{translationId}#{phraseDecoratorSuffix}"

    $translate
  ]
]

phrase.config ["$compileProvider", ($compileProvider) ->
  $compileProvider.directive 'translate', ["phraseEnabled", "phraseDecoratorPrefix", "phraseDecoratorSuffix",
    (phraseEnabled, phraseDecoratorPrefix, phraseDecoratorSuffix) ->

      if phraseEnabled
        return {
          priority: 1001,
          terminal: true,
          restrict: 'AE',
          scope: true,
          compile: (ele, attr) ->
            tString = ele.attr 'translate'
            newString = "" + phraseDecoratorPrefix + "phrase_" + tString + phraseDecoratorSuffix
            if attr.translateValues
              newString += " (" + attr.translateValues + ")"

            ele.html(newString);
            ele.removeAttr('translate')
        }
      else
        return {}
  ]
]
