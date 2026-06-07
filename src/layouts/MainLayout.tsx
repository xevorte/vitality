import Home from "assets/svgs/Home";
import Journal from "assets/svgs/Journal";
import Profile from "assets/svgs/Profile";
import Scan from "assets/svgs/Scan";
import Statistic from "assets/svgs/Statistic";
import Text from "components/CustomText";
import { useCurrentScreen } from "contexts/NavigationContext";
import { ReactNode } from "react";
import { View } from "react-native";

export default function MainLayout({ children }: { children: ReactNode }) {
    const { currentScreen } = useCurrentScreen();
  
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
            <View className="absolute bottom-0 left-0 z-10 flex flex-row justify-around w-full bg-white p-4 shadow-lg shadow-slate-900">
                <View className={`flex flex-col items-center gap-1 ${activeScreen == "Home" ? "bg-primary" : ""} py-1 px-3 rounded-full`}>
                    <Home width={26} color={activeScreen == "Home" ? "#00422B" : "#00422B"} />
                    <Text className={activeScreen == "Home" ? "!text-primaryDarker" : "!text-secondaryLight"} size={14} type="regular">Beranda</Text>
                </View>
                <View className={`flex flex-col items-center gap-1 ${activeScreen == "Home" ? "bg-primary" : ""} py-1 px-3 rounded-full`}>
                    <Journal width={26} color={activeScreen == "Journal" ? "#00422B" : "#ADADAD"} />
                    <Text className={activeScreen == "Journal" ? "!text-primaryDarker" : "!text-secondaryLight"} size={14} type="regular">Journal</Text>
                </View>
                <View className={`flex flex-col items-center gap-1 ${activeScreen == "Home" ? "bg-primary" : ""} py-1 px-3 rounded-full`}>
                    <Scan width={26} color={activeScreen == "Scan" ? "#00422B" : "#ADADAD"} />
                    <Text className={activeScreen == "Scan" ? "!text-primaryDarker" : "!text-secondaryLight"} size={14} type="regular">Scan</Text>
                </View>
                <View className={`flex flex-col items-center gap-1 ${activeScreen == "Home" ? "bg-primary" : ""} py-1 px-3 rounded-full`}>
                    <Statistic width={26} color={activeScreen == "Statistic" ? "#00422B" : "#ADADAD"} />
                    <Text className={activeScreen == "Statistic" ? "!text-primaryDarker" : "!text-secondaryLight"} size={14} type="regular">Statistik</Text>
                </View>
                <View className={`flex flex-col items-center gap-1 ${activeScreen == "Home" ? "bg-primary" : ""} py-1 px-3 rounded-full`}>
                    <Profile width={26} color={activeScreen == "Profile" ? "#00422B" : "#ADADAD"} />
                    <Text className={activeScreen == "Profile" ? "!text-primaryDarker" : "!text-secondaryLight"} size={14} type="regular">Profil</Text>
                </View>
            </View>
        </View>
    )
}