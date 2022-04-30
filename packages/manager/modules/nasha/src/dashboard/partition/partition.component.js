import controller from './partition.controller';
import template from './partition.template.html';

export default {
  bindings: {
    editName: '<',
    goToEditDescription: '<',
    goToEditName: '<',
    goToEditSize: '<',
    hasOperation: '<',
    isPartitionState: '<',
    nasha: '<',
    partition: '<',
    reload: '<',
    serviceName: '<',
    tasks: '<',
  },
  controller,
  template,
};
