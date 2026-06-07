import { useState } from 'react';
import { View, TouchableOpacity, SafeAreaView, ScrollView, TextInput, Image } from 'react-native';
import Slider from '@react-native-community/slider';
import Text from 'components/CustomText';
import Logo from 'assets/imgs/logo.png';
import NavigationServices from 'services/NavigationServices';
import { NAVIGATION_NAME } from 'navigation/NavigationName';

export default function CustomTargetScreen() {
  const [calories, setCalories] = useState(2400);
  const [proteinPct, setProteinPct] = useState(30);
  const [carbsPct, setCarbsPct] = useState(45);
  const [fatPct, setFatPct] = useState(25);

  const proteinGrams = Math.round((calories * (proteinPct / 100)) / 4);
  const carbsGrams = Math.round((calories * (carbsPct / 100)) / 4);
  const fatGrams = Math.round((calories * (fatPct / 100)) / 9);

  const totalMacroPct = proteinPct + carbsPct + fatPct;
  const isBalanced = totalMacroPct === 100;

  return (
    <SafeAreaView className="flex-1 bg-[#FAF8FF]">

      <ScrollView contentContainerStyle={{ padding: 24, paddingBottom: 30 }} showsVerticalScrollIndicator={false}>

        <View className="flex-row items-center justify-between mb-8">
          <View className="w-8" /> 
          <Image source={Logo} className="w-[102px]" resizeMode='contain' />
          <View className="w-8" /> 
        </View>

        <View className="flex-row items-center justify-between w-full mb-8">
          <TouchableOpacity className="flex-row items-center p-2 -ml-2" onPress={() => NavigationServices.push(NAVIGATION_NAME.AUTH.registerStep4Screen, {})}>
            <Text type={'bold'} className="!text-[#10B981] mr-2">←</Text>
          </TouchableOpacity>
          <Text size={18} type={'bold'} className="!text-gray-900 mb-3">
            Target Kustom
          </Text>
          <View className="w-8" />
        </View>

        <View className="w-56 h-56 rounded-full border-[12px] border-[#006C49] mx-auto items-center justify-center mb-6 bg-white shadow-sm">
          <Text className="text-4xl font-bold text-[#18042A]">{calories.toLocaleString()}</Text>
          <Text className="text-[#515F74] font-bold tracking-widest text-xs mt-1">KCAL / HARI</Text>
        </View>

        <Text className="text-center text-[#515F74] text-base mb-8 px-4 leading-relaxed">
          Sesuaikan target energi harian Anda berdasarkan level aktivitas dan tujuan kesehatan Anda.
        </Text>

        {/* Card: Target Kalori Harian */}
        <View className="bg-white border border-[#E2E8F0] rounded-2xl p-5 mb-8 shadow-sm">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-[#18042A] font-bold text-base">Target Kalori Harian</Text>
            <View className="flex-row items-center">
              <View className="bg-[#E6F6FC] px-4 py-1.5 rounded-lg mr-2">
                <Text className="text-[#006C49] font-bold text-base">{calories}</Text>
              </View>
              <Text className="text-[#515F74]">kcal</Text>
            </View>
          </View>
          
          <Slider
            style={{ width: '100%', height: 40 }}
            minimumValue={500}
            maximumValue={5000}
            step={50}
            value={calories}
            onValueChange={setCalories}
            minimumTrackTintColor="#10B981"
            maximumTrackTintColor="#E2E8F0"
            thumbTintColor="#006C49"
          />
          <View className="flex-row justify-between mt-1 px-1">
            <Text className="text-xs text-[#515F74]">500 kcal</Text>
            <Text className="text-xs text-[#515F74]">5000 kcal</Text>
          </View>
        </View>

        {/* Distribusi Makro Header */}
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-2xl font-bold text-[#18042A]">Distribusi Makro</Text>
          <View className={`px-3 py-1 rounded-full ${isBalanced ? 'bg-[#10B981]' : 'bg-red-500'}`}>
            <Text className="text-white font-bold text-xs">Total {totalMacroPct}%</Text>
          </View>
        </View>

        {/* Sliders Makro */}
        <View className="space-y-4 mb-6">
          {/* Protein */}
          <View className="bg-white border border-[#E2E8F0] rounded-2xl p-5 shadow-sm">
            <View className="flex-row items-center mb-2">
              <Text className="text-[#006C49] mr-2 text-lg">💪</Text>
              <Text className="text-[#18042A] font-bold text-sm">Protein</Text>
            </View>
            <View className="flex-row justify-between items-end mb-2">
              <Text className="text-2xl font-bold text-[#18042A]">{proteinGrams} <Text className="text-sm font-normal text-[#515F74]">g</Text></Text>
              <Text className="text-[#006C49] font-bold">{proteinPct}%</Text>
            </View>
            <Slider
              style={{ width: '100%', height: 30 }}
              minimumValue={0} maximumValue={100} step={1}
              value={proteinPct} onValueChange={setProteinPct}
              minimumTrackTintColor="#10B981" maximumTrackTintColor="#E2E8F0" thumbTintColor="#006C49"
            />
          </View>

          {/* Karbo */}
          <View className="bg-white border border-[#E2E8F0] rounded-2xl p-5 shadow-sm">
            <View className="flex-row items-center mb-2">
              <Text className="text-[#006C49] mr-2 text-lg">🌾</Text>
              <Text className="text-[#18042A] font-bold text-sm">Karbo</Text>
            </View>
            <View className="flex-row justify-between items-end mb-2">
              <Text className="text-2xl font-bold text-[#18042A]">{carbsGrams} <Text className="text-sm font-normal text-[#515F74]">g</Text></Text>
              <Text className="text-[#006C49] font-bold">{carbsPct}%</Text>
            </View>
            <Slider
              style={{ width: '100%', height: 30 }}
              minimumValue={0} maximumValue={100} step={1}
              value={carbsPct} onValueChange={setCarbsPct}
              minimumTrackTintColor="#10B981" maximumTrackTintColor="#E2E8F0" thumbTintColor="#006C49"
            />
          </View>

          {/* Lemak */}
          <View className="bg-white border border-[#E2E8F0] rounded-2xl p-5 shadow-sm">
            <View className="flex-row items-center mb-2">
              <Text className="text-[#006C49] mr-2 text-lg">🥑</Text>
              <Text className="text-[#18042A] font-bold text-sm">Lemak</Text>
            </View>
            <View className="flex-row justify-between items-end mb-2">
              <Text className="text-2xl font-bold text-[#18042A]">{fatGrams} <Text className="text-sm font-normal text-[#515F74]">g</Text></Text>
              <Text className="text-[#006C49] font-bold">{fatPct}%</Text>
            </View>
            <Slider
              style={{ width: '100%', height: 30 }}
              minimumValue={0} maximumValue={100} step={1}
              value={fatPct} onValueChange={setFatPct}
              minimumTrackTintColor="#10B981" maximumTrackTintColor="#E2E8F0" thumbTintColor="#006C49"
            />
          </View>
        </View>

        {/* Alert Seimbang */}
        {isBalanced && (
          <View className="bg-[#E6F6FC] border border-[#10B981]/40 rounded-xl p-3 flex-row items-center mb-6">
            <Text className="text-[#006C49] font-bold mr-2 text-lg">✓</Text>
            <Text className="text-[#006C49] font-bold text-sm">Target makro sudah seimbang (100%).</Text>
          </View>
        )}

        {/* Info Box */}
        <View className="bg-[#F2F3FF] rounded-2xl p-5 flex-row mb-8">
          <View className="w-10 h-10 bg-white rounded-full items-center justify-center mr-4 shadow-sm">
            <Text className="text-[#515F74] text-lg">💡</Text>
          </View>
          <View className="flex-1">
            <Text className="text-[#515F74] font-bold mb-1 text-sm">Tips Nutrisi</Text>
            <Text className="text-[#515F74] text-xs leading-relaxed">
              Peningkatan protein (25-35%) umumnya direkomendasikan untuk mendukung pemulihan otot jika Anda rutin berolahraga beban.
            </Text>
          </View>
        </View>

        <TouchableOpacity className="w-full bg-[#006C49] py-4 rounded-xl flex-row items-center justify-center shadow-sm" onPress={() => NavigationServices.push(NAVIGATION_NAME.AUTH.registerStep4Screen, {})}>
          <Text className="text-white font-bold text-base mr-2">Simpan Target</Text>
          <Text className="text-white text-lg">💾</Text>
        </TouchableOpacity>

      </ScrollView>

    </SafeAreaView>
  );
}