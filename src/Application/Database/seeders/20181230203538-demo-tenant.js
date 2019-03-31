module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Tenants', [{
    ref: 'INIT',
    businessName: 'Invergent Technologies Limited',
    address: 'This is the address.',
    email: 'init@init.com',
    createdAt: new Date(),
    updatedAt: new Date()
  }]),
  down: queryInterface => queryInterface.bulkDelete('Staff')
};
