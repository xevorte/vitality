import Text from 'components/CustomText';
import { View, TextInput, TouchableOpacity, SafeAreaView, ScrollView, Image } from 'react-native';
import { NAVIGATION_NAME } from 'navigation/NavigationName';
import { useAuthStore } from 'stores/auth/AuthStore';
import { useState } from 'react';
import NavigationServices from 'services/NavigationServices';
import Logo from 'assets/imgs/logo.png';

export default function RegisterStep1Screen() {
  const { registerData, setRegisterData } = useAuthStore();
  const [seePassword, setSeePassword] = useState(true);

  return (
    <SafeAreaView className="flex-1 bg-[#FAF8FF]">

      <ScrollView 
        contentContainerStyle={{ flexGrow: 1, padding: 24, paddingBottom: 16 }} 
        showsVerticalScrollIndicator={false}
      >
        
        <View className="flex-1">
          <View className="flex-row items-center justify-between mb-8">
            <View className="w-8" /> 
            <Image source={Logo} className="w-[102px]" resizeMode='contain' />
            <View className="w-8" /> 
          </View>

          {/* Progress Indicator (Responsive Width) */}
          <View className="mb-8 items-center w-full">
            <Text size={18} type={'bold'} className="!text-gray-900 mb-3">
              Langkah 1 dari 5
            </Text>
            <View className="w-full h-1.5 bg-[#E2E8F0] rounded-full overflow-hidden flex-row">
              <View style={{ width: '20%' }} className="h-full bg-[#10B981] rounded-full" />
            </View>
          </View>

          {/* Title Section */}
          <Text size={32} type={'bold'} className="!text-[#111827] mb-2">
            Buat Akun Anda
          </Text>
          <Text className="!text-gray-600 mb-8 leading-relaxed">
            Mulai perjalanan sehatmu dengan membuat akun Vitality.
          </Text>

          {/* Forms */}
          <View className="space-y-4">
            <View className="mb-4">
              <Text size={14} type={'bold'} className="!text-gray-900 mb-2">
                Nama Pengguna
              </Text>
              <View className="w-full bg-[#F2F3FF] rounded-xl px-4 py-3">
                <TextInput 
                  placeholder="Pilih nama pengguna yang unik"
                  placeholderTextColor="#3C4A42"
                  className="text-base text-gray-900"
                  value={registerData?.username}
                  onChangeText={(text) => setRegisterData({ ...registerData, username: text })}
                />
              </View>
            </View>

            <View className="mb-4">
              <Text size={14} type={'bold'} className="!text-gray-900 mb-2">
                Kata Sandi
              </Text>
              <View className="w-full bg-[#F2F3FF] rounded-xl px-4 py-3 flex-row items-center justify-between">
                <TextInput 
                  placeholder="Minimal 8 karakter"
                  placeholderTextColor="#3C4A42"
                  secureTextEntry={seePassword}
                  className="flex-1 text-base text-gray-900"
                  value={registerData?.password}
                  onChangeText={(text) => setRegisterData({ ...registerData, password: text })}
                />
                <TouchableOpacity className="pl-2" onPress={() => setSeePassword(!seePassword)}>
                  <Text className="!text-gray-500">👁️</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View className="mb-4">
              <Text size={14} type={'bold'} className="!text-gray-900 mb-2">
                Konfirmasi Kata Sandi
              </Text>
              <View className="w-full bg-[#F2F3FF] rounded-xl px-4 py-3">
                <TextInput 
                  placeholder="Ulangi kata sandi"
                  placeholderTextColor="#3C4A42"
                  secureTextEntry
                  className="text-base text-gray-900"
                />
              </View>
            </View>
          </View>
        </View>

        <View className="flex-row justify-between items-center pt-8">
          <TouchableOpacity className="flex-row items-center p-2 -ml-2" onPress={() => NavigationServices.push(NAVIGATION_NAME.AUTH.welcomeScreen, {})}>
            <Text type={'bold'} className="!text-gray-600 mr-2">←</Text>
            <Text type={'bold'} className="!text-gray-600">
              Kembali
            </Text>
          </TouchableOpacity>

          <TouchableOpacity className="bg-[#006C49] disabled:bg-[#E2E7FF] px-6 py-3.5 rounded-full flex-row items-center" disabled={!registerData?.username || !registerData?.password} onPress={() => NavigationServices.push(NAVIGATION_NAME.AUTH.registerStep2Screen, {})}>
            <Text type={'bold'} className="!text-white mr-2">
              Lanjutkan
            </Text>
            <Text type={'bold'} className="!text-white">
              →
            </Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
      
    </SafeAreaView>
  );
}