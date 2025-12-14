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

type Props = NativeStackScreenProps<RootStackParamList, 'SignUp'>;

export const SignUpScreen: React.FC<Props> = ({ navigation }) => {
  const { signUp } = useData();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    const ok = await signUp(name, email, password);
    if (!ok) {
      setError('Please provide name, email and a password (6+ chars).');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.header}>
        <Text style={styles.logo}>BudgetMate</Text>
        <Text style={styles.title}>Create account</Text>
        <Text style={styles.subtitle}>We keep everything locally on your device.</Text>
      </View>
      <View style={styles.form}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          value={name}
          onChangeText={(v) => {
            setName(v);
            setError('');
          }}
          placeholder="John Doe"
          style={styles.input}
          placeholderTextColor="#9CA3AF"
        />
        <Text style={[styles.label, { marginTop: spacing.lg }]}>Email address</Text>
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
          style={styles.input}
          placeholderTextColor="#9CA3AF"
        />
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        <Pressable style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Continue</Text>
        </Pressable>
        <Pressable style={styles.secondary} onPress={() => navigation.goBack()}>
          <Text style={styles.secondaryText}>Already have an account? Sign in</Text>
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
  form: { flex: 1 },
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
  errorText: {
    color: colors.danger,
    marginTop: spacing.sm,
    fontWeight: '600',
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

