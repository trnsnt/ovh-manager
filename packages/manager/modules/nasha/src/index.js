import angular from 'angular';

import '@uirouter/angularjs';
import '@ovh-ux/ng-ui-router-breadcrumb';

import { Task } from './nasha.constants';

import routing from './nasha.routing';

import directoryModule from './directory';
import newModule from './new';
import onboardingModule from './onboarding';
import dashboardModule from './dashboard';

const moduleName = 'ovhManagerNasha';

angular
  .module(moduleName, [
    'ui.router',
    'ngUiRouterBreadcrumb',
    directoryModule,
    newModule,
    onboardingModule,
    dashboardModule,
  ])
  .config(routing)
  .constant('NashaTask', Task)
  .run(/* @ngTranslationsInject:json ./translations */);

export default moduleName;
