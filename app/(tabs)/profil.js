import React from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView,
} from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../constants/colors';
import { KULLANICI, RANDEVULAR } from '../../constants/mockData';
import { useLang } from '../../context/LanguageContext';

const MENU_BOLUMLER = [
  {
    baslik: 'Hesabım',
    items: [
      { ikon: 'person-outline', label: 'Profil Bilgileri', badge: null },
      { ikon: 'heart-outline', label: 'Favori Berberlerim', badge: '3' },
      { ikon: 'trophy-outline', label: 'Rozetlerim', badge: null },
    ],
  },
  {
    baslik: 'Ödeme',
    items: [
      { ikon: 'card-outline', label: 'Ödeme Yöntemleri', badge: null },
      { ikon: 'receipt-outline', label: 'Geçmiş Ödemeler', badge: null },
      { ikon: 'gift-outline', label: 'Kuponlarım', badge: '1' },
    ],
  },
  {
    baslik: 'Destek',
    items: [
      { ikon: 'help-circle-outline', label: 'Sık Sorulan Sorular', badge: null },
      { ikon: 'chatbubble-outline', label: 'Bize Yazın', badge: null },
      { ikon: 'star-outline', label: 'Uygulamayı Puanla', badge: null },
    ],
  },
  {
    baslik: 'Uygulama',
    items: [
      { ikon: 'notifications-outline', label: 'Bildirim Ayarları', badge: null },
      { ikon: 'shield-checkmark-outline', label: 'Gizlilik Politikası', badge: null },
      { ikon: 'log-out-outline', label: 'Çıkış Yap', badge: null, tehlikeli: true },
    ],
  },
];

const ROZETLER = [
  { ikon: 'sunny-outline', label: 'Early Bird', renk: '#F6AD55' },
  { ikon: 'ribbon-outline', label: 'Sadık Müşteri', renk: Colors.gold },
  { ikon: 'star-outline', label: 'Yorumcu', renk: '#68D391' },
];

export default function ProfilScreen() {
  const { t, isRTL } = useLang();
  const tamamlanan = RANDEVULAR.filter((r) => r.durum === 'tamamlandi').length;

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* ── HERO PROFİL ────────────────────────── */}
        <LinearGradient
          colors={['#161616', '#0A0A0A']}
          style={styles.heroSection}
        >
          <SafeAreaView edges={['top']}>
            <View style={styles.profilRow}>
              <View style={styles.avatarWrap}>
                <Image
                  source={{ uri: KULLANICI.fotoUrl }}
                  style={styles.avatar}
                  contentFit="cover"
                />
                <View style={styles.avatarBadge}>
                  <Ionicons name="trophy" size={10} color="#0A0A0A" />
                </View>
              </View>
              <View style={styles.profilBilgi}>
                <Text style={styles.kullaniciAd}>{KULLANICI.ad}</Text>
                <Text style={styles.kullaniciTel}>{KULLANICI.telefon}</Text>
                <View style={styles.goldBadge}>
                  <Text style={styles.goldBadgeText}>{t('profile_gold')}</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.editBtn}>
                <Ionicons name="create-outline" size={18} color={Colors.gold} />
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </LinearGradient>

        {/* ── İSTATİSTİKLER ──────────────────────── */}
        <View style={styles.statsKart}>
          <StatKutu deger={KULLANICI.kesimSayisi} label={t('profile_cuts')} ikon="cut" />
          <View style={styles.statDivider} />
          <StatKutu deger={`₺${KULLANICI.harcama}`} label={t('profile_spending')} ikon="wallet" />
          <View style={styles.statDivider} />
          <StatKutu deger={KULLANICI.favoriSayi} label={t('profile_favorites')} ikon="heart" />
          <View style={styles.statDivider} />
          <StatKutu deger={`${KULLANICI.puan}`} label={t('profile_points')} ikon="trophy" />
        </View>

        {/* ── LOYALTY ────────────────────────────── */}
        <View style={styles.loyaltyKart}>
          <View style={styles.loyaltyBaslik}>
            <Ionicons name="trophy" size={18} color={Colors.gold} />
            <Text style={styles.loyaltyTitle}>Ustura Gold</Text>
            <View style={styles.loyaltyLevelBadge}>
              <Text style={styles.loyaltyLevelText}>GOLD</Text>
            </View>
          </View>
          <Text style={[styles.loyaltyDesc, isRTL && { textAlign: 'right' }]}>
            {t('loyalty_to_plat')}{' '}
            <Text style={{ color: Colors.gold }}>760 {t('loyalty_points')}</Text>
            {' '}{t('loyalty_pts_needed')}
          </Text>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '62%' }]}>
              <LinearGradient
                colors={[Colors.gold, Colors.goldLight]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={StyleSheet.absoluteFill}
              />
            </View>
          </View>
          <View style={styles.progressLabels}>
            <Text style={styles.progLabel}>0</Text>
            <Text style={styles.progLabel}>1.240 / 2.000</Text>
          </View>

          {/* Rozetler */}
          <View style={styles.rozetRow}>
            {ROZETLER.map((r, i) => (
              <View key={i} style={styles.rozetKutu}>
                <View style={[styles.rozetIkon, { borderColor: r.renk, backgroundColor: `${r.renk}18` }]}>
                  <Ionicons name={r.ikon} size={18} color={r.renk} />
                </View>
                <Text style={styles.rozetLabel}>{r.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* ── MENÜ ───────────────────────────────── */}
        {MENU_BOLUMLER.map((bolum, bi) => (
          <View key={bi} style={styles.menuBolum}>
            <Text style={styles.menuBolumBaslik}>{bolum.baslik}</Text>
            <View style={styles.menuKart}>
              {bolum.items.map((item, ii) => (
                <TouchableOpacity
                  key={ii}
                  style={[
                    styles.menuItem,
                    ii < bolum.items.length - 1 && styles.menuItemBorder,
                  ]}
                  activeOpacity={0.7}
                >
                  <View style={[styles.menuIkon, item.tehlikeli && { backgroundColor: 'rgba(229,62,62,0.1)' }]}>
                    <Ionicons
                      name={item.ikon}
                      size={18}
                      color={item.tehlikeli ? Colors.red : Colors.gold}
                    />
                  </View>
                  <Text style={[styles.menuLabel, item.tehlikeli && { color: Colors.red }]}>
                    {item.label}
                  </Text>
                  <View style={styles.menuSag}>
                    {item.badge && (
                      <View style={styles.badge}>
                        <Text style={styles.badgeText}>{item.badge}</Text>
                      </View>
                    )}
                    {!item.tehlikeli && (
                      <Ionicons name="chevron-forward" size={16} color={Colors.grayDark} />
                    )}
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

        {/* App version */}
        <Text style={[styles.versiyon, isRTL && { textAlign: 'center' }]}>{t('app_version')}</Text>

        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
}

function StatKutu({ deger, label, ikon }) {
  return (
    <View style={styles.statKutu}>
      <Ionicons name={ikon} size={16} color={Colors.gold} />
      <Text style={styles.statDeger}>{deger}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bg },

  // Hero
  heroSection: { paddingBottom: 20 },
  profilRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    gap: 14,
  },
  avatarWrap: { position: 'relative' },
  avatar: {
    width: 70, height: 70, borderRadius: 35,
    borderWidth: 3, borderColor: Colors.gold,
  },
  avatarBadge: {
    position: 'absolute', bottom: 0, right: 0,
    backgroundColor: Colors.gold, borderRadius: 10, width: 20, height: 20,
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 2, borderColor: Colors.bg,
  },
  profilBilgi: { flex: 1 },
  kullaniciAd: { fontSize: 20, fontWeight: '800', color: Colors.white, marginBottom: 3 },
  kullaniciTel: { fontSize: 13, color: Colors.gray, marginBottom: 7 },
  goldBadge: {
    backgroundColor: 'rgba(201,168,76,0.15)',
    borderRadius: 8, paddingHorizontal: 8, paddingVertical: 3,
    borderWidth: 1, borderColor: 'rgba(201,168,76,0.3)',
    alignSelf: 'flex-start',
  },
  goldBadgeText: { fontSize: 11, fontWeight: '700', color: Colors.gold },
  editBtn: {
    backgroundColor: Colors.card, borderRadius: 12, width: 40, height: 40,
    alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: Colors.cardBorder,
  },

  // Stats
  statsKart: {
    flexDirection: 'row',
    backgroundColor: Colors.card,
    marginHorizontal: 16,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    overflow: 'hidden',
    marginTop: -2,
    marginBottom: 16,
  },
  statKutu: { flex: 1, alignItems: 'center', paddingVertical: 16, gap: 4 },
  statDivider: { width: 1, backgroundColor: Colors.cardBorder },
  statDeger: { fontSize: 16, fontWeight: '800', color: Colors.white },
  statLabel: { fontSize: 11, color: Colors.gray },

  // Loyalty
  loyaltyKart: {
    backgroundColor: Colors.card,
    marginHorizontal: 16,
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    marginBottom: 20,
  },
  loyaltyBaslik: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 },
  loyaltyTitle: { fontSize: 17, fontWeight: '800', color: Colors.white, flex: 1 },
  loyaltyLevelBadge: {
    backgroundColor: Colors.gold, borderRadius: 8,
    paddingHorizontal: 8, paddingVertical: 3,
  },
  loyaltyLevelText: { fontSize: 10, fontWeight: '900', color: '#0A0A0A', letterSpacing: 1 },
  loyaltyDesc: { fontSize: 13, color: Colors.gray, marginBottom: 12 },
  progressBar: {
    height: 8, backgroundColor: 'rgba(201,168,76,0.15)',
    borderRadius: 4, overflow: 'hidden', marginBottom: 6,
  },
  progressFill: { height: 8, borderRadius: 4, overflow: 'hidden' },
  progressLabels: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  progLabel: { fontSize: 11, color: Colors.gray },
  rozetRow: { flexDirection: 'row', gap: 10 },
  rozetKutu: { alignItems: 'center', flex: 1 },
  rozetIkon: {
    width: 44, height: 44, borderRadius: 22, borderWidth: 1.5,
    alignItems: 'center', justifyContent: 'center', marginBottom: 5,
  },
  rozetLabel: { fontSize: 10, color: Colors.gray, textAlign: 'center' },

  // Menü
  menuBolum: { marginHorizontal: 16, marginBottom: 16 },
  menuBolumBaslik: {
    fontSize: 12, fontWeight: '700', color: Colors.gray,
    textTransform: 'uppercase', letterSpacing: 1.2, marginBottom: 8,
  },
  menuKart: {
    backgroundColor: Colors.card, borderRadius: 18,
    borderWidth: 1, borderColor: Colors.cardBorder, overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row', alignItems: 'center', padding: 15, gap: 12,
  },
  menuItemBorder: { borderBottomWidth: 1, borderBottomColor: Colors.cardBorder },
  menuIkon: {
    width: 36, height: 36, borderRadius: 10,
    backgroundColor: 'rgba(201,168,76,0.1)',
    alignItems: 'center', justifyContent: 'center',
  },
  menuLabel: { flex: 1, fontSize: 15, color: Colors.white, fontWeight: '500' },
  menuSag: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  badge: {
    backgroundColor: Colors.gold, borderRadius: 8, minWidth: 20, height: 20,
    alignItems: 'center', justifyContent: 'center', paddingHorizontal: 5,
  },
  badgeText: { fontSize: 11, fontWeight: '800', color: '#0A0A0A' },

  versiyon: {
    textAlign: 'center', fontSize: 12, color: Colors.grayDark,
    marginBottom: 8, letterSpacing: 0.5,
  },
});
