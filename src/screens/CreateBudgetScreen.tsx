import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { useData } from '../context/DataContext';

type Props = NativeStackScreenProps<RootStackParamList, 'CreateBudget'>;

export const CreateBudgetScreen: React.FC<Props> = ({ navigation }) => {
  const { addBudget } = useData();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [limit, setLimit] = useState('');
  const [alertThreshold, setAlertThreshold] = useState('0.8');

  const handleSave = async () => {
    if (!title || !limit) return;
    await addBudget({
      title,
      category: category || title,
      limit: Number(limit),
      alertThreshold: Number(alertThreshold) || 0.8,
      color: '#2563EB',
    });
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Text style={styles.title}>Create Budget</Text>
      <View style={styles.form}>
        <Text style={styles.label}>Category</Text>
        <TextInput
          placeholder="Groceries"
          value={title}
          onChangeText={setTitle}
          style={styles.input}
          placeholderTextColor="#9CA3AF"
        />
        <Text style={[styles.label, { marginTop: spacing.lg }]}>Monthly limit</Text>
        <TextInput
          placeholder="500"
          value={limit}
          onChangeText={setLimit}
          keyboardType="numeric"
          style={styles.input}
          placeholderTextColor="#9CA3AF"
        />
        <Text style={[styles.label, { marginTop: spacing.lg }]}>Category label</Text>
        <TextInput
          placeholder="Food, Transport, etc."
          value={category}
          onChangeText={setCategory}
          style={styles.input}
          placeholderTextColor="#9CA3AF"
        />
        <Text style={[styles.label, { marginTop: spacing.lg }]}>Alert threshold (0-1)</Text>
        <TextInput
          placeholder="0.8"
          value={alertThreshold}
          onChangeText={setAlertThreshold}
          keyboardType="decimal-pad"
          style={styles.input}
          placeholderTextColor="#9CA3AF"
        />
        <Pressable style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>Save Budget</Text>
        </Pressable>
        <Pressable style={styles.secondary} onPress={() => navigation.goBack()}>
          <Text style={styles.secondaryText}>Cancel</Text>
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
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.foreground,
    marginBottom: spacing.xl,
  },
  form: { flex: 1 },
  label: { fontWeight: '700', color: colors.foreground, marginBottom: spacing.sm },
  input: {
    backgroundColor: '#F5F5F0',
    borderRadius: 16,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.lg,
    fontSize: 16,
    color: colors.foreground,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  button: {
    marginTop: spacing.xl,
    backgroundColor: colors.blue,
    paddingVertical: spacing.lg,
    borderRadius: 16,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontWeight: '800', fontSize: 18 },
  secondary: { marginTop: spacing.md, alignItems: 'center' },
  secondaryText: { color: colors.muted, fontWeight: '600' },
});

