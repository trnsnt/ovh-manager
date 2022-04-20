import { NAME_PATTERN } from './edit-name.constants';

export default class NashaComponentsEditNameController {
  /* @ngInject */
  constructor($scope, $translate, $http) {
    this.$scope = $scope;
    this.$translate = $translate;
    this.$http = $http;
    this.isSubmitting = false;
    this.model = { name: '' };
    this.namePattern = NAME_PATTERN;
  }

  $onInit() {
    this.model.name = this.nasha.customName;
  }

  submit() {
    const { name: customName } = this.model;
    const { serviceName } = this.nasha;
    this.isSubmitting = true;
    this.$http
      .put(`/dedicated/nasha/${serviceName}`, { customName })
      .then(() =>
        this.close({
          success: this.$translate.instant(
            'nasha_components_edit_name_success',
          ),
        }),
      )
      .catch((error) => this.dismiss({ error }));
  }
}
