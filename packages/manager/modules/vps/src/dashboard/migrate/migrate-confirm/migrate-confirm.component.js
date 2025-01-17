import controller from './migrate-confirm.controller';
import template from './migrate-confirm.html';

export default {
  bindings: {
    goBack: '<',
    goBackToMigrate: '<',
    migrationConfirmTrackingPrefix: '<',
    serviceName: '<',
  },
  controller,
  template,
};
