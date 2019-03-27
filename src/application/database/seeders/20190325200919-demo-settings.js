module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Settings', [{
    tenantRef: 'INIT',
    emailSchedule: '0 6 15 * *',
    createdAt: '2019-03-25',
    updatedAt: '2019-03-25'
  }]),
  down: queryInterface => queryInterface.bulkDelete('Settings')
};
