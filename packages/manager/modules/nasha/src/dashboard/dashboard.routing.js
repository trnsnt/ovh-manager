export default /* @ngInject */ ($stateProvider) => {
  const dashboardStateName = 'nasha.dashboard';
  $stateProvider.state(dashboardStateName, {
    url: '/:serviceName',
    component: 'nashaDashboard',
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
      goToEditName: /* @ngInject */ ($state, serviceName) => () =>
        $state.go(`${dashboardStateName}.edit-name`, { serviceName }),
      goToPartitions: /* @ngInject */ ($state, serviceName) => () =>
        $state.go(`${dashboardStateName}.partitions`, { serviceName }),
      isDashboardState: /* @ngInject */ ($state) => () =>
        $state.current.name === dashboardStateName,
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
      user: /* @ngInject */ (coreConfig) => coreConfig.getUser(),
    },
  });
};
