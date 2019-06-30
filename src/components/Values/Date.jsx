function DateValue(props) {
  return formatDate(props.children);
}

function formatDate(dateString) {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${zeroPrefix(day)}.${zeroPrefix(month)}.${year}`;
}

function zeroPrefix(val) {
  return val < 10 ? `0${val}` : val;
}

export default DateValue;
