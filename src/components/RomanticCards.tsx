import React from "react";
import { RomanticCard } from "../utils/config";
import { Heart, Sparkles, Feather } from "lucide-react";

interface RomanticCardsProps {
  cards: RomanticCard[];
  girlName: string;
}

export const RomanticCards: React.FC<RomanticCardsProps> = ({ cards, girlName }) => {
  return (
    <section className="w-full max-w-5xl mx-auto my-14 px-4">
      <div className="text-center mb-10">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/20 text-purple-300 border border-purple-500/30 mb-2">
          <Feather className="w-3.5 h-3.5 text-amber-300" />
          نبضات من الوجدان
        </span>
        <h2 className="text-3xl md:text-4xl font-bold font-amiri text-gold-gradient">
          همسات حب وتهنئة إلى {girlName}
        </h2>
        <p className="text-pink-200/70 text-sm max-w-md mx-auto mt-2">
          كلمات نابعة من صميم الفؤاد، تحتفي بنقاء روحكِ وجمال حضوركِ
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cards.map((card, index) => (
          <div
            key={card.id || index}
            className="group relative p-6 sm:p-8 rounded-3xl glass-panel border border-pink-400/20 hover:border-pink-400/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl shadow-purple-950/40 relative overflow-hidden"
          >
            {/* Top Tag and Icon */}
            <div className="flex items-center justify-between mb-4">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-pink-500/20 text-pink-300 border border-pink-500/30">
                {card.tag}
              </span>
              <div className="w-8 h-8 rounded-full bg-pink-500/10 flex items-center justify-center text-pink-400 group-hover:scale-110 group-hover:bg-pink-500/20 transition-all">
                <Heart className="w-4 h-4 fill-pink-500/50" />
              </div>
            </div>

            {/* Title */}
            <h3 className="text-xl sm:text-2xl font-bold font-amiri text-rose-100 group-hover:text-amber-200 transition-colors mb-3">
              {card.title}
            </h3>

            {/* Content */}
            <p className="text-pink-100/80 font-amiri text-base sm:text-lg leading-relaxed whitespace-pre-line">
              {card.content}
            </p>

            {/* Decorative Corner Sparkle */}
            <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-pink-500/10 rounded-full blur-xl group-hover:bg-pink-500/25 transition-all pointer-events-none" />
            <Sparkles className="absolute bottom-4 left-4 w-4 h-4 text-amber-300/40 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        ))}
      </div>
    </section>
  );
};
