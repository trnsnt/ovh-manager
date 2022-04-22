import { NAME_PATTERN } from '../partition.constants';
import { TRANSLATE } from './edit-name.constants';

export default class NashaComponentsEditNameController {
  /* @ngInject */
  constructor($scope, $translate, $http) {
    this.$scope = $scope;
    this.$translate = $translate;
    this.$http = $http;
    this.isSubmitting = false;
    this.model = { name: '' };
    this.namePattern = NAME_PATTERN;
    this.forbid = '';
    this.forbidValues = [];
  }

  $onInit() {
    const { partitionName } = this.partition;
    this.model.name = partitionName;
    this.forbid = partitionName;
    this.forbidValues = this.partitionNames.filter(
      (partitionNameToForbid) => partitionNameToForbid !== partitionName,
    );
  }

  get forbidValuesMessage() {
    if (this.forbidValues.length > 1) {
      const names = this.forbidValues.join(', ');
      return this.$translate.instant(`${TRANSLATE}forbid_many`, { names });
    }

    if (this.forbidValues.length === 1) {
      const [name] = this.forbidValues;
      return this.$translate.instant(`${TRANSLATE}forbid_one`, { name });
    }

    return '';
  }

  submit() {
    const { name } = this.model;
    const { serviceName } = this.nasha;
    const { partitionName } = this.partition;

    this.isSubmitting = true;

    this.$http
      .put(`/dedicated/nasha/${serviceName}/partition/${partitionName}`, {
        partitionName: name,
      })
      .then(() =>
        this.close({
          success: this.$translate.instant(
            'nasha_components_partition_edit_name_success',
          ),
        }),
      )
      .catch((error) => this.dismiss({ error }));
  }
}
