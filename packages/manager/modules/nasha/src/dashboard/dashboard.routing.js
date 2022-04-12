export default /* @ngInject */ ($stateProvider) => {
  $stateProvider.state('nasha.dashboard', {
    url: '/:serviceName',
    component: 'nashaDashboard',
    redirectTo: 'nasha.dashboard.general-information',
    resolve: {
      breadcrumb: /* @ngInject */ (serviceName) => serviceName,
      editName: /* @ngInject */ ($uibModal, nasha, goToDashboard) => () => {
        const md = $uibModal.open({
          template: `
            <nasha-components-edit-name
              close="close"
              dismiss="dismiss"
              nasha="nasha"
            ></nasha-components-edit-name>
          `,
          controller: /* @ngInject */ ($scope) => {
            $scope.close = (success) => md.close() + goToDashboard({ success });
            $scope.dismiss = md.dismiss;
            $scope.nasha = nasha;
          },
        });
        return md;
      },
      goBack: /* @ngInject */ (goToDashboard) => () => goToDashboard(),
      goToDashboard: /* @ngInject */ (
        $state,
        serviceName,
        alertSuccess,
        alertError,
      ) => ({ success, error } = {}) => {
        const params = { serviceName };
        const options = { reload: !!success };
        return $state.go('nasha.dashboard', params, options).then((result) => {
          if (success) alertSuccess(success);
          if (error) alertError(error);
          return result;
        });
      },
      goToGeneralInformation: /* @ngInject */ ($state, serviceName) => () =>
        $state.go('nasha.dashboard.general-information', { serviceName }),
      nasha: /* @ngInject */ (
        OvhApiDedicatedNasha,
        serviceName,
        prepareNasha,
      ) => {
        const aapi = OvhApiDedicatedNasha.Aapi();
        aapi.resetCache();
        return aapi.get({ serviceName }).$promise.then(prepareNasha);
      },
      serviceInfo: /* @ngInject */ ($http, serviceName) =>
        $http
          .get(`/dedicated/nasha/${serviceName}/serviceInfos`)
          .then(({ data }) => data),
      serviceName: /* @ngInject */ ($transition$) =>
        $transition$.params().serviceName,
    },
  });
};
