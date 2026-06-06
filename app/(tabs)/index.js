import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Dimensions,
  Animated,
  FlatList,
  Platform,
} from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../constants/colors';
import { BERBERLER } from '../../constants/mockData';

const { width } = Dimensions.get('window');

const KATEGORILER = [
  { id: 'hepsi', label: 'Hepsi', icon: 'apps' },
  { id: 'yakin', label: 'En Yakın', icon: 'location' },
  { id: 'puan', label: 'En Yüksek', icon: 'star' },
  { id: 'musait', label: 'Şimdi Müsait', icon: 'time' },
  { id: 'ucuz', label: 'Uygun Fiyat', icon: 'wallet' },
];

export default function HomeScreen() {
  const router = useRouter();
  const [aramaMetni, setAramaMetni] = useState('');
  const [aktifKategori, setAktifKategori] = useState('hepsi');
  const scrollY = useRef(new Animated.Value(0)).current;

  const filtreliBerberler = BERBERLER.filter((b) =>
    aramaMetni.length === 0 ||
    b.ad.toLowerCase().includes(aramaMetni.toLowerCase()) ||
    b.ilce.toLowerCase().includes(aramaMetni.toLowerCase())
  );

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 80],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Sticky Header Background */}
      <Animated.View style={[styles.stickyHeader, { opacity: headerOpacity }]} />

      <Animated.ScrollView
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 30 }}
      >
        {/* Hero Banner */}
        <View style={styles.hero}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=900&q=85' }}
            style={StyleSheet.absoluteFill}
            contentFit="cover"
            transition={400}
          />
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.5)', '#0A0A0A']}
            style={StyleSheet.absoluteFill}
          />
          <View style={styles.heroContent}>
            <View style={styles.logoBadge}>
              <Text style={styles.logoIcon}>💈</Text>
              <Text style={styles.logoText}>USTURA</Text>
            </View>
            <Text style={styles.heroTitle}>Yakınındaki En İyi{'\n'}Berberi Bul</Text>
            <Text style={styles.heroSub}>İstanbul genelinde 2.400+ berber</Text>
          </View>
        </View>

        {/* Arama Kutusu */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBox}>
            <Ionicons name="search" size={20} color={Colors.gray} />
            <TextInput
              style={styles.searchInput}
              placeholder="Berber veya semt ara..."
              placeholderTextColor={Colors.gray}
              value={aramaMetni}
              onChangeText={setAramaMetni}
            />
            {aramaMetni.length > 0 && (
              <TouchableOpacity onPress={() => setAramaMetni('')}>
                <Ionicons name="close-circle" size={18} color={Colors.gray} />
              </TouchableOpacity>
            )}
          </View>
          <TouchableOpacity style={styles.filterBtn}>
            <Ionicons name="options" size={22} color={Colors.gold} />
          </TouchableOpacity>
        </View>

        {/* Kategori Filtreleri */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.kategorilerRow}
        >
          {KATEGORILER.map((kat) => (
            <TouchableOpacity
              key={kat.id}
              onPress={() => setAktifKategori(kat.id)}
              style={[styles.kategoriBtn, aktifKategori === kat.id && styles.kategoriAktif]}
            >
              <Ionicons
                name={kat.icon}
                size={14}
                color={aktifKategori === kat.id ? '#0A0A0A' : Colors.gray}
              />
              <Text
                style={[styles.kategoriText, aktifKategori === kat.id && styles.kategoriTextAktif]}
              >
                {kat.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Öne Çıkan — Büyük Kart */}
        <Text style={styles.bolumBaslik}>⭐ Öne Çıkan</Text>
        <TouchableOpacity
          style={styles.buyukKart}
          onPress={() => router.push(`/berber/${BERBERLER[0].id}`)}
          activeOpacity={0.9}
        >
          <Image
            source={{ uri: BERBERLER[0].kapakFoto }}
            style={styles.buyukKartFoto}
            contentFit="cover"
            transition={300}
          />
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.85)']}
            style={styles.buyukKartGradient}
          />
          <View style={styles.buyukKartInfo}>
            <View style={styles.puanBadge}>
              <Ionicons name="star" size={12} color={Colors.gold} />
              <Text style={styles.puanText}>{BERBERLER[0].puan}</Text>
              <Text style={styles.yorumText}>({BERBERLER[0].yorumSayisi})</Text>
            </View>
            <Text style={styles.buyukKartAd}>{BERBERLER[0].dukkAn}</Text>
            <View style={styles.buyukKartAlt}>
              <View style={styles.infoSatir}>
                <Ionicons name="location" size={13} color={Colors.gold} />
                <Text style={styles.infoText}>{BERBERLER[0].ilce} • {BERBERLER[0].mesafe}</Text>
              </View>
              <View style={styles.musaitBadge}>
                <View style={styles.musaitDot} />
                <Text style={styles.musaitText}>Bugün {BERBERLER[0].bugunMusait}</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>

        {/* Tüm Berberler */}
        <Text style={styles.bolumBaslik}>💈 Tüm Berberler</Text>
        {filtreliBerberler.map((berber) => (
          <BerberKart key={berber.id} berber={berber} onPress={() => router.push(`/berber/${berber.id}`)} />
        ))}
      </Animated.ScrollView>
    </SafeAreaView>
  );
}

function BerberKart({ berber, onPress }) {
  return (
    <TouchableOpacity style={styles.kart} onPress={onPress} activeOpacity={0.88}>
      <Image
        source={{ uri: berber.kapakFoto }}
        style={styles.kartFoto}
        contentFit="cover"
        transition={200}
      />
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.7)']}
        style={styles.kartGradient}
      />
      {/* Puan */}
      <View style={styles.kartPuanBadge}>
        <Ionicons name="star" size={11} color={Colors.gold} />
        <Text style={styles.kartPuanText}>{berber.puan}</Text>
      </View>
      <View style={styles.kartBottom}>
        <View style={{ flex: 1 }}>
          <Text style={styles.kartAd}>{berber.dukkAn}</Text>
          <View style={styles.kartRow}>
            <Ionicons name="location-outline" size={12} color={Colors.gold} />
            <Text style={styles.kartIlce}>{berber.ilce} • {berber.mesafe}</Text>
          </View>
          <View style={styles.kartRow}>
            <View style={styles.musaitDotKucuk} />
            <Text style={styles.kartMusait}>Bugün {berber.bugunMusait} müsait</Text>
          </View>
        </View>
        <View style={styles.kartSagTaraf}>
          <Text style={styles.kartFiyatKutu}>₺{berber.hizmetler[0].fiyat}</Text>
          <Text style={styles.kartFiyatLabel}>başlayan</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bg },
  stickyHeader: {
    position: 'absolute',
    top: 0, left: 0, right: 0,
    height: 60,
    backgroundColor: 'rgba(10,10,10,0.95)',
    zIndex: 10,
  },
  hero: {
    height: 260,
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  heroContent: {
    padding: 20,
    paddingBottom: 24,
  },
  logoBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 6,
  },
  logoIcon: { fontSize: 20 },
  logoText: {
    fontSize: 13,
    fontWeight: '800',
    color: Colors.gold,
    letterSpacing: 4,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: Colors.white,
    lineHeight: 36,
    marginBottom: 6,
  },
  heroSub: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.65)',
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 10,
    marginTop: -20,
  },
  searchBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    gap: 10,
  },
  searchInput: {
    flex: 1,
    color: Colors.white,
    fontSize: 15,
  },
  filterBtn: {
    backgroundColor: Colors.card,
    borderRadius: 14,
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.cardBorder,
  },
  kategorilerRow: {
    paddingHorizontal: 16,
    paddingBottom: 4,
    gap: 8,
  },
  kategoriBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
    gap: 5,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
  },
  kategoriAktif: {
    backgroundColor: Colors.gold,
    borderColor: Colors.gold,
  },
  kategoriText: { fontSize: 12, color: Colors.gray, fontWeight: '600' },
  kategoriTextAktif: { color: '#0A0A0A' },
  bolumBaslik: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.white,
    marginHorizontal: 16,
    marginTop: 24,
    marginBottom: 12,
  },
  buyukKart: {
    marginHorizontal: 16,
    borderRadius: 20,
    overflow: 'hidden',
    height: 220,
  },
  buyukKartFoto: { ...StyleSheet.absoluteFillObject },
  buyukKartGradient: { ...StyleSheet.absoluteFillObject },
  buyukKartInfo: {
    position: 'absolute',
    bottom: 0, left: 0, right: 0,
    padding: 18,
  },
  puanBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 6,
  },
  puanText: { fontSize: 13, fontWeight: '700', color: Colors.white },
  yorumText: { fontSize: 12, color: 'rgba(255,255,255,0.6)' },
  buyukKartAd: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.white,
    marginBottom: 8,
  },
  buyukKartAlt: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  infoSatir: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  infoText: { fontSize: 13, color: 'rgba(255,255,255,0.8)' },
  musaitBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(56,161,105,0.25)',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 4,
    gap: 5,
  },
  musaitDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: Colors.green,
  },
  musaitDotKucuk: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.green,
  },
  musaitText: { fontSize: 12, color: Colors.green, fontWeight: '600' },
  kart: {
    marginHorizontal: 16,
    marginBottom: 14,
    borderRadius: 18,
    overflow: 'hidden',
    height: 170,
    backgroundColor: Colors.card,
  },
  kartFoto: { ...StyleSheet.absoluteFillObject },
  kartGradient: { ...StyleSheet.absoluteFillObject },
  kartPuanBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.65)',
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 4,
    gap: 3,
  },
  kartPuanText: { fontSize: 12, fontWeight: '700', color: Colors.white },
  kartBottom: {
    position: 'absolute',
    bottom: 0, left: 0, right: 0,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  kartAd: { fontSize: 17, fontWeight: '700', color: Colors.white, marginBottom: 5 },
  kartRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: 3 },
  kartIlce: { fontSize: 12, color: 'rgba(255,255,255,0.75)' },
  kartMusait: { fontSize: 12, color: Colors.green, fontWeight: '500' },
  kartSagTaraf: { alignItems: 'flex-end' },
  kartFiyatKutu: { fontSize: 20, fontWeight: '800', color: Colors.gold },
  kartFiyatLabel: { fontSize: 11, color: Colors.gray },
});
