import { STATE_NAME } from './partition.constants';

export default class NashaDashboardPartitionController {
  /* @ngInject */
  constructor(NashaTask, Poller) {
    this.NashaTask = NashaTask;
    this.Poller = Poller;
  }

  $onInit() {
    const { NashaTask, Poller, reload, serviceName, tasks } = this;
    const statuses = Object.values(NashaTask.status);

    tasks.forEach(({ taskId }) =>
      Poller.poll(`/dedicated/nasha/${serviceName}/task/${taskId}`, null, {
        namespace: STATE_NAME,
        successRule: ({ status }) => !statuses.includes(status),
      }).then(reload),
    );
  }

  $onDestroy() {
    this.Poller.kill({ namespace: STATE_NAME });
  }
}
