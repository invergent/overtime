module.exports = {
  up: queryInterface => queryInterface.bulkInsert('LineManagers', [{
    lineManagerRole: 'Supervisor',
    firstname: 'SuperJohn',
    lastname: 'Johnny',
    email: 'super.john@init.com',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    lineManagerRole: 'BSM',
    firstname: 'JohnBSM',
    lastname: 'DoeBSM',
    email: 'john.doiz@init.com',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    lineManagerRole: 'BSM',
    firstname: 'DoeBBSM',
    lastname: 'JohnnyBSM',
    email: 'johnny.doey@init.com',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    lineManagerRole: 'Supervisor',
    firstname: 'JohnSuppy',
    lastname: 'DoeBSMMy',
    email: 'jonz.super@init.com',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    lineManagerRole: 'Supervisor',
    firstname: 'James',
    lastname: 'Enejo',
    email: 'spec.en.james@gmail.com',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    lineManagerRole: 'BSM',
    firstname: 'James',
    lastname: 'Enejo',
    email: 'jillandroid@gmail.com',
    createdAt: new Date(),
    updatedAt: new Date()
  }]),
  down: queryInterface => queryInterface.bulkDelete('LineManagers')
};
