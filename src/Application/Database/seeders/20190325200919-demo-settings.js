module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Settings', [{
    tenantRef: 'INIT',
    emailSchedule: '0 6 15 * *',
    createdAt: new Date(),
    updatedAt: new Date()
  }]),
  down: queryInterface => queryInterface.bulkDelete('Settings')
};
