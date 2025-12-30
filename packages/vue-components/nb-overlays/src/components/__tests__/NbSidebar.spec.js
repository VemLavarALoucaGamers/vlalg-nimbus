import { describe, it, expect } from 'vitest';

import { mount } from '@vue/test-utils';
import NbSidebar from '../NbSidebar.vue';

describe('NbSidebar', () => {
  it('renders properly', () => {
    const wrapper = mount(NbSidebar, { props: { txt: 'Hello Vitest' } });
    expect(wrapper.text()).toContain('Hello Vitest');
  });
});
