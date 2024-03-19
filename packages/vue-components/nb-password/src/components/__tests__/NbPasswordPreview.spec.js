import { describe, it, expect } from 'vitest';

import { mount } from '@vue/test-utils';
import NbPasswordPreview from '../NbPasswordPreview.vue';

describe('NbPasswordPreview', () => {
  it('renders properly', () => {
    const wrapper = mount(NbPasswordPreview, { props: { txt: 'Hello Vitest' } });
    expect(wrapper.text()).toContain('Hello Vitest');
  });
});
