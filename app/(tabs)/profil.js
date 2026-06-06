import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../constants/colors';

const MENU_ITEMS = [
  { grup: 'Hesabım', items: [
    { ikon: 'person-outline', baslik: 'Profilimi Düzenle', alt: 'Ad, telefon, e-posta' },
    { ikon: 'notifications-outline', baslik: 'Bildirimler', alt: 'Randevu hatırlatıcıları' },
    { ikon: 'heart-outline', baslik: 'Favori Berberlerim', alt: '2 berber kayıtlı' },
  ]},
  { grup: 'Ödeme', items: [
    { ikon: 'card-outline', baslik: 'Ödeme Yöntemlerim', alt: 'Kart ekle, yönet' },
    { ikon: 'gift-outline', baslik: 'Sadakat Puanlarım', alt: '120 puan • 1 bedava kesim!' },
  ]},
  { grup: 'Destek', items: [
    { ikon: 'help-circle-outline', baslik: 'Yardım & SSS', alt: '' },
    { ikon: 'star-outline', baslik: 'Uygulamayı Puanla', alt: '' },
    { ikon: 'log-out-outline', baslik: 'Çıkış Yap', alt: '', renk: Colors.red },
  ]},
];

export default function ProfilScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profil Header */}
        <View style={styles.profilHeader}>
          <View style={styles.avatarKutu}>
            <Text style={styles.avatarEmoji}>👤</Text>
          </View>
          <View>
            <Text style={styles.kullaniciAd}>Mehmet Yılmaz</Text>
            <Text style={styles.telefon}>+90 555 123 4567</Text>
            <View style={styles.sadakatRow}>
              <Ionicons name="trophy" size={13} color={Colors.gold} />
              <Text style={styles.sadakatText}>120 puan • Sadık Müşteri</Text>
            </View>
          </View>
        </View>

        {/* İstatistik Kartları */}
        <View style={styles.statsRow}>
          <StatKutu ikon="cut" deger="14" label="Toplam Kesim" />
          <StatKutu ikon="star" deger="4.9" label="Verdiğin Puan" />
          <StatKutu ikon="wallet" deger="₺1.840" label="Toplam Harcama" />
        </View>

        {/* Menü */}
        {MENU_ITEMS.map((grup) => (
          <View key={grup.grup} style={styles.grupKutu}>
            <Text style={styles.grupBaslik}>{grup.grup}</Text>
            {grup.items.map((item, i) => (
              <TouchableOpacity key={i} style={styles.menuSatir}>
                <View style={[styles.menuIkon, { backgroundColor: item.renk ? 'rgba(239,68,68,0.1)' : 'rgba(201,168,76,0.1)' }]}>
                  <Ionicons name={item.ikon} size={20} color={item.renk || Colors.gold} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.menuBaslik, item.renk && { color: item.renk }]}>{item.baslik}</Text>
                  {item.alt ? <Text style={styles.menuAlt}>{item.alt}</Text> : null}
                </View>
                <Ionicons name="chevron-forward" size={16} color={Colors.grayDark} />
              </TouchableOpacity>
            ))}
          </View>
        ))}

        <Text style={styles.versiyon}>Ustura v1.0.0 • Berber randevu platformu</Text>
        <View style={{ height: 20 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

function StatKutu({ ikon, deger, label }) {
  return (
    <View style={styles.stat}>
      <Ionicons name={ikon} size={18} color={Colors.gold} />
      <Text style={styles.statDeger}>{deger}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bg },
  profilHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    padding: 20,
    paddingTop: 10,
  },
  avatarKutu: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: Colors.card,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: Colors.gold,
  },
  avatarEmoji: { fontSize: 32 },
  kullaniciAd: { fontSize: 20, fontWeight: '800', color: Colors.white, marginBottom: 3 },
  telefon: { fontSize: 14, color: Colors.gray, marginBottom: 5 },
  sadakatRow: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  sadakatText: { fontSize: 12, color: Colors.gold, fontWeight: '600' },
  statsRow: {
    flexDirection: 'row',
    marginHorizontal: 16,
    backgroundColor: Colors.card,
    borderRadius: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    overflow: 'hidden',
  },
  stat: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 16,
    gap: 5,
    borderRightWidth: 1,
    borderRightColor: Colors.cardBorder,
  },
  statDeger: { fontSize: 15, fontWeight: '800', color: Colors.white },
  statLabel: { fontSize: 11, color: Colors.gray, textAlign: 'center' },
  grupKutu: { marginHorizontal: 16, marginBottom: 16 },
  grupBaslik: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.gray,
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 8,
    marginLeft: 4,
  },
  menuSatir: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    borderRadius: 14,
    padding: 14,
    gap: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
  },
  menuIkon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuBaslik: { fontSize: 15, fontWeight: '600', color: Colors.white },
  menuAlt: { fontSize: 12, color: Colors.gray, marginTop: 2 },
  versiyon: { fontSize: 12, color: Colors.grayDark, textAlign: 'center', marginTop: 10 },
});
