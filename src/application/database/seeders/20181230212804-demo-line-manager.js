module.exports = {
  up: queryInterface => queryInterface.bulkInsert('LineManagers', [{
    lineManagerId: 'TN014345',
    lineManagerRole: 'Supervisor',
    firstname: 'SuperJohn',
    lastname: 'Johnny',
    designation: 'Oga boss',
    email: 'super.john@init.com',
    createdAt: '2018-12-30',
    updatedAt: '2018-12-30'
  },
  {
    lineManagerId: 'TN176345',
    lineManagerRole: 'BSM',
    firstname: 'JohnBSM',
    lastname: 'DoeBSM',
    designation: 'Oga at the top',
    email: 'john.doiz@init.com',
    createdAt: '2018-12-30',
    updatedAt: '2018-12-30'
  },
  {
    lineManagerId: 'TN176666',
    lineManagerRole: 'BSM',
    firstname: 'DoeBBSM',
    lastname: 'JohnnyBSM',
    designation: 'Oga at the top',
    email: 'johnny.doey@init.com',
    createdAt: '2018-12-30',
    updatedAt: '2018-12-30'
  },
  {
    lineManagerId: 'TN176374',
    lineManagerRole: 'Supervisor',
    firstname: 'JohnBSMMy',
    lastname: 'DoeBSMMy',
    designation: 'Oga at the top',
    email: 'jonz.super@init.com',
    createdAt: '2018-12-30',
    updatedAt: '2018-12-30'
  }]),
  down: queryInterface => queryInterface.bulkDelete('LineManagers')
};
