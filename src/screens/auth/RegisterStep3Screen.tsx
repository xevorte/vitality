import Text from 'components/CustomText';
import { View, TextInput, TouchableOpacity, SafeAreaView, ScrollView, Image } from 'react-native';
import { useAuthStore } from 'stores/auth/AuthStore';
import { NAVIGATION_NAME } from 'navigation/NavigationName';
import NavigationServices from 'services/NavigationServices';
import Logo from 'assets/imgs/logo.png';

export default function RegisterStep3Screen() {
  const { registerData, setRegisterData } = useAuthStore();

  return (
    <SafeAreaView className="flex-1 bg-[#FAF8FF]">

      <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 24, paddingBottom: 16 }} showsVerticalScrollIndicator={false}>
        <View className="flex-row items-center justify-between mb-8">
          <View className="w-8" />
          <Image source={Logo} className="w-[102px]" resizeMode='contain' />
          <View className="w-8" />
        </View>

        {/* Progress Indicator (Responsive Width) */}
        <View className="mb-8 items-center w-full">
          <Text size={18} type={'bold'} className="!text-gray-900 mb-3">
            Langkah 3 dari 5
          </Text>
          <View className="w-full h-1.5 bg-[#E2E8F0] rounded-full overflow-hidden flex-row">
            <View style={{ width: '60%' }} className="h-full bg-[#10B981] rounded-full" />
          </View>
        </View>

        {/* Titles */}
        <Text size={30} type={'bold'} className="!text-[#18042A] mb-3">Sedikit lebih detail</Text>
        <Text className="!text-[#515F74] mb-8 leading-relaxed">
          Informasi ini membantu kami menghitung kebutuhan kalori Anda.
        </Text>

        {/* Forms */}
        <View className="space-y-4">
          
          {/* Tinggi Badan */}
          <View className="mb-4">
            <Text size={14} type="bold" className="!text-[#18042A] mb-2">Tinggi Badan (cm)</Text>
            <View className="w-full bg-[#F2F3FF] rounded-xl px-4 py-1 flex-row items-center justify-between">
              <TextInput 
                placeholder="Contoh: 170"
                placeholderTextColor="#ADADAD"
                keyboardType="numeric"
                className="flex-1 text-base text-[#18042A] py-3"
                value={registerData?.height_cm ? String(registerData.height_cm) : ''}
                onChangeText={(text) => setRegisterData({ ...registerData, height_cm: Number(text) })}
              />
              <Text className="!text-[#515F74] ml-2">cm</Text>
            </View>
          </View>

          {/* Berat Badan */}
          <View className="mb-4">
            <Text size={14} type="bold" className="!text-[#18042A] mb-2">Berat Badan (kg)</Text>
            <View className="w-full bg-[#F2F3FF] rounded-xl px-4 py-1 flex-row items-center justify-between">
              <TextInput 
                placeholder="Contoh: 65"
                placeholderTextColor="#ADADAD"
                keyboardType="numeric"
                className="flex-1 text-base text-[#18042A] py-3"
                value={registerData?.weight_kg ? String(registerData.weight_kg) : ''}
                onChangeText={(text) => setRegisterData({ ...registerData, weight_kg: Number(text) })}
              />
              <Text className="!text-[#515F74] ml-2">kg</Text>
            </View>
          </View>

          {/* Usia */}
          <View className="mb-4">
            <Text size={14} type="bold" className="!text-[#18042A] mb-2">Usia (tahun)</Text>
            <View className="w-full bg-[#F2F3FF] rounded-xl px-4 py-1 flex-row items-center justify-between">
              <TextInput 
                placeholder="Contoh: 25"
                placeholderTextColor="#ADADAD"
                keyboardType="numeric"
                className="flex-1 text-base text-[#18042A] py-3"
                value={registerData?.age ? String(registerData.age) : ''}
                onChangeText={(text) => setRegisterData({ ...registerData, age: Number(text) })}
              />
              <Text className="!text-[#515F74] ml-2">tahun</Text>
            </View>
          </View>

        </View>

        {/* Footer Navigation */}
        <View className="flex-row justify-between items-center mt-auto pt-8">
          <TouchableOpacity className="flex-row items-center p-2 -ml-2" onPress={() => NavigationServices.push(NAVIGATION_NAME.AUTH.registerStep2Screen, {})}>
            <Text type={'bold'} className="!text-[#515F74] mr-2">←</Text>
            <Text type={'bold'} className="!text-[#515F74]">Kembali</Text>
          </TouchableOpacity>

          <TouchableOpacity className="bg-[#006C49] disabled:bg-[#E2E7FF] px-6 py-3.5 rounded-full flex-row items-center shadow-sm" disabled={!registerData?.height_cm || !registerData?.weight_kg || !registerData?.age} onPress={() => NavigationServices.push(NAVIGATION_NAME.AUTH.registerStep4Screen, {})}>
            <Text type={'bold'} className="!text-white mr-2">Lanjutkan</Text>
            <Text type={'bold'} className="!text-white">→</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}