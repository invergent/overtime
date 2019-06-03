import cloudinary from 'cloudinary';
import fs from 'fs-extra';
import StaffService from '../utilities/services/StaffService';

export default async (req) => {
  const {
    tenantRef, currentStaff, currentAdmin, files: { image }
  } = req;
  const requester = currentStaff || currentAdmin;

  try {
    const response = await cloudinary.v2.uploader.upload(image.tempFilePath, {
      public_id: `${tenantRef}${requester.staffId.substring(2)}`,
      folder: `overtime/${tenantRef}`
    });
    const { url, secure_url: secureUrl } = response;

    // update staff data with image url
    await StaffService.updateStaffInfo(tenantRef, requester.staffId, { image: secureUrl });

    return [201, 'Image upload successful.', { url, secureUrl }];
  } catch (e) {    
    return [500, 'An error occurred while uploading your image ERR500IMGUPL.'];
  } finally {
    fs.remove(image.tempFilePath.split('/tmp')[0]); // remove upload folder
  }
};
