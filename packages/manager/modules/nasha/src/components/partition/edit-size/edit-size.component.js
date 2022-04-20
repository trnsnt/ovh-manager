import { componentBindings } from '../partition.constants';

import controller from './edit-size.controller';
import template from './edit-size.template.html';

export default {
  bindings: { ...componentBindings },
  controller,
  template,
};
