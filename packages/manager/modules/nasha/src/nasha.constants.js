export const NASHA_TITLE = 'NAS-HA';
export const NASHA_USE_SIZE_NAME = 'size';
export const NASHA_ALERT_ID = 'nasha_alert';

export const Task = {
  operation: {
    Add: 'clusterLeclercPartitionAdd',
    Delete: 'clusterLeclercPartitionDelete',
    SnapshotCreate: 'clusterLeclercCustomSnapCreate',
    SnapshotUpdate: 'clusterLeclercSnapshotUpdate',
    Update: 'clusterLeclercPartitionUpdate',
    ZFSOptions: 'clusterLeclercZfsOptions',
  },
  status: {
    Doing: 'doing',
    Todo: 'todo',
  },
};

export default {
  NASHA_ALERT_ID,
  NASHA_TITLE,
  NASHA_USE_SIZE_NAME,
  Task,
};
