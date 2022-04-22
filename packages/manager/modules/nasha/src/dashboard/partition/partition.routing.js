export default /* @ngInject */ ($stateProvider) => {
  const stateName = 'nasha.dashboard.partition';

  const goToEditResolve = ['description', 'name', 'size'].reduce(
    (resolves, id) => {
      const capitalizedId = `${id[0].toUpperCase()}${id.slice(1)}`;
      return {
        ...resolves,
        [`goToEdit${capitalizedId}`]: /* @ngInject */ (
          $state,
          serviceName,
          partitionName,
        ) => () =>
          $state.go(`${stateName}.edit-${id}`, {
            serviceName,
            partitionName,
          }),
      };
    },
    {},
  );

  $stateProvider.state(stateName, {
    url: '/partition/:partitionName',
    views: {
      '@nasha': {
        component: 'nashaDashboardPartition',
      },
    },
    onExit: /* @ngInject */ (Poller) => {
      Poller.kill({ namespace: stateName });
    },
    resolve: {
      breadcrumb: /* @ngInject */ (partitionName) => partitionName,
      editName: /* @ngInject */ (
        $uibModal,
        nasha,
        partition,
        partitionNames,
        goBack,
      ) => () => {
        const modal = $uibModal.open({
          template: `
            <nasha-components-partition-edit-name
              data-close="close"
              data-dismiss="dismiss"
              data-nasha="nasha"
              data-partition="partition"
              data-partition-names="partitionNames"
            ></nasha-components-partition-edit-name>
          `,
          controller: /* @ngInject */ ($scope, $state) => {
            $scope.close = ({ success }) => {
              modal.close(success);
              goBack({ success, stateName: $state.current.name });
            };
            $scope.dismiss = modal.dismiss;
            $scope.nasha = nasha;
            $scope.partition = partition;
            $scope.partitionNames = partitionNames;
          },
        });
        return modal;
      },
      hasOperation: /* @ngInject */ (NashaTask, partition) => (operation) =>
        partition.tasks.filter(
          (task) => task.operation === NashaTask.operation[operation],
        ).length,
      isPartitionState: /* @ngInject */ ($state) => () =>
        $state.current.name === stateName,
      partition: /* @ngInject */ (
        $state,
        serviceName,
        partitionName,
        partitions,
        iceberg,
        reload,
        Poller,
        NashaTask,
      ) => {
        const [partition] = partitions.filter(
          ({ partitionName: name }) => name === partitionName,
        );

        if (!partition) {
          return $state.go('nasha.dashboard', { serviceName });
        }

        return iceberg(`/dedicated/nasha/${serviceName}/task`)
          .query()
          .expand('CachedObjectList-Pages')
          .addFilter('status', 'in', Object.values(NashaTask.status))
          .addFilter('partitionName', 'eq', partition.partitionName)
          .execute(null, true)
          .$promise.then(({ data: tasks }) => {
            const statuses = Object.values(NashaTask.status);
            partition.tasks = tasks;
            partition.polls = tasks.map(({ taskId }) =>
              Poller.poll(
                `/dedicated/nasha/${serviceName}/task/${taskId}`,
                null,
                {
                  namespace: stateName,
                  successRule: ({ status }) => !statuses.includes(status),
                },
              ).then(reload),
            );
          })
          .then(() => partition);
      },
      partitions: /* @ngInject */ (
        serviceName,
        preparePartition,
        OvhApiDedicatedNashaAapi,
      ) => {
        OvhApiDedicatedNashaAapi.resetCache();
        return OvhApiDedicatedNashaAapi.partitions({
          serviceName,
        }).$promise.then((partitions) => partitions.map(preparePartition));
      },
      partitionName: /* @ngInject */ ($transition$) =>
        $transition$.params().partitionName,
      partitionNames: /* @ngInject */ (partitions) =>
        partitions.map(({ partitionName }) => partitionName),
      ...goToEditResolve,
    },
  });
};
