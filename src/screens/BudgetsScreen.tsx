import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { useData } from '../context/DataContext';
import { Card } from '../components/Card';
import { ProgressBar } from '../components/ProgressBar';
import { Screen } from '../components/Screen';
import { RootStackParamList } from '../navigation/types';

export const BudgetsScreen: React.FC = () => {
  const { budgets } = useData();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <Screen>
      <View style={styles.headerRow}>
        <Text style={styles.title}>Budgets</Text>
        <Pressable style={styles.addBtn} onPress={() => navigation.navigate('CreateBudget')}>
          <Text style={styles.addText}>+ Create</Text>
        </Pressable>
      </View>
      {budgets.map((b) => {
        const percent = b.spent / b.limit;
        const status =
          percent >= 1
            ? 'Over budget'
            : percent >= b.alertThreshold
            ? 'Close to limit'
            : 'On track';
        const statusColor =
          percent >= 1 ? colors.danger : percent >= b.alertThreshold ? colors.warning : colors.success;
        return (
          <Card key={b.id} style={styles.card}>
            <View style={styles.row}>
              <View>
                <Text style={styles.budgetTitle}>{b.title}</Text>
                <Text style={styles.subdued}>Monthly limit</Text>
              </View>
              <View style={[styles.pill, { backgroundColor: `${statusColor}18` }]}>
                <Text style={[styles.pillText, { color: statusColor }]}>{status}</Text>
              </View>
            </View>
            <View style={styles.row}>
              <Text style={styles.spent}>${b.spent.toFixed(0)}</Text>
              <Text style={styles.subdued}>of ${b.limit}</Text>
            </View>
            <ProgressBar value={percent} color={b.color ?? colors.blue} background="#E5E7EB" />
          </Card>
        );
      })}
    </Screen>
  );
};

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.lg,
    marginBottom: spacing.lg,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.foreground,
  },
  addBtn: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: 12,
  },
  addText: {
    fontWeight: '800',
    color: colors.foreground,
  },
  card: {
    marginBottom: spacing.md,
    gap: spacing.sm,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  budgetTitle: { fontSize: 18, fontWeight: '700', color: colors.foreground },
  subdued: { color: colors.muted },
  spent: { fontSize: 20, fontWeight: '800', color: colors.foreground },
  pill: { paddingHorizontal: spacing.md, paddingVertical: spacing.xs, borderRadius: 12 },
  pillText: { fontWeight: '700' },
});
