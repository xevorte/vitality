import { View, SafeAreaView, ScrollView, TouchableOpacity, Image } from 'react-native';
import { NAVIGATION_NAME } from 'navigation/NavigationName';
import { useEffect } from 'react';
import Illustration from 'assets/imgs/register-success.png';
import NavigationServices from 'services/NavigationServices';
import Text from 'components/CustomText';

export default function RegisterSuccessScreen() {
    // useEffect(() => {
    //     setTimeout(() => {
    //         NavigationServices.replace(NAVIGATION_NAME.AUTH.loginScreen, {});
    //     }, 2000);
    // }, []);

    return (
        <SafeAreaView className="flex-1 bg-[#FAFAFA]">
            <ScrollView 
                contentContainerStyle={{ flexGrow: 1, padding: 24, paddingBottom: 32 }} 
                showsVerticalScrollIndicator={false}
            >
                
                <View className="flex-1 justify-center items-center mt-8">

                    <View className="w-64 h-64 items-center justify-center relative mb-8">
                        <Image source={Illustration} className="w-full h-full" resizeMode="contain" />
                    </View>

                    <Text size={30} type='bold' className="!text-dark text-center mb-4 px-2">
                        Pendaftaran Berhasil!
                    </Text>
                    
                    <Text className="!text-[#515F74] text-center leading-relaxed px-4">
                        Selamat bergabung di Vitality! Perjalanan hidup sehatmu dimulai dari sekarang.
                    </Text>

                </View>

                <View className="mt-auto pt-6 w-full">
                    <TouchableOpacity className="w-full bg-primaryDark py-4 rounded-2xl flex-row justify-center items-center shadow-md shadow-primaryDark/20" onPress={() => NavigationServices.replace(NAVIGATION_NAME.AUTH.loginScreen, {})}>
                        <Text type='bold' className="!text-white mr-2">Masuk ke Beranda</Text>
                        <Text size={18} type='bold' className="!text-white">→</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}