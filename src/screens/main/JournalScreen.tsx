import { View, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { format, eachDayOfInterval, endOfMonth, startOfMonth, parse } from 'date-fns';
import { formatInTimeZone } from 'date-fns-tz';
import Text from 'components/CustomText';
import { useEffect, useState } from 'react';
import { useSessionStore } from 'stores/session/SessionStore';
import NavigationServices from 'services/NavigationServices';
import { NAVIGATION_NAME } from 'navigation/NavigationName';

export default function JournalScreen() {
  const nowWIBString = formatInTimeZone(new Date(), 'Asia/Jakarta', 'yyyy-MM-dd HH:mm:ss');
  const nowWIB = new Date(nowWIBString);

  const startOfMonthDate = startOfMonth(nowWIB);
  const endOfMonthDate = endOfMonth(nowWIB);

  const { profile, getUserGoal, getListNutritions, showGuideModal, setShowGuideModal } = useSessionStore();
  const [dailyNutrition, setDailyNutrition] = useState<any>({});
  const [nutritions, setNutritions] = useState<any>([]);
  const [userGoal, setUserGoal] = useState<any>({});

  const getDailyNutritionData = async () => {
    const res: any = await getListNutritions({
      target_date: format(nowWIB, 'yyyy-MM-dd'),
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

  const getListNutritionsData = async () => {
    const res: any = await getListNutritions({
      start_date: format(startOfMonthDate, 'yyyy-MM-dd'),
      end_date: format(nowWIB, 'yyyy-MM-dd'),
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
      setNutritions(res?.data?.data);
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
  
  const monthDays = eachDayOfInterval({
    start: startOfMonthDate,
    end: endOfMonthDate
  }).map(date => ({
    dayName: format(date, 'EEE'),
    dayNumber: format(date, 'dd'),
    fullDate: date,
    isToday: format(date, 'yyyy-MM-dd') === format(nowWIB, 'yyyy-MM-dd'),
  }));

  useEffect(() => {
    getDailyNutritionData();
    getListNutritionsData();
    getUserGoalData();
  }, []);

  const getBgColor = (color: string) => {
    switch(color) {
      case 'warning': return 'bg-warning/10';
      case 'danger': return 'bg-danger/10';
      case 'success': return 'bg-success/10';
      default: return 'bg-gray-100';
    }
  };

  const getTextColor = (color: string) => {
    switch(color) {
      case 'warning': return '!text-warning';
      case 'danger': return '!text-danger';
      case 'success': return '!text-success';
      default: return '!text-gray';
    }
  };

  const checkTotal = Math.min(dailyNutrition?.nutrition_total?.calories / userGoal?.nutrition?.calories, 100) > 90;

  return (
    <SafeAreaView className="flex-1 bg-[#FAFAFA]">
      <ScrollView contentContainerStyle={{ padding: 24 }} showsVerticalScrollIndicator={false}>
        
        {/* Title & Month Picker */}
        <View className="flex-row justify-between items-center mb-6">
          <View>
            <Text size={24} type='bold' className="!text-dark">Jurnal Harian</Text>
            <Text size={14} className="!text-secondaryDark mt-0.5">{format(nowWIB, 'MMMM yyyy')}</Text>
          </View>
          <TouchableOpacity className="flex-row items-center border border-[#E2E8F0] px-3 py-1.5 rounded-full bg-white shadow-sm">
            <Text size={12} type='bold' className="!text-primaryDark">Bulan ini 📅</Text>
          </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row mb-8">
          {monthDays.map((day, index) => (
            <View 
              key={index}
              className={`w-14 py-3 rounded-2xl items-center mr-3 border ${
                day.isToday 
                  ? 'bg-primary border-primary' 
                  : 'bg-[#E6F6FC]/50 border-gray-100'
              }`}
            >
              <Text 
                size={12} 
                type="medium" 
                className={`mb-1 ${day.isToday ? '!text-white' : '!text-secondaryDark'}`}
              >
                {day.dayName}
              </Text>
              <Text 
                size={18} 
                type="bold" 
                className={day.isToday ? '!text-white' : '!text-dark'}
              >
                {day.dayNumber}
              </Text>
            </View>
          ))}
        </ScrollView>

        <View className="w-full bg-white border border-gray-100 rounded-3xl p-5 shadow-sm mb-8">
          <View className="flex-row justify-between items-center mb-6">
            <View>
              <Text size={12} type='bold' className="!text-secondaryDark uppercase tracking-wider mb-0.5">Ringkasan Nutrisi</Text>
              <Text size={20} type='bold' className="!text-dark">Hari Ini <Text size={12} type='regular' className='!text-secondaryLight'>({format(nowWIB, 'dd MMMM yyyy')})</Text></Text>
            </View>
            <View className={`${checkTotal ? 'bg-success/10' : 'bg-warning/10'} px-3 py-1 rounded-full`}>
              <Text size={12} type='bold' className={checkTotal ? '!text-primary' : '!text-warning'}>{checkTotal ? '✓ Tercapai' : 'Kekurangan'}</Text>
            </View>
          </View>

          {/* Three Macro Circle Row Progress Indicator */}
          <View className="flex-row justify-around mb-6 border-b border-gray-100 pb-5">
            {/* Protein */}
            <View className="items-center">
              <View className="w-14 h-14 rounded-full border-4 border-[#006C49] justify-center items-center mb-2">
                <Text size={12} type='bold' className="!text-dark">{Math.min(dailyNutrition?.nutrition_total?.protein_g / userGoal?.nutrition?.protein_g, 100)}%</Text>
              </View>
              <Text size={12} type='medium' className="!text-secondaryDark mb-0.5">Protein</Text>
              <Text size={14} type='bold' className="!text-dark">{userGoal?.nutrition?.protein_g?.toLocaleString('id-ID')}g</Text>
            </View>

            {/* Karbo */}
            <View className="items-center">
              <View className="w-14 h-14 rounded-full border-4 border-[#F59E0B] justify-center items-center mb-2">
                <Text size={12} type='bold' className="!text-dark">{Math.min(dailyNutrition?.nutrition_total?.carb_g / userGoal?.nutrition?.carb_g, 100)}%</Text>
              </View>
              <Text size={12} type='medium' className="!text-secondaryDark mb-0.5">Karbo</Text>
              <Text size={14} type='bold' className="!text-dark">{userGoal?.nutrition?.carb_g?.toLocaleString('id-ID')}g</Text>
            </View>

            {/* Lemak */}
            <View className="items-center">
              <View className="w-14 h-14 rounded-full border-4 border-[#3B72C5] justify-center items-center mb-2">
                <Text size={12} type='bold' className="!text-dark">{Math.min(dailyNutrition?.nutrition_total?.fat_g / userGoal?.nutrition?.fat_g, 100)}%</Text>
              </View>
              <Text size={12} type='medium' className="!text-secondaryDark mb-0.5">Lemak</Text>
              <Text size={14} type='bold' className="!text-dark">{userGoal?.nutrition?.fat_g?.toLocaleString('id-ID')}g</Text>
            </View>
          </View>

          {/* Bottom Total Calories Sub-Row */}
          <View className="flex-row justify-between items-center">
            <View>
              <Text size={12} type='medium' className="!text-secondaryDark mb-0.5">Total Kalori</Text>
              <Text size={20} type='bold' className="!text-primaryDark">{dailyNutrition?.nutrition_total?.calories?.toLocaleString('id-ID')} <Text className="text-xs font-normal text-secondaryDark">/ {userGoal?.nutrition?.calories?.toLocaleString('id-ID')} kcal</Text></Text>
            </View>
            <View className="w-10 h-10 bg-[#E6F6FC] rounded-xl items-center justify-center">
              <Text size={20}>🍴</Text>
            </View>
          </View>
        </View>

        <Text size={14} type='semibold' className="!text-secondaryDarkest tracking-wider uppercase mb-4">
          Riwayat Nutrisi
        </Text>

        <View className="space-y-3 mb-28">
          {nutritions?.map((item: any) => {
            const type = Math.min(dailyNutrition?.nutrition_total?.calories / userGoal?.nutrition?.calories) > 102 ? 'over' : Math.min(dailyNutrition?.nutrition_total?.calories / userGoal?.nutrition?.calories) < 90 ? 'under' : 'qualified';
            const icon = type == 'over' ? '🚨' : type == 'under' ? '⚠️' : '✅'; 
            const label = type == 'over' ? 'BERLEBIH' : type == 'under' ? 'DEFISIT' : 'CUKUP'; 
            const sublabel = type == 'over' ? 'Pantau asupanmu' : type == 'under' ? 'Butuh lebih banyak' : 'Tepat sasaran'; 
            const color = type == 'over' ? '!text-danger' : type == 'under' ? '!text-warning' : '!text-primary'; 
            const subcolor = type == 'over' ? '!bg-danger/10' : type == 'under' ? '!bg-warning/10' : '!bg-primary/10'; 

            return <TouchableOpacity 
              key={item.id}
              className="w-full bg-white border border-[#E2E8F0] p-4 rounded-2xl flex-row items-center justify-between shadow-sm mb-3"
              onPress={() => NavigationServices.push(NAVIGATION_NAME.MAIN.journalDetailScreen, {})}
            >
              <View className="flex-row items-center flex-1">
                <View className={`w-10 h-10 ${subcolor} rounded-full items-center justify-center mr-4`}>
                  <Text type='bold'>{icon}</Text>
                </View>
                <View className="flex-1">
                  <Text type='bold' className="!text-dark mb-0.5">
                    {format(parse(item?.date, 'yyyy-MM-dd', new Date()), 'dd MMMM yyyy')}
                  </Text>
                  <Text size={12} className="!text-secondaryDark">
                    {item?.nutrition_total?.calories?.toLocaleString()} / {userGoal?.nutrition?.calories?.toLocaleString()} kcal
                  </Text>
                </View>
              </View>
              <View className="items-end">
                <Text size={12} type='bold' className={`${color} mb-0.5`}>
                  {label}
                </Text>
                <Text size={10} className="!text-secondaryDarkest">
                  {sublabel}
                </Text>
              </View>
            </TouchableOpacity>
          })}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}