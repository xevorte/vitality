import React from 'react';
import {Image, ImageBackground, StyleSheet, View} from 'react-native';
import Logo from 'assets/imgs/logo.png';
import Illustration from 'assets/imgs/splash-illustration.png';
import Text from 'components/CustomText';

const SplashScreen = () => {
  return (
    <View className="min-h-screen flex flex-col items-center justify-between">
      <View className="w-full p-4">
        <Image src={Logo} width={114} />
      </View>
      <View className="text-center px-4">
        <ImageBackground
          source={Illustration}
          resizeMode="cover"
          className='w-full h-[15vh] mb-10'
        >
        </ImageBackground>
        <Text type='bold' size={48} className='!text-dark mb-3'>Nutrisi dalam Sekali Pindai</Text>
        <Text type='regular' size={18} className='!text-secondaryDark mb-6'>Analisis gizi dan estimasi berat bahan makanan mentah secara instan menggunakan teknologi AI.</Text>
        <View className="flex flex-row gap-3">
          <View className="flex-1 flex- border border-secondary rounded-xl p-4"></View>
        </View>
      </View>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({});
