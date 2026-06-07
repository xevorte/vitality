import { Image, Modal } from 'react-native';
import { View, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { useSessionStore } from 'stores/session/SessionStore';
import User from 'assets/imgs/user.png';
import ScanIllustration from 'assets/imgs/scan-illustration.png';
import ScanItem from 'assets/imgs/scan-item.png';
import Text from 'components/CustomText';

export default function HomeScreen() {
  const { showGuideModal, setShowGuideModal } = useSessionStore();

  return (
    <SafeAreaView className="flex-1 bg-[#FAF8FF]">
      <Modal animationType="fade" transparent={true} visible={showGuideModal} onRequestClose={() => setShowGuideModal(false)}>
        <View className="flex-1 bg-black/60 justify-center items-center p-6">
          <View className="w-full max-w-md bg-white rounded-3xl overflow-hidden shadow-2xl">
            
            {/* Top Graphic Container (Wadah Gambar Ilustrasi) */}
            <View className="w-full bg-[#F2F3FF] py-8 flex-row justify-center items-center px-6 space-x-4">
              <Image source={ScanIllustration} className="w-full h-full" resizeMode='contain' />
            </View>

            {/* Content Body */}
            <ScrollView className="p-6 max-h-96" showsVerticalScrollIndicator={false}>
              <Text size={20} type='bold' className="!text-dark text-center mb-6 px-2">
                Cara Menggunakan AI Scanner
              </Text>

              {/* Poin 1 */}
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

              {/* Poin 2 */}
              <View className="flex-row items-start mb-6">
                <View className="w-10 h-10 bg-tertiary/10 rounded-full items-center justify-center mr-4">
                  <Text size={18} type='bold' className="!text-tertiary">💳</Text>
                </View>
                <View className="flex-1">
                  <Text type='semibold' className="!text-dark mb-1">Gunakan Pembanding</Text>
                  <Text size={14} className="!text-secondaryDark leading-relaxed">
                    Letakkan objek standar seperti koin atau kartu ATM di samping makanan untuk estimasi ukuran dan berat yang lebih akurat.
                  </Text>
                </View>
              </View>

              {/* Mini Info Card Box */}
              <View className="w-full bg-[#E6F6FC]/50 border border-tertiary/10 rounded-2xl p-4 flex-row items-center justify-between mb-4">
                <View className="flex-row items-center space-x-3">
                  {/* Wadah Gambar Koin */}
                  <View className="w-12 h-12 bg-warning rounded-full items-center justify-center">
                    <Text size={12} type='bold' className="!text-white">Rp</Text>
                  </View>
                  <View className="h-8 w-[1px] bg-gray-300" />
                  {/* Wadah Gambar Makanan */}
                  <View className="w-14 h-10 bg-gray-200 rounded-lg overflow-hidden">
                    <Image source={ScanItem} className="w-full h-full" resizeMode='contain' />
                  </View>
                </View>
                <Text size={18} type='bold' className="!text-success">✓</Text>
              </View>
            </ScrollView>

            <View className="p-6 pt-0">
              <TouchableOpacity 
                onPress={() => setShowGuideModal(false)} 
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
        <View className="flex-row items-center mb-6">
          {/* Wadah Foto Profil */}
          <View className="w-12 h-12 bg-secondary rounded-full mr-3 overflow-hidden border border-gray-200">
            <Image source={User} className="w-full h-full" resizeMode='contain' />
          </View>
          <View>
            <Text size={18} type='bold' className="!text-primary">Halo, User</Text>
          </View>
        </View>

        {/* Dashboard Card: Target Gizi Harian */}
        <View className="w-full bg-white border border-[#E2E8F0] rounded-3xl p-5 flex-row justify-between items-center shadow-sm mb-8">
          <View className="flex-1 pr-4">
            <Text size={12} type='bold' className="!text-secondaryDark tracking-wider uppercase mb-1">
              Target Gizi Harian
            </Text>
            <TouchableOpacity className="flex-row items-center mb-2">
              <Text size={12} type='medium' className="!text-primary mr-1">⇄ Ubah Target</Text>
            </TouchableOpacity>
            <Text size={30} type='bold' className="!text-dark">
              2100 <Text size={14} className="!text-secondaryDark font-normal">kcal tersisa</Text>
            </Text>

            {/* Progress Bars Makro */}
            <View className="space-y-3 mt-4">
              {/* Protein */}
              <View>
                <View className="flex-row justify-between mb-1">
                  <Text size={12} type='medium' className="!text-dark">Protein <Text size={12} className="text-secondaryDarkest font-normal">45/150g</Text></Text>
                </View>
                <View className="w-full h-1.5 bg-[#E6E6E6] rounded-full overflow-hidden">
                  <View style={{ width: '30%' }} className="h-full bg-primary" />
                </View>
              </View>

              {/* Carbs */}
              <View>
                <View className="flex-row justify-between mb-1">
                  <Text size={12} type='medium' className="!text-dark">Carbs <Text size={12} className="text-secondaryDarkest font-normal">120/260g</Text></Text>
                </View>
                <View className="w-full h-1.5 bg-[#E6E6E6] rounded-full overflow-hidden">
                  <View style={{ width: '46%' }} className="h-full bg-primary" />
                </View>
              </View>

              {/* Fats */}
              <View>
                <View className="flex-row justify-between mb-1">
                  <Text size={12} type='medium' className="!text-dark">Fats <Text size={12} className="text-secondaryDarkest font-normal">32/70g</Text></Text>
                </View>
                <View className="w-full h-1.5 bg-[#E6E6E6] rounded-full overflow-hidden">
                  <View style={{ width: '45%' }} className="h-full bg-primary" />
                </View>
              </View>
            </View>
          </View>

          {/* Progress Circle Chart Placeholder */}
          <View className="w-20 h-20 rounded-full border-4 border-primary/20 items-center justify-center relative">
            <View className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent border-l-transparent rotate-45" />
            <Text type='bold' className="!text-primary">32%</Text>
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
          <View className="w-full bg-white border border-[#E2E8F0] p-4 rounded-2xl flex-row items-center justify-between mb-3 shadow-sm">
            <View className="flex-row items-center flex-1">
              <View className="w-12 h-12 bg-warning/10 rounded-xl items-center justify-center mr-4">
                <Text size={20}>☀️</Text>
              </View>
              <View className="flex-1">
                <Text type='bold' className="!text-dark mb-0.5">Sarapan</Text>
                <Text size={12} className="!text-secondaryDark">Oatmeal dengan Buah • 320 kcal</Text>
              </View>
            </View>
            <TouchableOpacity className="w-8 h-8 bg-[#F2F3FF] rounded-full items-center justify-center">
              <Text size={18} type='bold' className="!text-primary">+</Text>
            </TouchableOpacity>
          </View>

          {/* Card Makan Siang */}
          <View className="w-full bg-white border border-[#E2E8F0] p-4 rounded-2xl flex-row items-center justify-between mb-3 shadow-sm">
            <View className="flex-row items-center flex-1">
              <View className="w-12 h-12 bg-danger/10 rounded-xl items-center justify-center mr-4">
                <Text className="text-xl">🌤️</Text>
              </View>
              <View className="flex-1">
                <Text type='bold' className="!text-dark mb-0.5">Makan Siang</Text>
                <Text size={12} className="!text-secondaryDark">Nasi Merah & Ayam Bakar • 550 kcal</Text>
              </View>
            </View>
            <TouchableOpacity className="w-8 h-8 bg-[#F2F3FF] rounded-full items-center justify-center">
              <Text size={18} type='bold' className="!text-primary">+</Text>
            </TouchableOpacity>
          </View>

          {/* Card Makan Malam (Kosong) */}
          <View className="w-full bg-white border border-dashed border-gray-300 p-4 rounded-2xl flex-row items-center justify-between shadow-sm">
            <View className="flex-row items-center flex-1">
              <View className="w-12 h-12 bg-secondaryLightest rounded-xl items-center justify-center mr-4">
                <Text className="text-xl">🌙</Text>
              </View>
              <View className="flex-1">
                <Text type='bold' className="!text-dark mb-0.5">Makan Malam</Text>
                <Text size={12} className="!text-secondaryDark">Belum ada data</Text>
              </View>
            </View>
            <TouchableOpacity className="w-8 h-8 bg-primary rounded-full items-center justify-center">
              <Text size={18} type='bold' className="!text-white">+</Text>
            </TouchableOpacity>
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}