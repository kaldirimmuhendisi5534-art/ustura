import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Colors } from '../../constants/colors';
import { BERBERLER } from '../../constants/mockData';

const { width } = Dimensions.get('window');

export default function HaritaScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.baslik}>
        <Text style={styles.baslikText}>📍 Haritada Bul</Text>
        <TouchableOpacity style={styles.konumBtn}>
          <Ionicons name="locate" size={18} color={Colors.gold} />
          <Text style={styles.konumText}>Konumumu Kullan</Text>
        </TouchableOpacity>
      </View>

      {/* Harita Placeholder */}
      <View style={styles.haritaKutu}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=900&q=80' }}
          style={StyleSheet.absoluteFill}
          contentFit="cover"
          transition={300}
        />
        <LinearGradient
          colors={['transparent', 'rgba(10,10,10,0.6)']}
          style={StyleSheet.absoluteFill}
        />
        {/* Berber İşaretçileri */}
        {BERBERLER.slice(0, 3).map((b, i) => (
          <View
            key={b.id}
            style={[
              styles.isaret,
              { top: 60 + i * 70, left: 40 + i * 80 },
            ]}
          >
            <TouchableOpacity
              onPress={() => router.push(`/berber/${b.id}`)}
              style={styles.isaretBtn}
            >
              <Text style={styles.isaretEmoji}>💈</Text>
              <View style={styles.isaretBilgi}>
                <Text style={styles.isaretAd}>{b.ad.split(' ')[0]}</Text>
                <Text style={styles.isaretFiyat}>₺{b.hizmetler[0].fiyat}</Text>
              </View>
            </TouchableOpacity>
          </View>
        ))}

        <View style={styles.haritaOvOrlay}>
          <Ionicons name="map" size={20} color={Colors.gold} />
          <Text style={styles.haritaInfo}>Yakın berberler işaretlendi</Text>
        </View>
      </View>

      {/* Yakın Berberler Listesi */}
      <Text style={styles.yakinBaslik}>📍 En Yakın Berberler</Text>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
        {BERBERLER.map((berber) => (
          <TouchableOpacity
            key={berber.id}
            style={styles.listeKart}
            onPress={() => router.push(`/berber/${berber.id}`)}
          >
            <Image
              source={{ uri: berber.profilFoto }}
              style={styles.avatar}
              contentFit="cover"
            />
            <View style={{ flex: 1 }}>
              <Text style={styles.listeAd}>{berber.dukkAn}</Text>
              <View style={styles.listeRow}>
                <Ionicons name="location-outline" size={12} color={Colors.gold} />
                <Text style={styles.listeIlce}>{berber.ilce} • {berber.mesafe}</Text>
              </View>
              <View style={styles.listeRow}>
                <Ionicons name="star" size={11} color={Colors.gold} />
                <Text style={styles.listePuan}>{berber.puan}</Text>
                <Text style={styles.listeYorum}>({berber.yorumSayisi})</Text>
              </View>
            </View>
            <View style={styles.listeSag}>
              <Text style={styles.listeFiyat}>₺{berber.hizmetler[0].fiyat}</Text>
              <Text style={styles.listeBaslayanText}>başlayan</Text>
              <View style={styles.musaitRow}>
                <View style={styles.musaitDot} />
                <Text style={styles.musaitText}>{berber.bugunMusait}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bg },
  baslik: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  baslikText: { fontSize: 22, fontWeight: '800', color: Colors.white },
  konumBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 6,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
  },
  konumText: { fontSize: 12, color: Colors.gold, fontWeight: '600' },
  haritaKutu: {
    height: 220,
    marginHorizontal: 16,
    borderRadius: 18,
    overflow: 'hidden',
    marginBottom: 4,
  },
  isaret: {
    position: 'absolute',
  },
  isaretBtn: {
    backgroundColor: '#0A0A0A',
    borderRadius: 12,
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderWidth: 2,
    borderColor: Colors.gold,
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
  },
  isaretEmoji: { fontSize: 16 },
  isaretBilgi: {},
  isaretAd: { fontSize: 11, fontWeight: '700', color: Colors.white },
  isaretFiyat: { fontSize: 10, color: Colors.gold },
  haritaOvOrlay: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 6,
    gap: 6,
  },
  haritaInfo: { fontSize: 11, color: Colors.white },
  yakinBaslik: {
    fontSize: 17,
    fontWeight: '700',
    color: Colors.white,
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 10,
  },
  listeKart: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    marginHorizontal: 16,
    marginBottom: 10,
    borderRadius: 16,
    padding: 14,
    gap: 12,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
  },
  avatar: { width: 52, height: 52, borderRadius: 26, borderWidth: 2, borderColor: Colors.gold },
  listeAd: { fontSize: 15, fontWeight: '700', color: Colors.white, marginBottom: 4 },
  listeRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: 3 },
  listeIlce: { fontSize: 12, color: Colors.gray },
  listePuan: { fontSize: 12, fontWeight: '700', color: Colors.white },
  listeYorum: { fontSize: 11, color: Colors.gray },
  listeSag: { alignItems: 'flex-end' },
  listeFiyat: { fontSize: 18, fontWeight: '800', color: Colors.gold },
  listeBaslayanText: { fontSize: 10, color: Colors.gray },
  musaitRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4 },
  musaitDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: Colors.green },
  musaitText: { fontSize: 11, color: Colors.green, fontWeight: '600' },
});
