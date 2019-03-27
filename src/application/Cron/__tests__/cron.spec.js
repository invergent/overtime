import { CronJob } from 'cron';
import sinon from 'sinon';

import Cron from '../Scheduler';
import services from '../../services';
import ClaimHelpers from '../../helpers/ClaimHelpers';
import notifications from '../../notifications';
import { eventNames } from '../../utils/types';
import {
  mockSettings, mockStaffWithPendingClaims, mockFilteredStaffWithPendingClaims
} from '../../../__tests__/__mocks__';

const { Scheduler, ScheduledJobs } = Cron;
const { ClaimService, SettingService } = services;

describe('Cron Unit Tests', () => {
  beforeEach(() => jest.resetAllMocks());

  it('should call SettingService fetchAllSettings method', () => {
    const fetchAllSettings = jest.spyOn(SettingService, 'fetchAllSettings').mockImplementation(() => {});

    Scheduler.fetchAllSettings();

    expect(fetchAllSettings).toHaveBeenCalled();
  });

  it('should check if pending claims exists', async () => {
    jest.spyOn(ClaimService, 'fetchClaimsByTenantRef').mockResolvedValue([]);

    const result = await Scheduler.checkPendingClaims('tenantRef');

    expect(result).toBe(undefined);
  });

  it('should emit a Reminder event', () => {
    const { tenantRef } = mockSettings[0];
    const emitFunction = jest.spyOn(notifications, 'emit').mockImplementation(() => {});
    jest.spyOn(ClaimHelpers, 'filterReminderPendingClaims').mockReturnValue(mockFilteredStaffWithPendingClaims);

    Scheduler.triggerEmailNotification(tenantRef, 'staffWithPendingClaim');

    expect(emitFunction).toHaveBeenCalledWith(eventNames.Reminder, [tenantRef, mockFilteredStaffWithPendingClaims]);
  });

  it('should check and trigger email notification function if pending claims exists', async () => {
    const { tenantRef } = mockSettings[0];
    const triggerEmailNotification = jest.spyOn(Scheduler, 'triggerEmailNotification').mockImplementation(() => {});
    jest.spyOn(ClaimService, 'fetchClaimsByTenantRef').mockResolvedValue(mockStaffWithPendingClaims);

    await Scheduler.checkPendingClaims([tenantRef]);

    expect(triggerEmailNotification).toHaveBeenCalledWith(tenantRef, mockStaffWithPendingClaims);
  });

  it('should scheduleJobs based on schedule received from SettingService', async () => {
    const { tenantRef, emailSchedule } = mockSettings[0];
    const cronCallback = jest.spyOn(Scheduler, 'checkPendingClaims').mockImplementation(() => {});
    const clock = sinon.useFakeTimers();
    jest.spyOn(Scheduler, 'fetchAllSettings').mockResolvedValue(mockSettings);

    await Scheduler.scheduleJobs();
    clock.tick(90 * 1000);
    ScheduledJobs[tenantRef].stop();

    expect(cronCallback).toHaveBeenCalledWith([tenantRef]);
    expect(ScheduledJobs[tenantRef].cronTime.source).toEqual(emailSchedule);
  });
});
