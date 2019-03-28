module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Roles', [{
    name: 'RPC',
    createdAt: '2018-12-30',
    updatedAt: '2018-12-30'
  },
  {
    name: 'Trade Developer',
    createdAt: '2018-12-30',
    updatedAt: '2018-12-30'
  },
  {
    name: 'Service Executive (Financial)',
    createdAt: '2018-12-30',
    updatedAt: '2018-12-30'
  },
  {
    name: 'Service Executive (Non-Financial)',
    createdAt: '2018-12-30',
    updatedAt: '2018-12-30'
  }]),
  down: queryInterface => queryInterface.bulkDelete('Roles')
};
