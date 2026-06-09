import { View, TextInput, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform, useWindowDimensions } from 'react-native';
import { UserLoginRequest } from 'api/generated/models/vitality';
import { NAVIGATION_NAME } from 'navigation/NavigationName';
import { useAuthStore } from 'stores/auth/AuthStore';
import { useState } from 'react';
import { Alert } from 'react-native';
import NavigationServices from 'services/NavigationServices';
import Text from 'components/CustomText';

export default function LoginScreen() {
  const { width } = useWindowDimensions();
  const { login } = useAuthStore();
  const [formData, setFormData] = useState<UserLoginRequest>({
    username: '',
    password: '', 
  });

  const handleLogin = async () => {
    const res: any = await login({
      username: formData.username,
      password: formData.password,
    });

    if (res?.status == 401) {
      Alert.alert(
        res?.data?.details?.join('\n') ||
          res?.data?.error_description ||
          res?.data?.message ||
          res?.problem ||
          'Network Error'
      );
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F5F8F9]">
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="h-screen justify-center items-center"
      >
        <View style={{ width: width > 400 ? 400 : '100%' }} className="items-center p-3">
          <View className="w-16 h-16 bg-[#10B981] rounded-2xl justify-center items-center mb-6 shadow-sm">
            <Text size={30} className="!text-black">⚡</Text>
          </View>

          <Text type={'bold'} size={24} className="!text-[#006C49] mb-2 text-center">
            Selamat Datang
          </Text>
          <Text className="!text-gray-600 text-center mb-8 px-4">
            Masuk untuk melanjutkan perjalanan sehatmu.
          </Text>

          <View className="w-full bg-white rounded-3xl p-6 shadow-sm border border-gray-100 mb-8">
            <View className="mb-4">
              <Text type={'semibold'} size={14} className="!text-gray-800 mb-2 ml-1">
                Username
              </Text>
              <View className="w-full bg-[#F2F3FF] rounded-xl px-4 py-3">
                <TextInput
                  placeholder="Username Anda"
                  placeholderTextColor="#A0AEC0"
                  className="w-full text-base text-gray-800"
                  autoCapitalize="none"
                  value={formData?.username}
                  onChangeText={(value) => setFormData({ ...formData, username: value })}
                />
              </View>
            </View>

            <View className="mb-6">
              <Text type={'semibold'} size={14} className="!text-gray-800 mb-2 ml-1">
                Kata Sandi
              </Text>
              <View className="w-full bg-[#F2F3FF] rounded-xl px-4 py-3 flex-row items-center">
                <TextInput 
                  placeholder="••••••••"
                  placeholderTextColor="#A0AEC0"
                  secureTextEntry
                  className="w-full flex-1 text-base text-gray-800"
                  value={formData?.password}
                  onChangeText={(value) => setFormData({ ...formData, password: value })}
                />
              </View>
            </View>

            <TouchableOpacity className="w-full bg-primary rounded-xl py-4 flex-row justify-center items-center" onPress={handleLogin}>
              <Text type={'bold'} className="!text-white mr-2">
                Masuk
              </Text>
              <Text type={'bold'} className="!text-white">
                →
              </Text>
            </TouchableOpacity>
          </View>

          {/* Footer Register */}
          <View className="flex-row justify-center w-full gap-1">
            <Text size={14} className="!text-gray-600">
              Belum punya akun? 
            </Text>
            <TouchableOpacity onPress={() => NavigationServices.push(NAVIGATION_NAME.AUTH.registerStep1Screen, {})}>
              <Text type={'bold'} size={14} className="!text-[#006C49]">
                Daftar sekarang
              </Text>
            </TouchableOpacity>
          </View>

        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}