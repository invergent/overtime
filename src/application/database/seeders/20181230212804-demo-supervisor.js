module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Supervisors', [{
    supervisorId: 'TN014345',
    firstname: 'SuperJohn',
    lastname: 'Johnny',
    middleName: 'Gigan',
    designation: 'Oga boss',
    email: 'super.john@firstbank.com',
    createdAt: '2018-12-30',
    updatedAt: '2018-12-30'
  },
  {
    supervisorId: 'TN176345',
    firstname: 'JohnSuper',
    lastname: 'Niyi',
    middleName: 'Gangi',
    designation: 'Oga at the top',
    email: 'john.super@firstbank.com',
    createdAt: '2018-12-30',
    updatedAt: '2018-12-30'
  }]),
  down: queryInterface => queryInterface.bulkDelete('Supervisors')
};
