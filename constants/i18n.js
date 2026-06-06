// ─── USTURA · i18n ────────────────────────────────────────────────
// Türkçe / Arapça (Tunus Dercesi) / Fransızca
// Tunus Arapçası: standart Arapça DEĞİL — Derja (دارجة)

export const LANGUAGES = [
  { code: 'tr', label: 'Türkçe', flag: '🇹🇷', dir: 'ltr' },
  { code: 'ar', label: 'عربي',   flag: '🇹🇳', dir: 'rtl' },
  { code: 'fr', label: 'Français', flag: '🇫🇷', dir: 'ltr' },
];

export const T = {
  // ════════════════ TÜRKÇE ════════════════
  tr: {
    // Sekmeler
    tab_explore:      'Keşfet',
    tab_map:          'Harita',
    tab_appointments: 'Randevular',
    tab_profile:      'Profil',

    // Ana sayfa
    greeting:         'Merhaba 👋',
    loyalty_gold:     'Gold Üye',
    loyalty_points:   'puan',
    promo_title:      'Fırsatlar',
    nearby_barbers:   'Yakınındaki Berberler',
    cat_all:          'Hepsi',
    cat_near:         'Yakın',
    cat_top:          'En Yüksek',
    cat_cheap:        'Uygun',
    search_ph:        'Berber veya semt ara...',
    open_badge:       'Açık',
    from_price:       "'den",
    book_now:         'Randevu Al',
    results:          'sonuç',
    featured:         'Öne Çıkan',

    // Harita
    map_search:       'Semt veya berber ara...',
    map_nearby:       'Yakınındaki Berberler',

    // Randevularım
    apt_upcoming:     'Yaklaşan',
    apt_past:         'Geçmiş',
    apt_empty_title:  'Henüz randevunuz yok',
    apt_empty_sub:    'Beğendiğiniz berberi seçin\nrandevu alın',
    apt_book:         'Randevu Al',
    apt_cancel:       'İptal',
    apt_directions:   'Yol Tarifi',
    apt_again:        'Tekrar Al',
    status_pending:   'Bekliyor',
    status_confirmed: 'Onaylandı',
    status_completed: 'Tamamlandı',

    // Profil
    profile_gold:       'Gold Üye',
    profile_cuts:       'Kesim',
    profile_spending:   'Harcama',
    profile_favorites:  'Favori',
    profile_points:     'Puan',
    loyalty_title:      'Ustura Gold',
    loyalty_to_plat:    'Platinum\'a yükselmek için',
    loyalty_pts_needed: 'puan gerekiyor',
    app_version:        'USTURA v1.0.0 · Made in Istanbul',

    // Berber detay
    detail_distance:  'Uzaklık',
    detail_hours:     'Çalışma',
    detail_customers: 'Müşteri',
    detail_gallery:   '📸 Galeri',
    detail_services:  '✂️ Hizmetler',
    detail_reviews:   '💬 Yorumlar',
    detail_selected:  'Seçilen hizmet',
    detail_book:      'Randevu Al',
    detail_min:       'dk',

    // Randevu alma
    booking_title:      'Randevu Al',
    booking_pick_day:   '📅 Gün Seç',
    booking_pick_time:  '🕐 Saat Seç',
    booking_sms_info:   'Randevu onayı SMS ile gönderilecek. Geç kalırsanız 15 dk içinde bildirim yapın.',
    booking_confirm:    'Onayla',
    booking_time_hint:  'Saat seçin',
    booking_success:    'Randevu Onaylandı!',
    booking_view_apts:  'Randevularımı Gör',
    booking_back_home:  'Ana Sayfaya Dön',
    booking_closed:     'Kapalı',
    booking_busy:       'Dolu',

    // Günler
    day_today:    'Bugün',
    day_tomorrow: 'Yarın',
    day_sun:      'Paz',
    day_mon:      'Pzt',
    day_tue:      'Sal',
    day_wed:      'Çar',
    day_thu:      'Per',
  },

  // ════════════════ TUNUS ARAPÇASI (DERJA — دارجة تونسية) ════════════════
  // Dikkat: Bu standart Arapça değil! Tunus yerel lehçesidir.
  // "غدوة" = yarın (Tunus), "مسكر" = kapalı, "ثمن" = fiyat,
  // "حلاق" = berber, "مصاريف" = harcama, "الكونت" = hesap (Fr. "compte")
  ar: {
    // Sekmeler
    tab_explore:      'اكتشف',
    tab_map:          'الخريطة',
    tab_appointments: 'المواعيد',
    tab_profile:      'الكونت',

    // Ana sayfa
    greeting:         'أهلا 👋',
    loyalty_gold:     'عضو Gold',
    loyalty_points:   'نقطة',
    promo_title:      'عروض',
    nearby_barbers:   'الحلاقين القريبين منك',
    cat_all:          'الكل',
    cat_near:         'قريب',
    cat_top:          'الأحسن',
    cat_cheap:        'رخيص',
    search_ph:        'فتش على حلاق أو حي...',
    open_badge:       'مفتوح',
    from_price:       'من',
    book_now:         'خذ موعد',
    results:          'نتيجة',
    featured:         'المميز',

    // Harita
    map_search:       'فتش على حي أو حلاق...',
    map_nearby:       'الحلاقين القريبين منك',

    // Randevularım
    apt_upcoming:     'القادمين',
    apt_past:         'الفايتين',
    apt_empty_title:  'ما عندكش موعد',
    apt_empty_sub:    'اختار حلاق وخذ موعد\nبالسرعة',
    apt_book:         'خذ موعد',
    apt_cancel:       'الغا',
    apt_directions:   'الطريق',
    apt_again:        'ارجع خذ',
    status_pending:   'في الانتظار',
    status_confirmed: 'مؤكد',
    status_completed: 'تم',

    // Profil
    profile_gold:       'عضو Gold',
    profile_cuts:       'حلاقة',
    profile_spending:   'مصاريف',
    profile_favorites:  'المفضلة',
    profile_points:     'نقاط',
    loyalty_title:      'Ustura Gold',
    loyalty_to_plat:    'باش تولي Platinum',
    loyalty_pts_needed: 'نقطة تنقصك',
    app_version:        'USTURA v1.0.0 · Made in Istanbul',

    // Berber detay
    detail_distance:  'المسافة',
    detail_hours:     'الأوقات',
    detail_customers: 'زبون',
    detail_gallery:   '📸 الصور',
    detail_services:  '✂️ الخدمات',
    detail_reviews:   '💬 التعاليق',
    detail_selected:  'الخدمة المختارة',
    detail_book:      'خذ موعد',
    detail_min:       'دق',

    // Randevu alma
    booking_title:      'خذ موعد',
    booking_pick_day:   '📅 اختار اليوم',
    booking_pick_time:  '🕐 اختار الوقت',
    booking_sms_info:   'راهو يوصلك SMS بالموعد. كان تأخرت، علم في 15 دقيقة.',
    booking_confirm:    'تأكد',
    booking_time_hint:  'اختار وقت',
    booking_success:    'تم تأكيد الموعد!',
    booking_view_apts:  'شوف مواعيدي',
    booking_back_home:  'ارجع للصفحة الرئيسية',
    booking_closed:     'مسكر',
    booking_busy:       'مأخوذ',

    // Günler
    day_today:    'اليوم',
    day_tomorrow: 'غدوة',      // Tunus lehçesi: غداً değil غدوة
    day_sun:      'الأحد',
    day_mon:      'الاثنين',
    day_tue:      'الثلاثاء',
    day_wed:      'الأربعاء',
    day_thu:      'الخميس',
  },

  // ════════════════ FRANSIZCA ════════════════
  fr: {
    // Sekmeler
    tab_explore:      'Explorer',
    tab_map:          'Carte',
    tab_appointments: 'Rendez-vous',
    tab_profile:      'Profil',

    // Ana sayfa
    greeting:         'Bonjour 👋',
    loyalty_gold:     'Membre Gold',
    loyalty_points:   'points',
    promo_title:      'Promotions',
    nearby_barbers:   'Coiffeurs près de vous',
    cat_all:          'Tous',
    cat_near:         'Proche',
    cat_top:          'Mieux noté',
    cat_cheap:        'Prix bas',
    search_ph:        'Coiffeur ou quartier...',
    open_badge:       'Ouvert',
    from_price:       'dès',
    book_now:         'Réserver',
    results:          'résultat(s)',
    featured:         'À la une',

    // Harita
    map_search:       'Quartier ou coiffeur...',
    map_nearby:       'Coiffeurs près de vous',

    // Randevularım
    apt_upcoming:     'À venir',
    apt_past:         'Passés',
    apt_empty_title:  'Aucun rendez-vous',
    apt_empty_sub:    'Choisissez un coiffeur\net réservez maintenant',
    apt_book:         'Prendre RDV',
    apt_cancel:       'Annuler',
    apt_directions:   'Itinéraire',
    apt_again:        'Re-réserver',
    status_pending:   'En attente',
    status_confirmed: 'Confirmé',
    status_completed: 'Terminé',

    // Profil
    profile_gold:       'Membre Gold',
    profile_cuts:       'Coupes',
    profile_spending:   'Dépenses',
    profile_favorites:  'Favoris',
    profile_points:     'Points',
    loyalty_title:      'Ustura Gold',
    loyalty_to_plat:    'Pour passer à Platinum',
    loyalty_pts_needed: 'points manquants',
    app_version:        'USTURA v1.0.0 · Made in Istanbul',

    // Berber detay
    detail_distance:  'Distance',
    detail_hours:     'Horaires',
    detail_customers: 'Clients',
    detail_gallery:   '📸 Galerie',
    detail_services:  '✂️ Services',
    detail_reviews:   '💬 Avis',
    detail_selected:  'Service sélectionné',
    detail_book:      'Réserver',
    detail_min:       'min',

    // Randevu alma
    booking_title:      'Réserver',
    booking_pick_day:   '📅 Choisir le jour',
    booking_pick_time:  "🕐 Choisir l'heure",
    booking_sms_info:   "Confirmation par SMS. En cas de retard, prévenez dans les 15 min.",
    booking_confirm:    'Confirmer',
    booking_time_hint:  'Choisir une heure',
    booking_success:    'Rendez-vous confirmé !',
    booking_view_apts:  'Voir mes rendez-vous',
    booking_back_home:  "Retour à l'accueil",
    booking_closed:     'Fermé',
    booking_busy:       'Occupé',

    // Günler
    day_today:    "Aujourd'hui",
    day_tomorrow: 'Demain',
    day_sun:      'Dim',
    day_mon:      'Lun',
    day_tue:      'Mar',
    day_wed:      'Mer',
    day_thu:      'Jeu',
  },
};
