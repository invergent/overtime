module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Roles', [{
    name: 'RPC',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Trade Developer',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Service Executive (Financial)',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Service Executive (Non-Financial)',
    createdAt: new Date(),
    updatedAt: new Date()
  }]),
  down: queryInterface => queryInterface.bulkDelete('Roles')
};
