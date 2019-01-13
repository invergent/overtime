export default async (req, models) => {
  const { Staff, Supervisor } = models;
  const { currentStaffId, body } = req;
  const supervisorsDetails = body;

  try {
    const [supervisor, created] = await Supervisor.findOrCreate({
      where: { email: supervisorsDetails.email },
      defaults: supervisorsDetails
    });

    await Staff.update({ supervisorId: supervisor.id }, { where: { staffId: currentStaffId } });

    return [
      created ? 201 : 200,
      `Supervisor ${created ? 'added' : 'updated'} successfully.`,
      supervisor
    ];
  } catch (e) {
    return [500, 'An error occured ERR500CNGSUP'];
  }
};
