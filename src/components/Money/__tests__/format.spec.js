import format from '../format';

describe('Money value representation formatting', () => {
  it('Does not apply formatting for money values that have less than 4 digits', () => {
    expect(format(1)).toBe('1');
    expect(format(-1)).toBe('-1');
    expect(format(11)).toBe('11');
    expect(format(666)).toBe('666');
  });

  it('Apply formatting for money values that have more than 3 digits', () => {
    expect(format(6666)).toBe('6,666');
    expect(format(9999999)).toBe('9,999,999');
  });
});
