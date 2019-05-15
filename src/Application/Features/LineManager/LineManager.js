import services from '../utilities/services';
import { eventNames } from '../utilities/utils/types';
import notifications from '../utilities/notifications';

const { LineManagerService, StaffService } = services;

class LineManager {
  static async addOrChangeLineManager(req) {
    const { currentStaff: { staffId }, body: lineManagerDetails, tenantRef } = req;
    
    const { lineManagerRole } = lineManagerDetails;
    const lineManagerIdColumn = lineManagerRole === 'Supervisor'
      ? 'supervisorId' : 'bsmId';
    
    try {
      const [lineManager, created] = await LineManagerService
        .findOrCreateLineManager(lineManagerDetails);
        
      const data = { ...lineManager.toJSON(), staffId, lineManagerIdColumn };
      await StaffService.updateStaffsLineManager(tenantRef, data);
    
      notifications.emit(
        eventNames.LogActivity, [`${created ? 'Added' : 'Updated'} lineManager`, staffId, lineManager]
      );
    
      return [
        created ? 201 : 200,
        `${lineManagerRole} ${created ? 'added' : 'updated'} successfully.`,
        lineManager
      ];
    } catch (e) {
      return [500, 'An error occured ERR500CNGLNM'];
    }
  }

  static async fetchLineManagers() {
    const lineManagers = await LineManagerService.fetchLineManagers();
    return [200, 'Request successful!', lineManagers];
  }
}

export default LineManager;
