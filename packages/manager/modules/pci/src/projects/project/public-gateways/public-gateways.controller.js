const CONTAINER_NAME = 'pci.projects.project.public-gateways';

export default class {
  /* @ngInject */
  constructor($translate, CucCloudMessage) {
    this.$translate = $translate;
    this.CucCloudMessage = CucCloudMessage;
  }

  $onInit() {
    this.loadMessages();
  }

  loadMessages() {
    this.CucCloudMessage.unSubscribe(CONTAINER_NAME);
    this.messageHandler = this.CucCloudMessage.subscribe(CONTAINER_NAME, {
      onMessage: () => this.refreshMessages(),
    });
  }

  refreshMessages() {
    this.messages = this.messageHandler.getMessages();
  }
}
