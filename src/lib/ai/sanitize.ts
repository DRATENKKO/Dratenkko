/**
 * Sanitize AI assistant responses.
 *
 * STRATEGY: "Remove only what we know is garbage" (blacklist) instead of
 * "Keep only what we know is safe" (whitelist). This prevents destroying
 * valid text that uses slightly different Unicode characters.
 *
 * Targets:
 * - Visible reasoning blocks (<think>, 【思考】, etc.)
 * - Internal labels (**Reasoning**, **Pensamiento**, etc.)
 * - Service URLs (MiniMax TTS, CDN audio)
 * - CJK characters that commonly leak from Chinese reasoning (Chinese, Japanese,
 *   Korean script ranges)
 * - Excessive whitespace
 */

const REASONING_PATTERNS: Array<RegExp | [RegExp, string]> = [
  // Standard XML-style thinking tags (multiline, case-insensitive)
  [/<think\b[^>]*>[\s\S]*?<\/think>/gi, ''],
  [/<thinking\b[^>]*>[\s\S]*?<\/thinking>/gi, ''],
  [/<reasoning\b[^>]*>[\s\S]*?<\/reasoning>/gi, ''],
  [/<output\b[^>]*>[\s\S]*?<\/output>/gi, ''],
  [/<thought\b[^>]*>[\s\S]*?<\/thought>/gi, ''],
  [/<response\b[^>]*>[\s\S]*?<\/response>/gi, ''],

  // Cyrillic thinking tags (MiniMax sometimes emits these)
  [/<думаю\b[^>]*>[\s\S]*?<\/думаю>/gi, ''],
  [/<размышление\b[^>]*>[\s\S]*?<\/размышление>/gi, ''],

  // CJK brackets commonly used by Chinese models (【思考】, 【分析】)
  [/【思考】[\s\S]*?【\/思考】/g, ''],
  [/【分析】[\s\S]*?【\/分析】/g, ''],
  [/【推理】[\s\S]*?【\/推理】/g, ''],
  [/【输出】[\s\S]*?【\/输出】/g, ''],
  [/【结论】[\s\S]*?【\/结论】/g, ''],
  [/【回答】[\s\S]*?【\/回答】/g, ''],

  // Single CJK brackets without closing
  [/【思考】[\s\S]*/g, ''],
  [/【分析】[\s\S]*/g, ''],

  // Markdown-style reasoning labels
  [/\*\*Reasoning\*\*[\s\S]*?\*\*Output\*\*/gi, ''],
  [/\*\*Pensamiento\*\*[\s\S]*?\*\*Respuesta\*\*/gi, ''],
  [/\*\*Ragionamento\*\*[\s\S]*?\*\*Risposta\*\*/gi, ''],
  [/\*\*Raciocínio\*\*[\s\S]*?\*\*Resposta\*\*/gi, ''],

  // Separator blocks (common in MiniMax)
  [/━{3,}[\s\S]*?━{3,}/g, ''],

  // Underscore thinking markers
  [/_thinking[\s\S]*?_/gi, ''],
];

/**
 * Remove CJK characters that leak from model reasoning.
 * This targets Han, Hiragana, Katakana, and Hangul scripts only.
 * It does NOT remove Latin accents (á, ñ, ç, etc.).
 */
function removeCJK(text: string): string {
  // CJK Unified Ideographs (Chinese/Japanese Kanji)
  // Hiragana, Katakana, Hangul Syllables, Hangul Jamo
  return text.replace(
    /[\u4E00-\u9FFF\u3400-\u4DBF\uF900-\uFAFF\u3040-\u309F\u30A0-\u30FF\uAC00-\uD7AF\u1100-\u11FF]/g,
    ''
  );
}

/**
 * Remove Cyrillic characters that sometimes leak from model reasoning.
 */
function removeCyrillic(text: string): string {
  return text.replace(/[\u0400-\u04FF\u0500-\u052F]/g, '');
}

/**
 * Remove URLs that look like MiniMax TTS or internal service links.
 * Keeps normal reference URLs if they are part of the content.
 */
function removeServiceUrls(text: string): string {
  return text.replace(/https?:\/\/[^\s]+/gi, (match) => {
    const lower = match.toLowerCase();
    if (
      lower.includes('minimaxi') ||
      lower.includes('minimax') ||
      lower.includes('tts') ||
      lower.includes('audio') ||
      lower.includes('cdn.') ||
      lower.includes('speech') ||
      lower.includes('voice')
    ) {
      return '';
    }
    return match;
  });
}

/**
 * Remove isolated markdown artifacts that don't belong in short chat answers.
 */
function removeMarkdownArtifacts(text: string): string {
  // Remove triple backtick code blocks entirely
  let cleaned = text.replace(/```[\s\S]*?```/g, '');
  // Remove single backtick inline code (but keep the text inside)
  cleaned = cleaned.replace(/`([^`]*)`/g, '$1');
  // Remove excessive asterisks used for bold/italic
  cleaned = cleaned.replace(/\*{2,}/g, '');
  return cleaned;
}

/**
 * Collapse multiple blank lines into one and trim edges.
 */
function collapseWhitespace(text: string): string {
  return text
    .replace(/[ \t]+/g, ' ')        // collapse multiple spaces/tabs
    .replace(/\n{3,}/g, '\n\n')      // max 2 consecutive newlines
    .trim();
}

/**
 * Main sanitize function.
 */
export function sanitizeAssistantResponse(raw: string): string {
  if (!raw) return '';

  let cleaned = raw;

  // 1. Remove reasoning blocks first (before CJK removal, since tags may contain CJK)
  for (const item of REASONING_PATTERNS) {
    const pattern = Array.isArray(item) ? item[0] : item;
    const replacement = Array.isArray(item) ? item[1] : '';
    cleaned = cleaned.replace(pattern, replacement);
  }

  // 2. Remove leaked CJK and Cyrillic characters
  cleaned = removeCJK(cleaned);
  cleaned = removeCyrillic(cleaned);

  // 3. Remove service/tts URLs
  cleaned = removeServiceUrls(cleaned);

  // 4. Remove markdown artifacts
  cleaned = removeMarkdownArtifacts(cleaned);

  // 5. Collapse whitespace
  cleaned = collapseWhitespace(cleaned);

  return cleaned;
}
