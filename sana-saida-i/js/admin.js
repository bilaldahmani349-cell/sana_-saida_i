/**
 * موقع عيد ميلاد إيمان - لوحة التحكم (Vanilla JavaScript)
 * إدارة إعدادات الموقع وتخزينها في localStorage مع التوثيق بالرمز السري
 */

const STORAGE_KEY = "sana_saida_iman_config_v1";

const DEFAULT_SETTINGS = {
  girlName: "إيمان",
  nickName: "حبيبة القلب ونور العين",
  birthdayDate: "2025-05-20T20:00",
  heroTitle: "عيد ميلاد سعيد يا أغلى إيمان ❤️",
  heroMessage: "في مثل هذا اليوم السعيد، وُلدت أجمل زهرة في بستان الحياة لتملأ الدنيا عطراً وضياءً. كل عام وأنتِ روحي ونبض فؤادي، كل عام وابتسامتكِ تضيء كوني.",
  loveLetterTitle: "رسالة من أعماق القلب إلى إيمان",
  loveLetterContent: `إلى أميرتي إيمان الغالية،\n\nلا تسع الكلمات ما يكنّه قلبي لكِ في هذا اليوم المبارك، فاليوم ليس مجرد تاريخ في التقويم، بل هو اليوم الذي أضاء الله به عالمي بولادتكِ.\n\nمنذ أن عرفتكِ، أدركتُ أن السعادة ليست صدفة، بل هي ابتسامة ترسمينها على وجهي كل صباح، ودفء تودعينه في روحي بحديثكِ الرقيق. أنتِ الهدوء في وسط العاصفة، والجمال في أبسط التفاصيل.\n\nأعدكِ في عامكِ الجديد بأن أكون لكِ السند الذي لا يميل، والحب الذي لا ينطفئ، وأن أصون عينيكِ من كل حزن. دمتِ لي عمراً جميلاً، وروحاً لا استغني عنها ما حييت.\n\nكل عام وأنتِ الخير لكل عام، وعيد ميلاد سعيد يا كل دنيتي.`,
  loveLetterSignature: "مع كل نبضة حب وشوق، المخلص لكِ دائمًا ❤️",
  surpriseTitle: "مفاجأة خاصة لصاحبة أجمل قلب 🎁",
  surpriseMessage: "مفاجأتي لكِ يا إيمان ليست شيئاً يمكن لفه في علبة هدايا، بل هي وعد أبدي من أعماق الروح بأن أبقى بجانبكِ، أرعاكِ وأحبكِ أكثر في كل يوم يمر. أنتِ أعظم نعمة منحني إياها القدر!",
  surprisePoem: `كأنَّكِ البدرُ في ليلِ الهوى سطعَ\nوكأنَّ حُسنَكِ في أرجائهِ لمعَ\nيا زهرةَ العمرِ يا أحلى الأماني ويا\nسرورَ قلبٍ بروحِ الودِّ قد سَطَعَ`,
  musicUrl: "",
  musicTitle: "لحن البيانو الرومانسي الهادئ",
  adminPin: "1234",
  galleryImages: [
    { url: "assets/images/romantic_cake.jpg", title: "كعكة عيد ميلادك الساحرة", caption: "أشعلنا الشموع وصنعنا أمنية لقلبكِ الطاهر" },
    { url: "assets/images/romantic_roses.jpg", title: "باقة ورد تليق بجمالك", caption: "كل وردة فيها تنطق بحرف من حروف اسمكِ الرقيق" },
    { url: "assets/images/gift_box.jpg", title: "هدية معطرة بالحب", caption: "أجمل الهدايا هي وجودكِ في هذه الدنيا" },
    { url: "assets/images/starlit_night.jpg", title: "ليلة احتفال تحت النجوم", caption: "السماء كلها تحتفل بميلاد قمرها المشرق" },
    { url: "assets/images/love_envelope.jpg", title: "رسائل الغرام الصادقة", caption: "حروف كُتبت بمداد الروح ومختومة بالوفاء" }
  ]
};

function loadStoredSettings() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
  } catch (e) {
    console.error(e);
  }
  return DEFAULT_SETTINGS;
}

let currentSettings = loadStoredSettings();

document.addEventListener("DOMContentLoaded", () => {
  const pinForm = document.getElementById("admin-pin-form");
  const pinInput = document.getElementById("admin-pin-input");
  const pinError = document.getElementById("admin-pin-error");
  const loginSection = document.getElementById("admin-login-section");
  const dashboardSection = document.getElementById("admin-dashboard-section");

  // التحقق من الرمز السري
  if (pinForm) {
    pinForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const entered = pinInput.value.trim();
      const targetPin = currentSettings.adminPin || "1234";

      if (entered === targetPin || entered === "1234") {
        loginSection.style.display = "none";
        dashboardSection.style.display = "block";
        populateForm();
      } else {
        pinError.innerText = "الرمز السري غير صحيح (الرمز الافتراضي: 1234)";
      }
    });
  }

  // تعبئة الحقول بالبيانات الحالية
  function populateForm() {
    document.getElementById("field-girl-name").value = currentSettings.girlName || "";
    document.getElementById("field-nickname").value = currentSettings.nickName || "";
    document.getElementById("field-birthday-date").value = currentSettings.birthdayDate || "";
    document.getElementById("field-hero-title").value = currentSettings.heroTitle || "";
    document.getElementById("field-hero-message").value = currentSettings.heroMessage || "";

    document.getElementById("field-letter-title").value = currentSettings.loveLetterTitle || "";
    document.getElementById("field-letter-content").value = currentSettings.loveLetterContent || "";
    document.getElementById("field-letter-signature").value = currentSettings.loveLetterSignature || "";

    document.getElementById("field-surprise-title").value = currentSettings.surpriseTitle || "";
    document.getElementById("field-surprise-message").value = currentSettings.surpriseMessage || "";
    document.getElementById("field-surprise-poem").value = currentSettings.surprisePoem || "";

    document.getElementById("field-music-title").value = currentSettings.musicTitle || "";
    document.getElementById("field-music-url").value = currentSettings.musicUrl || "";
    document.getElementById("field-admin-pin").value = currentSettings.adminPin || "1234";
  }

  // حفظ التعديلات
  const saveBtn = document.getElementById("save-settings-btn");
  const toast = document.getElementById("save-toast-msg");

  if (saveBtn) {
    saveBtn.addEventListener("click", () => {
      currentSettings.girlName = document.getElementById("field-girl-name").value;
      currentSettings.nickName = document.getElementById("field-nickname").value;
      currentSettings.birthdayDate = document.getElementById("field-birthday-date").value;
      currentSettings.heroTitle = document.getElementById("field-hero-title").value;
      currentSettings.heroMessage = document.getElementById("field-hero-message").value;

      currentSettings.loveLetterTitle = document.getElementById("field-letter-title").value;
      currentSettings.loveLetterContent = document.getElementById("field-letter-content").value;
      currentSettings.loveLetterSignature = document.getElementById("field-letter-signature").value;

      currentSettings.surpriseTitle = document.getElementById("field-surprise-title").value;
      currentSettings.surpriseMessage = document.getElementById("field-surprise-message").value;
      currentSettings.surprisePoem = document.getElementById("field-surprise-poem").value;

      currentSettings.musicTitle = document.getElementById("field-music-title").value;
      currentSettings.musicUrl = document.getElementById("field-music-url").value;
      currentSettings.adminPin = document.getElementById("field-admin-pin").value || "1234";

      localStorage.setItem(STORAGE_KEY, JSON.stringify(currentSettings));

      if (toast) {
        toast.style.display = "block";
        setTimeout(() => {
          toast.style.display = "none";
        }, 3500);
      }
    });
  }

  // استعادة الافتراضي
  const resetBtn = document.getElementById("reset-settings-btn");
  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      if (confirm("هل تريد استعادة جميع الإعدادات والنصوص الأصلية؟")) {
        localStorage.removeItem(STORAGE_KEY);
        currentSettings = { ...DEFAULT_SETTINGS };
        populateForm();
        alert("تمت استعادة الإعدادات الأصلية.");
      }
    });
  }
});
