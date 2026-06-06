import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, Linking,
} from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Colors } from '../../constants/colors';
import { RANDEVULAR } from '../../constants/mockData';
import { useLang } from '../../context/LanguageContext';

const STATUS_CONFIG = {
  bekliyor:   { icon: 'time-outline',             key: 'status_pending',   color: '#F6AD55' },
  onaylandi:  { icon: 'checkmark-circle-outline',  key: 'status_confirmed', color: Colors.green },
  tamamlandi: { icon: 'ribbon-outline',            key: 'status_completed', color: Colors.gold },
};

export default function RandevularimScreen() {
  const router = useRouter();
  const { t, isRTL } = useLang();
  const [aktifTab, setAktifTab] = useState('yaklasan');

  const yaklasan      = RANDEVULAR.filter((r) => r.durum !== 'tamamlandi');
  const gecmis        = RANDEVULAR.filter((r) => r.durum === 'tamamlandi');
  const gosterilenler = aktifTab === 'yaklasan' ? yaklasan : gecmis;

  return (
    <View style={styles.container}>
      <SafeAreaView edges={['top']}>
        <View style={[styles.baslikRow, isRTL && { flexDirection: 'row-reverse' }]}>
          <Text style={styles.baslik}>{t('tab_appointments')}</Text>
          <TouchableOpacity style={styles.filtre}>
            <Ionicons name="options-outline" size={20} color={Colors.gold} />
          </TouchableOpacity>
        </View>

        <View style={styles.tabBar}>
          {['yaklasan', 'gecmis'].map((tab) => {
            const label = tab === 'yaklasan' ? t('apt_upcoming') : t('apt_past');
            const sayi  = tab === 'yaklasan' ? yaklasan.length : gecmis.length;
            return (
              <TouchableOpacity
                key={tab}
                style={[styles.tabBtn, aktifTab === tab && styles.tabBtnAktif]}
                onPress={() => setAktifTab(tab)}
              >
                <Text style={[styles.tabText, aktifTab === tab && styles.tabTextAktif]}>
                  {label}
                </Text>
                {sayi > 0 && (
                  <View style={[styles.tabBadge, aktifTab === tab && styles.tabBadgeAktif]}>
                    <Text style={[styles.tabBadgeText, aktifTab === tab && styles.tabBadgeTextAktif]}>
                      {sayi}
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </SafeAreaView>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 16, paddingBottom: 80 }}>
        {gosterilenler.length === 0 ? (
          <View style={styles.bosEkran}>
            <View style={styles.bosIkon}>
              <Ionicons name="calendar-outline" size={40} color={Colors.gold} />
            </View>
            <Text style={[styles.bosBaslik, isRTL && { textAlign: 'center' }]}>
              {t('apt_empty_title')}
            </Text>
            <Text style={[styles.bosAlt, isRTL && { textAlign: 'center' }]}>
              {t('apt_empty_sub')}
            </Text>
            <TouchableOpacity style={styles.randevuAlBtn} onPress={() => router.push('/')}>
              <Ionicons name="add-circle" size={18} color="#0A0A0A" />
              <Text style={styles.randevuAlText}>{t('apt_book')}</Text>
            </TouchableOpacity>
          </View>
        ) : (
          gosterilenler.map((r) => (
            <RandevuKart key={r.id} randevu={r} t={t} isRTL={isRTL} router={router} />
          ))
        )}
      </ScrollView>
    </View>
  );
}

function RandevuKart({ randevu, t, isRTL, router }) {
  const cfg = STATUS_CONFIG[randevu.durum] || STATUS_CONFIG.bekliyor;

  const handleIptal = () => {
    Alert.alert(
      t('apt_cancel'),
      `${randevu.berber.dukkAn} — ${randevu.hizmet}\n${randevu.gun} ${randevu.saat}`,
      [
        { text: t('apt_cancel_no') ?? 'Vazgeç', style: 'cancel' },
        {
          text: t('apt_cancel_yes') ?? 'İptal Et',
          style: 'destructive',
          onPress: () => Alert.alert('✓', t('apt_cancel_ok') ?? 'Randevu iptal edildi.'),
        },
      ]
    );
  };

  const handleYolTarifi = () => {
    const { lat, lng } = randevu.berber.konum || {};
    if (lat && lng) {
      Linking.openURL(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`);
    } else {
      Linking.openURL(`https://www.google.com/maps/search/${encodeURIComponent(randevu.berber.adres)}`);
    }
  };

  return (
    <View style={styles.kart}>
      <View style={[styles.kartUst, isRTL && { flexDirection: 'row-reverse' }]}>
        <Image source={{ uri: randevu.berber.kapakFoto }} style={styles.kartFoto} contentFit="cover" />
        <View style={[styles.kartBilgi, isRTL && { alignItems: 'flex-end' }]}>
          <Text style={[styles.kartDukkAn, isRTL && { textAlign: 'right' }]} numberOfLines={1}>
            {randevu.berber.dukkAn}
          </Text>
          <Text style={styles.kartHizmet}>{randevu.hizmet}</Text>
          <View style={[styles.kartMeta, isRTL && { flexDirection: 'row-reverse' }]}>
            <Ionicons name="calendar-outline" size={12} color={Colors.gray} />
            <Text style={styles.kartMetaText}>{randevu.gun} · {randevu.saat}</Text>
          </View>
          <View style={[styles.kartMeta, isRTL && { flexDirection: 'row-reverse' }]}>
            <Ionicons name="location-outline" size={12} color={Colors.gray} />
            <Text style={styles.kartMetaText} numberOfLines={1}>{randevu.berber.ilce}</Text>
          </View>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: `${cfg.color}18`, borderColor: `${cfg.color}40` }]}>
          <Ionicons name={cfg.icon} size={14} color={cfg.color} />
          <Text style={[styles.statusText, { color: cfg.color }]}>{t(cfg.key)}</Text>
        </View>
      </View>

      <View style={[styles.fiyatSerit, isRTL && { flexDirection: 'row-reverse' }]}>
        <Text style={styles.fiyatText}>₺{randevu.fiyat}</Text>
        <Text style={styles.ustAd}>{randevu.berber.ad}</Text>
      </View>

      <View style={[styles.aksiyonRow, isRTL && { flexDirection: 'row-reverse' }]}>
        {randevu.durum !== 'tamamlandi' && (
          <TouchableOpacity style={styles.iptBtn} onPress={handleIptal}>
            <Ionicons name="close-outline" size={16} color={Colors.red} />
            <Text style={styles.iptText}>{t('apt_cancel')}</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.yolBtn} onPress={handleYolTarifi}>
          <Ionicons name="navigate-outline" size={16} color={Colors.gold} />
          <Text style={styles.yolText}>{t('apt_directions')}</Text>
        </TouchableOpacity>
        {randevu.durum === 'tamamlandi' && (
          <TouchableOpacity
            style={styles.tekrarBtn}
            onPress={() => router.push(`/berber/${randevu.berber.id}`)}
          >
            <Ionicons name="repeat-outline" size={16} color="#0A0A0A" />
            <Text style={styles.tekrarText}>{t('apt_again')}</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bg },
  baslikRow: {
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20, paddingVertical: 14,
  },
  baslik: { fontSize: 24, fontWeight: '800', color: Colors.white },
  filtre: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: Colors.card, alignItems: 'center', justifyContent: 'center',
  },
  tabBar: { flexDirection: 'row', paddingHorizontal: 20, gap: 10, marginBottom: 6 },
  tabBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    paddingHorizontal: 18, paddingVertical: 9,
    borderRadius: 20, backgroundColor: Colors.card,
    borderWidth: 1, borderColor: Colors.cardBorder,
  },
  tabBtnAktif: { backgroundColor: Colors.gold, borderColor: Colors.gold },
  tabText: { fontSize: 13, fontWeight: '700', color: Colors.gray },
  tabTextAktif: { color: '#0A0A0A' },
  tabBadge: {
    backgroundColor: Colors.cardBorder, borderRadius: 10,
    paddingHorizontal: 6, paddingVertical: 1,
  },
  tabBadgeAktif: { backgroundColor: 'rgba(0,0,0,0.2)' },
  tabBadgeText: { fontSize: 10, fontWeight: '800', color: Colors.gray },
  tabBadgeTextAktif: { color: '#0A0A0A' },
  bosEkran: { alignItems: 'center', paddingTop: 80, gap: 14 },
  bosIkon: {
    width: 80, height: 80, borderRadius: 40,
    backgroundColor: 'rgba(201,168,76,0.1)', alignItems: 'center', justifyContent: 'center',
    borderWidth: 1, borderColor: 'rgba(201,168,76,0.2)',
  },
  bosBaslik: { fontSize: 18, fontWeight: '700', color: Colors.white },
  bosAlt: { fontSize: 14, color: Colors.gray, lineHeight: 22, textAlign: 'center' },
  randevuAlBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    backgroundColor: Colors.gold, borderRadius: 16,
    paddingHorizontal: 24, paddingVertical: 12, marginTop: 8,
  },
  randevuAlText: { fontSize: 15, fontWeight: '800', color: '#0A0A0A' },
  kart: {
    backgroundColor: Colors.card, borderRadius: 18,
    borderWidth: 1, borderColor: Colors.cardBorder,
    marginBottom: 14, overflow: 'hidden',
  },
  kartUst: { flexDirection: 'row', alignItems: 'flex-start', padding: 14, gap: 12 },
  kartFoto: { width: 64, height: 64, borderRadius: 14 },
  kartBilgi: { flex: 1 },
  kartDukkAn: { fontSize: 15, fontWeight: '700', color: Colors.white, marginBottom: 2 },
  kartHizmet: { fontSize: 13, color: Colors.gold, marginBottom: 6 },
  kartMeta: { flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: 2 },
  kartMetaText: { fontSize: 11, color: Colors.gray },
  statusBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    borderRadius: 10, paddingHorizontal: 8, paddingVertical: 4, borderWidth: 1,
  },
  statusText: { fontSize: 10, fontWeight: '700' },
  fiyatSerit: {
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14, paddingVertical: 10,
    borderTopWidth: 1, borderBottomWidth: 1,
    borderColor: Colors.cardBorder,
    backgroundColor: 'rgba(201,168,76,0.04)',
  },
  fiyatText: { fontSize: 18, fontWeight: '800', color: Colors.gold },
  ustAd: { fontSize: 12, color: Colors.gray },
  aksiyonRow: { flexDirection: 'row', gap: 8, padding: 12 },
  iptBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 5,
    paddingHorizontal: 14, paddingVertical: 8, borderRadius: 12,
    borderWidth: 1, borderColor: 'rgba(229,62,62,0.3)',
    backgroundColor: 'rgba(229,62,62,0.07)',
  },
  iptText: { fontSize: 12, fontWeight: '700', color: Colors.red },
  yolBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 5,
    paddingHorizontal: 14, paddingVertical: 8, borderRadius: 12,
    borderWidth: 1, borderColor: 'rgba(201,168,76,0.3)',
    backgroundColor: 'rgba(201,168,76,0.07)',
  },
  yolText: { fontSize: 12, fontWeight: '700', color: Colors.gold },
  tekrarBtn: {
    flex: 1, flexDirection: 'row', alignItems: 'center',
    justifyContent: 'center', gap: 5,
    paddingVertical: 8, borderRadius: 12,
    backgroundColor: Colors.gold,
  },
  tekrarText: { fontSize: 12, fontWeight: '800', color: '#0A0A0A' },
});
