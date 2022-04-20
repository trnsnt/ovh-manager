export default /* @ngInject */ ($stateProvider) => {
  $stateProvider.state('nasha.dashboard', {
    url: '/:serviceName',
    component: 'nashaDashboard',
    redirectTo: 'nasha.dashboard.general-information',
    resolve: {
      breadcrumb: /* @ngInject */ (serviceName) => serviceName,
      editName: /* @ngInject */ ($uibModal, nasha, goBack) => () => {
        const modal = $uibModal.open({
          template: `
            <nasha-components-edit-name
              data-close="close"
              data-dismiss="dismiss"
              data-nasha="nasha"
            ></nasha-components-edit-name>
          `,
          controller: /* @ngInject */ ($scope, $state) => {
            $scope.close = ({ success }) => {
              modal.close(success);
              goBack({ success, stateName: $state.current.name });
            };
            $scope.dismiss = modal.dismiss;
            $scope.nasha = nasha;
          },
        });
        return modal;
      },
      goBack: /* @ngInject */ (
        $state,
        serviceName,
        alertSuccess,
        alertError,
      ) => ({
        success,
        error,
        stateName = '',
        stateParams = {},
        reload = false,
      } = {}) =>
        $state
          .go(
            stateName || '^',
            { ...stateParams, serviceName },
            { reload: !!success || reload },
          )
          .then((result) => {
            if (success) alertSuccess(success);
            if (error) alertError(error);
            return result;
          }),
      goToDashboard: /* @ngInject */ ($state, serviceName) => (reload) =>
        $state.go('nasha.dashboard', { serviceName }, { reload }),
      goToGeneralInformation: /* @ngInject */ ($state, serviceName) => () =>
        $state.go('nasha.dashboard.general-information', { serviceName }),
      goToPartitions: /* @ngInject */ ($state, serviceName) => () =>
        $state.go('nasha.dashboard.partitions', { serviceName }),
      nasha: /* @ngInject */ (
        OvhApiDedicatedNasha,
        serviceName,
        prepareNasha,
      ) => {
        const aapi = OvhApiDedicatedNasha.Aapi();
        aapi.resetCache();
        return aapi.get({ serviceName }).$promise.then(prepareNasha);
      },
      reload: /* @ngInject */ ($state, goBack) => () =>
        goBack({ stateName: $state.current.name, reload: true }),
      serviceInfo: /* @ngInject */ ($http, serviceName) =>
        $http
          .get(`/dedicated/nasha/${serviceName}/serviceInfos`)
          .then(({ data }) => data),
      serviceName: /* @ngInject */ ($transition$) =>
        $transition$.params().serviceName,
    },
  });
};
