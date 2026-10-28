import React, { useState } from "react";
import confetti from "canvas-confetti";
import { romanticAudio } from "../utils/romanticAudio";
import { Sparkles, Flame, RotateCcw } from "lucide-react";

interface BirthdayCakeProps {
  girlName: string;
}

export const BirthdayCake: React.FC<BirthdayCakeProps> = ({ girlName }) => {
  const [candlesLit, setCandlesLit] = useState<boolean[]>([true, true, true]);
  const [allBlownOut, setAllBlownOut] = useState<boolean>(false);
  const [wishMade, setWishMade] = useState<boolean>(false);

  const triggerCelebration = () => {
    romanticAudio.playCelebrationChime();
    setAllBlownOut(true);
    setWishMade(true);

    // Confetti explosion
    const count = 200;
    const defaults = {
      origin: { y: 0.7 },
      colors: ["#ec4899", "#f43f5e", "#a855f7", "#fbbf24", "#ffffff"],
    };

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, { spread: 26, startVelocity: 55 });
    fire(0.2, { spread: 60 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    fire(0.1, { spread: 120, startVelocity: 45 });
  };

  const blowOutCandle = (index: number) => {
    if (!candlesLit[index]) return;

    romanticAudio.playBlowCandleSound();

    const updated = [...candlesLit];
    updated[index] = false;
    setCandlesLit(updated);

    if (updated.every((lit) => !lit)) {
      triggerCelebration();
    }
  };

  const blowOutAllCandles = () => {
    if (candlesLit.every((lit) => !lit)) return;
    romanticAudio.playBlowCandleSound();
    setCandlesLit([false, false, false]);
    setTimeout(() => {
      triggerCelebration();
    }, 300);
  };

  const relightCandles = () => {
    setCandlesLit([true, true, true]);
    setAllBlownOut(false);
    setWishMade(false);
  };

  return (
    <div className="relative flex flex-col items-center justify-center p-6 md:p-8 rounded-3xl glass-panel-gold border border-amber-300/30 max-w-xl mx-auto shadow-2xl">
      {/* Cake Title */}
      <div className="text-center mb-6">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-pink-500/20 text-pink-300 border border-pink-500/30 mb-2">
          <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin" style={{ animationDuration: '4s' }} />
          كعكة عيد الميلاد التفاعلية
        </span>
        <h3 className="text-2xl md:text-3xl font-bold font-amiri text-rose-100">
          اطفئي الشموع واصنعي أمنية يا {girlName}
        </h3>
        <p className="text-pink-200/70 text-sm mt-1">
          {allBlownOut ? "✨ تحققت أمنياتكِ بإذن الله وتفتحت دروب السعادة!" : "انقري على كل شمعة لإطفائها أو اضغطي زر النفخ في الأسفل"}
        </p>
      </div>

      {/* The Cake Visual */}
      <div className="relative w-64 md:w-72 h-64 flex flex-col items-center justify-end select-none">
        {/* Glow ambient background behind cake */}
        <div className="absolute inset-0 bg-pink-500/10 rounded-full blur-2xl -z-10" />

        {/* Candles Container */}
        <div className="flex items-end justify-center gap-8 mb-1 z-20">
          {[0, 1, 2].map((idx) => {
            const isLit = candlesLit[idx];
            return (
              <div
                key={idx}
                onClick={() => blowOutCandle(idx)}
                className="relative flex flex-col items-center cursor-pointer group transition-transform hover:scale-110 active:scale-95"
                title={isLit ? "انقر لإطفاء الشمعة" : "شمعة مطفأة"}
              >
                {/* Flame or Smoke */}
                <div className="relative h-10 w-6 flex items-center justify-center">
                  {isLit ? (
                    <div className="flame-animate relative flex items-center justify-center">
                      {/* Outer flame */}
                      <div className="w-4 h-7 rounded-full bg-gradient-to-t from-red-500 via-amber-400 to-yellow-200 shadow-lg shadow-amber-500/60" />
                      {/* Inner blue core */}
                      <div className="absolute bottom-0 w-2 h-3 rounded-full bg-blue-300/80 blur-[0.5px]" />
                    </div>
                  ) : (
                    <div className="smoke-animate flex flex-col items-center">
                      <div className="w-2.5 h-2.5 rounded-full bg-slate-400/60 blur-[1px]" />
                      <div className="w-3.5 h-3.5 rounded-full bg-slate-300/40 blur-[2px] mt-1" />
                    </div>
                  )}
                </div>

                {/* Candle Wick */}
                <div className="w-0.5 h-2 bg-stone-700" />

                {/* Candle Body */}
                <div className="w-4 h-12 rounded-t-sm bg-gradient-to-b from-pink-200 via-rose-300 to-pink-400 border border-pink-100/50 shadow-md flex flex-col justify-between py-1 items-center">
                  <div className="w-2 h-1 bg-white/60 rounded-full" />
                  <div className="w-2 h-1 bg-white/60 rounded-full" />
                  <div className="w-2 h-1 bg-white/60 rounded-full" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Cake Layer 1 (Top Tier) */}
        <div className="relative w-40 h-14 bg-gradient-to-r from-pink-300 via-rose-200 to-pink-300 rounded-t-2xl shadow-lg border-b-2 border-rose-400/40 flex items-center justify-center overflow-hidden z-10">
          {/* Frosting dripping */}
          <div className="absolute top-0 inset-x-0 h-4 bg-white/90 rounded-b-xl flex justify-around items-end">
            <span className="w-3 h-3 bg-white rounded-full -mb-1 shadow-sm" />
            <span className="w-2 h-4 bg-white rounded-full -mb-2 shadow-sm" />
            <span className="w-4 h-3 bg-white rounded-full -mb-1 shadow-sm" />
            <span className="w-2 h-3.5 bg-white rounded-full -mb-1.5 shadow-sm" />
          </div>
          {/* Sparkle or berries */}
          <div className="text-rose-600 font-bold text-xs tracking-wider font-amiri mt-2 drop-shadow-sm">
            ✨ {girlName} ✨
          </div>
        </div>

        {/* Cake Layer 2 (Middle Tier) */}
        <div className="relative w-52 h-16 bg-gradient-to-r from-purple-300 via-pink-200 to-purple-300 rounded-t-xl shadow-md border-b-2 border-purple-400/40 flex items-center justify-center overflow-hidden z-10">
          {/* Middle frosting */}
          <div className="absolute top-0 inset-x-0 h-4 bg-rose-100/90 rounded-b-xl flex justify-around items-end">
            <span className="w-3 h-2.5 bg-rose-100 rounded-full -mb-1" />
            <span className="w-4 h-3 bg-rose-100 rounded-full -mb-1.5" />
            <span className="w-3 h-4 bg-rose-100 rounded-full -mb-2" />
            <span className="w-4 h-3 bg-rose-100 rounded-full -mb-1" />
            <span className="w-3 h-2.5 bg-rose-100 rounded-full -mb-1" />
          </div>
          <div className="flex gap-3 text-xs opacity-75 mt-2">
            <span>🍓</span>
            <span>💖</span>
            <span>🌸</span>
            <span>💖</span>
            <span>🍓</span>
          </div>
        </div>

        {/* Cake Layer 3 (Bottom Tier) */}
        <div className="relative w-64 h-18 bg-gradient-to-r from-rose-400 via-pink-300 to-rose-400 rounded-t-2xl shadow-xl flex items-center justify-center overflow-hidden z-10">
          {/* Bottom frosting */}
          <div className="absolute top-0 inset-x-0 h-4 bg-white/80 rounded-b-xl flex justify-around">
            <span className="w-4 h-3 bg-white rounded-full -mb-1" />
            <span className="w-3 h-4 bg-white rounded-full -mb-1.5" />
            <span className="w-5 h-3 bg-white rounded-full -mb-1" />
            <span className="w-3 h-4.5 bg-white rounded-full -mb-2" />
            <span className="w-4 h-3 bg-white rounded-full -mb-1" />
            <span className="w-3 h-3.5 bg-white rounded-full -mb-1" />
          </div>
          <div className="text-white font-amiri text-sm font-semibold mt-3 text-shadow">
            سنة حلوة يا جميل 🎂
          </div>
        </div>

        {/* Cake Platter */}
        <div className="w-72 h-4 bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-300 rounded-full shadow-2xl border-t border-amber-100 z-10" />
      </div>

      {/* Celebration Banner when extinguished */}
      {wishMade && (
        <div className="mt-6 w-full p-4 rounded-2xl bg-gradient-to-r from-pink-500/20 via-purple-500/30 to-pink-500/20 border border-pink-400/40 text-center animate-bounce">
          <p className="text-lg md:text-xl font-bold font-amiri text-amber-200">
            🎉 كل عام وأنتِ الخير لكل عام يا {girlName}! 💖
          </p>
          <p className="text-xs md:text-sm text-pink-200 mt-1">
            جعل الله أيامكِ القادمة نوراً وبسماتٍ لا تغيب عن محياكِ الجميل.
          </p>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
        {!allBlownOut ? (
          <button
            onClick={blowOutAllCandles}
            className="flex items-center gap-2 px-6 py-2.5 rounded-full font-bold text-sm bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white shadow-lg shadow-pink-500/40 hover:shadow-pink-500/60 hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <Flame className="w-4 h-4 text-amber-200" />
            <span>انفخي الشموع دفعة واحدة 💨</span>
          </button>
        ) : (
          <button
            onClick={relightCandles}
            className="flex items-center gap-2 px-6 py-2.5 rounded-full font-bold text-sm bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-lg shadow-purple-600/40 hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>إشعال الشموع مجددًا 🔥</span>
          </button>
        )}
      </div>
    </div>
  );
};
