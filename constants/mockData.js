// ─── USTURA · Mock Data ───────────────────────────────────────────
// Gerçekçi İstanbul berberleri + hizmetler + yorumlar

export const BERBERLER = [
  {
    id: 'tarik-usta',
    ad: 'Tarık Usta',
    dukkAn: 'Tarık Berber Salonu',
    ilce: 'Kadıköy',
    adres: 'Moda Cad. No:42 Kadıköy, İstanbul',
    puan: 4.9,
    yorumSayisi: 312,
    mesafe: '0.4 km',
    fiyatAraligi: '₺',
    aciklama:
      '25 yıllık ustadan geleneksel Türk berberliği. Düzgün sakal kesimi ve saç tasarımı uzmanlığı. Her müşteriye özel stil danışmanlığı sunuyoruz.',
    kapakFoto:
      'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=900&q=80',
    profilFoto:
      'https://images.unsplash.com/photo-1567784177951-6fa58317e16b?w=300&q=80',
    galeri: [
      'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=400&q=80',
      'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=400&q=80',
      'https://images.unsplash.com/photo-1493256338651-d82f7acb2b38?w=400&q=80',
      'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=400&q=80',
    ],
    calismaSaatleri: { acilis: '09:00', kapanis: '20:00' },
    konum: { lat: 40.9908, lng: 29.0252 },
    ozellikler: ['Geleneksel Ustura', 'Sakal Şekillendirme', 'Saç Boyama'],
    hizmetler: [
      { ad: 'Saç Kesimi', sure: '30 dk', fiyat: 150 },
      { ad: 'Sakal Tıraşı', sure: '20 dk', fiyat: 100 },
      { ad: 'Saç + Sakal', sure: '45 dk', fiyat: 230 },
      { ad: 'Bıyık Düzeltme', sure: '15 dk', fiyat: 60 },
      { ad: 'Cilt Bakımı', sure: '40 dk', fiyat: 280 },
      { ad: 'Saç Boyama', sure: '60 dk', fiyat: 350 },
    ],
    yorumlar: [
      { ad: 'Mert K.', puan: 5, yorum: 'Yıllardır gidiyorum, elinden iş çıkıyor. Sakal şekillendirme konusunda rakipsiz!', tarih: '2 gün önce' },
      { ad: 'Ahmet Y.', puan: 5, yorum: 'Mahallede en iyi berber kesinlikle. Fiyat performans mükemmel.', tarih: '1 hafta önce' },
      { ad: 'Burak S.', puan: 4, yorum: 'Çok temiz ve profesyonel ortam. Biraz bekleme oldu ama değdi.', tarih: '2 hafta önce' },
    ],
  },

  {
    id: 'mert-bey',
    ad: 'Mert Bey',
    dukkAn: 'Premium Barber & Care',
    ilce: 'Beşiktaş',
    adres: 'Sinanpaşa Mah. Çırağan Cad. No:8 Beşiktaş',
    puan: 4.8,
    yorumSayisi: 284,
    mesafe: '1.1 km',
    fiyatAraligi: '₺₺',
    aciklama:
      "Modern İstanbul'un en trend barber noktalarından biri. Geleneksel Türk ustura tıraşı ile çağdaş erkek bakımını harmanlıyoruz.",
    kapakFoto:
      'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=900&q=80',
    profilFoto:
      'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=300&q=80',
    galeri: [
      'https://images.unsplash.com/photo-1541533848490-bc8115cd6522?w=400&q=80',
      'https://images.unsplash.com/photo-1534297635766-a262cdcb8ee4?w=400&q=80',
      'https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=400&q=80',
      'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=400&q=80',
    ],
    calismaSaatleri: { acilis: '10:00', kapanis: '21:00' },
    konum: { lat: 41.0438, lng: 29.0079 },
    ozellikler: ['Modern Stil', 'Renk Tasarım', 'VIP Kabine'],
    hizmetler: [
      { ad: 'Saç Kesimi', sure: '35 dk', fiyat: 200 },
      { ad: 'Ustura Tıraşı', sure: '25 dk', fiyat: 150 },
      { ad: 'Saç + Sakal Kombo', sure: '55 dk', fiyat: 320 },
      { ad: 'Saç Şekillendirme', sure: '20 dk', fiyat: 80 },
      { ad: 'Yüz Maskesi', sure: '30 dk', fiyat: 200 },
      { ad: 'Ombre / Balayage', sure: '90 dk', fiyat: 600 },
    ],
    yorumlar: [
      { ad: 'Can T.', puan: 5, yorum: 'Şehrin en iyi barberı. Ustura tıraşını mutlaka deneyin, inanılmaz.', tarih: '3 gün önce' },
      { ad: 'Emre A.', puan: 5, yorum: 'Saçımı tamamen yeniledi. Önce fotoğraf gösterip sonra istediğim gibi kesti.', tarih: '5 gün önce' },
      { ad: 'Ozan D.', puan: 4, yorum: 'Fiyatlar biraz yüksek ama kalite var. Randevu sistemi çok pratik.', tarih: '1 hafta önce' },
    ],
  },

  {
    id: 'huseyin-usta',
    ad: 'Hüseyin Usta',
    dukkAn: 'Eski Şehir Berberi',
    ilce: 'Üsküdar',
    adres: 'Mimar Sinan Mah. Hakimiyet Cad. No:17 Üsküdar',
    puan: 4.9,
    yorumSayisi: 421,
    mesafe: '2.3 km',
    fiyatAraligi: '₺',
    aciklama:
      '35 yıldır aynı yerde, aynı kalite. Baba mesleğini büyük bir tutku ile devam ettiren Hüseyin Usta, geleneksel ustura ve köpük tıraşının başkenti sayılır.',
    kapakFoto:
      'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=900&q=80',
    profilFoto:
      'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=300&q=80',
    galeri: [
      'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=400&q=80',
      'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=400&q=80',
      'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=400&q=80',
      'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=400&q=80',
    ],
    calismaSaatleri: { acilis: '08:30', kapanis: '19:30' },
    konum: { lat: 41.0255, lng: 29.015 },
    ozellikler: ['Köpük Tıraş', 'Geleneksel', 'Uygun Fiyat'],
    hizmetler: [
      { ad: 'Saç Kesimi', sure: '25 dk', fiyat: 120 },
      { ad: 'Köpük Tıraşı', sure: '20 dk', fiyat: 80 },
      { ad: 'Saç + Tıraş', sure: '40 dk', fiyat: 180 },
      { ad: 'Kulak & Burun Temizliği', sure: '10 dk', fiyat: 40 },
      { ad: 'Alın Düzeltme', sure: '15 dk', fiyat: 50 },
    ],
    yorumlar: [
      { ad: 'Yasin B.', puan: 5, yorum: 'Köpük tıraşı hayatımda denediğim en iyi tıraş. Gerçek usta bu.', tarih: '1 gün önce' },
      { ad: 'Serkan M.', puan: 5, yorum: 'Her hafta geliyorum. Yıllar içinde tek şey değişmedi: kalite ve güler yüz!', tarih: '4 gün önce' },
      { ad: 'Fatih Ö.', puan: 5, yorum: 'Semtin en köklü berberi. Fiyatlar gayet mantıklı, çalışma titizliği müthiş.', tarih: '1 hafta önce' },
    ],
  },

  {
    id: 'kemal-bey',
    ad: 'Kemal Bey',
    dukkAn: "Kemal's Barber Studio",
    ilce: 'Şişli',
    adres: 'Harbiye Mah. Cumhuriyet Cad. No:55 Şişli',
    puan: 4.7,
    yorumSayisi: 198,
    mesafe: '3.2 km',
    fiyatAraligi: '₺₺',
    aciklama:
      'Nişantaşı tarzı erkek bakımı. Butik atölyemizde saç kesimi, stil danışmanlığı ve özel ürünler ile kendinizi şımartın.',
    kapakFoto:
      'https://images.unsplash.com/photo-1493256338651-d82f7acb2b38?w=900&q=80',
    profilFoto:
      'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=300&q=80',
    galeri: [
      'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=400&q=80',
      'https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=400&q=80',
      'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=400&q=80',
      'https://images.unsplash.com/photo-1534297635766-a262cdcb8ee4?w=400&q=80',
    ],
    calismaSaatleri: { acilis: '11:00', kapanis: '22:00' },
    konum: { lat: 41.0492, lng: 28.9931 },
    ozellikler: ['Butik Atölye', 'Stil Danışmanlık', 'Özel Ürünler'],
    hizmetler: [
      { ad: 'Signature Kesim', sure: '45 dk', fiyat: 250 },
      { ad: 'Sakal Design', sure: '30 dk', fiyat: 180 },
      { ad: 'Premium Kombo', sure: '70 dk', fiyat: 400 },
      { ad: 'Saç Tonic Bakım', sure: '20 dk', fiyat: 150 },
      { ad: 'Keratin Bakım', sure: '60 dk', fiyat: 500 },
    ],
    yorumlar: [
      { ad: 'Kaan P.', puan: 5, yorum: 'Signature kesim denedim, 3 haftadır aldığım en çok iltifatı bu kesimle aldım!', tarih: '2 gün önce' },
      { ad: 'Barış C.', puan: 4, yorum: 'Premium mekân, premium hizmet. Biraz pahalı ama özel günlerimde tercihim.', tarih: '1 hafta önce' },
      { ad: 'Cem H.', puan: 5, yorum: 'Stil danışmanlığı gerçekten faydalıydı. Yüz yapıma göre mükemmel kesim önerdiler.', tarih: '2 hafta önce' },
    ],
  },

  {
    id: 'selim-usta',
    ad: 'Selim Usta',
    dukkAn: 'Boğaz Berber',
    ilce: 'Sarıyer',
    adres: 'Rumeli Hisarı Mah. Yahya Kemal Cad. No:3 Sarıyer',
    puan: 4.8,
    yorumSayisi: 156,
    mesafe: '4.8 km',
    fiyatAraligi: '₺',
    aciklama:
      "Boğaz manzarası eşliğinde İstanbul'un en sakin berber deneyimi. Klasik teknikler, modern tasarım anlayışı.",
    kapakFoto:
      'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=900&q=80',
    profilFoto:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&q=80',
    galeri: [
      'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=400&q=80',
      'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=400&q=80',
      'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=400&q=80',
      'https://images.unsplash.com/photo-1493256338651-d82f7acb2b38?w=400&q=80',
    ],
    calismaSaatleri: { acilis: '09:00', kapanis: '19:00' },
    konum: { lat: 41.0902, lng: 29.0539 },
    ozellikler: ['Manzaralı', 'Sakin Ortam', 'Klasik Teknik'],
    hizmetler: [
      { ad: 'Saç Kesimi', sure: '30 dk', fiyat: 140 },
      { ad: 'Tıraş & Bakım', sure: '25 dk', fiyat: 100 },
      { ad: 'Kombo Paket', sure: '50 dk', fiyat: 220 },
      { ad: 'Bıyık Bakımı', sure: '15 dk', fiyat: 60 },
    ],
    yorumlar: [
      { ad: 'Güven K.', puan: 5, yorum: "Boğaz'a bakan manzarayla saç kesimi başka. Hem mekân hem hizmet çok güzel.", tarih: '3 gün önce' },
      { ad: 'Tuncay Ş.', puan: 5, yorum: "İstanbul'da en huzurlu berber deneyimi. Sabah erken gelmenizi tavsiye ederim.", tarih: '6 gün önce' },
    ],
  },

  {
    id: 'ibrahim-usta',
    ad: 'İbrahim Usta',
    dukkAn: 'The Cut Istanbul',
    ilce: 'Fatih',
    adres: 'Süleymaniye Mah. Şifaiye Sok. No:12 Fatih',
    puan: 4.6,
    yorumSayisi: 89,
    mesafe: '5.5 km',
    fiyatAraligi: '₺',
    aciklama:
      'Tarihi yarımadanın kalbinde, asırlık berberlik geleneğini yaşatıyoruz. Osmanlı ustura tıraşı ve geleneksel köpük deneyimi.',
    kapakFoto:
      'https://images.unsplash.com/photo-1541533848490-bc8115cd6522?w=900&q=80',
    profilFoto:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&q=80',
    galeri: [
      'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=400&q=80',
      'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=400&q=80',
      'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=400&q=80',
      'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=400&q=80',
    ],
    calismaSaatleri: { acilis: '08:00', kapanis: '18:00' },
    konum: { lat: 41.0178, lng: 28.9647 },
    ozellikler: ['Osmanlı Tarz', 'Tarihi Yarımada', 'Geleneksel'],
    hizmetler: [
      { ad: 'Saç Kesimi', sure: '25 dk', fiyat: 100 },
      { ad: 'Osmanlı Tıraşı', sure: '30 dk', fiyat: 120 },
      { ad: 'Saç + Tıraş', sure: '50 dk', fiyat: 200 },
      { ad: 'Kulak Temizliği', sure: '10 dk', fiyat: 35 },
    ],
    yorumlar: [
      { ad: 'Volkan D.', puan: 5, yorum: 'Osmanlı tıraşı deneyimi yaşatıyorlar, tarihi atmosfer içinde inanılmaz.', tarih: '5 gün önce' },
      { ad: 'Kerem A.', puan: 4, yorum: 'Çok uygun fiyatlar, temiz ortam. Sabah erken açık olması büyük avantaj.', tarih: '2 hafta önce' },
    ],
  },
];

// ─── Promosyonlar ──────────────────────────────────────────────────
export const PROMOSYONLAR = [
  {
    id: 'promo1',
    baslik: 'İlk Randevu',
    altBaslik: '%20 İndirim',
    aciklama: 'Yeni üyeler için tüm hizmetlerde',
    renk: ['#C9A84C', '#E8C06A'],
    ikon: 'gift-outline',
  },
  {
    id: 'promo2',
    baslik: 'Haftalık Abonelik',
    altBaslik: 'Aylık ₺500 Tasarruf',
    aciklama: 'Haftada 1 kesim + bakım paketi',
    renk: ['#1a1a2e', '#16213e'],
    ikon: 'calendar-outline',
  },
  {
    id: 'promo3',
    baslik: 'Arkadaş Getir',
    altBaslik: '₺100 Bonus',
    aciklama: 'Her başarılı referansda kazanın',
    renk: ['#0f3460', '#533483'],
    ikon: 'people-outline',
  },
];

// ─── Kategoriler ───────────────────────────────────────────────────
export const KATEGORILER = [
  { id: 'hepsi', label: 'Hepsi', ikon: 'apps-outline' },
  { id: 'yakin', label: 'En Yakın', ikon: 'location-outline' },
  { id: 'puan', label: 'En İyi Puan', ikon: 'star-outline' },
  { id: 'musait', label: 'Şimdi Açık', ikon: 'time-outline' },
  { id: 'ucuz', label: 'Uygun Fiyat', ikon: 'wallet-outline' },
];

// ─── Kullanıcı Profili (mock) ──────────────────────────────────────
export const KULLANICI = {
  ad: 'Ahmet Yılmaz',
  telefon: '+90 532 *** ** 42',
  fotoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
  puan: 1240,
  kesimSayisi: 18,
  harcama: 2640,
  favoriSayi: 3,
  rozetler: ['early_bird', 'loyal', 'reviewer'],
};

// ─── Mock Randevular ───────────────────────────────────────────────
export const RANDEVULAR = [
  {
    id: 'r1',
    berber: BERBERLER[0],
    hizmet: 'Saç + Sakal',
    gun: 'Cmt, 8 Haz',
    saat: '11:00',
    fiyat: 230,
    durum: 'bekliyor',
  },
  {
    id: 'r2',
    berber: BERBERLER[1],
    hizmet: 'Ustura Tıraşı',
    gun: 'Paz, 9 Haz',
    saat: '14:30',
    fiyat: 150,
    durum: 'onaylandi',
  },
  {
    id: 'r3',
    berber: BERBERLER[2],
    hizmet: 'Saç Kesimi',
    gun: 'Sal, 28 May',
    saat: '10:00',
    fiyat: 120,
    durum: 'tamamlandi',
  },
  {
    id: 'r4',
    berber: BERBERLER[3],
    hizmet: 'Signature Kesim',
    gun: 'Crs, 22 May',
    saat: '16:00',
    fiyat: 250,
    durum: 'tamamlandi',
  },
];
