'use server';

import { adjustDifficulty, AdjustDifficultyInput } from '@/ai/flows/adaptive-difficulty';
import { personalizedTutoring, PersonalizedTutoringInput } from '@/ai/flows/personalized-tutoring';
import { z } from 'zod';
import { modules } from '@/lib/data';
import type { Difficulty, Question } from '@/lib/types';


const getQuestionsSchema = z.object({
  moduleId: z.string(),
  difficulty: z.enum(['easy', 'medium', 'hard']),
});

export async function getNewQuestions(
  input: z.infer<typeof getQuestionsSchema>
): Promise<Question[]> {
  const { moduleId, difficulty } = getQuestionsSchema.parse(input);
  const module = modules.find((m) => m.id === moduleId);

  if (!module) {
    throw new Error('Module not found');
  }

  // Add a slight delay to simulate network latency
  await new Promise((resolve) => setTimeout(resolve, 500));

  return module.questions[difficulty] || [];
}

export async function getAdjustedDifficulty(input: AdjustDifficultyInput) {
    try {
        const result = await adjustDifficulty(input);
        return result;
    } catch (error) {
        console.error("Error in getAdjustedDifficulty:", error);
        // Fallback to current difficulty in case of AI error
        return { newDifficulty: input.currentDifficulty, reason: "Error adjusting difficulty, maintaining current level." };
    }
}

export async function getPersonalizedGuidance(input: PersonalizedTutoringInput) {
    try {
        const result = await personalizedTutoring(input);
        return result;
    } catch (error) {
        console.error("Error in getPersonalizedGuidance:", error);
        return { guidance: "I am having trouble providing guidance right now. Please try again later." };
    }
}
