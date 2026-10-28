// Romantic Web Audio Synthesizer & SFX Engine
class RomanticAudioEngine {
  private audioCtx: AudioContext | null = null;
  private isPlayingMusic: boolean = false;
  private sequenceTimer: number | null = null;
  private masterGain: GainNode | null = null;
  private customAudio: HTMLAudioElement | null = null;
  private volume: number = 0.7;

  private initContext() {
    if (!this.audioCtx) {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.audioCtx = new AudioCtxClass();
      this.masterGain = this.audioCtx.createGain();
      this.masterGain.gain.setValueAtTime(this.volume, this.audioCtx.currentTime);
      this.masterGain.connect(this.audioCtx.destination);
    }
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.masterGain && this.audioCtx) {
      this.masterGain.gain.setValueAtTime(this.volume, this.audioCtx.currentTime);
    }
    if (this.customAudio) {
      this.customAudio.volume = this.volume;
    }
  }

  public getVolume(): number {
    return this.volume;
  }

  // Play a soft romantic tone (bell / music box / gentle piano tone)
  private playRomanticNote(freq: number, duration: number, delay: number = 0, type: OscillatorType = 'sine') {
    if (!this.audioCtx || !this.masterGain) return;

    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();
    const filter = this.audioCtx.createBiquadFilter();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime + delay);

    // Warm filter for cozy romantic tone
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1400, this.audioCtx.currentTime + delay);

    const startTime = this.audioCtx.currentTime + delay;
    gain.gain.setValueAtTime(0.0001, startTime);
    gain.gain.exponentialRampToValueAtTime(0.25, startTime + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc.start(startTime);
    osc.stop(startTime + duration + 0.1);
  }

  // Play a procedural loop of romantic melody
  public startProceduralRomanticMelody() {
    this.initContext();
    this.isPlayingMusic = true;

    // Frequencies for a romantic progression (in Hz)
    // Melody in F major / D minor romantic mood
    const chordsNotes = [
      // F major
      [349.23, 440.00, 523.25, 698.46],
      // C major
      [261.63, 329.63, 392.00, 523.25],
      // D minor
      [293.66, 349.23, 440.00, 587.33],
      // Bb major
      [233.08, 293.66, 349.23, 466.16],
      // A minor
      [220.00, 261.63, 329.63, 440.00],
      // C7/G romantic cadence
      [261.63, 392.00, 466.16, 523.25],
    ];

    let chordIndex = 0;

    const playBar = () => {
      if (!this.isPlayingMusic) return;

      const chord = chordsNotes[chordIndex % chordsNotes.length];
      chordIndex++;

      // Arpeggiate notes over 2.4 seconds
      chord.forEach((freq, i) => {
        this.playRomanticNote(freq, 1.8, i * 0.45, 'triangle');
        // add subtle shimmer octave harmonic
        if (i === 0 || i === 2) {
          this.playRomanticNote(freq * 2, 1.2, i * 0.45 + 0.15, 'sine');
        }
      });

      this.sequenceTimer = window.setTimeout(playBar, 2200);
    };

    playBar();
  }

  public stopProceduralRomanticMelody() {
    this.isPlayingMusic = false;
    if (this.sequenceTimer !== null) {
      window.clearTimeout(this.sequenceTimer);
      this.sequenceTimer = null;
    }
  }

  // Toggle or play custom MP3 if provided, or fallback to procedural melody
  public play(customUrl?: string, onEnd?: () => void) {
    this.initContext();

    if (customUrl && customUrl.trim().length > 0) {
      try {
        if (!this.customAudio || this.customAudio.src !== customUrl) {
          if (this.customAudio) {
            this.customAudio.pause();
          }
          this.customAudio = new Audio(customUrl);
          this.customAudio.volume = this.volume;
          this.customAudio.loop = true;
          if (onEnd) this.customAudio.onended = onEnd;
        }

        const playPromise = this.customAudio.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              this.isPlayingMusic = true;
            })
            .catch(() => {
              // If MP3 fails (e.g. 404 or file not found), fall back smoothly to synthesized melody!
              this.startProceduralRomanticMelody();
            });
        }
        return;
      } catch {
        // Fallback to synthesized melody
        this.startProceduralRomanticMelody();
        return;
      }
    }

    this.startProceduralRomanticMelody();
  }

  public pause() {
    this.isPlayingMusic = false;
    this.stopProceduralRomanticMelody();
    if (this.customAudio) {
      this.customAudio.pause();
    }
  }

  public isPlaying(): boolean {
    return this.isPlayingMusic || (this.customAudio ? !this.customAudio.paused : false);
  }

  // Sound Effect: Candle blow out (air breeze + extinguished fizzle)
  public playBlowCandleSound() {
    try {
      this.initContext();
      if (!this.audioCtx || !this.masterGain) return;

      const bufferSize = this.audioCtx.sampleRate * 0.6;
      const buffer = this.audioCtx.createBuffer(1, bufferSize, this.audioCtx.sampleRate);
      const data = buffer.getChannelData(0);

      // Pink noise puff
      let b0 = 0, b1 = 0, b2 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99 * b0 + white * 0.05;
        b1 = 0.95 * b1 + white * 0.05;
        b2 = 0.85 * b2 + white * 0.05;
        data[i] = (b0 + b1 + b2) * 0.3 * (1 - i / bufferSize);
      }

      const noise = this.audioCtx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.audioCtx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(600, this.audioCtx.currentTime);

      const gain = this.audioCtx.createGain();
      gain.gain.setValueAtTime(0.4, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.audioCtx.currentTime + 0.55);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      noise.start();
    } catch {
      // Ignored if user hasn't interacted
    }
  }

  // Sound Effect: Magical celebration chime
  public playCelebrationChime() {
    try {
      this.initContext();
      if (!this.audioCtx) return;

      const notes = [523.25, 659.25, 783.99, 1046.5, 1318.51]; // C E G C E
      notes.forEach((freq, idx) => {
        this.playRomanticNote(freq, 1.2, idx * 0.09, 'sine');
      });
    } catch {
      // Ignored
    }
  }

  // Sound Effect: Letter open / heart pop
  public playHeartPopSound() {
    try {
      this.initContext();
      if (!this.audioCtx) return;
      this.playRomanticNote(880, 0.4, 0, 'sine');
      this.playRomanticNote(1174.66, 0.5, 0.08, 'triangle');
    } catch {
      // Ignored
    }
  }
}

export const romanticAudio = new RomanticAudioEngine();
