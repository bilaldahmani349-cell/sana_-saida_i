import React, { useState } from "react";
import { GalleryImage } from "../utils/config";
import { Camera, ChevronLeft, ChevronRight, X, Heart, PlusCircle, HelpCircle } from "lucide-react";

interface RomanticGalleryProps {
  images: GalleryImage[];
  girlName: string;
  onOpenAdmin: () => void;
}

export const RomanticGallery: React.FC<RomanticGalleryProps> = ({
  images,
  girlName,
  onOpenAdmin,
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);
  const [showHelper, setShowHelper] = useState<boolean>(false);

  const openLightbox = (index: number) => {
    setActiveImageIndex(index);
  };

  const closeLightbox = () => {
    setActiveImageIndex(null);
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeImageIndex !== null) {
      setActiveImageIndex((activeImageIndex + 1) % images.length);
    }
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeImageIndex !== null) {
      setActiveImageIndex((activeImageIndex - 1 + images.length) % images.length);
    }
  };

  return (
    <section className="w-full max-w-5xl mx-auto my-14 px-4">
      <div className="text-center mb-8">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-500/20 text-rose-300 border border-rose-500/30 mb-2">
          <Camera className="w-3.5 h-3.5 text-amber-300" />
          ألبوم الذكريات والأشواق
        </span>
        <h2 className="text-3xl md:text-4xl font-bold font-amiri text-gold-gradient">
          معرض اللحظات الجميلة مع {girlName}
        </h2>
        <p className="text-pink-200/70 text-sm max-w-md mx-auto mt-2">
          كل صورة تحكي قصة حب، وكل لقطة تخلد ابتسامة دافئة لا تغيب عن البال
        </p>

        {/* Action bar for adding photos */}
        <div className="flex items-center justify-center gap-3 mt-4">
          <button
            onClick={onOpenAdmin}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold bg-pink-500/20 hover:bg-pink-500/30 text-pink-200 border border-pink-400/30 transition-all cursor-pointer"
          >
            <PlusCircle className="w-3.5 h-3.5 text-pink-300" />
            <span>إضافة صور شخصية جديدة</span>
          </button>

          <button
            onClick={() => setShowHelper(!showHelper)}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs text-pink-300/70 hover:text-pink-200 bg-white/5 border border-white/10 transition-colors cursor-pointer"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>كيف أضيف صوري؟</span>
          </button>
        </div>

        {/* Helper collapsible banner */}
        {showHelper && (
          <div className="mt-4 p-4 rounded-2xl bg-amber-950/40 border border-amber-400/30 text-right max-w-xl mx-auto text-xs sm:text-sm text-amber-200/90 leading-relaxed animate-fadeIn">
            <h4 className="font-bold text-amber-300 mb-1">📌 طريقة إضافة صوركِ الخاصة بسهولة:</h4>
            <ol className="list-decimal list-inside space-y-1 text-pink-100/80">
              <li>افتحي <strong>لوحة التحكم</strong> بالضغط على الزر في الأعلى (أو الرمز السري: 1234).</li>
              <li>توجهي لقسم «معرض الصور» وضعي رابط صورتكِ أو مسارها المباشر.</li>
              <li>أو ضعي صورك في مجلد <code className="bg-black/40 px-1 py-0.5 rounded text-amber-300">assets/images/</code> باسم <code className="bg-black/40 px-1 py-0.5 rounded text-amber-300">photo1.jpg</code>.</li>
            </ol>
          </div>
        )}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((img, idx) => (
          <div
            key={img.id || idx}
            onClick={() => openLightbox(idx)}
            className="group relative rounded-3xl overflow-hidden glass-panel border border-pink-400/20 hover:border-pink-400/60 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl shadow-pink-900/20 cursor-pointer"
          >
            {/* Image Container */}
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-rose-950/40">
              <img
                src={img.url}
                alt={img.title}
                onError={(e) => {
                  // Fallback to default high quality placeholder
                  (e.target as HTMLImageElement).src = "/images/romantic_cake.jpg";
                }}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/30 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

              {/* Heart floating badge */}
              <div className="absolute top-3 left-3 w-8 h-8 rounded-full bg-pink-500/30 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Heart className="w-4 h-4 text-pink-300 fill-pink-400" />
              </div>
            </div>

            {/* Caption */}
            <div className="p-4 text-right">
              <h3 className="font-bold text-base text-rose-100 font-amiri group-hover:text-amber-300 transition-colors">
                {img.title}
              </h3>
              <p className="text-pink-200/70 text-xs mt-1 line-clamp-2">
                {img.caption}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {activeImageIndex !== null && (
        <div
          onClick={closeLightbox}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn"
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 left-4 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer z-10"
            aria-label="إغلاق"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={prevImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer z-10"
            aria-label="الصورة السابقة"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <button
            onClick={nextImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer z-10"
            aria-label="الصورة التالية"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-3xl max-h-[85vh] flex flex-col items-center bg-stone-900/90 rounded-3xl p-4 border border-pink-400/30 overflow-hidden shadow-2xl"
          >
            <img
              src={images[activeImageIndex].url}
              alt={images[activeImageIndex].title}
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/images/romantic_cake.jpg";
              }}
              className="max-h-[65vh] w-auto object-contain rounded-2xl"
            />
            <div className="mt-4 text-center px-4">
              <h3 className="text-xl font-bold text-amber-200 font-amiri">
                {images[activeImageIndex].title}
              </h3>
              <p className="text-sm text-pink-200/80 mt-1">
                {images[activeImageIndex].caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
