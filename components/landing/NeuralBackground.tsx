import React, { useMemo } from 'react';
import { View, useWindowDimensions } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import Colors from '@/constants/Colors';

type Node = {
  x: number;
  y: number;
  r: number;
  delay: number;
  speed: number;
  color: string;
};

function rand(seed: number) {
  // deterministic-ish pseudo random (no crypto)
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

export function NeuralBackground() {
  const { width, height } = useWindowDimensions();
  const w = Math.max(width, 360);
  const h = Math.max(height, 640);

  const nodes = useMemo<Node[]>(() => {
    const count = w > 900 ? 22 : 16;
    return Array.from({ length: count }).map((_, i) => {
      const rx = rand(i * 7.13);
      const ry = rand(i * 11.77);
      const rr = rand(i * 19.31);
      const rc = rand(i * 23.91);
      return {
        x: 8 + rx * 84,
        y: 10 + ry * 78,
        r: 2.2 + rr * 3.2,
        delay: Math.floor(rand(i * 5.41) * 900),
        speed: 3200 + Math.floor(rand(i * 3.99) * 2400),
        color: rc > 0.72 ? Colors.brand.green : Colors.brand.blue,
      };
    });
  }, [w]);

  return (
    <View
      style={{
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
      }}>
      {/* soft glow */}
      <View
        style={{
          position: 'absolute',
          left: -120,
          top: -160,
          width: w * 0.9,
          height: w * 0.9,
          borderRadius: 9999,
          backgroundColor: 'rgba(59,130,246,0.12)',
        }}
      />
      <View
        style={{
          position: 'absolute',
          right: -140,
          bottom: -200,
          width: w * 0.9,
          height: w * 0.9,
          borderRadius: 9999,
          backgroundColor: 'rgba(34,197,94,0.10)',
        }}
      />

      {/* nodes */}
      {nodes.map((n, idx) => (
        <FloatingNode key={idx} node={n} viewport={{ w, h }} />
      ))}

      {/* vignette */}
      <View
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          backgroundColor: 'rgba(11,15,26,0.35)',
        }}
      />
    </View>
  );
}

function FloatingNode({ node, viewport }: { node: Node; viewport: { w: number; h: number } }) {
  const t = useSharedValue(0);

  React.useEffect(() => {
    t.value = withRepeat(
      withTiming(1, { duration: node.speed, easing: Easing.inOut(Easing.quad) }),
      -1,
      true
    );
  }, [node.speed, t]);

  const style = useAnimatedStyle(() => {
    const dx = (t.value - 0.5) * 18;
    const dy = (t.value - 0.5) * 14;
    const o = 0.5 + 0.45 * Math.sin(t.value * Math.PI);
    return {
      transform: [{ translateX: dx }, { translateY: dy }],
      opacity: o,
    };
  });

  return (
    <Animated.View
      style={[
        {
          position: 'absolute',
          left: (node.x / 100) * viewport.w,
          top: (node.y / 100) * viewport.h,
          width: node.r * 2,
          height: node.r * 2,
          borderRadius: 999,
          backgroundColor: node.color,
          shadowColor: node.color,
          shadowOpacity: 0.55,
          shadowRadius: 10,
          shadowOffset: { width: 0, height: 0 },
        },
        style,
      ]}
    />
  );
}

