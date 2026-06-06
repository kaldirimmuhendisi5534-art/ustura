import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../constants/colors';
import { BERBERLER } from '../../constants/mockData';
import { useLang } from '../../context/LanguageContext';

const { width } = Dimensions.get('window');

const SAATLER = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
  '16:00', '16:30', '17:00', '17:30', '18:00', '18:30',
];

const DOLU_SAATLER = ['10:00', '11:30', '14:00', '16:00'];

export default function RandevuScreen() {
  const { id, hizmet, fiyat } = useLocalSearchParams();
  const router = useRouter();
  const { t, isRTL } = useLang();
  const berber = BERBERLER.find((b) => b.id === id) || BERBERLER[0];

  const [seciliGun, setSeciliGun] = useState(0);
  const [seciliSaat, setSeciliSaat] = useState(null);
  const [onaylandi, setOnaylandi] = useState(false);

  const GUNLER = [
    { gun: t('day_today'),    tarih: '7 Haz', uygun: true  },
    { gun: t('day_tomorrow'), tarih: '8 Haz', uygun: true  },
    { gun: t('day_sun'),      tarih: '9 Haz', uygun: true  },
    { gun: t('day_mon'),      tarih: '10 Haz', uygun: false },
    { gun: t('day_tue'),      tarih: '11 Haz', uygun: true  },
    { gun: t('day_wed'),      tarih: '12 Haz', uygun: true  },
    { gun: t('day_thu'),      tarih: '13 Haz', uygun: true  },
  ];

  if (onaylandi) {
    return (
      <SafeAreaView style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <View style={styles.basariKutu}>
          <View style={styles.basariIcon}>
            <Ionicons name="checkmark" size={48} color={Colors.gold} />
          </View>
          <Text style={[styles.basariBaslik, isRTL && { textAlign: 'center' }]}>{t('booking_success')}</Text>
          <Text style={styles.basariAlt}>
            {berber.dukkAn} — {hizmet}{'\n'}
            {GUNLER[seciliGun].gun} {GUNLER[seciliGun].tarih} saat {seciliSaat}
          </Text>
          <Text style={styles.basariFiyat}>₺{fiyat}</Text>
          <TouchableOpacity
            style={styles.anaGitBtn}
            onPress={() => router.push('/(tabs)/randevularim')}
          >
            <Text style={styles.anaGitText}>{t('booking_view_apts')}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('/')} style={{ marginTop: 12 }}>
            <Text style={{ color: Colors.gray, fontSize: 14 }}>{t('booking_back_home')}</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <View style={styles.container}>
      <SafeAreaView edges={['top']}>
        <View style={styles.ustBar}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={22} color={Colors.white} />
          </TouchableOpacity>
          <Text style={styles.baslik}>{t('booking_title')}</Text>
          <View style={{ width: 40 }} />
        </View>
      </SafeAreaView>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
        {/* Özet Kart */}
        <View style={styles.ozetKart}>
          <View style={styles.ozetIcon}>
            <Text style={{ fontSize: 28 }}>💈</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.ozetDukkAn}>{berber.dukkAn}</Text>
            <Text style={styles.ozetHizmet}>{hizmet}</Text>
            <View style={styles.ozetRow}>
              <Ionicons name="location-outline" size={12} color={Colors.gold} />
              <Text style={styles.ozetIlce}>{berber.ilce}</Text>
            </View>
          </View>
          <Text style={styles.ozetFiyat}>₺{fiyat}</Text>
        </View>

        {/* Gün Seç */}
        <Text style={[styles.bolumBaslik, isRTL && { textAlign: 'right' }]}>{t('booking_pick_day')}</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.gunlerRow}
        >
          {GUNLER.map((g, i) => (
            <TouchableOpacity
              key={i}
              style={[
                styles.gunKutu,
                seciliGun === i && styles.gunKutuSec,
                !g.uygun && styles.gunKutuDolu,
              ]}
              onPress={() => g.uygun && setSeciliGun(i)}
              disabled={!g.uygun}
            >
              <Text style={[styles.gunAd, seciliGun === i && styles.gunAdSec, !g.uygun && { color: Colors.grayDark }]}>
                {g.gun}
              </Text>
              <Text style={[styles.gunTarih, seciliGun === i && styles.gunTarihSec, !g.uygun && { color: Colors.grayDark }]}>
                {g.tarih}
              </Text>
              {!g.uygun && <Text style={styles.kapaliText}>{t('booking_closed')}</Text>}
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Saat Seç */}
        <Text style={[styles.bolumBaslik, isRTL && { textAlign: 'right' }]}>{t('booking_pick_time')}</Text>
        <View style={styles.saatlerGrid}>
          {SAATLER.map((s) => {
            const dolu = DOLU_SAATLER.includes(s);
            return (
              <TouchableOpacity
                key={s}
                style={[
                  styles.saatKutu,
                  seciliSaat === s && styles.saatKutuSec,
                  dolu && styles.saatKutuDolu,
                ]}
                onPress={() => !dolu && setSeciliSaat(s)}
                disabled={dolu}
              >
                <Text
                  style={[
                    styles.saatText,
                    seciliSaat === s && styles.saatTextSec,
                    dolu && styles.saatTextDolu,
                  ]}
                >
                  {s}
                </Text>
                {dolu && <Text style={styles.doluText}>{t('booking_busy')}</Text>}
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Not */}
        <View style={styles.bilgiKutu}>
          <Ionicons name="information-circle-outline" size={16} color={Colors.gold} />
          <Text style={[styles.bilgiText, isRTL && { textAlign: 'right' }]}>
            {t('booking_sms_info')}
          </Text>
        </View>
      </ScrollView>

      {/* Onayla Butonu */}
      <View style={styles.altPanel}>
        <View>
          <Text style={styles.altLabel}>
            {seciliSaat
              ? `${GUNLER[seciliGun].gun} ${GUNLER[seciliGun].tarih} — ${seciliSaat}`
              : t('booking_time_hint')}
          </Text>
          <Text style={styles.altFiyat}>₺{fiyat}</Text>
        </View>
        <TouchableOpacity
          style={[styles.onaylaBtn, !seciliSaat && { opacity: 0.4 }]}
          onPress={() => seciliSaat && setOnaylandi(true)}
          disabled={!seciliSaat}
        >
          <Ionicons name="checkmark-circle" size={20} color="#0A0A0A" />
          <Text style={styles.onaylaBtnText}>{t('booking_confirm')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bg },
  ustBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backBtn: {
    backgroundColor: Colors.card,
    borderRadius: 20,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  baslik: { fontSize: 17, fontWeight: '700', color: Colors.white },
  ozetKart: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    marginHorizontal: 16,
    borderRadius: 16,
    padding: 16,
    gap: 14,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    marginBottom: 8,
  },
  ozetIcon: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: 'rgba(201,168,76,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ozetDukkAn: { fontSize: 15, fontWeight: '700', color: Colors.white },
  ozetHizmet: { fontSize: 13, color: Colors.gold, marginTop: 2 },
  ozetRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 3 },
  ozetIlce: { fontSize: 12, color: Colors.gray },
  ozetFiyat: { fontSize: 22, fontWeight: '800', color: Colors.gold },
  bolumBaslik: {
    fontSize: 17,
    fontWeight: '700',
    color: Colors.white,
    marginHorizontal: 16,
    marginTop: 20,
    marginBottom: 12,
  },
  gunlerRow: { paddingHorizontal: 16, gap: 10 },
  gunKutu: {
    alignItems: 'center',
    backgroundColor: Colors.card,
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    minWidth: 72,
  },
  gunKutuSec: { backgroundColor: Colors.gold, borderColor: Colors.gold },
  gunKutuDolu: { opacity: 0.4 },
  gunAd: { fontSize: 13, fontWeight: '600', color: Colors.gray },
  gunAdSec: { color: '#0A0A0A' },
  gunTarih: { fontSize: 12, color: Colors.grayDark, marginTop: 3 },
  gunTarihSec: { color: '#0A0A0A' },
  kapaliText: { fontSize: 10, color: Colors.grayDark, marginTop: 2 },
  saatlerGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    gap: 10,
  },
  saatKutu: {
    width: (width - 32 - 40) / 4,
    alignItems: 'center',
    backgroundColor: Colors.card,
    borderRadius: 12,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
  },
  saatKutuSec: { backgroundColor: Colors.gold, borderColor: Colors.gold },
  saatKutuDolu: { opacity: 0.35 },
  saatText: { fontSize: 14, fontWeight: '600', color: Colors.white },
  saatTextSec: { color: '#0A0A0A' },
  saatTextDolu: { color: Colors.grayDark },
  doluText: { fontSize: 9, color: Colors.grayDark, marginTop: 2 },
  bilgiKutu: {
    flexDirection: 'row',
    gap: 10,
    marginHorizontal: 16,
    marginTop: 20,
    backgroundColor: 'rgba(201,168,76,0.08)',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: 'rgba(201,168,76,0.2)',
  },
  bilgiText: { flex: 1, fontSize: 13, color: Colors.gray, lineHeight: 20 },
  altPanel: {
    position: 'absolute',
    bottom: 0, left: 0, right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.card,
    borderTopWidth: 1,
    borderTopColor: Colors.cardBorder,
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingBottom: 30,
  },
  altLabel: { fontSize: 13, color: Colors.gray },
  altFiyat: { fontSize: 22, fontWeight: '800', color: Colors.gold, marginTop: 2 },
  onaylaBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.gold,
    borderRadius: 16,
    paddingHorizontal: 28,
    paddingVertical: 14,
    gap: 8,
  },
  onaylaBtnText: { fontSize: 16, fontWeight: '800', color: '#0A0A0A' },
  basariKutu: { alignItems: 'center', padding: 30 },
  basariIcon: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(201,168,76,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    borderWidth: 2,
    borderColor: Colors.gold,
  },
  basariBaslik: { fontSize: 26, fontWeight: '800', color: Colors.white, marginBottom: 10 },
  basariAlt: { fontSize: 15, color: Colors.gray, textAlign: 'center', lineHeight: 24, marginBottom: 16 },
  basariFiyat: { fontSize: 32, fontWeight: '800', color: Colors.gold, marginBottom: 30 },
  anaGitBtn: {
    backgroundColor: Colors.gold,
    borderRadius: 16,
    paddingHorizontal: 32,
    paddingVertical: 14,
  },
  anaGitText: { fontSize: 16, fontWeight: '800', color: '#0A0A0A' },
});
