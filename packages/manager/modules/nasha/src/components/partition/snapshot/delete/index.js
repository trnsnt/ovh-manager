import angular from 'angular';

import 'angular-translate';
import '@ovh-ux/ui-kit';

import component from './delete.component';

const moduleName = 'ovhManagerNashaComponentsPartitionSnapshotDelete';

angular
  .module(moduleName, ['oui', 'pascalprecht.translate'])
  .component('nashaComponentsPartitionSnapshotDelete', component)
  .run(/* @ngTranslationsInject:json ./translations */);

export default moduleName;
