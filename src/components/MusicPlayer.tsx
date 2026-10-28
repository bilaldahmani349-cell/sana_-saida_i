import React, { useState, useEffect } from "react";
import { Music, Play, Pause, Volume2, VolumeX } from "lucide-react";
import { romanticAudio } from "../utils/romanticAudio";

interface MusicPlayerProps {
  musicUrl?: string;
  musicTitle?: string;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({
  musicUrl = "",
  musicTitle = "لحن البيانو الرومانسي",
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.7);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [previousVolume, setPreviousVolume] = useState<number>(0.7);

  const togglePlay = () => {
    if (isPlaying) {
      romanticAudio.pause();
      setIsPlaying(false);
    } else {
      romanticAudio.play(musicUrl);
      setIsPlaying(true);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (val === 0) {
      setIsMuted(true);
    } else {
      setIsMuted(false);
    }
    romanticAudio.setVolume(val);
  };

  const toggleMute = () => {
    if (isMuted) {
      const restore = previousVolume > 0 ? previousVolume : 0.7;
      setVolume(restore);
      setIsMuted(false);
      romanticAudio.setVolume(restore);
    } else {
      setPreviousVolume(volume);
      setVolume(0);
      setIsMuted(true);
      romanticAudio.setVolume(0);
    }
  };

  useEffect(() => {
    // If the music is already playing and user changed custom music URL, update
    if (isPlaying) {
      romanticAudio.play(musicUrl);
    }
  }, [musicUrl]);

  return (
    <div className="fixed bottom-4 left-4 z-40 max-w-xs sm:max-w-sm rounded-full glass-panel-gold border border-amber-300/40 p-2 sm:px-4 sm:py-2.5 shadow-2xl flex items-center gap-3 animate-fadeIn">
      {/* Play/Pause Button */}
      <button
        onClick={togglePlay}
        className="w-10 h-10 rounded-full bg-gradient-to-tr from-pink-600 to-rose-500 hover:from-pink-500 hover:to-rose-400 text-white flex items-center justify-center shadow-md shadow-pink-500/30 hover:scale-105 active:scale-95 transition-all cursor-pointer flex-shrink-0"
        aria-label={isPlaying ? "إيقاف الموسيقى" : "تشغيل الموسيقى"}
      >
        {isPlaying ? (
          <Pause className="w-5 h-5 fill-white" />
        ) : (
          <Play className="w-5 h-5 fill-white translate-x-0.5" />
        )}
      </button>

      {/* Info & Sound Waves */}
      <div className="flex flex-col min-w-0 pr-1 select-none">
        <div className="flex items-center gap-1 text-xs font-bold text-amber-200 truncate">
          <Music className={`w-3.5 h-3.5 ${isPlaying ? "text-pink-400 animate-bounce" : "text-amber-300"}`} />
          <span className="truncate">{musicTitle}</span>
        </div>
        <span className="text-[10px] text-pink-200/70 flex items-center gap-1 truncate">
          {isPlaying ? (
            <>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping inline-block" />
              <span>يعزف الآن بأجواء دافئة...</span>
            </>
          ) : (
            <span>انقر للاستماع للحن العيد</span>
          )}
        </span>
      </div>

      {/* Volume Slider */}
      <div className="hidden sm:flex items-center gap-1.5 pl-2 border-r border-pink-400/20">
        <button
          onClick={toggleMute}
          className="text-pink-300/80 hover:text-white transition-colors cursor-pointer"
          aria-label={isMuted ? "إلغاء كتم الصوت" : "كتم الصوت"}
        >
          {isMuted || volume === 0 ? (
            <VolumeX className="w-4 h-4 text-red-400" />
          ) : (
            <Volume2 className="w-4 h-4" />
          )}
        </button>

        <input
          type="range"
          min="0"
          max="1"
          step="0.05"
          value={volume}
          onChange={handleVolumeChange}
          className="w-14 accent-pink-500 h-1 bg-white/20 rounded-lg cursor-pointer"
          aria-label="مستوى الصوت"
        />
      </div>
    </div>
  );
};
