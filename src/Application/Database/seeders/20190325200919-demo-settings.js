module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Settings', [{
    tenantRef: 'INIT',
    emailSchedule: '0 6 15 * *',
    overtimeWindowStart: '0 0 1 * *',
    overtimeWindowEnd: '0 0 8 * *',
    createdAt: new Date(),
    updatedAt: new Date()
  }]),
  down: queryInterface => queryInterface.bulkDelete('Settings')
};
