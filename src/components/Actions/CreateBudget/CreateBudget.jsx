import React from 'react';
import Button from '@material-ui/core/Button';

import CreateBudgetForm from '../../Forms/CreateBudget/CreateBudgetForm';
import Service from '../../../services/Service';

function CreateBudget(props) {
  const [ formOpen, setFormOpenState ] = React.useState(false);

  function open() {
    setFormOpenState(true);
  }

  function close() {
    setFormOpenState(false);
  }

  async function create(data) {
    const budget = await Service.createBudget({
      userId: props.user.id,
      name: data.name,
      total: +data.total * 100,
      description: data.description,
      startDate: data.startDate,
      endDate: data.endDate
    });

    close();
    props.created && props.created(budget);
  }
  
  return (
    <React.Fragment>
      <Button variant="contained" color="primary" onClick={open}>Create Budget</Button>
      <CreateBudgetForm open={formOpen} handleClose={close} handleCreate={create} />
    </React.Fragment>
  );
}

export default CreateBudget;
