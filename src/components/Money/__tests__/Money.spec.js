import React from 'react';
import { mount } from 'enzyme';

import Money from '../Money';

describe('Money value representation component', () => {
  test('Formats value with number of digits <= 3', () => {
    const wrapper = mount(<Money value="999" />);

    const moneyText = wrapper.find('span');
    expect(moneyText.instance().textContent).toBe('₴999');
  });

  test('Formats value with number of digits >= 4 and <= 6', () => {
    const wrapper = mount(<Money value="15000" />);

    const moneyText = wrapper.find('span');
    expect(moneyText.instance().textContent).toBe('₴15,000');
  });

  test('Formats value with number of digits >= 7', () => {
    const wrapper = mount(<Money value="1500000" />);

    const moneyText = wrapper.find('span');
    expect(moneyText.instance().textContent).toBe('₴1,500,000');
  });
});
