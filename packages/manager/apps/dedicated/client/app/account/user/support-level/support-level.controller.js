import {
  createSupportLevel,
  sortSupportLevels,
} from './support-level.constants';

export default class UserAccountSupportLevelCtrl {
  /* @ngInject */
  constructor($q, $http, $translate, constants, Alerter) {
    this.$q = $q;
    this.$http = $http;
    this.$translate = $translate;
    this.constants = constants;
    this.Alerter = Alerter;
    this.isLoading = false;
  }

  $onInit() {
    const { urls } = this.constants;
    const { isTrusted, ovhSubsidiary } = this.currentUser;

    this.isTrusted = isTrusted;
    this.ovhSubsidiary = ovhSubsidiary;

    this.supportLevels = this.supportLevelsEnum
      .map((level) => createSupportLevel({ level, urls, ovhSubsidiary }))
      .sort(sortSupportLevels)
      .filter((level) => this.isLevelActive(level))
      .filter(({ name }) => this.availability.features[`support:${name}`]);

    const supportLevelPricesToFetch = this.supportLevels.filter(
      ({ fetchPrice }) => fetchPrice,
    );

    if (supportLevelPricesToFetch.length) {
      const promises = supportLevelPricesToFetch.map(({ name }) =>
        this.$q
          .when({ data: `${name} pas cher` })
          // this.$http
          //   .get(`/todo/find/api/price/route/${name}`)
          .then(({ data: price }) => {
            this.supportLevels.find((sl) => sl.name === name).price = price;
          }),
      );
      this.isLoading = true;
      this.$q
        .all(promises)
        .catch((error) =>
          this.Alerter.error(
            this.$translate.instant(
              'user_account_support_level_section_error',
              { message: error.data?.message || error.message },
            ),
            'user_alerts_supportLevel',
          ),
        )
        .finally(() => {
          this.isLoading = false;
        });
    }
  }

  getRecommendedLevel() {
    return this.getHigherSupportLevels().find((level) =>
      level.isAvailable(this.ovhSubsidiary),
    )?.name;
  }

  isLevelActive(supportLevel) {
    if (
      this.partnerLevel.isAdvanced() ||
      this.supportLevel.isAdvancedPremium()
    ) {
      return this.supportLevel.isPremium()
        ? !supportLevel.isStandard()
        : !supportLevel.isPremium();
    }

    return !supportLevel.isAdvancedPremium();
  }

  hasCTA(supportLevel) {
    return this.getHigherSupportLevels().indexOf(supportLevel) > -1;
  }

  isCurrent(supportLevel) {
    return (
      supportLevel.name === this.supportLevel.level &&
      supportLevel.isAvailable(this.ovhSubsidiary)
    );
  }

  isRecommanded(supportLevel) {
    return (
      !this.partnerLevel.isActive() &&
      this.getRecommendedLevel() === supportLevel.name
    );
  }

  getHigherSupportLevels() {
    const currentLevelIndex = this.supportLevels.findIndex(
      ({ name }) => name === this.supportLevel.level,
    );
    return this.supportLevels
      .slice(currentLevelIndex + 1)
      .filter((level) => level.isAvailable(this.ovhSubsidiary));
  }
}
