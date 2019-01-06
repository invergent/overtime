export default (fieldValue) => {
  if (!fieldValue || !fieldValue.trim()) {
    return [`${fieldValue} is required`];
  }
  return [];
};
