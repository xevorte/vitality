import Text from 'components/CustomText';
import { NAVIGATION_NAME } from 'navigation/NavigationName';
import { View, TouchableOpacity, SafeAreaView, ScrollView, Image } from 'react-native';
import NavigationServices from 'services/NavigationServices';
import { useAuthStore } from 'stores/auth/AuthStore';
import Logo from 'assets/imgs/logo.png';

export default function RegisterStep4Screen() {
  const { registerData, setRegisterData } = useAuthStore();
  const data = [
    {
      id: 1,
      icon: '⏳',
      title: 'Turunkan Berat Badan',
      description: 'Hitung target kalori harian untuk mencapai defisit nutrisi yang aman dan sehat.',
      value: 'turunkan_berat_badan',
    },
    {
      id: 2,
      icon: '💪',
      title: 'Tambah Masa Otot',
      description: 'Optimalkan asupan protein dan nutrisi makro untuk mendukung pertumbuhan otot.',
      value: 'tambah_masa_otot',
    },
    {
      id: 3,
      icon: '🤍',
      title: 'Menjaga Kesehatan',
      description: 'Sesuaikan target gizi harian untuk menjaga metabolisme dan kebugaran tubuh tetap seimbang.',
      value: 'menjaga_kesehatan',
    },
    {
      id: 4,
      icon: '✏️',
      title: 'Target Kustom',
      description: 'Atur sendiri target kalori dan asupan nutrisi makro harian sesuai kebutuhan spesifik Anda.',
      value: 'target_kustom',
    },
  ];

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

        <View className="mb-8 items-center w-full">
          <Text size={18} type={'bold'} className="!text-gray-900 mb-3">
            Langkah 4 dari 5
          </Text>
          <View className="w-full h-1.5 bg-[#E2E8F0] rounded-full overflow-hidden flex-row">
            <View style={{ width: '80%' }} className="h-full bg-[#10B981] rounded-full" />
          </View>
        </View>

        {/* Title Area */}
        <Text size={24} type="bold" className="!text-[#18042A] mb-2">
          Apa target utama Anda?
        </Text>
        <Text className="!text-[#515F74] text-base mb-6 leading-relaxed">
          Pilih satu fokus agar kami bisa menyesuaikan program untuk Anda.
        </Text>

        {/* Options List */}
        <View className="space-y-3 mb-6">
          {data.map((item: any) => (
            <TouchableOpacity
              key={item.id}
              className={`flex-row items-center ${item.value === registerData.health_goal ? 'bg-[#F3FAF7] border-2 border-[#10B981]' : 'bg-white border border-[#E2E8F0]'} p-4 rounded-2xl mb-3 shadow-sm`}
              onPress={() => item.value != 'target_kustom' ? setRegisterData({ ...registerData, health_goal: item.value }) : NavigationServices.push(NAVIGATION_NAME.AUTH.customTargetScreen, {})}
            >
              <View className={`w-12 h-12 ${item.value === registerData.health_goal ? 'bg-[#10B981]' : 'bg-[#F2F3FF]'} rounded-xl items-center justify-center py-3.5 px-2 mr-4`}>
                <Text size={20} className={item.value === registerData.health_goal ? '!text-white' : '!text-[#006C49]'}>
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
              {item.value === registerData.health_goal && (
                <View className="ml-2 w-6 h-6 bg-[#10B981] rounded-full items-center justify-center">
                  <Text size={12} className="!text-white">✓</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Info Box: Estimasi Gizi */}
        <View className="bg-[#E6F6FC]/60 border border-[#10B981]/20 rounded-2xl p-5 mb-8">
          <View className="flex-row items-center mb-4">
            {/* ICON: Chart */}
            <Text size={20} className="!text-[#006C49] mr-2">📊</Text>
            <Text type="bold" className="!text-[#006C49]">
              Estimasi Kebutuhan Harian
            </Text>
          </View>
          
          <View className="flex-row justify-between mb-4">
            <View className="flex-1">
              <Text size={12} className="!text-[#515F74] mb-1">Kalori</Text>
              <Text type="bold" className="!text-[#18042A]">
                2200 kcal
              </Text>
            </View>
            <View className="flex-1">
              <Text size={12} className="!text-[#515F74] mb-1">Protein</Text>
              <Text type="bold" className="!text-[#18042A]">
                110 g
              </Text>
            </View>
          </View>
          
          <View className="flex-row justify-between mb-4">
            <View className="flex-1">
              <Text size={12} className="!text-[#515F74] mb-1">Karbo</Text>
              <Text type="bold" className="!text-[#18042A]">
                275 g
              </Text>
            </View>
            <View className="flex-1">
              <Text size={12} className="!text-[#515F74] mb-1">Lemak</Text>
              <Text type="bold" className="!text-[#18042A]">
                73 g
              </Text>
            </View>
          </View>

          <Text size={12} className="!text-[#515F74] text-xs italic mt-2">
            *Estimasi ini didasarkan pada profil rata-rata dan akan disesuaikan setelah analisis data tubuh Anda selesai.
          </Text>
        </View>

        {/* Footer Navigation */}
        <View className="flex-row justify-between items-center mt-auto pt-4">
          <TouchableOpacity className="flex-row items-center p-2 -ml-2" onPress={() => NavigationServices.push(NAVIGATION_NAME.AUTH.registerStep3Screen, {})}>
            <Text type="bold" className="!text-[#515F74] mr-2">←</Text>
            <Text type="bold" className="!text-[#515F74]">Kembali</Text>
          </TouchableOpacity>

          <TouchableOpacity className="bg-[#006C49] disabled:bg-[#E2E7FF] px-6 py-3.5 rounded-full flex-row items-center shadow-sm" disabled={!registerData?.health_goal} onPress={() => NavigationServices.push(NAVIGATION_NAME.AUTH.registerStep5Screen, {})}>
            <Text type="bold" className="!text-white mr-2">Lanjutkan</Text>
            <Text type="bold" className="!text-white">→</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>

    </SafeAreaView>
  );
}