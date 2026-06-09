import { SafeAreaView, ScrollView } from 'react-native';
import Text from 'components/CustomText';

export default function StatisticScreen() {
  return (
    <SafeAreaView className="flex-1 bg-[#FAFAFA]">
      <ScrollView 
        contentContainerStyle={{ flexGrow: 1, padding: 24, paddingBottom: 32 }} 
        showsVerticalScrollIndicator={false}
      >
        <Text size={24} type='bold' className="!text-primaryDark mb-8">
          Statistik
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}