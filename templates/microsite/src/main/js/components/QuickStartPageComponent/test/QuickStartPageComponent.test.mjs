import { mount } from '@vue/test-utils';
import {
  describe, test, expect,
} from 'vitest';

import component from '../QuickStartPageComponent.vue';

describe('QuickStartPageComponent', () => {
  let wrapper = mount(component, {
    propsData: { success: true },
  });
  test('should render component', () => {
    expect(wrapper.find('img').exists()).to.equal(true);
  });
  test('should render green if success', () => {
    expect(wrapper.get('.success-background').exists()).to.equal(true);
  });
  test('should render red if error', () => {
    wrapper = mount(component, {
      propsData: { success: false },
    });
    expect(wrapper.get('.error-background').exists()).to.equal(true);
  });
});
