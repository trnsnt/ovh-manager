import get from 'lodash/get';

import { BillingService } from '@ovh-ux/manager-models';

export default class {
  /* @ngInject */
  constructor($http, $translate, atInternet, Alerter) {
    this.$http = $http;
    this.$translate = $translate;
    this.atInternet = atInternet;
    this.Alerter = Alerter;
    this.isLoading = true;
  }

  $onInit() {
    this.billingService = new BillingService(this.service);

    this.model = {
      agreements: this.autorenewAgreements.length === 0,
    };

    return this.$http
      .get(`${get(this, 'billingService.route.url')}/serviceInfos`)
      .then(({ data }) => {
        this.billingService.possibleRenewPeriod = get(
          data,
          'possibleRenewPeriod',
        );
      })
      .finally(() => {
        this.isLoading = false;
      });
  }

  switchStep() {
    this.displayConfirmation = !this.displayConfirmation;
  }

  update() {
    this.isUpdating = true;
    return this.updateRenew(this.billingService, this.autorenewAgreements)
      .then(() =>
        this.goBack(
          this.$translate.instant('billing_autorenew_service_update_success'),
        ),
      )
      .catch((error) =>
        this.Alerter.set(
          'alert-danger',
          this.$translate.instant('billing_autorenew_service_update_error', {
            message: get(error, 'data.message'),
          }),
        ),
      )
      .finally(() => {
        this.isUpdating = false;
      });
  }

  onConfirmation() {
    this.atInternet.trackEvent({
      event: 'autorenew::validate-config',
      page: 'dedicated::account::billing::autorenew::validate-config',
      chapter1: 'dedicated',
      chapter2: 'account',
      chapter3: 'billing',
    });
  }

  onFinish() {
    this.atInternet.trackClick({
      name: 'autorenew::validate-config',
      type: 'action',
      chapter1: 'dedicated',
      chapter2: 'account',
      chapter3: 'billing',
    });
  }
}
