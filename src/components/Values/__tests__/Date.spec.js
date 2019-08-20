import React from 'react';
import { shallow } from 'enzyme';

import Date from '../Date';

describe('Date formatter', () => {
  test('Must format date in dd.mm.yyyy', () => {
    const date = shallow(<Date>2019-08-20T10:27:19.945Z</Date>);
    expect(date.text()).toBe('20.08.2019');
  });
});
