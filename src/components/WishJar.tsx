import React, { useState } from "react";
import { Sparkles, Heart, Wand2 } from "lucide-react";
import confetti from "canvas-confetti";
import { romanticAudio } from "../utils/romanticAudio";

interface WishJarProps {
  girlName: string;
}

const DEFAULT_WISHES = [
  "أتمنى لكِ عاماً مليئاً بالضحكات الصادقة والنجاحات التي تليق بطموحكِ.",
  "أن يحفظ الله نقاء قلبكِ ويديم عليكِ بهجة الروح وراحة البال.",
  "أن تظل ابتسامتكِ مصدر الضوء والدفء لكل من حولكِ.",
  "أن تكون أيامكِ القادمة خفيفة على قلبك، محفوفة بالحب والرضا والتوفيق.",
  "أن تحققي كل حلم خبأته في صدركِ وأن يهديكِ القدر أجمل مما تتمنين.",
  "أن تبقي دائماً وردة متفتحة تنشر السعادة والأمل أينما حللتِ.",
];

export const WishJar: React.FC<WishJarProps> = ({ girlName }) => {
  const [currentWish, setCurrentWish] = useState<string>(DEFAULT_WISHES[0]);
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [customWishInput, setCustomWishInput] = useState<string>("");
  const [addedWishes, setAddedWishes] = useState<string[]>([]);
  const [showToast, setShowToast] = useState<boolean>(false);

  const drawRandomWish = () => {
    setIsSpinning(true);
    romanticAudio.playHeartPopSound();

    setTimeout(() => {
      const all = [...DEFAULT_WISHES, ...addedWishes];
      const randomIdx = Math.floor(Math.random() * all.length);
      setCurrentWish(all[randomIdx]);
      setIsSpinning(false);
    }, 400);
  };

  const handleAddCustomWish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customWishInput.trim()) return;

    setAddedWishes([customWishInput.trim(), ...addedWishes]);
    setCurrentWish(customWishInput.trim());
    setCustomWishInput("");
    setShowToast(true);

    romanticAudio.playCelebrationChime();
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 },
      colors: ["#ec4899", "#fbbf24"],
    });

    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="w-full max-w-3xl mx-auto my-12 p-6 md:p-8 rounded-3xl glass-panel-gold border border-amber-300/30 text-center shadow-xl relative">
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-400/20 text-amber-200 border border-amber-400/30 mb-3">
        <Sparkles className="w-3.5 h-3.5 text-amber-300" />
        صندوق أمنيات عيد الميلاد
      </div>

      <h3 className="text-2xl md:text-3xl font-bold font-amiri text-gold-gradient mb-2">
        أمنية خاصة لـ {girlName}
      </h3>
      <p className="text-pink-200/70 text-xs sm:text-sm max-w-md mx-auto mb-6">
        اسحبي أمنية جديدة أو اكتبي أمنيتكِ الخاصة لتنضم إلى باقة الأمنيات
      </p>

      {/* Display Card */}
      <div className={`p-6 sm:p-8 rounded-2xl bg-pink-950/50 border border-pink-400/30 mb-6 transition-all duration-300 ${isSpinning ? "opacity-30 scale-95" : "opacity-100 scale-100"}`}>
        <Heart className="w-8 h-8 mx-auto mb-3 text-rose-400 fill-rose-500/30 animate-pulse" />
        <p className="font-amiri text-lg sm:text-2xl text-rose-100 leading-relaxed font-semibold">
          "{currentWish}"
        </p>
      </div>

      {/* Button to draw new wish */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
        <button
          onClick={drawRandomWish}
          className="flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 text-white shadow-lg shadow-amber-500/20 hover:scale-105 active:scale-95 transition-all cursor-pointer"
        >
          <Wand2 className="w-4 h-4" />
          <span>سحب أمنية جديدة ✨</span>
        </button>
      </div>

      {/* Form to leave a sweet wish */}
      <form onSubmit={handleAddCustomWish} className="max-w-md mx-auto flex gap-2">
        <input
          type="text"
          value={customWishInput}
          onChange={(e) => setCustomWishInput(e.target.value)}
          placeholder={`اكتب أمنية لـ ${girlName}...`}
          className="flex-1 px-4 py-2.5 rounded-full bg-black/40 border border-pink-400/30 text-white placeholder-pink-300/40 text-xs sm:text-sm focus:outline-none focus:border-pink-400 transition-colors"
        />
        <button
          type="submit"
          className="px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold bg-pink-600 hover:bg-pink-700 text-white transition-all cursor-pointer shadow-md"
        >
          إرسال الأمنية 💌
        </button>
      </form>

      {showToast && (
        <p className="text-emerald-300 text-xs mt-3 animate-fadeIn font-semibold">
          ✨ تم إرسال أمنيتكِ ووصلت للقلب مباشرة!
        </p>
      )}
    </div>
  );
};
