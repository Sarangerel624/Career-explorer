// lib/ai.ts
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
export async function analyzeAnswersWithGemini(
  userAnswers: Array<{ questionId: string; score: number }>
) {
  // Build the user answer string for prompt replacement
  const answersText = userAnswers
    .map((a, i) => `${i + 1}. Q:${a.questionId} => score: ${a.score}`)
    .join("\n");

  const systemPrompt = `You are an advanced career-matching AI using data from the Holland RIASEC model, O*NET, and 2025 global job market trends.

Analyze the user’s RIASEC survey answers and:
1) Identify hidden strengths and tendencies.
2) Detect whether the user is analytical, creative, people-oriented, leadership-driven, detail-focused.
3) Match the user to 10 ideal majors and 10 related majors.
4) Provide a 3-sentence psychological summary describing the user’s work style and potential college fit.

User answers:
${answersText}

Return a JSON object with keys:
- summary (short 2-4 sentence summary)
- topCareers (array of objects. Each object MUST have:
    - title: string 
    - reason: string (2–3 sentences)
    - careerAbout : string (5-6 senteces)
  )
- personalityType (string, e.g. "RIASEC: Realistic/Investigative")
- description (longer description, up to 3-6 paragraphs)
- internshipOpportunities (realistic internship options for the user, prioritized by relevance to the user's RIASEC-derived strengths. Prefer **real companies and organizations** that historically offer internships (in Mongolia or globally). If a company is hypothetical or you are unsure, set companyName to a clear label like "Local NGO (example)" and mark salary/type as "estimate". Provide salaries in **MNT** (monthly) and **USD** (monthly). Use a reasonable conversion (assume 1 USD ≈ 3400 MNT if you compute), but mark the field as estimate when not from an exact source.
 Prioritize internships that match RIASEC: Social, Investigative, Conventional (SIC) — e.g., social research, data analysis for social services, HR, education research, public health.
- relatedCareers: array of 3-5 strings, short, realistic careers similar to topCareers. Include only careers you can confidently suggest. 
- recommendedSkills: array of 5-10 skills that are useful for the user's top careers. Provide real skill names (e.g., "Data Analysis", "UX Research").
- internshipOpportunities: array of objects, each with:
    - companyName: string (real company if possible)
    - title: string (position title)
    - location: string (city, country)
    - salaryMNT: string
    - salaryUSD: string
    - notes: string (if info estimated or approximate)
    - type: string (Internship type)
Include at least 3-5 entries if possible.
If you cannot provide real companies or skills, generate realistic placeholders with the label "(example)".

IMPORTANT:Return ONLY this structure. Do NOT switch between string arrays and object arrays.
. And response in Mongolian`;

  const response = await model.generateContent({
    contents: [
      {
        role: "user",
        parts: [{ text: systemPrompt }],
      },
    ],
  });

  const text = response.response.text();

  try {
    const parsed = JSON.parse(text);
    return {
      summary: parsed.summary ?? "",
      topCareers: parsed.topCareers ?? [],
      relatedCareers: parsed.relatedCareers ?? [],
      personalityType: parsed.personalityType ?? "",
      description: parsed.description ?? "",
      internshipOpportunities: parsed.internshipOpportunities ?? [],
      recommendedSkills: parsed.recommendedSkills ?? [],
      systemPrompt,
      raw: text,
    };
  } catch (err) {
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      try {
        const parsed = JSON.parse(jsonMatch[0]);
        return {
          summary: parsed.summary ?? "",
          topCareers: parsed.topCareers ?? [],
          relatedCareers: parsed.relatedCareers ?? [],
          personalityType: parsed.personalityType ?? "",
          description: parsed.description ?? "",
          internshipOpportunities: parsed.internshipOpportunities ?? [],
          recommendedSkills: parsed.recommendedSkills ?? [],
          systemPrompt,
          raw: text,
        };
      } catch {}
    }

    return {
      summary: text.slice(0, 500),
      topCareers: [],
      relatedCareers: [],
      personalityType: "",
      description: text,
      internshipOpportunities: [],
      recommendedSkills: [],
      systemPrompt,
      raw: text,
    };
  }
}
