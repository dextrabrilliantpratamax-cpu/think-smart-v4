/**
 * Synthesizes audio feedback sounds using the Web Audio API without needing external assets.
 */
let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  try {
    if (!audioCtx) {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtxClass) {
        audioCtx = new AudioCtxClass();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume().catch(() => {});
    }
    return audioCtx;
  } catch {
    return null;
  }
}

export function playFeedbackSound(
  type:
    | 'sunrise'
    | 'moonrise'
    | 'click'
    | 'success'
    | 'sparkle'
    | 'correct'
    | 'wrong'
    | 'tada'
    | 'spin'
    | 'timer_tick'
    | 'timer_tick_urgent'
    | 'game_over'
    | 'new_high_score'
    | 'flame_ignite'
    | 'flame_evolve'
    | 'dragon_roar'
    | 'dragon_breath'
    | 'dragon_evolve'
    | 'tiktok_streak_celebrate'
    | 'tiktok_counter_tick'
    | 'tiktok_tier_unlock'
    | 'tier_1'
    | 'tier_2'
    | 'tier_3'
    | 'tier_4'
    | 'tier_5'
    | 'tier_6'
    | 'tier_7'
    | 'tier_apex' = 'click'
) {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;

    if (type === 'dragon_roar' || type === 'dragon_evolve') {
      // Deep mythical dragon roar with multi-oscillator low-end resonance and harmonic flame hiss
      const roarOsc1 = ctx.createOscillator();
      const roarOsc2 = ctx.createOscillator();
      const roarGain = ctx.createGain();

      roarOsc1.type = 'sawtooth';
      roarOsc1.frequency.setValueAtTime(85, now);
      roarOsc1.frequency.linearRampToValueAtTime(140, now + 0.15);
      roarOsc1.frequency.exponentialRampToValueAtTime(55, now + 0.55);

      roarOsc2.type = 'triangle';
      roarOsc2.frequency.setValueAtTime(170, now);
      roarOsc2.frequency.linearRampToValueAtTime(280, now + 0.15);
      roarOsc2.frequency.exponentialRampToValueAtTime(70, now + 0.55);

      roarGain.gain.setValueAtTime(0.001, now);
      roarGain.gain.linearRampToValueAtTime(0.14, now + 0.08);
      roarGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.6);

      roarOsc1.connect(roarGain);
      roarOsc2.connect(roarGain);
      roarGain.connect(ctx.destination);

      roarOsc1.start(now);
      roarOsc2.start(now);
      roarOsc1.stop(now + 0.62);
      roarOsc2.stop(now + 0.62);

      // Chime overtone for celestial evolution
      const freqs = [523.25, 783.99, 1046.5, 1567.98, 2093.0];
      freqs.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        const start = now + 0.1 + i * 0.05;
        osc.frequency.setValueAtTime(freq, start);
        gain.gain.setValueAtTime(0.001, start);
        gain.gain.exponentialRampToValueAtTime(0.08 / (i + 1), start + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.45);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(start);
        osc.stop(start + 0.5);
      });
      return;
    }

    if (type === 'dragon_breath') {
      // Fiery dragon breath blast with sizzling harmonics
      const breathOsc = ctx.createOscillator();
      const breathGain = ctx.createGain();
      breathOsc.type = 'sawtooth';
      breathOsc.frequency.setValueAtTime(220, now);
      breathOsc.frequency.exponentialRampToValueAtTime(440, now + 0.08);
      breathOsc.frequency.exponentialRampToValueAtTime(110, now + 0.35);

      breathGain.gain.setValueAtTime(0.001, now);
      breathGain.gain.exponentialRampToValueAtTime(0.1, now + 0.06);
      breathGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);

      breathOsc.connect(breathGain);
      breathGain.connect(ctx.destination);
      breathOsc.start(now);
      breathOsc.stop(now + 0.36);
      return;
    }

    if (type === 'correct') {
      // Pleasant bright ding (E5 -> G#5 -> B5)
      const freqs = [659.25, 830.61, 987.77];
      freqs.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + i * 0.05);
        gain.gain.setValueAtTime(0.001, now + i * 0.05);
        gain.gain.exponentialRampToValueAtTime(0.09, now + i * 0.05 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.05 + 0.3);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + i * 0.05);
        osc.stop(now + i * 0.05 + 0.35);
      });
    } else if (type === 'timer_tick_urgent') {
      // High-pitch dual urgent warning click
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(1200, now);
      osc.frequency.exponentialRampToValueAtTime(800, now + 0.06);
      gain.gain.setValueAtTime(0.09, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.065);
    } else if (type === 'game_over') {
      // Descending minor chord timeout buzzer (Eb4 -> C4 -> A3 -> F#3)
      const freqs = [311.13, 261.63, 220.0, 185.0];
      freqs.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        const start = now + i * 0.1;
        osc.frequency.setValueAtTime(freq, start);
        gain.gain.setValueAtTime(0.001, start);
        gain.gain.exponentialRampToValueAtTime(0.08, start + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.25);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(start);
        osc.stop(start + 0.28);
      });
    } else if (type === 'new_high_score') {
      // Heroic triumphant fanfare (C5 -> E5 -> G5 -> C6 -> E6 -> G6)
      const freqs = [523.25, 659.25, 783.99, 1046.5, 1318.51, 1567.98];
      freqs.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        const start = now + i * 0.08;
        const dur = i === freqs.length - 1 ? 0.8 : 0.25;
        osc.frequency.setValueAtTime(freq, start);
        gain.gain.setValueAtTime(0.001, start);
        gain.gain.exponentialRampToValueAtTime(0.12, start + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.0001, start + dur);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(start);
        osc.stop(start + dur + 0.05);
      });
    } else if (type === 'wrong') {
      // Low buzz
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(160, now);
      osc.frequency.linearRampToValueAtTime(110, now + 0.18);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.2);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.22);
    } else if (type === 'tada') {
      // Celebration trumpet fanfare (C5 -> E5 -> G5 -> C6 high sustain)
      const freqs = [523.25, 659.25, 783.99, 1046.5];
      freqs.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        const start = now + i * 0.07;
        const dur = i === freqs.length - 1 ? 0.6 : 0.2;
        osc.frequency.setValueAtTime(freq, start);
        gain.gain.setValueAtTime(0.001, start);
        gain.gain.exponentialRampToValueAtTime(0.12, start + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.0001, start + dur);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(start);
        osc.stop(start + dur + 0.05);
      });
    } else if (type === 'spin') {
      // Whirring roulette clicks
      for (let i = 0; i < 8; i++) {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const time = now + i * 0.04;
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(400 + i * 60, time);
        gain.gain.setValueAtTime(0.05, time);
        gain.gain.exponentialRampToValueAtTime(0.001, time + 0.03);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(time);
        osc.stop(time + 0.035);
      }
    } else if (type === 'timer_tick') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(950, now);
      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.045);
    } else if (type === 'flame_ignite' || type === 'tier_1') {
      // Warm whoosh + resonant ignition flare
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.exponentialRampToValueAtTime(380, now + 0.12);
      osc.frequency.exponentialRampToValueAtTime(90, now + 0.35);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.exponentialRampToValueAtTime(0.09, now + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.36);
    } else if (type === 'tier_2' || type === 'tier_3') {
      // Solar/Dragon resonance with energetic harmonics
      const freqs = type === 'tier_2' ? [220, 440, 660] : [180, 360, 540, 720];
      freqs.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + i * 0.03);
        osc.frequency.exponentialRampToValueAtTime(freq * 1.5, now + i * 0.03 + 0.1);
        gain.gain.setValueAtTime(0.001, now + i * 0.03);
        gain.gain.exponentialRampToValueAtTime(0.06 / (i + 1), now + i * 0.03 + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.03 + 0.4);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + i * 0.03);
        osc.stop(now + i * 0.03 + 0.45);
      });
    } else if (type === 'tier_4' || type === 'tier_5') {
      // Cosmic vortex / High voltage electric plasma chime
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type === 'tier_5' ? 'sawtooth' : 'sine';
      osc.frequency.setValueAtTime(type === 'tier_5' ? 880 : 520, now);
      osc.frequency.exponentialRampToValueAtTime(type === 'tier_5' ? 1760 : 1040, now + 0.15);
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.exponentialRampToValueAtTime(0.08, now + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.45);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.46);
    } else if (type === 'tiktok_streak_celebrate') {
      // Cinematic TikTok-style bass drop whoosh + energetic bright arpeggio + crystal shimmer
      // 1. Sub Bass Punch Impact
      const subOsc = ctx.createOscillator();
      const subGain = ctx.createGain();
      subOsc.type = 'sine';
      subOsc.frequency.setValueAtTime(140, now);
      subOsc.frequency.exponentialRampToValueAtTime(45, now + 0.28);
      subGain.gain.setValueAtTime(0.18, now);
      subGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);
      subOsc.connect(subGain);
      subGain.connect(ctx.destination);
      subOsc.start(now);
      subOsc.stop(now + 0.38);

      // 2. Rising TikTok celebratory chord sequence
      const freqs = [440, 554.37, 659.25, 880, 1108.73, 1318.51, 1760];
      freqs.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = i < 3 ? 'triangle' : 'sine';
        const start = now + 0.08 + i * 0.045;
        osc.frequency.setValueAtTime(freq, start);
        gain.gain.setValueAtTime(0.001, start);
        gain.gain.exponentialRampToValueAtTime(0.11 / (1 + i * 0.2), start + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.55);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(start);
        osc.stop(start + 0.6);
      });
    } else if (type === 'tiktok_counter_tick') {
      // Crisp snappy ascending click for counter tick
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(750, now);
      osc.frequency.exponentialRampToValueAtTime(1200, now + 0.04);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.045);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.05);
    } else if (type === 'tiktok_tier_unlock') {
      // Grand triumphant fanfare with multi-layered chime
      const freqs = [523.25, 659.25, 783.99, 1046.5, 1318.51, 1567.98, 2093.0];
      freqs.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        const start = now + i * 0.06;
        const dur = i === freqs.length - 1 ? 0.9 : 0.3;
        osc.frequency.setValueAtTime(freq, start);
        gain.gain.setValueAtTime(0.001, start);
        gain.gain.exponentialRampToValueAtTime(0.14, start + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.0001, start + dur);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(start);
        osc.stop(start + dur + 0.05);
      });
    } else if (type === 'tier_6' || type === 'tier_7' || type === 'tier_apex' || type === 'flame_evolve') {
      // Celestial harmonic ascension chord (C5 -> G5 -> E6 -> C7) with radiant shimmer
      const freqs = [523.25, 783.99, 1318.51, 2093.00, 2637.02];
      freqs.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = i === 0 ? 'triangle' : 'sine';
        osc.frequency.setValueAtTime(freq, now + i * 0.05);

        gain.gain.setValueAtTime(0.001, now + i * 0.05);
        gain.gain.exponentialRampToValueAtTime(0.09 / (i + 1), now + i * 0.05 + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.05 + 0.6);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + i * 0.05);
        osc.stop(now + i * 0.05 + 0.65);
      });
    } else if (type === 'sunrise') {
      // Warm, uplifting major chord chime (C5 -> E5 -> G5 -> C6)
      const freqs = [523.25, 659.25, 783.99, 1046.5];
      freqs.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + i * 0.06);

        gain.gain.setValueAtTime(0.001, now + i * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.12 / (i + 1), now + i * 0.06 + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.06 + 0.55);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + i * 0.06);
        osc.stop(now + i * 0.06 + 0.6);
      });
    } else if (type === 'moonrise') {
      // Dreamy, ethereal ambient chime (E5 -> B4 -> G#4 -> E4)
      const freqs = [659.25, 493.88, 415.3, 329.63];
      freqs.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + i * 0.07);

        gain.gain.setValueAtTime(0.001, now + i * 0.07);
        gain.gain.exponentialRampToValueAtTime(0.1 / (i + 1), now + i * 0.07 + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.07 + 0.65);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + i * 0.07);
        osc.stop(now + i * 0.07 + 0.7);
      });
    } else if (type === 'sparkle') {
      const freqs = [1046.5, 1318.5, 1567.98, 2093.0];
      freqs.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + i * 0.04);

        gain.gain.setValueAtTime(0.001, now + i * 0.04);
        gain.gain.exponentialRampToValueAtTime(0.08, now + i * 0.04 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.04 + 0.35);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + i * 0.04);
        osc.stop(now + i * 0.04 + 0.4);
      });
    } else {
      // Simple crisp tactile click
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, now);
      osc.frequency.exponentialRampToValueAtTime(440, now + 0.05);

      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.05);
    }
  } catch {
    // Ignore audio context errors gracefully
  }
}
