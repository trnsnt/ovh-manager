import angular from 'angular';
import 'angular-translate';

import component from './mfa-enrollment.component';
import './mfa-enrollment.less';

const moduleName = 'ovhManagerMfaEnrollment';
let alreadyShowMFA = false;

angular
  .module(moduleName, ['pascalprecht.translate'])
  .component('mfaEnrollment', component)
  .run(/* @ngTranslationsInject:json ./translations */)
  .run(($q, $state, $location, OvhApiAuth) =>
    OvhApiAuth.v6()
      .shouldDisplayMFAEnrollment()
      .$promise.then((shouldDisplayMFA) => {
        const { voucher } = $location.search();

        if (
          !voucher &&
          !alreadyShowMFA &&
          ['true', 'forced'].includes(shouldDisplayMFA.value)
        ) {
          alreadyShowMFA = true;
          return $state.go('app.mfaEnrollment', {
            forced: shouldDisplayMFA.value === 'forced',
          });
        }

        return shouldDisplayMFA;
      })
      .catch(() => $q.resolve()),
  );

export default moduleName;
