import React from 'react';
import { DimensionValue, Text as NativeText, TextStyle } from 'react-native';

import { scale } from 'services/Scale';
import { Fonts } from 'themes/Fonts';

type PropsText = {
  children: any;
  color?: string;
  style?: TextStyle;
  numberOfLines?: number;
  size?: number;
  type?: 'regular' | 'semibold' | 'bold' | 'medium';
  textAlign?: 'auto' | 'left' | 'right' | 'center' | 'justify' | undefined;
  [key: string]: any;
  maxWidth?: DimensionValue;
  letterSpacing?: number;
  className?: string;
  onPress?: () => void;
};

const Text = ({
  children,
  color,
  style,
  numberOfLines,
  size,
  type,
  textAlign,
  maxWidth,
  letterSpacing,
  className,
  onPress,
}: PropsText) => {
  const fontFamily = (): string => {
    if (type === 'bold') {
      return Fonts.bold;
    }
    if (type === 'semibold') {
      return Fonts.semi;
    }
    if (type === 'medium') {
      return Fonts.medium;
    }
    return Fonts.normal;
  };

  return (
    <NativeText
      ellipsizeMode="tail"
      numberOfLines={numberOfLines}
      onPress={onPress}
      style={[
        style !== undefined && style,
        {
          fontFamily: fontFamily(),
          fontSize: size ? size : scale(16),
          color: color ? color : '8CA9FF',
        },
        textAlign !== undefined && { textAlign },
        maxWidth !== undefined && { maxWidth: maxWidth },
        letterSpacing !== undefined && { letterSpacing },
      ]}
      className={className}>
      {children}
    </NativeText>
  );
};

export default Text;
