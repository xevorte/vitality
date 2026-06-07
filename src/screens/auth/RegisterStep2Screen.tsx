import Text from 'components/CustomText';
import { NAVIGATION_NAME } from 'navigation/NavigationName';
import { View, TextInput, TouchableOpacity, SafeAreaView, ScrollView, Image } from 'react-native';
import { useAuthStore } from 'stores/auth/AuthStore';
import NavigationServices from 'services/NavigationServices';
import Logo from 'assets/imgs/logo.png';

export default function RegisterStep2Screen() {
  const { registerData, setRegisterData } = useAuthStore();

  return (
    <SafeAreaView className="flex-1 bg-[#FAF8FF]">

      <ScrollView 
        contentContainerStyle={{ flexGrow: 1, padding: 24, paddingBottom: 16 }} 
        showsVerticalScrollIndicator={false}
      >

        <View className="flex-row items-center justify-between mb-8">
          <View className="w-8" />
          <Image source={Logo} className="w-[102px]" resizeMode='contain' />
          <View className="w-8" /> 
        </View>

        {/* Progress Indicator (Responsive Width) */}
        <View className="mb-8 items-center w-full">
          <Text size={18} type={'bold'} className="!text-gray-900 mb-3">
            Langkah 2 dari 5
          </Text>
          <View className="w-full h-1.5 bg-[#E2E8F0] rounded-full overflow-hidden flex-row">
            <View style={{ width: '40%' }} className="h-full bg-[#10B981] rounded-full" />
          </View>
        </View>

        {/* Title Area */}
        <Text size={24} type="bold" className="!text-[#18042A] mb-2">
          Kenalan yuk!
        </Text>
        <Text className="!text-[#515F74] mb-8 leading-relaxed">
          Beri tahu kami dasar-dasar tentang diri Anda.
        </Text>

        {/* Form Input: Nama Lengkap */}
        <View className="mb-6">
          <Text size={14} type="bold" className="!text-[#18042A] mb-2">
            Nama Lengkap
          </Text>
          <View className="w-full bg-[#F2F3FF] rounded-xl px-4 py-4">
            <TextInput
              placeholder="Masukkan nama Anda"
              placeholderTextColor="#3C4A42"
              className="text-base text-[#18042A] p-0"
              value={registerData?.name}
              onChangeText={(text) => setRegisterData({ ...registerData, name: text })}
            />
          </View>
        </View>

        {/* Form Input: Jenis Kelamin */}
        <View className="mb-8">
          <Text size={14} type="bold" className="!text-[#18042A] mb-2">
            Jenis Kelamin
          </Text>
          <View className="flex-row justify-between w-full gap-x-4">
            <TouchableOpacity className={`flex-1 bg-white border ${registerData?.gender === 'pria' ? 'border-[#006C49]' : 'border-[#E2E8F0]'} rounded-2xl py-8 items-center shadow-sm`} onPress={() => setRegisterData({ ...registerData, gender: 'pria' })}>
              <View className="w-16 h-16 bg-[#F2F3FF] rounded-full items-center justify-center mb-4">
                <Text size={24} type="bold" className="!text-[#006C49]">
                  ♂
                </Text>
              </View>
              <Text type="bold" className="!text-[#18042A]">
                Pria
              </Text>
            </TouchableOpacity>

            {/* Card Wanita */}
            <TouchableOpacity className={`flex-1 bg-white border ${registerData?.gender === 'wanita' ? 'border-[#006C49]' : 'border-[#E2E8F0]'} rounded-2xl py-8 items-center shadow-sm`} onPress={() => setRegisterData({ ...registerData, gender: 'wanita' })}>
              <View className="w-16 h-16 bg-[#F2F3FF] rounded-full items-center justify-center mb-4">
                <Text size={24} type="bold" className="!text-[#006C49]">
                  ♀
                </Text>
              </View>
              <Text type="bold" className="!text-[#18042A]">
                Wanita
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View className="flex-row justify-between items-center mt-auto pt-8">
          <TouchableOpacity className="flex-row items-center p-2 -ml-2" onPress={() => NavigationServices.push(NAVIGATION_NAME.AUTH.registerStep1Screen, {})}>
            <Text type="bold" className="!text-[#515F74] mr-2">←</Text>
            <Text type="bold" className="!text-[#515F74]">
              Kembali
            </Text>
          </TouchableOpacity>

          <TouchableOpacity className="bg-[#006C49] disabled:bg-[#E2E7FF] px-6 py-3.5 rounded-full flex-row items-center shadow-sm" disabled={!registerData?.name || !registerData?.gender} onPress={() => NavigationServices.push(NAVIGATION_NAME.AUTH.registerStep3Screen, {})}>
            <Text type="bold" className="!text-white mr-2">
              Lanjutkan
            </Text>
            <Text type="bold" className="!text-white">
              →
            </Text>
          </TouchableOpacity>
        </View>
        
      </ScrollView>

    </SafeAreaView>
  );
}