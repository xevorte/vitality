import { View, SafeAreaView, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useEffect, useState } from 'react';
import { useSessionStore } from 'stores/session/SessionStore';
import Text from 'components/CustomText';
import { format } from 'date-fns';
import { useRoute } from '@react-navigation/native';
import { formatInTimeZone } from 'date-fns-tz';
import { Modal } from 'react-native';
import NavigationServices from 'services/NavigationServices';
import { NAVIGATION_NAME } from 'navigation/NavigationName';
import ScanIllustration from 'assets/imgs/scan-instruction.png';
import { Alert } from 'react-native';

export default function GoalDetailScreen() {
  const { category } = useRoute<any>().params;
  const { getUserGoal, getListNutritions, showGuideModal, setShowGuideModal, setNutritions } = useSessionStore();
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
                  NavigationServices.push(NAVIGATION_NAME.MAIN.scanScreen, { category });
                }}
                className="w-full bg-primaryDark py-4 rounded-full items-center shadow-md shadow-primaryDark/20"
              >
                <Text type='bold' className="!text-white">Mengerti</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
          <View className={`w-44 h-44 rounded-full border-[10px] ${Math.min((dailyNutrition?.nutrition_total?.calories / userGoal?.nutrition?.calories) * 100, 100) > 90 ? 'border-primary' : 'border-warning'} items-center justify-center relative`}>
            <Text size={32} type='bold' className="!text-dark">{dailyNutrition?.nutrition_total?.calories}</Text>
            <Text size={12} type='medium' className="!text-secondaryDark mt-1">/ {userGoal?.nutrition?.calories} Kalori</Text>
          </View>

          <Text size={20} type="semibold" className='my-4'>{format(new Date(formatInTimeZone(new Date(), 'Asia/Jakarta', 'yyyy-MM-dd HH:mm:ss')), 'dd MMMM yyyy')}</Text>

          <View className="flex-row justify-around w-full border-t border-gray-100 pt-4">
            {/* Protein */}
            <View className="items-center flex-1">
              <Text size={12} type='medium' className="!text-secondaryDarkest mb-1.5">Protein</Text>
              <View className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden mb-1.5">
                <View style={{ width: `${Math.min((dailyNutrition?.nutrition_total?.protein_g / userGoal?.nutrition?.protein_g) * 100, 100)}%` }} className="h-full bg-primaryDark" />
              </View>
              <Text size={14} type='bold' className="!text-dark">{dailyNutrition?.nutrition_total?.protein_g?.toFixed(1)}/{userGoal?.nutrition?.protein_g}g</Text>
            </View>

            {/* Karbo */}
            <View className="items-center flex-1 border-x border-gray-100">
              <Text size={12} type='medium' className="!text-secondaryDarkest mb-1.5">Karbo</Text>
              <View className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden mb-1.5">
                <View style={{ width: `${Math.min((dailyNutrition?.nutrition_total?.carb_g / userGoal?.nutrition?.carb_g) * 100, 100)}%` }} className="h-full bg-[#F59E0B]" />
              </View>
              <Text size={14} type='bold' className="!text-dark">{dailyNutrition?.nutrition_total?.carb_g?.toFixed(1)}/{userGoal?.nutrition?.carb_g}g</Text>
            </View>

            {/* Lemak */}
            <View className="items-center flex-1">
              <Text size={12} type='medium' className="!text-secondaryDarkest mb-1.5">Lemak</Text>
              <View className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden mb-1.5">
                <View style={{ width: `${Math.min((dailyNutrition?.nutrition_total?.fat_g / userGoal?.nutrition?.fat_g) * 100, 100)}%` }} className="h-full bg-[#3B72C5]" />
              </View>
              <Text size={14} type='bold' className="!text-dark">{dailyNutrition?.nutrition_total?.fat_g?.toFixed(1)}/{userGoal?.nutrition?.fat_g}g</Text>
            </View>
          </View>
          <View className="border-t border-gray-100 pt-3 mt-4">
            <Text size={14} type='medium' className='mx-auto'>Gizi {category == 'breakfast' ? 'Sarapan' : category == 'lunch' ? 'Makan Siang' : 'Makan Malam'}</Text>
            <View className="flex-row justify-around w-full mt-3">
              {/* Kalori */}
              <View className="items-center flex-1">
                <Text size={12} type='medium' className="!text-secondaryDarkest mb-1.5">Kalori</Text>
                <Text size={14} type='bold' className="!text-dark">{dailyNutrition?.category?.[category]?.nutrition_total?.calories?.toFixed(1)}Kalori</Text>
              </View>

              {/* Protein */}
              <View className="items-center flex-1 border-l border-gray-100">
                <Text size={12} type='medium' className="!text-secondaryDarkest mb-1.5">Protein</Text>
                <Text size={14} type='bold' className="!text-dark">{dailyNutrition?.category?.[category]?.nutrition_total?.protein_g?.toFixed(1)}g</Text>
              </View>

              {/* Karbo */}
              <View className="items-center flex-1 border-x border-gray-100">
                <Text size={12} type='medium' className="!text-secondaryDarkest mb-1.5">Karbo</Text>
                <Text size={14} type='bold' className="!text-dark">{dailyNutrition?.category?.[category]?.nutrition_total?.carb_g?.toFixed(1)}g</Text>
              </View>

              {/* Lemak */}
              <View className="items-center flex-1">
                <Text size={12} type='medium' className="!text-secondaryDarkest mb-1.5">Lemak</Text>
                <Text size={14} type='bold' className="!text-dark">{dailyNutrition?.category?.[category]?.nutrition_total?.fat_g?.toFixed(1)}g</Text>
              </View>
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
        <View className="flex-col gap-4 flex-1 mb-6">
          {/* Item 2 */}
          {dailyNutrition?.category?.[category]?.food?.map((e: any) => (
            <View className="w-full bg-white border border-[#E2E8F0] p-4 rounded-2xl flex-row items-center justify-between shadow-sm">
              <View className="flex-row items-center flex-1">
                {/* Wadah Gambar Bahan */}
                <View className="w-14 h-14 bg-primaryLight rounded-xl mr-4 items-center justify-center">
                  <Image source={{ uri: `https://snowdrift-flashy-septum.ngrok-free.dev/${e?.food_image}` }} className="w-full h-full" resizeMode='cover' />
                </View>
                <View className="flex-1">
                  <Text type='bold' className="!text-dark mb-0.5">{e?.food_name}</Text>
                  <Text size={11} className="!text-secondaryDarkest">
                    P <Text size={14} type='bold' className="!text-dark">{e?.nutrition?.protein_g?.toFixed(1) || 0}g</Text>  •  K <Text size={14} type='bold' className="!text-dark">{e?.nutrition?.carb_g?.toFixed(1) || 0}g</Text>  •  L <Text size={14} type='bold' className="!text-dark">{e?.nutrition?.fat_g?.toFixed(1) || 0}g</Text>
                  </Text>
                </View>
              </View>
              <Text size={14} type='bold' className="!text-primaryDark self-start mt-1">{e?.nutrition?.calories?.toFixed(1) || 0} Kalori</Text>
            </View>
          ))}
        </View>

        {/* Sticky-like Bottom Fixed Action Button Container */}
        <View className="mt-auto mb-28 pt-4">
          <TouchableOpacity className="w-full bg-primaryDark py-4 rounded-2xl flex-row justify-center items-center shadow-lg shadow-primaryDark/30" onPress={() => setShowGuideModal(true)}>
            <Text type='bold' className="!text-white mr-2">📷</Text>
            <Text size={14} type='bold' className="!text-white">Tambah</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}