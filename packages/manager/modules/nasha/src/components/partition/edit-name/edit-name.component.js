import { componentBindings } from '../partition.constants';

import controller from './edit-name.controller';
import template from './edit-name.template.html';

export default {
  bindings: {
    ...componentBindings,
    partitionNames: '<',
  },
  controller,
  template,
};
