# 🌟 KOKO: Play. Sing. Learn. Grow.

> **A child-friendly AI companion and learning web app for Nigerian and African children ages 5–10.**

![KOKO Banner](assets/koko_hero.png)

KOKO is a lovable, animated AI friend that keeps children entertained while naturally helping them learn. It feels more like a character children want to visit than an educational website.

---

## 🎯 Target Audience
* **Primary Users**: Children ages 5–10.
* **Paying Customers**: Parents & guardians.
* **Secondary Market**: Schools, after-school programs, and children's entertainment brands.

---

## ✨ Core Features

### 1. 💬 Talk to Koko (Voice & AI Chat)
* **Voice-First Experience**: Children can tap the large microphone button and talk to Koko.
* **Child-Safe AI Personality**: Friendly, curious, encouraging, patient, and never judgmental.
* **Voice Synthesis**: Koko speaks back with cheerful, natural child-like audio and animated expressions.

### 2. 🎵 Sing with Koko (Music Studio)
* **Original & Cultural Songs**:
  * 🎵 *The Amazing Me* (Original Song • Koko)
  * 🔢 *Count The Bananas!* (Maths Song)
  * 🔤 *ABC Safari Adventure* (African Wildlife Alphabet)
  * 🇳🇬 *Welcome Friend (Nnoo / E Kaabo / Sannu)* (African Cultural Anthem)
  * 🎂 *Happy Birthday Superstar!*
  * 💃 *Jump & Shake Dance Groove*
  * 😴 *Soft Moon & Starry Night* (Bedtime Lullaby)
* **Karaoke Lyrics**: Synchronized line-by-line highlighting so kids can read and sing along.

### 3. 🧮 Maths with Koko (3 Age Levels)
* **Level 1 (Ages 5–6)**: Counting, visual objects, addition, subtraction, shapes, and patterns.
* **Level 2 (Ages 7–8)**: Multiplication, division, word problems, and Nigerian Naira currency (₦).
* **Level 3 (Ages 9–10)**: Fractions, decimals, proportions, and logic puzzles.
* **Socratic Teaching**: A dedicated **💡 "What should we do first?"** hint button that guides the child step-by-step rather than just giving away answers.
* **Input Modes**: Supports both visual multiple-choice and numeric typed answer modes.

### 4. 📖 Story World (Choose-Your-Own-Adventure)
* Interactive branching stories where the child's decisions shape the narrative:
  * 🚀 *The Brave Little Girl* (Amina the astronaut in Lagos & ancient African astronomers)
  * 🦁 *Tortoise & The Feast in the Sky* (African folklore on honesty and sharing)
  * ✨ *The Magic of the Golden Baobab* (Community, wisdom, and caring for others)
* Every adventure concludes with an inspiring moral life lesson.

### 5. 🎮 3 Educational Mini-Games
* 🍌 **Banana Math**: Help the monkey count ripe bananas.
* 🔎 **Word Detective**: Vocabulary discovery and deductive reasoning.
* 🎴 **Memory Match**: Interactive 6-card flip game to build working memory.

### 6. 🧠 Koko Quiz
* Age-appropriate questions covering animals, days of the week, plant biology, and African geography.
* Cheerful feedback that never shames mistakes (*"Hmmmm… nice try! 😄 Let's think about it together."*).

### 7. 🇳🇬 African Languages Hub
* Interactive flashcards with audio pronunciations:
  * 🟢 **Igbo**: *Mmiri* (Water), *Nnoo* (Welcome), *Daalu* (Thank you).
  * 🟣 **Yoruba**: *Omi* (Water), *E kaabo* (Welcome), *E se* (Thank you).
  * 🔵 **Hausa**: *Ruwa* (Water), *Sannu* (Hello), *Nagode* (Thank you).
  * 🇳🇬 **Nigerian Pidgin**: *How you dey?*, *I dey fine*, *No wahala*.

### 8. 🌟 Child Progress & Achievement Room
* Visual Star Trophy 🏆.
* Streak counter (🔥 Day streak).
* Level progression (*Star Cadet ➔ Super Explorer ➔ Master Champion*).
* Collectible badge awards.

### 9. 👨‍👩‍👧 Parent Dashboard & Parental Controls (PIN Protected)
* **Live Recorded Telemetry**: Starts clean as new upon account creation and records live learning time, songs played, stories read, and activities completed.
* **Dynamic Subject Mastery**: Real-time accuracy metrics for Maths, Reading & Vocab, Problem Solving, and Creativity.
* **AI Learning Insights**: Constructive recommendations based on actual child activity.
* **Working Parental Controls**:
  * ⏱️ Daily usage time limit (e.g. 2 hours / day).
  * 🌙 Bedtime curfew lock (e.g. 9:00 PM).
  * 🎙️ Voice chat permissions toggle.
  * 🛡️ COPPA compliant safety guidelines.
  * 🔄 "Wipe & Start Clean As New" account reset button.

---

## 🚀 Running the App Locally

Simply run any static file server from the project directory:

```bash
# Using Python:
python -m http.server 8000

# Using Node:
npx serve .
```

Then open `http://localhost:8000/index.html` in your web browser!

---

## 📱 Tech Stack
* **Frontend**: HTML5, Vanilla JavaScript (ES6+), CSS3 with CSS variables & animations.
* **Audio & Voice**: Web Audio API (procedural synthesizers), Web Speech API (`SpeechRecognition` & `SpeechSynthesis`).
* **Storage**: LocalStorage for zero-latency offline persistence.
* **PWA**: Installable web app via `manifest.json`.

---

## 📄 License
MIT License. Created with ❤️ for children across Nigeria, Africa, and the world.
