import React from 'react';
import { ScrollView, StyleSheet, Text, View, Pressable } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Screen } from '../components/Screen';

const budgets = [
  {
    id: 'groceries',
    title: 'Groceries',
    left: '€150 left',
    spent: '€250 spent',
    limit: '€400 limit',
    percent: 0.62,
    color: '#FFE600',
    accentBg: '#FFF6CC',
    status: '',
    icon: { name: 'cart-outline' as const, bg: '#FFECE0', color: '#FF8A3D' },
  },
  {
    id: 'transport',
    title: 'Transport',
    left: 'Low balance',
    spent: '€80 spent',
    limit: '€100 limit',
    percent: 0.8,
    color: '#F6A40B',
    accentBg: '#FFF3D9',
    status: '',
    icon: { name: 'bus-outline' as const, bg: '#EAF2FF', color: '#3D7BF5' },
  },
  {
    id: 'fun',
    title: 'Fun & Outing',
    left: 'Over budget',
    spent: '€105 spent',
    limit: '€100 limit',
    percent: 1.05,
    color: '#E53935',
    accentBg: '#FFE6E6',
    status: '',
    icon: { name: 'party-popper' as const, bg: '#F1E6FF', color: '#9147F5', isMaterial: true },
  },
];

export const HomeScreen: React.FC = () => {
  return (
    <Screen background="#f7f5ed">
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.headerIcon}>
            <Ionicons name="md-piggy-bank" size={24} color="#FADB00" />
          </View>
          <View style={styles.monthPill}>
            <Ionicons name="calendar-outline" size={18} color="#5C5C4D" />
            <Text style={styles.monthText}>December 2025</Text>
            <Ionicons name="chevron-down" size={16} color="#5C5C4D" />
          </View>
          <View style={styles.bellWrap}>
            <Ionicons name="notifications-outline" size={26} color="#111" />
            <View style={styles.badgeDot} />
          </View>
        </View>

        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>AVAILABLE TO SPEND</Text>
          <Text style={styles.summaryValue}>€1,250.00</Text>
          <View style={styles.growthPill}>
            <Ionicons name="trending-up-outline" size={16} color="#1EA568" />
            <Text style={styles.growthText}>+12% vs last month</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.incomeRow}>
            <View style={styles.incomeCard}>
              <View style={[styles.bubble, { backgroundColor: '#E6F6EA' }]}>
                <Ionicons name="arrow-down" size={18} color="#1EA568" />
              </View>
              <Text style={styles.incomeLabel}>Income</Text>
              <Text style={styles.incomeValue}>€3,200</Text>
            </View>
            <View style={styles.incomeCard}>
              <View style={[styles.bubble, { backgroundColor: '#FCECEC' }]}>
                <Ionicons name="arrow-up" size={18} color="#E45757" />
              </View>
              <Text style={styles.incomeLabel}>Spent</Text>
              <Text style={styles.incomeValue}>€1,950</Text>
            </View>
          </View>
        </View>

        <View style={styles.tipCard}>
          <View style={[styles.tipIconWrap, { backgroundColor: '#FFEB00' }]}>
            <Ionicons name="bulb-outline" size={20} color="#111" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.tipTitle}>Smart Tip</Text>
            <Text style={styles.tipBody}>
              Try setting your first budget for <Text style={{ fontWeight: '800' }}>Groceries</Text> to save
              ~€30/mo.
            </Text>
          </View>
          <Ionicons name="close" size={18} color="#7A7A6C" />
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Budget Status</Text>
          <Pressable>
            <Text style={styles.sectionLink}>See all</Text>
          </Pressable>
        </View>

        {budgets.map((item) => (
          <View key={item.id} style={styles.budgetCard}>
            <View style={styles.budgetHeader}>
              <View style={[styles.iconCircle, { backgroundColor: item.icon.bg }]}>
                {item.icon.isMaterial ? (
                  <MaterialCommunityIcons name={item.icon.name} size={22} color={item.icon.color} />
                ) : (
                  <Ionicons name={item.icon.name} size={22} color={item.icon.color} />
                )}
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.budgetTitle}>{item.title}</Text>
                <Text style={[styles.budgetSub, { color: item.percent >= 1 ? '#C71F25' : '#8A8F9C' }]}>
                  {item.left}
                </Text>
              </View>
              <Text
                style={[
                  styles.percent,
                  { color: item.percent >= 1 ? '#C71F25' : '#111', fontWeight: item.percent >= 1 ? '800' : '700' },
                ]}
              >
                {(item.percent * 100).toFixed(0)}%
              </Text>
            </View>
            <View style={styles.track}>
              <View
                style={[
                  styles.trackFill,
                  {
                    width: `${Math.min(item.percent, 1.05) * 100}%`,
                    backgroundColor: item.color,
                  },
                ]}
              />
            </View>
            <View style={styles.budgetFooter}>
              <Text style={styles.footerText}>{item.spent}</Text>
              <Text style={styles.footerText}>{item.limit}</Text>
            </View>
          </View>
        ))}

        <View style={styles.bottomSpacer} />
      </ScrollView>

      <View style={styles.actionBar}>
        <Pressable style={styles.actionPrimary}>
          <View style={styles.actionIcon}>
            <Ionicons name="remove-outline" size={22} color="#111" />
          </View>
          <Text style={styles.actionPrimaryText}>Expense</Text>
        </Pressable>
        <View style={styles.action}>
          <Ionicons name="wallet-outline" size={20} color="#777" />
          <Text style={styles.actionText}>Income</Text>
        </View>
        <View style={styles.action}>
          <Ionicons name="swap-horizontal" size={20} color="#777" />
          <Text style={styles.actionText}>Transfer</Text>
        </View>
        <View style={styles.action}>
          <Ionicons name="ellipsis-horizontal" size={22} color="#777" />
        </View>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  content: {
    padding: 20,
    paddingBottom: 140,
    gap: 18,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  monthPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 18,
    gap: 8,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  monthText: {
    fontSize: 18,
    fontWeight: '800',
    color: '#111',
  },
  bellWrap: {
    position: 'relative',
    padding: 6,
  },
  badgeDot: {
    position: 'absolute',
    right: 6,
    top: 4,
    width: 8,
    height: 8,
    borderRadius: 6,
    backgroundColor: '#E53935',
  },
  summaryCard: {
    backgroundColor: '#fff',
    borderRadius: 22,
    padding: 22,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.07,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
  },
  summaryLabel: {
    color: '#7A7A6C',
    letterSpacing: 0.5,
    fontWeight: '700',
    marginBottom: 6,
  },
  summaryValue: {
    fontSize: 36,
    fontWeight: '900',
    color: '#111',
    marginBottom: 10,
  },
  growthPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#D9F2E2',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 14,
    gap: 6,
  },
  growthText: { color: '#1EA568', fontWeight: '800', fontSize: 14 },
  divider: {
    height: 1,
    backgroundColor: '#EFEFE8',
    width: '100%',
    marginVertical: 18,
  },
  incomeRow: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
    justifyContent: 'space-between',
  },
  incomeCard: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F7F5ED',
    borderRadius: 22,
    paddingVertical: 18,
    gap: 6,
  },
  bubble: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  incomeLabel: { color: '#7A7A6C', fontWeight: '700' },
  incomeValue: { fontSize: 20, fontWeight: '800', color: '#111' },
  tipCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF9D9',
    borderRadius: 24,
    padding: 18,
    gap: 14,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
  },
  tipIconWrap: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tipTitle: { fontSize: 16, fontWeight: '800', marginBottom: 4, color: '#111' },
  tipBody: { color: '#5C5C4D', lineHeight: 20 },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionTitle: { fontSize: 22, fontWeight: '900', color: '#111' },
  sectionLink: { color: '#7A7A6C', fontWeight: '800' },
  budgetCard: {
    backgroundColor: '#fff',
    borderRadius: 22,
    padding: 16,
    gap: 10,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  budgetHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  iconCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
  },
  budgetTitle: { fontSize: 18, fontWeight: '800', color: '#111' },
  budgetSub: { fontSize: 14, fontWeight: '600' },
  percent: { fontSize: 16 },
  track: {
    height: 12,
    borderRadius: 10,
    backgroundColor: '#EDEDED',
    overflow: 'hidden',
  },
  trackFill: {
    height: '100%',
    borderRadius: 10,
  },
  budgetFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footerText: { color: '#7A7A6C', fontWeight: '600' },
  bottomSpacer: { height: 40 },
  actionBar: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 24,
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 28,
    paddingVertical: 10,
    paddingHorizontal: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    gap: 12,
  },
  actionPrimary: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFEB00',
    borderRadius: 22,
    paddingHorizontal: 14,
    paddingVertical: 10,
    gap: 8,
    flex: 1,
  },
  actionPrimaryText: { fontWeight: '900', fontSize: 16, color: '#111' },
  actionIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFF2A8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  action: {
    alignItems: 'center',
    gap: 4,
    flex: 0.7,
  },
  actionText: { color: '#777', fontWeight: '700' },
});
