class UsersHelpers {
  static refineUserData(user) {
    const {
      staffId, firstname, lastname, middleName, email: emailAddress, image, changedPassword,
      branch: { name: branch }, role: { name: role },
      supervisor: { firstname: supervisorFirstName, lastname: supervisorLastName, email: supervisorEmailAddress },
      BSM: { firstname: bsmFirstName, lastname: bsmLastName, email: bsmEmailAddress }
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
