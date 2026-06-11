import { Alert, Image, Modal } from 'react-native';
import { View, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { useSessionStore } from 'stores/session/SessionStore';
import User from 'assets/imgs/user.png';
import ScanIllustration from 'assets/imgs/scan-instruction.png';
import Text from 'components/CustomText';
import NavigationServices from 'services/NavigationServices';
import { NAVIGATION_NAME } from 'navigation/NavigationName';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { formatListWithAnd } from 'utils/useTextFormatting';

export default function HomeScreen() {
  const { profile, getUserGoal, getListNutritions, showGuideModal, setShowGuideModal, setNutritions } = useSessionStore();
  const [dailyNutrition, setDailyNutrition] = useState<any>({});
  const [userGoal, setUserGoal] = useState<any>({});

  const getListNutritionsData = async () => {
    const res: any = await getListNutritions({
      target_date: format(new Date(), 'yyyy-MM-dd'),
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
      setDailyNutrition(res?.data?.data);
    }
  };

  const getUserGoalData = async () => {
    const res: any = await getUserGoal();

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
      setUserGoal(res?.data?.data);
    }
  };

  useEffect(() => {
    getListNutritionsData();
    getUserGoalData();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-[#FAF8FF]">
      <Modal animationType="fade" transparent={true} visible={showGuideModal} onRequestClose={() => setShowGuideModal(false)}>
        <View className="flex-1 bg-black/60 justify-center items-center p-6">
          <View className="w-full max-w-md bg-white rounded-3xl overflow-hidden shadow-2xl">
            
            <View className="w-full bg-[#F2F3FF] py-8 flex-row justify-center items-center px-6 space-x-4">
              <Image source={ScanIllustration} className="w-96 h-32" resizeMode='contain' />
            </View>

            <ScrollView className="p-6 max-h-96" showsVerticalScrollIndicator={false}>
              <Text size={20} type='bold' className="!text-dark text-center mb-6 px-2">
                Cara Menggunakan AI Scanner
              </Text>

              <View className="flex-row items-start mb-5">
                <View className="w-10 h-10 bg-primary/10 rounded-full items-center justify-center mr-4">
                  <Text size={18} type='bold' className="!text-primary">🎯</Text>
                </View>
                <View className="flex-1">
                  <Text type='semibold' className="!text-dark mb-1">Pindai Beberapa Objek</Text>
                  <Text size={14} className="!text-secondaryDark leading-relaxed">
                    Anda bisa menaruh beberapa bahan mentah sekaligus dalam satu frame.
                  </Text>
                </View>
              </View>
            </ScrollView>

            <View className="p-6 pt-0">
              <TouchableOpacity 
                onPress={() => {
                  setShowGuideModal(false);
                  setNutritions([]);
                  NavigationServices.push(NAVIGATION_NAME.MAIN.scanScreen, {});
                }} 
                className="w-full bg-primaryDark py-4 rounded-full items-center shadow-md shadow-primaryDark/20"
              >
                <Text type='bold' className="!text-white">Mengerti</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <ScrollView contentContainerStyle={{ padding: 24 }} showsVerticalScrollIndicator={false}>
        {/* Header Profile */}
        <View className="flex-row items-center my-6">
          {/* Wadah Foto Profil */}
          <View className="w-12 h-12 bg-secondary rounded-full mr-3 overflow-hidden border border-gray-200">
            <Image source={User} className="w-full h-full" resizeMode='contain' />
          </View>
          <View>
            <Text size={18} type='bold' className="!text-primary">Halo, {profile?.name}</Text>
          </View>
        </View>

        {/* Dashboard Card: Target Gizi Harian */}
        <View className="w-full bg-white border border-[#E2E8F0] rounded-3xl p-5 shadow-sm mb-8">
          <View className="flex-row justify-between items-center">
            <View className="flex-1 pr-4">
              <Text size={12} type='bold' className="!text-secondaryDark tracking-wider uppercase mb-1">
                Target Gizi Harian
              </Text>
              <TouchableOpacity className="flex-row items-center mb-2">
                <Text size={12} type='medium' className="!text-006C49 mr-1">⇄ Ubah Target</Text>
              </TouchableOpacity>
              <Text size={30} type='bold' className="!text-dark">
                {Math.max(0, (userGoal?.nutrition?.calories || 0) - (dailyNutrition?.nutrition_total?.calories || 0))} <Text size={14} className="!text-secondaryDark font-normal">Kalori Tersisa</Text>
              </Text>
            </View>
            <View className={`w-24 h-24 rounded-full border-4 ${Math.min((dailyNutrition?.nutrition_total?.calories / userGoal?.nutrition?.calories) * 100, 100) > 90 ? 'border-primary' : 'border-warning'} items-center justify-center relative`}>
              <Text type='bold' className={Math.min((dailyNutrition?.nutrition_total?.calories / userGoal?.nutrition?.calories) * 100, 100) > 90 ? '!text-primary' : '!text-warning'}>{Math.min(((dailyNutrition?.nutrition_total?.calories || 0) / (userGoal?.nutrition?.calories || 0)) * 100, 100).toFixed(2)}%</Text>
            </View>
          </View>
          <View className="flex-1 flex-row gap-5 mt-4">
            {/* Protein */}
            <View className='flex-1'>
              <View className="flex-row justify-between mb-1">
                <Text size={12} type='medium' className="!text-dark">Protein <Text size={12} className="text-secondaryDarkest font-normal">{dailyNutrition?.nutrition_total?.protein_g}/ {userGoal?.nutrition?.protein_g}g</Text></Text>
              </View>
              <View className="w-full h-1.5 bg-[#E6E6E6] rounded-full overflow-hidden">
                <View style={{ width: `${Math.min((dailyNutrition?.nutrition_total?.protein_g?.toFixed(1) / userGoal?.nutrition?.protein_g) * 100, 100)}%` }} className="h-full bg-primary" />
              </View>
            </View>

            {/* Carbs */}
            <View className='flex-1'>
              <View className="flex-row justify-between mb-1">
                <Text size={12} type='medium' className="!text-dark">Karbo <Text size={12} className="text-secondaryDarkest font-normal">{dailyNutrition?.nutrition_total?.carb_g?.toFixed(1)}/ {userGoal?.nutrition?.carb_g}g</Text></Text>
              </View>
              <View className="w-full h-1.5 bg-[#E6E6E6] rounded-full overflow-hidden">
                <View style={{ width: `${Math.min((dailyNutrition?.nutrition_total?.carb_g / userGoal?.nutrition?.carb_g) * 100, 100)}%` }} className="h-full bg-primary" />
              </View>
            </View>

            {/* Fats */}
            <View className='flex-1'>
              <View className="flex-row justify-between mb-1">
                <Text size={12} type='medium' className="!text-dark">Lemak <Text size={12} className="text-secondaryDarkest font-normal">{dailyNutrition?.nutrition_total?.fat_g?.toFixed(1)}/ {userGoal?.nutrition?.fat_g}g</Text></Text>
              </View>
              <View className="w-full h-1.5 bg-[#E6E6E6] rounded-full overflow-hidden">
                <View style={{ width: `${Math.min((dailyNutrition?.nutrition_total?.fat_g / userGoal?.nutrition?.fat_g) * 100, 100)}%` }} className="h-full bg-primary" />
              </View>
            </View>
          </View>
        </View>

        {/* Section Title */}
        <View className="flex-row justify-between items-center mb-4">
          <Text size={18} type='bold' className="!text-dark">Jurnal Makanan Hari Ini</Text>
          <TouchableOpacity>
            <Text size={14} type='bold' className="!text-primary">Lihat Detail</Text>
          </TouchableOpacity>
        </View>

        {/* Food Journal List */}
        <View className="space-y-4">
          
          {/* Card Sarapan */}
          <View className={`w-full bg-white border ${dailyNutrition?.category?.breakfast?.food?.length <= 0 ? 'border-dashed' : ''} border-[#E2E8F0] p-4 rounded-2xl flex-row items-center justify-between mb-3 shadow-sm`}>
            <View className="flex-row flex-wrap items-center flex-1">
              <View className="w-12 h-12 bg-warning/10 rounded-xl items-center justify-center mr-4">
                <Text size={20}>☀️</Text>
              </View>
              <View className="flex-1">
                <Text type='bold' className="!text-dark mb-0.5">Sarapan</Text>
                <Text size={12} className="!text-secondaryDark">{dailyNutrition?.category?.breakfast?.food?.length > 0 ? `${formatListWithAnd(dailyNutrition?.category?.breakfast?.food?.map((e: any) => e?.food_name))} • ${dailyNutrition?.category?.breakfast?.nutrition_total?.calories} Kalori` : 'Belum ada data'}</Text>
              </View>
            </View>
            <TouchableOpacity className="bg-primary rounded-full items-center justify-center pt-1 pb-1.5 px-3" onPress={() => NavigationServices.push(NAVIGATION_NAME.MAIN.goalDetailScreen, {
              category: 'breakfast'
            })}>
              <Text size={18} type='bold' className="!text-white">+</Text>
            </TouchableOpacity>
          </View>

          {/* Card Makan Siang */}
          <View className={`w-full bg-white border ${dailyNutrition?.category?.lunch?.food?.length <= 0 ? 'border-dashed' : ''} border-[#E2E8F0] p-4 rounded-2xl flex-row items-center justify-between mb-3 shadow-sm`}>
            <View className="flex-row flex-wrap items-center flex-1">
              <View className="w-12 h-12 bg-danger/10 rounded-xl items-center justify-center mr-4">
                <Text className="text-xl">🌤️</Text>
              </View>
              <View className="flex-1">
                <Text type='bold' className="!text-dark mb-0.5">Makan Siang</Text>
                <Text size={12} className="!text-secondaryDark">{dailyNutrition?.category?.lunch?.food?.length > 0 ? `${formatListWithAnd(dailyNutrition?.category?.lunch?.food?.map((e: any) => e?.food_name))} • ${dailyNutrition?.category?.lunch?.nutrition_total?.calories} Kalori` : 'Belum ada data'}</Text>
              </View>
            </View>
            <TouchableOpacity className="bg-primary rounded-full items-center justify-center pt-1 pb-1.5 px-3" onPress={() => NavigationServices.push(NAVIGATION_NAME.MAIN.goalDetailScreen, {
              category: 'lunch'
            })}>
              <Text size={18} type='bold' className="!text-white">+</Text>
            </TouchableOpacity>
          </View>

          {/* Card Makan Malam (Kosong) */}
          <View className={`w-full bg-white border ${dailyNutrition?.category?.dinner?.food?.length <= 0 ? 'border-dashed' : ''} border-[#E2E8F0] p-4 rounded-2xl flex-row items-center justify-between mb-3 shadow-sm`}>
            <View className="flex-row flex-wrap items-center flex-1">
              <View className="w-12 h-12 bg-secondaryLightest rounded-xl items-center justify-center mr-4">
                <Text className="text-xl">🌙</Text>
              </View>
              <View className="flex-1">
                <Text type='bold' className="!text-dark mb-0.5">Makan Malam</Text>
                <Text size={12} className="!text-secondaryDark">{dailyNutrition?.category?.dinner?.food?.length > 0 ? `${formatListWithAnd(dailyNutrition?.category?.dinner?.food?.map((e: any) => e?.food_name))} • ${dailyNutrition?.category?.dinner?.nutrition_total?.calories} Kalori` : 'Belum ada data'}</Text>
              </View>
            </View>
            <TouchableOpacity className="bg-primary rounded-full items-center justify-center pt-1 pb-1.5 px-3" onPress={() => NavigationServices.push(NAVIGATION_NAME.MAIN.goalDetailScreen, {
              category: 'dinner'
            })}>
              <Text size={18} type='bold' className="!text-white">+</Text>
            </TouchableOpacity>
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}