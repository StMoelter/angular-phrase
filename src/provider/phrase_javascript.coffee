phrase = angular.module "phrase", ['pascalprecht.translate', 'ng']

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
