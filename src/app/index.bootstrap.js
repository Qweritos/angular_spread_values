'use strict';

// index.html page to dist folder
import '!!file-loader?name=[name].[ext]!../favicon.ico';

import '!!file-loader?name=api/mocks/[name].[ext]!../assets/mocks/data1.json';
import '!!file-loader?name=api/mocks/[name].[ext]!../assets/mocks/data2.json';

// vendor files
import "./index.vendor";

// main App module
import "./index.module";

import "../assets/styles/sass/index.scss";

angular.element(document).ready(() => {
  angular.bootstrap(document, ['AngularSpreadValues'], {
    strictDi: true
  });
});
