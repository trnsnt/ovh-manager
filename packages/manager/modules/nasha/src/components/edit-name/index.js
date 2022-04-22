import angular from 'angular';

import 'angular-translate';

import forbidDirectiveModule from '../../directives/forbid';
import component from './edit-name.component';

const moduleName = 'ovhManagerNashaComponentsEditName';

angular
  .module(moduleName, ['pascalprecht.translate', forbidDirectiveModule])
  .component('nashaComponentsEditName', component)
  .run(/* @ngTranslationsInject:json ./translations */);

export default moduleName;
