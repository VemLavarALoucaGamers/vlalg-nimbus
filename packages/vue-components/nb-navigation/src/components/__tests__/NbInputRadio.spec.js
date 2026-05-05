import { describe, it, expect } from 'vitest';

import { mount } from '@vue/test-utils';
import NbTabs from '../NbTabs.vue';

describe('NbTabs', () => {
  it('renders properly', () => {
    const wrapper = mount(NbTabs, { props: { txt: 'Hello Vitest' } });
    expect(wrapper.text()).toContain('Hello Vitest');
  });
});
