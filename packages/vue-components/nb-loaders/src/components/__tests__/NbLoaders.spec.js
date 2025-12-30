import { describe, it, expect } from 'vitest';

import { mount } from '@vue/test-utils';
import NbLoaders from '../NbLoaders.vue';

describe('NbLoaders', () => {
  it('renders properly', () => {
    const wrapper = mount(NbLoaders, { props: { txt: 'Hello Vitest' } });
    expect(wrapper.text()).toContain('Hello Vitest');
  });
});
