import { describe, it, expect } from 'vitest';

import { mount } from '@vue/test-utils';
import NbPagination from '../NbPagination.vue';

describe('NbPagination', () => {
  it('renders properly', () => {
    const wrapper = mount(NbPagination, { props: { txt: 'Hello Vitest' } });
    expect(wrapper.text()).toContain('Hello Vitest');
  });
});
