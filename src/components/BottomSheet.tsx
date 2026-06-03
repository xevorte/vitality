import { ReactNode, useEffect, useState } from 'react';
import {
  Pressable,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';
import Text from './CustomText';
import Close from 'assets/svgs/Close';

export default function BottomSheet({ isOpen, toggleSheet, duration = 250, title, className, children }: { isOpen: boolean, toggleSheet: () => void, duration?: number, title?: string, className?: string, children: ReactNode}) {
  const height = useSharedValue(0);
  const [isMounted, setIsMounted] = useState(false);
  
  const progress = useDerivedValue(() => {
    return withTiming(isOpen ? 0 : 1, { duration });
  });

  const sheetStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: progress.value * height.value }],
    };
  });

  const backdropStyle = useAnimatedStyle(() => ({
    opacity: 1 - progress.value,
  }));

  useEffect(() => {
    if (isOpen) {
      setIsMounted(true);
    } else if (!isOpen && isMounted) {
      const timer = setTimeout(() => {
        setIsMounted(false);
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isOpen, duration]);

  if (!isMounted) return null;

  return (
    <>
      <Animated.View
        style={[backdropStyle]}
        className="absolute inset-0 bg-black/30 z-20"
        pointerEvents={isOpen ? 'auto' : 'none'}
      >
        <TouchableOpacity style={{ flex: 1 }} onPress={toggleSheet} />
      </Animated.View>

      <Animated.View
        onLayout={(e) => {
          const newHeight = e.nativeEvent.layout.height;
          if (height.value !== newHeight) {
            height.value = newHeight;
          }
        }}
        style={[sheetStyle]}
        className={`absolute bottom-0 left-0 w-full bg-white dark:bg-[#272B3C] rounded-t-3xl z-20 ${className}`}
      >
        {title && (
          <View className="flex flex-row justify-between items-center px-[26px] py-[22px] border-b border-b-[#F7F7F7]">
            <Text size={16} type='semibold'>{title}</Text>
            <Pressable onPress={toggleSheet}>
              <Close width={26} color='#CFCFCF' />
            </Pressable>
          </View>
        )}
        <View className="p-[18px]">
          {children}
        </View>
      </Animated.View>
    </>
  );
}