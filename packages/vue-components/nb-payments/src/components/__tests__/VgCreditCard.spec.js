import { describe, it, expect } from 'vitest';

import { mount } from '@vue/test-utils';
import VgCreditCard from '../VgCreditCard.vue';

describe('VgCreditCard', () => {
  it('renders properly', () => {
    const wrapper = mount(VgCreditCard, { props: { txt: 'Hello Vitest' } });
    expect(wrapper.text()).toContain('Hello Vitest');
  });
});
