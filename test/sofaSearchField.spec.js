'use strict';

describe('sofa.searchField', function () {

    var element, $compile, $rootScope;

    beforeEach(module('sofa.searchField'));

    beforeEach(inject(function (_$compile_, _$rootScope_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
    }));

    it('should render correctly', function () {
        $rootScope.placeholder = 'test';
        element = $compile('<sofa-search-field placeholder-text="placeholder"></sofa-search-field>')($rootScope);
        $rootScope.$digest();
        expect(element.find('i').length).toEqual(2);
        expect(element.find('input').length).toEqual(1);
        expect(element.find('input').attr('placeholder')).toEqual('test');
    });

    it('should show the clear button when it has a value', function () {
        $rootScope.model = '';
        element = $compile('<sofa-search-field ng-model="model"></sofa-search-field>')($rootScope);
        $rootScope.$digest();
        expect(element.find('i').eq(1).hasClass('ng-hide')).toEqual(true);
        element.find('input').val('test')
            .triggerHandler('input');
        expect(element.find('i').eq(1).hasClass('ng-hide')).toEqual(false);
    });

    it('should stay in sync with the model', function () {
        $rootScope.model = '';
        element = $compile('<sofa-search-field ng-model="model"></sofa-search-field>')($rootScope);
        $rootScope.$digest();
        element.find('input').val('test')
            .triggerHandler('input');
        expect($rootScope.model).toEqual('test');
        $rootScope.$apply('model = "hello"');
        expect(element.find('input').val()).toEqual('hello');
    });

    it('should clear the value when icon is clicked', function () {
        $rootScope.model = '';
        element = $compile('<sofa-search-field ng-model="model"></sofa-search-field>')($rootScope);
        $rootScope.$digest();
        element.find('input').val('test')
            .triggerHandler('input');
        element.find('i').eq(1).triggerHandler('click');
        expect($rootScope.model).toEqual('');
    });
});
