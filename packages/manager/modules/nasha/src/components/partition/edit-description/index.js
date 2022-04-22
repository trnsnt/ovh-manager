import angular from 'angular';

import 'angular-translate';

import forbidDirectiveModule from '../../../directives/forbid';
import component from './edit-description.component';

const moduleName = 'ovhManagerNashaComponentsPartitionEditDescription';

angular
  .module(moduleName, ['pascalprecht.translate', forbidDirectiveModule])
  .component('nashaComponentsPartitionEditDescription', component)
  .run(/* @ngTranslationsInject:json ./translations */);

export default moduleName;
