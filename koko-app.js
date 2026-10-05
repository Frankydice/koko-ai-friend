// KOKO: Core Application Logic, Live Activity Tracking, and Full User Flow
// Play. Sing. Learn. Grow.

class KokoApp {
  constructor() {
    this.data = window.KOKO_DATA;
    this.audio = window.kokoAudio;

    // Load or Initialize Account Profile (Clean as new if not registered)
    this.child = this.loadProfile();

    // App Navigation State
    this.currentScreen = this.child.isRegistered ? 'home' : 'splash';
    this.kokoMood = 'happy';

    // Maths State
    this.selectedMathLevel = 0;
    this.mathQuestionIdx = 0;
    this.mathInputMode = 'choice'; // 'choice' or 'typed'

    // Singing State
    this.selectedSongIdx = 0;
    this.isPlayingSong = false;
    this.currentLyricIdx = 0;
    this.songProgressPercent = 0;
    this.songProgressTimer = null;

    // Story State
    this.selectedStoryIdx = 0;
    this.currentStoryBranch = 'root';

    // Mini-Game State
    this.currentGameType = 'bananaMath';
    this.gameQuestionIdx = 0;

    // Memory Match Game State
    this.memoryCards = [];
    this.flippedCards = [];
    this.matchedPairsCount = 0;

    // Quiz State
    this.quizIdx = 0;

    // Language State
    this.currentLangKey = 'igbo';
    this.langWordIdx = 0;

    // Voice Chat State
    this.chatHistory = [
      { sender: 'koko', text: `Hi ${this.child.name}! 😊 I'm Koko! What fun adventure shall we go on today?` }
    ];

    // Parent PIN State
    this.enteredPin = '';

    // Live Learning Time Tracker (increments every minute of active play)
    this.sessionSeconds = 0;

    this.init();
  }

  // --- PROFILE STORAGE & CLEAN ONBOARDING ---
  loadProfile() {
    try {
      const stored = localStorage.getItem('koko_user_profile');
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn("Could not load stored profile", e);
    }
    // Return clean fresh profile template
    return JSON.parse(JSON.stringify(this.data.defaultCleanProfile));
  }

  saveProfile() {
    try {
      localStorage.setItem('koko_user_profile', JSON.stringify(this.child));
    } catch (e) {
      console.warn("Could not save profile", e);
    }
  }

  resetAccount() {
    if (confirm("Are you sure you want to reset and start clean as a brand new account?")) {
      localStorage.removeItem('koko_user_profile');
      this.child = JSON.parse(JSON.stringify(this.data.defaultCleanProfile));
      this.saveProfile();
      window.location.reload();
    }
  }

  init() {
    this.startActiveTimer();
    this.renderHeaderStats();
    this.renderHomeGreetingAndStreak();
    this.bindEvents();
    this.initMemoryMatch();

    // Route to appropriate screen on load
    if (!this.child.isRegistered) {
      this.showScreen('screenSplash', false);
    } else {
      this.showScreen('screenHome', false);
    }

    this.renderTalkScreen();
    this.renderSingScreen();
    this.renderMathScreen();
    this.renderStoryScreen();
    this.renderGameScreen();
    this.renderQuizScreen();
    this.renderLanguageScreen();
    this.renderChildProgressScreen();
    this.renderChildProfileScreen();
    this.renderParentDashboard();
  }

  // Live timer records learning minutes while child plays
  startActiveTimer() {
    setInterval(() => {
      if (this.child.isRegistered) {
        this.sessionSeconds += 1;
        if (this.sessionSeconds % 60 === 0) {
          this.child.todayMinutes += 1;
          this.child.weeklyStats.learningTimeMinutes += 1;
          this.saveProfile();
          this.renderHomeGreetingAndStreak();
          this.renderParentDashboard();
        }
      }
    }, 1000);
  }

  // Record completed learning activity
  recordActivity(type, wasCorrect = true) {
    if (!this.child.isRegistered) return;

    this.child.weeklyStats.activitiesCompleted += 1;

    if (type === 'math') {
      this.child.weeklyStats.mathQuestionsAnswered += 1;
      if (wasCorrect) this.child.weeklyStats.mathCorrect += 1;
      this.checkBadgeUnlock('math_whiz', this.child.weeklyStats.mathCorrect >= 3);
    } else if (type === 'song') {
      this.child.weeklyStats.songsPlayed += 1;
      this.checkBadgeUnlock('songbird', true);
    } else if (type === 'story') {
      this.child.weeklyStats.storiesRead += 1;
      this.checkBadgeUnlock('story_hero', true);
    } else if (type === 'quiz') {
      this.child.weeklyStats.quizQuestionsAnswered += 1;
      if (wasCorrect) this.child.weeklyStats.quizCorrect += 1;
    } else if (type === 'language') {
      this.child.weeklyStats.wordsLearned += 1;
      this.checkBadgeUnlock('polyglot', this.child.weeklyStats.wordsLearned >= 2);
    }

    // Check star badges
    this.checkBadgeUnlock('first_star', this.child.stars >= 5);

    this.saveProfile();
    this.renderChildProgressScreen();
    this.renderParentDashboard();
  }

  checkBadgeUnlock(badgeId, condition) {
    if (!condition) return;
    const badge = this.child.badges.find(b => b.id === badgeId);
    if (badge && !badge.unlocked) {
      badge.unlocked = true;
      this.audio.playCheer();
      this.triggerConfetti();
      this.showToast(`🏆 Badge Unlocked: ${badge.title}!`);
    }
  }

  showToast(msg) {
    const toast = document.createElement('div');
    toast.className = 'koko-toast';
    toast.textContent = msg;
    document.body.appendChild(toast);
    setTimeout(() => toast.classList.add('visible'), 50);
    setTimeout(() => {
      toast.classList.remove('visible');
      setTimeout(() => toast.remove(), 400);
    }, 3200);
  }

  // --- SCREEN NAVIGATION ---
  showScreen(screenId, playSound = true) {
    if (playSound) this.audio.playPop();

    const screens = document.querySelectorAll('.app-screen');
    screens.forEach(s => s.classList.remove('active'));

    const target = document.getElementById(screenId);
    if (target) {
      target.classList.add('active');
      this.currentScreen = screenId.replace('screen', '').toLowerCase();
    }

    // Update bottom nav (Home, Progress, Profile)
    const navItems = document.querySelectorAll('.nav-btn');
    navItems.forEach(btn => {
      const targetNav = btn.getAttribute('data-screen');
      if (targetNav === screenId) btn.classList.add('active');
      else btn.classList.remove('active');
    });

    // Screen specific mood & audio triggers
    if (screenId === 'screenHome') {
      this.updateKokoMood('happy');
      this.renderHomeGreetingAndStreak();
    } else if (screenId === 'screenSing') {
      this.updateKokoMood('excited');
    } else if (screenId === 'screenMaths') {
      this.updateKokoMood('thinking');
    } else if (screenId === 'screenChildProgress') {
      this.renderChildProgressScreen();
    } else if (screenId === 'screenChildProfile') {
      this.renderChildProfileScreen();
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  updateKokoMood(mood) {
    this.kokoMood = mood;
    const moodImgMap = {
      happy: 'assets/koko_happy.png',
      thinking: 'assets/koko_thinking.png',
      excited: 'assets/koko_excited.png'
    };
    const avatarEls = document.querySelectorAll('.koko-dynamic-avatar');
    avatarEls.forEach(img => {
      img.src = moodImgMap[mood] || moodImgMap.happy;
    });
  }

  renderHeaderStats() {
    const starCountEls = document.querySelectorAll('.star-count');
    starCountEls.forEach(el => el.textContent = this.child.stars);
  }

  renderHomeGreetingAndStreak() {
    const childNameEls = document.querySelectorAll('.child-name-text');
    childNameEls.forEach(el => el.textContent = this.child.name);

    // Update streak and today adventure duration
    const streakEl = document.getElementById('streakDaysVal');
    if (streakEl) streakEl.textContent = `${this.child.streakDays} day streak`;

    const goalEl = document.getElementById('todayGoalProgress');
    if (goalEl) {
      const pct = Math.min(100, Math.round((this.child.todayMinutes / this.child.dailyGoalMinutes) * 100));
      goalEl.style.width = `${pct}%`;
    }

    const goalTextEl = document.getElementById('todayGoalText');
    if (goalTextEl) {
      goalTextEl.textContent = `${this.child.todayMinutes} / ${this.child.dailyGoalMinutes} mins`;
    }
  }

  addStars(count = 1) {
    this.child.stars += count;
    this.child.levelProgress = Math.min(100, (this.child.stars % 20) * 5);
    if (this.child.stars >= 20 && this.child.level === "Star Cadet") {
      this.child.level = "Super Explorer";
      this.showToast("🌟 Level Up! You are now a Super Explorer!");
    } else if (this.child.stars >= 40 && this.child.level === "Super Explorer") {
      this.child.level = "Master Champion";
      this.showToast("🏆 Level Up! You are now a Master Champion!");
    }
    this.saveProfile();
    this.renderHeaderStats();
    this.audio.playSparkle();
    this.triggerConfetti();
  }

  triggerConfetti() {
    const confettiContainer = document.getElementById('confettiOverlay');
    if (!confettiContainer) return;
    confettiContainer.innerHTML = '';
    confettiContainer.classList.add('active');

    const colors = ['#f43f5e', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'];
    for (let i = 0; i < 35; i++) {
      const piece = document.createElement('div');
      piece.className = 'confetti-piece';
      piece.style.left = `${Math.random() * 100}%`;
      piece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      piece.style.animationDelay = `${Math.random() * 0.4}s`;
      confettiContainer.appendChild(piece);
    }

    setTimeout(() => {
      confettiContainer.classList.remove('active');
      confettiContainer.innerHTML = '';
    }, 2200);
  }

  // --- ONBOARDING ACCOUNT CREATION ---
  finishOnboarding() {
    const nameInput = document.getElementById('onboardNameInput');
    const ageSelect = document.getElementById('onboardAgeSelect');
    const pinInput = document.getElementById('onboardPinInput');

    const name = nameInput && nameInput.value.trim() ? nameInput.value.trim() : "David";
    const age = ageSelect ? parseInt(ageSelect.value) : 7;
    const pin = pinInput && pinInput.value.trim().length === 4 ? pinInput.value.trim() : "1234";

    this.child.name = name;
    this.child.age = age;
    this.child.pin = pin;
    this.child.isRegistered = true;
    this.child.stars = 0;
    this.child.todayMinutes = 0;
    this.child.streakDays = 1;
    this.child.weeklyStats = {
      learningTimeMinutes: 0,
      songsPlayed: 0,
      storiesRead: 0,
      activitiesCompleted: 0,
      mathQuestionsAnswered: 0,
      mathCorrect: 0,
      readingQuestionsAnswered: 0,
      readingCorrect: 0,
      quizQuestionsAnswered: 0,
      quizCorrect: 0,
      wordsLearned: 0
    };

    this.saveProfile();
    this.audio.playCheer();
    this.triggerConfetti();
    this.showScreen('screenHome');
    this.audio.speak(`Welcome to KOKO, ${this.child.name}! I am so happy to be your friend!`);
  }

  selectOnboardAvatar(avatarSrc) {
    this.audio.playPop();
    this.child.avatar = avatarSrc;
    document.querySelectorAll('.onboard-avatar-opt').forEach(opt => {
      opt.classList.toggle('selected', opt.getAttribute('data-src') === avatarSrc);
    });
  }

  // --- VOICE & TALK TO KOKO ---
  renderTalkScreen() {
    const container = document.getElementById('chatMessages');
    if (!container) return;

    container.innerHTML = this.chatHistory.map(msg => `
      <div class="chat-bubble chat-bubble-${msg.sender}">
        ${msg.sender === 'koko' ? '<img src="assets/koko_happy.png" class="chat-avatar" alt="Koko">' : ''}
        <div class="bubble-content">${msg.text}</div>
      </div>
    `).join('');

    container.scrollTop = container.scrollHeight;
  }

  sendChatMessage(childText) {
    if (!childText || !childText.trim()) return;

    this.chatHistory.push({ sender: 'child', text: childText });
    this.renderTalkScreen();
    this.updateKokoMood('thinking');
    this.recordActivity('chat');

    setTimeout(() => {
      const lower = childText.toLowerCase();
      let reply = "That's so awesome! 😄 I love learning new things with you! Should we solve a math puzzle or sing a song?";

      for (const intent of this.data.conversationIntents) {
        if (intent.keywords.some(k => lower.includes(k))) {
          reply = intent.reply;
          break;
        }
      }

      const mathMatch = childText.match(/(\d+)\s*([\+\-\*\/])\s*(\d+)/);
      if (mathMatch) {
        const num1 = parseInt(mathMatch[1]);
        const op = mathMatch[2];
        const num2 = parseInt(mathMatch[3]);
        let res = 0;
        if (op === '+') res = num1 + num2;
        if (op === '-') res = num1 - num2;
        if (op === '*') res = num1 * num2;
        if (op === '/') res = Math.floor(num1 / num2);
        reply = `Let's solve this together! 🧮 ${num1} ${op} ${num2}... What should we do first? That equals ${res}! You are super smart!`;
      }

      this.chatHistory.push({ sender: 'koko', text: reply });
      this.updateKokoMood('excited');
      this.renderTalkScreen();

      const waveEl = document.getElementById('voiceWaveAnim');
      if (waveEl) waveEl.classList.add('talking');
      this.audio.speak(reply, () => {
        if (waveEl) waveEl.classList.add('talking');
      }, () => {
        if (waveEl) waveEl.classList.remove('talking');
        this.updateKokoMood('happy');
      });
    }, 600);
  }

  toggleMicrophone() {
    const micBtn = document.getElementById('micButton');
    const waveEl = document.getElementById('voiceWaveAnim');

    if (this.audio.isListening) {
      if (micBtn) micBtn.classList.remove('listening');
      if (waveEl) waveEl.classList.remove('listening');
      return;
    }

    if (micBtn) micBtn.classList.add('listening');
    if (waveEl) waveEl.classList.add('listening');
    this.updateKokoMood('thinking');

    this.audio.startListening(
      (text) => {
        if (micBtn) micBtn.classList.remove('listening');
        if (waveEl) waveEl.classList.remove('listening');
        this.sendChatMessage(text);
      },
      (errorMsg) => {
        if (micBtn) micBtn.classList.remove('listening');
        if (waveEl) waveEl.classList.remove('listening');
        this.updateKokoMood('happy');
        alert(errorMsg);
      },
      () => {},
      () => {
        if (micBtn) micBtn.classList.remove('listening');
        if (waveEl) waveEl.classList.remove('listening');
      }
    );
  }

  // --- SINGING EXPERIENCE ---
  renderSingScreen() {
    const song = this.data.songs[this.selectedSongIdx];
    if (!song) return;

    document.getElementById('songTitle').textContent = song.title;
    document.getElementById('songCategory').textContent = `${song.badgeIcon || '🎵'} ${song.category}`;
    document.getElementById('songAuthor').textContent = song.author;

    const lyricsContainer = document.getElementById('karaokeLyrics');
    if (lyricsContainer) {
      lyricsContainer.innerHTML = song.lyrics.map((l, idx) => `
        <div class="lyric-line ${idx === this.currentLyricIdx ? 'active' : ''}" id="lyric_${idx}">
          ${l.text}
        </div>
      `).join('');
    }

    const listContainer = document.getElementById('songPills');
    if (listContainer) {
      listContainer.innerHTML = this.data.songs.map((s, idx) => `
        <button class="song-pill-btn ${idx === this.selectedSongIdx ? 'active' : ''}" onclick="kokoApp.selectSong(${idx})">
          ${s.badgeIcon || '🎵'} ${s.category}
        </button>
      `).join('');
    }
  }

  selectSong(idx) {
    this.audio.playPop();
    this.selectedSongIdx = idx;
    this.currentLyricIdx = 0;
    this.stopSong();
    this.renderSingScreen();
  }

  prevSong() {
    const newIdx = (this.selectedSongIdx - 1 + this.data.songs.length) % this.data.songs.length;
    this.selectSong(newIdx);
  }

  nextSong() {
    const newIdx = (this.selectedSongIdx + 1) % this.data.songs.length;
    this.selectSong(newIdx);
  }

  toggleSongPlay() {
    if (this.isPlayingSong) {
      this.stopSong();
    } else {
      this.playSong();
    }
  }

  playSong() {
    this.isPlayingSong = true;
    const playBtn = document.getElementById('btnPlaySong');
    if (playBtn) playBtn.innerHTML = '⏸️ Pause';

    const singerImg = document.getElementById('singingKokoImg');
    if (singerImg) singerImg.classList.add('bouncing');

    const song = this.data.songs[this.selectedSongIdx];
    this.recordActivity('song');

    this.audio.playSongMelody(song, (beatIdx) => {
      const lyricStep = Math.floor(beatIdx / 4);
      if (lyricStep < song.lyrics.length) {
        this.highlightLyric(lyricStep);
      } else {
        this.stopSong();
        this.addStars(2);
      }
    });

    if (song.lyrics[0]) {
      this.audio.speak(song.lyrics[0].text.replace(/[^\w\s]/gi, ''));
    }
  }

  stopSong() {
    this.isPlayingSong = false;
    this.audio.stopMusic();
    const playBtn = document.getElementById('btnPlaySong');
    if (playBtn) playBtn.innerHTML = '▶️ Sing Together';
    const singerImg = document.getElementById('singingKokoImg');
    if (singerImg) singerImg.classList.remove('bouncing');
  }

  highlightLyric(idx) {
    this.currentLyricIdx = idx;
    const allLines = document.querySelectorAll('.lyric-line');
    allLines.forEach((l, i) => {
      if (i === idx) l.classList.add('active');
      else l.classList.remove('active');
    });

    const activeLine = document.getElementById(`lyric_${idx}`);
    if (activeLine) {
      activeLine.scrollIntoView({ behavior: 'smooth', block: 'center' });
      const song = this.data.songs[this.selectedSongIdx];
      if (song && song.lyrics[idx]) {
        this.audio.speak(song.lyrics[idx].text.replace(/[^\w\s]/gi, ''));
      }
    }
  }

  // --- MATHS ACTIVITY ---
  renderMathScreen() {
    const level = this.data.mathsLevels[this.selectedMathLevel];
    const q = level.questions[this.mathQuestionIdx];

    document.getElementById('mathLevelBadge').textContent = level.name;
    document.getElementById('mathProgressText').textContent = `Question ${this.mathQuestionIdx + 1} of ${level.questions.length}`;
    document.getElementById('mathPrompt').textContent = q.prompt;
    document.getElementById('mathVisual').textContent = q.visual;

    const feedbackBox = document.getElementById('mathFeedback');
    feedbackBox.style.display = 'none';

    const optContainer = document.getElementById('mathOptions');
    optContainer.innerHTML = q.options.map((opt) => `
      <button class="math-opt-btn" onclick="kokoApp.checkMathAnswer('${opt}')">
        ${opt}
      </button>
    `).join('');

    // Clear typed box
    const typedInput = document.getElementById('mathTypedInput');
    if (typedInput) typedInput.value = '';
  }

  selectMathLevel(lvlIdx) {
    this.audio.playPop();
    this.selectedMathLevel = lvlIdx;
    this.mathQuestionIdx = 0;

    document.querySelectorAll('.math-level-pill').forEach((btn, i) => {
      if (i === lvlIdx) btn.classList.add('active');
      else btn.classList.remove('active');
    });

    this.renderMathScreen();
  }

  toggleMathInputMode() {
    this.audio.playPop();
    this.mathInputMode = this.mathInputMode === 'choice' ? 'typed' : 'choice';
    const choiceBox = document.getElementById('mathChoiceBox');
    const typedBox = document.getElementById('mathTypedBox');
    const toggleBtn = document.getElementById('btnToggleMathMode');

    if (this.mathInputMode === 'typed') {
      choiceBox.style.display = 'none';
      typedBox.style.display = 'flex';
      toggleBtn.textContent = 'Switch to Choice Mode 🔘';
    } else {
      choiceBox.style.display = 'block';
      typedBox.style.display = 'none';
      toggleBtn.textContent = 'Type My Answer ⌨️';
    }
  }

  checkTypedMathAnswer() {
    const input = document.getElementById('mathTypedInput');
    if (!input || !input.value.trim()) return;
    this.checkMathAnswer(input.value.trim());
  }

  showMathHint() {
    const q = this.data.mathsLevels[this.selectedMathLevel].questions[this.mathQuestionIdx];
    this.updateKokoMood('thinking');
    this.audio.speak(q.kokoHint);

    const feedbackBox = document.getElementById('mathFeedback');
    feedbackBox.style.display = 'block';
    feedbackBox.className = 'feedback-box feedback-hint';
    feedbackBox.innerHTML = `💡 <strong>Koko's Hint:</strong> ${q.kokoHint}`;
  }

  checkMathAnswer(chosen) {
    const q = this.data.mathsLevels[this.selectedMathLevel].questions[this.mathQuestionIdx];
    const isCorrect = String(chosen).replace(/[^\w]/g, '').toLowerCase() === String(q.correct).replace(/[^\w]/g, '').toLowerCase() ||
                      (q.numericAnswer && String(chosen) === String(q.numericAnswer));
    const feedbackBox = document.getElementById('mathFeedback');
    feedbackBox.style.display = 'block';

    this.recordActivity('math', isCorrect);

    if (isCorrect) {
      this.addStars(1);
      this.updateKokoMood('excited');
      this.audio.playSparkle();
      this.audio.speak("YES! 🎉 You got it!");

      feedbackBox.className = 'feedback-box feedback-correct';
      feedbackBox.innerHTML = `
        🎉 <strong>YES! You got it!</strong> ${q.explanation}
        <br><br>
        <button class="btn-bubble btn-bubble-green" onclick="kokoApp.nextMathQuestion()">Next Question ➡️</button>
      `;
    } else {
      this.updateKokoMood('thinking');
      this.audio.playGentleTry();
      this.audio.speak("Nice try! Let's think about it together.");

      feedbackBox.className = 'feedback-box feedback-try';
      feedbackBox.innerHTML = `
        😊 <strong>Nice try!</strong> ${q.kokoHint}
      `;
    }
  }

  nextMathQuestion() {
    const level = this.data.mathsLevels[this.selectedMathLevel];
    if (this.mathQuestionIdx + 1 < level.questions.length) {
      this.mathQuestionIdx++;
      this.renderMathScreen();
    } else {
      this.audio.playCheer();
      this.addStars(3);
      const feedbackBox = document.getElementById('mathFeedback');
      feedbackBox.className = 'feedback-box feedback-correct';
      feedbackBox.innerHTML = `
        🏆 <strong>Level Complete!</strong> Outstanding work!
        <br><br>
        <button class="btn-bubble btn-bubble-blue" onclick="kokoApp.showScreen('screenHome')">Back to Home 🏠</button>
      `;
    }
  }

  // --- STORY WORLD ---
  renderStoryScreen() {
    const story = this.data.stories[this.selectedStoryIdx];
    if (!story) return;

    document.getElementById('storyTitle').textContent = story.title;
    document.getElementById('storyCategory').textContent = story.category;

    const branch = story.branches[this.currentStoryBranch] || story.branches.root;
    document.getElementById('storyNarrative').textContent = this.currentStoryBranch === 'root' ? `${story.intro}\n\n${branch.text}` : branch.text;

    const choicesContainer = document.getElementById('storyChoices');
    if (branch.isEnd) {
      this.recordActivity('story');
      choicesContainer.innerHTML = `
        <div class="story-lesson-box">
          🌟 <strong>Koko's Wisdom:</strong> ${branch.lesson}
        </div>
        <button class="btn-bubble btn-bubble-blue mt-3" onclick="kokoApp.restartStory()">
          🔄 Read Again
        </button>
        <button class="btn-bubble btn-bubble-purple mt-3" onclick="kokoApp.switchStory(1)">
          Next Story ➡️
        </button>
      `;
      this.addStars(2);
      this.audio.speak(branch.lesson);
    } else {
      choicesContainer.innerHTML = branch.choices.map(c => `
        <button class="story-choice-btn" onclick="kokoApp.chooseStoryBranch('${c.next}', '${c.text.replace(/'/g, "\\'")}')">
          ${c.text}
        </button>
      `).join('');
    }
  }

  chooseStoryBranch(nextBranchId, choiceText) {
    this.audio.playPop();
    this.currentStoryBranch = nextBranchId;
    this.renderStoryScreen();
    const branch = this.data.stories[this.selectedStoryIdx].branches[nextBranchId];
    if (branch) {
      this.audio.speak(branch.text.substring(0, 100));
    }
  }

  restartStory() {
    this.audio.playPop();
    this.currentStoryBranch = 'root';
    this.renderStoryScreen();
  }

  switchStory(idx) {
    this.audio.playPop();
    this.selectedStoryIdx = (idx) % this.data.stories.length;
    this.currentStoryBranch = 'root';
    this.renderStoryScreen();
  }

  // --- 3 MINI-GAMES ---
  renderGameScreen() {
    const gameType = this.currentGameType;

    const bananaCard = document.getElementById('bananaMathCard');
    const memoryCard = document.getElementById('memoryMatchCard');
    const detectiveCard = document.getElementById('wordDetectiveCard');

    bananaCard.style.display = gameType === 'bananaMath' ? 'block' : 'none';
    wordDetectiveCard.style.display = gameType === 'wordDetective' ? 'block' : 'none';
    memoryCard.style.display = gameType === 'memoryMatch' ? 'block' : 'none';

    if (gameType === 'bananaMath') {
      this.renderBananaMath();
    } else if (gameType === 'wordDetective') {
      this.renderWordDetective();
    } else if (gameType === 'memoryMatch') {
      this.initMemoryMatch();
    }
  }

  selectGameTab(type) {
    this.audio.playPop();
    this.currentGameType = type;
    this.gameQuestionIdx = 0;

    document.querySelectorAll('.game-tab-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-game') === type);
    });

    this.renderGameScreen();
  }

  renderBananaMath() {
    const list = this.data.miniGames.bananaMath;
    const q = list[this.gameQuestionIdx % list.length];
    document.getElementById('bananaStory').textContent = q.story;
    document.getElementById('bananaQuestion').textContent = q.question;

    const optsContainer = document.getElementById('bananaOptions');
    optsContainer.innerHTML = q.options.map(opt => `
      <button class="game-opt-btn" onclick="kokoApp.checkBananaAnswer(${opt === q.correct}, '${q.explanation}')">
        ${opt}
      </button>
    `).join('');

    document.getElementById('bananaFeedback').style.display = 'none';
  }

  checkBananaAnswer(isCorrect, explanation) {
    const feedbackBox = document.getElementById('bananaFeedback');
    feedbackBox.style.display = 'block';
    this.recordActivity('play', isCorrect);

    if (isCorrect) {
      this.addStars(1);
      this.updateKokoMood('excited');
      this.audio.playSparkle();
      this.audio.speak("Amazing! You got it!");

      feedbackBox.className = 'feedback-box feedback-correct';
      feedbackBox.innerHTML = `
        🎉 <strong>You got it!</strong> ${explanation}
        <br><br>
        <button class="btn-bubble btn-bubble-green" onclick="kokoApp.nextBananaQuestion()">Next Round ➡️</button>
      `;
    } else {
      this.updateKokoMood('thinking');
      this.audio.playGentleTry();
      this.audio.speak("Nice try! Let's think about it together.");

      feedbackBox.className = 'feedback-box feedback-try';
      feedbackBox.innerHTML = `😊 <strong>Nice try!</strong> Count the ripe bananas one by one!`;
    }
  }

  nextBananaQuestion() {
    this.gameQuestionIdx++;
    this.renderBananaMath();
  }

  renderWordDetective() {
    const list = this.data.miniGames.wordDetective;
    const q = list[this.gameQuestionIdx % list.length];
    document.getElementById('detectiveClue').textContent = q.clue;

    const optsContainer = document.getElementById('detectiveOptions');
    optsContainer.innerHTML = q.options.map(opt => `
      <button class="game-opt-btn" onclick="kokoApp.checkDetectiveAnswer(${opt.correct}, '${q.explanation}')">
        ${opt.text}
      </button>
    `).join('');

    document.getElementById('detectiveFeedback').style.display = 'none';
  }

  checkDetectiveAnswer(isCorrect, explanation) {
    const feedbackBox = document.getElementById('detectiveFeedback');
    feedbackBox.style.display = 'block';
    this.recordActivity('play', isCorrect);

    if (isCorrect) {
      this.addStars(1);
      this.updateKokoMood('excited');
      this.audio.playSparkle();
      this.audio.speak("Splendid deduction, detective!");

      feedbackBox.className = 'feedback-box feedback-correct';
      feedbackBox.innerHTML = `
        🎉 <strong>Case Solved!</strong> ${explanation}
        <br><br>
        <button class="btn-bubble btn-bubble-green" onclick="kokoApp.nextDetectiveQuestion()">Next Clue ➡️</button>
      `;
    } else {
      this.updateKokoMood('thinking');
      this.audio.playGentleTry();
      feedbackBox.className = 'feedback-box feedback-try';
      feedbackBox.innerHTML = `😊 <strong>Nice try!</strong> Think about what words bring a smile!`;
    }
  }

  nextDetectiveQuestion() {
    this.gameQuestionIdx++;
    this.renderWordDetective();
  }

  // Memory Match Card Game
  initMemoryMatch() {
    const deckTemplate = this.data.miniGames.memoryMatch;
    // Create pairs (6 cards total)
    const cards = [...deckTemplate, ...deckTemplate].map((item, idx) => ({
      uniqueId: idx,
      matchId: item.id,
      icon: item.icon,
      name: item.name,
      flipped: false,
      matched: false
    }));

    // Shuffle deck
    this.memoryCards = cards.sort(() => Math.random() - 0.5);
    this.flippedCards = [];
    this.matchedPairsCount = 0;
    this.renderMemoryGrid();
  }

  renderMemoryGrid() {
    const grid = document.getElementById('memoryGrid');
    if (!grid) return;

    grid.innerHTML = this.memoryCards.map(c => `
      <div class="memory-card ${c.flipped || c.matched ? 'flipped' : ''}" onclick="kokoApp.flipMemoryCard(${c.uniqueId})">
        <div class="memory-card-inner">
          <div class="memory-card-front">❓</div>
          <div class="memory-card-back">${c.icon}</div>
        </div>
      </div>
    `).join('');
  }

  flipMemoryCard(uniqueId) {
    if (this.flippedCards.length >= 2) return;
    const card = this.memoryCards.find(c => c.uniqueId === uniqueId);
    if (!card || card.flipped || card.matched) return;

    this.audio.playPop();
    card.flipped = true;
    this.flippedCards.push(card);
    this.renderMemoryGrid();

    if (this.flippedCards.length === 2) {
      const [c1, c2] = this.flippedCards;
      if (c1.matchId === c2.matchId) {
        c1.matched = true;
        c2.matched = true;
        this.matchedPairsCount++;
        this.audio.playSparkle();
        this.flippedCards = [];
        this.renderMemoryGrid();

        if (this.matchedPairsCount === 3) {
          this.recordActivity('play', true);
          this.addStars(2);
          this.audio.playCheer();
          const feedback = document.getElementById('memoryFeedback');
          if (feedback) {
            feedback.style.display = 'block';
            feedback.innerHTML = `🎉 <strong>Memory Champion!</strong> You matched all the pairs! <br><br>
              <button class="btn-bubble btn-bubble-green" onclick="kokoApp.initMemoryMatch()">Play Again 🔄</button>`;
          }
        }
      } else {
        setTimeout(() => {
          c1.flipped = false;
          c2.flipped = false;
          this.flippedCards = [];
          this.renderMemoryGrid();
        }, 900);
      }
    }
  }

  // --- KOKO QUIZ ---
  renderQuizScreen() {
    const q = this.data.quizzes[this.quizIdx % this.data.quizzes.length];
    document.getElementById('quizQuestion').textContent = q.question;

    const imgEl = document.getElementById('quizIllustration');
    if (q.image) {
      imgEl.src = q.image;
      imgEl.style.display = 'block';
    } else {
      imgEl.style.display = 'none';
    }

    const feedbackBox = document.getElementById('quizFeedback');
    feedbackBox.style.display = 'none';

    const optsContainer = document.getElementById('quizOptions');
    optsContainer.innerHTML = q.options.map(opt => `
      <button class="quiz-opt-btn" onclick="kokoApp.checkQuizAnswer('${opt}')">
        ${opt}
      </button>
    `).join('');
  }

  checkQuizAnswer(chosen) {
    const q = this.data.quizzes[this.quizIdx % this.data.quizzes.length];
    const isCorrect = chosen === q.correct;
    const feedbackBox = document.getElementById('quizFeedback');
    feedbackBox.style.display = 'block';

    this.recordActivity('quiz', isCorrect);

    if (isCorrect) {
      this.addStars(1);
      this.updateKokoMood('excited');
      this.audio.playSparkle();
      this.audio.speak(q.kokoCheer);

      feedbackBox.className = 'feedback-box feedback-correct';
      feedbackBox.innerHTML = `
        🎉 <strong>Spot On!</strong> ${q.kokoCheer}
        <br><br>
        <button class="btn-bubble btn-bubble-green" onclick="kokoApp.nextQuiz()">Next Question ➡️</button>
      `;
    } else {
      this.updateKokoMood('thinking');
      this.audio.playGentleTry();
      this.audio.speak("Hmmmm… nice try! Let's think about it together.");

      feedbackBox.className = 'feedback-box feedback-try';
      feedbackBox.innerHTML = `
        😄 <strong>Hmmmm… nice try!</strong> Let's think about it together. Give it another shot!
      `;
    }
  }

  nextQuiz() {
    this.quizIdx++;
    this.renderQuizScreen();
  }

  // --- LANGUAGE LEARNING ---
  renderLanguageScreen() {
    const lang = this.data.languages[this.currentLangKey];
    const item = lang.words[this.langWordIdx % lang.words.length];

    document.getElementById('langTitle').textContent = `Learn ${lang.name}`;
    document.getElementById('langCardEnglish').textContent = `${item.icon} ${item.english}`;
    document.getElementById('langCardNative').textContent = item.word;
    document.getElementById('langCardPhonetic').textContent = `Say it: "${item.pronunciation}"`;

    const tabsContainer = document.getElementById('langTabs');
    if (tabsContainer) {
      tabsContainer.innerHTML = Object.keys(this.data.languages).map(key => `
        <button class="lang-tab-pill ${key === this.currentLangKey ? 'active' : ''}" onclick="kokoApp.selectLanguage('${key}')">
          ${this.data.languages[key].name}
        </button>
      `).join('');
    }
  }

  selectLanguage(key) {
    this.audio.playPop();
    this.currentLangKey = key;
    this.langWordIdx = 0;
    this.renderLanguageScreen();
  }

  speakCurrentWord() {
    const lang = this.data.languages[this.currentLangKey];
    const item = lang.words[this.langWordIdx % lang.words.length];
    this.audio.speak(`${item.word}! In English, that means ${item.english}.`);
  }

  nextLangWord() {
    this.audio.playPop();
    this.recordActivity('language');
    this.addStars(1);
    this.langWordIdx++;
    this.renderLanguageScreen();
  }

  // --- CHILD PROGRESS SCREEN (CHILD'S VIEW) ---
  renderChildProgressScreen() {
    document.getElementById('childLevelTitle').textContent = this.child.level;
    document.getElementById('childTotalStars').textContent = this.child.stars;
    document.getElementById('childStreak').textContent = `${this.child.streakDays} Day Streak 🔥`;
    document.getElementById('childLevelBar').style.width = `${this.child.levelProgress}%`;

    const badgesContainer = document.getElementById('childBadgesGrid');
    if (badgesContainer) {
      badgesContainer.innerHTML = this.child.badges.map(b => `
        <div class="badge-card ${b.unlocked ? 'unlocked' : 'locked'}">
          <div class="badge-icon">${b.icon}</div>
          <div class="badge-title">${b.title}</div>
          <div class="badge-status">${b.unlocked ? '✅ Unlocked' : '🔒 Locked'}</div>
        </div>
      `).join('');
    }
  }

  // --- CHILD PROFILE SCREEN ---
  renderChildProfileScreen() {
    document.getElementById('profileChildName').textContent = this.child.name;
    document.getElementById('profileChildAge').textContent = `Age ${this.child.age}`;
    document.getElementById('profileChildLevel').textContent = this.child.level;
    document.getElementById('profileChildStars').textContent = `${this.child.stars} Stars`;
  }

  // --- PARENT DASHBOARD & CONTROLS ---
  renderParentDashboard() {
    const stats = this.child.weeklyStats;
    document.getElementById('parentChildName').textContent = `${this.child.name}'s Progress (Age ${this.child.age})`;

    // Live Recorded Metrics (clean as new starting at 0)
    const mins = stats.learningTimeMinutes;
    const hoursPart = Math.floor(mins / 60);
    const minsPart = mins % 60;
    document.getElementById('parentTime').textContent = hoursPart > 0 ? `${hoursPart}h ${minsPart}m` : `${minsPart}m`;
    document.getElementById('parentSongs').textContent = stats.songsPlayed;
    document.getElementById('parentStories').textContent = stats.storiesRead;
    document.getElementById('parentActivities').textContent = stats.activitiesCompleted;

    // Dynamic Live Subject Mastery Calculation based on actual recorded answers
    const mathPct = stats.mathQuestionsAnswered > 0 ? Math.round((stats.mathCorrect / stats.mathQuestionsAnswered) * 100) : 0;
    const readingPct = stats.storiesRead > 0 ? Math.min(100, stats.storiesRead * 25) : 0;
    const problemPct = stats.quizQuestionsAnswered > 0 ? Math.round((stats.quizCorrect / stats.quizQuestionsAnswered) * 100) : 0;
    const songPct = stats.songsPlayed > 0 ? Math.min(100, stats.songsPlayed * 30) : 0;

    document.getElementById('progMath').style.width = `${mathPct}%`;
    document.getElementById('valMath').textContent = `${mathPct}%`;

    document.getElementById('progRead').style.width = `${readingPct}%`;
    document.getElementById('valRead').textContent = `${readingPct}%`;

    document.getElementById('progSolve').style.width = `${problemPct}%`;
    document.getElementById('valSolve').textContent = `${problemPct}%`;

    document.getElementById('progCreate').style.width = `${songPct}%`;
    document.getElementById('valCreate').textContent = `${songPct}%`;

    // Dynamic AI Insight based on recorded telemetry
    const insightText = document.getElementById('aiInsightText');
    if (insightText) {
      if (stats.activitiesCompleted === 0) {
        insightText.textContent = `${this.child.name} has just started! Koko recommends beginning with a friendly 5-minute song or Level 1 math counting.`;
      } else if (mathPct > 0 && mathPct < 70) {
        insightText.textContent = `Koko noticed that ${this.child.name} is building confidence in maths. Recommended: 10-minute Level 1 addition adventure!`;
      } else if (stats.songsPlayed >= 2) {
        insightText.textContent = `${this.child.name} loves music and rhymes! Singing helps expand vocabulary and rhythm.`;
      } else {
        insightText.textContent = `Great progress this week! ${this.child.name} has completed ${stats.activitiesCompleted} educational activities with Koko.`;
      }
    }
  }

  // PIN Lock Pad for Parent Access
  pressPinDigit(digit) {
    this.audio.playPop();
    if (this.enteredPin.length < 4) {
      this.enteredPin += digit;
      this.updatePinDots();
    }
    if (this.enteredPin.length === 4) {
      if (this.enteredPin === this.child.pin) {
        this.enteredPin = '';
        this.updatePinDots();
        this.renderParentDashboard();
        this.showScreen('screenParentDashboard');
      } else {
        this.audio.playGentleTry();
        const pinError = document.getElementById('pinError');
        if (pinError) pinError.textContent = `Incorrect PIN. Default is ${this.child.pin}`;
        this.enteredPin = '';
        setTimeout(() => this.updatePinDots(), 500);
      }
    }
  }

  clearPin() {
    this.enteredPin = '';
    this.updatePinDots();
  }

  updatePinDots() {
    const dots = document.querySelectorAll('.pin-dot');
    dots.forEach((dot, idx) => {
      if (idx < this.enteredPin.length) dot.classList.add('filled');
      else dot.classList.remove('filled');
    });
  }

  // Bind Buttons & Setup
  bindEvents() {
    const soundToggle = document.getElementById('btnToggleSound');
    if (soundToggle) {
      soundToggle.addEventListener('click', () => {
        this.audio.muted = !this.audio.muted;
        soundToggle.textContent = this.audio.muted ? '🔇' : '🔊';
      });
    }

    const chatInput = document.getElementById('chatTextInput');
    const chatSendBtn = document.getElementById('chatSendBtn');
    if (chatSendBtn && chatInput) {
      const sendAction = () => {
        const val = chatInput.value;
        chatInput.value = '';
        this.sendChatMessage(val);
      };
      chatSendBtn.addEventListener('click', sendAction);
      chatInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') sendAction();
      });
    }
  }
}

window.addEventListener('DOMContentLoaded', () => {
  window.kokoApp = new KokoApp();
});
