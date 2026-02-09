import { describe, it, expect } from 'vitest';

import { mount } from '@vue/test-utils';
import NbCalendar from '../NbCalendar.vue';

describe('NbCalendar', () => {
  it('renders properly', () => {
    const wrapper = mount(NbCalendar, { props: { txt: 'Hello Vitest' } });
    expect(wrapper.text()).toContain('Hello Vitest');
  });
});
