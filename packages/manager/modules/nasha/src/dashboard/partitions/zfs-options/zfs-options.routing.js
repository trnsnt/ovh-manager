export default /* @ngInject */ ($stateProvider, ZfsOptionsStateResolve) => {
  $stateProvider.state('nasha.dashboard.partitions.partition.zfs-options', {
    url: '/zfs-options',
    component: 'nashaComponentsPartitionZfsOptions',
    resolve: {
      breadcrumb: () => null,
      close: /* @ngInject */ (goBack) => goBack,
      ...ZfsOptionsStateResolve,
    },
  });
};
