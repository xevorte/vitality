import { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Platform,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { Camera, useCameraDevice } from 'react-native-vision-camera';
import mime from 'mime';

import Text from 'components/CustomText';
import { NAVIGATION_NAME } from 'navigation/NavigationName';
import NavigationServices from 'services/NavigationServices';
import requestCameraPermission from 'services/Permission';
import { useSessionStore } from 'stores/session/SessionStore';
import { useRoute } from '@react-navigation/native';
import ApiServices from 'services/ApiServices';

const ScanScreen = () => {
  const { predictNutrition, createNutrition } = useSessionStore();
  const { category } = useRoute<any>().params;
  const camera = useRef<any>(null);
  const device = useCameraDevice('back');
  const [disabledButton, setDisabledButton] = useState(false);
  const [isTorchMode, setIsTorchMode] = useState(false);
  const [hasPermission, setHasPermission] = useState(false);

  const initCamera = async () => {
    const allowed = await requestCameraPermission();
    setHasPermission(allowed);
  };

  const handleCapture = async () => {
    if (camera.current) {
      setDisabledButton(true);

      try {
        const options = { quality: 100, skipMetadata: true };
        const photo = await camera.current.takePhoto(options);
        
        const imagePath = photo?.path || photo?.uri;
        const file = {
          uri: Platform.OS === 'android' ? `file://${imagePath}` : imagePath,
          type: `image/*`,
          name: `foods.jpg`,
        };

        const res: any = await ApiServices.predict({ file });

        if (res?.status == 401) {
          Alert.alert(
            res?.data?.details?.join('\n') ||
              res?.data?.error_description ||
              res?.data?.message ||
              res?.problem ||
              'Network Error'
          );
        } else {
          console.log(res?.data);
          if (res?.data?.message == "Prediction successful") {
            NavigationServices.push(
              NAVIGATION_NAME.MAIN.scanDetailScreen,
              { category, food: { food_image: file, nutrition: res?.data?.data } }
            );
          } else {
            Alert.alert("Gagal Mendeteksi Makanan");
          }
        }
      } catch (error: any) {
        console.log('Capture failed', error);
        Alert.alert(error?.data?.message);
      } finally {
        setDisabledButton(false);
      }
    }
  };

  useEffect(() => {
    initCamera();
  }, []);

  if (!hasPermission) {
    return (
      <View className="h-full bg-white items-center justify-center px-6">
        <Text className="text-center mb-2" size={18} type="bold">
          Camera permission is required
        </Text>
        <Text className="text-center mb-6" type="regular">
          Please enable camera access in your device settings to continue the
          verification process.
        </Text>
        <Pressable
          className="bg-primary px-6 py-3 rounded-md"
          onPress={initCamera}>
          <Text color="white" size={16} type="medium">
            Allow Camera
          </Text>
        </Pressable>
      </View>
    );
  }

  if (!device) {
    return <></>;
  }

  return (
    <View className="h-full bg-white">
      {disabledButton && (
        <View className="absolute inset-0 bg-black/50 justify-center items-center">
          <View className="bg-white p-6 rounded-xl items-center">
            <ActivityIndicator size="large" color="#006C49" />
            <Text className="mt-3 text-gray-600">Memproses...</Text>
          </View>
        </View>
      )}
      <Camera
        device={device}
        isActive
        photo
        ref={camera}
        torch={isTorchMode ? 'on' : 'off'}
        style={StyleSheet.absoluteFill}
      />
      <View className="absolute inset-0 flex-col justify-between p-6 bg-black/20">
        
        {/* TOP BAR: Tombol Kembali & Tombol Bantuan */}
        <View className="flex-row justify-between items-center mt-6">
          <TouchableOpacity
            onPress={() => NavigationServices.pop()} 
            className="w-10 h-10 items-center justify-center rounded-full bg-black/40 pb-2"
          >
            <Text color="white" size={24}>←</Text>
          </TouchableOpacity>
          
          <TouchableOpacity className="w-10 h-10 items-center justify-center rounded-full bg-black/40">
            <Text color="white" size={22}>?</Text>
          </TouchableOpacity>
        </View>

        {/* CENTER AREA: Bingkai Scanner Dinamis (Menggunakan Outline Borders) */}
        <View className="items-center justify-center my-auto">
          <View className="w-72 h-72 relative">
            {/* Sudut Kiri Atas */}
            <View className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-primary rounded-tl-2xl" />
            {/* Sudut Kanan Atas */}
            <View className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-primary rounded-tr-2xl" />
            {/* Sudut Kiri Bawah */}
            <View className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-primary rounded-bl-2xl" />
            {/* Sudut Kanan Bawah */}
            <View className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-primary rounded-br-2xl" />
          </View>

          {/* Teks Petunjuk di Bawah Bingkai */}
          <Text
            className="mt-8 px-6 bg-black/40 py-2 rounded-full overflow-hidden"
            color="white"
            textAlign="center"
            type="medium"
            size={14}
          >
            Sejajarkan makanan di dalam bingkai
          </Text>
        </View>

        {/* BOTTOM BAR: Flash, Capture Trigger, & Gallery */}
        <View className="flex-row justify-between items-center mb-16 px-4">
          {/* Tombol Flash Placeholder */}
          <TouchableOpacity className="w-12 h-12 items-center justify-center rounded-full bg-black/40" onPress={() => setIsTorchMode(!isTorchMode)}>
            <Text color="white" size={20}>⚡</Text>
          </TouchableOpacity>

          {/* Tombol Shutter Utama (Dibuat persis seperti lingkaran ganda di gambar) */}
          <Pressable
            className="h-20 w-20 bg-white/20 p-1.5 rounded-full items-center justify-center border-2 border-white disabled:border-primary"
            onPress={handleCapture}
            disabled={disabledButton}
          >
            <View className="h-full w-full bg-white rounded-full border-2 border-gray-200" />
          </Pressable>

          {/* Tombol Galeri Placeholder */}
          {/* <TouchableOpacity className="w-12 h-12 items-center justify-center rounded-full bg-black/40">
            <Text color="white" size={20}>🖼️</Text>
          </TouchableOpacity> */}
        </View>

      </View>
    </View>
  );
};

export default ScanScreen;
