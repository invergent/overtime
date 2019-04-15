module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Tenants', [{
    ref: 'INIT',
    businessName: 'Invergent Technologies Limited',
    address: 'This is the address.',
    emailAddress: 'info@invergent-technologies.com',
    url: 'overtime.invergent-technologies.com',
    createdAt: new Date(),
    updatedAt: new Date()
  }]),
  down: queryInterface => queryInterface.bulkDelete('Staff')
};
