import React from 'react';
import { mount } from 'enzyme';

import MoneyField from '../MoneyField';

describe('Money input field representation component', () => {
  test('Must set the value as 0 by default', () => {
    const wrapper = mount(<MoneyField />);
    const input = wrapper.find('input');

    expect(input.instance().value).toBe('0');
  });

  test('Must set default value if it is specified', () => {
    const wrapper = mount(<MoneyField defaultValue="100" />);
    const input = wrapper.find('input');

    expect(input.instance().value).toBe('100');
  });

  test('Must format value with number of digits <= 3', () => {
    const wrapper = mount(<MoneyField />);
    const input = wrapper.find('input');

    input.simulate('change', { target: { value: '999' } });

    expect(input.instance().value).toBe('999');
  });

  test('Must format value with number of digits >= 4 and <= 6', () => {
    const wrapper = mount(<MoneyField />);
    const input = wrapper.find('input');

    input.simulate('change', { target: { value: '99999' } });

    expect(input.instance().value).toBe('99,999');
  });

  test('Must format value with number of digits >= 7', () => {
    const wrapper = mount(<MoneyField />);
    const input = wrapper.find('input');

    input.simulate('change', { target: { value: '1500000' } });

    expect(input.instance().value).toBe('1,500,000');
  });

  test('Must not change value at all in case string is typed in', () => {
    const wrapper = mount(<MoneyField />);
    const input = wrapper.find('input');

    input.simulate('change', { target: { value: 'test' } });

    expect(input.instance().value).toBe('0');
  });

  test('Must change value to a single 0 only in case multiple 0s typed in', () => {
    const wrapper = mount(<MoneyField />);
    const input = wrapper.find('input');

    input.simulate('change', { target: { value: '0' } });
    input.simulate('change', { target: { value: '0' } });

    expect(input.instance().value).toBe('0');
  });

  test('Must trigger onChange handler', () => {
    const changeHandler = jest.fn();
    const wrapper = mount(<MoneyField onChange={changeHandler} />);
    const input = wrapper.find('input');

    input.simulate('change', { target: { value: '1' } });

    expect(changeHandler).toHaveBeenCalled();
  });
});
