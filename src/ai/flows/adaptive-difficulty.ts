'use server';

/**
 * @fileOverview An AI agent that dynamically adjusts the difficulty level of questions based on student performance.
 *
 * - adjustDifficulty - A function that adjusts the difficulty of questions.
 * - AdjustDifficultyInput - The input type for the adjustDifficulty function.
 * - AdjustDifficultyOutput - The return type for the adjustDifficulty function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AdjustDifficultyInputSchema = z.object({
  studentId: z.string().describe('The unique identifier for the student.'),
  currentDifficulty: z
    .enum(['easy', 'medium', 'hard'])
    .describe('The current difficulty level of the questions.'),
  performance: z
    .number()
    .min(0)
    .max(1)
    .describe(
      'The student performance on the last set of questions (0-1, where 1 is perfect).' /* The student performance on the last set of questions (0-1, where 1 is perfect). */
    ),
  subject: z.string().describe('The subject of the questions.'),
});
export type AdjustDifficultyInput = z.infer<typeof AdjustDifficultyInputSchema>;

const AdjustDifficultyOutputSchema = z.object({
  newDifficulty: z
    .enum(['easy', 'medium', 'hard'])
    .describe('The new difficulty level of the questions.'),
  reason: z
    .string()
    .describe('The reasoning behind the change in difficulty level.'),
});
export type AdjustDifficultyOutput = z.infer<typeof AdjustDifficultyOutputSchema>;

export async function adjustDifficulty(input: AdjustDifficultyInput): Promise<AdjustDifficultyOutput> {
  return adjustDifficultyFlow(input);
}

const prompt = ai.definePrompt({
  name: 'adjustDifficultyPrompt',
  input: {schema: AdjustDifficultyInputSchema},
  output: {schema: AdjustDifficultyOutputSchema},
  prompt: `You are an AI tutor that dynamically adjusts the difficulty of questions for students based on their performance.

  You will receive the student's ID, the current difficulty level, their performance on the last set of questions, and the subject of the questions.
  Based on this information, you will determine the new difficulty level and provide a brief explanation for the change.

  Here's the information about the student's performance:
  Student ID: {{{studentId}}}
  Current Difficulty: {{{currentDifficulty}}}
  Performance: {{{performance}}}
  Subject: {{{subject}}}

  Consider the following:
  - If the student's performance is above 0.8, increase the difficulty level (if not already at the highest level).
  - If the student's performance is below 0.4, decrease the difficulty level (if not already at the lowest level).
  - If the student's performance is between 0.4 and 0.8, maintain the current difficulty level.

  Respond with the new difficulty level and a brief reason for the adjustment.
  `,
});

const adjustDifficultyFlow = ai.defineFlow(
  {
    name: 'adjustDifficultyFlow',
    inputSchema: AdjustDifficultyInputSchema,
    outputSchema: AdjustDifficultyOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
