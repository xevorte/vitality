import Text from 'components/CustomText';
import { View, TouchableOpacity, SafeAreaView, ScrollView, Image } from 'react-native';
import { useAuthStore } from 'stores/auth/AuthStore';
import { NAVIGATION_NAME } from 'navigation/NavigationName';
import NavigationServices from 'services/NavigationServices';
import Logo from 'assets/imgs/logo.png';

export default function ActivityLevelScreen() {
  const { registerData, setRegisterData } = useAuthStore();
  const data = [
    {
      id: 1,
      icon: '🛋️',
      title: 'Sangat jarang olahraga',
      description: 'Pekerjaan kantor atau gaya hidup sedenter',
      value: 'sedentary'
    },
    {
      id: 2,
      icon: '🚶',
      title: 'Ringan (1-3x/ minggu)',
      description: 'Jalan santai atau olahraga intensitas rendah',
      value: 'light'
    },
    {
      id: 3,
      icon: '🏋️',
      title: 'Sedang (3-5x/ minggu)',
      description: 'Latihan kekuatan atau aktivitas fisik moderat',
      value: 'moderate'
    },
    {
      id: 4,
      icon: '🏃',
      title: 'Aktif (6-7x/ minggu)',
      description: 'Latihan intensif atau aktivitas fisik tinggi',
      value: 'active'
    },
    {
      id: 5,
      icon: '⚡',
      title: 'Atlet/ Sangat Aktif',
      description: 'Latihan fisik berat atau pekerjaan fisik ekstrim',
      value: 'athlete'
    }
  ];

  return (
    <SafeAreaView className="flex-1 bg-[#FAF8FF]">

      <ScrollView 
        contentContainerStyle={{ flexGrow: 1, padding: 24, paddingBottom: 24 }} 
        showsVerticalScrollIndicator={false}
      >
        
        <View className="flex-row items-center justify-between mb-8">
          <View className="w-8" />
          <Image source={Logo} className="w-36 h-14" resizeMode='contain' />
          <View className="w-8" /> 
        </View>

        <View className="mb-8 items-center w-full">
          <Text size={18} type={'bold'} className="!text-gray-900 mb-3">
            Langkah 5 dari 5
          </Text>
          <View className="w-full h-1.5 bg-[#E2E8F0] rounded-full overflow-hidden flex-row">
            <View style={{ width: '100%' }} className="h-full bg-[#10B981] rounded-full" />
          </View>
        </View>

        {/* Text Titles */}
        <Text size={30} type='bold' className="!text-[#18042A] mb-3 leading-tight">
          Seberapa aktif Anda setiap harinya?
        </Text>
        <Text className="!text-[#515F74] mb-8 leading-relaxed">
          Tingkat aktivitas sangat penting untuk menghitung TDEE (Total Daily Energy Expenditure) agar kami dapat menentukan target kalori harian yang paling akurat bagi tubuh Anda.
        </Text>

        {/* Options List */}
        <View className="space-y-4 mb-8">
          {data.map((item: any) => (
            <TouchableOpacity
              key={item.id}
              className={`flex-row items-center ${item.value === registerData.activity_level ? 'bg-[#F3FAF7] border-2 border-[#10B981]' : 'bg-white border border-[#E2E8F0]'} p-4 rounded-2xl mb-3 shadow-sm`}
              onPress={() => setRegisterData({ ...registerData, activity_level: item.value })}
            >
              <View className={`${item.value === registerData.activity_level ? 'bg-[#10B981]' : 'bg-[#F2F3FF]'} rounded-xl items-center justify-center p-3.5 mr-4`}>
                <Text size={20} className={item.value === registerData.activity_level ? '!text-white' : '!text-[#006C49]'}>
                  {item.icon}
                </Text>
              </View>
              <View className="flex-1">
                <Text type="bold" className="!text-[#18042A] mb-1">
                  {item.title}
                </Text>
                <Text size={12} className="!text-[#515F74]">
                  {item.description}
                </Text>
              </View>
              {item.value === registerData.activity_level && (
                <View className="ml-2 w-6 h-6 bg-[#10B981] rounded-full items-center justify-center">
                  <Text size={12} className="!text-white">✓</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Footer Navigation (Selalu di bawah) */}
        <View className="flex-row justify-between items-center mt-auto pt-4">
          <TouchableOpacity className="flex-row items-center p-2 -ml-2" onPress={() => NavigationServices.push(NAVIGATION_NAME.AUTH.registerStep4Screen, {})}>
            <Text type="bold" className="!text-[#515F74] mr-2">←</Text>
            <Text type="bold" className="!text-[#515F74]">Kembali</Text>
          </TouchableOpacity>

          <TouchableOpacity className="bg-primary disabled:bg-[#E2E7FF] px-6 py-3.5 rounded-full flex-row items-center shadow-sm" disabled={!registerData?.activity_level} onPress={() => NavigationServices.push(NAVIGATION_NAME.AUTH.registerStep6Screen, {})}>
            <Text type="bold" className="!text-white mr-2">Lanjutkan</Text>
            <Text type="bold" className="!text-white">→</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>

    </SafeAreaView>
  );
}