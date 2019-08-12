import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';

import Money from '../../../components/Money/Money';

let container;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

describe('Money value representation component', () => {
  test('Formats value with number of digits <= 3', () => {
    act(() => {
      ReactDOM.render(<Money value="999" />, container);
    });

    const moneyText = container.querySelector('span');
    expect(moneyText.textContent).toBe('₴999');
  });

  test('Formats value with number of digits >= 4 and <= 6', () => {
    act(() => {
      ReactDOM.render(<Money value="15000" />, container);
    });

    const moneyText = container.querySelector('span');
    expect(moneyText.textContent).toBe('₴15,000');
  });

  test('Formats value with number of digits >= 7', () => {
    act(() => {
      ReactDOM.render(<Money value="1500000" />, container);
    });

    const moneyText = container.querySelector('span');
    expect(moneyText.textContent).toBe('₴1,500,000');
  });
});
