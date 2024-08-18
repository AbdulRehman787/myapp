import { Platform, PermissionsAndroid, PermissionsIOS } from 'react-native';

export const androidCameraPermission = async () => {
  try {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.CAMERA,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      ]);
      if (
        granted['android.permission.CAMERA'] !== 'granted' ||
        granted['android.permission.WRITE_EXTERNAL_STORAGE'] !== 'granted' ||
        granted['android.permission.READ_EXTERNAL_STORAGE'] !== 'granted'
      ) {
        console.log('Permission denied');
        return false;
      }
      return true;
    } else if (Platform.OS === 'ios') {
      const cameraPermission = await PermissionsIOS.request('camera');
      const storagePermission = await PermissionsIOS.request('photoLibrary');

      if (cameraPermission === 'denied' || storagePermission === 'denied') {
        console.log('Permission denied');
        return false;
      }
      return true;
    }
    return false;
  } catch (error) {
    console.error(error);
    return false;
  }
};