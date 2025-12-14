import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { useData } from '../context/DataContext';

type Props = NativeStackScreenProps<RootStackParamList, 'SignIn'>;

export const SignInScreen: React.FC<Props> = ({ navigation }) => {
  const { signIn } = useData();
  const [email, setEmail] = useState('demo@budgetmate.app');
  const [password, setPassword] = useState('password123');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    const ok = await signIn(email, password);
    setLoading(false);
    if (!ok) {
      setError('Incorrect password. Please try again.');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <View style={styles.header}>
        <Text style={styles.logo}>BudgetMate</Text>
        <Text style={styles.title}>Welcome back</Text>
        <Text style={styles.subtitle}>Let’s get your budget back on track.</Text>
      </View>
      <View style={styles.form}>
        <Text style={styles.label}>Email address</Text>
        <TextInput
          value={email}
          onChangeText={(v) => {
            setEmail(v);
            setError('');
          }}
          autoCapitalize="none"
          keyboardType="email-address"
          placeholder="name@example.com"
          style={styles.input}
          placeholderTextColor="#9CA3AF"
        />
        <Text style={[styles.label, { marginTop: spacing.lg }]}>Password</Text>
        <TextInput
          value={password}
          onChangeText={(v) => {
            setPassword(v);
            setError('');
          }}
          secureTextEntry
          placeholder="••••••••"
          style={[styles.input, error ? styles.inputError : null]}
          placeholderTextColor="#9CA3AF"
        />
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        <Pressable style={styles.forgot} onPress={() => setPassword('password123')}>
          <Text style={styles.forgotText}>Forgot password?</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={handleSubmit} disabled={loading}>
          <Text style={styles.buttonText}>{loading ? 'Signing in...' : 'Sign in'}</Text>
        </Pressable>
        <Pressable style={styles.secondary} onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.secondaryText}>
            New here? <Text style={{ fontWeight: '800' }}>Create account</Text>
          </Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xxl,
  },
  header: {
    marginBottom: spacing.xxl,
  },
  logo: {
    fontSize: 20,
    fontWeight: '900',
    color: colors.foreground,
    marginBottom: spacing.lg,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: colors.foreground,
  },
  subtitle: {
    marginTop: spacing.sm,
    fontSize: 16,
    color: '#6B7280',
  },
  form: {
    flex: 1,
  },
  label: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.foreground,
    marginBottom: spacing.sm,
  },
  input: {
    backgroundColor: '#F5F5F0',
    borderRadius: 18,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.lg,
    fontSize: 16,
    color: colors.foreground,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  inputError: {
    borderColor: colors.danger,
    backgroundColor: '#FEE2E2',
  },
  errorText: {
    color: colors.danger,
    marginTop: spacing.sm,
    fontWeight: '600',
  },
  forgot: {
    alignSelf: 'flex-end',
    marginTop: spacing.sm,
  },
  forgotText: {
    color: colors.foreground,
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
  button: {
    marginTop: spacing.xl,
    backgroundColor: colors.primary,
    paddingVertical: spacing.lg,
    borderRadius: 18,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.foreground,
  },
  secondary: {
    marginTop: spacing.lg,
    alignItems: 'center',
  },
  secondaryText: {
    color: colors.muted,
    fontWeight: '600',
  },
});

