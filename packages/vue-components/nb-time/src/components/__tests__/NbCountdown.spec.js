import { describe, it, expect } from 'vitest';

import { mount } from '@vue/test-utils';
import NbCountdown from '../NbCountdown.vue';

describe('NbCountdown', () => {
  it('renders properly', () => {
    const wrapper = mount(NbCountdown, { props: { txt: 'Hello Vitest' } });
    expect(wrapper.text()).toContain('Hello Vitest');
  });
});
