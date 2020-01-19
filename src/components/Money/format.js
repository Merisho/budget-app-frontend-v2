const digitsInBlock = 3;

export default n => {
  const str = Math.abs(n).toString();

  const mod = str.length % digitsInBlock;
  let formatted = str.slice(0, mod);
  for (let i = mod; i <= str.length - digitsInBlock; i += digitsInBlock) {
      if (formatted !== '') {
          formatted += ',';
      }

      formatted += str.slice(i, i + digitsInBlock);
  }

  if (n < 0) {
      formatted = '-' + formatted;
  }

  return formatted;
}