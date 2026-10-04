// Web Audio API Procedural Sound Synthesizer for high-fidelity interactive SFX
class SoundSystem {
  private ctx: AudioContext | null = null;
  private lastTickTime = 0;

  private initCtx() {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  // Aperture gear tick as user opens or closes the iris
  playApertureTick(progress: number) {
    const now = Date.now();
    if (now - this.lastTickTime < 35) return; // throttle
    this.lastTickTime = now;

    const ctx = this.initCtx();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      // Pitch climbs slightly as aperture opens
      const baseFreq = 800 + progress * 1400;
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(baseFreq, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(baseFreq * 0.4, ctx.currentTime + 0.025);

      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(baseFreq * 1.2, ctx.currentTime);
      filter.Q.setValueAtTime(4, ctx.currentTime);

      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.025);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.03);
    } catch {
      // Audio context might be restricted before user gesture
    }
  }

  // Camera shutter snap when aperture reaches full open
  playShutterSnap() {
    const ctx = this.initCtx();
    if (!ctx) return;

    try {
      // Shutter click 1 (mirror up)
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = 'square';
      osc1.frequency.setValueAtTime(320, ctx.currentTime);
      osc1.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.06);

      gain1.gain.setValueAtTime(0.12, ctx.currentTime);
      gain1.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06);

      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start(ctx.currentTime);
      osc1.stop(ctx.currentTime + 0.07);

      // Shutter snap 2 (curtain release)
      setTimeout(() => {
        if (!ctx) return;
        const osc2 = ctx.createOscillator();
        const gain2 = ctx.createGain();
        osc2.type = 'triangle';
        osc2.frequency.setValueAtTime(640, ctx.currentTime);
        osc2.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 0.09);

        gain2.gain.setValueAtTime(0.18, ctx.currentTime);
        gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.09);

        osc2.connect(gain2);
        gain2.connect(ctx.destination);
        osc2.start(ctx.currentTime);
        osc2.stop(ctx.currentTime + 0.1);
      }, 50);
    } catch {
      // ignore
    }
  }

  // Cinematic lens dive / flythrough warp whoosh
  playFlyThroughWhoosh() {
    const ctx = this.initCtx();
    if (!ctx) return;

    try {
      // Noise buffer for atmospheric rush
      const bufferSize = ctx.sampleRate * 1.5;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(200, ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(4500, ctx.currentTime + 0.7);
      filter.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 1.4);
      filter.Q.setValueAtTime(3, ctx.currentTime);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.01, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.22, ctx.currentTime + 0.6);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.4);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      noise.start(ctx.currentTime);
      noise.stop(ctx.currentTime + 1.5);

      // Low sub bass swell
      const sub = ctx.createOscillator();
      const subGain = ctx.createGain();
      sub.type = 'sine';
      sub.frequency.setValueAtTime(60, ctx.currentTime);
      sub.frequency.linearRampToValueAtTime(140, ctx.currentTime + 0.8);
      sub.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 1.3);

      subGain.gain.setValueAtTime(0.05, ctx.currentTime);
      subGain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + 0.7);
      subGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.3);

      sub.connect(subGain);
      subGain.connect(ctx.destination);
      sub.start(ctx.currentTime);
      sub.stop(ctx.currentTime + 1.4);
    } catch {
      // ignore
    }
  }

  // Paper note hover / tap
  playPaperNote() {
    const ctx = this.initCtx();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(520, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(240, ctx.currentTime + 0.05);

      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.06);
    } catch {
      // ignore
    }
  }

  // Heavy forensic evidence stamp sound
  playStampSound() {
    const ctx = this.initCtx();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(160, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(45, ctx.currentTime + 0.12);

      gain.gain.setValueAtTime(0.25, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.16);
    } catch {
      // ignore
    }
  }

  // Scanner alert beep
  playAlertBeep() {
    const ctx = this.initCtx();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, ctx.currentTime);
      osc.frequency.setValueAtTime(1760, ctx.currentTime + 0.05);

      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.13);
    } catch {
      // ignore
    }
  }
}

export const sounds = new SoundSystem();
