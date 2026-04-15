export interface Phrase {
  cantonese: string;
  jyutping: string;
  english: string;
  literal?: string;
  usage?: string;
}

export interface Lesson {
  id: string;
  title: string;
  subtitle: string;
  emoji: string;
  notes?: string;
  phrases: Phrase[];
}

export const LESSONS: Lesson[] = [
  {
    id: "greetings",
    title: "Greetings",
    subtitle: "Say hello and goodbye",
    emoji: "👋",
    notes: "In Cantonese, greetings are often phrased as questions. '你好嗎' literally asks 'Are you good?' Remember tone 4 is low and falling.",
    phrases: [
      { cantonese: "你好", jyutping: "nei5 hou2", english: "Hello", literal: "You good", usage: "Standard greeting for anyone" },
      { cantonese: "你好嗎", jyutping: "nei5 hou2 maa3", english: "How are you?", literal: "You good (question)?", usage: "Add 嗎 to turn a statement into a question" },
      { cantonese: "我好好", jyutping: "ngo5 hou2 hou3", english: "I'm very good", literal: "I very good", usage: "Reply to 你好嗎" },
      { cantonese: "早晨", jyutping: "zou2 san4", english: "Good morning", literal: "Early morning", usage: "Used before noon" },
      { cantonese: "晚安", jyutping: "maan5 on1", english: "Good night", usage: "Said when going to sleep" },
      { cantonese: "再見", jyutping: "zoi3 gin3", english: "Goodbye", literal: "Again see", usage: "Standard farewell" },
      { cantonese: "拜拜", jyutping: "baai1 baai3", english: "Bye bye", usage: "Casual farewell, borrowed from English" },
    ],
  },
  {
    id: "introductions",
    title: "Introductions",
    subtitle: "Introduce yourself",
    emoji: "🙋",
    notes: "Cantonese word order is Subject-Verb-Object like English. 我 (ngo5) means 'I/me'.",
    phrases: [
      { cantonese: "我叫", jyutping: "ngo5 giu3", english: "My name is…", literal: "I called", usage: "Follow with your name: 我叫 [name]" },
      { cantonese: "你叫咩名", jyutping: "nei5 giu3 me1 meng2", english: "What is your name?", literal: "You called what name?" },
      { cantonese: "我係香港人", jyutping: "ngo5 hai6 hoeng1 gong2 jan4", english: "I am from Hong Kong", literal: "I am Hong Kong person" },
      { cantonese: "你係邊度人", jyutping: "nei5 hai6 bin1 dou6 jan4", english: "Where are you from?", literal: "You are which place person?" },
      { cantonese: "好高興認識你", jyutping: "hou2 gou1 hing3 jing6 sik1 nei5", english: "Nice to meet you", literal: "Very happy to know you" },
      { cantonese: "我唔識講廣東話", jyutping: "ngo5 m4 sik1 gong2 gwong2 dung1 waa2", english: "I don't speak Cantonese (well)", literal: "I don't know how to speak Cantonese", usage: "Useful phrase for beginners!" },
    ],
  },
  {
    id: "numbers",
    title: "Numbers",
    subtitle: "Count in Cantonese",
    emoji: "🔢",
    notes: "Cantonese numbers are logical and consistent. Once you know 1–10 you can build any number. 十一 = 10+1 = 11.",
    phrases: [
      { cantonese: "一", jyutping: "jat1", english: "One" },
      { cantonese: "二", jyutping: "ji6", english: "Two" },
      { cantonese: "三", jyutping: "saam1", english: "Three" },
      { cantonese: "四", jyutping: "sei3", english: "Four" },
      { cantonese: "五", jyutping: "ng5", english: "Five" },
      { cantonese: "六", jyutping: "luk6", english: "Six" },
      { cantonese: "七", jyutping: "cat1", english: "Seven" },
      { cantonese: "八", jyutping: "baat3", english: "Eight" },
      { cantonese: "九", jyutping: "gau2", english: "Nine" },
      { cantonese: "十", jyutping: "sap6", english: "Ten" },
      { cantonese: "百", jyutping: "baak3", english: "Hundred" },
      { cantonese: "千", jyutping: "cin1", english: "Thousand" },
    ],
  },
  {
    id: "daily-phrases",
    title: "Daily Phrases",
    subtitle: "Everyday expressions",
    emoji: "☀️",
    notes: "These phrases will help you navigate daily life. 唔該 vs 多謝 — use 唔該 for services/requests and 多謝 for gifts/compliments.",
    phrases: [
      { cantonese: "唔該", jyutping: "m4 goi1", english: "Thank you / Excuse me", literal: "Not should (I shouldn't have troubled you)", usage: "For services — waiter, cashier, holding a door" },
      { cantonese: "多謝", jyutping: "do1 ze6", english: "Thank you", literal: "Many thanks", usage: "For gifts, compliments, favours" },
      { cantonese: "唔好意思", jyutping: "m4 hou2 ji3 si1", english: "Sorry / Excuse me", literal: "Not good meaning", usage: "Apologising or getting someone's attention" },
      { cantonese: "對唔住", jyutping: "deoi3 m4 zyu6", english: "I'm sorry", literal: "Face not up to", usage: "A more sincere apology" },
      { cantonese: "係", jyutping: "hai6", english: "Yes / That's right" },
      { cantonese: "唔係", jyutping: "m4 hai6", english: "No / That's not right", literal: "Not yes" },
      { cantonese: "唔知", jyutping: "m4 zi1", english: "I don't know", literal: "Not know" },
      { cantonese: "幾多錢", jyutping: "gei2 do1 cin2", english: "How much does it cost?", literal: "How much money?" },
      { cantonese: "太貴喇", jyutping: "taai3 gwai3 laa3", english: "Too expensive!", literal: "Too expensive (particle)" },
    ],
  },
  {
    id: "food",
    title: "Food & Eating",
    subtitle: "Dining and dim sum",
    emoji: "🍜",
    notes: "Food culture is central to Cantonese life. '飲茶' (yum cha) literally means 'drink tea' but refers to the whole dim sum experience.",
    phrases: [
      { cantonese: "我想要", jyutping: "ngo5 soeng2 jiu3", english: "I would like…", usage: "Follow with the food item" },
      { cantonese: "好好食", jyutping: "hou2 hou2 sik6", english: "Very delicious!", literal: "Very very eat" },
      { cantonese: "我肚餓", jyutping: "ngo5 tou5 ngo6", english: "I'm hungry", literal: "My stomach is hungry" },
      { cantonese: "飲茶", jyutping: "jam2 caa4", english: "Yum cha / Dim sum", literal: "Drink tea" },
      { cantonese: "一杯水", jyutping: "jat1 bui1 seoi2", english: "A glass of water" },
      { cantonese: "埋單", jyutping: "maai4 daan1", english: "Bill please!", literal: "Close the bill", usage: "What you say to get the check" },
      { cantonese: "唔食得", jyutping: "m4 sik6 dak1", english: "I can't eat that", usage: "For allergies or dietary restrictions" },
    ],
  },
  {
    id: "tones-practice",
    title: "Tone Practice",
    subtitle: "Master the 6 tones",
    emoji: "🎵",
    notes: "All 6 examples use the same romanised syllable 'si' but differ only in tone. Practice saying them slowly, listening to each one carefully.",
    phrases: [
      { cantonese: "詩", jyutping: "si1", english: "Poem", usage: "Tone 1: High level — hold a steady high pitch" },
      { cantonese: "史", jyutping: "si2", english: "History", usage: "Tone 2: High rising — like asking a question" },
      { cantonese: "試", jyutping: "si3", english: "Try / Test", usage: "Tone 3: Mid level — medium steady pitch" },
      { cantonese: "時", jyutping: "si4", english: "Time", usage: "Tone 4: Low falling — deep, dropping tone" },
      { cantonese: "市", jyutping: "si5", english: "Market", usage: "Tone 5: Low rising — low pitch that rises slightly" },
      { cantonese: "事", jyutping: "si6", english: "Thing / Matter", usage: "Tone 6: Low level — low and flat" },
    ],
  },
];
