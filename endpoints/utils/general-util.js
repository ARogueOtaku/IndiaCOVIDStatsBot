function getPercent(val, tot) {
  let percent = 0;
  if (tot !== 0) percent(val / tot) * 100;
  return percent.toFixed(2);
}

module.exports = { getPercent };
