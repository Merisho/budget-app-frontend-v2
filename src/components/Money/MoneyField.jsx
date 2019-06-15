import React from 'react';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';

function MoneyField(props) {
  const [ value, setValue ] = React.useState(props.defaultValue || 0);

  function change(e) {
    const total = prepareTotal(e.target.value);
    setValue(formatDigits(total));
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
        startAdornment: <InputAdornment position="start">{props.currencyPrefix}</InputAdornment>,
      }}
    />
  );
}

function formatDigits(n) {
  const str = Math.abs(n).toString();

  const mod = str.length % 3;
  let formatted = str.slice(0, mod);
  for (let i = mod; i <= str.length - 3; i += 3) {
      if (formatted !== '') {
          formatted += ',';
      }

      formatted += str.slice(i, i + 3);
  }

  if (n < 0) {
      formatted = '-' + formatted;
  }

  return formatted;
}

function prepareTotal(total) {
  return total.toString().replace(/,/g, '');
}

export default MoneyField;