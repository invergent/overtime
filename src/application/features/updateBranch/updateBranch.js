export default async (req, models) => {
  const { Staff, Branch } = models;
  const { currentStaff, body: { branchId } } = req;

  try {
    const branch = await Branch.findByPk(branchId, { raw: true });

    if (!branch) return [404, 'Branch does not exist.'];

    await Staff.update({ branchId }, { where: { staffId: currentStaff.staffId }, returning: true });
    return [200, 'Branch updated successfully.'];
  } catch (e) {
    return [500, 'An error occured ERR500CNGBRH'];
  }
};
