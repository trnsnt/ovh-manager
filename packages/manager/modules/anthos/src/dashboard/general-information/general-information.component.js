import controller from './general-information.controller';
import template from './general-information.html';

export default {
  bindings: {
    serviceName: '<',
    serviceInfo: '<',
    user: '<',
    isCommitmentAvailable: '<',
    tenant: '<',
    hosts: '<',
    availableVersions: '<',
    storageUsage: '<',
    publicIPs: '<',
    privateIPs: '<',
    displayAlerterMessage: '<',
    goBack: '<',
    goToTenant: '<',
    goToOrderHost: '<',
    goToOrderStorage: '<',
    goToAssignPrivateIp: '<',
    goToOrderPublicIp: '<',
    goToRenameService: '<',
    goToSoftwareUpdate: '<',
    goToAccessRestriction: '<',
    goToUpgradePack: '<',
    generalInfoHitTracking: '<',
    trackClick: '<',
    trackingPrefix: '<',
    packInfo: '<',
    availableOptions: '<',
  },
  controller,
  template,
};
