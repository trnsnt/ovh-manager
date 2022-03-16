import controller from './support-level.controller';
import template from './support-level.html';

export default {
  bindings: {
    availability: '<',
    currentUser: '<',
    partnerLevel: '<',
    schema: '<',
    supportLevel: '<',
    supportLevelsEnum: '<',
  },
  controller,
  template,
};
