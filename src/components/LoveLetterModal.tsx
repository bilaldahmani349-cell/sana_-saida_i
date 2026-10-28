import React, { useState } from "react";
import { Mail, Heart, X, Copy, Check, Sparkles } from "lucide-react";
import { romanticAudio } from "../utils/romanticAudio";

interface LoveLetterModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: string;
  signature: string;
  girlName: string;
}

export const LoveLetterModal: React.FC<LoveLetterModalProps> = ({
  isOpen,
  onClose,
  title,
  content,
  signature,
  girlName,
}) => {
  const [copied, setCopied] = useState(false);
  const [isOpenedLetter, setIsOpenedLetter] = useState(false);

  if (!isOpen) return null;

  const handleOpenEnvelope = () => {
    romanticAudio.playHeartPopSound();
    setIsOpenedLetter(true);
  };

  const handleCopy = () => {
    const fullText = `${title}\n\n${content}\n\n${signature}`;
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md transition-all animate-fadeIn">
      <div
        className="relative w-full max-w-2xl bg-gradient-to-b from-stone-900 via-rose-950 to-stone-950 border border-amber-300/40 rounded-3xl p-6 sm:p-10 shadow-2xl text-white max-h-[90vh] overflow-y-auto"
        dir="rtl"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-rose-200 transition-colors cursor-pointer"
          aria-label="إغلاق"
        >
          <X className="w-5 h-5" />
        </button>

        {!isOpenedLetter ? (
          /* Sealed Envelope View */
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <div className="relative group cursor-pointer" onClick={handleOpenEnvelope}>
              {/* Envelope graphic */}
              <div className="w-64 sm:w-80 h-44 sm:h-52 bg-gradient-to-br from-rose-900 to-amber-950 rounded-2xl border-2 border-amber-400/50 shadow-2xl flex items-center justify-center relative overflow-hidden transition-transform group-hover:scale-105 duration-300">
                {/* Envelope Flap Lines */}
                <div className="absolute top-0 inset-x-0 h-0 border-t-[50px] border-t-amber-900/60 border-l-[160px] border-l-transparent border-r-[160px] border-r-transparent pointer-events-none" />

                {/* Wax Seal */}
                <div className="relative z-10 w-20 h-20 rounded-full bg-gradient-to-br from-red-600 via-rose-700 to-red-900 border-2 border-amber-300 shadow-xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-300 animate-pulse">
                  <Heart className="w-10 h-10 text-amber-200 fill-amber-200" />
                </div>

                <div className="absolute bottom-3 text-amber-200/80 font-amiri text-sm">
                  خاص لـ {girlName} ❤️
                </div>
              </div>
            </div>

            <h3 className="text-2xl font-bold font-amiri text-amber-200 mt-6 mb-2">
              رسالة سرية موجهة إلى قلبكِ يا {girlName}
            </h3>
            <p className="text-pink-200/70 text-sm max-w-sm mb-6">
              هذه الكلمات كُتبت بمشاعر حقيقية وصادقة، انقري على المظروف لفض الختم وقراءة الرسالة.
            </p>

            <button
              onClick={handleOpenEnvelope}
              className="flex items-center gap-2 px-8 py-3 rounded-full font-bold text-sm bg-gradient-to-r from-amber-500 via-rose-500 to-pink-600 text-white shadow-lg shadow-pink-500/30 hover:scale-105 transition-all cursor-pointer"
            >
              <Mail className="w-4 h-4" />
              <span>افتحي الرسالة الآن ✨</span>
            </button>
          </div>
        ) : (
          /* Unfolded Letter View */
          <div className="animate-fadeIn">
            <div className="text-center mb-6 border-b border-amber-400/20 pb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-400/15 text-amber-300 border border-amber-400/30 mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                كلمات من صميم الروح
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold font-amiri text-gold-gradient">
                {title}
              </h2>
            </div>

            {/* Letter Body in Parchment Card */}
            <div className="p-6 sm:p-8 rounded-2xl bg-amber-50/5 border border-amber-400/20 text-rose-50 font-amiri text-lg sm:text-xl leading-relaxed whitespace-pre-line shadow-inner">
              {content}
            </div>

            {/* Signature */}
            <div className="mt-6 text-left pl-4 font-amiri text-lg text-amber-300 font-semibold italic">
              {signature}
            </div>

            {/* Bottom Actions */}
            <div className="mt-8 pt-4 border-t border-rose-500/20 flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={handleCopy}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/20 text-pink-200 transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? "تم نسخ الرسالة بنجاح" : "نسخ نص الرسالة"}</span>
              </button>

              <button
                onClick={onClose}
                className="px-6 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-rose-500 to-pink-600 text-white hover:opacity-90 transition-opacity cursor-pointer"
              >
                حفظ في القلب وإغلاق ❤️
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
