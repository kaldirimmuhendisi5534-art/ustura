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
import { BERBERLER, PROMOSYONLAR, KATEGORILER } from '../../constants/mockData';

const { width } = Dimensions.get('window');
const HERO_H = 340;

export default function HomeScreen() {
  const router = useRouter();
  const scrollY = useRef(new Animated.Value(0)).current;
  const [aktifKategori, setAktifKategori] = useState('hepsi');
  const [aramaMetni, setAramaMetni] = useState('');

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, HERO_H - 80],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const filtreliBerberler = BERBERLER.filter((b) => {
    const aramaUyuyor =
      aramaMetni === '' ||
      b.ad.toLowerCase().includes(aramaMetni.toLowerCase()) ||
      b.dukkAn.toLowerCase().includes(aramaMetni.toLowerCase()) ||
      b.ilce.toLowerCase().includes(aramaMetni.toLowerCase());
    if (!aramaUyuyor) return false;
    if (aktifKategori === 'yakin') return parseFloat(b.mesafe) < 2;
    if (aktifKategori === 'puan') return b.puan >= 4.8;
    if (aktifKategori === 'ucuz') return b.hizmetler[0].fiyat <= 150;
    return true;
  });

  return (
    <View style={styles.container}>
      {/* Sticky Header (görünür sadece scroll sonrası) */}
      <Animated.View style={[styles.stickyHeader, { opacity: headerOpacity }]}>
        <SafeAreaView edges={['top']}>
          <View style={styles.stickyInner}>
            <Text style={styles.stickyLogo}>USTURA</Text>
            <TouchableOpacity style={styles.stickyNotif}>
              <Ionicons name="notifications-outline" size={22} color={Colors.white} />
              <View style={styles.notifDot} />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Animated.View>

      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
      >
        {/* ── HERO ─────────────────────────────────────── */}
        <View style={styles.hero}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=1200&q=90' }}
            style={StyleSheet.absoluteFill}
            contentFit="cover"
            transition={400}
          />
          <LinearGradient
            colors={['rgba(10,10,10,0.55)', 'transparent', 'rgba(10,10,10,0.95)', Colors.bg]}
            locations={[0, 0.3, 0.7, 1]}
            style={StyleSheet.absoluteFill}
          />
          <SafeAreaView edges={['top']} style={styles.heroTop}>
            <View style={styles.heroBrand}>
              <Text style={styles.heroLogo}>USTURA</Text>
              <Text style={styles.heroTagline}>İstanbul'un Ustalarına Git</Text>
            </View>
            <TouchableOpacity style={styles.notifBtn}>
              <Ionicons name="notifications-outline" size={22} color={Colors.white} />
              <View style={styles.notifDot} />
            </TouchableOpacity>
          </SafeAreaView>

          {/* Loyalty mini bar */}
          <View style={styles.loyaltyBar}>
            <View style={styles.loyaltyLeft}>
              <Ionicons name="trophy-outline" size={16} color={Colors.gold} />
              <Text style={styles.loyaltyText}>1.240 Puan</Text>
            </View>
            <View style={styles.loyaltyRight}>
              <Text style={styles.loyaltyLevel}>Gold Üye</Text>
              <View style={styles.loyaltyProgress}>
                <View style={[styles.loyaltyBar2, { width: '62%' }]} />
              </View>
              <Text style={styles.loyaltyNext}>Platinum'a 760 puan</Text>
            </View>
          </View>

          {/* Arama */}
          <View style={styles.aramaKutu}>
            <Ionicons name="search" size={18} color={Colors.gray} />
            <TextInput
              style={styles.aramaInput}
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
        </View>

        {/* ── KATEGORİLER ──────────────────────────────── */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.kategoriRow}
        >
          {KATEGORILER.map((k) => (
            <TouchableOpacity
              key={k.id}
              style={[styles.kategoriBtn, aktifKategori === k.id && styles.kategoriBtnAktif]}
              onPress={() => setAktifKategori(k.id)}
            >
              <Ionicons
                name={k.ikon}
                size={14}
                color={aktifKategori === k.id ? '#0A0A0A' : Colors.gray}
              />
              <Text style={[styles.kategoriBtnText, aktifKategori === k.id && styles.kategoriBtnTextAktif]}>
                {k.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* ── PROMOSYON BANNER ─────────────────────────── */}
        {aramaMetni === '' && (
          <>
            <View style={styles.bolumBaslikRow}>
              <Text style={styles.bolumBaslik}>Fırsatlar</Text>
              <TouchableOpacity>
                <Text style={styles.hepsiniGor}>Tümü</Text>
              </TouchableOpacity>
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.promoRow}
              pagingEnabled={false}
              decelerationRate="fast"
              snapToInterval={width * 0.78 + 12}
            >
              {PROMOSYONLAR.map((p) => (
                <TouchableOpacity key={p.id} activeOpacity={0.85}>
                  <LinearGradient
                    colors={p.renk}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.promoKart}
                  >
                    <View style={styles.promoIkon}>
                      <Ionicons name={p.ikon} size={24} color={Colors.gold} />
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.promoBaslik}>{p.baslik}</Text>
                      <Text style={styles.promoAltBaslik}>{p.altBaslik}</Text>
                      <Text style={styles.promoAciklama}>{p.aciklama}</Text>
                    </View>
                    <Ionicons name="arrow-forward" size={18} color="rgba(255,255,255,0.5)" />
                  </LinearGradient>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </>
        )}

        {/* ── ÖNERILEN BERBER (büyük kart) ─────────────── */}
        {aramaMetni === '' && aktifKategori === 'hepsi' && (
          <>
            <View style={styles.bolumBaslikRow}>
              <Text style={styles.bolumBaslik}>Öne Çıkan</Text>
              <View style={styles.badgeYeni}>
                <Text style={styles.badgeYeniText}>4.9</Text>
                <Ionicons name="star" size={10} color={Colors.gold} />
              </View>
            </View>
            <TouchableOpacity
              style={styles.önecikaKart}
              activeOpacity={0.92}
              onPress={() => router.push(`/berber/${BERBERLER[0].id}`)}
            >
              <Image
                source={{ uri: BERBERLER[0].kapakFoto }}
                style={styles.önecikaFoto}
                contentFit="cover"
                transition={300}
              />
              <LinearGradient
                colors={['transparent', 'rgba(10,10,10,0.9)']}
                style={styles.önecikaGradient}
              />
              <View style={styles.önecikaInfo}>
                <View style={styles.önecikaTop}>
                  <View style={styles.badgeCanlı}>
                    <View style={styles.canlıDot} />
                    <Text style={styles.canlıText}>Şimdi Açık</Text>
                  </View>
                </View>
                <Text style={styles.önecikaAd}>{BERBERLER[0].dukkAn}</Text>
                <View style={styles.önecikaAlt}>
                  <View style={styles.önecikaMetaRow}>
                    <Ionicons name="location" size={12} color={Colors.gold} />
                    <Text style={styles.önecikaMeta}>{BERBERLER[0].ilce} · {BERBERLER[0].mesafe}</Text>
                  </View>
                  <View style={styles.puanBadge}>
                    <Ionicons name="star" size={12} color={Colors.gold} />
                    <Text style={styles.puanBadgeText}>{BERBERLER[0].puan}</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          </>
        )}

        {/* ── BERBER LİSTESİ ───────────────────────────── */}
        <View style={styles.bolumBaslikRow}>
          <Text style={styles.bolumBaslik}>
            {aramaMetni ? `"${aramaMetni}" Sonuçları` : aktifKategori === 'hepsi' ? 'Tüm Berberler' : KATEGORILER.find(k => k.id === aktifKategori)?.label}
          </Text>
          <Text style={styles.sonucSayisi}>{filtreliBerberler.length} berber</Text>
        </View>

        {filtreliBerberler.length === 0 ? (
          <View style={styles.bosEkran}>
            <Ionicons name="search-outline" size={48} color={Colors.grayDark} />
            <Text style={styles.bosText}>Berber bulunamadı</Text>
            <Text style={styles.bosAlt}>Farklı bir arama deneyin</Text>
          </View>
        ) : (
          <View style={styles.berberListesi}>
            {filtreliBerberler.map((berber) => (
              <BerberKart
                key={berber.id}
                berber={berber}
                onPress={() => router.push(`/berber/${berber.id}`)}
              />
            ))}
          </View>
        )}

        <View style={{ height: 100 }} />
      </Animated.ScrollView>
    </View>
  );
}

function BerberKart({ berber, onPress }) {
  const minFiyat = Math.min(...berber.hizmetler.map((h) => h.fiyat));
  return (
    <TouchableOpacity style={styles.berberKart} onPress={onPress} activeOpacity={0.88}>
      <Image
        source={{ uri: berber.kapakFoto }}
        style={styles.berberFoto}
        contentFit="cover"
        transition={250}
      />
      <LinearGradient
        colors={['transparent', 'rgba(10,10,10,0.75)']}
        style={styles.berberFotoGradient}
      />
      {/* Açık rozet */}
      <View style={styles.berberAcikBadge}>
        <View style={styles.canlıDot} />
        <Text style={styles.berberAcikText}>Açık</Text>
      </View>
      <View style={styles.berberBilgi}>
        <View style={{ flex: 1 }}>
          <Text style={styles.berberAd} numberOfLines={1}>{berber.dukkAn}</Text>
          <View style={styles.berberMetaRow}>
            <Ionicons name="location-outline" size={11} color={Colors.gold} />
            <Text style={styles.berberMeta}>{berber.ilce} · {berber.mesafe}</Text>
          </View>
          {/* Özellik etiketleri */}
          <View style={styles.etiketRow}>
            {berber.ozellikler.slice(0, 2).map((e, i) => (
              <View key={i} style={styles.etiket}>
                <Text style={styles.etiketText}>{e}</Text>
              </View>
            ))}
          </View>
        </View>
        <View style={styles.berberSag}>
          <View style={styles.puanRow}>
            <Ionicons name="star" size={13} color={Colors.gold} />
            <Text style={styles.puanText}>{berber.puan}</Text>
          </View>
          <Text style={styles.yorumSayi}>({berber.yorumSayisi})</Text>
          <Text style={styles.fiyatFrom}>₺{minFiyat}'den</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bg },

  // Sticky header
  stickyHeader: {
    position: 'absolute',
    top: 0, left: 0, right: 0,
    zIndex: 100,
    backgroundColor: Colors.bg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.cardBorder,
  },
  stickyInner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  stickyLogo: { fontSize: 22, fontWeight: '900', color: Colors.gold, letterSpacing: 4 },
  stickyNotif: { position: 'relative' },

  // Hero
  hero: { height: HERO_H, justifyContent: 'flex-end' },
  heroTop: {
    position: 'absolute',
    top: 0, left: 0, right: 0,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 8,
  },
  heroBrand: {},
  heroLogo: { fontSize: 28, fontWeight: '900', color: Colors.white, letterSpacing: 5 },
  heroTagline: { fontSize: 12, color: 'rgba(255,255,255,0.65)', letterSpacing: 1, marginTop: 2 },
  notifBtn: { position: 'relative', padding: 8 },
  notifDot: {
    position: 'absolute',
    top: 8, right: 8,
    width: 8, height: 8,
    borderRadius: 4,
    backgroundColor: Colors.gold,
    borderWidth: 1.5,
    borderColor: Colors.bg,
  },

  // Loyalty bar
  loyaltyBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(201,168,76,0.12)',
    marginHorizontal: 16,
    borderRadius: 14,
    padding: 12,
    gap: 12,
    borderWidth: 1,
    borderColor: 'rgba(201,168,76,0.25)',
    marginBottom: 12,
  },
  loyaltyLeft: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  loyaltyText: { fontSize: 14, fontWeight: '700', color: Colors.gold },
  loyaltyRight: { flex: 1 },
  loyaltyLevel: { fontSize: 11, color: Colors.gold, fontWeight: '700', marginBottom: 4 },
  loyaltyProgress: {
    height: 4,
    backgroundColor: 'rgba(201,168,76,0.2)',
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: 3,
  },
  loyaltyBar2: { height: 4, backgroundColor: Colors.gold, borderRadius: 2 },
  loyaltyNext: { fontSize: 10, color: Colors.gray },

  // Arama
  aramaKutu: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    marginHorizontal: 16,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 13,
    gap: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
    marginBottom: 4,
  },
  aramaInput: { flex: 1, fontSize: 15, color: Colors.white },

  // Kategori
  kategoriRow: { paddingHorizontal: 16, paddingVertical: 14, gap: 8 },
  kategoriBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
    gap: 6,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
  },
  kategoriBtnAktif: { backgroundColor: Colors.gold, borderColor: Colors.gold },
  kategoriBtnText: { fontSize: 13, fontWeight: '600', color: Colors.gray },
  kategoriBtnTextAktif: { color: '#0A0A0A' },

  // Bölüm başlık
  bolumBaslikRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 10,
    marginTop: 4,
  },
  bolumBaslik: { fontSize: 19, fontWeight: '800', color: Colors.white },
  hepsiniGor: { fontSize: 13, color: Colors.gold, fontWeight: '600' },
  sonucSayisi: { fontSize: 13, color: Colors.gray },
  badgeYeni: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(201,168,76,0.15)',
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 4,
    gap: 3,
  },
  badgeYeniText: { fontSize: 12, fontWeight: '700', color: Colors.gold },

  // Promo
  promoRow: { paddingHorizontal: 16, gap: 12, paddingBottom: 4 },
  promoKart: {
    width: width * 0.78,
    borderRadius: 18,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  promoIkon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(0,0,0,0.25)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  promoBaslik: { fontSize: 12, color: 'rgba(255,255,255,0.7)', fontWeight: '600' },
  promoAltBaslik: { fontSize: 20, fontWeight: '900', color: Colors.white, marginVertical: 2 },
  promoAciklama: { fontSize: 11, color: 'rgba(255,255,255,0.6)' },

  // Öne çıkan kart
  önecikaKart: {
    marginHorizontal: 16,
    marginBottom: 20,
    borderRadius: 22,
    overflow: 'hidden',
    height: 200,
  },
  önecikaFoto: { ...StyleSheet.absoluteFillObject },
  önecikaGradient: { ...StyleSheet.absoluteFillObject },
  önecikaInfo: {
    position: 'absolute',
    bottom: 0, left: 0, right: 0,
    padding: 16,
  },
  önecikaTop: { flexDirection: 'row', marginBottom: 6 },
  badgeCanlı: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(56,161,105,0.25)',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    gap: 5,
    borderWidth: 1,
    borderColor: 'rgba(56,161,105,0.4)',
  },
  canlıDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: Colors.green },
  canlıText: { fontSize: 11, color: Colors.green, fontWeight: '700' },
  önecikaAd: { fontSize: 22, fontWeight: '800', color: Colors.white, marginBottom: 6 },
  önecikaAlt: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  önecikaMetaRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  önecikaMeta: { fontSize: 13, color: 'rgba(255,255,255,0.75)' },
  puanBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(201,168,76,0.2)',
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 4,
    gap: 4,
  },
  puanBadgeText: { fontSize: 13, fontWeight: '800', color: Colors.gold },

  // Berber listesi
  berberListesi: { paddingHorizontal: 16, gap: 14 },
  berberKart: {
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: Colors.card,
    height: 190,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
  },
  berberFoto: { ...StyleSheet.absoluteFillObject },
  berberFotoGradient: { ...StyleSheet.absoluteFillObject },
  berberAcikBadge: {
    position: 'absolute',
    top: 12, left: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.55)',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    gap: 5,
  },
  berberAcikText: { fontSize: 11, color: Colors.green, fontWeight: '700' },
  berberBilgi: {
    position: 'absolute',
    bottom: 0, left: 0, right: 0,
    flexDirection: 'row',
    padding: 14,
    gap: 8,
  },
  berberAd: { fontSize: 16, fontWeight: '800', color: Colors.white, marginBottom: 3 },
  berberMetaRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: 6 },
  berberMeta: { fontSize: 12, color: 'rgba(255,255,255,0.7)' },
  etiketRow: { flexDirection: 'row', gap: 6 },
  etiket: {
    backgroundColor: 'rgba(201,168,76,0.2)',
    borderRadius: 6,
    paddingHorizontal: 7,
    paddingVertical: 3,
  },
  etiketText: { fontSize: 10, color: Colors.gold, fontWeight: '600' },
  berberSag: { alignItems: 'flex-end', justifyContent: 'flex-end', gap: 2 },
  puanRow: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  puanText: { fontSize: 14, fontWeight: '800', color: Colors.gold },
  yorumSayi: { fontSize: 11, color: 'rgba(255,255,255,0.5)' },
  fiyatFrom: { fontSize: 14, fontWeight: '700', color: Colors.white, marginTop: 4 },

  // Boş durum
  bosEkran: { alignItems: 'center', padding: 60, gap: 10 },
  bosText: { fontSize: 17, fontWeight: '700', color: Colors.gray },
  bosAlt: { fontSize: 13, color: Colors.grayDark },
});
