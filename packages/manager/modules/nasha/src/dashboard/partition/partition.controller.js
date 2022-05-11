import NashaDashboardController from '../dashboard.controller';
import { STATE_NAME } from './partition.constants';

export default class NashaDashboardPartitionController extends NashaDashboardController {
  /* @ngInject */
  constructor(NashaTask, Poller) {
    super();
    this.NashaTask = NashaTask;
    this.Poller = Poller;
  }

  $onInit() {
    const { NashaTask, nashaApiUrl, Poller, reload, tasks } = this;
    const statuses = Object.values(NashaTask.status);

    tasks.forEach(({ taskId }) =>
      Poller.poll(`${nashaApiUrl}/task/${taskId}`, null, {
        namespace: STATE_NAME,
        successRule: ({ status }) => !statuses.includes(status),
      }).then(reload),
    );
  }

  $onDestroy() {
    this.Poller.kill({ namespace: STATE_NAME });
  }
}
