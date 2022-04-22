export default /* @ngInject */ ($stateProvider) => {
  $stateProvider.state('nasha.dashboard.edit-name', {
    url: '/edit-name',
    views: {
      modal: {
        component: 'nashaComponentsEditName',
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
