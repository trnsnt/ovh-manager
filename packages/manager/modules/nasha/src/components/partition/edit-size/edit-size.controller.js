import { SIZE_MIN } from '../partition.constants';

export default class NashaComponentsPartitionEditSizeController {
  /* @ngInject */
  constructor($translate, OvhApiDedicatedNasha) {
    this.$translate = $translate;
    this.OvhApiDedicatedNasha = OvhApiDedicatedNasha;

    this.isSubmitting = false;
    this.model = { size: null };
  }

  $onInit() {
    this.sizeMin = SIZE_MIN;
    this.sizeMax = this.nasha.zpoolSize;
    this.model.size = this.partition.size;
  }

  submit() {
    const { serviceName } = this.nasha;
    const { partitionName } = this.partition;
    const { size } = this.model;

    this.isSubmitting = true;

    this.OvhApiDedicatedNasha.Partition()
      .v6()
      .update({ serviceName }, { partitionName, size })
      .$promise.then(() =>
        this.close({
          success: this.$translate.instant(
            'nasha_components_partition_edit_size_success',
            { partitionName },
          ),
        }),
      )
      .catch((error) => this.dismiss({ error }));
  }
}
