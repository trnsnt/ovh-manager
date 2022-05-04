export default /* @ngInject */ ($stateProvider) => {
  const stateName = 'nasha.dashboard.partition.accesses';

  $stateProvider.state(stateName, {
    url: '/accesses',
    component: 'nashaDashboardPartitionAccesses',
    resolve: {
      breadcrumb: () => null,
      aclTypeEnum: (schema) =>
        schema.models['dedicated.storage.AclTypeEnum'].enum,
      goToDelete: /* @ngInject */ ($state, serviceName, partitionName) => (
        ip,
      ) => $state.go(`${stateName}.delete`, { serviceName, partitionName, ip }),
    },
  });
};
