import { describe, it, expect } from 'vitest';

import { mount } from '@vue/test-utils';
import NbSelect from '../NbSelect.vue';

describe('NbSelect', () => {
  it('renders properly', () => {
    const wrapper = mount(NbSelect, { props: { txt: 'Hello Vitest' } });
    expect(wrapper.text()).toContain('Hello Vitest');
  });
});
