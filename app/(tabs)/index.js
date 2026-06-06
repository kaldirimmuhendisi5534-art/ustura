import React, { useState, useRef } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, TextInput, Dimensions, Animated,
} from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../constants/colors';
import { BERBERLER, PROMOSYONLAR, KATEGORILER } from '../../constants/mockData';
import { useLang } from '../../context/LanguageContext';

const { width } = Dimensions.get('window');
const HERO_H = 380;

export default function HomeScreen() {
  const router = useRouter();
  const { lang, setLang, t, isRTL, LANGUAGES } = useLang();
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

  // Kategori etiketleri çeviri anahtarları
  const katLabel = { hepsi: t('cat_all'), yakin: t('cat_near'), puan: t('cat_top'), ucuz: t('cat_cheap') };

  return (
    <View style={styles.container}>
      {/* ── Sticky header ─────────────────────────── */}
      <Animated.View style={[styles.stickyHeader, { opacity: headerOpacity }]}>
        <SafeAreaView edges={['top']}>
          <View style={styles.stickyInner}>
            <Text style={styles.stickyLogo}>USTURA</Text>
            <View style={styles.stickyRight}>
              {/* Dil seçici — compact */}
              <View style={styles.langRowSmall}>
                {LANGUAGES.map((l) => (
                  <TouchableOpacity
                    key={l.code}
                    onPress={() => setLang(l.code)}
                    style={[styles.langPillSmall, lang === l.code && styles.langPillSmallActive]}
                  >
                    <Text style={styles.langFlagSmall}>{l.flag}</Text>
                  </TouchableOpacity>
                ))}
              </View>
              <TouchableOpacity style={styles.notifBtn}>
                <Ionicons name="notifications-outline" size={22} color={Colors.white} />
                <View style={styles.notifDot} />
              </TouchableOpacity>
            </View>
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
        {/* ── HERO ──────────────────────────────────── */}
        <View style={styles.hero}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=1200&q=90' }}
            style={StyleSheet.absoluteFill}
            contentFit="cover"
            transition={400}
          />
          <LinearGradient
            colors={['rgba(10,10,10,0.65)', 'transparent', 'rgba(10,10,10,0.95)', Colors.bg]}
            locations={[0, 0.3, 0.7, 1]}
            style={StyleSheet.absoluteFill}
          />

          {/* ── DİL SEÇİCİ — Hero içinde, her zaman görünür ── */}
          <SafeAreaView edges={['top']} style={styles.heroTop}>
            <View style={[styles.heroBrand, isRTL && { alignItems: 'flex-end' }]}>
              <Text style={styles.heroLogo}>USTURA</Text>

              {/* 3 dil bayrağı — ana giriş seçici */}
              <View style={styles.langRow}>
                {LANGUAGES.map((l) => (
                  <TouchableOpacity
                    key={l.code}
                    style={[
                      styles.langPill,
                      lang === l.code && styles.langPillActive,
                    ]}
                    onPress={() => setLang(l.code)}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.langFlag}>{l.flag}</Text>
                    <Text style={[styles.langLabel, lang === l.code && styles.langLabelActive]}>
                      {l.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <TouchableOpacity style={styles.notifBtn2}>
              <Ionicons name="notifications-outline" size={22} color={Colors.white} />
              <View style={styles.notifDot} />
            </TouchableOpacity>
          </SafeAreaView>

          {/* Loyalty mini bar */}
          <View style={[styles.loyaltyBar, isRTL && { flexDirection: 'row-reverse' }]}>
            <View style={[styles.loyaltyLeft, isRTL && { flexDirection: 'row-reverse' }]}>
              <Ionicons name="trophy-outline" size={16} color={Colors.gold} />
              <Text style={styles.loyaltyText}>1.240 {t('loyalty_points')}</Text>
            </View>
            <View style={[styles.loyaltyRight, isRTL && { alignItems: 'flex-start' }]}>
              <Text style={[styles.loyaltyLevel, isRTL && { textAlign: 'right' }]}>
                {t('loyalty_gold')}
              </Text>
              <View style={styles.loyaltyProgress}>
                <View style={[styles.loyaltyBar2, { width: '62%' }]} />
              </View>
            </View>
          </View>

          {/* Arama */}
          <View style={[styles.aramaKutu, isRTL && { flexDirection: 'row-reverse' }]}>
            <Ionicons name="search" size={18} color={Colors.gray} />
            <TextInput
              style={[styles.aramaInput, isRTL && { textAlign: 'right' }]}
              placeholder={t('search_ph')}
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

        {/* ── KATEGORİLER ───────────────────────────── */}
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
                {katLabel[k.id] ?? k.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* ── PROMOSYON BANNER ──────────────────────── */}
        {aramaMetni === '' && (
          <>
            <View style={[styles.bolumBaslikRow, isRTL && { flexDirection: 'row-reverse' }]}>
              <Text style={[styles.bolumBaslik, isRTL && { textAlign: 'right' }]}>
                {t('promo_title')}
              </Text>
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.promoRow}
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

        {/* ── ÖNE ÇIKAN ─────────────────────────────── */}
        {aramaMetni === '' && aktifKategori === 'hepsi' && (
          <>
            <View style={[styles.bolumBaslikRow, isRTL && { flexDirection: 'row-reverse' }]}>
              <Text style={[styles.bolumBaslik, isRTL && { textAlign: 'right' }]}>
                {t('featured')}
              </Text>
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
                    <Text style={styles.canlıText}>{t('open_badge')}</Text>
                  </View>
                </View>
                <Text style={styles.önecikaAd}>{BERBERLER[0].dukkAn}</Text>
                <View style={[styles.önecikaAlt, isRTL && { flexDirection: 'row-reverse' }]}>
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

        {/* ── BERBER LİSTESİ ────────────────────────── */}
        <View style={[styles.bolumBaslikRow, isRTL && { flexDirection: 'row-reverse' }]}>
          <Text style={[styles.bolumBaslik, isRTL && { textAlign: 'right' }]}>
            {t('nearby_barbers')}
          </Text>
          <Text style={styles.sonucSayisi}>{filtreliBerberler.length} {t('results')}</Text>
        </View>

        {filtreliBerberler.length === 0 ? (
          <View style={styles.bosEkran}>
            <Ionicons name="search-outline" size={48} color={Colors.grayDark} />
            <Text style={styles.bosText}>—</Text>
          </View>
        ) : (
          <View style={styles.berberListesi}>
            {filtreliBerberler.map((berber) => (
              <BerberKart
                key={berber.id}
                berber={berber}
                isRTL={isRTL}
                bookLabel={t('book_now')}
                openLabel={t('open_badge')}
                fromLabel={t('from_price')}
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

function BerberKart({ berber, isRTL, bookLabel, openLabel, fromLabel, onPress }) {
  const minFiyat = Math.min(...berber.hizmetler.map((h) => h.fiyat));
  return (
    <TouchableOpacity style={styles.berberKart} onPress={onPress} activeOpacity={0.88}>
      <Image
        source={{ uri: berber.kapakFoto }}
        style={styles.berberFoto}
        contentFit="cover"
        transition={200}
      />
      <LinearGradient
        colors={['transparent', 'rgba(10,10,10,0.85)']}
        style={StyleSheet.absoluteFill}
      />

      {/* Açık rozet */}
      <View style={styles.acikBadge}>
        <View style={styles.acikDot} />
        <Text style={styles.acikText}>{openLabel}</Text>
      </View>

      {/* Puan */}
      <View style={styles.puanBadgeKart}>
        <Ionicons name="star" size={11} color={Colors.gold} />
        <Text style={styles.puanBadgeKartText}>{berber.puan}</Text>
      </View>

      {/* Alt bilgi */}
      <View style={[styles.berberKartAlt, isRTL && { alignItems: 'flex-end' }]}>
        <Text style={[styles.berberKartAd, isRTL && { textAlign: 'right' }]} numberOfLines={1}>
          {berber.dukkAn}
        </Text>
        <View style={[styles.berberKartMeta, isRTL && { flexDirection: 'row-reverse' }]}>
          <Ionicons name="location-outline" size={11} color={Colors.gold} />
          <Text style={styles.berberKartMetaText}>{berber.ilce} · {berber.mesafe}</Text>
        </View>
        {/* Özellik etiketleri */}
        <View style={[styles.ozellikRow, isRTL && { flexDirection: 'row-reverse' }]}>
          {berber.ozellikler.slice(0, 2).map((oz, i) => (
            <View key={i} style={styles.ozellikTag}>
              <Text style={styles.ozellikText}>{oz}</Text>
            </View>
          ))}
        </View>
        <View style={[styles.berberKartAltRow, isRTL && { flexDirection: 'row-reverse' }]}>
          <Text style={styles.berberKartFiyat}>
            {fromLabel} ₺{minFiyat}
          </Text>
          <View style={styles.randevuBtn}>
            <Text style={styles.randevuBtnText}>{bookLabel}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bg },

  // Sticky header
  stickyHeader: {
    position: 'absolute', top: 0, left: 0, right: 0, zIndex: 100,
    backgroundColor: 'rgba(10,10,10,0.96)',
    borderBottomWidth: 1, borderBottomColor: Colors.cardBorder,
  },
  stickyInner: {
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20, paddingVertical: 10,
  },
  stickyLogo: { fontSize: 20, fontWeight: '900', color: Colors.gold, letterSpacing: 3 },
  stickyRight: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  langRowSmall: { flexDirection: 'row', gap: 4 },
  langPillSmall: {
    width: 28, height: 28, borderRadius: 14,
    alignItems: 'center', justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.06)',
  },
  langPillSmallActive: { backgroundColor: 'rgba(201,168,76,0.2)', borderWidth: 1, borderColor: Colors.gold },
  langFlagSmall: { fontSize: 16 },

  // Hero
  hero: { height: HERO_H, justifyContent: 'flex-end', overflow: 'hidden' },
  heroTop: {
    position: 'absolute', top: 0, left: 0, right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 18,
    paddingBottom: 8,
  },
  heroBrand: { flex: 1 },
  heroLogo: {
    fontSize: 26, fontWeight: '900', color: Colors.gold,
    letterSpacing: 4, marginBottom: 10,
  },

  // ── Dil Seçici ──────────────────────────────────
  langRow: { flexDirection: 'row', gap: 8 },
  langPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.45)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
  },
  langPillActive: {
    backgroundColor: 'rgba(201,168,76,0.22)',
    borderColor: Colors.gold,
  },
  langFlag: { fontSize: 18 },
  langLabel: { fontSize: 11, fontWeight: '600', color: 'rgba(255,255,255,0.65)' },
  langLabelActive: { color: Colors.gold },
  // ────────────────────────────────────────────────

  notifBtn2: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center', justifyContent: 'center',
    marginLeft: 8,
  },
  notifBtn: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center', justifyContent: 'center',
  },
  notifDot: {
    position: 'absolute', top: 8, right: 8,
    width: 8, height: 8, borderRadius: 4,
    backgroundColor: Colors.gold,
    borderWidth: 1.5, borderColor: '#0A0A0A',
  },

  // Loyalty
  loyaltyBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 18,
    marginBottom: 10,
    backgroundColor: 'rgba(201,168,76,0.1)',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: 'rgba(201,168,76,0.2)',
  },
  loyaltyLeft: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  loyaltyText: { fontSize: 13, fontWeight: '700', color: Colors.gold },
  loyaltyRight: { alignItems: 'flex-end', gap: 4 },
  loyaltyLevel: { fontSize: 11, fontWeight: '700', color: Colors.white },
  loyaltyProgress: {
    width: 80, height: 4, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 2,
  },
  loyaltyBar2: { height: '100%', backgroundColor: Colors.gold, borderRadius: 2 },

  // Arama
  aramaKutu: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    marginHorizontal: 18, marginBottom: 0,
    backgroundColor: 'rgba(10,10,10,0.85)',
    borderRadius: 16, paddingHorizontal: 16, paddingVertical: 13,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)',
  },
  aramaInput: { flex: 1, fontSize: 14, color: Colors.white },

  // Kategoriler
  kategoriRow: { paddingHorizontal: 18, gap: 8, paddingVertical: 14 },
  kategoriBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    paddingHorizontal: 14, paddingVertical: 8,
    borderRadius: 20, backgroundColor: Colors.card,
    borderWidth: 1, borderColor: Colors.cardBorder,
  },
  kategoriBtnAktif: { backgroundColor: Colors.gold, borderColor: Colors.gold },
  kategoriBtnText: { fontSize: 13, fontWeight: '600', color: Colors.gray },
  kategoriBtnTextAktif: { color: '#0A0A0A' },

  // Bölüm başlığı
  bolumBaslikRow: {
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18, marginBottom: 12,
  },
  bolumBaslik: { fontSize: 17, fontWeight: '800', color: Colors.white },
  sonucSayisi: { fontSize: 12, color: Colors.gray },
  badgeYeni: {
    flexDirection: 'row', alignItems: 'center', gap: 3,
    backgroundColor: 'rgba(201,168,76,0.15)',
    paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20,
  },
  badgeYeniText: { fontSize: 12, fontWeight: '700', color: Colors.gold },

  // Promo
  promoRow: { paddingHorizontal: 18, gap: 12 },
  promoKart: {
    width: width * 0.78,
    borderRadius: 18, padding: 18,
    flexDirection: 'row', alignItems: 'center', gap: 14,
    marginBottom: 18,
  },
  promoIkon: {
    width: 48, height: 48, borderRadius: 24,
    backgroundColor: 'rgba(201,168,76,0.12)',
    alignItems: 'center', justifyContent: 'center',
  },
  promoBaslik: { fontSize: 15, fontWeight: '800', color: Colors.white },
  promoAltBaslik: { fontSize: 13, fontWeight: '700', color: Colors.gold, marginVertical: 2 },
  promoAciklama: { fontSize: 11, color: 'rgba(255,255,255,0.6)' },

  // Öne çıkan
  önecikaKart: {
    marginHorizontal: 18, borderRadius: 20,
    height: 220, overflow: 'hidden',
    marginBottom: 20,
  },
  önecikaFoto: { ...StyleSheet.absoluteFillObject },
  önecikaGradient: { ...StyleSheet.absoluteFillObject },
  önecikaInfo: {
    position: 'absolute', bottom: 0, left: 0, right: 0, padding: 16,
  },
  önecikaTop: { flexDirection: 'row', marginBottom: 8 },
  önecikaAd: { fontSize: 20, fontWeight: '800', color: Colors.white, marginBottom: 8 },
  önecikaAlt: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
  },
  önecikaMetaRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  önecikaMeta: { fontSize: 12, color: 'rgba(255,255,255,0.75)' },
  puanBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    backgroundColor: 'rgba(201,168,76,0.2)',
    paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12,
  },
  puanBadgeText: { fontSize: 12, fontWeight: '700', color: Colors.gold },
  badgeCanlı: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    backgroundColor: 'rgba(56,161,105,0.2)',
    paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12,
  },
  canlıDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: Colors.green },
  canlıText: { fontSize: 11, fontWeight: '700', color: Colors.green },

  // Berber listesi
  berberListesi: { gap: 14, paddingHorizontal: 18, marginBottom: 10 },
  bosEkran: { alignItems: 'center', paddingVertical: 60, gap: 12 },
  bosText: { fontSize: 28, color: Colors.grayDark },

  // Berber kartı
  berberKart: {
    borderRadius: 18, height: 230, overflow: 'hidden',
    backgroundColor: Colors.card,
  },
  berberFoto: { ...StyleSheet.absoluteFillObject },
  acikBadge: {
    position: 'absolute', top: 12, left: 12,
    flexDirection: 'row', alignItems: 'center', gap: 5,
    backgroundColor: 'rgba(56,161,105,0.2)',
    paddingHorizontal: 8, paddingVertical: 4, borderRadius: 10,
  },
  acikDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: Colors.green },
  acikText: { fontSize: 10, fontWeight: '700', color: Colors.green },
  puanBadgeKart: {
    position: 'absolute', top: 12, right: 12,
    flexDirection: 'row', alignItems: 'center', gap: 4,
    backgroundColor: 'rgba(10,10,10,0.7)',
    paddingHorizontal: 8, paddingVertical: 4, borderRadius: 10,
  },
  puanBadgeKartText: { fontSize: 12, fontWeight: '700', color: Colors.gold },
  berberKartAlt: {
    position: 'absolute', bottom: 0, left: 0, right: 0, padding: 14,
  },
  berberKartAd: { fontSize: 16, fontWeight: '800', color: Colors.white, marginBottom: 4 },
  berberKartMeta: { flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: 8 },
  berberKartMetaText: { fontSize: 11, color: 'rgba(255,255,255,0.65)' },
  ozellikRow: { flexDirection: 'row', gap: 6, marginBottom: 10, flexWrap: 'wrap' },
  ozellikTag: {
    backgroundColor: 'rgba(201,168,76,0.12)',
    borderRadius: 8, paddingHorizontal: 8, paddingVertical: 3,
    borderWidth: 1, borderColor: 'rgba(201,168,76,0.2)',
  },
  ozellikText: { fontSize: 10, color: Colors.gold, fontWeight: '600' },
  berberKartAltRow: {
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between',
  },
  berberKartFiyat: { fontSize: 13, fontWeight: '700', color: Colors.white },
  randevuBtn: {
    backgroundColor: Colors.gold, borderRadius: 12,
    paddingHorizontal: 14, paddingVertical: 7,
  },
  randevuBtnText: { fontSize: 12, fontWeight: '800', color: '#0A0A0A' },
});
