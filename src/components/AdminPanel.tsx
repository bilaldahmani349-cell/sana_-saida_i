import React, { useState } from "react";
import { BirthdayConfig, resetConfig, saveConfig } from "../utils/config";
import {
  Lock,
  Save,
  RotateCcw,
  X,
  AlertTriangle,
  CheckCircle2,
  Image,
  FileText,
  User,
  Music,
  Plus,
  Trash2,
  Download,
  Info
} from "lucide-react";

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  config: BirthdayConfig;
  onSave: (newConfig: BirthdayConfig) => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  isOpen,
  onClose,
  config,
  onSave,
}) => {
  const [pinInput, setPinInput] = useState<string>("");
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [pinError, setPinError] = useState<string>("");
  const [activeTab, setActiveTab] = useState<"general" | "messages" | "gallery" | "music" | "export">("general");

  // Local form state
  const [formData, setFormData] = useState<BirthdayConfig>({ ...config });
  const [toastMessage, setToastMessage] = useState<string>("");

  // New gallery image input
  const [newImgUrl, setNewImgUrl] = useState<string>("");
  const [newImgTitle, setNewImgTitle] = useState<string>("");
  const [newImgCaption, setNewImgCaption] = useState<string>("");

  if (!isOpen) return null;

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === formData.adminPin || pinInput === "1234") {
      setIsAuthenticated(true);
      setPinError("");
    } else {
      setPinError("الرمز السري غير صحيح (الرمز الافتراضي: 1234)");
    }
  };

  const handleSave = () => {
    saveConfig(formData);
    onSave(formData);
    setToastMessage("تم حفظ جميع التعديلات بنجاح في متصفحك الحالي! ✨");
    setTimeout(() => setToastMessage(""), 3500);
  };

  const handleReset = () => {
    if (window.confirm("هل أنت متأكد من رغبتك في استعادة الإعدادات والنصوص الافتراضية؟")) {
      const reset = resetConfig();
      setFormData(reset);
      onSave(reset);
      setToastMessage("تمت استعادة الإعدادات الافتراضية.");
      setTimeout(() => setToastMessage(""), 3000);
    }
  };

  const handleAddImage = () => {
    if (!newImgUrl.trim()) return;
    const newImage = {
      id: Date.now().toString(),
      url: newImgUrl.trim(),
      title: newImgTitle.trim() || `صورة لـ ${formData.girlName}`,
      caption: newImgCaption.trim() || "ذكرى سعيدة من القلب",
    };
    setFormData({
      ...formData,
      galleryImages: [...formData.galleryImages, newImage],
    });
    setNewImgUrl("");
    setNewImgTitle("");
    setNewImgCaption("");
  };

  const handleRemoveImage = (id: string) => {
    setFormData({
      ...formData,
      galleryImages: formData.galleryImages.filter((img) => img.id !== id),
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn" dir="rtl">
      <div className="relative w-full max-w-4xl bg-stone-900 border border-pink-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl text-white max-h-[92vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-pink-500/20">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-pink-500/20 flex items-center justify-center text-pink-400">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold font-amiri text-rose-100">
                لوحة التحكم في موقع عيد الميلاد
              </h2>
              <p className="text-xs text-pink-300/70">
                تخصيص الأسماء والرسائل والتواريخ والصور بكل سهولة
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-rose-200 transition-colors cursor-pointer"
            aria-label="إغلاق"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* PIN Authentication Screen */}
        {!isAuthenticated ? (
          <div className="flex flex-col items-center justify-center py-12 text-center max-w-md mx-auto">
            <div className="w-16 h-16 rounded-full bg-pink-500/10 border border-pink-400/30 flex items-center justify-center text-amber-300 mb-4 animate-pulse">
              <Lock className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold font-amiri text-rose-100 mb-2">
              الرجاء إدخال الرمز السري للوحة التحكم
            </h3>
            <p className="text-xs text-pink-200/70 mb-6">
              الرمز السري الافتراضي للموقع هو: <code className="bg-pink-950 px-2 py-0.5 rounded text-amber-300 font-bold">1234</code>
            </p>

            <form onSubmit={handlePinSubmit} className="w-full space-y-4">
              <div>
                <input
                  type="password"
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  placeholder="أدخل الرمز السري..."
                  className="w-full text-center tracking-widest text-lg px-4 py-3 rounded-2xl bg-black/40 border border-pink-400/40 text-white focus:outline-none focus:border-pink-400"
                  autoFocus
                />
                {pinError && (
                  <p className="text-red-400 text-xs mt-2 flex items-center justify-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    {pinError}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-2xl font-bold text-sm bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white shadow-lg shadow-pink-500/30 transition-all cursor-pointer"
              >
                دخول إلى لوحة التحكم
              </button>
            </form>
          </div>
        ) : (
          /* Authenticated Dashboard */
          <div className="flex flex-col flex-1 overflow-hidden mt-4">
            {/* Warning Banner Required by User */}
            <div className="mb-4 p-3 rounded-2xl bg-amber-950/40 border border-amber-400/30 text-amber-200 text-xs flex items-start gap-2.5">
              <Info className="w-4 h-4 flex-shrink-0 text-amber-300 mt-0.5" />
              <div>
                <strong>توضيح هام وشفاف:</strong> التعديلات المحفوظة هنا تُخزَّن داخل متصفحك الحالي عبر <code className="text-amber-300">localStorage</code> ولا تنتقل تلقائيًا لمتصفحات الزوار الآخرين على الهواتف والأجهزة المختلفة إلا بنشر الملفات على GitHub Pages. الموقع مصمم ليعمل باستقلالية تامة دون حاجة لخادم.
              </div>
            </div>

            {/* Tabs Bar */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-pink-500/20 select-none text-xs sm:text-sm font-semibold">
              <button
                onClick={() => setActiveTab("general")}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === "general"
                    ? "bg-pink-600 text-white shadow-md shadow-pink-600/30"
                    : "bg-white/5 hover:bg-white/10 text-pink-200"
                }`}
              >
                <User className="w-4 h-4" />
                <span>الاسم والموعد</span>
              </button>

              <button
                onClick={() => setActiveTab("messages")}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === "messages"
                    ? "bg-pink-600 text-white shadow-md shadow-pink-600/30"
                    : "bg-white/5 hover:bg-white/10 text-pink-200"
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>الرسائل والمفاجأة</span>
              </button>

              <button
                onClick={() => setActiveTab("gallery")}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === "gallery"
                    ? "bg-pink-600 text-white shadow-md shadow-pink-600/30"
                    : "bg-white/5 hover:bg-white/10 text-pink-200"
                }`}
              >
                <Image className="w-4 h-4" />
                <span>معرض الصور</span>
              </button>

              <button
                onClick={() => setActiveTab("music")}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === "music"
                    ? "bg-pink-600 text-white shadow-md shadow-pink-600/30"
                    : "bg-white/5 hover:bg-white/10 text-pink-200"
                }`}
              >
                <Music className="w-4 h-4" />
                <span>الموسيقى والرمز</span>
              </button>

              <button
                onClick={() => setActiveTab("export")}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === "export"
                    ? "bg-pink-600 text-white shadow-md shadow-pink-600/30"
                    : "bg-white/5 hover:bg-white/10 text-pink-200"
                }`}
              >
                <Download className="w-4 h-4" />
                <span>تصدير GitHub Pages</span>
              </button>
            </div>

            {/* Tab Body */}
            <div className="flex-1 overflow-y-auto py-4 pr-1 pl-2 space-y-4">
              {/* TAB 1: General */}
              {activeTab === "general" && (
                <div className="space-y-4 animate-fadeIn">
                  <div>
                    <label className="block text-xs font-bold text-pink-200 mb-1">
                      اسم صاحبة عيد الميلاد:
                    </label>
                    <input
                      type="text"
                      value={formData.girlName}
                      onChange={(e) => setFormData({ ...formData, girlName: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-pink-400/30 text-white focus:outline-none focus:border-pink-400 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-pink-200 mb-1">
                      اللقب أو الوصف الرومانسي:
                    </label>
                    <input
                      type="text"
                      value={formData.nickName}
                      onChange={(e) => setFormData({ ...formData, nickName: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-pink-400/30 text-white focus:outline-none focus:border-pink-400 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-pink-200 mb-1">
                      تاريخ ووقت عيد الميلاد (للعداد التنازلي):
                    </label>
                    <input
                      type="datetime-local"
                      value={formData.birthdayDate}
                      onChange={(e) => setFormData({ ...formData, birthdayDate: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-pink-400/30 text-white focus:outline-none focus:border-pink-400 text-sm font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-pink-200 mb-1">
                      عنوان الترحيب الرئيسي:
                    </label>
                    <input
                      type="text"
                      value={formData.heroTitle}
                      onChange={(e) => setFormData({ ...formData, heroTitle: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-pink-400/30 text-white focus:outline-none focus:border-pink-400 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-pink-200 mb-1">
                      رسالة الترحيب الأولى في الصفحة:
                    </label>
                    <textarea
                      rows={3}
                      value={formData.heroMessage}
                      onChange={(e) => setFormData({ ...formData, heroMessage: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-pink-400/30 text-white focus:outline-none focus:border-pink-400 text-sm font-amiri"
                    />
                  </div>
                </div>
              )}

              {/* TAB 2: Messages */}
              {activeTab === "messages" && (
                <div className="space-y-4 animate-fadeIn">
                  <div>
                    <label className="block text-xs font-bold text-pink-200 mb-1">
                      عنوان رسالة الحب الخاصة (في المظروف):
                    </label>
                    <input
                      type="text"
                      value={formData.loveLetterTitle}
                      onChange={(e) => setFormData({ ...formData, loveLetterTitle: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-pink-400/30 text-white focus:outline-none focus:border-pink-400 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-pink-200 mb-1">
                      نص رسالة الحب الكامل:
                    </label>
                    <textarea
                      rows={5}
                      value={formData.loveLetterContent}
                      onChange={(e) => setFormData({ ...formData, loveLetterContent: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-pink-400/30 text-white focus:outline-none focus:border-pink-400 text-sm font-amiri leading-relaxed"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-pink-200 mb-1">
                      توقيع الرسالة:
                    </label>
                    <input
                      type="text"
                      value={formData.loveLetterSignature}
                      onChange={(e) => setFormData({ ...formData, loveLetterSignature: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-pink-400/30 text-white focus:outline-none focus:border-pink-400 text-sm"
                    />
                  </div>

                  <hr className="border-pink-500/20 my-4" />

                  <div>
                    <label className="block text-xs font-bold text-pink-200 mb-1">
                      عنوان صندوق المفاجأة:
                    </label>
                    <input
                      type="text"
                      value={formData.surpriseTitle}
                      onChange={(e) => setFormData({ ...formData, surpriseTitle: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-pink-400/30 text-white focus:outline-none focus:border-pink-400 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-pink-200 mb-1">
                      رسالة المفاجأة:
                    </label>
                    <textarea
                      rows={3}
                      value={formData.surpriseMessage}
                      onChange={(e) => setFormData({ ...formData, surpriseMessage: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-pink-400/30 text-white focus:outline-none focus:border-pink-400 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-pink-200 mb-1">
                      أبيات الشعر الرومانسية للمفاجأة:
                    </label>
                    <textarea
                      rows={4}
                      value={formData.surprisePoem}
                      onChange={(e) => setFormData({ ...formData, surprisePoem: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-pink-400/30 text-white focus:outline-none focus:border-pink-400 text-sm font-amiri"
                    />
                  </div>
                </div>
              )}

              {/* TAB 3: Gallery */}
              {activeTab === "gallery" && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="p-4 rounded-2xl bg-black/30 border border-pink-500/20">
                    <h4 className="font-bold text-sm text-amber-200 mb-3 flex items-center gap-1.5">
                      <Plus className="w-4 h-4" />
                      إضافة صورة جديدة للمعرض
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-3">
                      <input
                        type="text"
                        placeholder="رابط الصورة (URL أو مسار مثل assets/images/p1.jpg)"
                        value={newImgUrl}
                        onChange={(e) => setNewImgUrl(e.target.value)}
                        className="px-3 py-2 rounded-xl bg-stone-900 border border-pink-400/30 text-xs text-white"
                      />
                      <input
                        type="text"
                        placeholder="عنوان الصورة (مثال: لقاء الربيع)"
                        value={newImgTitle}
                        onChange={(e) => setNewImgTitle(e.target.value)}
                        className="px-3 py-2 rounded-xl bg-stone-900 border border-pink-400/30 text-xs text-white"
                      />
                      <input
                        type="text"
                        placeholder="الوصف أو التاريخ"
                        value={newImgCaption}
                        onChange={(e) => setNewImgCaption(e.target.value)}
                        className="px-3 py-2 rounded-xl bg-stone-900 border border-pink-400/30 text-xs text-white"
                      />
                    </div>

                    <button
                      onClick={handleAddImage}
                      disabled={!newImgUrl.trim()}
                      className="px-4 py-2 rounded-xl text-xs font-bold bg-pink-600 hover:bg-pink-700 disabled:opacity-40 text-white cursor-pointer"
                    >
                      إضافة الصورة إلى المعرض
                    </button>
                  </div>

                  {/* Existing images list */}
                  <h4 className="font-bold text-xs text-pink-200 mt-4">الصور الحالية في المعرض:</h4>
                  <div className="space-y-2">
                    {formData.galleryImages.map((img) => (
                      <div
                        key={img.id}
                        className="flex items-center justify-between p-2.5 rounded-xl bg-stone-800/80 border border-pink-500/20 gap-3"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <img
                            src={img.url}
                            alt={img.title}
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = "/images/romantic_cake.jpg";
                            }}
                            className="w-12 h-12 object-cover rounded-lg border border-pink-400/30 flex-shrink-0"
                          />
                          <div className="min-w-0">
                            <h5 className="font-bold text-xs text-rose-100 truncate">{img.title}</h5>
                            <p className="text-[10px] text-pink-300/70 truncate">{img.caption}</p>
                            <span className="text-[9px] text-stone-400 font-mono truncate block">{img.url}</span>
                          </div>
                        </div>

                        <button
                          onClick={() => handleRemoveImage(img.id)}
                          className="p-2 rounded-lg bg-red-500/20 hover:bg-red-500/40 text-red-300 transition-colors cursor-pointer flex-shrink-0"
                          title="حذف الصورة"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 4: Music & Security */}
              {activeTab === "music" && (
                <div className="space-y-4 animate-fadeIn">
                  <div>
                    <label className="block text-xs font-bold text-pink-200 mb-1">
                      عنوان مقطوعة الموسيقى المعروض:
                    </label>
                    <input
                      type="text"
                      value={formData.musicTitle}
                      onChange={(e) => setFormData({ ...formData, musicTitle: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-pink-400/30 text-white focus:outline-none focus:border-pink-400 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-pink-200 mb-1">
                      مسار أو رابط ملف الموسيقى الخاص بك (MP3):
                    </label>
                    <input
                      type="text"
                      placeholder="اتركه فارغاً لعزف لحن البيانو الرومانسي التلقائي، أو ضع assets/music/song.mp3"
                      value={formData.musicUrl}
                      onChange={(e) => setFormData({ ...formData, musicUrl: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-pink-400/30 text-white focus:outline-none focus:border-pink-400 text-sm font-mono"
                    />
                    <p className="text-[11px] text-pink-300/60 mt-1">
                      💡 ملاحظة: إذا كان الحقل فارغاً أو تعذر تحميل الملف، سيعزف الموقع تلقائياً لحن بيانو رومانسي هادئ دون أي خطأ.
                    </p>
                  </div>

                  <hr className="border-pink-500/20 my-4" />

                  <div>
                    <label className="block text-xs font-bold text-pink-200 mb-1">
                      تغيير الرمز السري للوحة التحكم (PIN):
                    </label>
                    <input
                      type="password"
                      value={formData.adminPin}
                      onChange={(e) => setFormData({ ...formData, adminPin: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-pink-400/30 text-white focus:outline-none focus:border-pink-400 text-sm font-mono tracking-widest"
                    />
                  </div>
                </div>
              )}

              {/* TAB 5: Export & GitHub Pages Guide */}
              {activeTab === "export" && (
                <div className="space-y-4 animate-fadeIn text-sm">
                  <div className="p-4 rounded-2xl bg-pink-950/40 border border-pink-400/30">
                    <h4 className="font-bold text-amber-300 text-base mb-2 flex items-center gap-2">
                      <Download className="w-5 h-5" />
                      تحميل ملفات المشروع الجاهزة للنشر على GitHub Pages
                    </h4>
                    <p className="text-pink-100/90 text-xs leading-relaxed mb-4">
                      تم تجهيز حزمة المشروع الكاملة بالهيكل المطلوب تماماً (<code className="bg-black/50 px-1.5 py-0.5 rounded text-amber-300">sana-saida-i/</code>) بصيغة HTML5 و CSS3 و Vanilla JavaScript نقية، جاهزة للرفع على مستودع GitHub الخاص بك.
                    </p>

                    <div className="flex flex-wrap gap-3">
                      <a
                        href="/sana-saida-i.zip"
                        download="sana-saida-i.zip"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs bg-gradient-to-r from-amber-500 to-rose-600 hover:from-amber-600 hover:to-rose-700 text-white shadow-lg shadow-amber-500/20 transition-all cursor-pointer"
                      >
                        <Download className="w-4 h-4" />
                        <span>تحميل ملف sana-saida-i.zip المضغوط</span>
                      </a>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-black/30 border border-white/10 text-xs space-y-2 text-pink-100/80">
                    <h5 className="font-bold text-pink-200 text-sm">خطوات نشر الموقع على GitHub Pages:</h5>
                    <ol className="list-decimal list-inside space-y-1.5">
                      <li>أنشئ مستودعاً جديداً على حساب GitHub باسم <code className="bg-pink-950 px-1 py-0.5 rounded text-amber-300">sana-saida-i</code>.</li>
                      <li>قم بفك ضغط ملف <code className="bg-pink-950 px-1 py-0.5 rounded text-amber-300">sana-saida-i.zip</code> وارفع جميع الملفات مباشرة داخل المستودع.</li>
                      <li>تأكد من وجود ملف <code className="bg-pink-950 px-1 py-0.5 rounded text-amber-300">index.html</code> في جذر المستودع.</li>
                      <li>اذهب إلى إعدادات المستودع <strong>Settings &gt; Pages</strong>، واختر فرع <strong>main / root</strong> واضغط <strong>Save</strong>.</li>
                      <li>سيصبح موقعك متاحاً على الرابط: <br />
                        <span className="font-mono text-amber-300 text-[11px] block mt-1" dir="ltr">
                          https://bilaldahmani349-cell.github.io/sana-saida-i/
                        </span>
                      </li>
                    </ol>
                  </div>
                </div>
              )}
            </div>

            {/* Toast feedback */}
            {toastMessage && (
              <div className="p-3 rounded-xl bg-emerald-950 border border-emerald-400 text-emerald-200 text-xs flex items-center gap-2 animate-fadeIn mb-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>{toastMessage}</span>
              </div>
            )}

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-pink-500/20 flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={handleReset}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-white/5 hover:bg-white/10 text-rose-300 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>استعادة الافتراضي</span>
              </button>

              <div className="flex items-center gap-3">
                <button
                  onClick={onClose}
                  className="px-5 py-2 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                >
                  إغلاق
                </button>

                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 px-6 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white shadow-lg shadow-pink-500/30 transition-all cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>حفظ التعديلات</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
