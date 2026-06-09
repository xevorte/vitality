import { View, TouchableOpacity, SafeAreaView, ScrollView, Image } from 'react-native';
import { NAVIGATION_NAME } from 'navigation/NavigationName';
import { useAuthStore } from 'stores/auth/AuthStore';
import Illustration from 'assets/imgs/splash-illustration.png';
import NavigationServices from 'services/NavigationServices';
import Text from 'components/CustomText';
import Logo from 'assets/imgs/logo.png';

export default function WelcomeScreen() {
  const { resetRegisterData } = useAuthStore();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FAF8FF' }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="flex items-center justify-center bg-white h-20 p-4 pt-8 pb-0">
          <Image source={Logo} className="w-36 h-14 mb-6" resizeMode='contain' />
        </View>
        <View className='p-4'>
          <View  
            className="w-full h-2/5 mb-6 overflow-hidden"
          >
            <Image source={Illustration} className="w-full h-full" resizeMode="cover" />
          </View>

          <Text type='bold' size={40} className="!text-gray-900 text-center mb-3">
            Nutrisi dalam Sekali Pindai
          </Text>
          <Text size={18} className="!text-gray-500 text-center mb-6 px-4">
            Analisis gizi dan estimasi berat bahan makanan mentah secara instan menggunakan teknologi AI.
          </Text>

          <View className="flex-row justify-between mb-8 w-full gap-x-4">
            <View className="flex-1 bg-white border border-gray-100 rounded-2xl p-4 items-center shadow-sm">
              <Text size={24} className="!text-[#006C49] mb-2">📷</Text>
              <Text type='semibold' size={14} className="!text-gray-900 text-center mb-1">
                Scanner AI Cerdas
              </Text>
              <Text size={10} className="!text-gray-500 text-center">
                Deteksi bahan otomatis via kamera.
              </Text>
            </View>

            <View className="flex-1 bg-white border border-gray-100 rounded-2xl p-4 items-center shadow-sm">
              <Text size={24} className="!text-[#006C49] mb-2">⏳</Text>
              <Text type='semibold' size={14} className="!text-gray-900 text-center mb-1">
                Estimasi Berat & Gizi
              </Text>
              <Text size={10} className="!text-gray-500 text-center">
                Makro & kalori instan tanpa timbangan.
              </Text>
            </View>
          </View>

          <TouchableOpacity className="w-full bg-primary rounded-full py-4 flex-row justify-center items-center mb-6 shadow-md shadow-[#006C49]/30" onPress={() => {
            resetRegisterData();
            NavigationServices.push(NAVIGATION_NAME.AUTH.registerStep1Screen, {});
          }}>
            <Text type='bold' className="!text-white mr-2">
              Mulai Sekarang
            </Text>
            <Text type='bold' className="!text-white">
              →
            </Text>
          </TouchableOpacity>
        </View>

        <View className="flex-col gap-2 items-center bg-white py-4 shadow-xl shadow-gray-200 mt-12">
          <Text type='bold' size={14} className="!text-gray-500">Sudah punya akun? </Text>
          <TouchableOpacity onPress={() => NavigationServices.push(NAVIGATION_NAME.AUTH.loginScreen, {})}>
            <Text type='bold' size={14} className="!text-[#006C49]">
              Masuk ke Akun Anda
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
