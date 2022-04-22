export default /* @ngInject */ ($stateProvider) => {
  $stateProvider.state('nasha.dashboard.partition.edit-size', {
    url: '/edit-size',
    layout: 'modal',
    views: {
      modal: {
        component: 'nashaComponentsPartitionEditSize',
      },
    },
    params: {
      partition: null,
    },
    resolve: {
      breadcrumb: () => null,
      close: /* @ngInject */ (goBack) => goBack,
      dismiss: /* @ngInject */ (goBack) => goBack,
    },
  });
};
