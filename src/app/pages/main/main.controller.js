'use strict';


class MainController {
    constructor($scope, $http) {
        'ngInject';


        $scope.data = [];


        $scope.sliderOptions =
            {
                floor: 0,
                ceil: 100,
                step: .01,
                precision: 2
            };

        $scope.loadDataset = (path) => {
            $http.get(path)
                 .then(function (resp) {
                    $scope.data = resp.data.Items;
                 });
        };


        /**
         * Counts total weight of all values
         * @returns {number}
         */
        function getTotalPercent() {
            let val = 0;
            for (let i in $scope.data) {
                val += $scope.data[i].Percent;
            }
            return val;
        }

        /**
         * Get lowest value from dataset
         * @param exclude - Exclude row with specified index
         * @returns {*}
         */
        function getIndexOfLowest(exclude = null) {

            if ($scope.data.length === 0) return null;

            let values = [...$scope.data];

            //if (exclude !== null) {
            values.splice(exclude, 1);
            //}

            values.sort((a, b) => {
                return a.Percent - b.Percent
            });

            return $scope.data.indexOf(values[0]);
        }

        /**
         * Get highest value from dataset
         * @param exclude - Exclude row with specified index
         * @returns {*}
         */
        function getIndexOfHighest(exclude = null) {

            if ($scope.data.length === 0) return null;

            let values = [...$scope.data];

            //if (exclude !== null) {
            values.splice(exclude, 1);
            //}

            values.sort((a, b) => {
                return b.Percent - a.Percent
            });

            return $scope.data.indexOf(values[0]);
        }

        /**
         * Called when input was changed
         * @param index
         */
        $scope.onItemChange = (index) => {

            let disparityVal = 100.00 - getTotalPercent();

            setTimeout(() => {
                if (disparityVal !== 0) {

                    $scope.$apply(() => {

                        if (disparityVal > 0) {
                            if (
                                $scope.data[getIndexOfLowest(index)].Percent + disparityVal <= 100 &&
                                $scope.data[getIndexOfLowest(index)].Percent + disparityVal >= 0
                            ) {
                                $scope.data[getIndexOfLowest(index)].Percent += disparityVal;
                            }
                        } else if (disparityVal < 0) {
                            if ($scope.data[getIndexOfHighest(index)].Percent + disparityVal <= 100 &&
                                $scope.data[getIndexOfHighest(index)].Percent + disparityVal >= 0

                            ) {
                                $scope.data[getIndexOfHighest(index)].Percent += disparityVal;
                            } else {
                                $scope.onItemChange(index + 1 > $scope.data.length ? 0 : index + 1);
                            }
                        }

                    });
                }
            }, 0);
        }

    }
}

export default MainController;
