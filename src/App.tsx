import { useState, useEffect } from "react";
import { ParticleCanvas } from "./components/ParticleCanvas";
import { BirthdayCake } from "./components/BirthdayCake";
import { CountdownTimer } from "./components/CountdownTimer";
import { LoveLetterModal } from "./components/LoveLetterModal";
import { SurpriseModal } from "./components/SurpriseModal";
import { RomanticGallery } from "./components/RomanticGallery";
import { RomanticCards } from "./components/RomanticCards";
import { WishJar } from "./components/WishJar";
import { MusicPlayer } from "./components/MusicPlayer";
import { AdminPanel } from "./components/AdminPanel";
import { BirthdayConfig, loadConfig } from "./utils/config";
import {
  Heart,
  Sparkles,
  Gift,
  Mail,
  Cake,
  Settings,
  ChevronDown,
  Download,
  Calendar
} from "lucide-react";

export function App() {
  const [config, setConfig] = useState<BirthdayConfig>(loadConfig);
  const [isLoveLetterOpen, setIsLoveLetterOpen] = useState<boolean>(false);
  const [isSurpriseOpen, setIsSurpriseOpen] = useState<boolean>(false);
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);

  // Sync config when saved
  const handleConfigSave = (newConfig: BirthdayConfig) => {
    setConfig(newConfig);
  };

  useEffect(() => {
    // Set document title dynamically
    document.title = `عيد ميلاد سعيد يا ${config.girlName} ❤️ | سنة سعيدة ومميزة`;
  }, [config.girlName]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-stone-950 via-rose-950 to-stone-950 text-white selection:bg-pink-500 selection:text-white overflow-x-hidden">
      {/* Background Animated Particles (Hearts, Petals, Stars) */}
      <ParticleCanvas />

      {/* Navigation Bar */}
      <header className="sticky top-0 z-30 w-full backdrop-blur-md bg-stone-950/60 border-b border-pink-500/20 px-4 py-3 transition-all">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          {/* Logo / Monogram */}
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-pink-500 to-rose-600 flex items-center justify-center shadow-lg shadow-pink-500/30 border border-amber-300/40">
              <Heart className="w-5 h-5 text-amber-200 fill-amber-200" />
            </div>
            <div>
              <span className="font-bold text-lg font-amiri text-rose-100 flex items-center gap-1">
                {config.girlName}
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              </span>
              <span className="text-[10px] text-pink-300/70 block -mt-1">
                {config.nickName}
              </span>
            </div>
          </div>

          {/* Quick links for Desktop / Tablet */}
          <nav className="hidden md:flex items-center gap-5 text-xs font-semibold text-pink-200/90">
            <button
              onClick={() => scrollToSection("hero")}
              className="hover:text-amber-300 transition-colors cursor-pointer"
            >
              الرئيسية
            </button>
            <button
              onClick={() => scrollToSection("cake-section")}
              className="hover:text-amber-300 transition-colors cursor-pointer"
            >
              كعكة العيد
            </button>
            <button
              onClick={() => scrollToSection("countdown-section")}
              className="hover:text-amber-300 transition-colors cursor-pointer"
            >
              العداد التنازلي
            </button>
            <button
              onClick={() => scrollToSection("gallery-section")}
              className="hover:text-amber-300 transition-colors cursor-pointer"
            >
              ألبوم الصور
            </button>
            <button
              onClick={() => scrollToSection("cards-section")}
              className="hover:text-amber-300 transition-colors cursor-pointer"
            >
              رسائل التهنئة
            </button>
          </nav>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsLoveLetterOpen(true)}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-pink-500/20 hover:bg-pink-500/30 text-pink-200 border border-pink-500/40 transition-all cursor-pointer shadow-sm"
            >
              <Mail className="w-3.5 h-3.5 text-pink-300" />
              <span>رسالتي إليكِ</span>
            </button>

            <button
              onClick={() => setIsAdminOpen(true)}
              className="p-2 rounded-full bg-white/10 hover:bg-pink-500/20 text-pink-200 border border-white/15 transition-all cursor-pointer"
              title="لوحة التحكم (الرمز السري)"
              aria-label="لوحة التحكم"
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section
        id="hero"
        className="relative min-h-[85vh] flex flex-col items-center justify-center text-center px-4 pt-10 pb-16 z-10"
      >
        {/* Subtle Ambient Radial Lighting */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-rose-600/15 rounded-full blur-3xl pointer-events-none -z-10" />

        {/* Crown / Sparkle badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-pink-500/20 border border-pink-400/30 text-pink-200 mb-6 shadow-lg shadow-pink-500/10 animate-pulse">
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>احتفال استثنائي لأغلى وأرق إنسانة في الوجود</span>
          <Sparkles className="w-4 h-4 text-amber-300" />
        </div>

        {/* Big Romantic Title */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold font-amiri text-gold-gradient tracking-wide mb-4 leading-tight max-w-4xl drop-shadow-md">
          {config.heroTitle}
        </h1>

        {/* Nickname / Romantic Tag */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <Heart className="w-5 h-5 text-rose-500 fill-rose-500 animate-bounce" />
          <p className="text-lg sm:text-2xl font-amiri text-rose-200 font-semibold">
            «{config.nickName}»
          </p>
          <Heart className="w-5 h-5 text-rose-500 fill-rose-500 animate-bounce" />
        </div>

        {/* Welcome Message */}
        <p className="text-pink-100/90 text-base sm:text-xl font-amiri max-w-2xl mx-auto leading-relaxed mb-10 px-2 drop-shadow">
          {config.heroMessage}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 max-w-lg mx-auto">
          <button
            onClick={() => scrollToSection("cake-section")}
            className="flex items-center gap-2 px-7 py-3 rounded-full text-sm font-bold bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white shadow-lg shadow-pink-600/40 hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <Cake className="w-4 h-4 text-amber-200" />
            <span>كعكة العيد والشموع 🎂</span>
          </button>

          <button
            onClick={() => setIsLoveLetterOpen(true)}
            className="flex items-center gap-2 px-7 py-3 rounded-full text-sm font-bold bg-gradient-to-r from-amber-500 via-rose-500 to-pink-600 hover:scale-105 active:scale-95 text-white shadow-lg shadow-amber-500/20 transition-all cursor-pointer"
          >
            <Mail className="w-4 h-4 text-amber-100" />
            <span>رسالتي الخاصة لكِ 💌</span>
          </button>

          <button
            onClick={() => setIsSurpriseOpen(true)}
            className="flex items-center gap-2 px-7 py-3 rounded-full text-sm font-bold bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-lg shadow-purple-600/40 hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <Gift className="w-4 h-4 text-amber-300" />
            <span>افتحي المفاجأة 🎁</span>
          </button>
        </div>

        {/* Scroll down prompt */}
        <div
          onClick={() => scrollToSection("cake-section")}
          className="mt-14 flex flex-col items-center gap-1 text-xs text-pink-300/60 hover:text-pink-200 cursor-pointer transition-colors"
        >
          <span>تابعي مفاجآت الاحتفال</span>
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </div>
      </section>

      {/* Birthday Cake Section */}
      <section id="cake-section" className="py-12 px-4 relative z-10">
        <BirthdayCake girlName={config.girlName} />
      </section>

      {/* Countdown Timer Section */}
      <section id="countdown-section" className="py-8 px-4 relative z-10">
        <CountdownTimer
          targetDateStr={config.birthdayDate}
          girlName={config.girlName}
        />
      </section>

      {/* Romantic Love Notes & Greeting Cards */}
      <section id="cards-section" className="py-10 px-4 relative z-10">
        <RomanticCards
          cards={config.romanticCards}
          girlName={config.girlName}
        />
      </section>

      {/* Romantic Photo Gallery */}
      <section id="gallery-section" className="py-10 px-4 relative z-10">
        <RomanticGallery
          images={config.galleryImages}
          girlName={config.girlName}
          onOpenAdmin={() => setIsAdminOpen(true)}
        />
      </section>

      {/* Interactive Wish Jar */}
      <section id="wishes-section" className="py-10 px-4 relative z-10">
        <WishJar girlName={config.girlName} />
      </section>

      {/* Surprise Banner Callout */}
      <section className="py-12 px-4 relative z-10">
        <div className="max-w-4xl mx-auto rounded-3xl p-8 md:p-12 glass-panel-gold border border-amber-300/40 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-48 h-48 bg-pink-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

          <Gift className="w-12 h-12 mx-auto mb-4 text-amber-300 animate-bounce" />
          <h3 className="text-2xl md:text-4xl font-bold font-amiri text-rose-100 mb-3">
            هل أنتِ جاهزة للمفاجأة السحرية يا {config.girlName}؟
          </h3>
          <p className="text-pink-100/80 text-sm md:text-base max-w-xl mx-auto mb-6">
            أسرار جميلة ومشاعر صادقة خُبئت خصيصاً في صندوق الهدايا لتسعد روحكِ في هذا اليوم الفريد.
          </p>

          <button
            onClick={() => setIsSurpriseOpen(true)}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-sm bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white shadow-xl shadow-pink-500/30 hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>كشف المفاجأة الآن 🎁</span>
          </button>
        </div>
      </section>

      {/* Persistent Romantic Music Player */}
      <MusicPlayer
        musicUrl={config.musicUrl}
        musicTitle={config.musicTitle}
      />

      {/* Modals */}
      <LoveLetterModal
        isOpen={isLoveLetterOpen}
        onClose={() => setIsLoveLetterOpen(false)}
        title={config.loveLetterTitle}
        content={config.loveLetterContent}
        signature={config.loveLetterSignature}
        girlName={config.girlName}
      />

      <SurpriseModal
        isOpen={isSurpriseOpen}
        onClose={() => setIsSurpriseOpen(false)}
        title={config.surpriseTitle}
        message={config.surpriseMessage}
        poem={config.surprisePoem}
        girlName={config.girlName}
      />

      <AdminPanel
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        config={config}
        onSave={handleConfigSave}
      />

      {/* Footer */}
      <footer className="relative z-10 border-t border-pink-500/20 bg-stone-950/80 pt-12 pb-24 px-4 text-center text-xs text-pink-300/70">
        <div className="max-w-4xl mx-auto flex flex-col items-center gap-4">
          <div className="flex items-center gap-2 text-rose-300 font-amiri text-base font-bold">
            <span>صُنِع بكل حب ووفاء لأجل</span>
            <span className="text-amber-300 text-lg">«{config.girlName}»</span>
            <Heart className="w-4 h-4 fill-rose-500 text-rose-500 inline" />
          </div>

          <p className="max-w-md text-pink-200/60 leading-relaxed">
            كل عام وأنتِ الحب والسرور، جعل الله كل أعوامكِ القادمة مليئة بالسعادة والنور وراحة البال.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={() => setIsAdminOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 hover:bg-white/10 text-pink-200/80 border border-white/10 transition-colors cursor-pointer"
            >
              <Settings className="w-3.5 h-3.5" />
              <span>لوحة التحكم (الرمز السري)</span>
            </button>

            <a
              href="/sana-saida-i.zip"
              download="sana-saida-i.zip"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-500/10 hover:bg-pink-500/20 text-pink-300 border border-pink-500/20 transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-amber-300" />
              <span>تحميل نسخة GitHub Pages المباشرة (.zip)</span>
            </a>
          </div>

          <div className="text-[11px] text-pink-300/40 pt-4 flex items-center justify-center gap-2">
            <Calendar className="w-3 h-3" />
            <span>سنة سعيدة - sana-saida-i | جاهز للنشر على GitHub Pages</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
