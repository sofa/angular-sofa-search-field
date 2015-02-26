/**
 * angular-sofa-search-field - v0.1.0 - Thu Feb 26 2015 12:26:50 GMT+0100 (CET)
 * http://www.sofa.io
 *
 * Copyright (c) 2014 CouchCommerce GmbH (http://www.couchcommerce.com / http://www.sofa.io) and other contributors
 * THIS SOFTWARE CONTAINS COMPONENTS OF THE SOFA.IO COUCHCOMMERCE SDK (WWW.SOFA.IO)
 * IT IS PROVIDED UNDER THE LICENSE TERMS OF THE ATTACHED LICENSE.TXT.
 */
;(function (angular) {
angular.module('sofa-search-field.tpl.html', []).run(['$templateCache', function($templateCache) {
  $templateCache.put('sofa-search-field.tpl.html',
    '<span class="sofa-search-field">\n' +
    '    <i class="sofa-search-field__icon--label"></i>\n' +
    '    <input type="text" class="sofa-search-field__input" placeholder="{{ placeholderText }}"\n' +
    '           ng-model="_value" />\n' +
    '    <i class="sofa-search-field__icon--clear" ng-click="clearValue()" ng-show="hasValue()"></i>\n' +
    '</span>\n' +
    '');
}]);

/**
 * Creates a search field which offers some common usability features
 *
 * - shows a search-icon at the input field
 * - provides a clear-button for the input
 * - offers an interface to focus() the input field
 * - binds to a parent model
 * - optional placeholder-text
 *
*/
angular.module('sofa.searchField', [
    'sofa-search-field.tpl.html'
])
    .directive('sofaSearchField', function() {
        'use strict';

        return {
            restrict: 'E',
            replace: true,
            scope: {
                focus: '=',
                placeholderText: '=',
                _value: '=ngModel'
            },
            require: '?ngModel',
            templateUrl: 'sofa-search-field.tpl.html',
            link: function (scope, element, attrs) {

                var inputField  = element.find('input')[0];

                if (!attrs.ngModel) {
                    return;
                }

                scope.hasValue = function () {
                    return scope._value.length > 0;
                };

                scope.focusField = function () {
                    inputField.focus();
                };

                scope.clearValue = function () {
                    scope._value = '';
                    scope.focusField();
                };

                scope.$watch('focus', function (newValue) {
                    if (newValue) {
                        scope.focusField();
                    }
                });
            }
        };
    });
}(angular));
