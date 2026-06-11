import { View, SafeAreaView, ScrollView, TouchableOpacity, Alert, TextInput, Modal, Image } from 'react-native';
import { useEffect, useState } from 'react';
import Text from 'components/CustomText';
import NavigationServices from 'services/NavigationServices';
import { useRoute } from '@react-navigation/native';
import { NAVIGATION_NAME } from 'navigation/NavigationName';
import { useSessionStore } from 'stores/session/SessionStore';
import ApiServices from 'services/ApiServices';
import { format } from 'date-fns';
import { formatInTimeZone } from 'date-fns-tz';
import mime from "mime";

export default function ScanDetailScreen() {
  const { nutritions, setNutritions } = useSessionStore();
  const { category, food } = useRoute<any>().params;
  const [summaryNutrition, setSummaryNutrition] = useState<any>({});
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [disabledButton, setDisabledButton] = useState(false);

  const handleComplete = async () => {
    if (!nutritions?.length) {
      Alert.alert('Tidak ada data nutrisi');
      return;
    }

    setDisabledButton(true);

    try {
      await Promise.all(
        nutritions.map(async (nutritionData: any) => {
          console.log("Nutrition >>>", {
            category: selectedCategory,
            date: format(new Date(formatInTimeZone(new Date(), 'Asia/Jakarta', 'yyyy-MM-dd HH:mm:ss')), 'yyyy-MM-dd'),
            ...nutritionData,
          });
          const res: any = await ApiServices.createNutrition({
            category: selectedCategory,
            date: format(new Date(formatInTimeZone(new Date(), 'Asia/Jakarta', 'yyyy-MM-dd HH:mm:ss')), 'yyyy-MM-dd'),
            ...nutritionData,
          });
          
          if (res?.status === 401) {
            Alert.alert(
              res?.data?.details?.join('\n') ||
              res?.data?.error_description ||
              res?.data?.message ||
              res?.problem ||
              'Network Error'
            );
          }
          
          console.log(res?.data?.data);
        })
      );

      Alert.alert(`Berhasil Menyimpan Data Makan ${selectedCategory == "breakfast" ? "Sarapan" : selectedCategory == "lunch" ? "Makan Siang" : "Makan Malam"}`);
      setTimeout(() => {
        NavigationServices.push(NAVIGATION_NAME.MAIN.homeScreen, {});
      }, 1000);   
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setDisabledButton(false);
    }
  };

  const updateNutrition = (id: string, field: string, value: any) => {
    setNutritions(nutritions.map((item: any) =>
      item.id == id ? { ...item, [field]: value } : item
    ));
  };

  useEffect(() => {
    const newData = [ ...nutritions, { id: (nutritions?.length || 0) + 1, ...food } ];

    setNutritions(newData);
    setSummaryNutrition(newData.reduce(
      (acc: any, item: any) => ({
        total_calories: acc.total_calories + item.nutrition.calories,
        total_protein_g: acc.total_protein_g + item.nutrition.protein_g,
        total_carb_g: acc.total_carb_g + item.nutrition.carb_g,
        total_fat_g: acc.total_fat_g + item.nutrition.fat_g,
      }),
      { total_calories: 0, total_protein_g: 0, total_carb_g: 0, total_fat_g: 0 }
    ));
  }, [food]);

  useEffect(() => {
    setSelectedCategory(category);
  }, [category]);

  return (
    <SafeAreaView className="flex-1 bg-[#FAFAFA]">
      <Modal animationType="fade" transparent={true} visible={showCategoryModal} onRequestClose={() => setShowCategoryModal(false)}>
        <View className="flex-1 bg-black/60 justify-center items-center p-6">
          <View className="w-full max-w-md bg-white text-center rounded-3xl overflow-hidden shadow-2xl p-5">
            <Text size={12} type='bold' className="!text-secondaryDarkest uppercase tracking-wider mx-auto mb-4">
              Pilih Kategori Makan
            </Text>
            <TouchableOpacity className="w-full bg-white border border-primary rounded-xl px-4 py-4 flex-row justify-between items-center shadow-sm" onPress={() => {
              setSelectedCategory("breakfast")
              setShowCategoryModal(false);
            }}>
              <Text type='medium' className="!text-dark">Sarapan</Text>
            </TouchableOpacity>
            <TouchableOpacity className="w-full bg-white border border-primary rounded-xl px-4 py-4 flex-row justify-between items-center shadow-sm my-3" onPress={() => {
              setSelectedCategory("lunch")
              setShowCategoryModal(false);
            }}>
              <Text type='medium' className="!text-dark">Makan Siang</Text>
            </TouchableOpacity>
            <TouchableOpacity className="w-full bg-white border border-primary rounded-xl px-4 py-4 flex-row justify-between items-center shadow-sm" onPress={() => {
              setSelectedCategory("dinner")
              setShowCategoryModal(false);
            }}>
              <Text type='medium' className="!text-dark">Makan Malam</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <ScrollView 
        contentContainerStyle={{ flexGrow: 1, padding: 24, paddingBottom: 32 }} 
        showsVerticalScrollIndicator={false}
      >
        
        {/* HEADER */}
        <View className="flex-row items-center mb-6">
          <TouchableOpacity className="p-2 -ml-2 mr-4" onPress={() => NavigationServices.pop()}>
            <Text size={20} type='bold' className="!text-[#006C49]">←</Text>
          </TouchableOpacity>
          <Text size={20} type='bold' className="!text-[#006C49]">
            Ringkasan Hasil Scan
          </Text>
        </View>

        {/* DROPDOWN SELECTOR: Simpan ke Jurnal */}
        <View className="mb-6">
          <Text size={12} type='bold' className="!text-secondaryDarkest uppercase tracking-wider mb-2">
            Simpan ke Jurnal:
          </Text>
          <TouchableOpacity className="w-full bg-white border border-[#E2E8F0] rounded-xl px-4 py-4 flex-row justify-between items-center shadow-sm" onPress={() => setShowCategoryModal(true)}>
            <Text type='medium' size={14} className="!text-dark">{selectedCategory == "breakfast" ? "Sarapan" : selectedCategory == "lunch" ? "Makan Siang" : selectedCategory == "dinner" ? "Makan Malam" : "Pilih Kategori Makan"}</Text>
            <Text size={12} type='bold' className="!text-primary">▼</Text>
          </TouchableOpacity>
        </View>

        {/* TOTAL NUTRITION DASHBOARD CARD */}
        <View className="w-full bg-white border border-gray-100 rounded-3xl p-5 items-center shadow-sm mb-6">
          {/* Progress Ring Ringkasan */}
          <View className="w-36 h-36 rounded-full border-8 border-primary items-center justify-center mb-5">
            <Text size={30} type='bold' className="!text-dark">{summaryNutrition?.total_calories?.toFixed(1)}</Text>
            <Text size={12} className="!text-secondaryDark mt-0.5">Kalori</Text>
          </View>

          {/* Grid Tiga Makro */}
          <View className="flex-row justify-between w-full gap-x-3">
            {/* Protein */}
            <View className="flex-1 bg-[#F3F6F8] rounded-xl p-3 items-center border-b-4 border-primary">
              <Text size={12} className="!text-secondaryDark mb-1">Protein</Text>
              <Text type='bold' className="!text-dark">{summaryNutrition?.total_protein_g?.toFixed(1)}g</Text>
            </View>
            {/* Karbo */}
            <View className="flex-1 bg-[#F3F6F8] rounded-xl p-3 items-center border-b-4 border-dark">
              <Text size={12} className="!text-secondaryDark mb-1">Karbo</Text>
              <Text type='bold' className="!text-dark">{summaryNutrition?.total_carb_g?.toFixed(1)}g</Text>
            </View>
            {/* Lemak */}
            <View className="flex-1 bg-[#F3F6F8] rounded-xl p-3 items-center border-b-4 border-secondaryDark">
              <Text size={12} className="!text-secondaryDark mb-1">Lemak</Text>
              <Text type='bold' className="!text-dark">{summaryNutrition?.total_fat_g?.toFixed(1)}g</Text>
            </View>
          </View>
        </View>

        {/* SECTION TITLE: Bahan Makanan */}
        <Text size={12} type='bold' className="!text-secondaryDarkest tracking-wider uppercase mb-4">
          Bahan Makanan Terdeteksi
        </Text>

        {/* LIST BAHAN MAKANAN (DYNAMIC MAPPING) */}
        <View className="space-y-4 mb-8">
          {nutritions.map((food: any) => (
            <View key={food.id} className="bg-white border border-[#E2E8F0] p-4 rounded-2xl shadow-sm mb-4">
              
              {/* Row Atas: Info Gambar, Nama, Berat, & Delete */}
              <View className="flex-row items-center mb-3">
                {/* WADAH GAMBAR BAHAN */}
                <View className="w-16 h-16 bg-gray-200 rounded-2xl mr-4 overflow-hidden">
                  <Image source={food?.food_image} className="w-full h-full" resizeMode='cover' />
                </View>
                
                <View className="flex-1">
                  <TextInput
                    placeholder="Nama Makanan"
                    placeholderTextColor="#A0AEC0"
                    className="w-full text-sm text-gray-800 font-medium"
                    autoCapitalize="none"
                    value={food?.food_name}
                    onChangeText={(value) => updateNutrition(food?.id, 'food_name', value)}
                  />
                </View>
                
                <TouchableOpacity className="p-2 -mr-2" onPress={() => setNutritions(nutritions.filter((item: any) => item.id !== food.id))}>
                  <Text size={18} type='bold' className="!text-secondaryDark">🗑️</Text>
                </TouchableOpacity>
              </View>

              <View className="flex-row flex-wrap gap-2">
                <Text size={10} type='medium' className="!text-secondaryDarkest bg-[#FAFAFA] p-2 rounded-lg border border-gray-50 overflow-hidden">
                  {food?.nutrition?.calories?.toFixed(1)} Kalori
                </Text>
                <Text size={10} type='medium' className="!text-secondaryDarkest bg-[#FAFAFA] p-2 rounded-lg border border-gray-50 overflow-hidden">
                  {food?.nutrition?.protein_g?.toFixed(1)} Protein
                </Text>
                <Text size={10} type='medium' className="!text-secondaryDarkest bg-[#FAFAFA] p-2 rounded-lg border border-gray-50 overflow-hidden">
                  {food?.nutrition?.carb_g?.toFixed(1)} Karbo
                </Text>
                <Text size={10} type='medium' className="!text-secondaryDarkest bg-[#FAFAFA] p-2 rounded-lg border border-gray-50 overflow-hidden">
                  {food?.nutrition?.fat_g?.toFixed(1)} Lemak
                </Text>
              </View>
            </View>
          ))}
        </View>

        <View className="space-y-3 mt-auto pt-4 mb-28">
          <TouchableOpacity className="w-full border-2 border-primary py-4 rounded-xl flex-row justify-center items-center bg-white shadow-sm active:bg-gray-50 mb-4" onPress={() => NavigationServices.push(NAVIGATION_NAME.MAIN.scanScreen, { category })}>
            <Text type='bold' className="!text-primary">Scan Bahan Berikutnya</Text>
          </TouchableOpacity>

          <TouchableOpacity className="w-full bg-primaryDark disabled:bg-secondary py-4 rounded-xl flex-row justify-center items-center shadow-md shadow-primaryDark/20 active:opacity-90" disabled={disabledButton} onPress={() => {
            if (!selectedCategory) return Alert.alert("Pilih Kategori Makan Terlebih Dahulu");

            if (nutritions.some((item: any) => !item?.food_name || item?.food_name === "")) return Alert.alert("Semua makanan harus diisi namanya");

            handleComplete();
          }}>
            <Text type='bold' className="!text-white">Selesai</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}