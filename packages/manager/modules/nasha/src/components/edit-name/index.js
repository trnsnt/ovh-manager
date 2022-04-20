import angular from 'angular';

import 'angular-translate';

import component from './edit-name.component';
import { mismatchDirective } from './edit-name.directives';

const moduleName = 'ovhManagerNashaComponentsEditName';

angular
  .module(moduleName, ['pascalprecht.translate'])
  .component('nashaComponentsEditName', component)
  .directive('mismatch', mismatchDirective)
  .run(/* @ngTranslationsInject:json ./translations */);

export default moduleName;
