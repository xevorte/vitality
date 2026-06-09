import Text from 'components/CustomText';
import { View, TextInput, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import NavigationServices from 'services/NavigationServices';

export default function ProfileChangePasswordScreen() {
  return (
    <SafeAreaView className="flex-1 bg-[#FAFAFA]">
      <ScrollView 
        contentContainerStyle={{ flexGrow: 1, padding: 24 }} 
        showsVerticalScrollIndicator={false}
      >
        {/* Header Navigation */}
        <View className="flex-row items-center mb-6">
          <TouchableOpacity className="p-2 -ml-2 mr-4" onPress={() => NavigationServices.pop()}>
            <Text size={20} type='bold' className="!text-[#006C49]">←</Text>
          </TouchableOpacity>
          <Text size={20} type='bold' className="!text-dark">
            Ubah Kata Sandi
          </Text>
        </View>

        {/* Info Card Box: Keamanan Akun */}
        <View className="bg-white border border-[#E2E8F0] rounded-2xl p-4 flex-row items-start mb-6 shadow-sm">
          <View className="w-10 h-10 bg-primaryLight rounded-xl items-center justify-center mr-4">
            {/* ICON WADAH: Shield / Security */}
            <Text size={18} className="!text-[#006C49]">🛡️</Text>
          </View>
          <View className="flex-1">
            <Text size={14} type='bold' className="!text-dark mb-1">Keamanan Akun</Text>
            <Text size={12} className="!text-secondaryDark leading-relaxed">
              Pastikan kata sandi baru Anda terdiri dari setidaknya 8 karakter untuk keamanan maksimal.
            </Text>
          </View>
        </View>

        {/* Form Inputs Group */}
        <View className="space-y-4 mb-8">
          
          {/* Kata Sandi Saat Ini */}
          <View className="mb-4">
            <Text size={12} type='bold' className="!text-dark mb-2">Kata Sandi Saat Ini</Text>
            <View className="w-full bg-[#E6F6FC]/40 border border-gray-100 rounded-xl px-4 py-1 flex-row items-center justify-between">
              <TextInput 
                placeholder="••••••••"
                placeholderTextColor="#ADADAD"
                secureTextEntry
                className="flex-1 text-base text-dark py-3"
              />
              <TouchableOpacity className="pl-2">
                {/* ICON WADAH: Eye Reveal */}
                <Text size={18} className="!text-secondaryDark">👁️</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Kata Sandi Baru */}
          <View className="mb-4">
            <Text size={12} type='bold' className="!text-dark mb-2">Kata Sandi Baru</Text>
            <View className="w-full bg-[#E6F6FC]/40 border border-gray-100 rounded-xl px-4 py-1 flex-row items-center justify-between">
              <TextInput 
                placeholder="••••••••"
                placeholderTextColor="#ADADAD"
                secureTextEntry
                className="flex-1 text-base text-dark py-3"
              />
              <TouchableOpacity className="pl-2">
                <Text size={18} className="!text-secondaryDark">👁️</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Konfirmasi Kata Sandi Baru */}
          <View className="mb-4">
            <Text size={12} type='bold' className="!text-dark mb-2">Konfirmasi Kata Sandi Baru</Text>
            <View className="w-full bg-[#E6F6FC]/40 border border-gray-100 rounded-xl px-4 py-1 flex-row items-center justify-between">
              <TextInput 
                placeholder="••••••••"
                placeholderTextColor="#ADADAD"
                secureTextEntry
                className="flex-1 text-base text-dark py-3"
              />
              <TouchableOpacity className="pl-2">
                <Text size={18} className="!text-secondaryDark">👁️</Text>
              </TouchableOpacity>
            </View>
          </View>

        </View>

        {/* Action Buttons & Helpers Container */}
        <View className="mt-auto pt-6 w-full items-center mb-28">
          <TouchableOpacity className="w-full bg-primaryDark py-4 rounded-xl flex-row justify-center items-center shadow-md shadow-primaryDark/20 mb-4">
            <Text type='bold' className="!text-white mr-2">Simpan Perubahan</Text>
          </TouchableOpacity>

          <View className="flex-row justify-center gap-1">
            <Text size={14} className="!text-secondaryDark">Lupa kata sandi?</Text>
            <TouchableOpacity>
              <Text size={14} type='semibold' className="!text-primary">Reset di sini</Text>
            </TouchableOpacity>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}