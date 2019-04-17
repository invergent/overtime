class UsersHelpers {
  static refineUserData(user) {
    const {
      staffId, firstname, lastname, middleName, email: emailAddress, image, changedPassword,
      'supervisor.firstname': supervisorFirstName, 'supervisor.lastname': supervisorLastName,
      'supervisor.email': supervisorEmailAddress, 'BSM.firstname': bsmFirstName,
      'bsm.lastname': bsmLastName, 'BSM.email': bsmEmailAddress, 'role.name': role,
      'branch.name': branch
    } = user;
    return {
      staffId,
      firstname,
      lastname,
      middleName,
      emailAddress,
      image,
      role,
      branch,
      changedPassword,
      supervisorFirstName,
      supervisorLastName,
      supervisorEmailAddress,
      bsmFirstName,
      bsmLastName,
      bsmEmailAddress
    };
  }
}

export default UsersHelpers;
