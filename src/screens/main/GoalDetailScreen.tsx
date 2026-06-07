import Text from 'components/CustomText';
import React from 'react';
import { View, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';

export default function GoalDetailScreen() {
  return (
    <SafeAreaView className="flex-1 bg-[#FAF8FF]">
      <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 24 }} showsVerticalScrollIndicator={false}>
        
        <View className="flex-row items-center mb-6">
          <TouchableOpacity className="p-2 -ml-2 mr-4">
            <Text size={20} type='bold' className="!text-primaryDark">←</Text>
          </TouchableOpacity>
          <Text size={20} type='bold' className="!text-primaryDark flex-1">
            Target Gizi Sarapan
          </Text>
        </View>

        {/* Ringkasan Kalori Box */}
        <View className="w-full bg-white border border-gray-100 rounded-3xl p-6 items-center shadow-sm mb-6">
          {/* Circular Chart Gauge Progress */}
          <View className="w-44 h-44 rounded-full border-[10px] border-primary/10 items-center justify-center mb-6 relative">
            <View className="absolute inset-0 rounded-full border-[10px] border-primary border-b-transparent border-l-transparent -rotate-45" />
            <Text size={32} type='bold' className="!text-dark">480</Text>
            <Text size={12} type='medium' className="!text-secondaryDark mt-1">/ 550 kcal</Text>
          </View>

          {/* Horisontal Macro Details */}
          <View className="flex-row justify-around w-full border-t border-gray-100 pt-4">
            {/* Protein */}
            <View className="items-center flex-1">
              <Text size={12} type='medium' className="!text-secondaryDarkest mb-1.5">Protein</Text>
              <View className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden mb-1.5">
                <View style={{ width: '83%' }} className="h-full bg-primaryDark" />
              </View>
              <Text size={14} type='bold' className="!text-dark">25/30g</Text>
            </View>

            {/* Karbo */}
            <View className="items-center flex-1 border-x border-gray-100">
              <Text size={12} type='medium' className="!text-secondaryDarkest mb-1.5">Karbo</Text>
              <View className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden mb-1.5">
                <View style={{ width: '85%' }} className="h-full bg-dark" />
              </View>
              <Text size={14} type='bold' className="!text-dark">60/70g</Text>
            </View>

            {/* Lemak */}
            <View className="items-center flex-1">
              <Text size={12} type='medium' className="!text-secondaryDarkest mb-1.5">Lemak</Text>
              <View className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden mb-1.5">
                <View style={{ width: '75%' }} className="h-full bg-secondaryDark" />
              </View>
              <Text size={14} type='bold' className="!text-dark">15/20g</Text>
            </View>
          </View>
        </View>

        {/* Section Title Daftar Bahan */}
        <View className="flex-row justify-between items-center mb-4">
          <Text size={12} type='bold' className="!text-dark uppercase tracking-wider">Daftar Bahan</Text>
          <View className="bg-[#E6F6FC] px-3 py-1 rounded-full">
            <Text size={12} type='bold' className="!text-tertiary">3 Item</Text>
          </View>
        </View>

        {/* List Items Ingredient */}
        <View className="space-y-3 flex-1 mb-6">
          {/* Item 2 */}
          <View className="w-full bg-white border border-[#E2E8F0] p-4 rounded-2xl flex-row items-center justify-between shadow-sm">
            <View className="flex-row items-center flex-1">
              {/* Wadah Gambar Bahan */}
              <div className="w-14 h-14 bg-primaryLight rounded-xl mr-4 items-center justify-center">
                 <Text type='bold' className="!text-tertiary">🍂</Text>
              </div>
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
        </View>

        {/* Sticky-like Bottom Fixed Action Button Container */}
        <View className="mt-auto pt-4">
          <TouchableOpacity className="w-full bg-primaryDark py-4 rounded-2xl flex-row justify-center items-center shadow-lg shadow-primaryDark/30">
            <Text type='bold' className="!text-white mr-2">📷</Text>
            <Text size={14} type='bold' className="!text-white">Tambah</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}