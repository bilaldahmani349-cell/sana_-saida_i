import React, { useState, useEffect } from "react";
import { Clock, Calendar, Heart } from "lucide-react";

interface CountdownTimerProps {
  targetDateStr: string;
  girlName: string;
}

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isToday: boolean;
  isPast: boolean;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDateStr, girlName }) => {
  const [timeLeft, setTimeLeft] = useState<TimeRemaining>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isToday: false,
    isPast: false,
  });

  useEffect(() => {
    const calculateTime = () => {
      const target = new Date(targetDateStr).getTime();
      const now = new Date().getTime();
      const difference = target - now;

      // Check if it's the exact day of birthday
      const targetDate = new Date(targetDateStr);
      const today = new Date();
      const isSameDay =
        targetDate.getDate() === today.getDate() &&
        targetDate.getMonth() === today.getMonth();

      if (isSameDay) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isToday: true,
          isPast: false,
        });
        return;
      }

      if (difference <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isToday: false,
          isPast: true,
        });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft({
        days,
        hours,
        minutes,
        seconds,
        isToday: false,
        isPast: false,
      });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [targetDateStr]);

  const timeBlocks = [
    { label: "يوم", value: timeLeft.days },
    { label: "ساعة", value: timeLeft.hours },
    { label: "دقيقة", value: timeLeft.minutes },
    { label: "ثانية", value: timeLeft.seconds },
  ];

  return (
    <div className="w-full max-w-2xl mx-auto my-8 p-6 md:p-8 rounded-3xl glass-panel border border-pink-400/30 text-center shadow-xl relative overflow-hidden">
      {/* Background soft aura */}
      <div className="absolute -top-12 -right-12 w-32 h-32 bg-pink-500/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl pointer-events-none" />

      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-pink-500/15 text-pink-300 border border-pink-500/25 mb-3">
        <Clock className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
        <span>العداد التنازلي للحظة المميزة</span>
      </div>

      <h3 className="text-xl md:text-2xl font-bold font-amiri text-rose-100 mb-2">
        {timeLeft.isToday
          ? `🎉 اليوم هو يوم ميلادكِ السعيد يا ${girlName}! 🎉`
          : timeLeft.isPast
          ? `✨ نحتفل بكِ في كل لحظة وكل ثانية يا ${girlName} ✨`
          : `نعد الثواني بشوق للاحتفال بيوم ميلاد ${girlName}`}
      </h3>

      {timeLeft.isToday ? (
        <div className="mt-4 p-4 rounded-2xl bg-gradient-to-r from-pink-600/30 via-purple-600/30 to-rose-600/30 border border-pink-400/40">
          <p className="text-amber-200 text-lg font-bold font-amiri flex items-center justify-center gap-2">
            <Heart className="w-5 h-5 fill-rose-500 text-rose-500 animate-bounce" />
            اليوم أشرقت الدنيا بنوركِ، كل عام وأنتِ بقلبي وبألف خير!
            <Heart className="w-5 h-5 fill-rose-500 text-rose-500 animate-bounce" />
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-2.5 sm:gap-4 mt-6">
          {timeBlocks.map((block, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-2xl bg-pink-950/40 border border-pink-500/20 shadow-inner group hover:border-pink-400/50 transition-all hover:scale-105"
            >
              <span className="text-2xl sm:text-4xl font-extrabold font-mono text-gold-gradient group-hover:scale-110 transition-transform">
                {String(block.value).padStart(2, "0")}
              </span>
              <span className="text-xs sm:text-sm text-pink-200/80 font-medium mt-1">
                {block.label}
              </span>
            </div>
          ))}
        </div>
      )}

      <div className="mt-5 text-xs text-pink-300/60 flex items-center justify-center gap-1.5">
        <Calendar className="w-3.5 h-3.5" />
        <span>التاريخ المحدد: {new Date(targetDateStr).toLocaleDateString("ar-EG", { year: "numeric", month: "long", day: "numeric" })}</span>
      </div>
    </div>
  );
};
