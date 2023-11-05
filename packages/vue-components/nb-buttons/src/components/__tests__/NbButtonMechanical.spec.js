import { describe, it, expect } from 'vitest';

import { mount } from '@vue/test-utils';
import NbButtonMechanical from '../NbButtonMechanical.vue';

describe('NbButtonMechanical', () => {
  it('renders properly', () => {
    const wrapper = mount(NbButtonMechanical, { props: { txt: 'Hello Vitest' } });
    expect(wrapper.text()).toContain('Hello Vitest');
  });
});
