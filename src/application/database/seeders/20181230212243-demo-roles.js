module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Roles', [{
    roles: 'RPC',
    createdAt: '2018-12-30',
    updatedAt: '2018-12-30'
  },
  {
    roles: 'Trade Developer',
    createdAt: '2018-12-30',
    updatedAt: '2018-12-30'
  },
  {
    roles: 'Service Executive (Financial)',
    createdAt: '2018-12-30',
    updatedAt: '2018-12-30'
  },
  {
    roles: 'Service Executive (Non-Financial)',
    createdAt: '2018-12-30',
    updatedAt: '2018-12-30'
  }]),
  down: queryInterface => queryInterface.bulkDelete('Roles')
};
