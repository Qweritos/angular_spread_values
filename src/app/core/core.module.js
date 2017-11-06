'use strict';

const shared = angular.module('core.shared', []);

import constants from './services/constants';
import storeFactory from './services/store.factory';
import resolverProvider from './services/resolver.provider';

import valueInputDirective from './directives/value_input/value_input.directive';

valueInputDirective(shared);

constants(shared);
storeFactory(shared);
resolverProvider(shared);

export default shared;
