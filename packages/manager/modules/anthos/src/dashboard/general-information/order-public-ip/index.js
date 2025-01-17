import angular from 'angular';
import '@uirouter/angularjs';
import 'oclazyload';

import '@ovh-ux/manager-core';

const moduleName = 'ovhManagerAnthosDashboardOrderPublicIpLazyloading';

angular.module(moduleName, ['ui.router', 'oc.lazyLoad']).config(
  /* @ngInject */ ($stateProvider) => {
    $stateProvider.state(
      'anthos.dashboard.general-information.order-public-ip.**',
      {
        url: '/order-public-ip',
        lazyLoad: ($transition$) => {
          const $ocLazyLoad = $transition$.injector().get('$ocLazyLoad');

          return import('./order-public-ip.module').then((mod) =>
            $ocLazyLoad.inject(mod.default || mod),
          );
        },
      },
    );
  },
);

export default moduleName;
