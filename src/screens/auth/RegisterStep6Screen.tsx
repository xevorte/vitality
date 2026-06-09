import { View, TouchableOpacity, SafeAreaView, ScrollView, Image, Alert } from 'react-native';
import { NAVIGATION_NAME } from 'navigation/NavigationName';
import { useAuthStore } from 'stores/auth/AuthStore';
import NavigationServices from 'services/NavigationServices';
import Illustration from 'assets/imgs/tdee.png';
import Text from 'components/CustomText';
import Logo from 'assets/imgs/logo.png';

export default function RegisterStep6Screen() {
  const { registerData, register } = useAuthStore();

  const handleRegister = async () => {
    console.log(registerData);
    const res: any = await register(registerData);

    // nutrition: {"fat_g": 37.24, "carb_g": 43.64, "calories": 692.3, "protein_g": 54.98}

    if (res?.status == 401) {
      Alert.alert(
        res?.data?.details?.join('\n') ||
          res?.data?.error_description ||
          res?.data?.message ||
          res?.problem ||
          'Network Error'
      );
    } else {
      NavigationServices.replace(NAVIGATION_NAME.AUTH.registerSuccessScreen, {});
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#FAF8FF]">
      <ScrollView contentContainerStyle={{ paddingTop: 24, paddingBottom: 30 }} showsVerticalScrollIndicator={false}>
        
        <View className="flex-row items-center justify-between mb-4">
          <View className="w-8" />
          <Image source={Logo} className="w-36 h-14" resizeMode='contain' />
          <View className="w-8" /> 
        </View>

        <View className="mb-8 items-center w-full">
          <Text size={24} type={'bold'} className="!text-gray-900">
            Tentang TDEE
          </Text>
        </View>

        {/* Hero Image Container */}
        <View className="w-full h-56 bg-gray-700 justify-end p-6 mb-8 relative">
          {/* PLACEHOLDER GAMBAR: Export dan letakkan Image component di sini dengan layout absolute (inset-0) */}
          <Image source={Illustration} className="w-full h-full absolute inset-0" resizeMode='cover' />
          <Text size={24} type='bold' className="!text-white z-10 w-3/4 leading-snug">
            Memahami Energi Harian Anda
          </Text>
        </View>

        <View className="px-6">
          {/* Section: Apa itu TDEE */}
          <Text size={24} type='bold' className="!text-[#006C49] mb-3">
            Apa itu TDEE?
          </Text>
          <Text type='bold' className="!text-[#18042A] leading-relaxed mb-8">
            Total Daily Energy Expenditure (TDEE) <Text className="font-normal text-[#515F74]">adalah estimasi jumlah kalori yang dibakar tubuh Anda dalam satu hari penuh, termasuk saat beristirahat dan melakukan aktivitas fisik. Angka ini merupakan kunci utama dalam mengatur berat badan Anda—apakah ingin menurunkan, mempertahankan, atau menaikkan berat badan.</Text>
          </Text>

          {/* Section: Langkah 1 BMR */}
          <View className="border-l-4 border-[#006C49] pl-4 mb-8">
            <View className="flex-row items-center mb-3">
              <Text size={20} className="!text-[#006C49] mr-2">📉</Text>
              <Text size={14} type='bold' className="!text-[#006C49] tracking-widest">
                LANGKAH 1: HITUNG BMR
              </Text>
            </View>
            <Text size={14} className="!text-[#515F74] mb-4">
              Basal Metabolic Rate (BMR) menggunakan Rumus Mifflin-St Jeor:
            </Text>
            
            {/* Box Formula Pria */}
            <View className="bg-[#F2F3FF] rounded-xl p-4 mb-3">
              <Text size={12} className="!text-[#515F74] mb-1">Pria:</Text>
              <Text size={14} type='bold' className="!text-[#006C49] tracking-widest">10W + 6.25H - 5A + 5</Text>
            </View>

            {/* Box Formula Wanita */}
            <View className="bg-[#F2F3FF] rounded-xl p-4 mb-3">
              <Text size={12} className="!text-[#515F74] mb-1">Wanita:</Text>
              <Text size={14} type='bold' className="!text-[#006C49] tracking-widest">10W + 6.25H - 5A - 161</Text>
            </View>
            
            <Text size={10} className="!text-[#515F74]">
              W = Berat (kg), H = Tinggi (cm), A = Usia (tahun)
            </Text>
          </View>

          {/* Section: Formula TDEE */}
          <View className="bg-[#E6F6FC]/60 border border-[#10B981]/20 rounded-2xl p-6 items-center mb-10 shadow-sm">
            <Text size={24} className="!text-[#006C49] mb-2">🧮</Text>
            <Text size={20} type='bold' className="!text-[#006C49] mb-2">Formula TDEE</Text>
            <Text size={32} type='bold' className="!text-[#006C49] mb-2">BMR × AF</Text>
            <Text size={10} className="!text-[#515F74] text-center">"BMR dikalikan dengan Faktor Aktivitas (AF)"</Text>
          </View>

          {/* Section: Faktor Aktivitas */}
          <Text size={20} type='bold' className="!text-[#006C49] text-center mb-4">Faktor Aktivitas (AF)</Text>
          
          <View className="space-y-3 mb-8">
            {/* List Faktor */}
            {[
              { icon: '🛋️', title: 'Sangat Jarang', value: '1.2', desc: 'Sedikit/Tanpa Olahraga' },
              { icon: '🚶', title: 'Ringan', value: '1.375', desc: '1-3 hari/minggu' },
              { icon: '🏋️', title: 'Sedang', value: '1.55', desc: '3-5 hari/minggu' },
              { icon: '🏃', title: 'Berat', value: '1.725', desc: '6-7 hari/minggu' },
              { icon: '🏅', title: 'Atlet', value: '1.9', desc: 'Sangat Intensif' },
            ].map((item, index) => (
              <View key={index} className="bg-[#F2F3FF] rounded-2xl p-4 items-center justify-center">
                 <Text size={24} className="!text-[#18042A] mb-1">{item.icon}</Text>
                 <Text size={14} type='bold' className="!text-[#18042A] text-sm mb-1">{item.title}</Text>
                 <Text size={24} type='bold' className="!text-[#18042A] mb-1">{item.value}</Text>
                 <Text size={10} className="!text-[#515F74]">{item.desc}</Text>
              </View>
            ))}
          </View>

          {/* Disclaimer Info */}
          <View className="bg-white border border-[#E2E8F0] rounded-2xl p-5 flex-row mb-8 shadow-sm">
            <Text size={18} className="!text-[#515F74] mr-3 mt-1">ⓘ</Text>
            <Text size={12} className="!text-[#515F74] leading-relaxed flex-1">
              Ingat bahwa ini adalah estimasi. Faktor-faktor seperti massa otot, kondisi kesehatan, dan metabolisme individu dapat memengaruhi hasil akhir. Gunakan angka ini sebagai titik awal perjalanan nutrisi Anda.
            </Text>
          </View>

          {/* Button Mengerti */}
          <TouchableOpacity className="w-full bg-primary disabled:bg-[#E2E7FF] py-4 rounded-full items-center justify-center shadow-sm" onPress={handleRegister}>
            <Text type='bold' className="!text-white">
              Daftar Sekarang
            </Text>
          </TouchableOpacity>
        </View>
        
      </ScrollView>
    </SafeAreaView>
  );
}