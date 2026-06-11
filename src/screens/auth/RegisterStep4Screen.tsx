import Text from 'components/CustomText';
import { NAVIGATION_NAME } from 'navigation/NavigationName';
import { View, TouchableOpacity, SafeAreaView, ScrollView, Image } from 'react-native';
import NavigationServices from 'services/NavigationServices';
import { useAuthStore } from 'stores/auth/AuthStore';
import Logo from 'assets/imgs/logo.png';
import { useEffect, useState } from 'react';
import { useSessionStore } from 'stores/session/SessionStore';

export default function RegisterStep4Screen() {
  const { registerData, setRegisterData } = useAuthStore();
  const { getListGoals } = useSessionStore();
  const [data, setData] = useState<any>([
    {
      id: 1,
      icon: '⏳',
      title: 'Turunkan Berat Badan',
      description: 'Hitung target kalori harian untuk mencapai defisit nutrisi yang aman dan sehat.',
      value: 'lose_weight',
    },
    {
      id: 2,
      icon: '💪',
      title: 'Tambah Masa Otot',
      description: 'Optimalkan asupan protein dan nutrisi makro untuk mendukung pertumbuhan otot.',
      value: 'gain_muscle',
    },
    {
      id: 3,
      icon: '🤍',
      title: 'Menjaga Kesehatan',
      description: 'Sesuaikan target gizi harian untuk menjaga metabolisme dan kebugaran tubuh tetap seimbang.',
      value: 'maintain_health',
    },
  ]);

  const getListHealthGoals = async () => {
    const res: any = await getListGoals({
      gender: registerData?.gender || "male",
    });

    if (res?.status == 401) {
      Alert.alert(
        res?.data?.details?.join('\n') ||
          res?.data?.error_description ||
          res?.data?.message ||
          res?.problem ||
          'Network Error'
      );
    } else {
      console.log(res?.data?.data);
      setData((prev: any) => prev?.map((e: any) => {
        const matched = res?.data?.data?.find((x: any) => x.goal_category === e.value);
        return matched 
          ? { ...e, nutrition: matched.nutrition }
          : e;
      }));
    }
  };

  useEffect(() => {
    getListHealthGoals();
  }, []);
  
  return (
    <SafeAreaView className="flex-1 bg-[#FAF8FF]">

      <ScrollView 
        contentContainerStyle={{ flexGrow: 1, padding: 24, paddingBottom: 16 }} 
        showsVerticalScrollIndicator={false}
      >

        <View className="flex-row items-center justify-between mb-8">
          <View className="w-8" />
          <Image source={Logo} className="w-36 h-14" resizeMode='contain' />
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

        {/* Info Box: Estimasi Gizi */}
        <View className="bg-[#E6F6FC]/60 border border-[#10B981]/20 rounded-2xl p-5 mb-8">
          <View className="flex-row items-center mb-4">
            <Text type="bold" className="!text-[#006C49]">
              Estimasi Kebutuhan Harian
            </Text>
          </View>
          
          <View className="flex-row justify-between mb-4">
            <View className="flex-1">
              <Text size={12} className="!text-[#515F74] mb-1">Kalori</Text>
              <Text type="bold" className="!text-[#18042A]">
                {data?.find((e: any) => e.value === registerData?.health_goal)?.nutrition?.calories || 0} Kalori
              </Text>
            </View>
            <View className="flex-1">
              <Text size={12} className="!text-[#515F74] mb-1">Protein</Text>
              <Text type="bold" className="!text-[#18042A]">
                {data?.find((e: any) => e.value === registerData?.health_goal)?.nutrition?.protein_g || 0} g
              </Text>
            </View>
          </View>
          
          <View className="flex-row justify-between mb-4">
            <View className="flex-1">
              <Text size={12} className="!text-[#515F74] mb-1">Karbo</Text>
              <Text type="bold" className="!text-[#18042A]">
                {data?.find((e: any) => e.value === registerData?.health_goal)?.nutrition?.carb_g || 0} g
              </Text>
            </View>
            <View className="flex-1">
              <Text size={12} className="!text-[#515F74] mb-1">Lemak</Text>
              <Text type="bold" className="!text-[#18042A]">
                {data?.find((e: any) => e.value === registerData?.health_goal)?.nutrition?.fat_g || 0} g
              </Text>
            </View>
          </View>

          <Text size={12} className="!text-[#515F74] text-xs italic mt-2">
            *Estimasi ini didasarkan pada profil rata-rata dan akan disesuaikan setelah analisis data tubuh Anda selesai.
          </Text>
        </View>

        {/* Options List */}
        <View className="space-y-3 mb-6">
          {data.map((item: any) => (
            <TouchableOpacity
              key={item.id}
              className={`flex-row items-center ${item.value === registerData.health_goal ? 'bg-[#F3FAF7] border border-[#10B981]' : 'bg-white border border-[#E2E8F0]'} p-4 rounded-2xl mb-3 shadow-sm`}
              onPress={() => item.value != 'custom' ? setRegisterData({ ...registerData, health_goal: item.value }) : NavigationServices.push(NAVIGATION_NAME.AUTH.customTargetScreen, {})}
            >
              <View className={`${item.value === registerData.health_goal ? 'bg-[#10B981]' : 'bg-[#F2F3FF]'} rounded-xl items-center justify-center p-3.5 mr-4`}>
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

        {/* Footer Navigation */}
        <View className="flex-row justify-between items-center mt-auto pt-4">
          <TouchableOpacity className="flex-row items-center p-2 -ml-2" onPress={() => NavigationServices.push(NAVIGATION_NAME.AUTH.registerStep3Screen, {})}>
            <Text type="bold" className="!text-[#515F74] mr-2">←</Text>
            <Text type="bold" className="!text-[#515F74]">Kembali</Text>
          </TouchableOpacity>

          <TouchableOpacity className="bg-primary disabled:bg-[#E2E7FF] px-6 py-3.5 rounded-full flex-row items-center shadow-sm" disabled={!registerData?.health_goal} onPress={() => NavigationServices.push(NAVIGATION_NAME.AUTH.registerStep5Screen, {})}>
            <Text type="bold" className="!text-white mr-2">Lanjutkan</Text>
            <Text type="bold" className="!text-white">→</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>

    </SafeAreaView>
  );
}