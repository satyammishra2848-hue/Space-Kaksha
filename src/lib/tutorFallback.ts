/**
 * Fallback knowledge base for Kaksha AI Space Tutor when offline or without API key.
 * Provides scientifically verified, kid-friendly explanations in English and Hindi.
 */

export function getFallbackReply(query: string, language: 'en' | 'hi' = 'en'): string {
  const clean = (query || '').trim().toLowerCase();

  if (language === 'hi') {
    if (clean.includes('चमक') || clean.includes('shine') || clean.includes('light') || clean.includes('रोशनी')) {
      return 'चाँद का अपना कोई प्रकाश नहीं होता! यह एक विशाल प्राकृतिक दर्पण की तरह सूर्य के प्रकाश को परावर्तित करके पृथ्वी की ओर भेजता है।';
    }
    if (clean.includes('कला') || clean.includes('phase') || clean.includes('आकार') || clean.includes('बदलता')) {
      return 'जैसे-जैसे चंद्रमा पृथ्वी का चक्कर लगाता है, सूर्य, पृथ्वी और चंद्रमा के बीच का कोण बदलता है। इस कारण पृथ्वी से हमें उसका केवल वही हिस्सा दिखाई देता है जिस पर सूर्य की किरणें पड़ रही होती हैं।';
    }
    if (clean.includes('दूर') || clean.includes('distance') || clean.includes('far') || clean.includes('दूरी')) {
      return 'चाँद पृथ्वी से लगभग 3,84,400 किलोमीटर दूर है! इस दूरी में हमारे सौरमंडल के बाकी सभी 7 ग्रह एक कतार में समा सकते हैं।';
    }
    if (clean.includes('रॉकेट') || clean.includes('rocket')) {
      return 'रॉकेट न्यूटन के तीसरे नियम पर काम करते हैं: "हर क्रिया की समान और विपरीत प्रतिक्रिया होती है।" नीचे की ओर अत्यधिक गैस छोड़ने से रॉकेट ऊपर अंतरिक्ष में उड़ता है!';
    }
    if (clean.includes('काला') || clean.includes('black') || clean.includes('आसमान')) {
      return 'अंतरिक्ष में कोई घना वायुमंडल नहीं है जो सूर्य के प्रकाश को बिखेर सके (स्कैटर कर सके), इसलिए अंतरिक्ष हमेशा गहरा काला दिखाई देता है!';
    }
    return 'यह अंतरिक्ष का बहुत ही रोचक प्रश्न है! ब्रह्मांड रहस्यों और चमत्कारों से भरा है। अपने पाठ के इंटरैक्टिव सिमुलेटर की मदद से आप इसे और गहराई से समझ सकते हैं!';
  }

  // English explanations
  if (clean.includes('shine') || clean.includes('light') || clean.includes('glow')) {
    return 'The Moon has no light of its own! It acts like a giant cosmic mirror, reflecting sunlight back towards our eyes on Earth.';
  }
  if (clean.includes('phase') || clean.includes('shape') || clean.includes('crescent') || clean.includes('waxing') || clean.includes('waning')) {
    return 'As the Moon orbits Earth every 29.5 days, the angle between the Sun, Earth, and Moon changes. From Earth, we see varying amounts of the sunlit side—from New Moon to Full Moon!';
  }
  if (clean.includes('far') || clean.includes('distance') || clean.includes('km') || clean.includes('miles')) {
    return 'The Moon is about 384,400 km (238,855 miles) away from Earth! You could comfortably fit all 7 other solar system planets between Earth and the Moon.';
  }
  if (clean.includes('day') || clean.includes('lunar day') || clean.includes('long')) {
    return 'One lunar day lasts about 29.5 Earth days! That means roughly two weeks of boiling sunshine (+120°C) followed by two weeks of freezing night (-130°C).';
  }
  if (clean.includes('sky') || clean.includes('black') || clean.includes('dark')) {
    return 'Space looks pitch black because it is a vacuum with no atmosphere to scatter sunlight. On Earth, air molecules scatter blue light, creating our blue daytime sky!';
  }
  if (clean.includes('rocket') || clean.includes('engine') || clean.includes('launch')) {
    return 'Rockets operate on Sir Isaac Newton\'s Third Law: every action has an equal and opposite reaction! Ejecting high-speed exhaust gas downward pushes the rocket skyward into orbit.';
  }
  if (clean.includes('black hole') || clean.includes('gravity')) {
    return 'A black hole is a region in space where gravity is so strong that nothing, not even light, can escape! They form when massive dying stars collapse inward under their own gravity.';
  }

  return 'That is a fantastic space question! The universe is full of cosmic marvels. As you explore your space missions and simulations, you will discover how gravity, light, and orbits shape everything!';
}
