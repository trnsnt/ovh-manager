export default /* @ngInject */ ($stateProvider) => {
  $stateProvider.state('nasha.dashboard.partitions.create', {
    url: '/create',
    layout: 'modal',
    views: {
      modal: {
        component: 'nashaComponentsPartitionCreate',
      },
    },
    resolve: {
      breadcrumb: () => null,
      close: /* @ngInject */ (goBack) => goBack,
      dismiss: /* @ngInject */ (goBack) => goBack,
    },
  });
};
