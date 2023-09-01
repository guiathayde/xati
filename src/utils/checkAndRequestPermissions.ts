import { PERMISSIONS, checkMultiple, request } from 'react-native-permissions';

export async function checkAndRequestPermissions() {
  const statuses = await checkMultiple([
    PERMISSIONS.IOS.CAMERA,
    PERMISSIONS.IOS.PHOTO_LIBRARY,
    PERMISSIONS.IOS.MICROPHONE,
    PERMISSIONS.ANDROID.CAMERA,
    PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
    PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
  ]);

  if (statuses['ios.permission.CAMERA'] !== 'granted') {
    await request(PERMISSIONS.IOS.CAMERA);
  }
  if (statuses['ios.permission.PHOTO_LIBRARY'] !== 'granted') {
    await request(PERMISSIONS.IOS.PHOTO_LIBRARY);
  }
  if (statuses['ios.permission.MICROPHONE'] !== 'granted') {
    await request(PERMISSIONS.IOS.MICROPHONE);
  }
  if (statuses['android.permission.CAMERA'] !== 'granted') {
    await request(PERMISSIONS.ANDROID.CAMERA);
  }
  if (statuses['android.permission.READ_EXTERNAL_STORAGE'] !== 'granted') {
    await request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
  }
  if (statuses['android.permission.WRITE_EXTERNAL_STORAGE'] !== 'granted') {
    await request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);
  }
}
