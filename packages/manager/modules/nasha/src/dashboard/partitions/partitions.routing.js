import { STATE_NAME } from './partitions.constants';

export default /* @ngInject */ ($stateProvider) => {
  const goToPagePartitionResolve = [
    { id: '', name: '' },
    { id: 'access', name: 'Access' },
    { id: 'snapshots', name: 'Snapshots' },
  ].reduce((resolves, { id, name }) => {
    const resolveName = `goToPagePartition${name}`;
    const stateId = id ? `.${id}` : '';
    return {
      ...resolves,
      [resolveName]: /* @ngInject */ ($state, serviceName) => (partitionName) =>
        $state.go(`nasha.dashboard.partition${stateId}`, {
          serviceName,
          partitionName,
        }),
    };
  }, {});

  const goToTabPartitionsResolve = [
    { id: 'create', name: 'Create', abstract: false },
    { id: 'delete', name: 'Delete', abstract: true },
    { id: 'edit-size', name: 'EditSize', abstract: true },
    { id: 'zfs-options', name: 'ZfsOptions', abstract: true },
  ].reduce(
    (resolves, { id, name, abstract }) => ({
      ...resolves,
      [`goToTabPartitions${name}`]: /* @ngInject */ ($state, serviceName) => (
        partition,
      ) =>
        $state.go(`${STATE_NAME}${abstract ? '.partition' : ''}.${id}`, {
          serviceName,
          partition,
          partitionName: partition?.partitionName,
        }),
    }),
    {},
  );

  $stateProvider.state(STATE_NAME, {
    url: '/partitions',
    component: 'nashaDashboardPartitions',
    resolve: {
      breadcrumb: () => null,
      urlRenew: /* @ngInject */ (serviceName, coreURLBuilder) =>
        coreURLBuilder.buildURL('dedicated', '#/billing/autoRenew', {
          selectedType: 'DEDICATED_NASHA',
          searchText: serviceName,
        }),
      ...goToPagePartitionResolve,
      ...goToTabPartitionsResolve,
    },
  });

  $stateProvider.state(`${STATE_NAME}.partition`, {
    abstract: true,
    url: '/:partitionName',
    params: {
      partition: null,
    },
    resolve: {
      breadcrumb: () => null,
      partition: /* @ngInject */ ($transition$, $http, partitionApiUrl) =>
        $transition$.params().partition ||
        $http.get(partitionApiUrl).then(({ data }) => data),
      partitionApiUrl: /* @ngInject */ (nashaApiUrl, partitionName) =>
        `${nashaApiUrl}/partition/${partitionName}`,
      partitionName: /* @ngInject */ ($transition$) =>
        $transition$.params().partitionName,
    },
  });
};
