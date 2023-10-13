import { describe, it, expect } from 'vitest';

import { mount } from '@vue/test-utils';
import NbGradientText from '../NbGradientText.vue';

describe('NbGradientText', () => {
  it('renders properly', () => {
    const wrapper = mount(NbGradientText, { props: { txt: 'Hello Vitest' } });
    expect(wrapper.text()).toContain('Hello Vitest');
  });
});
