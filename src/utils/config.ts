export interface GalleryImage {
  id: string;
  url: string;
  title: string;
  caption: string;
}

export interface RomanticCard {
  id: string;
  title: string;
  content: string;
  tag: string;
}

export interface BirthdayConfig {
  girlName: string;
  nickName: string;
  birthdayDate: string; // ISO string e.g. "2025-10-20T00:00"
  heroTitle: string;
  heroMessage: string;
  loveLetterTitle: string;
  loveLetterContent: string;
  loveLetterSignature: string;
  surpriseTitle: string;
  surpriseMessage: string;
  surprisePoem: string;
  musicUrl: string;
  musicTitle: string;
  adminPin: string;
  galleryImages: GalleryImage[];
  romanticCards: RomanticCard[];
}

export const DEFAULT_CONFIG: BirthdayConfig = {
  girlName: "إيمان",
  nickName: "حبيبة القلب ونور العين",
  birthdayDate: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 3, 20, 0).toISOString().slice(0, 16),
  heroTitle: "عيد ميلاد سعيد يا أغلى إيمان ❤️",
  heroMessage: "في مثل هذا اليوم السعيد، وُلدت أجمل زهرة في بستان الحياة لتملأ الدنيا عطراً وضياءً. كل عام وأنتِ روحي ونبض فؤادي، كل عام وابتسامتكِ تضيء كوني.",
  loveLetterTitle: "رسالة من أعماق القلب إلى إيمان",
  loveLetterContent: `إلى أميرتي إيمان الغالية،

لا تسع الكلمات ما يكنّه قلبي لكِ في هذا اليوم المبارك، فاليوم ليس مجرد تاريخ في التقويم، بل هو اليوم الذي أضاء الله به عالمي بولادتكِ. 

منذ أن عرفتكِ، أدركتُ أن السعادة ليست صدفة، بل هي ابتسامة ترسمينها على وجهي كل صباح، ودفء تودعينه في روحي بحديثكِ الرقيق. أنتِ الهدوء في وسط العاصفة، والجمال في أبسط التفاصيل.

أعدكِ في عامكِ الجديد بأن أكون لكِ السند الذي لا يميل، والحب الذي لا ينطفئ، وأن أصون عينيكِ من كل حزن. دمتِ لي عمراً جميلاً، وروحاً لا استغني عنها ما حييت.

كل عام وأنتِ الخير لكل عام، وعيد ميلاد سعيد يا كل دنيتي.`,
  loveLetterSignature: "مع كل نبضة حب وشوق، المخلص لكِ دائمًا ❤️",
  surpriseTitle: "مفاجأة خاصة لصاحبة أجمل قلب 🎁",
  surpriseMessage: "مفاجأتي لكِ يا إيمان ليست شيئاً يمكن لفه في علبة هدايا، بل هي وعد أبدي من أعماق الروح بأن أبقى بجانبكِ، أرعاكِ وأحبكِ أكثر في كل يوم يمر. أنتِ أعظم نعمة منحني إياها القدر!",
  surprisePoem: `كأنَّكِ البدرُ في ليلِ الهوى سطعَ
وكأنَّ حُسنَكِ في أرجائهِ لمعَ
يا زهرةَ العمرِ يا أحلى الأماني ويا
سرورَ قلبٍ بروحِ الودِّ قد سَطَعَ
كلُّ الأماني فدا عينيكِ إن طلبتْ
يا نبضَ روحٍ بها كلُّ الهوى اجتمعَ`,
  musicUrl: "", // Empty defaults to procedural soothing Web Audio melody
  musicTitle: "لحن البيانو الرومانسي الهادئ",
  adminPin: "1234",
  galleryImages: [
    {
      id: "1",
      url: "/images/romantic_cake.jpg",
      title: "كعكة عيد ميلادك الساحرة",
      caption: "أشعلنا الشموع وصنعنا أمنية لقلبكِ الطاهر"
    },
    {
      id: "2",
      url: "/images/romantic_roses.jpg",
      title: "باقة ورد تليق بجمالك",
      caption: "كل وردة فيها تنطق بحرف من حروف اسمكِ الرقيق"
    },
    {
      id: "3",
      url: "/images/gift_box.jpg",
      title: "هدية معطرة بالحب",
      caption: "أجمل الهدايا هي وجودكِ في هذه الدنيا"
    },
    {
      id: "4",
      url: "/images/starlit_night.jpg",
      title: "ليلة احتفال تحت النجوم",
      caption: "السماء كلها تحتفل بميلاد قمرها المشرق"
    },
    {
      id: "5",
      url: "/images/love_envelope.jpg",
      title: "رسائل الغرام الصادقة",
      caption: "حروف كُتبت بمداد الروح ومختومة بالوفاء"
    }
  ],
  romanticCards: [
    {
      id: "c1",
      title: "سر السعادة",
      content: "وجودكِ في حياتي هو المعنى الحقيقي للطمأنينة، أنتِ البهجة التي أتمناها تدوم مدى الدهر.",
      tag: "نبض القلب"
    },
    {
      id: "c2",
      title: "عامٌ من التألق",
      content: "سنة جديدة تكبرين فيها جمالاً ونضجاً ورفعة، بارك الله في عمركِ وحقق لكِ كل ما تتمنين.",
      tag: "أمنية العمر"
    },
    {
      id: "c3",
      title: "ابتسامة ساحرة",
      content: "حين تبتسمين يا إيمان، يبتسم العالم بأسره وتتفتح الأزهار في فصول الشتاء.",
      tag: "جمال الروح"
    },
    {
      id: "c4",
      title: "عهد الوفاء",
      content: "مهما طالت المسافات أو مرت السنوات، يبقى مكانكِ في القلب لا يشاركه فيه أحد.",
      tag: "حب أبدي"
    }
  ]
};

const STORAGE_KEY = "sana_saida_iman_config_v1";

export function loadConfig(): BirthdayConfig {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return { ...DEFAULT_CONFIG, ...parsed };
    }
  } catch (e) {
    console.error("Error loading config from localStorage:", e);
  }
  return DEFAULT_CONFIG;
}

export function saveConfig(config: BirthdayConfig): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  } catch (e) {
    console.error("Error saving config to localStorage:", e);
  }
}

export function resetConfig(): BirthdayConfig {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.error("Error resetting config:", e);
  }
  return DEFAULT_CONFIG;
}
