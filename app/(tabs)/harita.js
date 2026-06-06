import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  ScrollView, Dimensions, Linking,
} from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Colors } from '../../constants/colors';
import { BERBERLER } from '../../constants/mockData';
import { useLang } from '../../context/LanguageContext';

const { width, height } = Dimensions.get('window');

// Harita üzerindeki pin pozisyonları (ekranın %'si)
const PIN_POSITIONS = [
  { left: '28%', top: '35%' },
  { left: '55%', top: '25%' },
  { left: '42%', top: '55%' },
  { left: '70%', top: '45%' },
  { left: '18%', top: '60%' },
  { left: '60%', top: '65%' },
];

export default function HaritaScreen() {
  const router = useRouter();
  const { t, isRTL } = useLang();
  const [seciliBerber, setSeciliBerber] = useState(null);

  return (
    <View style={styles.container}>
      {/* Harita */}
      <View style={styles.haritaContainer}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1200&q=85' }}
          style={StyleSheet.absoluteFill}
          contentFit="cover"
          transition={400}
        />
        {/* Koyu overlay */}
        <View style={styles.haritaOverlay} />

        {/* Berber pinleri */}
        {BERBERLER.map((b, i) => {
          const pos = PIN_POSITIONS[i] || { left: '50%', top: '50%' };
          const aktif = seciliBerber?.id === b.id;
          return (
            <TouchableOpacity
              key={b.id}
              style={[styles.pin, pos, aktif && styles.pinAktif]}
              onPress={() => setSeciliBerber(aktif ? null : b)}
              activeOpacity={0.85}
            >
              <View style={[styles.pinIceri, aktif && styles.pinIceriAktif]}>
                <Text style={styles.pinFiyat}>₺{b.hizmetler[0].fiyat}</Text>
              </View>
              <View style={[styles.pinOk, aktif && styles.pinOkAktif]} />
            </TouchableOpacity>
          );
        })}

        {/* Üst bar */}
        <SafeAreaView edges={['top']} style={styles.ustBar}>
          <View style={styles.aramaKutu}>
            <Ionicons name="search" size={16} color={Colors.gray} />
            <Text style={styles.aramaPlaceholder}>{t('map_search')}</Text>
          </View>
          <TouchableOpacity style={styles.filtreBtnMap}>
            <Ionicons name="options-outline" size={18} color={Colors.gold} />
          </TouchableOpacity>
        </SafeAreaView>

        {/* Konumum butonu */}
        <TouchableOpacity style={styles.konumBtn}>
          <Ionicons name="locate" size={20} color={Colors.gold} />
        </TouchableOpacity>

        {/* Seçili berber popup */}
        {seciliBerber && (
          <View style={styles.popupKart}>
            <TouchableOpacity
              style={styles.popupIceri}
              onPress={() => router.push(`/berber/${seciliBerber.id}`)}
              activeOpacity={0.92}
            >
              <Image
                source={{ uri: seciliBerber.kapakFoto }}
                style={styles.popupFoto}
                contentFit="cover"
              />
              <View style={styles.popupBilgi}>
                <Text style={styles.popupAd} numberOfLines={1}>{seciliBerber.dukkAn}</Text>
                <View style={styles.popupMeta}>
                  <Ionicons name="location-outline" size={12} color={Colors.gold} />
                  <Text style={styles.popupMetaText}>{seciliBerber.ilce} · {seciliBerber.mesafe}</Text>
                </View>
                <View style={styles.popupAlt}>
                  <View style={styles.puanRow}>
                    <Ionicons name="star" size={12} color={Colors.gold} />
                    <Text style={styles.puanText}>{seciliBerber.puan}</Text>
                  </View>
                  <Text style={styles.popupFiyat}>₺{seciliBerber.hizmetler[0].fiyat}'den</Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={18} color={Colors.gray} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.hrtaBtn}
              onPress={() => {
                const { lat, lng } = seciliBerber.konum || {};
                if (lat && lng) {
                  Linking.openURL(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`);
                }
              }}
            >
              <Ionicons name="navigate" size={14} color="#0A0A0A" />
              <Text style={styles.hrtaBtnText}>{t('apt_directions')}</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Alt liste */}
      <View style={styles.altListe}>
        <View style={styles.altBaslik}>
          <Text style={[styles.altBaslikText, isRTL && { textAlign: 'right' }]}>{t('map_nearby')}</Text>
          <Text style={styles.altAdet}>{BERBERLER.length} {t('results')}</Text>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.yatayListeRow}
        >
          {BERBERLER.map((b) => {
            const minFiyat = Math.min(...b.hizmetler.map(h => h.fiyat));
            const aktif = seciliBerber?.id === b.id;
            return (
              <TouchableOpacity
                key={b.id}
                style={[styles.miniKart, aktif && styles.miniKartAktif]}
                onPress={() => {
                  setSeciliBerber(b);
                  router.push(`/berber/${b.id}`);
                }}
                activeOpacity={0.85}
              >
                <Image
                  source={{ uri: b.kapakFoto }}
                  style={styles.miniKartFoto}
                  contentFit="cover"
                />
                <View style={styles.miniKartBilgi}>
                  <Text style={styles.miniKartAd} numberOfLines={1}>{b.dukkAn}</Text>
                  <View style={styles.miniKartMeta}>
                    <Ionicons name="location-outline" size={10} color={Colors.gold} />
                    <Text style={styles.miniKartMetaText}>{b.mesafe}</Text>
                    <Ionicons name="star" size={10} color={Colors.gold} />
                    <Text style={styles.miniKartMetaText}>{b.puan}</Text>
                  </View>
                  <Text style={styles.miniKartFiyat}>₺{minFiyat}'den</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bg },

  // Harita
  haritaContainer: { flex: 1, position: 'relative' },
  haritaOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(10,10,10,0.35)',
  },

  // Pinler
  pin: {
    position: 'absolute',
    alignItems: 'center',
    transform: [{ translateX: -28 }, { translateY: -36 }],
  },
  pinAktif: { zIndex: 10 },
  pinIceri: {
    backgroundColor: Colors.card,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderWidth: 1.5,
    borderColor: Colors.cardBorder,
  },
  pinIceriAktif: {
    backgroundColor: Colors.gold,
    borderColor: Colors.gold,
  },
  pinFiyat: { fontSize: 12, fontWeight: '800', color: Colors.white },
  pinOk: {
    width: 0, height: 0,
    borderLeftWidth: 6, borderRightWidth: 6,
    borderTopWidth: 8,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: Colors.cardBorder,
    marginTop: -1,
  },
  pinOkAktif: { borderTopColor: Colors.gold },

  // Üst bar
  ustBar: {
    position: 'absolute',
    top: 0, left: 0, right: 0,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingBottom: 8,
  },
  aramaKutu: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(15,15,15,0.9)',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    gap: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  aramaPlaceholder: { flex: 1, fontSize: 14, color: Colors.gray },
  filtreBtnMap: {
    backgroundColor: 'rgba(15,15,15,0.9)',
    borderRadius: 14,
    width: 46,
    height: 46,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },

  // Konum butonu
  konumBtn: {
    position: 'absolute',
    bottom: 180,
    right: 16,
    backgroundColor: Colors.card,
    borderRadius: 14,
    width: 46,
    height: 46,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.cardBorder,
  },

  // Popup
  popupKart: {
    position: 'absolute',
    bottom: 170,
    left: 16,
    right: 16,
    backgroundColor: 'rgba(20,20,20,0.96)',
    borderRadius: 18,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.gold,
  },
  popupIceri: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    gap: 12,
  },
  hrtaBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: Colors.gold,
    paddingVertical: 10,
  },
  hrtaBtnText: { fontSize: 13, fontWeight: '800', color: '#0A0A0A' },
  popupFoto: { width: 56, height: 56, borderRadius: 12 },
  popupBilgi: { flex: 1 },
  popupAd: { fontSize: 14, fontWeight: '700', color: Colors.white, marginBottom: 3 },
  popupMeta: { flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: 5 },
  popupMetaText: { fontSize: 11, color: Colors.gray },
  popupAlt: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  puanRow: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  puanText: { fontSize: 12, fontWeight: '700', color: Colors.gold },
  popupFiyat: { fontSize: 14, fontWeight: '700', color: Colors.white },

  // Alt liste
  altListe: {
    backgroundColor: Colors.bg,
    borderTopWidth: 1,
    borderTopColor: Colors.cardBorder,
    paddingTop: 12,
    paddingBottom: 16,
  },
  altBaslik: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  altBaslikText: { fontSize: 15, fontWeight: '700', color: Colors.white },
  altAdet: { fontSize: 12, color: Colors.gray },
  yatayListeRow: { paddingHorizontal: 16, gap: 10 },

  // Mini kart
  miniKart: {
    width: 160,
    backgroundColor: Colors.card,
    borderRadius: 14,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.cardBorder,
  },
  miniKartAktif: { borderColor: Colors.gold },
  miniKartFoto: { width: '100%', height: 80 },
  miniKartBilgi: { padding: 10 },
  miniKartAd: { fontSize: 12, fontWeight: '700', color: Colors.white, marginBottom: 4 },
  miniKartMeta: {
    flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: 4,
  },
  miniKartMetaText: { fontSize: 10, color: Colors.gray },
  miniKartFiyat: { fontSize: 12, fontWeight: '700', color: Colors.gold },
});
