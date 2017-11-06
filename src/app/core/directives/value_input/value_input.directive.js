'use strict';

export default function (app) {

    app.directive('appValueInput', appValueInputDirective);

    function appValueInputDirective() {
        'ngInject';

        return {
            restrict: 'E',
            link: linkFn,
            scope: {
                name: '=',
                percent: '=',
                sliderOptions: '=',
                onChange: '&'
            },
            template: `
        <div>
            <div class="col-sm-2">{{name}}</div>
            <div class="col-sm-8">
                <rzslider rz-slider-model="percent" rz-slider-options="sliderOptions"></rzslider>

                </div>
                <div class="col-sm-2">
                    <input type="text" class="form-control" ng-model="provedValue" ng-change="change()">
                </div>
        </div>
`
        };

        function linkFn(scope, elem, attrs, ngModelCtrl) {

            scope.provedValue = 0;

            scope.$watch('percent', () => {
                scope.provedValue = scope.percent;
                scope.onChange();
            });

            scope.change = () => {
                // Replace , to . and allow float value for input
                let filtredValue = scope.provedValue
                                        .replace(',', '.')
                                        .match(/\d+(\.\d{0,2})?/g);
                scope.provedValue = filtredValue ? filtredValue[0] : '0';
                // If we started input decimal part - then skip update
                if (scope.provedValue[scope.provedValue.length - 1] === '.') return;

                setTimeout(() => {
                    scope.$apply(() => {
                        scope.percent = Math.min(100, scope.provedValue);
                    });
                }, 100);
            };
        }
    }
}