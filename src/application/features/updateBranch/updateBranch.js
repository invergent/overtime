export default async (req, res, models) => {
  const { Staff, Branch } = models;
  const { currentStaffId, body: { branchId } } = req;

  try {
    const branch = await Branch.findByPk(branchId, { raw: true });

    if (!branch) return res.status(404).json({ message: 'Branch does not exist.' });

    await Staff.update({ branchId }, { where: { staffId: currentStaffId }, returning: true });
    return res.status(200).json({ message: 'Branch updated successfully.' });
  } catch (e) {
    return res.status(500).json({ message: 'An error occured ERR500CNGBRH' });
  }
};
