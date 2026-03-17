import React from 'react';
import { Pressable, StyleProp, Text, TextStyle, ViewStyle } from 'react-native';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';

type Variant = 'primary' | 'secondary' | 'ghost';

type Props = {
  label: string;
  onPress?: () => void;
  variant?: Variant;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  accessibilityLabel?: string;
};

export function Button({
  label,
  onPress,
  variant = 'primary',
  style,
  textStyle,
  accessibilityLabel,
}: Props) {
  const scheme = useColorScheme();
  const isDark = scheme === 'dark';

  const base: ViewStyle = {
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 11,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
  };

  const variants: Record<Variant, ViewStyle> = {
    primary: {
      backgroundColor: Colors.brand.blue,
      borderColor: Colors.brand.blue,
    },
    secondary: {
      backgroundColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(15,23,42,0.06)',
      borderColor: isDark ? 'rgba(255,255,255,0.12)' : 'rgba(15,23,42,0.14)',
    },
    ghost: {
      backgroundColor: 'transparent',
      borderColor: 'transparent',
    },
  };

  const labelStyle: TextStyle = {
    color:
      variant === 'primary'
        ? Colors.brand.white
        : isDark
          ? 'rgba(241,245,249,0.92)'
          : 'rgba(15,23,42,0.92)',
    fontSize: 15,
    fontWeight: '600',
    letterSpacing: 0.2,
  };

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? label}
      onPress={onPress}
      style={({ pressed }) => [
        base,
        variants[variant],
        { transform: [{ scale: pressed ? 0.98 : 1 }], opacity: pressed ? 0.92 : 1 },
        style,
      ]}>
      <Text style={[labelStyle, textStyle]}>{label}</Text>
    </Pressable>
  );
}

