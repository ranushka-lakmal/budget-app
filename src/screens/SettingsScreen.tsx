import React from 'react';
import { Pressable, ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { useData } from '../context/DataContext';

export const SettingsScreen: React.FC = () => {
  const { prefs, user, updatePrefs, signOut } = useData();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Settings</Text>
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Profile</Text>
        <Text style={styles.value}>{user?.name ?? 'Guest'}</Text>
        <Text style={styles.subdued}>{user?.email ?? 'Not signed in'}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Security</Text>
        <View style={styles.row}>
          <View>
            <Text style={styles.label}>Enable FaceID</Text>
            <Text style={styles.subdued}>Use biometrics to unlock faster</Text>
          </View>
          <Switch
            value={prefs.faceIdEnabled}
            onValueChange={(v) => updatePrefs({ faceIdEnabled: v })}
            trackColor={{ true: colors.blue, false: colors.overlay }}
          />
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Preferences</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Start of week</Text>
          <Pressable
            style={styles.pill}
            onPress={() =>
              updatePrefs({ startOfWeek: prefs.startOfWeek === 'Monday' ? 'Sunday' : 'Monday' })
            }
          >
            <Text style={styles.pillText}>{prefs.startOfWeek}</Text>
          </Pressable>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Dark mode</Text>
          <Switch
            value={prefs.darkMode}
            onValueChange={(v) => updatePrefs({ darkMode: v })}
            trackColor={{ true: colors.blue, false: colors.overlay }}
          />
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Bill reminders</Text>
          <Switch
            value={prefs.billReminders}
            onValueChange={(v) => updatePrefs({ billReminders: v })}
            trackColor={{ true: colors.blue, false: colors.overlay }}
          />
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Budget alerts</Text>
          <Switch
            value={prefs.budgetAlerts}
            onValueChange={(v) => updatePrefs({ budgetAlerts: v })}
            trackColor={{ true: colors.blue, false: colors.overlay }}
          />
        </View>
      </View>

      <Pressable style={styles.logout} onPress={signOut}>
        <Text style={styles.logoutText}>Sign out</Text>
      </Pressable>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.xl, paddingBottom: spacing.xxl, gap: spacing.md },
  title: { fontSize: 28, fontWeight: '800', color: colors.foreground },
  card: {
    backgroundColor: colors.card,
    borderRadius: 18,
    padding: spacing.lg,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  sectionTitle: { fontWeight: '800', fontSize: 16, marginBottom: spacing.sm, color: colors.foreground },
  value: { fontWeight: '700', fontSize: 16, color: colors.foreground },
  subdued: { color: colors.muted },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  label: { fontWeight: '700', color: colors.foreground },
  pill: {
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xs,
    borderRadius: 12,
  },
  pillText: { fontWeight: '700', color: colors.foreground },
  logout: {
    marginTop: spacing.lg,
    backgroundColor: colors.danger,
    paddingVertical: spacing.lg,
    borderRadius: 14,
    alignItems: 'center',
  },
  logoutText: { color: '#fff', fontWeight: '800' },
});

