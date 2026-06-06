import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/colors';
import { View, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useLang } from '../../context/LanguageContext';

function TabIcon({ name, color, focused }) {
  return (
    <View style={[styles.iconWrap, focused && styles.iconWrapActive]}>
      <Ionicons name={name} size={22} color={color} />
    </View>
  );
}

const styles = StyleSheet.create({
  iconWrap: {
    width: 44,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
  },
  iconWrapActive: {
    backgroundColor: 'rgba(201,168,76,0.12)',
  },
});

export default function TabLayout() {
  const { t } = useLang();
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#0F0F0F',
          borderTopColor: '#1E1E1E',
          borderTopWidth: 1,
          height: 60 + insets.bottom,
          paddingBottom: insets.bottom + 8,
          paddingTop: 8,
          elevation: 0,
          shadowOpacity: 0,
        },
        tabBarActiveTintColor: Colors.gold,
        tabBarInactiveTintColor: '#555555',
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '700',
          marginTop: 2,
          letterSpacing: 0.3,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: t('tab_explore'),
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name={focused ? 'compass' : 'compass-outline'} color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="harita"
        options={{
          title: t('tab_map'),
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name={focused ? 'map' : 'map-outline'} color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="randevularim"
        options={{
          title: t('tab_appointments'),
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name={focused ? 'calendar' : 'calendar-outline'} color={color} focused={focused} />
          ),
          tabBarBadge: 2,
          tabBarBadgeStyle: {
            backgroundColor: Colors.gold,
            color: '#0A0A0A',
            fontSize: 9,
            fontWeight: '800',
          },
        }}
      />
      <Tabs.Screen
        name="profil"
        options={{
          title: t('tab_profile'),
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name={focused ? 'person' : 'person-outline'} color={color} focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
}
