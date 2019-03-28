module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Tenants', [{
    ref: 'INIT',
    businessName: 'Invergent Technologies Limited',
    address: 'This is the address.',
    email: 'init@init.com',
    createdAt: '2018-12-30',
    updatedAt: '2018-12-30'
  }]),
  down: queryInterface => queryInterface.bulkDelete('Staff')
};
