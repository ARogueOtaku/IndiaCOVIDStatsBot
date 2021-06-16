function getPercent(val, tot) {
  if (tot === 0) return 0;
  return (val / tot) * 100;
}

module.exports = { getPercent };
