module.exports = {
  up: queryInterface => queryInterface.bulkInsert('LineManagers', [{
    lineManagerId: 'TN014345',
    lineManagerRole: 'Supervisor',
    firstname: 'SuperJohn',
    lastname: 'Johnny',
    designation: 'Oga boss',
    email: 'super.john@firstbank.com',
    createdAt: '2018-12-30',
    updatedAt: '2018-12-30'
  },
  {
    lineManagerId: 'TN176345',
    lineManagerRole: 'Supervisor',
    firstname: 'JohnSuper',
    lastname: 'Niyi',
    designation: 'Oga at the top',
    email: 'john.super@firstbank.com',
    createdAt: '2018-12-30',
    updatedAt: '2018-12-30'
  }]),
  down: queryInterface => queryInterface.bulkDelete('LineManagers')
};
