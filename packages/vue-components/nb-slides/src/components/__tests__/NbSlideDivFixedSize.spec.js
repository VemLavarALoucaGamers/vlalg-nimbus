import { describe, it, expect } from 'vitest';

import { mount } from '@vue/test-utils';
import NbSlideDivFixedSize from '../NbSlideDivFixedSize.vue';

describe('NbSlideDivFixedSize', () => {
  it('renders properly', () => {
    const wrapper = mount(NbSlideDivFixedSize, { props: { txt: 'Hello Vitest' } });
    expect(wrapper.text()).toContain('Hello Vitest');
  });
});
