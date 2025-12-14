import React from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { useData } from '../context/DataContext';
import { Card } from '../components/Card';
import { formatDate } from '../utils/format';

export const TransactionsScreen: React.FC = () => {
  const { transactions, addTransaction } = useData();

  const handleAdd = async () => {
    const amount = Number((Math.random() * 40 + 5).toFixed(2));
    await addTransaction({
      title: 'New purchase',
      amount: -amount,
      category: 'Misc',
      date: new Date().toISOString(),
      account: 'Checking',
    });
  };

  return (
    <FlatList
      style={styles.list}
      contentContainerStyle={styles.content}
      data={transactions}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={<Text style={styles.title}>Transactions</Text>}
      renderItem={({ item }) => (
        <Card style={styles.card}>
          <View style={styles.row}>
            <View>
              <Text style={styles.name}>{item.title}</Text>
              <Text style={styles.meta}>
                {item.category} • {formatDate(item.date)}
              </Text>
            </View>
            <Text style={[styles.amount, item.amount < 0 ? styles.expense : styles.income]}>
              {item.amount < 0 ? '-' : '+'}${Math.abs(item.amount).toFixed(2)}
            </Text>
          </View>
          {item.account ? <Text style={styles.meta}>{item.account}</Text> : null}
        </Card>
      )}
      ListFooterComponent={
        <Pressable style={styles.footerBtn} onPress={handleAdd}>
          <Text style={styles.footerText}>Add sample transaction</Text>
        </Pressable>
      }
    />
  );
};

const styles = StyleSheet.create({
  list: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.xl, paddingBottom: spacing.xxl },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.foreground,
    marginBottom: spacing.lg,
  },
  card: {
    marginBottom: spacing.md,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: { fontSize: 16, fontWeight: '700', color: colors.foreground },
  meta: { color: colors.muted, marginTop: spacing.xs },
  amount: { fontSize: 16, fontWeight: '800' },
  expense: { color: colors.danger },
  income: { color: colors.success },
  footerBtn: {
    marginTop: spacing.md,
    paddingVertical: spacing.lg,
    borderRadius: 14,
    backgroundColor: colors.surface,
    alignItems: 'center',
  },
  footerText: { color: colors.muted, fontWeight: '700' },
});
