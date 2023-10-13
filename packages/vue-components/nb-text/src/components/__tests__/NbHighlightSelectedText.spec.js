import { describe, it, expect } from 'vitest';

import { mount } from '@vue/test-utils';
import NbHighlightSelectedText from '../NbHighlightSelectedText.vue';

describe('NbHighlightSelectedText', () => {
  it('renders properly', () => {
    const wrapper = mount(NbHighlightSelectedText, { props: { txt: 'Hello Vitest' } });
    expect(wrapper.text()).toContain('Hello Vitest');
  });
});
