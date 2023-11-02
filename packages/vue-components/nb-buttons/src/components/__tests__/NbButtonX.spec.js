import { describe, it, expect } from 'vitest';

import { mount } from '@vue/test-utils';
import NbButtonX from '../NbButtonX.vue';

describe('NbButtonX', () => {
  it('renders properly', () => {
    const wrapper = mount(NbButtonX, { props: { txt: 'Hello Vitest' } });
    expect(wrapper.text()).toContain('Hello Vitest');
  });
});
