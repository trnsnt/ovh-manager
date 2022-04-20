import { componentBindings } from '../partition.constants';

import controller from './create.controller';
import template from './create.template.html';

export default {
  bindings: { ...componentBindings },
  controller,
  template,
};
