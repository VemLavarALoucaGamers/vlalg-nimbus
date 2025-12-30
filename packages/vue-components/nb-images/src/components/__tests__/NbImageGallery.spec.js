import { describe, it, expect } from 'vitest';

import { mount } from '@vue/test-utils';
import NbImageGallery from '../NbImageGallery.vue';

describe('NbImageGallery', () => {
  it('renders properly', () => {
    const wrapper = mount(NbImageGallery, { props: { txt: 'Hello Vitest' } });
    expect(wrapper.text()).toContain('Hello Vitest');
  });
});
