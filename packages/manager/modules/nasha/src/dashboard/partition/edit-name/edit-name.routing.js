export default /* @ngInject */ ($stateProvider) => {
  $stateProvider.state('nasha.dashboard.partition.edit-name', {
    url: '/edit-name',
    views: {
      modal: {
        component: 'nashaComponentsPartitionEditName',
      },
    },
    layout: 'modal',
    resolve: {
      breadcrumb: () => null,
      close: /* @ngInject */ (goBack) => goBack,
      dismiss: /* @ngInject */ (goBack) => goBack,
    },
  });
};
