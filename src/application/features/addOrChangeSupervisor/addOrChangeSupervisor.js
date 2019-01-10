export default async (req, res, models) => {
  const { Staff, Supervisor } = models;
  const { currentStaffId, body } = req;
  const supervisorsDetails = body;

  try {
    const [supervisor, created] = await Supervisor.findOrCreate({
      where: { email: supervisorsDetails.email },
      defaults: supervisorsDetails
    });

    await Staff.update({ supervisorId: supervisor.id }, { where: { staffId: currentStaffId } });

    return res.status(created ? 201 : 200).json({
      message: `Supervisor ${created ? 'added' : 'updated'} successfully.`,
      data: supervisor
    });
  } catch (e) {
    return res.status(500).json({ message: 'An error occured ERR500CNGSUP' });
  }
};
