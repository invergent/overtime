import cloudinary from 'cloudinary';
import fs from 'fs-extra';
import StaffService from '../utilities/services/StaffService';

export default async (req) => {
  const { tenantRef, currentStaff: { staffId }, files: { image } } = req;

  try {
    const response = await cloudinary.v2.uploader.upload(image.tempFilePath, {
      public_id: `${tenantRef}${staffId.substring(2)}`,
      folder: `overtime/${tenantRef}`
    });
    const { url, secure_url: secureUrl } = response;

    // update staff data with image url
    await StaffService.updateStaffInfo(tenantRef, staffId, { image: secureUrl });

    return [201, 'Image upload successful.', { url, secureUrl }];
  } catch (e) {
    console.log(e);
    
    return [500, 'An error occurred while uploading your image ERR500IMGUPL.'];
  } finally {
    fs.remove(image.tempFilePath.split('/tmp')[0]); // remove upload folder
  }
};
