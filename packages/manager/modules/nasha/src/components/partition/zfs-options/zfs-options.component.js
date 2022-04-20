import { componentBindings } from '../partition.constants';

import controller from './zfs-options.controller';
import template from './zfs-options.template.html';

export default {
  bindings: { ...componentBindings },
  controller,
  template,
};
