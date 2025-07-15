import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export interface ServicePrompts {
  dailyHoroscope: (zodiacSign: string, birthDate: string) => string;
  moonPhase: (currentDate: string, location: string) => string;
  planetaryPositions: (birthDate: string, birthTime: string, birthPlace: string) => string;
  starCharts: (birthDate: string, birthTime: string, birthPlace: string) => string;
}

export const servicePrompts: ServicePrompts = {
  dailyHoroscope: (zodiacSign: string, birthDate: string) =>
    `As an expert astrologer, provide a detailed daily horoscope for someone born on ${birthDate} with zodiac sign ${zodiacSign}. 
    Include insights about:
    - General mood and energy for today
    - Love and relationships
    - Career and finances
    - Health and wellness
    - Lucky numbers and colors
    - A positive affirmation for the day
    
    Make it personal, uplifting, and insightful. Keep it around 200-300 words.`,

  moonPhase: (currentDate: string, location: string) =>
    `As an astrology expert, explain the current moon phase for ${currentDate} and its influence on people in ${location}.
    Include:
    - Current moon phase and what it means
    - Emotional and spiritual influences
    - Best activities to do during this phase
    - How it affects different zodiac signs
    - Rituals or practices to align with lunar energy
    - What to avoid during this moon phase
    
    Make it mystical yet practical. Keep it around 250-350 words.`,

  planetaryPositions: (birthDate: string, birthTime: string, birthPlace: string) =>
    `As a professional astrologer, analyze the current planetary positions and their influence on someone born on ${birthDate} at ${birthTime} in ${birthPlace}.
    Include:
    - Current major planetary transits affecting them
    - How these transits influence their personality traits
    - Opportunities and challenges in the coming weeks
    - Advice for navigating current cosmic energies
    - Which planets are most influential right now
    - Specific guidance for personal growth
    
    Be detailed and specific to their birth details. Keep it around 300-400 words.`,

  starCharts: (birthDate: string, birthTime: string, birthPlace: string) =>
    `As an expert natal chart astrologer, create a comprehensive star chart interpretation for someone born on ${birthDate} at ${birthTime} in ${birthPlace}.
    Include:
    - Sun, Moon, and Rising sign meanings
    - Dominant elements and qualities
    - Key personality traits and life themes
    - Strengths and potential challenges
    - Career and relationship patterns
    - Life purpose and spiritual path
    - Most important planetary aspects
    
    Make it deeply personal and insightful. Keep it around 400-500 words.`
};

export const generateAstroResponse = async (prompt: string): Promise<string> => {
  try {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a wise and experienced astrologer with deep knowledge of astrology, spirituality, and cosmic influences. Provide insightful, mystical, yet practical guidance."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      model: "gpt-3.5-turbo",
      max_tokens: 1000,
      temperature: 0.7,
    });

    return completion.choices[0]?.message?.content || "Unable to generate response at this time.";
  } catch (error) {
    console.error('OpenAI API Error:', error);
    throw new Error('Failed to generate astrological insights. Please try again.');
  }
};