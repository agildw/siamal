export const handleAmount = (amount: number) => {
  // change thousands to k and millions to m
  if (amount >= 1000000) {
    return `${(amount / 1000000).toFixed(1)}m`;
  }
  if (amount >= 1000) {
    return `${(amount / 1000).toFixed(1)}k`;
  }
  return `${amount}`;
};

export const handleTruncate = (text: string, length: number) => {
  return text.length > length ? `${text.substring(0, length)}...` : text;
};
