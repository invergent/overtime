export const checkForEmptyFields = (fieldValue) => {
  if (!fieldValue || !fieldValue.trim()) {
    return [`${fieldValue} is required`];
  }
  return [];
};

export const checkStaffId = (staffId) => {
  const staffIdRegex = /^[T][N][0-9]{6}$/;

  if (!staffIdRegex.test(staffId)) {
    return ['Staff ID is invalid'];
  }
  return [];
};
