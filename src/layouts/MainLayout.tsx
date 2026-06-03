import BillList from "assets/svgs/BillList";
import Home from "assets/svgs/Home";
import User from "assets/svgs/User";
import Text from "components/CustomText";
import { useCurrentScreen } from "contexts/NavigationContext";
import { ReactNode } from "react";
import { View } from "react-native";

export default function MainLayout({ children }: { children: ReactNode }) {
    const { currentScreen } = useCurrentScreen();
  
    const getActiveScreen = (screenName: string) => {
        if (screenName === 'HomeScreen') return 'Home';
        if (screenName === 'TransactionScreen') return 'Transaction';
        if (screenName === 'ProfileScreen') return 'Profile';
        return 'Home';
    };
    
    const activeScreen = getActiveScreen(currentScreen);

    return (
        <View className="flex-1 relative">
            {children}
            <View className="absolute bottom-0 left-0 z-10 flex flex-row justify-around w-full bg-white p-[18px] shadow-lg shadow-slate-900">
                <View className="flex flex-col items-center gap-1.5">
                    <Home width={26} color={activeScreen == "Home" ? "#04A6E1" : "#ADADAD"} />
                    <Text className={activeScreen == "Home" ? "!text-primaryDarker" : "!text-secondaryLight"} size={14} type="regular">Beranda</Text>
                </View>
                <View className="flex flex-col items-center gap-1.5">
                    <BillList width={26} color={activeScreen == "Transaction" ? "#04A6E1" : "#ADADAD"} />
                    <Text className={activeScreen == "Transaction" ? "!text-primaryDarker" : "!text-secondaryLight"} size={14} type="regular">Transaksi</Text>
                </View>
                <View className="flex flex-col items-center gap-1.5">
                    <User width={26} color={activeScreen == "Profile" ? "#04A6E1" : "#ADADAD"} />
                    <Text className={activeScreen == "Profile" ? "!text-primaryDarker" : "!text-secondaryLight"} size={14} type="regular">Profil</Text>
                </View>
            </View>
        </View>
    )
}