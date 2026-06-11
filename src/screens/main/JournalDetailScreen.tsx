import Text from 'components/CustomText';
import { format } from 'date-fns';
import { NAVIGATION_NAME } from 'navigation/NavigationName';
import { useEffect, useState } from 'react';
import { View, SafeAreaView, ScrollView, TouchableOpacity, Alert } from 'react-native';
import NavigationServices from 'services/NavigationServices';
import { useSessionStore } from 'stores/session/SessionStore';
import { formatListWithAnd } from 'utils/useTextFormatting';

export default function JournalDetailScreen() {
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
    <SafeAreaView className="flex-1 bg-[#FAFAFA]">
      <ScrollView contentContainerStyle={{ padding: 24 }} showsVerticalScrollIndicator={false}>
        
        <View className="flex-row items-center mb-6">
          <TouchableOpacity className="p-2 -ml-2 mr-4">
            <Text size={20} type='bold' className="!text-primaryDark">←</Text>
          </TouchableOpacity>
          <Text size={20} type='bold' className="!text-[#006C49]">
            Selasa, 14 Mei
          </Text>
        </View>

        <View className="w-full bg-white border border-[#E2E8F0] rounded-3xl p-5 shadow-sm mb-8">
          <Text size={12} type='bold' className="!text-secondaryDark tracking-wider uppercase mb-1">
            Target Gizi Harian
          </Text>
          <Text size={36} type='bold' className="!text-dark mb-1">
            2100 <Text size={14} type='regular' className="!text-secondaryDark">Kalori tersisa</Text>
          </Text>
          <Text size={12} className="!text-secondaryDark mb-5">Target hari ini: 2,500 Kalori</Text>

          <View className="mb-6">
            <View className="w-32 h-32 rounded-full border-8 border-primary items-center justify-center relative">
              <Text size={20} type='bold' className="!text-primary">{Math.min(((dailyNutrition?.nutrition_total?.calories || 0) / (userGoal?.nutrition?.calories || 0)) * 100, 100).toFixed(2)}%</Text>
            </View>
          </View>

          <View className="flex-col gap-4">
            <View>
              <View className="flex-row justify-between mb-1">
                <Text size={14} type='semibold' className="!text-dark">Protein</Text>
                <Text size={12} type='medium' className="!text-secondaryDark">{dailyNutrition?.nutrition_total?.protein_g?.toFixed(1)}/ {userGoal?.nutrition?.protein_g}0g</Text>
              </View>
              <View className="w-full h-2 bg-[#E6E6E6] rounded-full overflow-hidden">
                <View style={{ width: `${Math.min((dailyNutrition?.nutrition_total?.protein_g / userGoal?.nutrition?.protein_g) * 100, 100)}%` }} className="h-full bg-[#006C49]" />
              </View>
            </View>

            <View>
              <View className="flex-row justify-between mb-1">
                <Text size={14} type='semibold' className="!text-dark">Karbo</Text>
                <Text size={12} type='medium' className="!text-secondaryDark">{dailyNutrition?.nutrition_total?.carb_g?.toFixed(1)}/ {userGoal?.nutrition?.carb_g}g</Text>
              </View>
              <View className="w-full h-2 bg-[#E6E6E6] rounded-full overflow-hidden">
                <View style={{ width: `${Math.min((dailyNutrition?.nutrition_total?.carb_g / userGoal?.nutrition?.carb_g) * 100, 100)}%` }} className="h-full bg-warning" />
              </View>
            </View>

            <View>
              <View className="flex-row justify-between mb-1">
                <Text size={14} type='semibold' className="!text-dark">Lemak</Text>
                <Text size={12} type='medium' className="!text-secondaryDark">{dailyNutrition?.nutrition_total?.fat_g?.toFixed(1)}/ {userGoal?.nutrition?.fat_g}g</Text>
              </View>
              <View className="w-full h-2 bg-[#E6E6E6] rounded-full overflow-hidden">
                <View style={{ width: `${Math.min((dailyNutrition?.nutrition_total?.fat_g / userGoal?.nutrition?.fat_g) * 100, 100)}%` }} className="h-full bg-[#3B72C5]" />
              </View>
            </View>
          </View>
        </View>

        <Text size={18} type='bold' className="!text-dark mb-4">Jurnal Makanan Hari Ini</Text>

        <View className="space-y-4 mb-32">
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