import React from 'react';
import { Platform, StyleProp, View, ViewStyle } from 'react-native';
import Colors from '@/constants/Colors';

type Props = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

export function Container({ children, style }: Props) {
  return (
    <View
      style={[
        {
          width: '100%',
          maxWidth: 1180,
          alignSelf: 'center',
          paddingHorizontal: 20,
          ...(Platform.OS === 'web'
            ? ({ paddingLeft: 24, paddingRight: 24 } as ViewStyle)
            : null),
        },
        style,
      ]}>
      {children}
    </View>
  );
}

export const brand = Colors.brand;

