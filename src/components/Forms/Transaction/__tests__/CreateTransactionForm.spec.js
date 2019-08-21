import React from 'react';
import { mount } from 'enzyme';

import CreateTransactionForm from '../CreateTransactionForm';

describe('Create transaction form', () => {
  test('Must NOT submit the form if name is empty', () => {
    const createHandler = jest.fn();
    const form = mount(<CreateTransactionForm handleCreate={createHandler} open={true} />);
    const createButton = form.find('button.create-transaction-button');
    form.find('input#name').simulate('change', { target: { value: '' } });

    createButton.simulate('click');

    expect(createHandler).not.toHaveBeenCalled();
  });

  test('Must NOT submit the form if total is empty', () => {
    const createHandler = jest.fn();
    const form = mount(<CreateTransactionForm handleCreate={createHandler} open={true} />);
    const createButton = form.find('button.create-transaction-button');
    form.find('input#name').simulate('change', { target: { value: 'test' } });
    form.find('input#total').simulate('change', { target: { value: '' } });

    createButton.simulate('click');

    expect(createHandler).not.toHaveBeenCalled();
  });
});
