import { Alert, Platform } from 'react-native';
import { check, PERMISSIONS, request, RESULTS } from 'react-native-permissions';

export default async function requestCameraPermission() {
  const permissionType = Platform.select({
    ios: PERMISSIONS.IOS.CAMERA,
    android: PERMISSIONS.ANDROID.CAMERA,
  });

  const result = await check(permissionType);

  switch (result) {
    case RESULTS.UNAVAILABLE:
      Alert.alert('Error', 'Kamera tidak tersedia di perangkat ini.');
      return false;
    case RESULTS.DENIED:
      const req = await request(permissionType);
      return req === RESULTS.GRANTED;
    case RESULTS.LIMITED:
    case RESULTS.GRANTED:
      return true;
    case RESULTS.BLOCKED:
      Alert.alert(
        'Permission Diblokir',
        'Silakan buka pengaturan untuk mengaktifkan kamera'
      );
      return false;
  }
}
