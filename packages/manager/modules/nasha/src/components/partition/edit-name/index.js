import angular from 'angular';

import 'angular-translate';

import forbidDirectiveModule from '../../../directives/forbid';
import component from './edit-name.component';

const moduleName = 'ovhManagerNashaComponentsPartitionEditName';

angular
  .module(moduleName, ['pascalprecht.translate', forbidDirectiveModule])
  .component('nashaComponentsPartitionEditName', component)
  .run(/* @ngTranslationsInject:json ./translations */);

export default moduleName;
