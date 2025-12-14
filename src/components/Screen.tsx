import React from 'react';
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, View, ViewStyle } from 'react-native';
import { colors } from '../theme/colors';

type ScreenProps = {
  scrollable?: boolean;
  style?: ViewStyle;
  children: React.ReactNode;
  background?: string;
};

export const Screen: React.FC<ScreenProps> = ({
  scrollable = true,
  style,
  children,
  background = colors.background,
}) => {
  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: background }]}>
      <StatusBar barStyle="dark-content" />
      {scrollable ? (
        <ScrollView style={[styles.container]} contentContainerStyle={[styles.content, style]}>
          {children}
        </ScrollView>
      ) : (
        <View style={[styles.container, styles.content, style]}>{children}</View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1 },
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 28,
  },
});
