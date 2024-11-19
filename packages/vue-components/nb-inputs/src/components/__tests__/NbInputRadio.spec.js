import { describe, it, expect } from 'vitest';

import { mount } from '@vue/test-utils';
import NbInputRadio from '../NbInputRadio.vue';

describe('NbInputRadio', () => {
  it('renders properly', () => {
    const wrapper = mount(NbInputRadio, { props: { txt: 'Hello Vitest' } });
    expect(wrapper.text()).toContain('Hello Vitest');
  });
});
