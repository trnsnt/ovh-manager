import angular from 'angular';

import 'angular-translate';
import '@ovh-ux/ui-kit';

import component from './create.component';

const moduleName = 'ovhManagerNashaComponentsPartitionCreate';

angular
  .module(moduleName, ['oui', 'pascalprecht.translate'])
  .component('nashaComponentsPartitionCreate', component)
  .run(/* @ngTranslationsInject:json ./translations */);

export default moduleName;
