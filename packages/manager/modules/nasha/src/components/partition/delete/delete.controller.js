export default class NashaComponentsPartitionDeleteController {
  /* @ngInject */
  constructor($translate, OvhApiDedicatedNasha) {
    this.$translate = $translate;
    this.OvhApiDedicatedNasha = OvhApiDedicatedNasha;
    this.isDeleting = false;
  }

  submit() {
    const { serviceName } = this.nasha;
    const { partitionName } = this.partition;

    this.isDeleting = true;
    this.OvhApiDedicatedNasha.Partition()
      .v6()
      .delete({ serviceName, partitionName })
      .$promise.then(() =>
        this.close({
          success: this.$translate.instant(
            'nasha_components_partition_delete_success',
            { partitionName },
          ),
        }),
      )
      .catch((error) => this.dismiss({ error }));
  }
}
