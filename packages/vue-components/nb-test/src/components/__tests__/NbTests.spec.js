import { describe, it, expect } from 'vitest';

import { mount } from '@vue/test-utils';
import NbTest from '../NbTest.vue';

describe('NbTest', () => {
  it('renders properly', () => {
    const wrapper = mount(NbTest, { props: { txt: 'Hello Vitest' } });
    expect(wrapper.text()).toContain('Hello Vitest');
  });
});
