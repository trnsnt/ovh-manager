export default class BillingMainCtrl {
  /* @ngInject */
  constructor($translate, coreConfig, isPayAsYouGoAvailable) {
    this.$translate = $translate;
    this.coreConfig = coreConfig;
    this.isPayAsYouGoAvailable = isPayAsYouGoAvailable;
  }

  descriptionOfHeading() {
    const currentRegion = this.coreConfig.getRegion();
    const translateHeading = this.$translate.instant(
      `billing_main_description_${currentRegion}`,
    );
    return translateHeading !== `billing_main_description_${currentRegion}`
      ? translateHeading
      : this.$translate.instant('billing_main_description');
  }
}
