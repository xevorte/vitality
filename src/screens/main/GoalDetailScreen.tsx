import { View, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import { useSessionStore } from 'stores/session/SessionStore';
import Text from 'components/CustomText';
import { format } from 'date-fns';
import { useRoute } from '@react-navigation/native';

export default function GoalDetailScreen() {
  const { category } = useRoute<any>().params;
  const { profile, getUserGoal, getListNutritions, showGuideModal, setShowGuideModal } = useSessionStore();
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
    console.log(category);
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-[#FAF8FF]">
      <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 24 }} showsVerticalScrollIndicator={false}>
        
        <View className="flex-row items-center mb-6">
          <TouchableOpacity className="p-2 -ml-2 mr-4">
            <Text size={20} type='bold' className="!text-primaryDark">←</Text>
          </TouchableOpacity>
          <Text size={20} type='bold' className="!text-primaryDark flex-1">
            Target Gizi {category == 'breakfast' ? 'Sarapan' : category == 'lunch' ? 'Makan Siang' : 'Makan Malam'}
          </Text>
        </View>

        {/* Ringkasan Kalori Box */}
        <View className="w-full bg-white border border-gray-100 rounded-3xl p-6 items-center shadow-sm mb-6">
          {/* Circular Chart Gauge Progress */}
          <View className={`w-44 h-44 rounded-full border-[10px] ${Math.min(dailyNutrition?.nutrition_total?.calories / userGoal?.nutrition?.calories, 100) > 90 ? 'border-primary' : 'border-warning'} items-center justify-center mb-6 relative`}>
            <Text size={32} type='bold' className="!text-dark">{dailyNutrition?.nutrition_total?.calories}</Text>
            <Text size={12} type='medium' className="!text-secondaryDark mt-1">/ {userGoal?.nutrition?.calories} kcal</Text>
          </View>

          {/* Horisontal Macro Details */}
          <View className="flex-row justify-around w-full border-t border-gray-100 pt-4">
            {/* Protein */}
            <View className="items-center flex-1">
              <Text size={12} type='medium' className="!text-secondaryDarkest mb-1.5">Protein</Text>
              <View className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden mb-1.5">
                <View style={{ width: `${Math.min(dailyNutrition?.nutrition_total?.protein_g / userGoal?.nutrition?.protein_g, 100)}%` }} className="h-full bg-primaryDark" />
              </View>
              <Text size={14} type='bold' className="!text-dark">{dailyNutrition?.nutrition_total?.protein_g}/{userGoal?.nutrition?.protein_g}g</Text>
            </View>

            {/* Karbo */}
            <View className="items-center flex-1 border-x border-gray-100">
              <Text size={12} type='medium' className="!text-secondaryDarkest mb-1.5">Karbo</Text>
              <View className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden mb-1.5">
                <View style={{ width: `${Math.min(dailyNutrition?.nutrition_total?.carb_g / userGoal?.nutrition?.carb_g, 100)}%` }} className="h-full bg-[#F59E0B]" />
              </View>
              <Text size={14} type='bold' className="!text-dark">{dailyNutrition?.nutrition_total?.carb_g}/{userGoal?.nutrition?.carb_g}g</Text>
            </View>

            {/* Lemak */}
            <View className="items-center flex-1">
              <Text size={12} type='medium' className="!text-secondaryDarkest mb-1.5">Lemak</Text>
              <View className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden mb-1.5">
                <View style={{ width: `${Math.min(dailyNutrition?.nutrition_total?.fat_g / userGoal?.nutrition?.fat_g, 100)}%` }} className="h-full bg-[#3B72C5]" />
              </View>
              <Text size={14} type='bold' className="!text-dark">{dailyNutrition?.nutrition_total?.fat_g}/{userGoal?.nutrition?.fat_g}g</Text>
            </View>
          </View>
        </View>

        {/* Section Title Daftar Bahan */}
        <View className="flex-row justify-between items-center mb-4">
          <Text size={12} type='bold' className="!text-dark uppercase tracking-wider">Daftar Bahan</Text>
          <View className="bg-[#E6F6FC] px-3 py-1 rounded-full">
            <Text size={12} type='bold' className="!text-tertiary">{dailyNutrition?.category?.[category]?.food?.length} Item</Text>
          </View>
        </View>

        {/* List Items Ingredient */}
        <View className="space-y-3 flex-1 mb-6">
          {/* Item 2 */}
          {dailyNutrition?.category?.[category]?.food?.map((e: any) => (
            <View className="w-full bg-white border border-[#E2E8F0] p-4 rounded-2xl flex-row items-center justify-between shadow-sm">
              <View className="flex-row items-center flex-1">
                {/* Wadah Gambar Bahan */}
                <View className="w-14 h-14 bg-primaryLight rounded-xl mr-4 items-center justify-center">
                  <Text type='bold' className="!text-tertiary">🍂</Text>
                </View>
                <View className="flex-1">
                  <Text type='bold' className="!text-dark mb-0.5">Blueberry Segar</Text>
                  <Text size={12} className="!text-secondaryDark mb-2">Estimasi: 50g</Text>
                  <Text size={11} className="!text-secondaryDarkest">
                    P <Text size={14} type='bold' className="!text-dark">0.4g</Text>  •  K <Text size={14} type='bold' className="!text-dark">7g</Text>  •  L <Text size={14} type='bold' className="!text-dark">0.2g</Text>
                  </Text>
                </View>
              </View>
              <Text size={14} type='bold' className="!text-primaryDark self-start mt-1">29 kcal</Text>
            </View>
          ))}
        </View>

        {/* Sticky-like Bottom Fixed Action Button Container */}
        <View className="mt-auto mb-28 pt-4">
          <TouchableOpacity className="w-full bg-primaryDark py-4 rounded-2xl flex-row justify-center items-center shadow-lg shadow-primaryDark/30">
            <Text type='bold' className="!text-white mr-2">📷</Text>
            <Text size={14} type='bold' className="!text-white">Tambah</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}