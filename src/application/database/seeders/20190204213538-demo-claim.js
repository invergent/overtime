module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Claims', [{
    monthOfClaim: 'Oct, 2018',
    weekday: null,
    weekend: null,
    shift: 9,
    requester: 1,
    approvalBySupervisor: 'Approved',
    approvalByBSM: 'Pending',
    createdAt: '2019-02-06',
    updatedAt: '2019-02-06'
  },
  {
    monthOfClaim: 'Nov, 2018',
    weekday: 12,
    weekend: 7,
    shift: null,
    requester: 3,
    approvalBySupervisor: 'Pending',
    approvalByBSM: 'Pending',
    createdAt: '2019-02-06',
    updatedAt: '2019-02-06'
  },
  {
    monthOfClaim: 'Dec, 2018',
    weekday: 17,
    weekend: 6,
    shift: null,
    requester: 3,
    approvalBySupervisor: 'Approved',
    approvalByBSM: 'Pending',
    createdAt: '2019-02-06',
    updatedAt: '2019-02-06'
  },
  {
    monthOfClaim: 'Dec, 2018',
    weekday: 19,
    weekend: 5,
    shift: null,
    requester: 4,
    approvalBySupervisor: 'Pending',
    approvalByBSM: 'Pending',
    createdAt: '2019-02-24',
    updatedAt: '2019-02-24'
  },
  {
    monthOfClaim: 'Jan, 2019',
    weekday: 14,
    weekend: 6,
    shift: null,
    requester: 5,
    approvalBySupervisor: 'Pending',
    approvalByBSM: 'Pending',
    createdAt: '2019-02-26',
    updatedAt: '2019-02-26'
  },
  {
    monthOfClaim: 'Jan, 2019',
    weekday: 17,
    weekend: 4,
    shift: null,
    requester: 6,
    approvalBySupervisor: 'Approved',
    approvalByBSM: 'Pending',
    createdAt: '2019-02-26',
    updatedAt: '2019-02-26'
  }]),
  down: queryInterface => queryInterface.bulkDelete('Claims')
};
