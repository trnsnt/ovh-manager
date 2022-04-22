export default /* @ngInject */ ($stateProvider) => {
  $stateProvider.state('nasha.dashboard.partition.edit-description', {
    url: '/edit-description',
    views: {
      modal: {
        component: 'nashaComponentsPartitionEditDescription',
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
