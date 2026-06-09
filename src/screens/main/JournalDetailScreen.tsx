import Text from 'components/CustomText';
import { View, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';

export default function JournalDetailScreen() {
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
            2100 <Text size={14} type='regular' className="!text-secondaryDark">kcal tersisa</Text>
          </Text>
          <Text size={12} className="!text-secondaryDark mb-5">Target hari ini: 2,500 kcal</Text>

          <View className="align-center items-center mb-6">
            <View className="w-28 h-28 rounded-full border-8 border-primary/20 items-center justify-center relative">
              <View className="absolute inset-0 rounded-full border-8 border-primary border-b-transparent border-l-transparent rotate-45" />
              <Text size={20} type='bold' className="!text-primary">32%</Text>
            </View>
          </View>

          <div className="space-y-4">
            <View>
              <View className="flex-row justify-between mb-1">
                <Text size={14} type='bold' className="!text-dark">Protein</Text>
                <Text size={12} type='medium' className="!text-secondaryDark">45 / 150g</Text>
              </View>
              <View className="w-full h-2 bg-[#E6E6E6] rounded-full overflow-hidden">
                <View style={{ width: '30%' }} className="h-full bg-primary" />
              </View>
            </View>

            <View>
              <View className="flex-row justify-between mb-1">
                <Text size={14} type='bold' className="!text-dark">Carbs</Text>
                <Text size={12} type='medium' className="!text-secondaryDark">120 / 260g</Text>
              </View>
              <View className="w-full h-2 bg-[#E6E6E6] rounded-full overflow-hidden">
                <View style={{ width: '46%' }} className="h-full bg-primary" />
              </View>
            </View>

            <View>
              <View className="flex-row justify-between mb-1">
                <Text size={14} type='bold' className="!text-dark">Fats</Text>
                <Text size={12} type='medium' className="!text-secondaryDark">32 / 70g</Text>
              </View>
              <View className="w-full h-2 bg-[#E6E6E6] rounded-full overflow-hidden">
                <View style={{ width: '45%' }} className="h-full bg-primary" />
              </View>
            </View>
          </div>
        </View>

        <Text size={18} type='bold' className="!text-dark mb-4">Jurnal Makanan Hari Ini</Text>

        <div className="space-y-3">
          <View className="w-full bg-white border border-[#E2E8F0] p-4 rounded-2xl flex-row items-center justify-between shadow-sm">
            <View className="flex-row items-center flex-1">
              <View className="w-12 h-12 bg-warning/10 rounded-xl items-center justify-center mr-4">
                <Text size={20}>☀️</Text>
              </View>
              <View className="flex-1">
                <Text type='bold' className="!text-dark mb-0.5">Sarapan</Text>
                <Text size={12} className="!text-secondaryDark">Oatmeal dengan Buah • 320 kcal</Text>
              </View>
            </View>
            <TouchableOpacity className="w-10 h-10 bg-[#F3F6F8] rounded-full items-center justify-center">
              <Text size={20} type='bold' className="!text-primary">+</Text>
            </TouchableOpacity>
          </View>

          <View className="w-full bg-white border border-[#E2E8F0] p-4 rounded-2xl flex-row items-center justify-between shadow-sm">
            <View className="flex-row items-center flex-1">
              <View className="w-12 h-12 bg-danger/10 rounded-xl items-center justify-center mr-4">
                <Text size={20}>🌤️</Text>
              </View>
              <View className="flex-1">
                <Text type='bold' className="!text-dark mb-0.5">Makan Siang</Text>
                <Text size={12} className="!text-secondaryDark">Nasi Merah & Ayam Bakar • 550 kcal</Text>
              </View>
            </View>
            <TouchableOpacity className="w-10 h-10 bg-[#F3F6F8] rounded-full items-center justify-center">
              <Text size={20} type='bold' className="!text-primary">+</Text>
            </TouchableOpacity>
          </View>

          <View className="w-full bg-white border border-dashed border-gray-300 p-4 rounded-2xl flex-row items-center justify-between shadow-sm">
            <View className="flex-row items-center flex-1">
              <View className="w-12 h-12 bg-secondaryLightest rounded-xl items-center justify-center mr-4">
                <Text size={20}>🌙</Text>
              </View>
              <View className="flex-1">
                <Text type='bold' className="!text-dark mb-0.5">Makan Malam</Text>
                <Text size={12} className="!text-secondaryDark">Belum ada data</Text>
              </View>
            </View>
            <TouchableOpacity className="w-10 h-10 bg-[#F3F6F8] rounded-full items-center justify-center">
              <Text size={20} type='bold' className="!text-primary">+</Text>
            </TouchableOpacity>
          </View>
        </div>

      </ScrollView>
    </SafeAreaView>
  );
}