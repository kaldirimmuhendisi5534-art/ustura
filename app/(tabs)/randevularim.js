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
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../constants/colors';
import { RANDEVULAR } from '../../constants/mockData';

const DURUM_CONFIG = {
  bekliyor: { renk: '#D69E2E', bg: 'rgba(214,158,46,0.12)', etiket: 'Bekliyor', ikon: 'time-outline' },
  onaylandi: { renk: Colors.green, bg: 'rgba(56,161,105,0.12)', etiket: 'Onaylandı', ikon: 'checkmark-circle-outline' },
  tamamlandi: { renk: Colors.gray, bg: 'rgba(136,136,136,0.1)', etiket: 'Tamamlandı', ikon: 'checkmark-done-outline' },
  iptal: { renk: Colors.red, bg: 'rgba(229,62,62,0.1)', etiket: 'İptal', ikon: 'close-circle-outline' },
};

export default function RandevularimScreen() {
  const [aktifTab, setAktifTab] = useState('gelecek');
  const router = useRouter();

  const gelecekler = RANDEVULAR.filter((r) => r.durum === 'bekliyor' || r.durum === 'onaylandi');
  const gecmisler = RANDEVULAR.filter((r) => r.durum === 'tamamlandi' || r.durum === 'iptal');
  const liste = aktifTab === 'gelecek' ? gelecekler : gecmisler;

  return (
    <View style={styles.container}>
      <SafeAreaView edges={['top']}>
        <View style={styles.header}>
          <Text style={styles.baslik}>Randevularım</Text>
          <TouchableOpacity style={styles.takvimBtn}>
            <Ionicons name="calendar-outline" size={22} color={Colors.gold} />
          </TouchableOpacity>
        </View>
        <View style={styles.tabBar}>
          <TouchableOpacity
            style={[styles.tab, aktifTab === 'gelecek' && styles.tabAktif]}
            onPress={() => setAktifTab('gelecek')}
          >
            <Text style={[styles.tabText, aktifTab === 'gelecek' && styles.tabTextAktif]}>Yaklaşan</Text>
            {gelecekler.length > 0 && (
              <View style={styles.tabBadge}>
                <Text style={styles.tabBadgeText}>{gelecekler.length}</Text>
              </View>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, aktifTab === 'gecmis' && styles.tabAktif]}
            onPress={() => setAktifTab('gecmis')}
          >
            <Text style={[styles.tabText, aktifTab === 'gecmis' && styles.tabTextAktif]}>Geçmiş</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {liste.length === 0 ? (
          <View style={styles.bosEkran}>
            <View style={styles.bosIkon}>
              <Ionicons name="calendar-outline" size={44} color={Colors.grayDark} />
            </View>
            <Text style={styles.bosBaslik}>Randevu Yok</Text>
            <Text style={styles.bosAlt}>
              {aktifTab === 'gelecek' ? 'Yaklaşan randevunuz bulunmuyor.' : 'Henüz tamamlanmış randevunuz yok.'}
            </Text>
            {aktifTab === 'gelecek' && (
              <TouchableOpacity style={styles.randevuAlBtn} onPress={() => router.push('/')}>
                <Text style={styles.randevuAlText}>Randevu Al</Text>
              </TouchableOpacity>
            )}
          </View>
        ) : (
          liste.map((r) => (
            <RandevuKart key={r.id} randevu={r} gecmis={aktifTab === 'gecmis'} onPress={() => router.push('/')} />
          ))
        )}
        {aktifTab === 'gelecek' && liste.length > 0 && (
          <TouchableOpacity style={styles.yeniBtn} onPress={() => router.push('/')}>
            <Ionicons name="add" size={18} color={Colors.gold} />
            <Text style={styles.yeniBtnText}>Yeni Randevu Al</Text>
          </TouchableOpacity>
        )}
        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
}

function RandevuKart({ randevu, gecmis, onPress }) {
  const cfg = DURUM_CONFIG[randevu.durum] || DURUM_CONFIG.bekliyor;
  return (
    <View style={styles.kart}>
      <View style={styles.kartUst}>
        <Image source={{ uri: randevu.berber.kapakFoto }} style={styles.kartFoto} contentFit="cover" />
        <View style={{ flex: 1 }}>
          <Text style={styles.kartDukkAn} numberOfLines={1}>{randevu.berber.dukkAn}</Text>
          <View style={styles.kartMeta}>
            <Ionicons name="location-outline" size={11} color={Colors.gold} />
            <Text style={styles.kartMetaText}>{randevu.berber.ilce}</Text>
          </View>
        </View>
        <View style={[styles.durumBadge, { backgroundColor: cfg.bg }]}>
          <Ionicons name={cfg.ikon} size={12} color={cfg.renk} />
          <Text style={[styles.durumText, { color: cfg.renk }]}>{cfg.etiket}</Text>
        </View>
      </View>
      <View style={styles.ayirici} />
      <View style={styles.kartDetay}>
        <DetayItem ikon="cut-outline" text={randevu.hizmet} />
        <DetayItem ikon="calendar-outline" text={randevu.gun} />
        <DetayItem ikon="time-outline" text={randevu.saat} />
      </View>
      <View style={styles.kartAlt}>
        <Text style={styles.kartFiyat}>₺{randevu.fiyat}</Text>
        <View style={styles.aksiyonRow}>
          {!gecmis && (
            <>
              <TouchableOpacity style={styles.iptalBtn}>
                <Text style={styles.iptalText}>İptal</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.haritaBtn}>
                <Ionicons name="navigate-outline" size={14} color={Colors.gold} />
                <Text style={styles.haritaText}>Yol Tarifi</Text>
              </TouchableOpacity>
            </>
          )}
          {gecmis && (
            <TouchableOpacity style={styles.tekrarBtn} onPress={onPress}>
              <Ionicons name="refresh-outline" size={14} color="#0A0A0A" />
              <Text style={styles.tekrarText}>Tekrar Al</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}

function DetayItem({ ikon, text }) {
  return (
    <View style={styles.detayItem}>
      <Ionicons name={ikon} size={14} color={Colors.gold} />
      <Text style={styles.detayText}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bg },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 20, paddingVertical: 14,
  },
  baslik: { fontSize: 26, fontWeight: '900', color: Colors.white },
  takvimBtn: {
    backgroundColor: Colors.card, borderRadius: 12, width: 42, height: 42,
    alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: Colors.cardBorder,
  },
  tabBar: {
    flexDirection: 'row', marginHorizontal: 20, backgroundColor: Colors.card,
    borderRadius: 14, padding: 4, marginBottom: 6, borderWidth: 1, borderColor: Colors.cardBorder,
  },
  tab: {
    flex: 1, paddingVertical: 10, borderRadius: 11, alignItems: 'center',
    flexDirection: 'row', justifyContent: 'center', gap: 6,
  },
  tabAktif: { backgroundColor: Colors.gold },
  tabText: { fontSize: 14, fontWeight: '700', color: Colors.gray },
  tabTextAktif: { color: '#0A0A0A' },
  tabBadge: {
    backgroundColor: '#0A0A0A', borderRadius: 8, minWidth: 18, height: 18,
    alignItems: 'center', justifyContent: 'center', paddingHorizontal: 4,
  },
  tabBadgeText: { fontSize: 10, fontWeight: '800', color: Colors.gold },
  scroll: { padding: 16, gap: 14 },
  kart: {
    backgroundColor: Colors.card, borderRadius: 20, borderWidth: 1,
    borderColor: Colors.cardBorder, overflow: 'hidden',
  },
  kartUst: { flexDirection: 'row', alignItems: 'center', padding: 14, gap: 12 },
  kartFoto: { width: 52, height: 52, borderRadius: 14 },
  kartDukkAn: { fontSize: 15, fontWeight: '700', color: Colors.white, marginBottom: 3 },
  kartMeta: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  kartMetaText: { fontSize: 12, color: Colors.gray },
  durumBadge: {
    flexDirection: 'row', alignItems: 'center', borderRadius: 10,
    paddingHorizontal: 8, paddingVertical: 5, gap: 4,
  },
  durumText: { fontSize: 11, fontWeight: '700' },
  ayirici: { height: 1, backgroundColor: Colors.cardBorder, marginHorizontal: 14 },
  kartDetay: { flexDirection: 'row', paddingHorizontal: 14, paddingVertical: 12, gap: 14, flexWrap: 'wrap' },
  detayItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  detayText: { fontSize: 13, color: Colors.white, fontWeight: '500' },
  kartAlt: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 14, paddingBottom: 14,
  },
  kartFiyat: { fontSize: 22, fontWeight: '800', color: Colors.gold },
  aksiyonRow: { flexDirection: 'row', gap: 8 },
  iptalBtn: {
    borderWidth: 1, borderColor: Colors.cardBorder, borderRadius: 12,
    paddingHorizontal: 14, paddingVertical: 9,
  },
  iptalText: { fontSize: 13, color: Colors.gray, fontWeight: '600' },
  haritaBtn: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(201,168,76,0.12)',
    borderRadius: 12, paddingHorizontal: 14, paddingVertical: 9, gap: 5,
    borderWidth: 1, borderColor: 'rgba(201,168,76,0.25)',
  },
  haritaText: { fontSize: 13, color: Colors.gold, fontWeight: '600' },
  tekrarBtn: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.gold,
    borderRadius: 12, paddingHorizontal: 16, paddingVertical: 9, gap: 6,
  },
  tekrarText: { fontSize: 13, color: '#0A0A0A', fontWeight: '700' },
  bosEkran: { alignItems: 'center', paddingTop: 80, gap: 12 },
  bosIkon: {
    width: 80, height: 80, borderRadius: 40, backgroundColor: Colors.card,
    alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: Colors.cardBorder,
  },
  bosBaslik: { fontSize: 18, fontWeight: '700', color: Colors.white },
  bosAlt: { fontSize: 14, color: Colors.gray, textAlign: 'center', lineHeight: 22 },
  randevuAlBtn: {
    backgroundColor: Colors.gold, borderRadius: 14, paddingHorizontal: 28,
    paddingVertical: 13, marginTop: 8,
  },
  randevuAlText: { fontSize: 15, fontWeight: '800', color: '#0A0A0A' },
  yeniBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    borderWidth: 1, borderColor: Colors.gold, borderStyle: 'dashed',
    borderRadius: 16, padding: 14, gap: 8, marginTop: 4,
  },
  yeniBtnText: { fontSize: 15, fontWeight: '700', color: Colors.gold },
});
