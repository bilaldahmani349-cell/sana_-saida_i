import React, { useState } from "react";
import { Gift, Heart, Sparkles, X, Star } from "lucide-react";
import confetti from "canvas-confetti";
import { romanticAudio } from "../utils/romanticAudio";

interface SurpriseModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  poem: string;
  girlName: string;
}

export const SurpriseModal: React.FC<SurpriseModalProps> = ({
  isOpen,
  onClose,
  title,
  message,
  poem,
  girlName,
}) => {
  const [isOpened, setIsOpened] = useState(false);

  if (!isOpen) return null;

  const handleOpenGift = () => {
    romanticAudio.playCelebrationChime();
    setIsOpened(true);

    confetti({
      particleCount: 150,
      spread: 90,
      origin: { y: 0.6 },
      colors: ["#fbbf24", "#ec4899", "#f43f5e", "#c084fc", "#ffd700"],
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div
        className="relative w-full max-w-xl bg-gradient-to-b from-stone-900 via-purple-950 to-stone-900 border border-pink-500/40 rounded-3xl p-6 sm:p-10 shadow-2xl text-white max-h-[90vh] overflow-y-auto"
        dir="rtl"
      >
        <button
          onClick={onClose}
          className="absolute top-4 left-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-rose-200 transition-colors cursor-pointer"
          aria-label="إغلاق"
        >
          <X className="w-5 h-5" />
        </button>

        {!isOpened ? (
          /* Gift Box Animation */
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div
              onClick={handleOpenGift}
              className="relative cursor-pointer group hover:scale-105 active:scale-95 transition-transform"
            >
              {/* Glowing Aura */}
              <div className="absolute inset-0 bg-pink-500/30 rounded-3xl blur-2xl group-hover:bg-pink-500/50 transition-colors" />

              {/* 3D Gift Box visual */}
              <div className="relative w-44 h-44 sm:w-52 sm:h-52 bg-gradient-to-tr from-pink-600 via-rose-500 to-purple-600 rounded-3xl border-2 border-amber-300 shadow-2xl flex items-center justify-center">
                {/* Golden Ribbon Vertical */}
                <div className="absolute top-0 bottom-0 w-8 bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400 shadow-md" />
                {/* Golden Ribbon Horizontal */}
                <div className="absolute left-0 right-0 h-8 bg-gradient-to-b from-amber-300 via-yellow-200 to-amber-400 shadow-md" />

                {/* Bow */}
                <div className="absolute -top-6 flex items-center justify-center">
                  <div className="w-12 h-10 border-4 border-amber-300 rounded-full rotate-45 bg-amber-400/30" />
                  <div className="w-12 h-10 border-4 border-amber-300 rounded-full -rotate-45 -mr-4 bg-amber-400/30" />
                  <div className="absolute w-6 h-6 rounded-full bg-amber-300 shadow-lg border border-yellow-100" />
                </div>

                <Heart className="w-16 h-16 text-white drop-shadow-lg z-10 animate-pulse" />
              </div>
            </div>

            <h3 className="text-2xl font-bold font-amiri text-gold-gradient mt-8 mb-2">
              مفاجأة سرية تنتظركِ يا {girlName}!
            </h3>
            <p className="text-pink-200/70 text-sm max-w-sm mb-6">
              اضغطي على صندوق الهدايا لتكتشفي ما يخفيه لكِ القلب في يومكِ الاستثنائي.
            </p>

            <button
              onClick={handleOpenGift}
              className="flex items-center gap-2 px-8 py-3 rounded-full font-bold text-sm bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 text-white shadow-lg shadow-pink-500/30 hover:scale-105 transition-all cursor-pointer"
            >
              <Gift className="w-5 h-5 text-amber-200" />
              <span>افتحي الهدية السحرية 🎁</span>
            </button>
          </div>
        ) : (
          /* Opened Surprise Content */
          <div className="animate-fadeIn">
            <div className="text-center mb-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-pink-500/20 text-pink-300 border border-pink-500/30 mb-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                مفاجأة العيد لـ {girlName}
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold font-amiri text-rose-200">
                {title}
              </h2>
            </div>

            {/* Surprise Message */}
            <div className="p-6 rounded-2xl bg-white/5 border border-pink-400/30 text-rose-100 text-base sm:text-lg leading-relaxed text-center mb-6 shadow-inner">
              {message}
            </div>

            {/* Romantic Poem Card */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-900/40 via-pink-900/30 to-amber-900/20 border border-amber-300/30 text-center relative overflow-hidden">
              <Star className="w-5 h-5 text-amber-300 absolute top-3 right-3 animate-spin" style={{ animationDuration: "8s" }} />
              <Star className="w-4 h-4 text-amber-300 absolute bottom-3 left-3 animate-spin" style={{ animationDuration: "10s" }} />

              <h4 className="text-amber-300 font-bold font-amiri text-lg mb-3">
                أبيات كُتبت لأجلكِ:
              </h4>
              <p className="font-amiri text-rose-200 text-lg sm:text-xl leading-loose whitespace-pre-line">
                {poem}
              </p>
            </div>

            {/* Closing button */}
            <div className="mt-8 text-center">
              <button
                onClick={onClose}
                className="px-8 py-2.5 rounded-full text-sm font-bold bg-gradient-to-r from-pink-500 to-rose-600 text-white hover:opacity-90 transition-opacity cursor-pointer shadow-lg shadow-pink-500/20"
              >
                أدامكِ الله لي أجمل أقداري ❤️
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
