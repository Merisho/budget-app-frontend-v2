import React from 'react';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';

import format from './format';

function MoneyField(props) {
  const [ value, setValue ] = React.useState(format(props.defaultValue  || 0));

  function change(e) {
    const total = prepareTotal(e.target.value);
    if (isNaN(+total)) {
      return;
    }
    
    setValue(format(total));
    props.onChange && props.onChange(total);
  }

  const textFieldProps = { ...props };
  delete textFieldProps.defaultValue;
  delete textFieldProps.currencyPrefix;
  return (
    <TextField
      {...textFieldProps}
      value={value}
      onChange={change}
      InputProps={{
        startAdornment: <InputAdornment position="start">{props.currencyPrefix || '₴'}</InputAdornment>,
      }}
    />
  );
}

function prepareTotal(total) {
  return total.toString().replace(/,/g, '');
}

export default MoneyField;