import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';

import <%&camelComponentName%>Component from '../src/<%&camelComponentName%>Component.vue';

describe('<%&camelComponentName%>Component tests', () => {
  const wrapper = mount(<%&camelComponentName%>Component);
  it('Replace me with a meaningful test', () => {
    expect(wrapper.exists()).to.equal(true);
  });
});
