module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Settings', [{
    tenantRef: 'INIT',
    emailSchedule: '0 6 15 * *',
    overtimeWindowStart: '*/2 * * * *',
    overtimeWindowEnd: '*/3 * * * *',
    createdAt: new Date(),
    updatedAt: new Date()
  }]),
  down: queryInterface => queryInterface.bulkDelete('Settings')
};
