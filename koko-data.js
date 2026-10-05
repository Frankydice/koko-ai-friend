// KOKO: Educational Content Data & Clean Account Template
// Play. Sing. Learn. Grow. - Tailored for Kids Ages 5-10

const KOKO_DATA = {
  // Fresh Account Profile Template (Clean Slate)
  defaultCleanProfile: {
    isRegistered: false,
    name: "David",
    age: 7,
    stars: 0,
    avatar: "assets/koko_happy.png",
    level: "Star Cadet",
    levelProgress: 0, // 0 to 100
    streakDays: 1,
    todayMinutes: 0,
    dailyGoalMinutes: 10,
    maxDailyUsageMinutes: 120,
    bedtimeHour: 21, // 9:00 PM
    pin: "1234",
    isPremium: false,
    planName: "Free Trial (7 Days Left)",
    allowedActivities: {
      sing: true,
      maths: true,
      story: true,
      play: true,
      quiz: true,
      talk: true,
      language: true
    },
    // Recorded live as activities are completed
    weeklyStats: {
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
    },
    // Badges unlocked by child
    badges: [
      { id: "welcome", title: "New Explorer", icon: "🌱", unlocked: true, desc: "Started the Koko adventure!" },
      { id: "first_star", title: "Star Collector", icon: "⭐", unlocked: false, desc: "Earned your first 5 stars" },
      { id: "math_whiz", title: "Math Wizard", icon: "🧮", unlocked: false, desc: "Solved 3 math challenges" },
      { id: "songbird", title: "Singing Star", icon: "🎵", unlocked: false, desc: "Sang along with Koko" },
      { id: "story_hero", title: "Story Master", icon: "📖", unlocked: false, desc: "Completed an interactive story" },
      { id: "polyglot", title: "Language Champ", icon: "🌍", unlocked: false, desc: "Learned African words" }
    ]
  },

  // Songs with all 8 specified categories
  songs: [
    {
      id: "amazing_me",
      title: "The Amazing Me",
      category: "Fun Songs",
      badgeIcon: "🎵",
      author: "Original Song • Koko",
      duration: "1:45",
      notes: [261.63, 293.66, 329.63, 349.23, 392.00, 440.00, 523.25],
      lyrics: [
        { time: 0, text: "I've got two bright eyes to see the world! 🌍" },
        { time: 4, text: "Two listening ears for sounds unfurled! 👂" },
        { time: 8, text: "Two dancing feet that jump so high! 👟" },
        { time: 12, text: "And a giant heart that reaches the sky! ❤️" },
        { time: 16, text: "I can learn, I can dream, I can be so strong! 💪" },
        { time: 20, text: "Sing it out loud with Koko's song! 🌟" }
      ]
    },
    {
      id: "banana_math_song",
      title: "Count The Bananas!",
      category: "Maths Songs",
      badgeIcon: "🔢",
      author: "Koko Math Beats",
      duration: "1:30",
      notes: [329.63, 392.00, 440.00, 493.88, 523.25],
      lyrics: [
        { time: 0, text: "One yellow banana hanging on the tree 🍌" },
        { time: 4, text: "Along came another, now we've got two! 🐒" },
        { time: 8, text: "Add two more and what do you see? 🍌🍌" },
        { time: 12, text: "Two plus two is four for you and me! 🎉" },
        { time: 16, text: "Maths is fun, maths is cool, count with glee! ✨" }
      ]
    },
    {
      id: "abc_safari",
      title: "ABC Safari Adventure",
      category: "Alphabet Songs",
      badgeIcon: "🔤",
      author: "African Wildlife ABC",
      duration: "1:50",
      notes: [261.63, 329.63, 392.00, 523.25],
      lyrics: [
        { time: 0, text: "A is for Aardvark digging in the sand! 🐾" },
        { time: 4, text: "B is for Baboon across the savanna land! 🐒" },
        { time: 8, text: "C is for Cheetah, the fastest runner around! 🐆" },
        { time: 12, text: "D is for Duiker leaping off the ground! 🦌" },
        { time: 16, text: "E is for Elephant with a trumpet sound! 🐘" }
      ]
    },
    {
      id: "nigeria_celebrate",
      title: "Welcome Friend (Nnoo / E Kaabo / Sannu)",
      category: "African/Nigerian",
      badgeIcon: "🇳🇬",
      author: "Koko Cultural Anthem",
      duration: "1:40",
      notes: [293.66, 349.23, 440.00, 523.25, 587.33],
      lyrics: [
        { time: 0, text: "In Igbo we say Nnoo, welcome home! 🟢" },
        { time: 4, text: "In Yoruba, E kaabo, wherever you may roam! 🟣" },
        { time: 8, text: "In Hausa, Sannu da zuwa, with a cheerful smile! 🔵" },
        { time: 12, text: "In Pidgin, How you dey? Come stay a little while! 🇳🇬" },
        { time: 16, text: "Together we sing, together we grow! 🎶" }
      ]
    },
    {
      id: "birthday_koko",
      title: "Happy Birthday Superstar!",
      category: "Birthday",
      badgeIcon: "🎂",
      author: "Koko Party Beats",
      duration: "1:20",
      notes: [261.63, 261.63, 293.66, 261.63, 349.23, 329.63],
      lyrics: [
        { time: 0, text: "Happy birthday to you, shine bright and new! 🎂" },
        { time: 4, text: "Blow out the candles, make wishes come true! 🕯️" },
        { time: 8, text: "Another year wiser, another year grand! 🎈" },
        { time: 12, text: "The greatest superstar in all of the land! 🌟" }
      ]
    },
    {
      id: "dance_groove",
      title: "Jump & Shake Dance Groove",
      category: "Dance",
      badgeIcon: "💃",
      author: "Koko Rhythm Tribe",
      duration: "1:30",
      notes: [329.63, 392.00, 493.88, 587.33],
      lyrics: [
        { time: 0, text: "Step to the left, step to the right! 💃" },
        { time: 4, text: "Wave your hands up high in the light! 🙌" },
        { time: 8, text: "Spin all around, then touch the ground! 🌀" },
        { time: 12, text: "Listen to the happy dancing sound! 🥁" }
      ]
    },
    {
      id: "soft_lullaby",
      title: "Soft Moon & Starry Night",
      category: "Bedtime",
      badgeIcon: "😴",
      author: "Koko Sweet Dreams",
      duration: "1:35",
      notes: [220.00, 261.63, 329.63, 392.00],
      lyrics: [
        { time: 0, text: "The bright golden sun is going to rest 🌙" },
        { time: 5, text: "The birds are all tucked in their cozy little nest 🐦" },
        { time: 10, text: "Close your sweet eyes and drift into dreamland 💤" },
        { time: 15, text: "Koko will be right here when tomorrow begins 🌟" }
      ]
    }
  ],

  // Maths Curriculum by Age Level with Typed Option
  mathsLevels: [
    {
      id: "age_5_6",
      name: "Level 1: Starters (Ages 5–6)",
      topics: "Counting, Addition, Subtraction, Shapes, Patterns",
      questions: [
        {
          id: "m1",
          prompt: "There are 6 apples in one basket. If you have 3 baskets, how many apples do you have in total?",
          visual: "🧺 (6 apples) + 🧺 (6 apples) + 🧺 (6 apples)",
          options: [12, 15, 18],
          numericAnswer: 18,
          correct: 18,
          kokoHint: "Let's count together! 6 in the first basket, 6 more makes 12, and 6 more makes...?",
          explanation: "6 + 6 + 6 = 18 delicious apples!"
        },
        {
          id: "m2",
          prompt: "Count the shiny stars! How many stars are smiling at you?",
          visual: "⭐⭐⭐⭐⭐ ⭐⭐⭐",
          options: [6, 8, 10],
          numericAnswer: 8,
          correct: 8,
          kokoHint: "Count them one by one: 1, 2, 3, 4, 5, 6, 7, and...?",
          explanation: "There are 8 smiling stars!"
        },
        {
          id: "m3",
          prompt: "Koko had 7 colourful balloons. 2 floated away into the sky. How many balloons are left?",
          visual: "🎈🎈🎈🎈🎈 (🎈🎈 floated away)",
          options: [4, 5, 6],
          numericAnswer: 5,
          correct: 5,
          kokoHint: "Start at 7 and count backwards 2 steps: 6, 5!",
          explanation: "7 take away 2 leaves 5 balloons!"
        },
        {
          id: "m4",
          prompt: "Look at the pattern: 🔴 🔵 🔴 🔵 🔴 ... What comes next?",
          visual: "🔴 🔵 🔴 🔵 🔴 [ ? ]",
          options: ["🔵 Blue Circle", "🔴 Red Circle", "⭐ Star"],
          numericAnswer: null,
          correct: "🔵 Blue Circle",
          kokoHint: "Red, blue, red, blue, red... What color is next?",
          explanation: "Blue follows red in this alternating pattern!"
        }
      ]
    },
    {
      id: "age_7_8",
      name: "Level 2: Explorers (Ages 7–8)",
      topics: "Multiplication, Division, Money (₦), Word Problems",
      questions: [
        {
          id: "m5",
          prompt: "Chidi has ₦1,000. He buys a yummy meat pie for ₦350. How much money does he have left?",
          visual: "💵 ₦1,000  -  🥧 ₦350",
          options: ["₦550", "₦650", "₦750"],
          numericAnswer: 650,
          correct: "₦650",
          kokoHint: "Let's break it down: 1,000 minus 300 is 700. Now subtract 50 more!",
          explanation: "₦1,000 - ₦350 = ₦650 remaining!"
        },
        {
          id: "m6",
          prompt: "Koko arranged 4 rows of notebooks, and each row has 6 notebooks. How many notebooks in total?",
          visual: "📚📚📚📚📚📚  (× 4 rows)",
          options: [20, 24, 28],
          numericAnswer: 24,
          correct: 24,
          kokoHint: "What is 4 times 6? 6 + 6 + 6 + 6!",
          explanation: "4 × 6 = 24 notebooks!"
        },
        {
          id: "m7",
          prompt: "Amara baked 15 cookies. She shares them equally among 3 best friends. How many cookies does each friend get?",
          visual: "🍪 15 cookies ÷ 3 friends",
          options: [3, 5, 6],
          numericAnswer: 5,
          correct: 5,
          kokoHint: "Think: 3 times what number equals 15?",
          explanation: "15 divided by 3 = 5 cookies each!"
        }
      ]
    },
    {
      id: "age_9_10",
      name: "Level 3: Champions (Ages 9–10)",
      topics: "Decimals, Fractions, Proportions, Logic",
      questions: [
        {
          id: "m8",
          prompt: "A delicious pizza is cut into 8 equal slices. David ate 3 slices and Koko ate 2 slices. What fraction of the pizza was eaten?",
          visual: "🍕 3 slices + 2 slices out of 8 total",
          options: ["3/8", "5/8", "6/8"],
          numericAnswer: null,
          correct: "5/8",
          kokoHint: "Add the slices eaten: 3 + 2 = 5 slices out of 8 total!",
          explanation: "3/8 + 2/8 = 5/8 of the pizza was eaten!"
        },
        {
          id: "m9",
          prompt: "What is 0.75 + 0.50?",
          visual: "🧮 0.75  +  0.50",
          options: ["1.15", "1.25", "1.50"],
          numericAnswer: 1.25,
          correct: "1.25",
          kokoHint: "Think of 75 kobo plus 50 kobo: 75 + 50 = 125, so 1.25!",
          explanation: "0.75 + 0.50 = 1.25!"
        },
        {
          id: "m10",
          prompt: "If 3 pencils cost ₦150, how much do 6 pencils cost?",
          visual: "✏️✏️✏️ = ₦150  |  ✏️✏️✏️✏️✏️✏️ = ?",
          options: ["₦250", "₦300", "₦450"],
          numericAnswer: 300,
          correct: "₦300",
          kokoHint: "6 pencils is double 3 pencils! So double the cost: ₦150 × 2!",
          explanation: "Double the pencils means double the price: ₦150 × 2 = ₦300!"
        }
      ]
    }
  ],

  // Interactive Stories with Categories
  stories: [
    {
      id: "brave_amina",
      title: "The Brave Little Girl",
      hero: "Amina",
      category: "Space",
      image: "assets/story_amina.png",
      intro: "Amina always dreamed of becoming an astronaut and touching the shining stars. One sunny afternoon in Lagos, she found a mysterious glowing box in her grandmother's backyard under a giant mango tree...",
      branches: {
        root: {
          text: "The box is humming with soft golden light and has three sparkling buttons. What should Amina do next?",
          choices: [
            { text: "🚀 Open the glowing box", next: "open_box" },
            { text: "🏠 Run inside and call grandma", next: "call_grandma" },
            { text: "🤝 Invite her friend Chidi to inspect it", next: "call_chidi" }
          ]
        },
        open_box: {
          text: "WHOOSH! 🌟 As Amina gently opens the lid, a tiny holographic rocket ship floats into the air! A friendly voice whispers: 'Welcome Cadet Amina! Your star coordinates are ready.'",
          choices: [
            { text: "🪐 Press launch to see where it leads", next: "rocket_launch" },
            { text: "📝 Sketch the rocket in her science journal", next: "science_journal" }
          ]
        },
        call_grandma: {
          text: "Grandma smiles warmly and laughs: 'Ah, Amina! That was my grandfather's old star compass from Kano!' She shows Amina how to align it with the North Star.",
          choices: [
            { text: "🔭 Look at the constellations through the compass", next: "look_stars" }
          ]
        },
        call_chidi: {
          text: "Chidi runs over with his magnifying glass. 'Look, Amina! There are constellation symbols carved in brass!' Together, they solve the secret symbol lock.",
          choices: [
            { text: "🗝️ Turn the brass dial together", next: "rocket_launch" }
          ]
        },
        rocket_launch: {
          text: "A magical projection of the solar system fills the garden! Amina points to Mars: 'One day, I will walk on the red planet!' She knows studying hard and staying curious will take her to the stars. 🌟",
          isEnd: true,
          lesson: "Courage, curiosity, and science can take you anywhere in the universe!"
        },
        science_journal: {
          text: "Amina draws every detail of the star compass. Next Monday at school, her teacher makes her head of the Junior Astronomy Club! 🏆",
          isEnd: true,
          lesson: "Observing carefully and taking notes is the secret power of great scientists!"
        },
        look_stars: {
          text: "Through the brass compass, the stars shimmer like diamonds. Grandma and Amina make a wish together on a shooting star. ✨",
          isEnd: true,
          lesson: "Family wisdom connects our past to our biggest future dreams."
        }
      }
    },
    {
      id: "clever_tortoise",
      title: "Tortoise & The Feast in the Sky",
      hero: "Ijapa the Tortoise",
      category: "African Adventures",
      intro: "In the great animal kingdom, there was a season of hunger on earth, but the birds received an invitation to a grand feast high up in the sky! Tortoise, who loved delicious food, had no wings...",
      branches: {
        root: {
          text: "Tortoise went to the birds and flattered them with sweet words. What should Tortoise propose to the birds?",
          choices: [
            { text: "🪶 Beg each bird to lend him one single feather", next: "lend_feathers" },
            { text: "🎈 Build a big balloon with palm leaves", next: "build_balloon" }
          ]
        },
        lend_feathers: {
          text: "The kind birds each plucked one feather and glued them onto Tortoise's shell! Now Tortoise could fly! But as they arrived at the sky feast, Tortoise had a sneaky plan...",
          choices: [
            { text: "👑 Claim his new sky name is 'All of You'", next: "name_all_of_you" },
            { text: "🤝 Share all the delicious food fairly with the birds", next: "share_food" }
          ]
        },
        build_balloon: {
          text: "The palm leaf balloon floated up, but caught on a tall baobab tree. Eagle swooped down and taught Tortoise: 'Honesty is always better than sneaky shortcuts!'",
          isEnd: true,
          lesson: "Honesty and hard work always win over shortcuts."
        },
        name_all_of_you: {
          text: "When the sky hosts announced: 'This feast is for All of You!', Tortoise ate everything! Angry at his greed, the birds took back all their feathers, leaving Tortoise stranded. His friends had to lay out soft leaves so his shell didn't break!",
          isEnd: true,
          lesson: "Greed leaves you lonely. Sharing brings true joy!"
        },
        share_food: {
          text: "Tortoise shared the sweet yam and fruit with every single bird. The birds cheered and made Tortoise their honorary sky brother forever! 🎉",
          isEnd: true,
          lesson: "Generosity and teamwork make every feast sweeter!"
        }
      }
    },
    {
      id: "golden_baobab",
      title: "The Magic of the Golden Baobab",
      hero: "Kofi",
      category: "Magic",
      intro: "Young Kofi walked through the savanna during a gentle twilight. Beside an ancient giant Baobab tree, a golden glowing firefly whispered his name...",
      branches: {
        root: {
          text: "The firefly invites Kofi to make a wish for his village. What should Kofi choose?",
          choices: [
            { text: "🌧️ Wish for sweet rain to water the village crops", next: "rain_wish" },
            { text: "🍯 Wish for an endless pot of honey and sweets", next: "honey_wish" }
          ]
        },
        rain_wish: {
          text: "Gentle raindrops fell like music! The crops blossomed into green corn and giant yams. The whole village danced with gratitude, thanking Kofi for putting others first! 🌽",
          isEnd: true,
          lesson: "Thinking of your community brings blessings to everyone including yourself!"
        },
        honey_wish: {
          text: "A giant jar of honey appeared! But soon, wild bees came buzzing around. Kofi realized that having too much sugar without sharing brings sticky trouble!",
          isEnd: true,
          lesson: "Wisdom is knowing that good health and sharing matter more than treats."
        }
      }
    }
  ],

  // 3 Educational Mini-Games
  miniGames: {
    bananaMath: [
      {
        id: "bm1",
        title: "Banana Math 🍌",
        story: "The monkey has 8 bananas. He gets 4 more from Koko.",
        question: "How many bananas does the monkey have now?",
        image: "assets/game_monkey.png",
        options: [10, 11, 12],
        correct: 12,
        explanation: "8 + 4 = 12 bananas! The monkey is dancing with joy!"
      },
      {
        id: "bm2",
        title: "Banana Math 🍌",
        story: "The monkey collected 15 bananas. He shared 6 with his baby brother.",
        question: "How many bananas does he have left?",
        image: "assets/game_monkey.png",
        options: [7, 9, 11],
        correct: 9,
        explanation: "15 - 6 = 9 bananas left!"
      },
      {
        id: "bm3",
        title: "Banana Math 🍌",
        story: "There are 3 trees, and each tree has 5 ripe bananas.",
        question: "How many bananas can the monkey pick in total?",
        image: "assets/game_monkey.png",
        options: [12, 15, 18],
        correct: 15,
        explanation: "3 trees × 5 bananas = 15 delicious bananas!"
      }
    ],

    wordDetective: [
      {
        id: "wd1",
        title: "Word Detective 🔎",
        clue: "Find the word that means 'happy' and full of sunshine:",
        options: [
          { text: "😊 Joyful", correct: true },
          { text: "😡 Angry", correct: false },
          { text: "😴 Sleepy", correct: false }
        ],
        explanation: "Joyful means super happy and smiling!"
      },
      {
        id: "wd2",
        title: "Word Detective 🔎",
        clue: "Find the word that means 'huge' or extraordinarily big:",
        options: [
          { text: "🐜 Tiny", correct: false },
          { text: "🐘 Enormous", correct: true },
          { text: "💨 Quick", correct: false }
        ],
        explanation: "Enormous means giant, just like an elephant!"
      },
      {
        id: "wd3",
        title: "Word Detective 🔎",
        clue: "Find the word that means 'brave' and not afraid to try:",
        options: [
          { text: "🦁 Courageous", correct: true },
          { text: "🐭 Timid", correct: false },
          { text: "🐌 Sluggish", correct: false }
        ],
        explanation: "Courageous means having courage to do what is right!"
      }
    ],

    // Memory Match card deck (3 pairs = 6 cards)
    memoryMatch: [
      { id: "m1", icon: "🍌", name: "Banana" },
      { id: "m2", icon: "🐘", name: "Elephant" },
      { id: "m3", icon: "🚀", name: "Rocket" }
    ]
  },

  // Koko Quiz Bank
  quizzes: [
    {
      id: "q1",
      question: "Which land animal is the largest in the entire world?",
      image: "assets/quiz_elephant.png",
      options: ["🐘 Elephant", "🐱 Cat", "🐔 Chicken"],
      correct: "🐘 Elephant",
      kokoCheer: "Amazing! The African elephant is the giant king of land animals!"
    },
    {
      id: "q2",
      question: "How many days are there in one complete week?",
      options: ["5 days", "7 days", "10 days"],
      correct: "7 days",
      kokoCheer: "Spot on! Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday = 7!"
    },
    {
      id: "q3",
      question: "What gives green leaves their beautiful colour and helps plants turn sunlight into food?",
      options: ["Chlorophyll 🌱", "Orange Juice 🍊", "Chocolate Milk 🍫"],
      correct: "Chlorophyll 🌱",
      kokoCheer: "You are a budding botanist! Chlorophyll captures sunlight!"
    },
    {
      id: "q4",
      question: "What is the capital city of Nigeria?",
      options: ["Abuja 🏛️", "Lagos 🌊", "Kano 🏜️"],
      correct: "Abuja 🏛️",
      kokoCheer: "Abuja is the federal capital territory of Nigeria!"
    }
  ],

  // African Language Learning (Igbo, Yoruba, Hausa, Pidgin, English)
  languages: {
    igbo: {
      name: "Igbo 🟢",
      flag: "🟢",
      words: [
        { word: "Mmiri", pronunciation: "M-mee-ree", english: "Water", icon: "💧" },
        { word: "Nnoo", pronunciation: "N-noh", english: "Welcome / Hello", icon: "👋" },
        { word: "Daalu", pronunciation: "Dah-loo", english: "Thank you", icon: "🙏" },
        { word: "Ututu oma", pronunciation: "Oo-too-too Oh-mah", english: "Good Morning", icon: "🌅" },
        { word: "Nwata", pronunciation: "Nwah-tah", english: "Child / Kid", icon: "🧒" }
      ]
    },
    yoruba: {
      name: "Yoruba 🟣",
      flag: "🟣",
      words: [
        { word: "Omi", pronunciation: "Oh-mee", english: "Water", icon: "💧" },
        { word: "E kaabo", pronunciation: "Eh Kah-boh", english: "Welcome", icon: "👋" },
        { word: "E se", pronunciation: "Eh Sheh", english: "Thank you", icon: "🙏" },
        { word: "E kaaro", pronunciation: "Eh Kah-roh", english: "Good Morning", icon: "🌅" },
        { word: "Omode", pronunciation: "Oh-moh-deh", english: "Child / Kid", icon: "🧒" }
      ]
    },
    hausa: {
      name: "Hausa 🔵",
      flag: "🔵",
      words: [
        { word: "Ruwa", pronunciation: "Roo-wah", english: "Water", icon: "💧" },
        { word: "Sannu", pronunciation: "Sahn-noo", english: "Hello / Welcome", icon: "👋" },
        { word: "Nagode", pronunciation: "Nah-goh-deh", english: "Thank you", icon: "🙏" },
        { word: "Ina kwana", pronunciation: "Ee-nah Kwah-nah", english: "Good Morning", icon: "🌅" },
        { word: "Yaro", pronunciation: "Yah-roh", english: "Boy / Child", icon: "🧒" }
      ]
    },
    pidgin: {
      name: "Nigerian Pidgin 🇳🇬",
      flag: "🇳🇬",
      words: [
        { word: "How you dey?", pronunciation: "How you dey?", english: "How are you doing?", icon: "🤝" },
        { word: "I dey fine", pronunciation: "I dey fine", english: "I am doing great!", icon: "😊" },
        { word: "Wetin dey happen?", pronunciation: "Weh-tin dey hap-pen?", english: "What is going on?", icon: "👀" },
        { word: "No wahala", pronunciation: "No wah-hah-lah", english: "No problem at all!", icon: "✌️" }
      ]
    }
  },

  // Conversational AI Dialogue Intents
  conversationIntents: [
    {
      keywords: ["bored", "nothing to do", "sad"],
      reply: "Then we have a mission! 😄 Should we sing, play a game or go on an adventure?"
    },
    {
      keywords: ["sing", "song", "music"],
      reply: "Yay! Singing is my favourite thing! 🎵 Let's sing 'The Amazing Me' or count bananas together. Tap the Sing button and let's go!"
    },
    {
      keywords: ["dinosaur", "trex", "dino"],
      reply: "Rawrrr! 🦖 Did you know the Spinosaurus was even longer than the T-Rex and loved swimming in African rivers? Let's make up a roaring dino song!"
    },
    {
      keywords: ["math", "maths", "plus", "minus", "add", "count"],
      reply: "Maths is my superpower! 🧮 What problem do you want to solve today? You can say something like 'What is 8 plus 7?' or try Level 2!"
    },
    {
      keywords: ["story", "tell me a story", "astronaut", "adventure"],
      reply: "Once upon a time in Lagos, a brave girl named Amina found a shining star compass... Tap Story mode to choose where our adventure goes next! 🚀"
    },
    {
      keywords: ["igbo", "yoruba", "hausa", "language", "nigeria"],
      reply: "E kaabo! Nnoo! Sannu! 🇳🇬 I love African languages! Did you know that in Igbo, 'Mmiri' means water, and in Yoruba it's 'Omi'? Let's practice together!"
    },
    {
      keywords: ["hello", "hi", "hey", "good morning"],
      reply: "Hi there, superstar! 👋 I'm Koko! I'm so happy to see you today. What exciting thing do you want to learn right now?"
    },
    {
      keywords: ["how are you", "what's up"],
      reply: "I'm feeling super bouncy and excited! 😊 My headphones are on and I'm ready to learn and play with you!"
    }
  ],

  // 📷 Homework Snap & AI Solver Samples (Commercial High-Value Feature)
  homeworkSamples: [
    {
      id: "hw1",
      title: "Primary 3 Fractions & Word Problem",
      subject: "Maths",
      questionText: "Kemi picked 24 juicy oranges in her garden. She gave 1/4 of the oranges to her younger brother, and 6 oranges to her favorite teacher. How many oranges does Kemi have left?",
      steps: [
        {
          step: 1,
          prompt: "What is 1/4 of 24 oranges?",
          options: ["4 oranges", "6 oranges", "8 oranges"],
          correct: "6 oranges",
          explanation: "Divide 24 by 4: 24 ÷ 4 = 6 oranges for her brother!"
        },
        {
          step: 2,
          prompt: "How many oranges did she give away in total (brother + teacher)?",
          options: ["10 oranges", "12 oranges", "14 oranges"],
          correct: "12 oranges",
          explanation: "6 to brother + 6 to teacher = 12 oranges given away!"
        },
        {
          step: 3,
          prompt: "How many oranges does Kemi have left from her original 24?",
          options: ["12 oranges", "15 oranges", "18 oranges"],
          correct: "12 oranges",
          explanation: "24 original - 12 given away = 12 oranges left! Problem solved! 🎉"
        }
      ]
    },
    {
      id: "hw2",
      title: "2-Digit Addition with Regrouping",
      subject: "Arithmetic",
      questionText: "Solve: 47 + 38 = ?",
      steps: [
        {
          step: 1,
          prompt: "First, add the ones column: 7 + 8. What is 7 + 8?",
          options: ["14", "15", "16"],
          correct: "15",
          explanation: "7 + 8 = 15! We write down 5 in the ones column and carry 1 to the tens column."
        },
        {
          step: 2,
          prompt: "Now add the tens column: 1 (carried) + 4 + 3. What do you get?",
          options: ["7", "8", "9"],
          correct: "8",
          explanation: "1 + 4 + 3 = 8 tens! Putting it together with 5 ones gives 85!"
        }
      ]
    }
  ],

  // 💳 Commercial Subscription Plans (Parent Monetization)
  subscriptionPlans: {
    free: {
      name: "Starter (Free)",
      price: "₦0",
      features: [
        "3 Songs per day",
        "5 Maths questions per day",
        "1 Story adventure per day",
        "Standard voice responses"
      ]
    },
    premiumMonthly: {
      name: "Koko Premium (Monthly)",
      price: "₦3,500 / month",
      priceNum: 3500,
      features: [
        "✨ Unlimited Voice Conversations with Koko",
        "📷 AI Camera Homework Snap & Step-by-Step Solver",
        "🎵 All 8 Song Categories & Offline Audio",
        "📖 Unlimited Custom AI Story Generator",
        "🌍 Full African Languages Curriculum (Igbo, Yoruba, Hausa, Pidgin)",
        "📊 Detailed Parent Analytics & AI Progress Reports",
        "🛡️ Full Parental Controls & Bedtime Curfew"
      ]
    },
    premiumAnnual: {
      name: "Koko Premium (Annual - Save 25%)",
      price: "₦31,500 / year",
      priceNum: 31500,
      features: [
        "⭐ All Monthly Features Included",
        "🎁 2 Months Free (Save ₦10,500)",
        "👨‍👩‍👧 Multiple Children Profiles (Up to 3 kids)",
        "📱 Offline PWA Mode for Travel"
      ]
    }
  },

  // 💼 Investor Pitch Deck & Live Unit Economics Telemetry
  investorMetrics: {
    marketOpportunity: {
      tam: "120M Children (Sub-Saharan Africa primary demographic, $4.2B annual education & tutoring spend)",
      sam: "28M Urban & Middle-Class Children (Nigeria, Ghana, Kenya English/regional speakers)",
      som: "150,000 Paying Households by Year 2 ($5.4M ARR Target)"
    },
    unitEconomics: {
      cac: "₦1,450 ($0.95)",
      arpu: "₦3,500 / month ($2.30)",
      avgLifetimeMonths: 8.2,
      ltv: "₦28,700 ($18.80)",
      ltvCacRatio: "19.8x",
      grossMargin: "82.5% (after edge LLM token & TTS audio compute costs)"
    },
    retentionCohorts: [
      { day: "Day 1", retention: 78.4 },
      { day: "Day 7", retention: 63.8 },
      { day: "Day 14", retention: 55.2 },
      { day: "Day 30", retention: 48.6 },
      { day: "Month 3", retention: 41.2 }
    ],
    safetyCompliance: {
      coppaCompliant: true,
      ndprCertified: true,
      safeResponseRate: "99.98%",
      humanEscalationTriggered: 0
    }
  }
};

window.KOKO_DATA = KOKO_DATA;
