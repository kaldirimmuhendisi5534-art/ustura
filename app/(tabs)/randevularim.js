import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../constants/colors';
import { RANDEVULAR } from '../../constants/mockData';

const DURUM_RENK = {
  bekliyor: { bg: 'rgba(234,179,8,0.15)', text: '#EAB308', label: '⏳ Bekliyor' },
  onaylandi: { bg: 'rgba(56,161,105,0.15)', text: Colors.green, label: '✅ Onaylandı' },
  tamamlandi: { bg: 'rgba(99,102,241,0.15)', text: '#818CF8', label: '✓ Tamamlandı' },
  iptal: { bg: 'rgba(239,68,68,0.15)', text: Colors.red, label: '✗ İptal' },
};

export default function RandevularimScreen() {
  const [aktif, setAktif] = useState('gelecek');

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.baslik}>
        <Text style={styles.baslikText}>📅 Randevularım</Text>
      </View>

      {/* Tab */}
      <View style={styles.tabRow}>
        {['gelecek', 'gecmis'].map((t) => (
          <TouchableOpacity
            key={t}
            style={[styles.tab, aktif === t && styles.tabAktif]}
            onPress={() => setAktif(t)}
          >
            <Text style={[styles.tabText, aktif === t && styles.tabTextAktif]}>
              {t === 'gelecek' ? 'Yaklaşan' : 'Geçmiş'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 16, gap: 14 }}>
        {aktif === 'gelecek' ? (
          <>
            {RANDEVULAR.map((r) => (
              <RandevuKart key={r.id} randevu={r} />
            ))}
            {RANDEVULAR.length === 0 && <BosEkran />}
          </>
        ) : (
          <BosEkran mesaj="Geçmiş randevunuz bulunmuyor." />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

function RandevuKart({ randevu }) {
  const durum = DURUM_RENK[randevu.durum] || DURUM_RENK.bekliyor;
  return (
    <View style={styles.kart}>
      <Image
        source={{ uri: randevu.kapakFoto }}
        style={styles.kartFoto}
        contentFit="cover"
        transition={200}
      />
      <View style={styles.kartIcerik}>
        <View style={styles.kartUst}>
          <View style={{ flex: 1 }}>
            <Text style={styles.dukkAnAd}>{randevu.dukkAn}</Text>
            <Text style={styles.berberAd}>{randevu.berberAd}</Text>
          </View>
          <View style={[styles.durumBadge, { backgroundColor: durum.bg }]}>
            <Text style={[styles.durumText, { color: durum.text }]}>{durum.label}</Text>
          </View>
        </View>

        <View style={styles.detayRow}>
          <View style={styles.detayItem}>
            <Ionicons name="cut-outline" size={14} color={Colors.gold} />
            <Text style={styles.detayText}>{randevu.hizmet}</Text>
          </View>
          <View style={styles.detayItem}>
            <Ionicons name="calendar-outline" size={14} color={Colors.gold} />
            <Text style={styles.detayText}>{randevu.tarih}</Text>
          </View>
          <View style={styles.detayItem}>
            <Ionicons name="time-outline" size={14} color={Colors.gold} />
            <Text style={styles.detayText}>{randevu.saat}</Text>
          </View>
        </View>

        <View style={styles.kartAlt}>
          <Text style={styles.fiyat}>₺{randevu.fiyat}</Text>
          <TouchableOpacity style={styles.iptalBtn}>
            <Text style={styles.iptalText}>İptal Et</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

function BosEkran({ mesaj }) {
  return (
    <View style={styles.bos}>
      <Text style={{ fontSize: 60 }}>📅</Text>
      <Text style={styles.bosBaslik}>Randevu Yok</Text>
      <Text style={styles.bosAlt}>{mesaj || 'Henüz randevu almadınız.\nAna sayfadan berber seçip randevu alabilirsiniz.'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bg },
  baslik: { paddingHorizontal: 20, paddingVertical: 14 },
  baslikText: { fontSize: 22, fontWeight: '800', color: Colors.white },
  tabRow: {
    flexDirection: 'row',
    marginHorizontal: 16,
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 4,
    marginBottom: 4,
  },
  tab: { flex: 1, alignItems: 'center', paddingVertical: 10, borderRadius: 10 },
  tabAktif: { backgroundColor: Colors.gold },
  tabText: { fontSize: 14, fontWeight: '600', color: Colors.gray },
  tabTextAktif: { color: '#0A0A0A' },
  kart: {
    backgroundColor: Colors.card,
    borderRadius: 18,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.cardBorder,
  },
  kartFoto: { width: '100%', height: 120 },
  kartIcerik: { padding: 14 },
  kartUst: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 12 },
  dukkAnAd: { fontSize: 16, fontWeight: '700', color: Colors.white },
  berberAd: { fontSize: 13, color: Colors.gray, marginTop: 2 },
  durumBadge: { borderRadius: 8, paddingHorizontal: 10, paddingVertical: 4 },
  durumText: { fontSize: 12, fontWeight: '600' },
  detayRow: { flexDirection: 'row', gap: 16, flexWrap: 'wrap', marginBottom: 12 },
  detayItem: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  detayText: { fontSize: 13, color: Colors.white },
  kartAlt: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  fiyat: { fontSize: 20, fontWeight: '800', color: Colors.gold },
  iptalBtn: {
    backgroundColor: 'rgba(239,68,68,0.15)',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  iptalText: { fontSize: 13, color: Colors.red, fontWeight: '600' },
  bos: { alignItems: 'center', paddingVertical: 60, gap: 14 },
  bosBaslik: { fontSize: 20, fontWeight: '700', color: Colors.white },
  bosAlt: { fontSize: 14, color: Colors.gray, textAlign: 'center', lineHeight: 22 },
});
