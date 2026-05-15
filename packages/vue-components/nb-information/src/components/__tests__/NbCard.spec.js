import { describe, it, expect } from 'vitest';

import { mount } from '@vue/test-utils';
import NbCard from '../NbCard.vue';

describe('NbCard', () => {
  it('renders properly', () => {
    const wrapper = mount(NbCard, { props: { txt: 'Hello Vitest' } });
    expect(wrapper.text()).toContain('Hello Vitest');
  });
});

