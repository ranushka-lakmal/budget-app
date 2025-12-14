import React, { useState } from 'react';
import { Dimensions, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { colors } from '../theme/colors';
import { useData } from '../context/DataContext';
import { Screen } from '../components/Screen';
import { spacing } from '../theme/spacing';

const { width } = Dimensions.get('window');

const slides = [
  {
    title: 'Budgeting made simple',
    body: 'Track expenses, save more, and hit your goals with zero stress.',
    accent: '#FFEB00',
    image: require('../../assets/icon.png'),
  },
  {
    title: 'See where your money goes',
    body: 'Gain clarity on your finances with clean charts and categories.',
    accent: '#2563EB',
    image: require('../../assets/adaptive-icon.png'),
  },
  {
    title: 'Reach savings goals faster',
    body: 'Create custom pots and watch your money grow.',
    accent: '#10B981',
    image: require('../../assets/icon.png'),
  },
];

type Props = NativeStackScreenProps<RootStackParamList, 'Onboarding'>;

export const OnboardingScreen: React.FC<Props> = ({ navigation }) => {
  const [index, setIndex] = useState(0);
  const { setOnboardingDone } = useData();
  const slide = slides[index];

  const handleNext = async () => {
    if (index < slides.length - 1) {
      setIndex(index + 1);
    } else {
      await setOnboardingDone(true);
      navigation.replace('SignIn');
    }
  };

  const handleSkip = async () => {
    await setOnboardingDone(true);
    navigation.replace('SignIn');
  };

  return (
    <Screen scrollable={false} background={colors.background}>
      <View style={styles.container}>
        <Pressable style={styles.skip} onPress={handleSkip}>
          <Text style={styles.skipText}>Skip</Text>
        </Pressable>
        <LinearGradient
          colors={[`${slide.accent}30`, `${slide.accent}05`]}
          style={styles.hero}
        >
          <View style={styles.imageWrap}>
            <Image source={slide.image} style={styles.image} resizeMode="contain" />
          </View>
        </LinearGradient>
        <View style={styles.content}>
          <Text style={styles.title}>{slide.title}</Text>
          <Text style={styles.body}>{slide.body}</Text>
          <View style={styles.dots}>
            {slides.map((_, i) => (
              <View
                key={i}
                style={[
                  styles.dot,
                  {
                    width: i === index ? 24 : 8,
                    backgroundColor: i === index ? slide.accent : colors.overlay,
                  },
                ]}
              />
            ))}
          </View>
          <Pressable style={[styles.cta, { backgroundColor: slide.accent }]} onPress={handleNext}>
            <Text style={styles.ctaText}>{index === slides.length - 1 ? 'Get Started' : 'Next'}</Text>
          </Pressable>
          <Pressable onPress={handleSkip} style={styles.secondary}>
            <Text style={styles.secondaryText}>I’ll do this later</Text>
          </Pressable>
        </View>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  skip: {
    alignSelf: 'flex-end',
    padding: spacing.md,
    marginRight: spacing.xl,
  },
  skipText: { color: colors.muted, fontWeight: '600' },
  hero: {
    marginHorizontal: spacing.xl,
    borderRadius: 24,
    height: width * 0.9,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 8 },
  },
  imageWrap: {
    width: width * 0.6,
    height: width * 0.6,
    backgroundColor: colors.card,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: { width: '70%', height: '70%' },
  content: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.xl,
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.foreground,
    marginBottom: spacing.sm,
  },
  body: {
    fontSize: 16,
    color: colors.muted,
    lineHeight: 22,
  },
  dots: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    marginVertical: spacing.lg,
  },
  dot: {
    height: 8,
    borderRadius: 8,
  },
  cta: {
    marginTop: spacing.sm,
    paddingVertical: spacing.lg,
    borderRadius: 16,
    alignItems: 'center',
  },
  ctaText: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.foreground,
  },
  secondary: {
    marginTop: spacing.md,
    alignItems: 'center',
  },
  secondaryText: {
    color: colors.muted,
    fontWeight: '600',
  },
});

