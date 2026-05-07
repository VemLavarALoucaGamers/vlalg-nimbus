import { describe, it, expect } from 'vitest';

import { mount } from '@vue/test-utils';
import NbBaseWithoutLabel from '../NbBaseWithoutLabel.vue';
import NbBaseWithLabel from '../NbBaseWithLabel.vue';

describe('NbBaseWithoutLabel', () => {
  it('renders properly', () => {
    const wrapper = mount(NbBaseWithoutLabel, { props: { txt: 'Hello Vitest' } });
    expect(wrapper.text()).toContain('Hello Vitest');
  });
});

describe('NbBaseWithLabel', () => {
  it('renders properly', () => {
    const wrapper = mount(NbBaseWithLabel, { props: { txt: 'Hello Vitest' } });
    expect(wrapper.text()).toContain('Hello Vitest');
  });
});
