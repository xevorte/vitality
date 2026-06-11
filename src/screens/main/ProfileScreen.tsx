import { View, SafeAreaView, ScrollView, TouchableOpacity, Image } from 'react-native';
import Text from 'components/CustomText';
import NavigationServices from 'services/NavigationServices';
import { NAVIGATION_NAME } from 'navigation/NavigationName';
import { useAuthStore } from 'stores/auth/AuthStore';
import { useSessionStore } from 'stores/session/SessionStore';
import User from 'assets/imgs/profile.png';

export default function ProfileScreen() {
  const { logout } = useAuthStore();
  const { profile } = useSessionStore();

  return (
    <SafeAreaView className="flex-1 bg-[#FAFAFA]">
      <ScrollView 
        contentContainerStyle={{ flexGrow: 1, padding: 24, paddingBottom: 32 }} 
        showsVerticalScrollIndicator={false}
      >
        
        <Text size={24} type='bold' className="!text-primaryDark mb-8">
          Profil
        </Text>

        {/* User Avatar & Badge Identity Component */}
        <View className="items-center mb-8">
          {/* Avatar Container Stack */}
          <View className="relative mb-4">
            {/* Outer Ring Circle Placeholder */}
            <View className="w-32 h-32 rounded-full bg-primary/20 border border-primary overflow-hidden items-center justify-center">
              <Image source={User} className="w-full h-full" />
            </View>
          </View>

          {/* Name & Account Level Badge */}
          <Text size={24} className="!text-dark mb-2">
            {profile?.name}
          </Text>
          <View className="bg-primaryLight border border-primary/10 px-4 py-1 rounded-full flex-row items-center">
            <Text size={12} className="!text-primary mr-1">⭐</Text>
            <Text size={12} type='semibold' className="!text-primaryDark">Member Vitality</Text>
          </View>
        </View>

        {/* Settings Menu Account Card Grid */}
        <View className="w-full bg-white border border-[#E2E8F0] rounded-3xl p-5 shadow-sm mb-6">
          <Text size={12} type='bold' className="!text-secondaryDark tracking-wider uppercase mb-4 ml-1">
            Pengaturan Akun
          </Text>

          {/* Menu Items Stack */}
          <View className="space-y-1">
            
            {/* Item 1: Ubah Data Diri */}
            <TouchableOpacity className="flex-row items-center justify-between py-3.5 border-b border-gray-50/50 mb-1">
              <View className="flex-row items-center">
                <View className="w-10 h-10 bg-[#E6F6FC] rounded-full items-center justify-center mr-4">
                  <Text className="!text-tertiary">👤</Text>
                </View>
                <Text type='semibold' className="!text-dark">Ubah Data Diri</Text>
              </View>
              <Text size={14} type='bold' className="!text-secondaryDark">›</Text>
            </TouchableOpacity>

            {/* Item 2: Ubah Kata Sandi */}
            <TouchableOpacity className="flex-row items-center justify-between py-3.5 border-b border-gray-50/50 mb-1" onPress={() => NavigationServices.push(NAVIGATION_NAME.MAIN.profileChangePasswordScreen, {})}>
              <View className="flex-row items-center">
                <View className="w-10 h-10 bg-success/10 rounded-full items-center justify-center mr-4">
                  <Text className="!text-success">🔒</Text>
                </View>
                <Text type='semibold' className="!text-dark">Ubah Kata Sandi</Text>
              </View>
              <Text size={14} type='bold' className="!text-secondaryDark">›</Text>
            </TouchableOpacity>

            {/* Item 3: Ubah Target */}
            <TouchableOpacity className="flex-row items-center justify-between py-3.5 border-b border-gray-50/50 mb-1">
              <View className="flex-row items-center">
                <View className="w-10 h-10 bg-primary/10 rounded-full items-center justify-center mr-4">
                  <Text className="!text-primary">🎯</Text>
                </View>
                <Text type='semibold' className="!text-dark">Ubah Target</Text>
              </View>
              <Text size={14} type='bold' className="!text-secondaryDark">›</Text>
            </TouchableOpacity>

            {/* Item 4: Ubah Aktivitas */}
            <TouchableOpacity className="flex-row items-center justify-between py-3.5">
              <View className="flex-row items-center">
                <View className="w-10 h-10 bg-[#F3F6F8] rounded-full items-center justify-center mr-4">
                  <Text className="!text-secondaryDark">🏋️</Text>
                </View>
                <Text type='semibold' className="!text-dark">Ubah Aktivitas</Text>
              </View>
              <Text size={14} type='bold' className="!text-secondaryDark">›</Text>
            </TouchableOpacity>

          </View>
        </View>

        {/* Action Button Area & Software Version Metadata */}
        <View className="mt-auto w-full items-center">
          {/* Logout Action Button */}
          <TouchableOpacity className="w-full bg-danger/10 border border-danger/20 py-4 rounded-2xl flex-row justify-center items-center mb-4" onPress={() => {
            logout();
            NavigationServices.push(NAVIGATION_NAME.AUTH.loginScreen, {});
          }}>
            {/* ICON WADAH: Logout Arrow Indicator */}
            <Text type='bold' className="!text-danger mr-2">🚪</Text>
            <Text type='semibold' className="!text-danger">Logout</Text>
          </TouchableOpacity>

          {/* App Version Label */}
          <Text size={12} className="!text-secondaryDarkest mb-28">
            Version 0.7.0
          </Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}