import React from 'react';
import { StyleSheet, View } from 'react-native';
import { colors } from '../theme/colors';

type Props = {
  value: number; // 0..1
  color?: string;
  background?: string;
};

export const ProgressBar: React.FC<Props> = ({ value, color = colors.primary, background }) => {
  const percent = Math.min(1, Math.max(0, value));
  return (
    <View style={[styles.track, { backgroundColor: background ?? colors.overlay }]}>
      <View style={[styles.fill, { width: `${percent * 100}%`, backgroundColor: color }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  track: {
    height: 10,
    borderRadius: 12,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
  },
});

