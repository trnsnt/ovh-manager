export default /* @ngInject */ ($stateProvider) => {
  $stateProvider.state('nasha.dashboard.partition.accesses.delete', {
    url: '/:customSnapshotName/delete',
    views: {
      modal: {
        component: 'nashaComponentsPartitionSnapshotDelete',
      },
    },
    layout: 'modal',
    resolve: {
      breadcrumb: () => null,
      customSnapshotName: /* @ngInject */ ($transition$) =>
        $transition$.params().customSnapshotName,
      close: /* @ngInject */ (goBack) => goBack,
      dismiss: /* @ngInject */ (goBack) => goBack,
    },
  });
};
