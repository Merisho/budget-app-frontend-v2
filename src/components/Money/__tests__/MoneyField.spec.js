import React from 'react';
import { mount } from 'enzyme';

import MoneyField from '../MoneyField';

describe('Money input field representation component', () => {
  test('Formats value with number of digits <= 3', () => {
    const wrapper = mount(<MoneyField />);
    const input = wrapper.find('input');

    input.simulate('change', { target: { value: '999' } });

    expect(input.instance().value).toBe('999');
  });

  test('Formats value with number of digits >= 4 and <= 6', () => {
    const wrapper = mount(<MoneyField />);
    const input = wrapper.find('input');

    input.simulate('change', { target: { value: '99999' } });

    expect(input.instance().value).toBe('99,999');
  });

  test('Formats value with number of digits >= 7', () => {
    const wrapper = mount(<MoneyField />);
    const input = wrapper.find('input');

    input.simulate('change', { target: { value: '1500000' } });

    expect(input.instance().value).toBe('1,500,000');
  });
});
