import angular from 'angular';
import 'angular-translate';
import '@ovh-ux/ui-kit';
import '@ovh-ux/manager-core';
import '@ovh-ux/ng-ovh-payment-method';
import '@ovh-ux/ng-translate-async-loader';

import component from './commitment-duration.component';
import utils from '../utils';

const moduleName = 'ovhManagerBillingCommitmentDuration';

angular
  .module(moduleName, [
    'ovhManagerCore',
    'oui',
    'pascalprecht.translate',
    'ui.router',
    'ngOvhPaymentMethod',
    'ngTranslateAsyncLoader',
    'ovhManagerCore',
    utils,
  ])
  .component('billingCommitmentDuration', component)
  .run(/* @ngTranslationsInject:json ./translations */);

export default moduleName;
