import React from 'react';
import { Platform, StyleProp, View, ViewStyle } from 'react-native';
import { useColorScheme } from '@/components/useColorScheme';

type Props = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

export function GlassCard({ children, style }: Props) {
  const scheme = useColorScheme();
  const isDark = scheme === 'dark';

  return (
    <View
      style={[
        {
          borderRadius: 18,
          borderWidth: 1,
          borderColor: isDark ? 'rgba(255,255,255,0.10)' : 'rgba(15,23,42,0.10)',
          backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.72)',
          shadowColor: '#000',
          shadowOpacity: isDark ? 0.35 : 0.08,
          shadowRadius: 24,
          shadowOffset: { width: 0, height: 12 },
          elevation: 10,
          ...(Platform.OS === 'web'
            ? ({
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
              } as unknown as ViewStyle)
            : null),
        },
        style,
      ]}>
      {children}
    </View>
  );
}

