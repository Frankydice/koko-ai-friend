// KOKO: Audio System & Speech Recognition/Synthesis Engine
// Play. Sing. Learn. Grow.

class KokoAudioSystem {
  constructor() {
    this.ctx = null;
    this.muted = false;
    this.speechSynth = window.speechSynthesis || null;
    this.isSpeaking = false;
    this.currentMusicTimer = null;
    this.recognition = null;
    this.isListening = false;

    this.initSpeechRecognition();
  }

  initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // --- SOUND EFFECTS ---

  // Playful pop when tapping buttons
  playPop() {
    if (this.muted) return;
    this.initContext();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(440, t);
    osc.frequency.exponentialRampToValueAtTime(880, t + 0.08);

    gain.gain.setValueAtTime(0.3, t);
    gain.gain.exponentialRampToValueAtTime(0.01, t + 0.08);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(t);
    osc.stop(t + 0.08);
  }

  // Magical star sparkle on correct answer
  playSparkle() {
    if (this.muted) return;
    this.initContext();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const notes = [587.33, 739.99, 880.00, 1174.66, 1479.98]; // D, F#, A, D, F#
    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, t + idx * 0.06);

      gain.gain.setValueAtTime(0.35, t + idx * 0.06);
      gain.gain.exponentialRampToValueAtTime(0.001, t + idx * 0.06 + 0.3);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(t + idx * 0.06);
      osc.stop(t + idx * 0.06 + 0.3);
    });
  }

  // Gentle, friendly try-again chime (NEVER a negative loud buzz!)
  playGentleTry() {
    if (this.muted) return;
    this.initContext();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const notes = [440, 392]; // A4 down to G4
    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, t + idx * 0.14);

      gain.gain.setValueAtTime(0.25, t + idx * 0.14);
      gain.gain.exponentialRampToValueAtTime(0.001, t + idx * 0.14 + 0.28);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(t + idx * 0.14);
      osc.stop(t + idx * 0.14 + 0.28);
    });
  }

  // Big celebratory fanfare
  playCheer() {
    if (this.muted) return;
    this.initContext();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51];
    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, t + idx * 0.09);

      gain.gain.setValueAtTime(0.4, t + idx * 0.09);
      gain.gain.exponentialRampToValueAtTime(0.001, t + idx * 0.09 + 0.4);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(t + idx * 0.09);
      osc.stop(t + idx * 0.09 + 0.4);
    });
  }

  // Play procedural musical notes for songs
  playSongMelody(song, onNoteBeat) {
    this.stopMusic();
    this.initContext();
    if (!this.ctx || this.muted) return;

    const notes = song.notes || [329.63, 392.00, 440.00, 523.25];
    let noteIdx = 0;

    const playNext = () => {
      if (this.muted || !this.ctx) return;
      const freq = notes[noteIdx % notes.length];
      const t = this.ctx.currentTime;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, t);

      gain.gain.setValueAtTime(0.2, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.35);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(t);
      osc.stop(t + 0.35);

      if (onNoteBeat) onNoteBeat(noteIdx);
      noteIdx++;

      this.currentMusicTimer = setTimeout(playNext, 420);
    };

    playNext();
  }

  stopMusic() {
    if (this.currentMusicTimer) {
      clearTimeout(this.currentMusicTimer);
      this.currentMusicTimer = null;
    }
  }

  // --- KOKO'S SPEECH SYNTHESIS (TALKING TO CHILD) ---
  speak(text, onStart, onEnd) {
    if (!this.speechSynth || this.muted) {
      if (onStart) onStart();
      setTimeout(() => { if (onEnd) onEnd(); }, 2000);
      return;
    }

    try {
      this.speechSynth.cancel(); // Stop any pending utterance
      const utterance = new SpeechSynthesisUtterance(text);

      // Child-friendly voice tuning
      utterance.pitch = 1.25; // Higher, cheerful child/teen pitch
      utterance.rate = 0.98;   // Slightly relaxed, clear speed

      // Pick English or friendly voice
      const voices = this.speechSynth.getVoices();
      const friendlyVoice = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha')));
      if (friendlyVoice) {
        utterance.voice = friendlyVoice;
      }

      utterance.onstart = () => {
        this.isSpeaking = true;
        if (onStart) onStart();
      };

      utterance.onend = () => {
        this.isSpeaking = false;
        if (onEnd) onEnd();
      };

      utterance.onerror = () => {
        this.isSpeaking = false;
        if (onEnd) onEnd();
      };

      this.speechSynth.speak(utterance);
    } catch (e) {
      console.warn("Speech synthesis issue:", e);
      if (onStart) onStart();
      setTimeout(() => { if (onEnd) onEnd(); }, 1500);
    }
  }

  stopSpeaking() {
    if (this.speechSynth) {
      this.speechSynth.cancel();
      this.isSpeaking = false;
    }
  }

  // --- SPEECH RECOGNITION (CHILD TALKING TO KOKO) ---
  initSpeechRecognition() {
    const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRec) {
      this.recognition = new SpeechRec();
      this.recognition.continuous = false;
      this.recognition.interimResults = false;
      this.recognition.lang = 'en-US';
    }
  }

  startListening(onResult, onError, onStart, onEnd) {
    if (!this.recognition) {
      if (onError) onError("Microphone is not supported in this browser. You can tap the question buttons below!");
      return;
    }

    if (this.isListening) {
      this.recognition.stop();
      this.isListening = false;
      return;
    }

    this.recognition.onstart = () => {
      this.isListening = true;
      if (onStart) onStart();
    };

    this.recognition.onresult = (e) => {
      const text = e.results[0][0].transcript;
      this.isListening = false;
      if (onResult) onResult(text);
    };

    this.recognition.onerror = (e) => {
      this.isListening = false;
      if (onError) onError(e.error === 'not-allowed' ? "Microphone permission was denied. Tap any suggestion below!" : "I didn't catch that, can you repeat?");
      if (onEnd) onEnd();
    };

    this.recognition.onend = () => {
      this.isListening = false;
      if (onEnd) onEnd();
    };

    try {
      this.recognition.start();
    } catch (err) {
      this.isListening = false;
      if (onEnd) onEnd();
    }
  }
}

window.kokoAudio = new KokoAudioSystem();
