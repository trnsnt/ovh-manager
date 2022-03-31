import controller from './instances.controller';
import template from './instances.html';

export default {
  controller,
  template,
  bindings: {
    pciFeatureRedirect: '<',
    addInstance: '<',
    betaWarning: '<',
    createBackupInstance: '<',
    deleteInstance: '<',
    editInstance: '<',
    enableMonthlyBillingInstance: '<',
    endRescueInstance: '<',
    guideUrl: '<',
    guideTrackingSectionTags: '<',
    trackClick: '<',
    hardRebootInstance: '<',
    help: '<',
    instanceLink: '<',
    instanceId: '<',
    instances: '<',
    projectId: '<',
    onListParamChange: '<',
    refreshInstances: '<',
    reinstallInstance: '<',
    resumeInstance: '<',
    scheduleAutoBackup: '<',
    softRebootInstance: '<',
    startRescueInstance: '<',
    startInstance: '<',
    stopInstance: '<',
    shelveInstance: '<',
    unshelveInstance: '<',
    viewInstance: '<',
    vrack: '<',
    vrackLink: '<',
    killTasks: '<',
    steins: '<',
    customerRegions: '<',
    instancesRegions: '<',
    getStateName: '<',
    goToRegion: '<',
  },
};
