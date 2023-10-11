import { describe, it, expect } from 'vitest';

import { mount } from '@vue/test-utils';
import NbCreditCard from '../NbCreditCard.vue';

describe('NbCreditCard', () => {
  it('renders properly', () => {
    const wrapper = mount(NbCreditCard, { props: { txt: 'Hello Vitest' } });
    expect(wrapper.text()).toContain('Hello Vitest');
  });
});
