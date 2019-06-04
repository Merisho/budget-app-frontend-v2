import React from 'react';
import Button from '@material-ui/core/Button';

import CreateBudgetForm from './CreateBudgetForm';

function CreateBudget(props) {
  const [ formOpen, setFormOpenState ] = React.useState(false);

  function open() {
    setFormOpenState(true);
  }

  function close() {
    setFormOpenState(false);
  }

  async function create(data) {
    // const item = await Service.createExpenseItem(props.budgetId, {
    //   name: data.name,
    //   total: +data.total * 100,
    //   description: data.descr
    // });

    close();
    props.created && props.created();
  }
  
  return (
    <React.Fragment>
      <Button variant="contained" color="primary" onClick={open}>Create Budget</Button>
      <CreateBudgetForm open={formOpen} handleClose={close} handleCreate={create} />
    </React.Fragment>
  );
}

export default CreateBudget;
