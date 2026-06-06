import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  FlatList,
  Linking,
} from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../constants/colors';
import { BERBERLER } from '../../constants/mockData';

const { width } = Dimensions.get('window');

export default function BerberProfilScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const berber = BERBERLER.find((b) => b.id === id) || BERBERLER[0];
  const [seciliHizmet, setSeciliHizmet] = useState(berber.hizmetler[0]);

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Kapak Fotoğraf */}
        <View style={styles.kapak}>
          <Image
            source={{ uri: berber.kapakFoto }}
            style={StyleSheet.absoluteFill}
            contentFit="cover"
            transition={300}
          />
          <LinearGradient
            colors={['rgba(0,0,0,0.4)', 'transparent', '#0A0A0A']}
            style={StyleSheet.absoluteFill}
          />
          {/* Geri Tuşu */}
          <SafeAreaView edges={['top']} style={styles.header}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
              <Ionicons name="arrow-back" size={22} color={Colors.white} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.shareBtn}>
              <Ionicons name="share-outline" size={22} color={Colors.white} />
            </TouchableOpacity>
          </SafeAreaView>
        </View>

        {/* Profil Bilgileri */}
        <View style={styles.profilSection}>
          <View style={styles.profilRow}>
            <Image
              source={{ uri: berber.profilFoto }}
              style={styles.profilAvatar}
              contentFit="cover"
            />
            <View style={styles.profilBilgi}>
              <Text style={styles.berberAd}>{berber.dukkAn}</Text>
              <Text style={styles.berberUsta}>{berber.ad}</Text>
              <View style={styles.puanRow}>
                {[1, 2, 3, 4, 5].map((s) => (
                  <Ionicons
                    key={s}
                    name="star"
                    size={14}
                    color={s <= Math.round(berber.puan) ? Colors.gold : Colors.grayDark}
                  />
                ))}
                <Text style={styles.puanSayi}>{berber.puan}</Text>
                <Text style={styles.yorumSayi}>({berber.yorumSayisi} yorum)</Text>
              </View>
            </View>
          </View>

          {/* İstatistikler */}
          <View style={styles.statsRow}>
            <StatKutu ikon="location-outline" deger={berber.mesafe} label="Uzaklık" />
            <StatKutu ikon="time-outline" deger={`${berber.calismaSaatleri.acilis}-${berber.calismaSaatleri.kapanis}`} label="Çalışma" />
            <StatKutu ikon="checkmark-circle-outline" deger={berber.yorumSayisi + '+'} label="Müşteri" />
          </View>

          {/* Adres */}
          <TouchableOpacity style={styles.adresKutu}>
            <Ionicons name="map-outline" size={18} color={Colors.gold} />
            <Text style={styles.adresText}>{berber.adres}</Text>
            <Ionicons name="chevron-forward" size={16} color={Colors.gray} />
          </TouchableOpacity>

          {/* Açıklama */}
          <Text style={styles.aciklama}>{berber.aciklama}</Text>
        </View>

        {/* Galeri */}
        <Text style={styles.bolumBaslik}>📸 Galeri</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.galeriRow}
        >
          {berber.galeri.map((uri, i) => (
            <Image
              key={i}
              source={{ uri }}
              style={styles.galeriItem}
              contentFit="cover"
              transition={200}
            />
          ))}
        </ScrollView>

        {/* Hizmetler */}
        <Text style={styles.bolumBaslik}>✂️ Hizmetler</Text>
        <View style={styles.hizmetlerListesi}>
          {berber.hizmetler.map((hizmet, i) => (
            <TouchableOpacity
              key={i}
              style={[styles.hizmetRow, seciliHizmet?.ad === hizmet.ad && styles.hizmetRowSec]}
              onPress={() => setSeciliHizmet(hizmet)}
            >
              <View style={styles.hizmetSol}>
                {seciliHizmet?.ad === hizmet.ad ? (
                  <View style={styles.radioAktif}><View style={styles.radioDot} /></View>
                ) : (
                  <View style={styles.radio} />
                )}
                <View>
                  <Text style={styles.hizmetAd}>{hizmet.ad}</Text>
                  <Text style={styles.hizmetSure}>{hizmet.sure}</Text>
                </View>
              </View>
              <Text style={[styles.hizmetFiyat, seciliHizmet?.ad === hizmet.ad && { color: Colors.gold }]}>
                ₺{hizmet.fiyat}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Yorumlar */}
        <Text style={styles.bolumBaslik}>💬 Yorumlar</Text>
        <View style={styles.yorumlarListesi}>
          {berber.yorumlar && berber.yorumlar.map((y, i) => (
            <View key={i} style={styles.yorumKart}>
              <View style={styles.yorumUst}>
                <View style={styles.yorumAvatar}>
                  <Text style={styles.yorumAvatarText}>{y.ad[0]}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.yorumAd}>{y.ad}</Text>
                  <View style={styles.yorumPuanRow}>
                    {[1,2,3,4,5].map(s => (
                      <Ionicons key={s} name="star" size={11}
                        color={s <= y.puan ? Colors.gold : Colors.grayDark} />
                    ))}
                  </View>
                </View>
                <Text style={styles.yorumTarih}>{y.tarih}</Text>
              </View>
              <Text style={styles.yorumMetin}>{y.yorum}</Text>
            </View>
          ))}
        </View>

        <View style={{ height: 120 }} />
      </ScrollView>

      {/* Alt Buton */}
      <View style={styles.altPanel}>
        <View style={styles.fiyatBilgi}>
          <Text style={styles.altLabel}>Seçilen hizmet</Text>
          <Text style={styles.altHizmetAd}>{seciliHizmet?.ad}</Text>
          <Text style={styles.altFiyat}>₺{seciliHizmet?.fiyat}</Text>
        </View>
        <TouchableOpacity
          style={styles.randevuBtn}
          onPress={() => router.push(`/randevu/${berber.id}?hizmet=${encodeURIComponent(seciliHizmet?.ad)}&fiyat=${seciliHizmet?.fiyat}`)}
        >
          <Ionicons name="calendar" size={20} color="#0A0A0A" />
          <Text style={styles.randevuBtnText}>Randevu Al</Text>
        </TouchableOpacity>
      </View>
    </View>
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
  kapak: { height: 280, overflow: 'hidden' },
  header: {
    position: 'absolute',
    top: 0, left: 0, right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 10,
  },
  backBtn: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 20,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shareBtn: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 20,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profilSection: { padding: 20 },
  profilRow: { flexDirection: 'row', gap: 14, marginBottom: 20, alignItems: 'flex-start' },
  profilAvatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 3,
    borderColor: Colors.gold,
  },
  profilBilgi: { flex: 1, paddingTop: 4 },
  berberAd: { fontSize: 20, fontWeight: '800', color: Colors.white, marginBottom: 3 },
  berberUsta: { fontSize: 14, color: Colors.gray, marginBottom: 6 },
  puanRow: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  puanSayi: { fontSize: 13, fontWeight: '700', color: Colors.white, marginLeft: 4 },
  yorumSayi: { fontSize: 12, color: Colors.gray },
  statsRow: {
    flexDirection: 'row',
    backgroundColor: Colors.card,
    borderRadius: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    overflow: 'hidden',
  },
  stat: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 14,
    borderRightWidth: 1,
    borderRightColor: Colors.cardBorder,
    gap: 4,
  },
  statDeger: { fontSize: 13, fontWeight: '700', color: Colors.white, textAlign: 'center' },
  statLabel: { fontSize: 11, color: Colors.gray },
  adresKutu: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 14,
    gap: 10,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
  },
  adresText: { flex: 1, fontSize: 13, color: Colors.white },
  aciklama: { fontSize: 14, color: Colors.gray, lineHeight: 22 },
  bolumBaslik: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.white,
    marginHorizontal: 20,
    marginTop: 24,
    marginBottom: 12,
  },
  galeriRow: { paddingHorizontal: 20, gap: 10 },
  galeriItem: { width: 140, height: 140, borderRadius: 14 },
  yorumlarListesi: { marginHorizontal: 20, gap: 10 },
  yorumKart: {
    backgroundColor: Colors.card, borderRadius: 16, padding: 14,
    borderWidth: 1, borderColor: Colors.cardBorder, gap: 10,
  },
  yorumUst: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  yorumAvatar: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: 'rgba(201,168,76,0.2)',
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 1, borderColor: 'rgba(201,168,76,0.3)',
  },
  yorumAvatarText: { fontSize: 15, fontWeight: '800', color: Colors.gold },
  yorumAd: { fontSize: 14, fontWeight: '700', color: Colors.white },
  yorumPuanRow: { flexDirection: 'row', gap: 2, marginTop: 2 },
  yorumTarih: { fontSize: 11, color: Colors.gray },
  yorumMetin: { fontSize: 13, color: Colors.gray, lineHeight: 20 },
  hizmetlerListesi: { marginHorizontal: 20, gap: 10 },
  hizmetRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.card,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
  },
  hizmetRowSec: { borderColor: Colors.gold, backgroundColor: 'rgba(201,168,76,0.08)' },
  hizmetSol: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.grayDark,
  },
  radioAktif: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.gold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: Colors.gold },
  hizmetAd: { fontSize: 15, fontWeight: '600', color: Colors.white },
  hizmetSure: { fontSize: 12, color: Colors.gray, marginTop: 2 },
  hizmetFiyat: { fontSize: 18, fontWeight: '700', color: Colors.white },
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
    gap: 14,
  },
  fiyatBilgi: { flex: 1 },
  altLabel: { fontSize: 11, color: Colors.gray },
  altHizmetAd: { fontSize: 13, fontWeight: '600', color: Colors.white, marginTop: 2 },
  altFiyat: { fontSize: 22, fontWeight: '800', color: Colors.gold },
  randevuBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.gold,
    borderRadius: 16,
    paddingHorizontal: 24,
    paddingVertical: 14,
    gap: 8,
  },
  randevuBtnText: { fontSize: 15, fontWeight: '800', color: '#0A0A0A' },
});
