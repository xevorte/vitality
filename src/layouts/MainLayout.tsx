import Home from "assets/svgs/Home";
import Journal from "assets/svgs/Journal";
import Profile from "assets/svgs/Profile";
import Scan from "assets/svgs/Scan";
import Statistic from "assets/svgs/Statistic";
import Text from "components/CustomText";
import { Pressable, View } from "react-native";
import { ReactNode, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import NavigationServices from "services/NavigationServices";
import { NAVIGATION_NAME } from "navigation/NavigationName";
import { useSessionStore } from "stores/session/SessionStore";

export default function MainLayout({ children }: { children: ReactNode }) {
    const { setShowGuideModal } = useSessionStore();
    const navigation = useNavigation();
    const [currentScreen, setCurrentScreen] = useState('');

    useEffect(() => {
        const updateCurrentScreen = () => {
            const state = navigation.getState?.();
            let route: any = state?.routes?.[state?.index ?? 0];

            while (route?.state?.routes) {
                route = route.state.routes[route.state.index ?? 0];
            }

            setCurrentScreen(route?.name ?? '');
        };

        updateCurrentScreen();

        const unsubscribe = navigation.addListener?.('state', updateCurrentScreen);

        return () => {
            unsubscribe?.();
        };
    }, [navigation]);
  
    const getActiveScreen = (screenName: string) => {
        if (screenName === 'HomeScreen') return 'Home';
        if (screenName === 'JournalScreen') return 'Journal';
        if (screenName === 'ScanScreen') return 'Scan';
        if (screenName === 'StatisticScreen') return 'Statistic';
        if (screenName === 'ProfileScreen') return 'Profile';
        return 'Home';
    };
    
    const activeScreen = getActiveScreen(currentScreen);

    return (
        <View className="flex-1 relative">
            {children}
            {currentScreen != "ScanScreen" ? (
                <View className="absolute bottom-0 left-0 z-10 flex flex-row justify-around w-full bg-white p-4 pb-5 shadow-lg shadow-gray-900">
                    <View className={`absolute bottom-16 left-0 right-0 flex-row justify-center bg-transparent`}>
                        <Pressable className="flex-col items-center gap-1 bg-white py-2.5 px-5 border-[6px] border-[#FAF8FF] rounded-full" onPress={() => setShowGuideModal(true)}>
                            <Scan width={30} color="#10B981" />
                        </Pressable>
                    </View>
                    <Pressable className={`flex flex-col items-center gap-1 py-1 px-5 rounded-full`} onPress={() => NavigationServices.push(NAVIGATION_NAME.MAIN.homeScreen, {})}>
                        <Home width={22} color={activeScreen == "Home" ? "#10B981" : "#ADADAD"} />
                        <Text type='medium' className={activeScreen == "Home" ? "!text-primary" : "!text-secondaryLight"} size={12}>Beranda</Text>
                    </Pressable>
                    <Pressable className={`flex flex-col items-center gap-1 py-1 px-5 rounded-full`} onPress={() => NavigationServices.push(NAVIGATION_NAME.MAIN.journalScreen, {})}>
                        <Journal width={22} color={activeScreen == "Journal" ? "#10B981" : "#ADADAD"} />
                        <Text type='medium' className={activeScreen == "Journal" ? "!text-primary" : "!text-secondaryLight"} size={12}>Journal</Text>
                    </Pressable>
                    <Pressable className={`flex flex-col items-center gap-1 py-1 px-5 rounded-full`} onPress={() => NavigationServices.push(NAVIGATION_NAME.MAIN.statisticScreen, {})}>
                        <Statistic width={22} color={activeScreen == "Statistic" ? "#10B981" : "#ADADAD"} />
                        <Text type='medium' className={activeScreen == "Statistic" ? "!text-primary" : "!text-secondaryLight"} size={12}>Statistik</Text>
                    </Pressable>
                    <Pressable className={`flex flex-col items-center gap-1 py-1 px-6 rounded-full`} onPress={() => NavigationServices.push(NAVIGATION_NAME.MAIN.profileScreen, {})}>
                        <Profile width={22} color={activeScreen == "Profile" ? "#10B981" : "#ADADAD"} />
                        <Text type='medium' className={activeScreen == "Profile" ? "!text-primary" : "!text-secondaryLight"} size={12}>Profil</Text>
                    </Pressable>
                </View>
            ) : ""}
        </View>
    )
}