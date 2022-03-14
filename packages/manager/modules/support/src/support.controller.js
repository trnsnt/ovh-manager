import { EVENT_NAMES } from './support.constants';

export default class {
  /* @ngInject */
  constructor($scope, $translate, coreConfig) {
    this.$scope = $scope;
    this.$translate = $translate;
    this.coreConfig = coreConfig;
  }

  $onInit() {
    this.$scope.$on(EVENT_NAMES.startLoading, () => this.startLoading());

    this.$scope.$on(EVENT_NAMES.stopLoading, () => this.stopLoading());
  }

  startLoading() {
    this.isLoading = true;
  }

  stopLoading() {
    this.isLoading = false;
  }

  descriptionOfHeading() {
    const currentRegion = this.coreConfig.getRegion();
    const translateHeading = this.$translate.instant(
      `ovhManagerSupport_description_${currentRegion}`,
    );
    return translateHeading !== `ovhManagerSupport_description_${currentRegion}`
      ? translateHeading
      : this.$translate.instant('ovhManagerSupport_description');
  }
}
