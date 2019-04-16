module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Activities', [{
    activity: 'Updated Supervisor to John Doe',
    staffId: 'TN042995',
    createdAt: new Date('2019-04-15'),
    updatedAt: new Date()
  },
  {
    activity: 'Changed password',
    staffId: 'TN042995',
    createdAt: new Date(),
    updatedAt: new Date()
  }]),
  down: queryInterface => queryInterface.bulkDelete('Activities')
};
