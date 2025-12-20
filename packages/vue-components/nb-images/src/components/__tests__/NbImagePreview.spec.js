import { describe, it, expect } from 'vitest';

import { mount } from '@vue/test-utils';
import NbImagePreview from '../NbImagePreview.vue';

describe('NbImagePreview', () => {
  it('renders properly', () => {
    const wrapper = mount(NbImagePreview, { props: { txt: 'Hello Vitest' } });
    expect(wrapper.text()).toContain('Hello Vitest');
  });
});
