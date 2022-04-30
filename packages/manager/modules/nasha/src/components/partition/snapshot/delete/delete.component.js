import { componentBindings } from '../../partition.constants';

import controller from './delete.controller';
import template from './delete.template.html';

export default {
  bindings: {
    ...componentBindings,
    customSnapshotName: '<',
  },
  controller,
  template,
};
